from app import db_cur, db_con

class contact_type_db():
	def __init__(self):
		self.start_db()
	def start_db(self):
		self.cur = db_cur
		self.con = db_con
	def check_info_type(self, type_todo: str= '--all'):
		if type_todo != '--all':
			self.cur.execute("""
			select * from todos_types;
			\n""")
			t = self.cur.fetchall()
		else:
			self.cur.execute(f"""
			select * from todos_types where type = '{type_todo}'
			\n""")
			t = self.cur.fetchall()
		return t
	def create_type_db(self, type_db: str):
		self.cur.execute(f"""INSERT INTO todos_types(type) VALUES ('{type_db}')""")
		self.con.commit()
	def change_type_db(self):
		pass
	def delete_type_db(self):
		pass

class contact_todo_db(contact_type_db):
	def __init__(self):
		super().__init__()
	def start_todotdb(self):
		self.list = self.cur
	def check_info_todo(self):
		pass
	def create_todo_db(self):
		pass
	def change_todo_db(self):
		pass
	def delete_todo_db(self):
		pass

def main():
	l = contact_todo_db()
	key = l.check_info_type()
	print(key)
if __name__ == '__main__':
	main()