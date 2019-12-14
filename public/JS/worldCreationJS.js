function createWorld() {
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

    var worldName = document.getElementById("worldName").value;
    if (worldName.length < 2 || !isNaN(worldName)) {
        document.getElementById("nameError").style.visibility = "visible";
        document.getElementById("nameError").innerHTML = "Name has to be longer than 2 characters and it can not be a number.";
        document.getElementById("worldName").style.border = "solid 1px red";
        invalid = true;
    }

    if (invalid) {
        buttonError.innerHTML = "Errors in the form."
        buttonError.style.visibility = "visible";
    }

    return !invalid;
}
