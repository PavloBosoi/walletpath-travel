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

    //wrap first part cost for bigger font-size
    $('.js-cost p').each(function(){
        var num = $(this).text().split('.')[0],
            num2 = $(this).text().split('.')[1];
        $(this).html('<i>'+num+'</i>.'+num2);
    });


    //formstyler
    $('input,select').styler();

    //btn-menu
    btnMenu.on('click', function(e){
        $(this).toggleClass("active");
    });



    //функция поиска совпадений вводимых символов
    function findEl(el, value) {
        var count = 0;
        el.each(function(){
            if($(this).data('address').match('^'+value)){//проверяем каждый елемент на совпадение побуквенно
                $(this).show(100);
                $(this).addClass('active');
                count++;
            }
            else{
                if(count > 1 && $(this).data('address') === 'all'){
                    $(this).show(100);
                }
                else{
                    $(this).hide(100);
                    $(this).removeClass('active');
                }
            }
        });
    }

    var filterInput = $('#filter-address'),
        checkFilter = $('.js-checkfiltr');

    checkFilter.filter(function(){
        if($(this).data('address') !== 'all'){
            $(this).addClass('active');
        }
    });

//проверка при каждом вводе символа
    filterInput.bind('input propertychange', function(){
        if($(this).val() !== ''){
            findEl(checkFilter,$(this).val());
        }
        else{
            checkFilter.show(100);
        }
    });

    checkFilter.on('click',function(){
        if($(this).data('address') === 'all'){
            if($(this).hasClass('active')){
                $(this).removeClass('active');
                $(this).find('span').text('Select All');
                checkFilter.each(function(){
                    if($(this).hasClass('active') && $(this).data('address') !== 'all'){
                        $(this).find('input').prop('checked', false).trigger('refresh');
                    }
                });
            }
            else{
                $(this).addClass('active');
                $(this).find('span').text('Unselect All');
                checkFilter.each(function(){
                    if($(this).hasClass('active') && $(this).data('address') !== 'all'){
                        $(this).find('input').prop('checked', true).trigger('refresh');
                    }
                });
            }
        }
            //checkFilter.trigger('click');
    });


    /*===CONTACT===*/
    function formLabel(el){
        $(el).each(function(){
            $(this).addClass('active');
            if($(this).find('input').val() === '' || $(this).find('textarea').val() === ''){
                //если инпут или текстареа не пусты
                $(this).removeClass('active');
            }
        });
        $(el).on('click contextmenu focusin',function(e){
            $(el).each(function(){
                if($(this).find('input').val() === '' || $(this).find('textarea').val() === ''){
                    //если инпут или текстареа не пусты
                    $(this).removeClass('active');
                }
            });
            $(this).addClass('active');
        });
        $(document).mouseup(function(e){// событие клика по веб-документу
            $(el).each(function(){
                if($(this).find('input').val() === '' || $(this).find('textarea').val() === '' && !$(this).is(e.target) && $(this).has(e.target).length === 0){
                    //если инпут или текстареа не пусты и клик был не поселектору и не по его дочерним элементам
                    $(this).removeClass('active');
                }
            });
        });
    }
    formLabel('.js-form-group');
    formLabel('.login-username');
    formLabel('.login-password');


    $(window).resize(function(){
        ScreenWidth = $(window).width();
        ScreenHeight = $(window).height();

    });

});