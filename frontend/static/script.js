function cookies() {
    const popupDiv = document.createElement('div');
    popupDiv.innerHTML = cookiesPopup;

    document.body.appendChild(popupDiv);

    console.log("Cookies popup displayed");
}