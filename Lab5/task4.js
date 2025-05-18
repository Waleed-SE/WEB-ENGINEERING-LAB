let mover = 0;
$("#move").click(function () { 
    mover = mover + 200;
    $("#div-100").animate({left: mover + 'px'}) ; 
})