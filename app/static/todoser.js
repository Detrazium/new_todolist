const todoFcreate = document.getElementById('todo_inputer');
const New_title = document.getElementById('inP_todo');
const New_descript = document.getElementById('inP_Descripter')
const VisionALL_INP = document.getElementById('list_todo')
var urlslib = document.URL;
function db_infoId(db_info) {
    console.log(db_info);
    for (var key in db_info) {
        var id = key;
        var title =db_info[key][0];
        var descript = db_info[key][1];

        console.log(key, db_info[key][0], db_info[key][1], db_info[key][2])
        addTask(id, title, descript)
    }
}

todoFcreate.addEventListener('submit', function (event) {
    event.preventDefault();
    const thresID = 'Без индекса'
    const newTitle = New_title.value;
    const newDescript = New_descript.value;

    if (newTitle === '' || newDescript ==='') {
        alert('Заголовок и описание не могут быть пустым');
        return;
    }
    $.ajax({
    type: 'POST',
    url: urlslib,
    data:{
    inP_todo:$('#inP_todo').val(),
    inP_Descripter:$('#inP_Descripter').val()
    },
    sucsses:function()
    {
        console.log('Saved')

    }
    })
    New_title.value = '';
    New_descript.value = '';

    addTask(thresID, newTitle, newDescript);


});

function CreateIndexArea(id) {
    IdAr = document.createElement('div');
    IdAr.style.overflow = 'hidden';
    IdAr.setAttribute('class', 'body_cont_in')
    IdAr.style.width = '4em';
    IdAr.style.height = '4em';
    IdAr.textContent = id
    return IdAr;
}
function CreateTitleArea(title) {
    const TitleAr = document.createElement('div');
    TitleAr.setAttribute('class', 'body_cont_in');
    const titH2 = document.createElement('h2');
    titH2.textContent = title;
    TitleAr.appendChild(titH2)
    return TitleAr

}
function contentBlock_CreateDescrArea(id, content) {
    const descdiv = document.createElement('div');
    descdiv.setAttribute('class', 'todo_cont_text'+' id__'+id)
    const desc = document.createElement('li');
    desc.style.maxWidth = '200px';
    desc.style.wordWrap = 'break-word';
    desc.textContent = content;
    descdiv.appendChild(desc)
    return descdiv;
}

function CreateDescrArea(id, descript) {
    const descArea = document.createElement('div');
    descArea.setAttribute('class', 'Todo_content'+' id__'+id);
    descArea.setAttribute('type', 'subbmit')

    const buttonContent = document.createElement('div');
    buttonContent.setAttribute('class', 'body_cont_in containerInp');
    const eltext = document.createElement('span');
    eltext.textContent = '|Развернуть|';
    buttonContent.appendChild(eltext);

    const content = contentBlock_CreateDescrArea(id, descript)
    buttonContent.appendChild(content)

    descArea.appendChild(buttonContent);


    return descArea
}
function CreateSubmitArea() {
    const checkBox = document.createElement('input');
    checkBox.setAttribute('type', 'checkBox');
    checkBox.style.marginRight = '1%';
    return checkBox;
}
function CreateDeleteArea() {
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.setAttribute('type', 'submit');
    deleteButton.setAttribute('class', 'body_cont_in');
    deleteButton.style.marginLeft = 'auto';
    return deleteButton;

}

function taskBoxf(id, title) {
    const tasbx = document.createElement('div');
    tasbx.setAttribute('id', 'attr__ '+id+' '+title)
    tasbx.setAttribute('class', 'body_cont_in')
    tasbx.style.display = 'flex';
    return tasbx
}

function addTask(id, title, descript) {
    const taskBox_d1 = taskBoxf(id, title);
    const idArea = CreateIndexArea(id);

    const Title = CreateTitleArea(title);
    const Descript = CreateDescrArea(id, descript);
    const CheckBox = CreateSubmitArea();
    const DelBtn = CreateDeleteArea();

    taskBox_d1.appendChild(idArea);
    taskBox_d1.appendChild(CheckBox);
    taskBox_d1.appendChild(Title);
    taskBox_d1.appendChild(Descript);
    taskBox_d1.appendChild(DelBtn);

    VisionALL_INP.appendChild(taskBox_d1);
    DelBtn.addEventListener('click', function(event) {
        event.preventDefault();
        VisionALL_INP.removeChild(taskBox_d1);
        console.log(title);
        $.ajax({
            type:'POST',
            url: urlslib,
            data: {
                'delete_item':id},
            sucsses:function()
            {
            console.log('deleted|>>> '+id+" ||>>> "+title)
            }
        })
    });
}
