import os
from flask import Flask, render_template, request
import requests
from datetime import datetime

# Note: template_folder and static_folder point to the frontend directory
app = Flask(__name__, static_folder="../frontend/static", template_folder="../frontend")


@app.route("/")
def index():
    return render_template("index.html")

@app.route("/proxy_skema", methods=["POST"])
def proxy_skema():
    # Official URLs for exam timetables. You can check them out, to see how the original site works :)
    urlV = "https://timetable.scitech.au.dk/apps/skema/ElevSkema.asp?webnavn=EKSAMENV"
    urlS = "https://timetable.scitech.au.dk/apps/skema/ElevSkema.asp?webnavn=EKSAMENS"

    # Accept JSON (from fetch with Content-Type: application/json) or fallback to form data
    form_data = request.get_json(silent=True) # THIS FORM DATA IS HIGHLY CONFIDENTIAL - handle with care!
    if form_data is None:
        form_data = request.form.to_dict()


    try:
        responseV = requests.post(urlV, data=form_data)
        responseV.raise_for_status()  # Raise an HTTPError for bad responses (4xx and 5xx)
        responseV = removeHeadSection(responseV)
    except requests.RequestException as e:
        return f"An error occurred while contacting the remote server: {e}", 500
    
    try:
        responseS = requests.post(urlS, data=form_data)
        responseS.raise_for_status()  # Raise an HTTPError for bad responses (4xx and 5xx)
        responseS = removeHeadSection(responseS)
        
    except requests.RequestException as e:
        return f"An error occurred while contacting the remote server: {e}", 500
    
    form_data = None # Clear form data from memory as it's sensitive. Ensures it is not accidentally accessed later.

    if (isAfterSummer()):
        response = responseV
        response._content = responseV.content + responseS.content
    else:
        response = responseS
        response._content = responseS.content + responseV.content
    
    # Replace single-byte 0xe6 with UTF-8 encoded 'æ' and assign the result back
    response._content = response._content.replace(b"\xe6", b"\xc3\xa6") # 'æ'
    response._content = response._content.replace(b"\xf8", b"\xc3\xb8") # 'ø'
    response._content = response._content.replace(b"\xe5", b"\xc3\xa5") # 'å'
    response.headers["Content-Type"] = "text/html; charset=UTF-8"

    # When an exam is not planned, it will be noted as "MDT" instead of "Mundtlig". Let's replace this.
    response._content = response._content.replace(b"MDT", b"Mundtlig")

    

    return (response.content, response.status_code, response.headers.items())


def isAfterSummer():
    today = datetime.today()
    if today.month > 7:
        return True
    return False

def removeHeadSection(response):
    start_head = response._content.find(b"<head>")
    end_head = response._content.find(b"</head>") + len(b"</head>")
    response._content = response._content[:start_head] + response._content[end_head:]
    return response


@app.route("/favicon.ico")
def favicon():
    return app.send_static_file("favicon.ico")


