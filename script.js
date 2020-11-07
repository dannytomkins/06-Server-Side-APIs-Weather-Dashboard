var cityname
var apiKey = "47d177e47bbc4e3cb8cd14f924ebac98"


$("#search").on("click", function(){
   var cityname  = $("#cityName").val()
   searchWeather(cityname)
})


function searchWeather(cityname) {
    $("#citydate").empty()
    $.ajax({
        type: "GET",
        url: "https://api.openweathermap.org/data/2.5/weather?q="+cityname+"&appid="+apiKey
    }).then(function(results){
        console.log(results)
        
        var spancity=$("<span>")
        spancity.text(results.name)
        var spandate=$("<span>")
        spandate.text(moment(results.dt,"X").format(" l "))
        var iconcode=results.weather[0].icon
        var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
        
        var weatherimg =$("<img>")
        weatherimg.attr("src",iconurl)
        //temp, humidity, wind speed, uv index
        var spantemp=$("<span>")
        spantemp.text(results.main.temp)

        //add results from memory to page
        $("#citydate").append(spancity,spandate,weatherimg)
        $("#currentemp").append(spantemp)
    })


}   

//api.openweathermap.org/data/2.5/weather?q={cityname}&appid={47d177e47bbc4e3cb8cd14f924ebac98}

//create search bar
//search onclick event
//put name of city from search in API pull

// Open Weather API key 47d177e47bbc4e3cb8cd14f924ebac98