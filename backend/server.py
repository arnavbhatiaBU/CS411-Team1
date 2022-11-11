from flask import Flask
from flask import request
from flask_cors import CORS
import requests
import json


app = Flask(__name__)
CORS(app)

@app.route("/")
def testing_route():
    return "test"

@app.route("/nationalholiday")
def national_holiday():
    api_key = ""
    with open("./config.json") as f:
        config = json.load(f)
        api_key = config["nationalHolidayKey"]
    
    url = f"https://holidayapi.com/v1/holidays?pretty&key={api_key}&country=US&year=2021"

    response = requests.request("GET", url)

    return response.json()

@app.route("/holidaybydate")
def holiday_by_date():
    lookup_day = request.args.get("day")
    lookup_month = request.args.get("month")
    lookup_year = request.args.get("year")

    api_key = ""
    with open("./config.json") as f:
        config = json.load(f)
        api_key = config["nationalHolidayKey"]
    
    url = f"https://holidayapi.com/v1/holidays?pretty&key={api_key}&country=US&year=2021"

    raw_response = requests.request("GET", url)
    parsed_response = raw_response.json()

    res = []

    for each_holiday in parsed_response["holidays"]:
        if each_holiday["date"] == f"{lookup_year}-{lookup_month}-{lookup_day}":
            res.append(each_holiday)

    return res
    