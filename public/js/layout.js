(function(){
  let d = new Date();
  let n = d.getMonth() + 1;
  body = document.getElementById('background');
  switch(n){
    case 12:
    case 1:
    case 2:
      body.style.backgroundImage = "url('/images/winterBackground.jpg')";
      break;
    case 3:
    case 4:
    case 5:
      body.style.backgroundImage = "url('/images/springBackground.jpg')";
      break;
    case 6:
    case 7:
    case 8:
      body.style.backgroundImage = "url('/images/summerBackground.png')";
      break;
    case 9:
    case 10:
    case 11:
      body.style.backgroundImage = "url('/images/autumnBackground.jpg')";
      break;
    default:
      console.log("Error loading background: Month OOB?: " + n);
  }
})();

function submitSearch() {
  let action = "/search/"+document.getElementById("searchInput").value;
  document.getElementById("searchForm").action = action;
}
