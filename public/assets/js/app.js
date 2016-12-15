$(document).ready(function() {
  state_mouse_over();
  state_click();
  reset_button();
  scroll_banner_button();
  currentYear();
  setTimeout(function() { slide_front_text(); }, 2000);
  // if using city search bar
  $("form").on("submit", function() {
    event.preventDefault();
    var city = $("#location").val();
    var state = $(".state_selected").text();
    getCoordinates(city, state);
  });
});
