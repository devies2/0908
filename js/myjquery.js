(function ($) {

    $('.skillContainer').hide()


    function openNav() {
        $('#header').toggleClass('on')
        if ($('#header').hasClass('on')) {
            $('.nav').css({
                display: 'block'
            }).animate({
                right: '0px'
            }, 500)
        } else {
            $('.nav').animate({
                right: '-320px'
            }, 500, function () {
                $(this).css({
                    display: 'none'
                })
            })
        }
        $('.outlayer').toggleClass('on')
    }
    $('.open-gnb').on('click', openNav)
    $('.outlayer').on('click', openNav)

    var winWidth, winHeight;

    function init() {
        winWidth = $(window).innerWidth()
        winHeight = $(window).height()
        if (winWidth > 800 && !$('html').hasClass('pc')) {
            $('#header').removeClass('on')
            $('.outlayer').removeClass('on')
            $('.nav').css({
                display: 'block',
                right: '0px'
            })
            $('html').addClass('pc').removeClass('mobile')
        } else if (winWidth < 800 && !$('html').hasClass('mobile')) {
            $('#header').removeClass('on')
            $('.nav').css({
                display: 'none',
                right: '-320px'
            })
            $('html').addClass('mobile').removeClass('pc')
        }
    }

    init()


    $(window).resize(function () {
        init()
    })


    // 포트폴리오 갤러리 클릭 이벤트시 팝업박스 작동
    var href, src, alt, lieq;
    $('.gallery > li > a').on('click', function (e) {
        e.preventDefault(); // 기본이벤트를 막아줌
        lieq = $(this).parent().index()
        $('.galleryPopup').addClass('on')
        href = $(this).attr('href')
        src = $(this).find('img').attr('src')
        alt = $(this).find('img').attr('alt')
        // console.log(alt)
        $('.popupList > div > a').attr('href', href)
        $('.popupList > div > a > img').attr({
            'src': src,
            'alt': alt
        })
    })


    $('.galleryPopup .close, .galleryPopup').on('click', function () {
        $('.galleryPopup').removeClass('on')
    })

    $('.popupList').on('click', function (e) {
        e.stopPropagation(); // 부모한테 이벤트전파를 막음
    })


    function changeList(ind) {
        href = $('.gallery > li').eq(ind).find('a').attr('href')
        src = $('.gallery > li').eq(ind).find('img').attr('src')
        alt = $('.gallery > li').eq(ind).find('img').attr('alt')
        $('.popupList > div > a').attr('href', href)
        $('.popupList > div > a > img').attr({
            'src': src,
            'alt': alt
        }).css({
            opacity: '0.5'
        }).stop().animate({
            opacity: '1'
        }, 500)
    }


    $('.popupList .prev').on('click', function () {
        --lieq;
        if (lieq < 0) {
            lieq = 7;
        }
        changeList(lieq)
    })

    $('.popupList .next').on('click', function () {
        ++lieq;
        if (lieq > 7) {
            lieq = 0;
        }
        changeList(lieq)
    })

    var sct = 0;
    $(window).scroll(function () {
        sct = $(this).scrollTop();
        if (sct >= winHeight) {
            $(".header-outer").css({
                background: 'rgba(0,0,0,1)'
            });

        } else {
            $(".header-outer").css({
                background: 'rgba(0,0,0,0.5)'
            });
        }

        //top 버튼 보였다가 안보였다가 하게하기
        if (sct >= 100) {
            $('.gotop').addClass('on').stop().animate({
                opacity: '1'
            }, 500)
        } else {
            $('.gotop').removeClass('on').stop().animate({
                opacity: '0'
            }, 500)
        }

        //#skills의 offset값보다 sct값이 커졌을때
        var off = $('#skills').offset().top;
        if (sct >= off) {
            $('.skillContainer').stop().fadeIn()
        } else {
            $('.skillContainer').stop().fadeOut()
        }

    });

    $('.gotop').on('click', function () {
        $('body, html').stop().animate({
            scrollTop: 0,
        }, 800, 'linear')
    })

    $('.nav .depth1 > li > a').on('click', function (e) {
        e.preventDefault(); //이거 또는 함수 끝에 return false쓰면 된데
        //return false >> e.stopPropagation()과 e.preventDefault() 둘다 됨
        $(this).parent().addClass('on')
        $(this).parent().siblings().removeClass('on')
        var index = $(this).parent().index()
        $('body, html').animate({
            scrollTop: index * winHeight
        }, 800)

    })

    $(".section").on("mousewheel", function (e, wh) {
        var index = $(this).index()
        //마우스 휠을 올렸을때	
        if (wh > 0) {
            //변수 prev에 현재 휠을 움직인 section에서 이전 section의 offset().top위치 저장
            var prev = $(this).prev().offset().top;
            $('.depth1 li').eq(index - 1).addClass('on')
            $('.depth1 li').eq(index - 1).siblings().removeClass('on')
            //문서 전체를 prev에 저장된 위치로 이동
            $("html,body").stop().animate({
                scrollTop: prev
            }, 800, "linear");
            //마우스 휠을 내렸을때	 
        } else if (wh < 0) {
            //변수 next에 현재 휠을 움직인 section에서 다음 section의 offset().top위치 저장
            var next = $(this).next().offset().top;
            $('.depth1 li').eq(index + 1).addClass('on')
            $('.depth1 li').eq(index + 1).siblings().removeClass('on')
            //문서 전체를 next에 저장된 위치로 이동
            $("html,body").stop().animate({
                scrollTop: next
            }, 800, "linear");
        }

    });

    $(function () {
        $('.slider').slick({
            slide: 'li', //슬라이드 되어야 할 태그 ex) div, li 
            infinite: true, //무한 반복 옵션	 
            slidesToShow: 2.5, // 한 화면에 보여질 컨텐츠 개수
            slidesToScroll: 1, //스크롤 한번에 움직일 컨텐츠 개수
            // speed : 100,	 // 다음 버튼 누르고 다음 화면 뜨는데까지 걸리는 시간(ms)
            // arrows : true, 		// 옆으로 이동하는 화살표 표시 여부
            // dots : true, 		// 스크롤바 아래 점으로 페이지네이션 여부
            autoplay: true, // 자동 스크롤 사용 여부
            autoplaySpeed: 1000, // 자동 스크롤 시 다음으로 넘어가는데 걸리는 시간 (ms)
            pauseOnHover: true, // 슬라이드 이동	시 마우스 호버하면 슬라이더 멈추게 설정
            vertical: false, // 세로 방향 슬라이드 옵션
            prevArrow: false, // 이전 화살표 모양 설정
            nextArrow: false, // 다음 화살표 모양 설정
            dotsClass: "slick-dots", //아래 나오는 페이지네이션(점) css class 지정
            draggable: true, //드래그 가능 여부 

        });
    })


    $('.btn1').click(function () {

        var offset = $('#portfolio').offset(); //선택한 태그의 위치를 반환

        //animate()메서드를 이용해서 선택한 태그의 스크롤 위치를 지정해서 0.4초 동안 부드럽게 해당 위치로 이동함 

        $('html').animate({
            scrollTop: offset.top
        }, 700);

    });

    $('.btn2').click(function () {

        var offset = $('#skills').offset(); //선택한 태그의 위치를 반환

        //animate()메서드를 이용해서 선택한 태그의 스크롤 위치를 지정해서 0.4초 동안 부드럽게 해당 위치로 이동함 

        $('html').animate({
            scrollTop: offset.top
        }, 700);

    });

    $('.btn3').click(function () {

        var offset = $('#contact').offset(); //선택한 태그의 위치를 반환

        //animate()메서드를 이용해서 선택한 태그의 스크롤 위치를 지정해서 0.4초 동안 부드럽게 해당 위치로 이동함 

        $('html').animate({
            scrollTop: offset.top
        }, 700);

    });

    $('.btn4').click(function () {

        var offset = $('#header').offset(); //선택한 태그의 위치를 반환

        //animate()메서드를 이용해서 선택한 태그의 스크롤 위치를 지정해서 0.4초 동안 부드럽게 해당 위치로 이동함 

        $('html').animate({
            scrollTop: offset.top
        }, 700);

    });

})(jQuery)
