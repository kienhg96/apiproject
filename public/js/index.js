$(document).ready(function(){
    
    $("#timestamp").on('click', function(){
        window.location = window.location.href + "timestamp";
    });
    $("#whoami").on('click', function(){
        window.location = window.location.href + "whoami";
    });
    $("#shorturl").on('click', function(){
        window.location = window.location.href + "shorturl";
    });
    $("#imagesearch").on('click', function(){
        window.location = window.location.href + "imagesearch";
    });
});