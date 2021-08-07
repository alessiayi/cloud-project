import sqlalchemy
from os import path

def database_is_empty(db, app):
  with app.app_context():
    table_names = sqlalchemy.inspect(db.engine).get_table_names()
  return table_names == []

def database_file_exists(db_file):
  return path.exists(db_file)
