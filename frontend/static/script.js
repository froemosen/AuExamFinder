function cookies() {
    const popupDiv = document.createElement('div');
    popupDiv.innerHTML = cookiesPopup;

    document.body.appendChild(popupDiv);

    console.log("Cookies popup displayed");
}

function safety() {
    const popupDiv = document.createElement('div');
    popupDiv.innerHTML = safetyPopup;

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
        handleResponse(responseData);
    })
    .catch((error) => {
        console.error("Error:", error);
    });
}

function setResponseHTML(htmlResponse) {
    document.getElementById("content_window").innerHTML = htmlResponse;
}

function handleResponse(htmlResponse) {
    if (htmlResponse.includes("Tilmeldinger for")) {
        setResponseHTML(htmlResponse)
        prettifyResult()
    }
    else {
        let statusMessages = document.getElementById("statusMessages");
        // Find any strong string in htmlResponse <strong>Log ind for at se dit skema.</strong>
        let strongMatches = htmlResponse.match(/<strong>(.*?)<\/strong>/);
        if (strongMatches) {
            statusMessages.innerHTML = strongMatches[1];
        }
    }
    
}

function prettifyResult() {
    /*
    <div id="pageContainer"> 
        <h2>Tilmeldinger for Kristian Anton Hedegaard</h2><h3>Introduktion til sandsynlighedsteori og statistik</h3><strong>Skriftlig</strong> <br>
        <table border="1"><tbody><tr border="1"><td border="1"><a href="holdliste.asp?udbud=7706076&amp;holdgruppe_da=SKR&amp;hold=SKR&amp;webnavn=EKSAMENV">SKR</a></td><td>20-12-2025</td><td>10 - 14</td><td></td><td></td><td><strong>Eksamenshuset, Ib Spang Olsens Gade 7, 8200 Aarhus N</strong></td></tr>
        </tbody></table>
        <br><br><h3>Softwarekonstruktion og softwarearkitektur</h3><strong>Mundtlig</strong> <br>
        <table border="1"><tbody><tr border="1"><td border="1"><a href="holdliste.asp?udbud=7706090&amp;holdgruppe_da=MDT&amp;hold=HOLD05&amp;webnavn=EKSAMENV">HOLD05</a></td><td>06-01-2026</td><td>9 - 17</td><td></td><td></td><td><strong>Eks.og forb.lokaler: 5523-120, 5523-121, 5523-129 og 5523-131 Incuba. Der er ikke booket ekstra til Disp.</strong></td></tr>
        </tbody></table>
        <br><br><h3>Human-Computer Interaction</h3><strong>Skriftlig</strong> <br>
        <table border="1"><tbody><tr border="1"><td border="1"><a href="holdliste.asp?udbud=7706272&amp;holdgruppe_da=SKR&amp;hold=SKR&amp;webnavn=EKSAMENV">SKR</a></td><td>22-01-2026</td><td>10 - 12</td><td></td><td></td><td><strong>Eksamenshuset, Ib Spang Olsens Gade 7, 8200 Aarhus N</strong></td></tr>
        </tbody></table>
        <br><br>
    </div>
    */
    const container = document.getElementById("content_window");
    const newContent = document.createElement("div");
    const headings = container.querySelectorAll("h3");

    const title = document.createElement("h1");
    title.classList.add("title");
    title.classList.add("is-4");
    title.innerText = document.querySelector("h2").innerText;
    newContent.appendChild(title);

    const subtitle = document.createElement("h2");
    subtitle.classList.add("subtitle");
    subtitle.innerText = "Sorteret efter dato";
    newContent.appendChild(subtitle);

    headings.forEach(h3 => {
        console.log("Found this heading:" + h3.innerHTML);
        const title = h3.textContent.trim();
        const examType = h3.nextElementSibling.textContent.trim();
        console.log("This should be exam type: " + h3.nextElementSibling.innerHTML)
        const table = h3.nextElementSibling.nextElementSibling.nextElementSibling;
        console.log("This should be the table:" + h3.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML)
        const row = table.querySelector("tr");

        const date = row.children[1].textContent;
        const time = row.children[2].textContent;
        const location = row.children[5].textContent;

        const card = document.createElement("article");
        card.className = "panel is-info";

        card.innerHTML = `
            <p class="panel-heading is-small">
                    ${title} <br> 
                    <u style="font-weight: normal;">${examType}</u>
            </p>
            <div class="panel-block">
                <p><strong>Dato:</strong> ${date}</p> <br>
            </div>
            <div class="panel-block">
                <p><strong>Tid:</strong> ${time}</p> <br> 
            </div>
            <div class="panel-block">
                <p><strong>Lokation:</strong> ${location}</p>
            </div>
        `;

        newContent.appendChild(card);
    });

    container.innerHTML = "";
    container.appendChild(newContent);
}