$(function(){

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
    document.querySelector('.mask').style.display="none";
}

function dialogBoxMsg(msg) {
	str="<div class='close_container'><span class='close' onclick='overlay_close()'></span></div><div class='img_container'>"+msg+"</div></div>";

	document.querySelector('.intro').innerHTML=str;
	document.querySelector('.mask').style.display="flex";
}
