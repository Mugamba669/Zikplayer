
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
        // new Notification({title:"ZikiDroid",body:"Changelog closed"}).show();
    });
    
    // load one track
    $("#add-music").click(function() {
        $("#demo").click();
    })
    // trigger email app
    $('#feedback').click(function() {
        location = "mailto:brunohectre@gmail.com";
    })
    // keyboard shortcuts
    $(document).on("keydown", function(e){
            switch (e.key) {
                case '1':
                        $(".swiper-pagination-bullet").eq(0).click();
                    break;
                    case '2':
                        $(".swiper-pagination-bullet").eq(1).click();
                    break;

                    case '3':
                        $(".swiper-pagination-bullet").eq(2).click();
                    break;
                    case '4':
                        $(".swiper-pagination-bullet").eq(3).click();
                    break;

                    case '5':
                        $(".swiper-pagination-bullet").eq(4).click();
                    break;
                    case 'u':
                        $("#demo").click();
                    break;
                    case 'p':
                        $('#playlist').click();
                    break;
                    case 'v':
                        $("#visual-select").click();
                    break;
                    case 'l':
                        $("#lyrics-btn").click();
                    break; 
            } 
        })

        
        // open sidebar
        $(".setting").click(function(){
                $(this).toggleClass("active fa-arrow-circle-right").addClass("fa-times")
                $(".sidebar").toggleClass("active")
            })


// default display
$(window).on("load", function() {
    document.querySelector(".swiper-container").style.backgroundImage = "url(" + defaultPic.image + ")";
    $("#trackId").attr("src", defaultPic.image);
    $('.fab-btn').addClass('active')
    $(".total-tracks").hide();
    //   alert("Cordova");
});

    $(document).ready(function(){

        $("#visual-select").click(function() {
            $(".box").slideDown();
        });
        $(".box").click(function() {
            $(this).hide();
        });
        try {
        $(".canvas-full").show();
        // $(".wave-full").hide();
        $(".histogram-full").hide();
        $(".sp1").hide();
        $(".ripple-wave").hide()
        } catch (error) {
            console.log(error)
        }
        
        
        // bars visualizer
        $(".body p").eq(0).click(function() {
            // $("#bars-visual").show().css("transform", "translateY(115px)");;
            $("#spec-visual").hide();
            $(".double-visual").hide();
            $(".canvas-full").show()
            $(".sp1").hide();
        });
        
        // Spectrum visualizer
        $(".body p").eq(1).click(function() {
            // $("#spec-visual").show();
            $("#bars-visual").hide();
            $(".double-visual").hide();
            $(".canvas-full").show()
            // $(".wave-full").hide()
            $(".sp1").hide();
            // $(".ripple-wave").hide()
            // $(".histogram-full").hide();
        });
        
        // double visulizer
        $(".body p").eq(2).click(function() {
            $(".double-visual").hide();
            $("#up-bars-visual").hide();
            $("#dw-bars-visual").hide();
            $("#bars-visual").hide();
            $(".canvas-full").show()
            $(".sp1").hide();
        });
        // Spiral visualizer
        $(".body p").eq(3).click(function() {
            $(".double-visual").hide();
            $("#up-bars-visual").hide();
            $("#dw-bars-visual").hide();
            $("#spec-visual").hide();
            $("#bars-visual").hide();
            $(".canvas-full").hide();
            // $(".wave-full").hide();
            // $(".ripple-wave").hide()
            // $(".histogram-full").hide();
            $(".sp1").show();
        });
        
         // no visualizer
         $(".body p").eq(8).click(function() {
            $(".double-visual").hide();
            $("#up-bars-visual").hide();
            $("#dw-bars-visual").hide();
            $("#spec-visual").hide();
            $("#bars-visual").hide();
            $(".canvas-full").hide();
            $(".wave-full").hide();
            $(".ripple-wave").hide()
            $(".histogram-full").hide();
            $(".sp1").hide();
        });

          // Show glass pills
          $(".body p").eq(6).click(function() {
            $(".double-visual").hide();
            $("#up-bars-visual").hide();
            $("#dw-bars-visual").hide();
            $("#spec-visual").hide();
            $("#bars-visual").hide();
            $(".canvas-full").show();
            $(".wave-full").hide();
            $(".sp1").hide();
        });
        
         // Show sine wave
         $(".body p").eq(4).click(function() {
            $(".double-visual").hide();
            $("#up-bars-visual").hide();
            $("#dw-bars-visual").hide();
            $("#spec-visual").hide();
            $("#bars-visual").hide();
            $(".canvas-full").show();
            // $(".wave-full").show();
            $(".ripple-wave").hide()
            $(".histogram-full").hide();
            $(".sp1").hide();
        });
        
          // show histogram
          $(".body p").eq(5).click(function() {
            $(".double-visual").hide();
            $("#up-bars-visual").hide();
            $("#dw-bars-visual").hide();
            $("#spec-visual").hide();
            $("#bars-visual").hide();
            $(".canvas-full").show();
            $(".wave-full").hide();
            $(".ripple-wave").hide()
            // $(".histogram-full").show();
            $(".sp1").hide();
        });
  // show riple wave
  $(".body p").eq(7).click(function() {
    $(".double-visual").hide();
    $("#up-bars-visual").hide();
    $("#dw-bars-visual").hide();
    $("#spec-visual").hide();
    $("#bars-visual").hide();
    $(".canvas-full").show();
    $(".wave-full").hide();
    // $(".ripple-wave").show()
    $(".histogram-full").hide();
    $(".sp1").hide();
});
})

$(".auto button").click(function() {
    $(".load-body").show().addClass("active");
});

// playlist
$('#playlist').click(function(){
    $(".plist").addClass('w3-show')
})
// lyrics
$('.lyrics-container').hide()
$("#lyrics-btn").click(function(){
    $('.lyrics-container').slideDown(function(){
        $(".lyrics-wrapper").addClass('active')
    });
})
$('.lyrics-container').click(function(){
    $(".lyrics-wrapper").removeClass("active",function(){
        $('.lyrics-container').delay(200).slideUp()
    });
})
// 
$(".bottom-container").hide();

