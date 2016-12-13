$(document).ready(function() {
  // $(".hexagon").on("mouseover", function() {
  //   $(".state_feed").html($(this).attr('id'));
  // });
  // $(".hexagon").click(function() {
  //   var state = $(this).attr('id');
  //   $(".state_selected").html(state);
  //   $("#location").val("");
  //   var cities = { Colorado: ["Denver", "Boulder", "Fort Collins", "Colorado Springs"] };
  //   city_list = cities[state];
  //   $(".button_city").html("");

    for (var i = 0; i < city_list.length; i++) {
      $(".button_city").append("<a class='btn' href='#'>"+city_list[i]+"</a>");
    }

    $(".button_city > a.btn").click(function(event) {
      //event.preventDefault();
      // var target = e.target;
      console.log("click");
      // var city = $(this).text();
      // var state = $(".state_selected").text();
      // getCoordinates(city, state);
    });


  });

});
