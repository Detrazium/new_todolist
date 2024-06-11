const todoFormCreate = document.getElementById('todo_inputer');
const New_todoInfo = document.getElementById('inP_todo');
const todoList = document.getElementById('list_todo');

function db_infoId(db_info) {
    console.log(db_info);
    for (i =1; i<=Object.keys(db_info).length; i++) {
        addType(i + ' | ' + db_info[i]);
    }
}

todoFormCreate.addEventListener('submit', function (event) {
    event.preventDefault();
    const newTodo = New_todoInfo.value;
    if (newTodo ==='') {
        alert('Поле типа задач при создании не может быть пустой');
        return;
    }
    New_todoInfo.values = '';
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

    const typeTextH2 = document.createElement('h2');
    typeTextH2.textContent = typer;
    typeBox.appendChild(typeTextH2);

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
            typeTextH2.style.textDecoration = 'line-through';
        } else {
            typeTextH2.style.textDecoration = 'None';
        }
    })
}