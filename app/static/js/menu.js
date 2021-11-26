$(document).ready(function(){
    // Seleccionamos sidebar con elementos ul
    $('.sidebar li:has(ul)').click(function(e){
        e.preventDefault();
        // Vemos si el elemento clickeado tiene la clase activado
        if ($(this).hasClass('activado')){
            $(this).removeClass('activado');
            $(this).children('ul').slideUp();
        } else{ 
            // Ocultando submenus
            $('.sidebar li ul').slideUp();
            // Quitando la clase activado a todos los elementos 
            $('.sidebar li').removeClass('activado');
            // Poniendo clase activado a solo el clickeado
            $(this).addClass('activado');
            // Mostrando elementos hijos ul del elemento clickeado
            $(this).children('ul').slideDown();
        }

    });
    
    $('.sidebar li ul li a').click(function(){
        window.location.href = $(this).attr("href");
    });

});