$(document).ready(function(){
    $("#btnGo").on('click', function(){
        window.location = window.location.origin + "/shorturl/new/" + $("#textinput").val();
    });
    $('#textinput').keyup(function(e){
        if(e.keyCode == 13)
        {
            window.location = window.location.origin + "/shorturl/new/" + $("#textinput").val();
        }
    });
});