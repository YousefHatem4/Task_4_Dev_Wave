var inputEmail = document.getElementById('inputEmail');
var inputPass = document.getElementById('inputPass');
var inputName = document.getElementById('inputNameBtn');
var loginBtn = document.getElementById('loginBtn');
var incorrect = document.getElementById('incorrect');
var correct = document.getElementById('correct');
var infoExist = document.getElementById('infoExist');
var formContainer = [];



if (localStorage.getItem('FormLists') !== null) {
    formContainer = JSON.parse(localStorage.getItem('FormLists'));
}

function addForm() {
    var FormLists = {
        name: inputName.value,
        email: inputEmail.value, 
        pass: inputPass.value,
    }
    var formStorage =  JSON.parse(localStorage.getItem('FormLists')) || [];
    var existForm = false;

    for (var i = 0; i < formStorage.length; i++){
        if (formStorage[i].email === inputEmail.value) {
            existForm = true;
            break;
        }
    }

     if (existForm){
        infoExist.classList.remove('d-none');
        incorrect.classList.add('d-none');
        correct.classList.add('d-none')
    }
    else if (FormLists.email && FormLists.pass && FormLists.name) {
        formContainer.push(FormLists);
        localStorage.setItem('FormLists', JSON.stringify(formContainer));
        clearForm();
        correct.classList.remove('d-none');
         incorrect.classList.add('d-none');
         infoExist.classList.add('d-none');
        
    }
   
    else {
        incorrect.classList.remove('d-none');
        correct.classList.add('d-none');
    }
}


    var formStorage =  JSON.parse(localStorage.getItem('FormLists')) || [];
    var userExists = false;
var username = '';

function check() {
    for (var i = 0; i < formStorage.length; i++){
        if (formStorage[i].email === inputEmail.value && formStorage[i].pass === inputPass.value) {
            userExists = true;
            username = formStorage[i].name;
            break;
        }
    }

    if (userExists) {
        localStorage.setItem('currentUser', username);
        correct.classList.remove('d-none');
        incorrect.classList.add('d-none');
        setTimeout(() => {
            window.location.href = './home.html';
        }, 1000); 
    } else {
        incorrect.classList.remove('d-none');
        correct.classList.add('d-none');
    }
}





function clearForm() {
    inputName.value = null;
    inputEmail.value = null;
    inputPass.value = null;
}

var login = localStorage.getItem('currentUser');
if (login) {
    var welcomeElement = document.getElementById('welcomeUser');
    welcomeElement.innerHTML = `Welcome ${login}`;
}