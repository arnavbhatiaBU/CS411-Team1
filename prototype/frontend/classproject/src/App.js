import MainPage from './components/MainPage';
import { useState } from "react";
import DataDisplay from "./components/DataDisplay";
import SignInPage from "./components/SignIn";

function App() {
  const [searchRes, setSearchRes] = useState([]);
  const [isLoggedIn, setisLoggedIn] = useState(false);
  return (
    <div className="text-center">
      {isLoggedIn ? 
      <>
      <MainPage updateRes={setSearchRes}></MainPage>
      <ul>
        {searchRes.map((each, index) => <DataDisplay key={index} name={each.name} tracks={each.tracks}></DataDisplay>)}
      </ul>
      </>
       : <SignInPage></SignInPage>}
    </div>
  );
}

export default App;
