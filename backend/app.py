import os
from flask import Flask, render_template, jsonify, send_file, current_app, abort
from werkzeug.utils import safe_join

# Note: template_folder and static_folder point to the frontend directory
app = Flask(__name__, static_folder="../frontend/static", template_folder="../frontend")


@app.route("/")
def index():
    return render_template("index.html")

@app.route("/cv")
def cv():
    return render_template("cv.html")

i = 0
@app.route("/api/hello")
def hello():
    global i
    i += 1
    return jsonify({"message": "Hello from Flask backend!", "count": i})

@app.route("/api/cv")
def cv_api():
    file_path = os.path.join(current_app.root_path, "LinkedinCV.pdf")
    if not os.path.exists(file_path):
        abort(404)
    return send_file(file_path, mimetype="application/pdf", as_attachment=False)

@app.route("/api/get_image/<filename>")
def get_image(filename):
    file_path = safe_join(current_app.root_path, "assets", filename)
    if not os.path.exists(file_path):
        abort(404)
    return send_file(file_path, mimetype="image/jpeg", as_attachment=False)

@app.route("/api/get_sound/<filename>")
def get_sound(filename):
    file_path = safe_join(current_app.root_path, "assets", filename)
    if not os.path.exists(file_path):
        abort(404)
    return send_file(file_path, mimetype="audio/mp3", as_attachment=False)

if __name__ == "__main__":
    # Use Flask dev server for local debugging; Docker runs the Flask CLI (flask run)
    app.run(host="0.0.0.0", port=5000, debug=True)
