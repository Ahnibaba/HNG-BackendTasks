require("dotenv").config()
const express = require("express")
const axios = require("axios")


const app = express()
const PORT = process.env.PORT || 3600

const apiKey = process.env.OPEN_WEATHER_API
const publicIp = "196.223.117.6"

app.get("/api/hello", async (req, res) => {
    const visitorName = req.query.visitor_name || "Guest" 
    const clientIp = publicIp
     


    try {
        const locationRes = await axios.get(`https://ipapi.co/${clientIp}/json/`)
        
        

        const location = locationRes.data.city
        const latitude = locationRes.data.latitude
        const longitude = locationRes.data.longitude
       


        const weatherRes = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&unit=metric`)
        
        const temperature = weatherRes.data.main.temp
      

       // const weatherDesc = weatherRes.data.weather[0].description
        const greeting = `Hello, ${visitorName}!, the temperature is ${temperature} in ${location}`

        res.json({
            client_ip: clientIp,
            location: location,
            greeting: greeting
        })
    
    
    } catch (err) {
        res.status(500).json({error: "Unable to fetch location or weather data"})
        
    }
})



app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
})
