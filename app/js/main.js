'use strict';

$(function(){
    var ScreenWidth = $(window).width(),
        ScreenHeight = $(window).height(),
        btnMenu = $(".js-menu");

    //обработка тачей
    if (isTouch()){
        $('html').addClass('touch');
    }
    else {
        $('html').addClass('no-touch');
    }
    function isTouch() {
        try {
            document.createEvent("TouchEvent");
            return true;
        }
        catch (e) {
            return false;
        }
    }


    //formstyler
    $('select').styler();

    //btn-menu
    btnMenu.on('click', function(e){
        $(this).toggleClass("active");
    });


    $(window).resize(function(){
        ScreenWidth = $(window).width();
        ScreenHeight = $(window).height();

    });

});