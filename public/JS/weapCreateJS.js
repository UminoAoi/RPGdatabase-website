function createWeapon() {

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

    var weapName = document.getElementById("weapName").value;
    if (weapName.length < 2 || !isNaN(weapName)) {
        document.getElementById("nameError").style.visibility = "visible";
        document.getElementById("nameError").innerHTML = "Name has to be longer than 2 characters and it can not be a number.";
        document.getElementById("weapName").style.border = "solid 1px red";
        invalid = true;
    }

    var pointsLeft = document.getElementById("pointsLeft").textContent;
    if (pointsLeft > 0) {
        document.getElementById("pointsError").style.visibility = "visible";
        document.getElementById("pointsError").innerHTML = "You have to spend all points.";
        invalid = true;
    }

    var weapAtt = document.getElementById("attackPoints").value;
    var weapDef = document.getElementById("defencePoints").value;

    if (invalid) {
        buttonError.innerHTML = "Errors in the form."
        buttonError.style.visibility = "visible";
    }

    return !invalid;
}

function upAttack() {
    var pointsLeft = document.getElementById("pointsLeft");
    if (pointsLeft.textContent > 0) {
        var points = document.getElementById("attackPoints");
        points.innerHTML = parseInt(points.textContent, 10) + 1;
        pointsLeft.innerHTML = parseInt(pointsLeft.textContent, 10) - 1;
    }
}

function downAttack() {
    var pointsLeft = document.getElementById("pointsLeft");
    var points = document.getElementById("attackPoints");
    if (pointsLeft.textContent < 20 && points.textContent > 0) {

        points.innerHTML = parseInt(points.textContent, 10) - 1;
        pointsLeft.innerHTML = parseInt(pointsLeft.textContent, 10) + 1;
    }
}

function upDefence() {
    var pointsLeft = document.getElementById("pointsLeft");
    if (pointsLeft.textContent > 0) {
        var points = document.getElementById("defencePoints");
        points.innerHTML = parseInt(points.textContent, 10) + 1;
        pointsLeft.innerHTML = parseInt(pointsLeft.textContent, 10) - 1;
    }
}

function downDefence() {
    var pointsLeft = document.getElementById("pointsLeft");
    var points = document.getElementById("defencePoints");
    if (pointsLeft.textContent < 20 && points.textContent > 0) {
        points.innerHTML = parseInt(points.textContent, 10) - 1;
        pointsLeft.innerHTML = parseInt(pointsLeft.textContent, 10) + 1;
    }
}
