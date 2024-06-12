from app import app
from flask import render_template, request, redirect, url_for
from app.core_db.database import contact_type_db, CON_todo_db

def jsonRe(db_methods):
	ALLtype = db_methods.check_info_type()
	l = {}
	if ALLtype != None:
		for el in ALLtype:
			l[str(el[0])] = el[1]
	return l

@app.route('/', methods=["GET", "POST"])
def typeHome():
	db_methods = contact_type_db()
	if request.method == 'POST':
		Ntype = request.form.get('inP_todo')
		deli_item = request.form.get('delete_item')
		if deli_item:
			db_methods.delete_type_db(deli_item)
		else:
			if Ntype != '' and Ntype != None:
				db_methods.create_type_db(Ntype)
				print(Ntype, ' |NEW|')
	dbItem = jsonRe(db_methods)
	print(dbItem, ' |DB|')
	return render_template('index.html', db_info=dbItem)

@app.route('/todo/<type>', methods=['POST', 'GET'])
def todolist(type):
	return render_template('todo.html', type=type)

def core_poser():
	app.run(debug=True)
def main():
	core_poser()

if __name__ == '__main__':
	main()