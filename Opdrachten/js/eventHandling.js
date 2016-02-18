//Add event listener
var handler = {
    init: function(){
      this.soundcloudHandler();
      this.swipeHandler();
    },
    soundcloudHandler: function () {
        $('#soundcloud-submit').removeEventListener('click', soundcloud.getSoundcloudUser);

        $('#soundcloud-submit').addEventListener('click', soundcloud.getSoundcloudUser);
    },
    swipeHandler: function(){
//        var main = $('#main-container');
//        var hammer = new Hammer(main);
//        hammer.on('swipe', function (ev) {
//            window.location('#swipe')
//        });
//        hammer.get('swipe').set({direction: Hammer.DIRECTION_VERTICAL});
        $('body').addEventListener('touchend', function () {
            show($('#swipe-section'));
            //soundcloud.getSoundcloudUser();
        })
    },
}