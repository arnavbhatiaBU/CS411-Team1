const express = require("express");
const cors = require("cors");
const fetch = (...args) => import("node-fetch").then(({default: fetch}) => fetch(...args));
const bodyParser = require('body-parser');
const { json } = require("express");

const CLIENT_ID = "1bc64da3c71c4ba24665"
const CLIENT_SECRET = "2dea0c38f86671542c3c26847644968d294de163"

const app = express();
app.use(cors())
app.use(bodyParser.json())

app.get('/getAccessToken', async (req, res) => {
    console.log(req)
    const params = `?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${req.query.code}`
    await fetch("https://github.com/login/oauth/access_token" + params, {
        method: "POST",
        headers: {
            "Accept": "application/json"
        }
    }).then((response) => {
        return response.json();
    }).then((data) => {
        res.json(data);
    })
})

app.get('/getUserData', async (req, res) => {
    req.get("Authorization");
    await fetch("https://api.github.com/user", {
        method: "GET",
        headers: {
            "Authorization": req.get("Authorization")
        }
    }).then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data);
        res.json(data);
    })
})

app.listen(3002, function () {
    console.log("This server is running")
})