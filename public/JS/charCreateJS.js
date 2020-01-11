function createCharacter() {

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

    var charName = document.getElementById("charName").value;
    if (charName.length < 2 || !isNaN(charName)) {
        document.getElementById("nameError").style.visibility = "visible";
        document.getElementById("nameError").innerHTML = "Name has to be longer than 2 characters and it can not be a number.";
        document.getElementById("charName").style.border = "solid 1px red";
        invalid = true;
    }

    var charSpecies = document.getElementById("charSpecies").value;
    if (charSpecies.length < 4 || !isNaN(charSpecies)) {
        document.getElementById("speciesError").style.visibility = "visible";
        document.getElementById("speciesError").innerHTML = "Species has to be longer than 4 characters and it can not be a number.";
        document.getElementById("charSpecies").style.border = "solid 1px red";
        invalid = true;
    }

    var charImage = document.getElementById("charImage").value;
    var expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
    var regex = new RegExp(expression);

    if (!charImage.match(regex)) {
        document.getElementById("imageError").style.visibility = "visible";
        document.getElementById("imageError").innerHTML = "Wrong URL image link.";
        document.getElementById("charImage").style.border = "solid 1px red";
        invalid = true;
    }

    var charDate = document.getElementById("charDate").value;
    expression = /^(0[1-9]|1[0-2])\-(0[1-9]|1\d|2\d|3[01])\-(19|20)\d{2}$/g;
    regex = new RegExp(expression);

    if (!charDate.match(regex)) {
        document.getElementById("dateError").style.visibility = "visible";
        document.getElementById("dateError").innerHTML = "Wrong date format. Creation date should be earlier than today.";
        document.getElementById("charDate").style.border = "solid 1px red";
        invalid = true;
    } else {

        var parts = charDate.split("-");
        var day = parseInt(parts[1], 10);
        var month = parseInt(parts[0], 10);
        var year = parseInt(parts[2], 10);
        var date = new Date();
        try {
            date.setFullYear(year, month - 1, day);
            var compareDates = new Date;
            if (date.getTime() > compareDates.getTime())
                throw "Date is later!";
            if (month != date.getMonth() + 1)
                throw "Wrong date";
        } catch (error) {
            document.getElementById("dateError").style.visibility = "visible";
            document.getElementById("dateError").innerHTML = "Wrong date format. Creation date should be earlier than today.";
            document.getElementById("charDate").style.border = "solid 1px red";
            invalid = true;
        }

    }

    var pointsLeft = document.getElementById("pointsLeft").textContent;

    var charAtt = document.getElementById("attackPoints").value;
    var charDef = document.getElementById("defencePoints").value;
    
    if(parseInt(charAtt, 10) + parseInt(charDef, 10) != 20){
        document.getElementById("pointsError").style.visibility = "visible";
        document.getElementById("pointsError").innerHTML = "Error in points number.";
        invalid = true;
    }
    
    var charWeaponList = document.getElementById("weaponSelect");
    var charWeapon = charWeaponList.options[charWeaponList.selectedIndex].text;

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
        points.value = parseInt(points.value, 10) + 1;
        pointsLeft.innerHTML = parseInt(pointsLeft.textContent, 10) - 1;
    }
}

function downAttack() {
    var pointsLeft = document.getElementById("pointsLeft");
    var points = document.getElementById("attackPoints");
    if (pointsLeft.textContent < 20 && points.value > 0) {
        points.value = parseInt(points.value, 10) - 1;
        pointsLeft.innerHTML = parseInt(pointsLeft.textContent, 10) + 1;
    }
}

function upDefence() {
    var pointsLeft = document.getElementById("pointsLeft");
    if (pointsLeft.textContent > 0) {
        var points = document.getElementById("defencePoints");
        points.value = parseInt(points.value, 10) + 1;
        pointsLeft.innerHTML = parseInt(pointsLeft.textContent, 10) - 1;
    }
}

function downDefence() {
    var pointsLeft = document.getElementById("pointsLeft");
    var points = document.getElementById("defencePoints");
    if (pointsLeft.textContent < 20 && points.value > 0) {
        points.value = parseInt(points.value, 10) - 1;
        pointsLeft.innerHTML = parseInt(pointsLeft.textContent, 10) + 1;
    }
}
