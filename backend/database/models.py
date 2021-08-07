from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

relation_chat_user = db.Table('relation_chat_user',
  # db.Column("id", db.Integer, primary_key=True),
  db.Column("chat_id", db.Integer, db.ForeignKey("chats.id"), primary_key=True),
  db.Column("user_id", db.Integer, db.ForeignKey("users.id"), primary_key=True))

#################
#  Users models #
#################
class Users(db.Model):
  __tablename__ = "users"

  id = db.Column(db.Integer, primary_key=True)
  public_name = db.Column(db.String)
  email = db.Column(db.Integer, index=True, unique=True)
  password = db.Column(db.String)
  chats = db.relationship("Chats", secondary=relation_chat_user, backref=db.backref("users", lazy="dynamic"), lazy="dynamic")

  def __repr__(self):
    return f"<Users {self.email}>"


#################
#  Chats models  #
#################
class Chats(db.Model):
  __tablename__ = "chats"

  id = db.Column(db.Integer, primary_key=True)
  lines = db.relationship("ChatLines", backref="chat", lazy="dynamic")
  updated_on = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now(), index=True)

  def __repr__(self):
    return f"<Chats {self.id}>"

class ChatLines(db.Model):
  __tablename__ = "chat_lines"

  id = db.Column(db.Integer, primary_key=True)
  created_on = db.Column(db.DateTime, server_default=db.func.now(), index=True)
  chat_id = db.Column(db.Integer, db.ForeignKey("chats.id"))
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
  message = db.Column(db.String)
  
  def __repr__(self):
    return f"<ChatLines {self.id}: {self.text}>"