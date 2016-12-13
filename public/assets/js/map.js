$(document).ready(function() {
  $(".hexagon").on("mouseover", function() {
    $(".state_feed").html($(this).attr('id'));
  });
  $(".hexagon").click(function() {
    var state = $(this).attr('id');
    $(".state_selected").html(state);
    $("#location").val("");
    city_list = cities[state];
    $(".chip_city").html("");
    for (var i = 0; i < city_list.length; i++) {
      $(".chip_city").append("<div class='chip hoverable'>"+city_list[i]+"</div>");
    }
  });
});

var cities = { Colorado: ["Denver", "Boulder", "Fort Collins", "Colorado Springs"] };
