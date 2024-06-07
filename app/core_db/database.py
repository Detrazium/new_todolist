from app.core_db import db_cur, db_con

class contact_type_db():
	def __init__(self):
		self.start_db()
	def start_db(self):
		self.cur = db_cur
		self.con = db_con
	def check_info_type(self, id:int = None, type_todo: str= '--all'):
		"""type_todo для поиска по имени всех совпадений.
		 	Id для поиска конкретного типа по номеру"""
		t = None
		if type_todo == '--all' and id == None:
			self.cur.execute("""
			select * from todos_types;
			\n""")
			t = self.cur.fetchall()
		elif id != None and type_todo == '--all':
			self.cur.execute(f"""
			select * from todos_types where id = '{id}'
			\n""")
			t = self.cur.fetchall()
		elif id == None and type_todo != '--all':
			self.cur.execute(f"""
			select * from todos_types where type = '{type_todo}'
			\n""")
		if t == ():
			t = None
		return t
	def create_type_db(self, type_db: str):
		self.cur.execute(f"""INSERT INTO todos_types(type) VALUES ('{type_db}')\n""")
		self.con.commit()
	def change_type_db(self, id: int=None,  old: str=None, new: str=None):
		if id == None:
			self.cur.execute(f"""
			UPDATE todos_types
			SET type = '{new}'
			WHERE type ='{old}'
			\n""")
			self.con.commit()
		elif id != None:
			self.cur.execute(f"""
			UPDATE todos_types
			SET type = '{new}'
			WHERE id ={id}
			\n""")
			self.con.commit()
	def delete_type_db(self, id: int=None):
		self.cur.execute(f"""
		DELETE FROM todos_types
		WHERE id = '{id}'
		""")
		self.con.commit()


class CON_todo_db(contact_type_db):
	"""Просит при создании id_type и type_db привязки для дальнейшей работы методов"""
	def __init__(self, id_type, type_db):
		super().__init__()
		self.typer(id_type, type_db)
	def typer(self, id_type, type_db):
		self.id_tupe = " ".join([str(id_type), type_db])
	def start_todotdb(self):
		self.list = self.cur
	def check_info_todo(self, id_todo:int = None):
		"""При надобности конкретной задачи ввести id"""
		if id_todo == None:
			self.cur.execute(f"""
					select * from todo_list where type = '{self.id_tupe}'
					\n""")
			t = self.cur.fetchall()
		else:
			self.cur.execute(f"""
			select * from todo_list where id = '{id_todo}'
			\n""")
			t = self.cur.fetchall()
		if t == ():
			t = None
		return t
	def create_todo_db(self, title: str, descriptions: str):
		self.cur.execute(f"""
		INSERT INTO todo_list(title, descriptions, type) VALUES ('{title}', '{descriptions}', '{self.id_tupe}')
		""")
		self.con.commit()
	def change_todo_db(self, id, title, desc):
		self.cur.execute(f"""
		UPDATE todo_line
		SET title = '{title}', descriptions = {desc}
		WHERE id = {id}
		""")
	def delete_todo_db(self, id: int = None):
		if id != None:
			self.cur.execute(f"""
			DELETE FROM todo_list
			WHERE id = '{id}'
			""")
			self.con.commit()
		pass

def main():
	contact_type_db()

if __name__ == '__main__':
	main()