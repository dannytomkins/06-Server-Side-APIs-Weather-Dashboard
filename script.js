var cityname
var apiKey = "47d177e47bbc4e3cb8cd14f924ebac98"
var searches =[]
//searches.push(cityname)

$("#search").on("click", function(){
   var cityname  = $("#cityName").val()
   searchWeather(cityname)
    forecast(cityname)
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
        var spanhumid=$("<span>")
        spanhumid.text(results.main.humidity)
        var spanwind=$("<span>")
        spanwind.text(results.wind.speed)
        // var spanuv=$("<span>")
        // spanuv.text(results)

        //uv index seperate API call
        $.ajax({
            type: "GET",
            url: "https://api.openweathermap.org/data/2.5/uvi?lat="+results.coord.lat+"&lon="+results.coord.lon+"&appid=" + apiKey,
        }).then(function (responseuv) 
        {console.log(responseuv.value, "uv search")
            $("#currentuv").append(responseuv.value)
        })

        //add results from memory to page
        $("#citydate").append(spancity,spandate,weatherimg)
        $("#currenttemp").append(spantemp)
        $("#currenthumid").append(spanhumid)
        $("#currentwind").append(spanwind)
        
    })
}

function forecast(cityname) {
    $.ajax({
        type: "GET",
        url: "https://api.openweathermap.org/data/2.5/forecast?q="+cityname+"&appid="+apiKey,
    })
        .then(function (forecastResults) {
            console.log(forecastResults);
            for (var i = 0; i < 5; i++){

                var column = $("<div>").addClass("col-sm-2");
                var card = $("<div>").addClass("card");
                var cardBod = $("<div>").addClass("card-body");
                var date = $("<h6>").addClass("card-title").text(forecastResults.list[i].dt_txt)
                    var temp = $("<p>").text(forecastResults.list[i].main.temp)
                $("#forecast").append(column.append(card.append(cardBod.append(date,temp))))
                }
})
}