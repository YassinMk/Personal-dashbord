var currentDate = new Date();
async function getImage() {
  try {
    const reponse = await fetch(
      "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature"
    );
    if (!reponse.ok) {
      throw new Error("Network response was not ok.");
    }
    const data = await reponse.json();
    console.log(data);
    document.body.style.background = `url(${data.urls.regular}) no-repeat center center fixed`;
    document.body.style.backgroundSize = "cover";
    document.body.style.width = "100%";
    document.body.style.minHeight = "100vh";
    document.getElementById("author").textContent = `By: ${data.user.name}`;
  } catch (error) {
    console.log("Error", error);
    document.body.style.background = `url(https://images.unsplash.com/photo-1433477077279-9354d2d72f6b?ixid=M3wxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTE5Nzc3ODF8&ixlib=rb-4.0.3) no-repeat center center fixed`;
    document.body.style.backgroundSize = "cover";
    document.body.style.width = "100%";
    document.body.style.minHeight = "100vh";
    document.getElementById("author").textContent = "Something went wrong";
  }
}
async function getCoin() {
  try {
    const reponse = await fetch(
      "https://api.coingecko.com/api/v3/coins/dogecoin"
    );
    if (!reponse.ok) {
      throw Error("Network response was not ok.");
    }
    const dataCoin = await reponse.json();
    document.getElementById("Crypto-descrip").innerHTML = `
        <div>
        <img src=${dataCoin.image.small} alt="imagedogecoins"></img>
        <span style="font-size:1.5em!important;">DogCoins</span>
        </div>
        <div class="ms-2 p-0 mt-0">
            <p class="mb-1">🎯:${dataCoin.market_data.current_price.usd}$</p>
            <p class="mb-1">📈:+${dataCoin.market_data.high_24h.usd}$</p>
            <p>📉:-${dataCoin.market_data.high_24h.usd}$</p>
        </div>
        `;
    console.log(dataCoin);
  } catch (error) {
    console.log(error);
  }
}

function getCurrentTime() {
  var currentDate = new Date();
  document.getElementById("time").textContent =
    currentDate.toLocaleTimeString();
}
setInterval(getCurrentTime, 1000);
document.getElementById("date").textContent = currentDate.toLocaleDateString();
function getWeather(){
  navigator.geolocation.getCurrentPosition(
      position=>{
        let lat=position.coords.latitude;
        let lon=position.coords.longitude;
         fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial`)
         .then(res=>{
          if(!res.ok){
            throw Error("Weather data no avaible");
          }
           return res.json();
         }
        ).then(data=>{
          console.log(data);
          document.getElementById("wheater-icon").src="http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
          document.getElementById("city").innerText=data.name;
          document.getElementById("temperature").innerHTML=`${data.main.temp}°`
        }).catch(err=>{
          console.log('Error', err);
        })
      }
       
  );
}
getWeather();
getImage();
getCoin();
