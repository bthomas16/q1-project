$(document).ready(function() {
  $(".hexagon").on("mouseover", function() {
    $(".state_feed").html($(this).attr('id'));
  });
  $(".hexagon").click(function() {
    $(".state_selected").html($(this).attr('id'));
    $("#location").val("");
  });
});
