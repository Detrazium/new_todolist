const todoFormCreate = document.getElementById('todo_inputer');
const New_todoInfo = document.getElementById('inP_todo');
const todoList = document.getElementById('list_todo');

function db_infoId(db_info) {
    console.log(db_info);
    for (var key in db_info) {
        console.log(db_info[key])
        addType(key + ' | ' + db_info[key]);
    }
}

todoFormCreate.addEventListener('submit', function (event) {
    event.preventDefault();
    const newTodo = New_todoInfo.value;
    if (newTodo ==='') {
        alert('Поле типа задач при создании не может быть пустой');
        return;
    }
    for (i=0; i<newTodo.length; i++) {
        if (newTodo[i] == '|'){
            alert('Символ "|" неприемлем для типа!');
            return;
        }
    }
    $.ajax({
    type:'POST',
    url:'/',
    data:{
      inP_todo:$("#inP_todo").val()
    },
    success:function()
    {
      console.log('saved');
    }
  })
    New_todoInfo.value = '';
    addType(newTodo);
});
function createIdArea(typer) {
    const IDarea = document.createElement('div');
    IDarea.setAttribute('class', 'containerInp');
    IDarea.textContent = typer.split(" | ")[0];
    return IDarea
}
function createTypeText(typer) {
    const typehrefTotodoList = document.createElement('a')
    console.log(typer.split("|"))
    const typeTextH2 = document.createElement('h2');
    typehrefTotodoList.style.marginLeft = '1em';
    if (typer.split(" | ").length < 2) {
        typeTextH2.textContent = typer;
        typehrefTotodoList.addEventListener('click', function(){
        location.reload();
        return;
        });
        } else {
        typehrefTotodoList.setAttribute('href', '/todo/'+ typer)
        typehrefTotodoList.style.textDecoration = 'none';
        typehrefTotodoList.style.color = 'black';
        typeTextH2.textContent = typer.split(" | ")[1];
        }
    typeTextH2.setAttribute('id', typer)
    typehrefTotodoList.appendChild(typeTextH2)
    return typehrefTotodoList;
}

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
    deleteButton.setAttribute('class', 'body_cont_in');
    deleteButton.style.marginLeft = 'auto';
    return deleteButton;
}

function addType(typer) {
    const typeBox = document.createElement('div');
    typeBox.setAttribute('class', 'body_cont_in btn')
    typeBox.style.display = 'flex';

    const typeID = createIdArea(typer)
    const typehrefTotodoList = createTypeText(typer)
    const ChBx = createCheckBoxer();
    const CreDBtn = createDeleteButton();

    typeBox.appendChild(typeID);
    typeBox.appendChild(typehrefTotodoList);
    typeBox.appendChild(ChBx);
    typeBox.appendChild(CreDBtn);

    //Основная коробка вбирает остальные
    todoList.appendChild(typeBox);

    CreDBtn.addEventListener('click', function() {
        todoList.removeChild(typeBox)
        console.log(typer);
        $.ajax({
            type:'POST',
            url:'/',
            data:{
            'delete_item':typer},
            success:function()
            {
            console.log('deleted');
            }
        })
    });
    ChBx.addEventListener('change', function() {
        if (this.checked) {
            typehrefTotodoList.style.textDecoration = 'line-through';
        } else {
            typehrefTotodoList.style.textDecoration = 'None';
        }
    })
}
