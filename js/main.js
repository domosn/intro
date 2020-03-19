$(function(){
    $('.work_header').click(function(){
        if($(this).next().css('display') == 'block') {
            $('.work_body').slideUp(200, 'linear');
            return;
        } else {
            $('.work_body').slideUp(200, 'linear');
            $(this).next().slideDown(200, 'linear');
        }
    });

    $('.back_top').click(function(){
        $('html, body').animate({
            scrollTop: 0
        }, 'swing');
    });

    $(document).scroll(function () {
        var currentY = $(this).scrollTop();
        if (currentY > 10) {
            $('.back_top').fadeIn();
        } else {
            $('.back_top').fadeOut();
        }
    });

});
