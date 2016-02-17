//Add event listener
var handler = {
    init: function(){
      this.soundcloudHandler();
      this.swipeHandler();
    },
    soundcloudHandler: function () {
        document.getElementById('soundcloud-submit').addEventListener('click', function () {
            soundcloud.getSoundcloudUser();
        });
    },
    swipeHandler: function(){
        var main = document.getElementById('main-container');
        var hammer = new Hammer(main);
        hammer.on('swipe', function (ev) {
            window.location('#swipe')
        });
        hammer.get('swipe').set({direction: Hammer.DIRECTION_VERTICAL});
    },
}