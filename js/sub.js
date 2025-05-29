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
});