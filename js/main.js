$(function(){
    $('.work_header').click(function(){
        $(this).toggleClass('active');

        if($(this).next().css('display') == 'block') {
            $('.work_header').removeClass('active');
            $('.work_body').slideUp(200, 'linear');
            return;
        } else {
            $('.work_header').removeClass('active');
            $('.work_body').slideUp(200, 'linear');
            $(this).addClass('active').next().slideDown(200, 'linear');
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
