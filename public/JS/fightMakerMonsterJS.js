function createMonsterFight() {
    var invalid = false;
    var errors = document.getElementsByClassName("error");
    for (var i = 0; i < errors.length; i++) {
        errors[i].style.visibility = "hidden";
    }

    var radios = document.getElementsByName("monster");
    var radios2 = document.getElementsByName("user");

    var boolTab = [false, false];

    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            boolTab[0] = true;
        }
    }

    for (i = 0; i < radios2.length; i++) {
        if (radios2[i].checked) {
            boolTab[1] = true;
        }
    }

    for (var i = 0; i < boolTab.length; i++) {
        console.log(boolTab[i]);
        if (boolTab[i] == false) {
            invalid = true;
        }
    }

    if (invalid) {
        buttonError.innerHTML = "You have to pick one from each category."
        buttonError.style.visibility = "visible";
    }

    return !invalid;
}
