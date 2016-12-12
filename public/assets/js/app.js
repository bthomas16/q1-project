$(document).ready(function() {
  $("form").on("submit", function() {
    event.preventDefault();
    var coors = getCoordinates();
  });

    // $.get("https://developer.nrel.gov/api/solar/solar_resource/v1.json?api_key=ZJH76qOhbyarfoAWyLVAtsKgRcGm5bdna1qd7gjz&format=json&lat=39.7392358&lon=-104.990251", function(data) {
    //   console.log(data);
    // });

  //console.log(coordinates);
});

function getCoordinates() {
  // $("form").on("submit", function() {
  //   event.preventDefault();
    var loc = $("#location").val();
    var stop = loc.indexOf(",") + 1;
    var city = loc.substring(0,stop);
    var state = loc.substring(stop+1, loc.length);
    var arr = [];
    $.get("https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyBecXcSD1TtOEr_uAXkjPsiqG8dRTsMsA0&address="+city+"+"+state, function(data) {
      var lat = data.results[0].geometry.location.lat;
      var lng = data.results[0].geometry.location.lng;
      $(".solar_data_1").html("");
      $(".solar_data_1").append("<li>"+loc+"</li>");
      $(".solar_data_1").append("<li>latitude: "+lat+"</li>");
      $(".solar_data_1").append("<li>longitude: "+lng+"</li>");
      arr.push(lat);
      arr.push(lng);
    });
  // });
  return arr;
}
