import MainPage from './components/MainPage';
import { useState } from "react";
import DataDisplay from "./components/DataDisplay";
import Auth from "./components/Auth";

function App() {
  const [searchRes, setSearchRes] = useState([]);
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const handleLoginSuccess= () => {
    setisLoggedIn(true);
  };
  return (
    <div className="text-center">
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
