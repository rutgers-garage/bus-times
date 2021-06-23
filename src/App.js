import { useState } from "react"

function App() {
  const [busData, setBusData] = useState(null)
  const routes = {
    4014680: "Summer 1",
    4014682: "Summer 2",
  }

  const busApi = async () => {
    await fetch("https://transloc-api-1-2.p.rapidapi.com/arrival-estimates.json?agencies=1323&stops=4231636",{
      headers : {
        "x-rapidapi-key": "174e52e98bmshe16deea62c1c223p1ee364jsn75d1c04fbc8b",
        "x-rapidapi-host": "transloc-api-1-2.p.rapidapi.com",
        "useQueryString": true
      }
    })
      .then(res => res.json())
      .then(json => setBusData(json.data.arrivals));
  }


  const BusTimes = () => {
    return busData.map((b, i) => <BusTime key={i} busName={routes[b.route_id]} busTime={b.arrival_at}/>)
  }

  const BusTime = ({ busName, busTime }) => {
    return <div>{busName} : {busTime}</div>
  }
  
  if(!busData){
    busApi()
    console.log(busData)
  } else {
    setInterval(function() {
      busApi()
      console.log(busData)
  }, 5 * 1000)
  }

  return busData ? (<div><BusTimes /></div>) : <h1>:(</h1>
}

export default App;
