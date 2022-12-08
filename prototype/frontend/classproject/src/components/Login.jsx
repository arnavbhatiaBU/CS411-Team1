import {useState, useEffect} from "react";

const CLIENT_ID = "1bc64da3c71c4ba24665";
const SignIn = (props) => {
    const buttonStyle = "text-center border-2 rounded-md border-green-700 w-1/6 ml-auto mr-auto mt-8 text-gray-700 py-2 hover:bg-amber-50 hover:text-gray-600 font-raleway";
    const backgroundStyle = "h-screen w-screen bg-gray-200 flex justify-center";
    const [rerender, setrerender] = useState(false)

    useEffect (async () => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString)
        const codeParam = urlParams.get("code");

        if(codeParam && (localStorage.getItem("accessToken") === null)){
            async function getAccessToken(){
                await fetch("http://localhost:3002/getAccessToken?code=" + codeParam, {
                    method: "GET"
                }).then((response) => {
                    return response.json();
                }).then((data) => {
                    if(data.access_token){
                        localStorage.setItem("accessToken", data.access_token);
                        props.reloadPage();
                        //setrerender(!rerender)
                    }
                })
            }
            await getAccessToken();
        }
    }, []);



    function githubLogin(){
        window.location.assign("https://github.com/login/oauth/authorize?scope=user&client_id=" + CLIENT_ID);
    }
    

    return(
        <div className={backgroundStyle}>
            <h3>Please Log In to Access Spotidate!</h3>
            <button
                className={buttonStyle}
                onClick={githubLogin}
            >
                Login with GitHub
            </button>
        </div>
    )
}

export default SignIn;