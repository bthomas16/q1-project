$(document).ready(function() {
  $("form").on("submit", function() {
    event.preventDefault();
    getCoordinates();
    $('html, body').animate({
        scrollTop: $("#user_data_solar").offset().top
    }, 2000);
  });
});

function getCoordinates() {
  var city = $("#location").val();
  var state = $(".state_selected").text();
  var City = toTitleCase(city);
  var State = toTitleCase(state);
  
  $.get("https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyBecXcSD1TtOEr_uAXkjPsiqG8dRTsMsA0&address="+city+"+"+state, function(data) {
    var lat = data.results[0].geometry.location.lat;
    var lng = data.results[0].geometry.location.lng;
    $(".solar_data_1").html("");
    $(".solar_data_1").append("<li><div class='collapsible-header'><i class='material-icons'>place</i>"+City+", "+State+"</div><div class='collapsible-body'><ul><li class='lat'>Latitude: "+lat+"</li><li class='long'>Longitude: "+lng+"</li></ul></div></li>");
    $(".solar_data_1").append("<li><div class='collapsible-header'><i class='material-icons'>assessment</i>"+"solar resources"+"</div><div class='collapsible-body'><ul class='solar_data_2'></ul></div></li>");
    getSolarData();
    getSolarProd(lat, lng);
  });
}

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function getSolarData() {
  var lat_string = $(".lat").html();
  var lat_result = lat_string.substring(10, lat_string.length);
  var long_string = $(".long").html();
  var long_result = long_string.substring(11, long_string.length);
  $.get("https://developer.nrel.gov/api/solar/solar_resource/v1.json?api_key=ZJH76qOhbyarfoAWyLVAtsKgRcGm5bdna1qd7gjz&format=json&lat="+lat_result+"&lon="+long_result, function(data) {
    var outputs = data.outputs;
    var dni = outputs.avg_dni.annual;
    $(".solar_data_2").append("<li class='dni collection-item'>Annual avg dni: "+dni+"</li>");
    var ghi = outputs.avg_ghi.annual;
    $(".solar_data_2").append("<li class='ghi collection-item'>Annual avg ghi: "+ghi+"</li>");
    var lat_tilt = outputs.avg_lat_tilt.annual;
    $(".solar_data_2").append("<li class='lat_tilt collection-item'>Annual avg lat-tilt: "+lat_tilt+"</li>");
  });
}

function getSolarProd(lat, long) {
  $(".kWh").remove();
  var arr = $(".ac_prod");
  $.get("https://developer.nrel.gov/api/pvwatts/v5.json?api_key=ZJH76qOhbyarfoAWyLVAtsKgRcGm5bdna1qd7gjz&format=json&lat="+lat+"&lon="+long+"&system_capacity=5&module_type=1&losses=10&array_type=1&tilt=40&azimuth=180", function(data) {
    for (var i = 0; i < arr.length; i++) {
      var ac_data = Math.round(data.outputs.ac_monthly[i]);
      var current_item = arr[i];
      arr[i].innerHTML = ac_data;
    }
    $( "<span class=kWh> kWh</span>" ).insertAfter( ".ac_prod" );
  });
  $(".solar-prod-data").attr("style", "display: block");
}
