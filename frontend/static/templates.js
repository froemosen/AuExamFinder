const cookiesPopup = ` <div class="notification is-info is-light cookies-popup">
  <button class="delete" onclick="this.parentElement.remove()"></button>
  This website does not use cookies. We do however LOVE to eat them! 🍪🍪
</div> `;

const safetyPopup = ` <div class="notification is-info is-light cookies-popup">
  <button class="delete" onclick="this.parentElement.remove()"></button>
  This site functions as a proxy to the official <a href="https://timetable.scitech.au.dk/apps/skema/VaelgelevSkema.asp?webnavn=EKSAMENV&sprog=da" target="_blank" rel="noopener noreferrer">AU exam plan site</a>. <br>
  Unfortunately, due to CORS restrictions, it is not possible to get the information through the front-end, so a backend proxy is required. Your username+password is not stored in any way, and is communicated over HTTPS, just like it would be if you made the request to AU yourself. See the source code to check up on safety at the open source <a href="https://github.com/froemosen/AuExamFinder" target="_blank" rel="noopener noreferrer">GitHub repository</a>.
</div> `;

const subtitles = [
    `<i class="fa-solid fa-skull-crossbones"></i> Finding the amount of <b><a class="has-text-black" href="https://www.youtube.com/watch?v=wsO-Td0hqXo" target="_blank" rel="noopener noreferrer">dedotated wam</a></b> i should have to .. server <i class="fa-solid fa-skull-crossbones"></i>`,
    `<i class="fa-solid fa-code"></i> I love <b><a class="has-text-black" href="https://www.youtube.com/shorts/JAVMEs5CG1Y" target="_blank" rel="noopener noreferrer">AI</a></b>, do you use AI? <i class="fa-solid fa-code"></i>`,
    `<i class="fa-solid fa-cat"></i> I'm not a <b><a class="has-text-black" href="https://www.youtube.com/shorts/hInkPGRRg74" target="_blank" rel="noopener noreferrer">cat</a></b> <i class="fa-solid fa-cat"></i>`,
  ];