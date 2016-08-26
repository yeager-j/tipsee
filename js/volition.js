$(document).ready(function () {
    $("a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function () {
                window.location.hash = hash;
            });
        }
    });

    var top = $('#top').offset().top + $('#top').height() - 550;

    $(window).on('scroll',function(){
        var stop = Math.round($(window).scrollTop());

        if (stop > top) {
            $('.navbar').addClass('navbar-solid');
        } else {
            $('.navbar').removeClass('navbar-solid');
        }

    });
    
    $(function(){
        $('.mixitup').mixItUp({
            animation: {
                duration: 390,
                effects: 'fade stagger(34ms) scale(0.45)',
                easing: 'ease'
            }
        });
    });
    
    $('.reload').click(function(){
        $('iframe').each(function(){
            $(this).attr('src', $(this).attr('src'));
        });
    });
    
    $('body').scrollspy({target: '.navbar'});
});