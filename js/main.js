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
    };

    async function bookData() {
        try {
            const todayResult = await fetchBooks('고래눈이 내리다');
            const today = todayResult.documents[0];

            if (today) {
                $('.book_info').append(`
                    <h4>${today.contents}</h4>
                    <h4>${today.title}</h4>
                    <h6>${today.authors.join(', ')} 저</h6>
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
                    divs.eq(j).append("<h6>" + data.documents[j].authors + " 저</h6>");
                    divs.eq(j).append("<h5>" + data.documents[j].price + "원</h5>");
                }
            })


            const rankings = ['청춘의 독서', '엄마의 말 연습', '어른의 품격', '단 한 번의 삶', '이로운 보수'];

            rankings.forEach(async (query, i) => {
                const data = await fetchBooks(query);
                const divs = $('.bestOn ol li');

                divs.eq(i).append(`
                    <img src=${data.documents[0].thumbnail}/>
                    <div>
                        <h4>${data.documents[0].title}</h4>
                        <h5>${data.documents[0].authors} 저</h5>
                    </div>
                    `);
            })

            const picks = ['그녀를 지키다', '치코', '빅 사이클'];

            picks.forEach(async (query, i) => {
                const data = await fetchBooks(query);
                const divs = $('.yWelMultiSec > div:nth-of-type(1) ul li');

                divs.eq(i).append(`
                    <img src=${data.documents[0].thumbnail}/>
                    <h4>${data.documents[0].title}</h4>
                    <h5>${data.documents[0].authors} 저</h5>
                    <h6>${data.documents[0].price} 원</h6>
                    `);
            })

            const president = ['어떻게 민주주의는', '삶터를 책임지는', '사람, 장소, 환대', '당신의 작업복 이야기'];

            president.forEach(async (query, i) => {
                const data = await fetchBooks(query);
                const divs = $('.bookBox ul li');

                divs.eq(i).append(`
                    <img src=${data.documents[0].thumbnail}/>
                    <h4>${data.documents[0].title}</h4>
                    `);
            })
        } catch (error) {
            console.log('에러발생', error);
        }
    };

    bookData();
});