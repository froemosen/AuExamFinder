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


function handleSubmit(event) {
    event.preventDefault();  // Prevent the default form submission

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    fetch("/proxy_skema", {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
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

let dates = new Map();

function prettifyResult() {
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

        const card = document.createElement("article");
        card.className = "panel is-info mb-6";

        if (table && table.tagName.toLowerCase() === "table") {
            console.log("This should be the table:" + h3.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML)
            const row = table.querySelector("tr");

            const date = row.children[1].textContent;
            const time = row.children[2].textContent;
            const location = row.children[5].textContent;

            

            card.innerHTML = `
                <p class="panel-heading is-small">
                        ${title} <br> 
                        <span style="font-weight: normal;">${examType}</span>
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
        }
        else {
            console.log("No table found for this heading. Not planned yet.");
            card.innerHTML = `
                <p class="panel-heading is-small">
                        ${title} <br> 
                        <span style="font-weight: normal;">${examType}</span>
                </p>
                <div class="panel-block">
                    <p><em>Ingen planlagte eksamener fundet.</em></p>
                </div>
            `;
        }
        
        dates.set(card, date);
        newContent.appendChild(card);
    });

    // Sort cards by date
    const sortedCards = Array.from(dates.entries()).sort((a, b) => {
        const dateA = new Date(a[1].split("-").reverse().join("-"));
        const dateB = new Date(b[1].split("-").reverse().join("-"));
        return dateA - dateB;
    });
    
    newContent.innerHTML = "";
    sortedCards.forEach(([card, _]) => {
        newContent.appendChild(card);
    });

    container.innerHTML = "";
    container.appendChild(newContent);
}

function currentOfficialAUExamLink() {
    const month = new Date().getMonth() + 1; // getMonth() is zero-based
    if (month >= 7 || month <= 1) {
        return "https://timetable.scitech.au.dk/apps/skema/VaelgelevSkema.asp?webnavn=EKSAMENV&sprog=da"; // Winter exams
    } else {
        return "https://timetable.scitech.au.dk/apps/skema/VaelgelevSkema.asp?webnavn=EKSAMENS&sprog=da"; // Summer exams
    }
}