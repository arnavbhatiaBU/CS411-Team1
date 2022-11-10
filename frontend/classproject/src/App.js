import NavBar from './components/NavBar';
import { useState } from "react";

function App() {
  const [searchRes, setSearchRes] = useState("");
  return (
    <div className="text-center">
      <NavBar updateRes={setSearchRes}></NavBar>
      {console.log(searchRes)}
    </div>
  );
}

export default App;
