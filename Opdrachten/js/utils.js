var $ = function (id) {
        var elements = document.querySelectorAll(id);
        if(elements.length > 1){
            return elements;
        }
        if(elements.length == 1){
            return elements[0];
        }
};

function show(item) {
    if(item != undefined){
        item.classList.add('show');
        item.classList.remove('hide');
    }
}
function hide(item) {
    if (item != undefined) {
        item.classList.add('hide');
        item.classList.remove('show');
    }
}