
$(document).ready(function(){
    $("#btnGo").on('click', function(){
        window.location = window.location.href + "/" + $("#textinput").val();
    });
});