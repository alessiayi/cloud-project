from flask import Flask, request, abort, make_response, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity, get_jwt, set_access_cookies, unset_jwt_cookies
import database.connect as conn
from datetime import datetime
from datetime import timedelta
from datetime import timezone

from os import environ

DB_URL = environ.get("DB_URL")
DB_PORT = environ.get("DB_PORT")
DB_PASSWORD = environ.get("DB_PASSWORD")
FRONTEND_URL = environ.get("FRONTEND_URL")

app = Flask(__name__)
CORS(app, supports_credentials=True)

# Configuration options
app.config["JWT_COOKIE_SECURE"] = False
app.config["JWT_TOKEN_LOCATION"] = ["cookies"]
app.config["JWT_SECRET_KEY"] = "super-secret"  # Change this in your code!
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
app.config["JWT_AUTH_USERNAME_KEY"] = "id"
app.config["CORS_ORIGINS"] = FRONTEND_URL # frontend url
app.config["JWT_COOKIE_SAMESITE"] = "None"
app.config["JWT_COOKIE_SECURE"] = True
app.config["JWT_CSRF_METHODS"] = []

JWTManager(app)

@app.before_request
def only_post_json():
  if request.method == "POST" and not request.is_json: 
    abort(make_response(jsonify(error="Request must be JSON"), 415))

def validateReq(data, required):
  if not all(field in data and data[field] for field in required):
    abort(make_response(jsonify(error=f"Required params: {', '.join(required)}"), 409))

@app.after_request
def refresh_expiring_jwts(response):
  try:
    exp_timestamp = get_jwt()["exp"]
    now = datetime.now(timezone.utc)
    target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
    if target_timestamp > exp_timestamp:
      access_token = create_access_token(identity=get_jwt_identity())
      set_access_cookies(response, access_token)
    return response
  except (RuntimeError, KeyError):
    # Case where there is not a valid JWT. Just return the original respone
    return response

@app.route("/test")
def test():  
  return make_response(jsonify({"msg": "Cuac!", "env": f"postgresql://postgres:{DB_PASSWORD}@{DB_URL}:{DB_PORT}/postgres"}), 200)

@app.route("/register", methods=["POST"])
def register():
  data = request.get_json()
  validateReq(data, ["publicName", "email", "password"])

  success = conn.add_user(data["publicName"], data["email"], data["password"])
  if not success:
    abort(make_response(jsonify(email="Email already in use"), 400))
  return make_response(jsonify({}), 200)
@app.route("/login", methods=["POST"])
def login():
  data = request.get_json()
  if data["email"] is None or data["password"] is None:
    abort(make_response(jsonify(error="Required params: 'email', 'password'"), 409))
  user_details, user_id = conn.auth(data["email"], data["password"])
  if not user_details:
    abort(make_response(jsonify(error="Incorrect user/password"), 403))

  access_token = create_access_token(identity=user_id)
  response = jsonify(user_details)
  set_access_cookies(response, access_token)
  return make_response(response)

@app.route("/logout")
def logout():
  response = jsonify({"msg": "Logout successful"})
  unset_jwt_cookies(response)
  return response

@app.route("/chats", methods=["POST"])
@jwt_required()
def create_chat():
  data = request.get_json()
  validateReq(data, ["toEmail"])

  from_user_id = get_jwt_identity()
  chat = conn.create_chat(from_user_id, data["toEmail"])
  if chat is None:
    abort(make_response(jsonify(error="User doesn't exist"), 400))
  if not chat:
    abort(make_response(jsonify(error="Chat already exists"), 400))
  return make_response(jsonify(chat), 200)

@app.route("/chats/send", methods=["POST"])
@jwt_required()
def send_message():
  from_user_id = get_jwt_identity()
  data = request.get_json()
  response = conn.send_message(from_user_id, data["to"], data["message"])
  return make_response(jsonify(response), 200)

@app.route("/chats", methods=["GET"])
@jwt_required()
def get_chats():
  from_user_id = get_jwt_identity()
  chats = conn.get_chats(from_user_id)
  return make_response(jsonify(chats), 200)

@app.route("/chats/<id>", methods=["GET"])
@jwt_required()
def get_chat(id):
  from_user_id = get_jwt_identity()
  chat = conn.get_chat(from_user_id, id)

  if chat is None:
    abort(make_response(jsonify(error="Chat doesn't exist"), 404))
  return chat

if __name__ == '__main__':
  conn.init_database(app)
  app.run(host="0.0.0.0")
