import MainPage from './components/MainPage';
import {useState} from "react";
import DataDisplay from "./components/DataDisplay";
import logo from './components/SpotiDate-1.png'
import SignIn from './components/Login';


function App() {
  const [searchRes, setSearchRes] = useState([]);
  const [isLoggedIn, setisLoggedIn] = useState(localStorage.getItem("accessToken") !== null);
  const reloadPage = () => {
    window.location.reload(false);
  }
  
  return (
    <div className="text-center">
      <center><img src={logo} alt="logo" width='250' height='250' /></center>
      <style>{'body { background-color: grey; }'}</style>
      {isLoggedIn ? 
      <>
      <MainPage updateRes={setSearchRes}></MainPage>
      <ul>
        {searchRes.map((each, index) => <DataDisplay key={index} name={each.name} tracks={each.tracks}></DataDisplay>)}
      </ul>
      </>
       : 
        <SignIn reloadPage={reloadPage}></SignIn>
}
    </div>
  );
}

export default App;