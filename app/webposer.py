from app import app

from flask import render_template, request, redirect

@app.route('/')
def homepager():
	link = request.form.get('link_type')
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