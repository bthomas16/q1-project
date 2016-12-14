$(document).ready(function() {
  state_mouse_over();
  state_click();
  reset_button();

  // if using city search bar
  $("form").on("submit", function() {
    event.preventDefault();
    var city = $("#location").val();
    var state = $(".state_selected").text();
    getCoordinates(city, state);
  });
});
