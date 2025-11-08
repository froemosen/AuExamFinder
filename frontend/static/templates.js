const cookiesPopup = ` <div class="notification is-info is-light cookies-popup">
  <button class="delete" onclick="this.parentElement.remove()"></button>
  This website does not use cookies. We do however LOVE to eat them! 🍪🍪
</div> `;

const safetyPopup = ` <div class="notification is-info is-light cookies-popup">
  <button class="delete" onclick="this.parentElement.remove()"></button>
  This site functions as a proxy to the official <a href="https://timetable.scitech.au.dk/apps/skema/VaelgelevSkema.asp?webnavn=EKSAMENV&sprog=da" target="_blank" rel="noopener noreferrer">AU exam plan site</a>. <br>
  Unfortunately, due to CORS restrictions, it is not possible to get the information through the front-end, so a backend proxy is required. Your username+password is not stored in any way, and is communicated over HTTPS, just like it would be if you made the request to AU yourself. This is done through a cloudflare tunnel to my local server. <br>
   See the source code to check up on safety at the open source <a href="https://github.com/froemosen/AuExamFinder" target="_blank" rel="noopener noreferrer">GitHub repository</a>.
</div> `;