
function register() {

    var invalid = false;
    var errors = document.getElementsByClassName("error");
    var inputs = document.getElementsByTagName("input");
    for (var i = 0; i < errors.length; i++) {
        errors[i].style.visibility = "hidden";
    }
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].style.border = "solid 1px gray";
    }

    var buttonError = document.getElementById("buttonError");

    var userName = document.getElementById("userName").value;
    if (userName.length < 2 || !isNaN(userName)) {
        document.getElementById("nameError").style.visibility = "visible";
        document.getElementById("nameError").innerHTML = "Username has to be longer than 2 characters and it can not be a number.";
        document.getElementById("userName").style.border = "solid 1px red";
        invalid = true;
    }

    var pass = document.getElementById("password").value;
    if (pass.length < 8 || !isNaN(pass)) {
        document.getElementById("passwordError").style.visibility = "visible";
        document.getElementById("passwordError").innerHTML = "Password has to be longer than 8 characters, and it can not be a number.";
        document.getElementById("password").style.border = "solid 1px red";
        invalid = true;
    }

    var confPass = document.getElementById("confirm").value;
    if (pass != confPass) {
        document.getElementById("confirmError").style.visibility = "visible";
        document.getElementById("confirmError").innerHTML = "Password and confirm password have to be the same.";
        document.getElementById("confirm").style.border = "solid 1px red";
        invalid = true;
    }

    var email = document.getElementById("email").value;
    var expression = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
    var regex = new RegExp(expression);

    if (!email.match(regex)) {
        document.getElementById("emailError").style.visibility = "visible";
        document.getElementById("emailError").innerHTML = "Wrong email.";
        document.getElementById("email").style.border = "solid 1px red";
        invalid = true;
    }


    if (invalid) {
        buttonError.innerHTML = "Errors in the form."
        buttonError.style.visibility = "visible";
    }

    return !invalid;
}

function login() {
    var invalid = false;
    var errors = document.getElementsByClassName("error");
    var inputs = document.getElementsByTagName("input");
    for (var i = 0; i < errors.length; i++) {
        errors[i].style.visibility = "hidden";
    }
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].style.border = "solid 1px gray";
    }

    var button2Error = document.getElementById("button2Error");

    var userName = document.getElementById("loginName").value;
    if (userName.length < 2 || !isNaN(userName)) {
        document.getElementById("loginName").style.border = "solid 1px red";
        invalid = true;
    }

    var pass = document.getElementById("loginPassword").value;
    if (pass.length < 8 || !isNaN(pass)) {
        document.getElementById("loginPassword").style.border = "solid 1px red";
        invalid = true;
    }

    if (invalid) {
        button2Error.innerHTML = "Wrong username or password."
        button2Error.style.visibility = "visible";
    }

    return !invalid;

}

