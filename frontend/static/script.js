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

function handleSubmit(event) {
    event.preventDefault();  // Prevent the default form submission

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    fetch("/proxy_skema", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(async response => {
        
        if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
        }
        const responseData = await response.text();
        console.log("Success:", responseData);
    })
    .then(data => {
        // Handle the response data
        console.log("Success:", data);
    })
    .catch((error) => {
        console.error("Error:", error);
    });
}
