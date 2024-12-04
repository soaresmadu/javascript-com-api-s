const APIKey = '1c7bbca6950cf660a35259e54b1712f4';
const urlWeather = 'https://api.openweathermap.org/data/2.5/weather'
const searchBtn = document.getElementById('searchBtn');

function searchAndUpdated(){
    const cityName = document.getElementById('cityInput');
    const firstMsg = document.getElementById('firstMsg');
    const boasVindas = document.querySelector(".boas-vindas");
    const resultDiv = document.querySelector(".result");
    const descriptionDiv = document.querySelector(".description");
    const imgWeather = document.querySelector('.result img')
    const city = document.getElementById('cityName');
    const temperatura = document.getElementById('temp');
    const humidity = document.getElementById('humidity');
    const rainmm = document.getElementById('rain');
    const windSpeed = document.getElementById('wind');

    if (cityName.value == ''){
        firstMsg.textContent = 'Por favor, insira o nome de uma cidade.';
        return
    }

    const url = `${urlWeather}?q=${cityName.value}&appid=${APIKey}&units=metric&lang=pt_br`

    fetch(url)
    .then(apiResponse => {
        if(!apiResponse.ok){
            firstMsg.textContent = 'Erro ao encontrar a cidade. Verifique o nome e tente novamente!';
            return;
        }
        return apiResponse.json();
    })
    .then(result => {
        if (result){

            const {name, main, weather, wind, rain} = result;
            const imgId = weather[0].icon;

            boasVindas.style.display = "none";
            resultDiv.style.display = "flex";
            descriptionDiv.style.display = "flex";
            imgWeather.src = `https://openweathermap.org/img/wn/${imgId}@2x.png`
            temperatura.textContent = main.temp + "°C";
            city.textContent = name;
            //data

            humidity.textContent = main.humidity + "%";

            const windKm = (wind.speed * 3.6).toFixed(1);
            windSpeed.textContent = windKm+" km/h";

            if (rain){
                rainmm.textContent = rain['1h']+"mm";
            }
            else {
                rainmm.textContent = "00mm";
            }

            gerarData();
        }
    })
}
searchBtn.addEventListener('click', searchAndUpdated);

function gerarData(){
    const currentDate = document.getElementById('currentDate');

    let today = new Date();
    let month = today.getUTCMonth();
    let day = today.getUTCDate();
    let weekDay = today.getUTCDay();
    let year = today.getUTCFullYear();

    const daysOfWeek = [
        "Domingo",
        "Segunda-feira",
        "Terça-feira",
        "Quarta-feira",
        "Quinta-feira",
        "Sexta-feira",
        "Sábado"
    ]
    const monthsOfYear = [
        "Janeiro", 
        "Fevereiro", 
        "Março", 
        "Abril", 
        "Maio", 
        "Junho", 
        "Julho", 
        "Agosto", 
        "Setembro", 
        "Outubro", 
        "Novembro", 
        "Dezembro"
    ]

    const stringDate = `${daysOfWeek[weekDay]}, ${day} de ${monthsOfYear[month]} de ${year}.`;
    currentDate.textContent = stringDate;
}
