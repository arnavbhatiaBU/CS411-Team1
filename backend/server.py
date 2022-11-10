from flask import Flask
import requests
import json


app = Flask(__name__)

@app.route("/")
def testing_route():
    return "this is working"

@app.route("/nationalholiday")
def hello():
    api_key = ""
    with open("./config.json") as f:
        config = json.load(f)
        api_key = config["nationalHolidayKey"]
    
    url = f"https://holidayapi.com/v1/holidays?pretty&key={api_key}&country=US&year=2021"

    response = requests.request("GET", url)

    print(type(response.json()))

    return response.json()