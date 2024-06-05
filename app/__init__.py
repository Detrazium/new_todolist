from flask import Flask
from app.core_db.mysql import portDB

app = Flask(__name__)

db = portDB().getDbm()
db_cur = db[0]
db_con = db[1]


