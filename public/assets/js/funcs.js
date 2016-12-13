function state_mouse_over() {
  $(".hexagon").on("mouseover", function() {
    $(".state_feed").html($(this).attr('id'));
  });
}

function state_click() {
  $(".hexagon").click(function() {

    // define state var by id of clicked hex
    var state = $(this).attr('id');

    // display selected state
    $(".state_selected").html(state);

    // clears city in search bar
    $("#location").val("");

    // popular city object
    var cities = { Colorado: ["Denver", "Fort Collins", "Colorado Springs"],
    Alabama: ["Birmingham", "Montgomery", "Mobile"],
    Alaska: ["Anchorage", "Juneau", "Fairbanks", "Sitka", "Ketchikan"],
    Arizona: ["Phoenix", "Tucson", "Scottsdale"],
    Arkansas: ["Little Rock", "Fort Smith", "Fayetteville"],
    California: ["Los Angeles", "San Diego", "San Francisco"],
    Connecticut: ["Bridgeport", "New Haven", "Hartford"],
    Delaware: ["Wilmington", "Dover", "Newark"],
    Florida: ["Jacksonville", "Miami", "Tampa"],
    Georgia: ["Atlanta", "Augusta", "Savannah"],
    Hawaii: ["Honolulu", "Hilo", "Kailua"],
    Idaho: ["Boise", "Nampa", "Pocatello"],
    Illinois: ["Chicago", "Rockford", "Peoria"],
    Indiana: ["Indianapolis", "Fort Wayne", "Evansville"],
    Iowa: ["Des Moines", "Cedar Rapids", "Davenport"],
    Kansas: ["Wichita", "Kansas City", "Topeka"],
    Kentucky: ["Lexington", "Louisville", "Frankfort"],
    Louisiana: ["New Orleans", "Baton Rouge", "Shreveport"],
    Maine: ["Portland", "Lewiston", "Bangor"],
    Maryland: ["Baltimore", "Frederick", "Annapolis"],
    Massachusetts: ["Boston", "Worcester", "Springfield"],
    Michigan: ["Detroit", "Grand Rapids", "Ann Arbor"],
    Minnesota: ["Minneapolis", "St. Paul", "Duluth"],
    Mississippi: ["Jackson", "Gulfport", "Biloxi"],
    Missouri: ["Kansas City", "St. Louis", "Springfield"],
    Montana: ["Billings", "Missoula", "Helena"],
    Nebraska: ["Omaha", "Lincoln", "Bellevue"],
    Nevada: ["Las Vegas", "Reno", "Carson City"],
    "New Hampshire": ["Manchester", "Nashua", "Concord"],
    "New Jersey": ["Newark", "Jersey City", "Trenton"],
    "New Mexico": ["Albuquerque", "Las Cruces", "Santa Fe"],
    "New York": ["New York", "Buffalo", "Rochester"],
    "North Carolina": ["Charlotte", "Raleigh", "Greensboro"],
    "North Dakota": ["Fargo", "Bismarck", "Grand Forks"],
    Ohio: ["Columbus", "Cleveland", "Cincinnati"],
    Oklahoma: ["Oklahoma City", "Tulsa", "Norman"],
    Oregon: ["Portland", "Eugene", "Salem"],
    Pennsylvania: ["Philadelphia", "Pittsburgh", "Allentown"],
    "Rhode Island": ["Providence", "Warwick", "Cranston"],
    "South Carolina": ["Columbia", "Charleston", "Greenville"],
    "South Dakota": ["Sioux Falls", "Rapid City", "Pierre"],
    Tennessee: ["Memphis", "Nashville", "Knoxville"],
    Texas: ["Houston", "Dallas", "Austin"],
    Utah: ["Salt Lake City", "West Valley City", "Provo"],
    Vermont: ["Burlington", "Essex", "Brattleboro"],
    Virginia: ["Virginia Beach", "Norfolk", "Richmond"],
    Washington: ["Seattle", "Spokane", "Tacoma"],
    "West Virginia": ["Charleston", "Huntington", "Morgantown"],
    Wisconsin: ["Milwaukee", "Madison", "Green Bay"],
    Wyoming: ["Cheyenne", "Casper", "Laramie"]};

    // city_list is popular cities of selected state
    city_list = cities[state];

    // clears the area where the city buttons go
    $(".button_city").html("");

    // dynamically appends city buttons
    for (var i = 0; i < city_list.length; i++) {
      $(".button_city").append("<a class='btn' href='#'>"+city_list[i]+"</a>");
    }

    $(".hidden_select").removeClass("hidden_select");

    //city click function
    city_click();
    animateSearch();


  });
}

