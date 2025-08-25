let emergency_btn = document.getElementById("emer_btn");

function gotlocation (location){
    
    console.log(location.coords);

}

function nolocation (){
    console.log("error");
}

emergency_btn.addEventListener("click", () =>{

    navigator.geolocation.getCurrentPosition(gotlocation, nolocation);
});

