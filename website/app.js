/* Global Variables */

const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const key = '&APPID=66f664a0882ff0a1706ad057c29de835&units=imperial';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+ 1 + '.'+ d.getDate()+'.'+ d.getFullYear();

//Add Event Listener
document.getElementById('generate').addEventListener('click', takeAction);


function takeAction(e){
    
    const zipcode = document.getElementById('zip').value;
    const feeling = document.getElementById('feelings').value;
    getWeather(baseURL, zipcode, key)
    .then(function (data){
        console.log(data);
        postData('/weather/save', {temp: data.main.temp, date: newDate, feelings: feeling } )
        .then(function() {
            updateUI()
        })
    })
}

//async GET request

const getWeather = async (baseURL, code, key)=>{
    const request = await fetch(baseURL + code + ',us' + key)
    console.log(request);
        try {
            const allData = await request.json();
            return allData;
        }
        catch(error) {
            console.log('error', error);
        }
    }

// Async POST
const postData = async ( url = '', data = {})=>{

    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });

    try {
      const newData = await response.json();
      return newData;
    }catch(error) {
    console.log("error", error);
    }
};

//update UI
const updateUI = async () => {
    const request = await fetch('/weather');
    try{
      const allData = await request.json();
      document.getElementById('date').innerHTML = 'Today is ' + allData.date;
      document.getElementById('temp').innerHTML = 'The current temperature is ' + allData.temperature;
      document.getElementById('content').innerHTML = 'You are feeling ' + allData.feelings;
  }
  catch (error) {
    console.log('error', error);
}
}