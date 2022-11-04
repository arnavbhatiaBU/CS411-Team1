import { useState } from "react";

const NavBar = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleChange = (event) => {
        setSearchTerm(event.target.value);

    };

    const handleClick = () => {
        console.log(searchTerm);
    }

    return(
        <div className="flex flex-col">
            <input 
                className="w-2/3 mx-auto text-center mt-10 border-4 border-gray-600 rounded-xl mb-4" 
                placeholder="Search terms"
                value={searchTerm}
                onChange={handleChange}
                >
            </input>
            <button 
                className="border-4 border-gray-500 rounded-2xl w-1/5 mx-auto hover:bg-gray-700 hover:text-white"
                onClick={handleClick}>
                    Search
            </button>
        </div>
    )
}

export default NavBar;