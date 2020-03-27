$(function(){

    $('.work_place i').click(function(){
        let iframeSrc = $(this).data('geo');
        let iframeElem = "<iframe src='" + iframeSrc + "' width='100%' height='450' frameborder='0' allowfullscreen='' aria-hidden='false' tabindex='0'></iframe>";
        dialogBoxMsg(iframeElem);
    });

    $('img.works_demo').click(function(){
        let imgSrc = $(this).attr('src');
        let imgElem = "<img src='" + imgSrc + "'>";
        dialogBoxMsg(imgElem);
    });

    $('.work_header').click(function(){
        if($(this).next().css('display') == 'block') {
            $('.work_header').removeClass('active').next().slideUp(200, 'linear');
            return;
        } else {
            $('.work_header').removeClass('active').next().slideUp(200, 'linear');
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

function overlay_close() {
    document.querySelector('.intro').style.bottom = '100%';
    setTimeout(function(){
        document.querySelector('.mask').style.display="none";
    }, 500);
    
}

function dialogBoxMsg(msg) {
	str="<div class='close_container'><span class='close' onclick='overlay_close()'></span></div><div class='ele_container'>"+msg+"</div></div>";

	document.querySelector('.intro').innerHTML=str;
    document.querySelector('.mask').style.display="flex";
    setTimeout(function(){
        document.querySelector('.intro').style.bottom = '0%';
    }, 100);
}
