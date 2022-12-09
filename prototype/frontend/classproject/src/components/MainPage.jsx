import { useState } from "react";
import axios from 'axios';

const MainPage = (props) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    async function getUserData(){
        res = "";
        await fetch("http://localhost:3002/getUserData", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("accessToken")
            }}).then((response) => {
                return response.json();
            }).then((data) => {
                res = data.login
        })
        return res;
    }

    const handleClick = async () => {
        const parsedInput = searchTerm.split("-");
        var config = {
            method: 'get',
            url: `http://127.0.0.1:5000/holidaybydate?year=2021&month=${parsedInput[1]}&day=${parsedInput[2]}`,
            headers: { "Access-Control-Allow-Origin": "*" }
          };
          
          axios(config)
          .then(function (response) {
            props.updateRes(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    const handleLogOut = () => {
        localStorage.removeItem("accessToken");
        window.location.assign("http://localhost:3000/")
    }

    return(
        <div className="flex flex-col">
            <h1> Input your favorite holiday date and recieve the top 20 songs you can celebrate it with! </h1>
            <input 
                className="w-2/3 mx-auto text-center mt-10 border-4 border-gray-600 rounded-xl mb-4" 
                placeholder="yyyy-mm-dd"
                value={searchTerm}
                onChange={handleChange}
                >
            </input>
            <button 
                className="border-4 border-gray-500 rounded-2xl w-1/5 mx-auto hover:bg-gray-700 hover:text-white"
                onClick={handleClick}>
                    Search
            </button>
            <button 
                className="border-4 border-gray-500 mt-4 rounded-2xl w-1/5 mx-auto hover:bg-gray-700 hover:text-white"
                onClick={handleLogOut}>
                    Log Out
            </button>
        </div>
    )
}

export default MainPage;