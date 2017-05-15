var nav = responsiveNav(".nav-collapse", { // Selector
  animate: true, // Boolean: Use CSS3 transitions, true or false
  transition: 284, // Integer: Speed of the transition, in milliseconds
  label: "", // String: Label for the navigation toggle
  insert: "before", // String: Insert the toggle before or after the navigation
  customToggle: "menu-link", // Selector: Specify the ID of a custom toggle
  closeOnNavClick: false, // Boolean: Close the navigation when one of the links are clicked
  openPos: "relative", // String: Position of the opened nav, relative or static
  navClass: "nav-collapse", // String: Default CSS class. If changed, you need to edit the CSS too!
  navActiveClass: "js-nav-active", // String: Class that is added to  element when nav is active
  jsClass: "js", // String: 'JS enabled' class which is added to  element
  init: function(){}, // Function: Init callback
  open: function(){}, // Function: Open callback
  close: function(){} // Function: Close callback
});

//Smooth scroll
$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 300);
        return false;
      }
    }
  });
});

// DataTables
$(function(){
  var table = $('#pricing-table').DataTable({
        "columnDefs": [
            { "visible": false, "targets": 3 }
        ],
        "aaSorting": [[ 2, "asc" ]],
        "aoColumns":[
          {"bSortable": false},
          {"bSortable": false},
          {"bVisible": false}
        ],
        "displayLength": -1,
        "bInfo": false,
        "bLengthChange": false,
        "bPaginate": false,
        "drawCallback": function ( settings ) {
            var api = this.api();
            var rows = api.rows( {page:'current'} ).nodes();
            var last=null;

            api.column(3, {page:'current'} ).data().each( function ( group, i ) {
                if ( last !== group ) {
                    $(rows).eq( i ).before(
                        '<tr class="group"><td colspan="5">'+group+'</td></tr>'
                    );

                    last = group;
                }
            } );
        }
    } );
});

//Slick Slider
 $(function(){

   $('.slider').slick({
     arrows: false,
     dots: true,
     adaptiveHeight: true,
     draggable: true,
     speed: 650,
     autoplay: true,
     autoplaySpeed: 5000,
     cssEase: 'ease-in',
     fade: true,
     pauseOnHover: false,
     pauseOnDotsHover: true
   });

});

//Help Info Slide
$(function(){
  $('.button-help').click(function() {
    $('.help-info').toggleClass('closed');
    $('ul.tabs li').removeClass('current');
    $('.tab-content').removeClass('current');
    $('ul.tabs li[data-tab="tab-1"]').addClass('current');
    $("#tab-1").addClass('current');
  });
});

//Disable form submit until selected
$(function(){

  $(".button-next").on("click", function(){
      $(".form-section-one, .form-section-two").slideToggle('fast');
  });
});

$(".required").keyup(function(){
  console.log($(this).val().length);
  if($(this).val().length)
      $(".button-next").prop('disabled', false);
  else
      $(".button-next").prop('disabled', true);
});

$(function(){

  $('.tab-link').click(function(){
  var tab_id = $(this).attr('data-tab');

  $('ul.tabs li').removeClass('current');
  $('.tab-content').removeClass('current');

  $(this).addClass('current');
  $("#"+tab_id).addClass('current');
  })
  $('a#contact-link, a.contact-link').click(function() {
    $('.help-info').toggleClass('closed');
    $('ul.tabs li').removeClass('current');
    $('.tab-content').removeClass('current');
    $('ul.tabs li[data-tab="tab-2"]').addClass('current');
    $("#tab-2").addClass('current');
  })
});

$(window).load(function() {
  $(".before-after").twentytwenty({
    move_slider_on_hover: true
  });
});

//Sticky Nav
var  mn = $(".main-nav");
    mns = "main-nav-scrolled";
    hdr = $('header').height();

$(window).scroll(function() {
  if( $(this).scrollTop() > hdr ) {
    mn.addClass(mns);
  } else {
    mn.removeClass(mns);
  }
});


$(function(){
  $(".treatment-nav").sticky({topSpacing:0});
});



//Read more functionality
var $el, $ps, $up, totalHeight;

  $(".testimonial-item__quote .read-more-link").click(function() {

    totalHeight = 0

    $el = $(this);
    $p  = $el.parent();
    $up = $p.parent();
    $ps = $up.find("p:not('.read-more')");

    // measure how tall inside should be by adding together heights of all inside paragraphs (except read-more paragraph)
    $ps.each(function() {
      totalHeight += $(this).outerHeight();
    });

    $up
      .css({
        // Set height to prevent instant jumpdown when max height is removed
        // "height": $up.height(),
        "max-height": 9999
      })
      .animate({
        // "height": totalHeight
      });

    // fade out read-more
    $p.fadeOut();

    // prevent jump-down
    return false;

  });

//Page protect
  $(function(){
    $('.button-answer').click(function () {
      var answer = $('.input-answer').val().toLowerCase();
      if ( answer == "mesial") {
          window.location.href = "/referral-case-studies/";
      }
      else {
        $('.answer-form .error').show();
      }
    });
  });

window.onload = function() {
  var $recaptcha = document.querySelector('#g-recaptcha-response');

  if($recaptcha) {
      $recaptcha.setAttribute("required", "required");
  }
};
