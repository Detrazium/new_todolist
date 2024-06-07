from app.core_db.mysql import portDB

db = portDB().getDbm()
db_cur = db[0]
db_con = db[1]