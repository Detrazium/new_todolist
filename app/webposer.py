from app import app

from flask import Flask, render_template, request

@app.route('/')
def homepager():
	link = request.form.get('link_type')
	return render_template('index.html',name = "NAMEDER")

@app.route('/todo/<type>', methods=['POST', 'GET'])
def todolist(type):
	return render_template('todo.html', type=type)

def core_poser():
	app.run(debug=True)
def main():
	core_poser()

if __name__ == '__main__':
	main()