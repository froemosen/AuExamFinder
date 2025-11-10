# 📚 AuExamFinder

A web application that helps Aarhus University students easily find and view their registered exam schedules in a clean, modern interface.

Only work for students that are registered for exams in the AU system and use the Scitech timetable.
The original exam timetable system can be found [here](https://timetable.scitech.au.dk/apps/skema/VaelgelevSkema.asp?webnavn=EKSAMENV&sprog=da).


When I host the website, I make sure to host it securely with Cloudflare in front to provide HTTPS and DDoS protection. This ensures that user credentials are transmitted securely to my backend, and then again to the AU exam system.

## 🌟 Features

- **Secure Authentication**: Login with your AU credentials (student number or AUxxxx username)
- **Unified Exam View**: Automatically combines both summer and winter exam schedules
- **Clean Interface**: Modern, responsive design using Bulma CSS framework
- **Sorting**: Sorts between winter and summer exams based on the current semester
- **Privacy-Focused**: Credentials are handled securely and cleared from memory immediately after use
- **Docker Support**: Easy deployment using Docker and Docker Compose
- **Open Source**: Fully open-source for transparency reasons



## 🏗️ Project Structure

```
AuExamFinder/
├── backend/
│   ├── app.py              # Flask backend with proxy logic
│   └── requirements.txt    # Python dependencies
├── frontend/
│   ├── index.html          # Main HTML page
│   └── static/
│       ├── script.js       # Frontend JavaScript logic
│       ├── styles.css      # Custom styles
│       └── templates.js    # Popup templates
├── docker-compose.yml      # Docker Compose configuration
├── Dockerfile              # Docker build instructions
└── README.md               # This file
```

## 🔧 How It Works

1. **User Authentication**: The application accepts AU login credentials (student number or AUxxxx format)
2. **Proxy Request**: The backend proxies requests to Aarhus University's official exam timetable system
3. **Data Processing**: 
   - Fetches both summer (EKSAMENV) and winter (EKSAMENS) exam schedules
   - Fixes character encoding for Danish characters (æ, ø, å)
   - Combines schedules based on the current semester
4. **Display**: Frontend prettifies the data into a clean, card-based interface sorted by date

## 🛡️ Security Features

- Credentials are never stored or logged
- Form data is cleared from memory immediately after use
- HTTPS support ready for production deployment
- No cookies or tracking implemented


## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

© 2025 froemosen / Kristian Anton Hedegaard

## ⚠️ Disclaimer

**DENNE SIDE ER IKKE TILKNYTTET AARHUS UNIVERSITET**

This site is not affiliated with or endorsed by Aarhus University. It is an independent project created to help students access their exam information more conveniently. You can use the link on the website to go to the official AU exam timetable system.

## 🔗 Official Resources

The application proxies data from the official AU exam timetable:
- Summer Exams: https://timetable.scitech.au.dk/apps/skema/ElevSkema.asp?webnavn=EKSAMENV
- Winter Exams: https://timetable.scitech.au.dk/apps/skema/ElevSkema.asp?webnavn=EKSAMENS

## 📧 Contact

For questions or issues, please open an issue on GitHub or contact me through email kristianantonhedegaard@gmail.com.

---

Made with ❤️ for AU students
