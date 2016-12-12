$(document).ready(function() {
  $(".hexagon").on("mouseover", function() {
    $(".state_selected").html($(this).attr('id'));
  });
  $(".hexagon").click(function() {
    // console.log($(this).attr("id"));
    $(".state_selected").html($(this).attr('id'));
    $(".state_selected").attr("style","color:red");
  });
});
