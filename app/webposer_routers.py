from app import app
from flask import render_template, request, redirect
from app.core_db.database import contact_type_db, CON_todo_db

@app.route('/', methods=["GET", "POST"])
def typeHome():
	ALLtype = contact_type_db().check_info_type()
	if request.method == 'POST':
		l1 = request.form['input_id_new']
		print(l1)
	if request.method == 'GET':
		pass



	return render_template('index.html')

@app.route('/todo/<type>', methods=['POST', 'GET'])
def todolist(type):
	return render_template('todo.html', type=type)

def core_poser():
	app.run(debug=True)
def main():
	core_poser()

if __name__ == '__main__':
	main()