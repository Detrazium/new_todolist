const todoFormCreate = document.getElementById('todo_inputer');
const New_todoInfo = document.getElementById('inP_todo');
const todoList = document.getElementById('list_todo');

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
    return checkBox;
}
function createDeleteButton() {
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.setAttribute('type', 'submit');
    return deleteButton;
}

function addType(typer) {
    const typeBox = document.createElement('div');
    typeBox.style.display = 'flex';
    const typeText = document.createElement('h4');
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