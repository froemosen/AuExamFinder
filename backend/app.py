import os
from flask import Flask, render_template, jsonify, send_file, current_app, abort, request
import requests
from werkzeug.utils import safe_join

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


    url = "https://timetable.scitech.au.dk/apps/skema/ElevSkema.asp?webnavn=EKSAMENV"

    print(form_data)

    try:
        response = requests.post(url, data=form_data)
        response.raise_for_status()  # Raise an HTTPError for bad responses (4xx and 5xx)
    except requests.RequestException as e:
        return f"An error occurred while contacting the remote server: {e}", 500



    return (response.content, response.status_code, response.headers.items())


if __name__ == "__main__":
    # Use Flask dev server for local debugging; Docker runs the Flask CLI (flask run)
    app.run(host="0.0.0.0", port=5000, debug=True)
