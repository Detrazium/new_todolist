from app import app
from flask import render_template, request, redirect, url_for, json
from app.core_db.database import contact_type_db, CON_todo_db
import requests

def jsonRe(db_methods, check: str='--type'):
	'''Создает JSON'''
	l = {}
	if check == '--type':
		ALL = db_methods.check_info_type()
		if ALL != None:
			for el in ALL:
				l[str(el[0])] = el[1]

	elif check == '--toDo':
		ALL = db_methods.check_info_todo()
		print(ALL)
		if ALL != None:
			for el in ALL:
				l[str(el[0])] = el[1], el[2], el[3]
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
				new_indx_elDB = db_methods.create_type_db(Ntype)
	dbItem = jsonRe(db_methods)
	return render_template('index.html', db_info=dbItem)

@app.route('/todo/<type>', methods=['POST', 'GET'])
def todolist(type):
	dbItem = {}
	id_type = type.split(' | ')
	if len(id_type) >= 2:
		id = id_type[0]
		typer = id_type[1]
		db_contacter = CON_todo_db(id, typer)
		if request.method == 'POST':
			deleteitem = request.form.get('delete_item')
			title = request.form.get('inP_todo')
			descript = request.form.get('inP_Descripter')
			db_contacter.create_todo_db(title=title, descriptions=descript)
			if deleteitem:
				print(deleteitem, '|||DETED|||')
				db_contacter.delete_todo_db(int(deleteitem))
	else:
		typer = 'Непроиндексированный тип, перезагрузите страницу с типами и попробуйте снова'
		db_items = {}
	db_items = jsonRe(db_contacter, check='--toDo')
	return render_template('todo.html', db_info=db_items, type=typer)

def core_poser():
	app.run(debug=True)
def main():
	core_poser()

if __name__ == '__main__':
	main()