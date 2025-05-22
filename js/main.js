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
});