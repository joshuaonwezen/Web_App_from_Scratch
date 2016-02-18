var loader = {
    show: function(){
        $('#loader').style.display = "";
    },
    hide: function(){
        $('#loader').style.display = "none";
    }
}

function show(item) {
    item.classList.add('show');
    item.classList.remove('hide');
}
function hide(item) {
    item.classList.add('hide');
    item.classList.remove('show');
}