import os
from flask import Flask, render_template, jsonify, send_file, current_app, abort, request
import requests
from werkzeug.utils import safe_join
from datetime import datetime

# Note: template_folder and static_folder point to the frontend directory
app = Flask(__name__, static_folder="../frontend/static", template_folder="../frontend")


@app.route("/")
def index():
    return render_template("index.html")

@app.route("/proxy_skema", methods=["POST"])
def proxy_skema():

    # Accept JSON (from fetch with Content-Type: application/json) or fallback to form data
    data = request.get_json(silent=True)
    if data is None:
        form_data = request.form.to_dict()
    else:
        form_data = data


    urlV = "https://timetable.scitech.au.dk/apps/skema/ElevSkema.asp?webnavn=EKSAMENV"
    urlS = "https://timetable.scitech.au.dk/apps/skema/ElevSkema.asp?webnavn=EKSAMENS"

    print(form_data)

    try:
        responseV = requests.post(urlV, data=form_data)
        responseV.raise_for_status()  # Raise an HTTPError for bad responses (4xx and 5xx)
    except requests.RequestException as e:
        return f"An error occurred while contacting the remote server: {e}", 500
    
    try:
        responseS = requests.post(urlS, data=form_data)
        responseS.raise_for_status()  # Raise an HTTPError for bad responses (4xx and 5xx)
    except requests.RequestException as e:
        return f"An error occurred while contacting the remote server: {e}", 500

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

if __name__ == "__main__":
    # Use Flask dev server for local debugging; Docker runs the Flask CLI (flask run)
    app.run(host="0.0.0.0", port=5000, debug=True)
