function cookies() {
    const popupDiv = document.createElement('div');
    popupDiv.innerHTML = cookiesPopup;

    document.body.appendChild(popupDiv);

    console.log("Cookies popup displayed");
}

window.onload = function() {
    const subtitle = document.querySelector('.randomfuntext');
    if (!subtitle) return;
    subtitle.innerHTML = subtitles[Math.floor(Math.random() * subtitles.length)]; // Set random funny subtitle with link to YouTube video in new page
};
