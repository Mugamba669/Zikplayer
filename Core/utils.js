const $ = require('jquery');
const defaultPic = require('./default.js');
var controls = {
    spaceBetween: 0,
    parallax:true,
    speed:1900,
    effect:"cube",// flip coverflow cube fade
    gradCursor:true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      },
      cubeEffect: {
        shadow: false,
        slideShadows: false,
        shadowOffset: 20,
        shadowScale: 0.94,
      },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
}
// activate the swiping api
new Swiper('.swiper-container',controls );

document.addEventListener("DOMContentLoaded", () => {
    new WebkitInputRangeFillLower({
        selectors: ['bass', 'treble','stereo', 'treb-boost', 'bass-boost', 'vol-add', 'rate-xp', 'balance', 'audio-boost', 'audio-limit', 'd1-v', 's1-v', 'd2-v', 's2-v'],
        color: '#63cdff'
    });
    // slide track color
    new WebkitInputRangeFillLower({
        selectors: ['audio-boost','rate-xp'],
        color: '#63cdff'
    });
    // compressor
    new WebkitInputRangeFillLower({
        selectors: ['threshold','release' ,'attack','knee','ratio'],
        color: '#63cdff'
    });
});
// 

    $('#effects-off').hide();
    $('#effects-on').on('click', function() {
        $(this).hide();
        $('#effects-off').show();
    });

    $('#effects-off').on('click', function() {
        $(this).hide();
        $('#effects-on').show();
    });
// show pop up message
    $("#open-btn-container").click(function() {
        $(".button-container").toggleClass("active");
        //$(this).css("opacity","0");
    });
    $(window).on("load", function() {
        $(".on").hide();
    });
    // close pop message
    $("#close-log").click(function() {
        $("#changelog").hide();
    });
    
    // trigger email app
    $('#feedback').click(function() {
        $(".sidebar-data").removeClass("active")
        $(".sidebar-icons").removeClass("active")
        window.location = "mailto:brunohectre@gmail.com";
    })
    // keyboard shortcuts
    $(document).on("keydown", function(e){
            switch (e.key) {
                // case '1':
                //         $(".swiper-pagination-bullet").eq(0).click();
                //     break;
                //     case '2':
                //         $(".swiper-pagination-bullet").eq(1).click();
                //     break;

                //     case '3':
                //         $(".swiper-pagination-bullet").eq(2).click();
                //     break;
                //     case '4':
                //         $(".swiper-pagination-bullet").eq(3).click();
                //     break;

                //     case '5':
                //         $(".swiper-pagination-bullet").eq(4).click();
                //     break;
                //     case 'u':
                //         $("#demo").click();
                //     break;
                    // case 'p':
                    //     $('#playlist').click();
                    // break;
                    // case 'v':
                    //     $("#visual-select").click();
                    // break;
                    // case 'l':
                    //     $("#lyrics-btn").click();
                    // break; 
            } 
        })

// default display
$(window).on("load", function() {
    document.querySelector(".swiper-container").style.backgroundImage = "url(" + defaultPic.image + ")";
    $("#trackId").attr("src", defaultPic.image);
    $('.fab-btn').addClass('active')
    $(".total-tracks").hide();
    //   alert("Cordova");
});

$(".auto button").click(function() {
    $(".load-body").show().addClass("active");
});

// playlist
$('#playlist').click(function(){
    $(".sidebar-data").removeClass("active")
    $(".sidebar-icons").removeClass("active")
    $(".plist").addClass('active')
    $(".plist-cont").addClass('active')
})

// 
$(".bottom-container").hide();