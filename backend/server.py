from flask import Flask
from flask import request
import requests
import json


app = Flask(__name__)

@app.route("/")
def testing_route():
    return "this is working"

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
    return {
        "year": lookup_year,
        "month": lookup_month,
        "day": lookup_day
    }