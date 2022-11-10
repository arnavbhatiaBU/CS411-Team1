import NavBar from './components/NavBar';
import { useState } from "react";
import DataDisplay from "./components/DataDisplay";

function App() {
  const [searchRes, setSearchRes] = useState("");
  return (
    <div className="text-center">
      <NavBar updateRes={setSearchRes}></NavBar>
      <ul>
        {searchRes.map(each => <DataDisplay name={each.name}></DataDisplay>)}
      </ul>
    </div>
  );
}

export default App;