function city_click() {
  $(".button_city > a.btn").click(function(event) {
    var city_selected = $(this).text();
    var state_selected = $(".state_selected").text();
    getCoordinates(city_selected, state_selected);

  });
}

function animateSearch() {
  $(".button_city > a.btn").on("mouseover", function() {
    $(".hidden_form").slideDown("slow", function() {
      //$(".hidden_form").attr("style", "display: flex");
    });
  });
}

function getCoordinates(city, state) {
  var City = toTitleCase(city);
  var State = toTitleCase(state);
  $.get("https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyBecXcSD1TtOEr_uAXkjPsiqG8dRTsMsA0&address="+city+"+"+state, function(data) {
    var lat = data.results[0].geometry.location.lat;
    var lng = data.results[0].geometry.location.lng;
    $(".solar_data_1").html("");

    // solar location appended
    $(".solar_data_1").append("<li><div class='collapsible-header'><i class='material-icons'>place</i>"+City+", "+State+"</div><div class='collapsible-body'><ul><li class='lat'>Latitude: "+lat+"</li><li class='long'>Longitude: "+lng+"</li></ul></div></li>");

    // solar resource data appended
    $(".solar_data_1").append("<li><div class='collapsible-header'><i class='material-icons'>assessment</i>"+"solar resources"+"</div><div class='collapsible-body'><ul class='solar_data_2'></ul></div></li>");
    getSolarData();
    getSolarProd(lat, lng);
    energy_incentives(lat, lng);
    $(".solar_card").removeClass("hidden_cards");
    scroll_down();
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
  });
  $(".solar-prod-data").attr("style", "display: block");
}

function scroll_down() {
  $('html, body').animate({
      scrollTop: $("#user_data_solar").offset().top
  }, 2000);
}

function energy_incentives(lat, long) {
  $.get("https://developer.nrel.gov/api/energy_incentives/v2/dsire.json?api_key=ZJH76qOhbyarfoAWyLVAtsKgRcGm5bdna1qd7gjz&lat="+lat+"&lon="+long+"&category=solar_technologies&technology=solar_photovoltaics", function(data) {
    var master_result_obj = {};
    for (var i = 0; i < data.result.length; i++) {
      var item = data.result[i];
      var cat = item.category_name;
      var name = item.program_name;
      var sum = item.summary;
      if (!master_result_obj.hasOwnProperty(cat)) {
        master_result_obj[cat] = [{[name]: sum}];
      } else {
        master_result_obj[cat].push({[name]: sum});
      }
    }

    var fin_incents = master_result_obj["Financial Incentive"];
    for (var j = 0; j < fin_incents.length; j++) {
      cur_obj = fin_incents[j];
      var keys_arr = Object.keys(cur_obj);
      var cur_key = keys_arr[0];
      var cur_val = cur_obj[cur_key];
      // console.log(cur_key);
      // console.log(cur_val);
      var fin_data = $("<li><div class='collapsible-header'>"+cur_key+"</div><div class='collapsible-body'><div class='container'>"+cur_val+"</div></div></li>");
      $(".solar_data_3").append(fin_data);
    }
  });
}
