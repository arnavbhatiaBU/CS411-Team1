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

@app.route("/signup")
def handle_signup():
    user_name = request.args.get("name")
    user_password = request.args.get("password")

    with open("./userInfo.json", "r") as f:
        all_users = json.load(f)
        if user_name in all_users:
            return "user already exists"

    all_users[user_name] = user_password

    with open("./userInfo.json", "w") as f:
        f.write(json.dumps(all_users, indent=4))
        return "success"
 
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
    lookup_day = request.args.get("day") if len(request.args.get("day")) == 2 else "0" + request.args.get("day")
    lookup_month = request.args.get("month") if len(request.args.get("month")) == 2 else "0" + request.args.get("month")

    print(f"look for month {lookup_month}, and date {lookup_day}")

    holiday_api_key = ""
    with open("./config.json") as f:
        config = json.load(f)
        holiday_api_key = config["nationalHolidayKey"]
    
    url = f"https://holidayapi.com/v1/holidays?pretty&key={holiday_api_key}&country=US&year=2021"

    raw_response = requests.request("GET", url)
    parsed_response = raw_response.json()

    res = []

    for each_holiday in parsed_response["holidays"]:
        if lookup_day == each_holiday["date"].split("-")[2] and lookup_month == each_holiday["date"].split("-")[1]:
            res.append({
                "name": each_holiday["name"],
                "date": each_holiday["date"]
            })

    res_with_track = []
    for each_day in res:
        search_term = each_day["name"].split(" ")[0]
        songs = get_track(search_term)
        temp = {
            "date": each_day["date"],
            "name": each_day["name"],
            "tracks": songs
        }
        res_with_track.append(temp)

    return res_with_track

def get_track(spotify_api_key):
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

    res = requests.get(url=f"https://api.spotify.com/v1/search?q={spotify_api_key}&type=track", headers=header)

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