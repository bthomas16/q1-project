$(document).ready(function() {

    // $.get("https://developer.nrel.gov/api/solar/solar_resource/v1.json?api_key=ZJH76qOhbyarfoAWyLVAtsKgRcGm5bdna1qd7gjz&format=json&lat=39.7392358&lon=-104.990251", function(data) {
    //   console.log(data);
    // });
  getCoordinates();
});

function getCoordinates() {
  $("form").on("submit", function() {
    event.preventDefault();
    var loc = $("#location").val();
    var stop = loc.indexOf(",") + 1;
    var city = loc.substring(0,stop);
    var state = loc.substring(stop+1, loc.length);
    $.get("https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyBecXcSD1TtOEr_uAXkjPsiqG8dRTsMsA0&address="+city+"+"+state, function(data) {
      var lat = data.results[0].geometry.location.lat;
      var lng = data.results[0].geometry.location.lng;
      
    });
  });
}
