import {useState} from "react";
import axios from "axios";

const SignIn = (props) => {
    const inputStyle = "w-2/3 h-10 border-2 rounded-md border-black mt-8 ml-auto mr-auto bg-transparent text-center text-l text-gray-600 placeholder:text-black placeholder:font-quicksand focus:outline-gray-600";
    const buttonStyle = "text-center border-2 rounded-md border-green-700 w-1/6 ml-auto mr-auto mt-8 text-gray-700 py-2 hover:bg-amber-50 hover:text-gray-600 font-raleway";
    const backgroundStyle = "h-screen w-screen bg-gray-200 flex justify-center";
    const formStyle = "h-1/2 w-1/2 mt-60 flex flex-col";
    const titleStyle = "text-center text-green mt-8 text-2xl font-raleway";
    const lineStyle = "mt-8 border-dotted w-2/3 ml-auto mr-auto bg-black border-2";

    const [userName, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [incorrectPassword, setIncorrectPassword] = useState(false);

    const handleSignIn = async () => {
        const data = JSON.stringify({
            "name": userName,
            "password": userPassword
        });

        var config = {
            method: 'get',
            url: `http://127.0.0.1:5000/signin?name=${userName}&password=${userPassword}`,
            headers: { }
          };
          
        try {
            const authRes = await axios(config)
            if (authRes.data != false) {
               localStorage.setItem("411Project", authRes.data);
               props.success();
            } else {
                setIncorrectPassword(true);
            }
        } catch (error) {
            console.log(error)
        }

    }


    const handleChange = (event) => {
        if (event.target.id === "userInput") setUserName(event.target.value);
        if (event.target.id === "passwordInput") setUserPassword(event.target.value);
    };

    const handleSignUp = () => {
        props.goToSignUp();
    }

    return(
        <div className={backgroundStyle}>
            <div className={formStyle}>
                <h1 className={titleStyle}>Sign In</h1>
                <input
                    id={"userInput"}
                    className={inputStyle}
                    placeholder={"Please Enter your user name"}
                    onChange={handleChange}
                    value={userName}
                ></input>
                <input
                    id={"passwordInput"}
                    className={inputStyle}
                    placeholder={"Please Enter your password"}
                    onChange={handleChange}
                    value={userPassword}
                    type={"password"}
                ></input>
                <button
                    className={buttonStyle}
                    onClick={handleSignIn}
                >
                    Sign In
                </button>

                <hr className={lineStyle} />
                <button
                    className={buttonStyle}
                    onClick={handleSignUp}
                >
                    Sign Up
                </button>
                {incorrectPassword ? <h1 className={"text-center font-xl text-red-700 mt-4"}>Wrong Password</h1> : null}
            </div>
        </div>
    )
}

export default SignIn;