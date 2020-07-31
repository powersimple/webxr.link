function setSlider() {
// console.log("slider", oriented, menus, menus[m], m)


 // console.log("slider_oritentation", slider_orientation)
  if(menus['wheel-menu'] != undefined){
    jQuery("#slider").slider({
      orientation: slider_orientation,
      range: "max",
      min: 0,
      max: menus['wheel-menu'].linear_nav.length,
      value: 0,
      slide: function (event, ui) {
        setSliderNotch(ui.value)
        //   console.log("slider",ui.value)
        // jQuery( "#amount" ).val( ui.value );
      }



    });

    jQuery('.slick-dots li button').on('click', function (e) {
      e.stopPropagation(); // use this
      //console.log("slick dot clicked")
    });
  }

}
/**/
  jQuery('#slider').on('mousewheel DOMMouseScroll', function(e) {
    e.preventDefault();
    
    value = jQuery( "#slider" ).slider( "value" );
    if(value == undefined || value == NaN){
      value=0
    }
    var event = e.originalEvent
    console.log(jQuery("#slider").slider);
  
   
    if (event.deltaY == -150) { //Mousewheel Scrolled up
        
         if (value < menus['wheel-menu'].linear_nav.length) {
           value = value+1
         } else {
           value = 0; // jump to bottom from top
         }
        setSliderNotch(value)
    }
    
    else if (event.deltaY == 150) { //Mousewheel Scrolled down
     
        if (value == 0){
          value = menus['wheel-menu'].linear_nav.length // jump to top from bottom
        } else {
          value = value - 1;
        }


        setSliderNotch(value)
        
    }
    
  });

(function ($) {
 

  $('div.arrow').on('click', function (e) {
    e.stopPropagation(); // use this
    var id = $(this).attr("id");

    var next_notch = current_notch;

    if (id == 'down-arrow') {

      if (next_notch == 0) {
        next_notch = menus['wheel-menu'].linear_nav.length - 1
      } else {
        next_notch--
      }



    } else if (id == 'up-arrow') {



      if (next_notch == menus['wheel-menu'].linear_nav.length - 1) {
        next_notch = 0
      } else {
        next_notch++
      }
    }
    //console.log('arrow_next',next_notch)
    setSliderNotch(next_notch)




  });

})(jQuery)


function setSliderNotch(notch) {
  var m = 'wheel-menu'
  if (state.circle_delay != undefined) {
      ///console.log("delay", state.circle_delay)
    clearInterval(state.circle_delay);
     //console.log("stop delay", state.circle_delay)
  }
  
 // console.log("notch", menus[m].data_nav[notch], notch, getSlug(menus[m].data_nav[notch]))
 
  
  location.hash = getSlug(menus[m].data_nav[notch])
  //console.log("set slider notch", notch,location.hash)
  jQuery("#slider").slider('value', notch);
  if (menus['wheel-menu'].linear_nav[notch] != undefined) {

    setContent(notch, menus[m].data_nav[notch].object_id, menus[m].data_nav[notch].object)
   // console.log("trigger notch=", notch, location.hash)
    triggerWheelNav(notch)
    //selectNavItem(notch);
  }
  current_notch = notch;
  // document.title = linear_nav[notch].title+" | "+site_title
}