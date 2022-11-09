from flask import Flask

app = Flask(__name__)

@app.route("/")
def testing_route():
    return "this is working"