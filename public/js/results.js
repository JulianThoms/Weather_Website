document.body.onload = function(){
  if(document.getElementById('backgroundWeather') != undefined){
    const background = document.getElementById('backgroundWeather');
    const temperature = document.getElementById('temperature').value;
    if (temperature < 10){
      background.style.backgroundColor = "#6593F5";
    }
    else if (temperature < 20){
      background.style.backgroundColor = "#FFD300";
    }
    else {
      background.style.backgroundColor = "#F05E23";
    }
  }
}
