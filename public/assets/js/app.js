$(document).ready(function() {
  $("form").on("submit", function() {
    event.preventDefault();
    getCoordinates();

  });
});

function getCoordinates() {
  var loc = $("#location").val();
  var stop = loc.indexOf(",") + 1;
  var city = loc.substring(0,stop);
  var state = loc.substring(stop+1, loc.length);
  $.get("https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyBecXcSD1TtOEr_uAXkjPsiqG8dRTsMsA0&address="+city+"+"+state, function(data) {
    var lat = data.results[0].geometry.location.lat;
    var lng = data.results[0].geometry.location.lng;
    $(".solar_data_1").html("");
    $(".solar_data_1").append("<li>"+loc+"</li>");
    $(".solar_data_1").append("<li class='lat'>latitude: "+lat+"</li>");
    $(".solar_data_1").append("<li class='long'>longitude: "+lng+"</li>");
    getSolarData();
  });
}



function getSolarData() {
  var lat_string = $(".lat").html();
  var lat_result = lat_string.substring(10, lat_string.length);
  var long_string = $(".long").html();
  var long_result = long_string.substring(11, long_string.length);
  $.get("https://developer.nrel.gov/api/solar/solar_resource/v1.json?api_key=ZJH76qOhbyarfoAWyLVAtsKgRcGm5bdna1qd7gjz&format=json&lat="+lat_result+"&lon="+long_result, function(data) {
    var outputs = data.outputs;
    var dni = outputs.avg_dni.annual;
    $(".solar_data_1").append("<li class='dni'>Annual avg dni: "+dni+"</li>");
    var ghi = outputs.avg_ghi.annual;
    $(".solar_data_1").append("<li class='ghi'>Annual avg ghi: "+ghi+"</li>");
    var lat_tilt = outputs.avg_lat_tilt.annual;
    $(".solar_data_1").append("<li class='lat_tilt'>Annual avg lat-tilt: "+lat_tilt+"</li>");
  });
}
