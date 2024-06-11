const todoFormCreate = document.getElementById('todo_inputer');
const New_todoInfo = document.getElementById('inP_todo');
const todoList = document.getElementById('list_todo');

function db_infoid(db_info) {
    for (i = 1; i<Object.keys(db_info).length; i++) {
        addType(i + "  " + db_info[i]);
    }
}

todoFormCreate.addEventListener('submit', function (event) {
    event.preventDefault();
    const newTodo = New_todoInfo.value;
    if (newTodo ==='') {
        alert('Поле типа задач при создании не может быть пустой');
        return;
    }
    New_todoInfo.value = '';
    addType(newTodo);
});
function createCheckBoxer() {
    const checkBox = document.createElement('input');
    checkBox.setAttribute('type', 'checkBox');
    checkBox.style.marginRight = '1%';
    return checkBox;
}
function createDeleteButton() {
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.setAttribute('type', 'submit');
    deleteButton.style.marginLeft = 'auto';
    return deleteButton;
}

function addType(typer) {
    const typeBox = document.createElement('div');
    typeBox.setAttribute('class', 'body_cont_in btn')
    typeBox.style.display = 'flex';

    const typeText = document.createElement('h2');
    typeText.textContent = typer;
    typeBox.appendChild(typeText);

    const ChBx = createCheckBoxer();
    const CreDBtn = createDeleteButton();

    typeBox.appendChild(ChBx);
    typeBox.appendChild(CreDBtn);

    todoList.appendChild(typeBox);

    CreDBtn.addEventListener('click', function() {
    todoList.removeChild(typeBox)
    });
    ChBx.addEventListener('change', function() {
        if (this.checked) {
            typeText.style.textDecoration = 'line-through';
        } else {
            typeText.style.textDecoration = 'None';
        }
    })
}