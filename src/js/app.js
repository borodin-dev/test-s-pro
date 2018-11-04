import '../scss/style.scss'
import '../scss/fontawesome/fontawesome.scss'
import '../scss/fontawesome/_variables.scss'
import '../scss/fontawesome/brands.scss'
import '../scss/fontawesome/regular.scss'
import '../scss/fontawesome4/font-awesome.scss'
import '../scss/fontawesome4/_variables.scss'

console.log('webpack');
import hello from './hello';

$(document).ready(function () {
    var displayedItem = 0;
    var margLeft = $('#testimonialText').width();
    var numItems = $('#testimonialText .image_news').length-1;
    console.log(numItems);
    $('#testimonialText .image_news').eq(displayedItem).show();

    $('#testimonialNavPrevious').click(function () {
        $('#testimonialText .image_news').eq(displayedItem).animate({
            'margin-left': margLeft
        });
        (displayedItem <= -numItems) ? displayedItem = 0 : displayedItem--;
        console.log(displayedItem);
        $('#testimonialText .image_news').eq(displayedItem).show().css({
            'margin-left': -margLeft
        }).animate({
            'margin-left': 0
        });
        console.log('previous');
    });

    $('#testimonialNavNext').click(function () {
        $('#testimonialText .image_news').eq(displayedItem).animate({
            'margin-left': -margLeft
        });

        (displayedItem >= numItems) ? displayedItem = 0 : displayedItem++;
        console.log(displayedItem);
        $('#testimonialText .image_news').eq(displayedItem).css({
            'margin-left': margLeft
        }).show().animate({
            'margin-left': 0
        });
        console.log('next');
    });
});