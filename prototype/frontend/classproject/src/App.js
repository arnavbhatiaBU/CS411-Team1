import MainPage from './components/MainPage';
import { useState } from "react";
import DataDisplay from "./components/DataDisplay";
import Auth from "./components/Auth";
import logo from './components/SpotiDate-1.png'

function App() {
  const [searchRes, setSearchRes] = useState([]);
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const handleLoginSuccess= () => {
    setisLoggedIn(true);
  };
  
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
       : <Auth signinSuccess={handleLoginSuccess}></Auth>}
    </div>
  );
}

export default App;