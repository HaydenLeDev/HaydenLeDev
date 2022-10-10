/**
 * File dealing with filters.
 */

import { displayImage} from "./display.js";
import { eventLightbox, eventLike } from "./evenement.js";

var options = ["Popularité", "Date", "Titre"];
var typeSort = options[0];

/**
 * Initialize the filter
 * @param {*} data 
 */
function initFiltre(data) {
    //On insert la liste des options dans les div
    swapTextDiv();
    let customSelect = document.getElementById("custom-select");
    let arrow = document.getElementById("arrow");

    customSelect.addEventListener("click", function () {
        //Si les divs sont ouverte (active)
        if (arrow.classList[1] == "active"){
            arrow.classList.remove("active");
            customSelect.classList.remove("custom-select_active");
            typeSort = options[0];
            sortData(data);
            displayImage(data);
            eventLightbox();
            eventLike();
            document.getElementById("opt_1").setAttribute("style","border-radius: 5px;");
            //On doit rendre les option invisible pour une meilleure accessibiliter
            document.getElementById("opt_2").setAttribute("style","visibility: hidden;");
            document.getElementById("opt_3").setAttribute("style","visibility: hidden;");

            
        } else {
            //Sinon on les rend active
            arrow.classList.add("active");
            customSelect.classList.add("custom-select_active");
            document.getElementById("opt_1").setAttribute("style","border-radius: 5px 5px 0px 0px;");
            document.getElementById("opt_2").setAttribute("style","visibility: visible;");
            document.getElementById("opt_3").setAttribute("style","visibility: visible;");
        }
        
    });
}

/**
 * Event for option 1 for sorting
 */
document.getElementById("opt_1").addEventListener("click", function () {
    let optionChoice = document.getElementById("opt_1").innerText;
    let index = options.indexOf(optionChoice);
    swapOptions(index)
    swapTextDiv();
});

/**
 * Event for option 2 for sorting
 */
document.getElementById("opt_2").addEventListener("click", function () {
    let optionChoice = document.getElementById("opt_2").innerText;
    let index = options.indexOf(optionChoice);
    swapOptions(index)
    swapTextDiv();
});

/**
 * Event for option 3 for sorting
 */
document.getElementById("opt_3").addEventListener("click", function () {
    let optionChoice = document.getElementById("opt_3").innerText;
    let index = options.indexOf(optionChoice);
    swapOptions(index)
    swapTextDiv();
});

/**
 * Swap two options from the options array
 * @param {*} index 
 */
function swapOptions(index) {
    let tmp = options[index];
    options[index] = options[0];
    options[0] = tmp;
}

/**
 * Change the text inside the div.
 */
function swapTextDiv() {
    let divOptionsTitre = document.getElementsByClassName("custom-select__name");

    for (let i = 0; i < options.length; i++) {
        divOptionsTitre[i].textContent = options[i];
    }
}

/**
 * Sort the photo list according to the desired sorting type.
 * @param {*} data 
 */
async function sortData(data) {
    if (typeSort === "Popularité") {
        data[1].sort(function (a, b) { return a.likes - b.likes });
        data[1].reverse();
    } else if (typeSort === "Date") {
        data[1].sort(function (a, b) { return a.date - b.date });
        data[1].reverse();
    } else if (typeSort === "Titre") {
        data[1].sort((a, b) => a.title.localeCompare(b.title))
    }
}

export {initFiltre, sortData};