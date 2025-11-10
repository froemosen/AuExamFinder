const cookiesPopup = ` <div class="notification is-info is-light cookies-popup">
  <button class="delete" onclick="this.parentElement.remove()"></button>
  <strong>Cookie Policy</strong><br><br>
  This website does not use cookies, tracking technologies, or store any personal data in your browser. 
  No analytics or third-party tracking services are employed. Your login credentials are transmitted directly 
  to Aarhus University's servers and are never stored on our systems. We do however LOVE to eat cookies! 🍪
</div> `;

const safetyPopup = ` <div class="notification is-info is-light cookies-popup">
  <button class="delete" onclick="this.parentElement.remove()"></button>
  <strong>Privacy & Security Information</strong><br><br>
  <strong>How it works:</strong> This site acts as a proxy to the official <a href="https://timetable.scitech.au.dk/apps/skema/VaelgelevSkema.asp?webnavn=EKSAMENV&sprog=da" target="_blank" rel="noopener noreferrer">AU exam timetable</a>. 
  Due to CORS (Cross-Origin Resource Sharing) restrictions, direct browser access to AU's system is not possible, requiring a backend proxy.<br><br>
  <strong>Data handling:</strong> Your AU credentials (username and password) are:
  <ul style="margin-left: 20px; margin-top: 5px;">
    <li>Transmitted securely to my backend via HTTPS through a Cloudflare tunnel</li>
    <li>Sent directly from my backend to Aarhus University's servers</li>
    <li>Never logged, stored, or retained in any form</li>
    <li>Immediately cleared from server memory after use</li>
  </ul>
  <strong>Infrastructure:</strong> The application runs in a Docker container on a private server, accessible only through Cloudflare's secure tunnel infrastructure, ensuring end-to-end encryption.<br><br>
  <strong>Transparency:</strong> Full source code is available for review at the open-source <a href="https://github.com/froemosen/AuExamFinder" target="_blank" rel="noopener noreferrer">GitHub repository</a>. You can verify how your data is handled.<br><br>
  <strong>Legal:</strong> This service is provided as-is for educational purposes. It is not affiliated with Aarhus University. Use at your own discretion.
</div> `;