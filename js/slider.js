$(function () {
    var container = $('#container');
    var list = $('#list');
    var buttons = $('#buttons span');
    var prev = $('#prev');
    var next = $('#next');
    var index = 1;
    var len = 3;
    var interval = 3000;
    var timer;


    function animate (offset) {
        var left = parseInt(list.css('left')) + offset;
        if (offset>0) {
            offset = '+=' + offset;
        }
        else {
            offset = '-=' + Math.abs(offset);
        }
        list.animate({'left': offset}, 300, function () {
            if(left > -140){
                list.css('left', -1000 * len);
            }
            if(left < (-1000 * len)) {
                list.css('left', -1000);
            }
        });
    }

    function showButton() {
        buttons.eq(index-1).addClass('on').siblings().removeClass('on');
    }

    function play() {
        timer = setTimeout(function () {
            next.trigger('click');
            play();
        }, interval);
    }
    function stop() {
        clearTimeout(timer);
    }

    next.bind('click', function () {
        if (list.is(':animated')) {
            return;
        }
        if (index == 3) {
            index = 1;
        }
        else {
            index += 1;
        }
        animate(-1000);
        showButton();
    });

    prev.bind('click', function () {
        if (list.is(':animated')) {
            return;
        }
        if (index == 1) {
            index = 3;
        }
        else {
            index -= 1;
        }
        animate(1000);
        showButton();
    });

    buttons.each(function () {
       $(this).bind('click', function () {
           if (list.is(':animated') || $(this).attr('class')=='on') {
               return;
           }
           var myIndex = parseInt($(this).attr('index'));
           var offset = -1000 * (myIndex - index);

           animate(offset);
           index = myIndex;
           showButton();
       })
   });

    container.hover(stop, play);

    play();

});