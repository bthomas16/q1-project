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
    $(".solar_data_1").append("<li><div class='collapsible-header'><i class='material-icons'>place</i>"+loc+"</div><div class='collapsible-body'><ul><li class='lat'>Latitude: "+lat+"</li><li class='long'>Longitude: "+lng+"</li></ul></div></li>");
    $(".solar_data_1").append("<li><div class='collapsible-header'><i class='material-icons'>assessment</i>"+"solar resources"+"</div><div class='collapsible-body'><ul class='solar_data_2'></ul></div></li>");
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
    $(".solar_data_2").append("<li class='dni collection-item'>Annual avg dni: "+dni+"</li>");
    var ghi = outputs.avg_ghi.annual;
    $(".solar_data_2").append("<li class='ghi collection-item'>Annual avg ghi: "+ghi+"</li>");
    var lat_tilt = outputs.avg_lat_tilt.annual;
    $(".solar_data_2").append("<li class='lat_tilt collection-item'>Annual avg lat-tilt: "+lat_tilt+"</li>");
  });
}
