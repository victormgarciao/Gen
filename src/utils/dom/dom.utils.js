export function getAllBoxElementsList () {
    return [...document.querySelectorAll(".box")];
};

export function getSelectedBoxElements () {
    return document.getElementsByClassName("selected");
};