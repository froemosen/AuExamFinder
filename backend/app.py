from flask import Flask, render_template, jsonify

# Note: template_folder and static_folder point to the frontend directory
app = Flask(__name__, static_folder="../frontend/static", template_folder="../frontend")


@app.route("/")
def index():
    return render_template("index.html")

i = 0
@app.route("/api/hello")
def hello():
    global i
    i += 1
    return jsonify({"message": "Hello from Flask backend!", "count": i})


if __name__ == "__main__":
    # Use Flask dev server for local debugging; Docker runs the Flask CLI (flask run)
    app.run(host="0.0.0.0", port=5000, debug=True)
