$(function () {
    $('.mbnWrap>li').hover(function () {
        $('.sub').stop().hide();
        $(this).find('.sub').stop().fadeIn();
    }, function () {
        $('.sub').stop().hide();
    });
});
