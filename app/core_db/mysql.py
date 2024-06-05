import pymysql

class portDB():
	def __init__(self):
		self.cont()
	def getDbm(self):
		return self.cur, self.con
	def cont(self):
		self.con = pymysql.connect(
			host='127.0.0.1',
			port=3306,
			user='root',
			password='1234',
			database='my_todo_list'
		)
		self.cur = self.con.cursor()
		self.db_check()
	def db_check(self, types=None, todos=None):
		if types == None:
			self.cur.execute("""
			SELECT table_name
			FROM information_schema.tables
			WHERE table_schema = 'my_todo_list'
			AND table_name = 'todos_types'\n
			""")

			todoschema = self.cur.fetchall()
			if todoschema==():
				self.cur.execute("""
				create table todos_types(
				id int PRIMARY KEY AUTO_INCREMENT,
				Type text NOT NULL)\n
				""")
		if todos == None:
			self.cur.execute("""
			SELECT table_name
			FROM information_schema.tables
			WHERE table_schema = 'my_todo_list'
			AND table_name = 'todo_list'\n
			""")
			todolist = self.cur.fetchall()
			if todolist == ():
				self.cur.execute("""
				create table todo_list(
				id int PRIMARY KEY AUTO_INCREMENT,
				title text NOT NULL,
				descriptions text NOT NULL,
				type text NOT NULL)\n
				""")
def main():
	portDB()

if __name__ == '__main__':
	main()

