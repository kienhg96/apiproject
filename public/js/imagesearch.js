$(document).ready(function(){
    $("#btnGo").on('click', function(){
        window.location = window.location.href  + $("#textinput").val();
    });
    $('#textinput').keyup(function(e){
        if(e.keyCode == 13)
        {
            window.location = window.location.href  + $("#textinput").val();
        }
    });
});