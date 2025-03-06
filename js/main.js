let verifyStr = '';

$(function () {
    getCaptcha();

    $(window).on('scroll', function () {
        let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        let scrolled = (winScroll / height) * 100;
        document.getElementById('scroll_percentage').style.width = scrolled + "%";
    });

    $('.work_place i').click(function () {
        let iframeSrc = $(this).data('geo');
        let iframeElem = "<iframe src='" + iframeSrc + "' width='100%' height='450' frameborder='0' allowfullscreen='' aria-hidden='false' tabindex='0'></iframe>";
        dialogBoxMsg(iframeElem);
    });

    $('img.works_demo, .slide_ele img').click(function () {
        let imgSrc = $(this).attr('src');
        let imgElem = "<img src='" + imgSrc + "'>";
        dialogBoxMsg(imgElem);
    });

    $('.work_header').click(function () {
        if ($(this).next().css('display') == 'block') {
            $('.work_header').removeClass('active').next().slideUp(200, 'linear');
            return;
        } else {
            $('.work_header').removeClass('active').next().slideUp(200, 'linear');
            $(this).addClass('active').next().slideDown(200, 'linear');
        }
    });

    $('.contactMe, .envelope').click(function (e) {
        $(this).addClass('show');
        document.querySelector('.contact').style.display = 'flex';
        setTimeout(function () {
            $('.contact').addClass('show');
            document.querySelector('.contact .form').style.top = '-5%';
        }, 100);

        e.preventDefault();
    });

    $('.contactSubmit').click(function () {
        $('.contactResult').html('');

        $("input, textarea").each(function () {
            $(this).removeClass('error');
        });

        let err = validateForm();

        if (err != '') {
            $('.contactResult').html("<div class='submitFailure'>" + err + "</div>");
            return false
        }

        let itemArr = [];

        let filltime = getNow();
        let contactName = $('#contactName').val();
        let contactEmail = $('#contactEmail').val();
        let contactMsg = $('#contactMsg').val();

        itemArr.push(filltime);
        itemArr.push(contactName);
        itemArr.push(contactEmail);
        itemArr.push(contactMsg);

        let contactData = {
            'items': JSON.stringify(itemArr)
        };

        submitData(contactData);
        $(".contactSubmit").addClass("processing").prop("disabled", true).html("處理中");
        $(".contactClose").prop("disabled", true);
    });

    $('.contactClose').click(function () {
        document.querySelector('.contact .form').style.top = '-10%';
        setTimeout(function () {
            $('.contact').removeClass('show');
        }, 100);
        setTimeout(function () {
            document.querySelector('.contact').style.display = 'none';

            $('.contactResult').html("");

            $("input, textarea").each(function () {
                $(this).removeClass("error").val("");
            });
        }, 300);

        $('.envelope').removeClass('show');
    });

    $('.back_top').click(function () {
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
    setTimeout(function () {
        document.querySelector('.mask').style.display = "none";
    }, 500);

}

function dialogBoxMsg(msg) {
    str = "<div class='close_container'><span class='close' onclick='overlay_close()'></span></div><div class='ele_container'>" + msg + "</div></div>";

    document.querySelector('.intro').innerHTML = str;
    document.querySelector('.mask').style.display = "flex";
    setTimeout(function () {
        document.querySelector('.intro').style.bottom = '0%';
    }, 100);
}

function submitData(data) {
    $.ajax({
        type: "get",
        url: "https://script.google.com/macros/s/AKfycbyQiG4z2F4tk2Lw3IAbRj0-EqLr7ipVk5dei-06LhctO_kiwdyd/exec",
        data: data,
        dataType: "JSON",
        success: function (response) {
            $('.contactResult').html("<div class='submitSuccess'>訊息已寄出成功，非常感謝您的來信。</div>");
            $(".contactSubmit").removeClass("processing").prop("disabled", false).html("送出");
            $(".contactClose").prop("disabled", false);
            getCaptcha();
            $('#contactCaptcha').val("");
        },
        error: function () {
            $('.contactResult').html("<div class='submitFailure'>伺服器目前忙碌中，請稍後再試。</div>");
            $(".contactSubmit").removeClass("processing").prop("disabled", false).html("送出");
            $(".contactClose").prop("disabled", false);
        }
    });
}

function validateForm() {
    $("input, textarea").each(function () {
        $(this).removeClass("error");
    });

    let contactName = $('#contactName').val();
    let contactEmail = $('#contactEmail').val();
    let contactMsg = $('#contactMsg').val();
    let contactCaptcha = $('#contactCaptcha').val();
    let errMsg = "";

    if (contactName == "") {
        errMsg += "<div>稱謂 欄位不得為空白。</div>";
        $('#contactName').addClass("error");
    } else if (contactName.length < 2) {
        errMsg += "<div>稱謂 欄位至少需要2個字元。</div>";
        $('#contactName').addClass("error");
    } else if (!/^[\u4e00-\u9fa5_a-zA-Z0-9 ]+$/.test(contactName)) {
        errMsg += "<div>稱謂 欄位只允許使用中文、英文、數字、下劃線(_)及空格字元。</div>";
        $('#contactName').addClass("error");
    }

    if (contactEmail == "") {
        errMsg += "<div>電子信箱 欄位不得為空白。</div>";
        $('#contactEmail').addClass("error");
    } else if (!/^[\w!#$%&\'*+\/=?^`{|}~.-]+@(?:[a-z\d-]+(?:\.[a-z\d][a-z\d-]*)?)+\.(?:[a-z][a-z\d-]+)$/i.test(contactEmail)) {
        errMsg += "<div>電子信箱 欄位格式不符。</div>";
        $('#contactEmail').addClass("error");
    }

    if (contactMsg == "") {
        errMsg += "<div>訊息內容 欄位不得為空白。</div>";
        $('#contactMsg').addClass("error");
    } else if (contactMsg.length < 1) {
        errMsg += "<div>訊息內容 欄位至少需要1個字元。</div>";
        $('#contactMsg').addClass("error");
    }

    if (contactCaptcha == "") {
        errMsg += "<div>驗證碼 欄位不得為空白。</div>";
        $('#contactCaptcha').addClass("error");
    } else if (contactCaptcha.toUpperCase() != verifyStr) {
        errMsg += "<div>驗證碼 輸入錯誤。</div>";
        $('#contactCaptcha').addClass("error");
    }

    return errMsg;
}

function getNow() {
    let currentdate = new Date();
    let month = currentdate.getMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    }
    let day = currentdate.getDate();
    if (day < 10) {
        day = "0" + day;
    }
    let hour = currentdate.getHours();
    if (hour < 10) {
        hour = "0" + hour;
    }
    let minute = currentdate.getMinutes();
    if (minute < 10) {
        minute = "0" + minute;
    }
    let second = currentdate.getSeconds();
    if (second < 10) {
        second = "0" + second;
    }

    let nowDate = currentdate.getFullYear() + "/" +
        month + "/" +
        day + " " +
        hour + ":" +
        minute + ":" +
        second;

    return nowDate;
}

function getCaptcha(len = 4) {
    let character = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let characterArr = character.split('');
    verifyStr = '';

    for (i = 0; i < len; i++) {
        random = characterArr[Math.floor(Math.random() * character.length)];
        verifyStr += random;
    }
    $('.captchaStr').html(verifyStr).attr('title', '驗證碼為' + verifyStr);
    return verifyStr;
}


let slideIndex = 1;
showSlides(slideIndex);
// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("slide_ele");
    var dots = document.getElementsByClassName("cursor");
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}