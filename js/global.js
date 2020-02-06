/* SaveTheVaquita.com scripts */

/* Setup hide mobile donation bar */
const elHideMobileDonationButton = document.getElementById("hide-mobile-donation");
const elMobileDonation = document.getElementById("mobile-donation");

elHideMobileDonationButton.addEventListener("click", () => {
    elMobileDonation.style.display = 'none';
});


