$(function () {
    const $input = $('.searchBar > input');
    const originalPlaceholder = $input.attr('placeholder');

    $input.on('focus', function () {
        $(this).attr('placeholder', '');
    });

    $(document).on('click', function (e) {
        if (!$(e.target).is('.searchBar > input')) {
            $input.val('');
            $input.attr('placeholder', originalPlaceholder);
        }
    });

    $('.mbnWrap>li').hover(function () {
        $('.mbnWrap>li').removeClass("hovered");
        $(this).addClass("hovered");

        $('.sub').stop().hide();
        $(this).find('.sub').stop().show();
    }, function () {
        $('.sub').stop().hide();
    });

    $('.slider_button>button').hover(function () {
        $('.slider_button>button').removeClass("hovered");
        $(this).addClass("hovered");

        let n = $(this).index();
        $(".slider_img>img").hide().eq(n).show();
    });

    $('.yWelYESFD').hover(function () {
        $(this).find('span').css('display', 'block');
    }, function () {
        $(this).find('span').css('display', 'none');
    });

    async function fetchBooks(query) {
        const params = new URLSearchParams({
            target: "title",
            query,
            size: 50
        });

        const url = `https://dapi.kakao.com/v3/search/book?${params}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: "KakaoAK 0184f745f7653961f58f01aaed0ba835"
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP 오류! 상태 코드: ${response.status}`);
        }

        return response.json();
    }

    async function bookData() {
        try {
            const todayResult = await fetchBooks('고래눈이 내리다');
            const today = todayResult.documents[0];

            if (today) {
                $('.book_info').append(`<h4>${today.contents}</h4>
                        <h4>${today.title}</h4>
                        <h6>${today.authors.join(', ')}</h6>
                        <h5>${today.price}원</h5>
                    `);
            }

            const querys = ['자유', '소년'];

            querys.forEach(async (query, i) => {
                const data = await fetchBooks(query);
                let list = ['.yWelNowBook', '.yWelBookClub']
                const divs = $(list[i]).find('li');

                for (let j = 0; j < divs.length; j++) {
                    divs.eq(j).append("<img src=" + data.documents[j].thumbnail + "/>");
                    divs.eq(j).append("<h4>" + data.documents[j].title + "</h4>");
                    divs.eq(j).append("<h6>" + data.documents[j].authors + "</h6>");
                    divs.eq(j).append("<h5>" + data.documents[j].price + "원</h5>");
                }
            })
        } catch (error) {
            console.log('에러발생', error);
        }
    }

    bookData();
});