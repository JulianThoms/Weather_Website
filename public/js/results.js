document.body.onload = function(){
  if(document.getElementById('backgroundWeather') != undefined){
    const background = document.getElementById('backgroundWeather');
    const temperature = document.getElementById('temperature').value;
    const unit = document.getElementById('unit').value;
    let multiplier;
    let addiplier; //Does that word even exist

    if (unit == 2){
      multiplier = 9.5;
      addiplier = 32;
    }
    else if (unit == 3){
      multiplier = 1;
      addiplier = 273.15;
    }
    else{
      multiplier = 1;
      addiplier = 0;
    }

    if (temperature < (10*multiplier+addiplier)){
      background.style.backgroundColor = "#6593F5";
    }
    else if (temperature < (20*multiplier+addiplier)){
      background.style.backgroundColor = "#FFD300";
    }
    else {
      background.style.backgroundColor = "#F05E23";
    }
  }
}
