import {useState} from "react";
import axios from "axios";

const SignUp = (props) => {
    const inputStyle = "w-2/3 h-10 border-2 rounded-md border-black mt-8 ml-auto mr-auto bg-transparent text-center text-l text-gray-600 placeholder:text-black placeholder:font-quicksand focus:outline-gray-600";
    const buttonStyle = "text-center border-2 rounded-md border-black w-1/6 ml-auto mr-auto mt-8 text-gray-500 py-2 hover:bg-amber-50 hover:text-gray-600 font-silkscreen";
    const backgroundStyle = "h-screen w-screen bg-gray-200 flex justify-center";
    const formStyle = "h-1/2 w-1/2 mt-60 flex flex-col";
    const titleStyle = "text-center text-black mt-8 text-2xl font-aboreto";
    const lineStyle = "mt-8 border-dotted border-1.5 border-black w-2/3 ml-auto mr-auto";

    const [userName, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const handleChange = (event) => {
        if (event.target.id === "userInput") setUserName(event.target.value);
        if (event.target.id === "passwordInput") setUserPassword(event.target.value);
    };

    const handleSignUp = async () => {
        var config = {
            method: 'get',
            url: `http://127.0.0.1:5000/signup?name=${userName}&password=${userPassword}`,
            headers: { }
        };

        try {
            const authRes = await axios(config);
            if (authRes.data == "User has already registered for Spotidate!") {
                props.success();
            } else {
                setErrors(prev => {
                    return [...prev, authRes.data]
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    const toSignIn = () => {
        props.goToSignIn();
    }

    return(
        <div className={backgroundStyle}>
            <div className={formStyle}>
                <h1 className={titleStyle}>Sign Up</h1>
                <input
                    id={"userInput"}
                    className={inputStyle}
                    placeholder={"Please enter your username"}
                    onChange={handleChange}
                    value={userName}
                ></input>
                <input
                    id={"passwordInput"}
                    className={inputStyle}
                    placeholder={"Please enter your password"}
                    onChange={handleChange}
                    value={userPassword}
                    type={"password"}
                ></input>
        
                <button
                    className={buttonStyle}
                    onClick={handleSignUp}
                >
                    Sign Up
                </button>

                <hr className={lineStyle}/>
                <button to={"/signin"}  className={buttonStyle} onClick={toSignIn}>Sign In</button>
                {errors.length === 0 ? null : errors.map(each => {
                    return <h1 className={"text-center text-red-700"}>{each}</h1>
                })}
            </div>
        </div>
    )
}

export default SignUp;