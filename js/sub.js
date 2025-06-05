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

    const $bnImgs = $('.bnList img');
    let bnCurrentIndex = 0;

    function updateBnBanner() {
        $bnImgs.hide().eq(bnCurrentIndex).show();
    }

    updateBnBanner();

    $('.bnNav button').eq(0).click(function () {
        bnCurrentIndex = (bnCurrentIndex - 1 + $bnImgs.length) % $bnImgs.length;
        updateBnBanner();
    });

    $('.bnNav button').eq(1).click(function () {
        bnCurrentIndex = (bnCurrentIndex + 1) % $bnImgs.length;
        updateBnBanner();
    });

    $('.turn_book').css({
        'transform': 'rotateY(40deg)',
        'transition': 'transform 0.6s ease'
    });

    setTimeout(function () {
        $('.turn_book').css('transform', 'rotateY(0deg)');
    }, 1500);

    $('.turn_book').click(function () {
        $(this).toggleClass('rotate');
    });

    $('.yDetailBnWrap li').hover(function () {
        $('.yDetailBnWrap li').removeClass("hovered");
        $(this).addClass("hovered");

        let n = $(this).index();
        $(".yDetailBnWrap > div> img").hide().eq(n).show();
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
            const nomi = ['단 한 번의 삶', '빛과 실', '우리의 낙원에서 만나자', '뭐 어때', '이처럼 사소한 것들', '맡겨진 소녀'];

            nomi.forEach(async (query, i) => {
                const data = await fetchBooks(query);
                const divs = $('.nomi_list li');

                divs.eq(i).append(`
                    <img src=${data.documents[0].thumbnail}/>
                    <h4>${data.documents[0].title}</h4>
                    <h5>${data.documents[0].authors} 저 | ${data.documents[0].publisher}</h5>
                    <h4>${data.documents[0].price*0.9}원 (10% 할인)</h4>
                    `);
            })

            const authorLi = ['머피의 하루', '어떤 날은', '바위와 소녀', '과거에도 미래에도, 우리는', '고양이 맥스의 비밀', '자기만의 방으로'];

            authorLi.forEach(async (query, i) => {
                const data = await fetchBooks(query);
                const divs = $('.authorLi li');

                divs.eq(i).append(`
                    <img src=${data.documents[0].thumbnail}/>
                    <h4>${data.documents[0].title}</h4>
                    <h4><span>${data.documents[0].price*0.9}</span>원 (10% 할인)</h4>
                    `);
            })

        } catch (error) {
            console.log('에러발생', error);
        }
    };

    bookData();

    async function txt() {
        try {
            const response = await fetch("./sub.txt");
            console.log(response);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.text();
            document.getElementById("tmpBox").innerHTML = data;
        } catch (error) {
            console.error("There was a problem with the fetch operation:", error);
        }
    }
    
    txt();
});