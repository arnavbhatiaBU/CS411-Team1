from flask import Flask
from flask import request
from flask_cors import CORS
import requests
import json


app = Flask(__name__)
CORS(app)

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

def get_track(holiday_name):
    # Get the access token
    auth_url = "https://accounts.spotify.com/api/token"

    clientID = ""
    clientSecret = ""

    with open("./config.json") as f:
        config = json.load(f)
        clientID = config["spotifyClientID"]
        clientSecret = config["clientSecret"]

    data = {
        'grant_type': 'client_credentials',
        'client_id': clientID,
        'client_secret': clientSecret,
    }

    auth_res = requests.post(url=auth_url, data=data)
    access_token = auth_res.json().get('access_token')

    header = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": f"Bearer {access_token}"    
    }

    res = requests.get(url="https://api.spotify.com/v1/search?q=christmas&type=track", headers=header)

    res_cleaned = res.json()
    res_tracks = res_cleaned["tracks"]

    track_res = []

    for each_track in res_tracks["items"]:
        temp = {
            "name": each_track["name"],
            "artist": [e["name"] for e in each_track["artists"]],
            "album": each_track["album"]["name"]
        }
        track_res.append(temp)
    
    return track_res
