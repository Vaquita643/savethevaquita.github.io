var readMoreButtons = document.querySelectorAll(".read-more-btn");

for (const readMoreButton of readMoreButtons) {
    readMoreButton.addEventListener("click", () => onReadMoreClicked(readMoreButton.parentElement.previousElementSibling, readMoreButton));
}

/* setup the "read more" buttons so that when they are clicked the full text appears */
function onReadMoreClicked(element, btnText) {
    var dots = element.querySelector(".dots");
    var moreText = element.querySelector(".more");

    if (dots.style.display === "none") {
        dots.style.display = "inline";
        btnText.innerHTML = "Read more";
        moreText.style.display = "none";
    } else {
        dots.style.display = "none";
        btnText.innerHTML = "Read less";
        moreText.style.display = "inline";
    }
}

