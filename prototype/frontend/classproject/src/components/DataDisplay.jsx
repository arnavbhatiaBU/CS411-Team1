const DataDisplay = (props) => {
    return(
        <li className="my-4 border-2 border-gray-500 rounded-md p-2 w-1/2 mx-auto">
            <h1 className = "text-2xl">{props.name}</h1>
            <div className="h-32 border-2 border-gray-700 rounded-lg overflow-y-auto">
                {props.tracks.map((each, index) => {
                    return <h3 key={index}>{each.name}</h3>
                })}
            </div>
        </li>
    )
}

export default DataDisplay;