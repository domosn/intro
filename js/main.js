$(function(){
    $(".back_top").click(function(){
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
