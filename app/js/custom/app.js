var icon =
  '<svg class="sg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 185.31 251.89"><path d="M66.8,144.17c0-66.24,22.46-113.09,80.72-112.32,81.48,1.07,80.72,46.08,80.72,112.32,0,5.15,8.38,3.81,7.62,19-2.28,19.42-9.44,14.63-10.39,19.85-9.26,51.08-40.65,88.67-77.95,88.67-37.76,0-69.47-38.53-78.28-90.58-.82-4.85-5.86-.8-6.42-18.68C61.47,146.07,66.8,149.07,66.8,144.17Z" transform="translate(-56.6 -25.84)" style="fill:#ffdfbf;fill-rule:evenodd"/><path d="M147.52,31.85C99.49,31.22,75.79,63,69,111.24c8.78-23.84,27.86-26,64.33-26.54,70.62-1.13,88.39,8.27,79.64,96.55-1.84,18.6-6.1,24.62-28.36,39.74-12.07,8.2,18.54-26.37-49.78-27-49.5-.43-30.06,36.41-40.06,29.44a81.88,81.88,0,0,1-20.28-20.73c12.89,40.76,40.76,69,73.08,69,37.3,0,68.69-37.59,77.95-88.67l2.77-38.89C228.24,77.93,229,32.91,147.52,31.85Z" transform="translate(-56.6 -25.84)" style="fill:#d0b57b;fill-rule:evenodd"/><path d="M146.13,31.84h1.39c81.48,1.07,80.72,46.08,80.72,112.33,0,5.15,8.38,3.81,7.62,19-2.28,19.42-9.44,14.63-10.39,19.85-9.26,51.08-40.65,88.67-77.95,88.67-37.76,0-69.47-38.53-78.28-90.58-.82-4.85-5.86-.8-6.42-18.68-1.34-16.39,4-13.39,4-18.29,0-65.71,22.11-112.33,79.33-112.33m0-6h0c-29.39,0-51.65,11.54-66.18,34.3C67.3,80,60.86,108.06,60.8,143.68h0c-2.54,3.05-4.94,7-4,19.12.4,12.11,2.72,16.46,6.59,19.86,9.65,56,44.19,95.07,84.11,95.07,19.91,0,38.59-9.42,54-27.25,14.35-16.57,24.87-39.79,29.66-65.45l0,0c4.22-2.57,8.87-6.53,10.58-21.1l0-.2v-.2c.58-11.55-3.35-16.18-7.07-19.61l-.53-.5v-1c0-33,0-61.46-10.76-82.11-12-23-36.09-33.89-75.88-34.41Z" transform="translate(-56.6 -25.84)" style="fill:#303030"/><path d="M118.31,183.29s4.28,4.28,12.84,4S143.67,182,143.67,182s-3.62,8.23-11.53,8.89S118.31,183.29,118.31,183.29Z" transform="translate(-56.6 -25.84)" style="fill:#bfa78f;fill-rule:evenodd"/><ellipse cx="44.24" cy="115.64" rx="28.15" ry="35.97" style="fill:#fff"/><ellipse cx="104.54" cy="115.64" rx="28.15" ry="35.97" style="fill:#fff"/><circle class="eye" id="eye-left" cx="35.9" cy="121.66" r="10.5" style="fill:#303030"/><circle class="eye" cx="94.57" cy="121.66" r="10.5" style="fill:#303030"/><path d="M140.74,236.63h0c-16.92,0-29.43-4.38-29.43-18.42h0c0-4.22,4.12-7.64,9.21-7.64H160c3.6,0,6.53,2.42,6.53,5.42v7.23C166.55,234.48,154.32,236.63,140.74,236.63Z" transform="translate(-56.6 -25.84)" style="fill:#2d251d;fill-rule:evenodd"/><path d="M160,210.57h-39.5c-5.09,0-9.21,3.42-9.21,7.64,0,.07,0,.15,0,.22,7.57,2.29,17.6,3.2,29,3.2h0c9.87,0,19.24-.52,26.25-2.36V216C166.55,213,163.62,210.57,160,210.57Z" transform="translate(-56.6 -25.84)" style="fill:#fff"/></svg>';

document.head.insertAdjacentHTML(
  'beforeend',
  '<style>.sg { width: 35px; height: 35px; position: fixed; bottom: 10px; right: 10px; } .sg .eye { -webkit-transform: translateX(0px);   transform: translateX(0px); } .sg:hover .eye { -webkit-transition: -webkit-transform 0.3s ease; transition: -webkit-transform 0.3s ease; transition: transform 0.3s ease; transition: transform 0.3s ease, -webkit-transform 0.3s ease; -webkit-transform: translateX(12px);   transform: translateX(12px); }</style>'
);

var a = document.createElement('a');
a.setAttribute('href', 'https://twitter.com/steeevg');
a.setAttribute('target', '_blank');
a.innerHTML = icon;

//  document.body.appendChild(a);

var increment = 'vw',
  oriented = 'horizontal', // BECAUSE iOS doesn't like the variable orientation
  orientation_last = '',
  slider_orientation = 'horizontal', //default
  dimension = 'wide',
  maxed = false,
  maxed_last = false,
  maxed_changed = false,
  slider_menu = 'wheel-menu',
  _w = jQuery(window).width(),
  _h = jQuery(window).height(),
  aspect = _w / _h,
  current_slide_id = '',
  curent_slide_title = '',
  curent_slide_content = '',
  curent_slide_image = '',
  current_notch = 0;
var wheel_nav_params = {};
jQuery(document).ready(function() {
  jQuery('.wheelnav-outer-nav-title').css('display:none;');
  console.log('ready');
  reposition_screen();
  //tagCloud()
  //setGlobe("#globe", _w * .1, _h * .1);
  //setWorld("#globe", "#world");
  if (oriented == 'horizontal') {
  } else {
  }
});
jQuery(window).resize(function() {
  _w = jQuery(window).width();
  _h = jQuery(window).height();

  if (_w > _h) {
    increment = 'vh';
    oriented = 'horizontal';
    // orientation_last = 'horizontal'
  } else {
    increment = 'vw';
    oriented = 'vertical';
    //orientation_last = 'vertical'
  }
  aspect = _w / _h;
  //   setGlobe("#globe", Math.round(_w * .1), Math.round(_h * .1));

  reposition_screen();
});

function initSite() {
  // called from the menus callback
  //console.log("load",data_loaded.length,data_score)
  if (menus == undefined || media == undefined || posts == undefined) {
    window.setTimeout(initSite(), 100);
  }

  var default_slug = 'webxr';
  //console.log("init",menus,location.hash)
  if (location.hash == '#undefined' || location.hash == '') {
    //console.log('hash undefined',location.hash)

    default_slug = 'webxr';
    location.hash = '#webxr';
    //console.log('hash empty or undefined', location.hash)
  } else {
    default_slug = location.hash.replace('#', '');

    // console.log("set by slugHash",location.hash, default_slug, menus['wheel-menu'].slug_nav[default_slug])
  }
  // console.log("slug=" + default_slug, menus['wheel-menu'].slug_nav)
  setSocial();
  if (useWheelNav === true) {
    var notch = menus['wheel-menu'].slug_nav[default_slug];
    setSlider();

    setSlides('wheel-menu');
    setSlides('tag-cloud');

    // console.log("menu","notch="+notch)
    //  jQuery(menu_config[m].location).html(items)

    setSlideShow('wheel-menu'); // creates slides for the slick carousel
    makeWheelNav('outer-nav', menus['wheel-menu'].menu_levels);
    setSliderNotch(notch);
  }
  //initWebGLProgram()

  //  initMatrix();
  //console.log(menus)
}

function setWheelNavParams() {
  wheel_nav_params = {
    maxPercent: 1,
    min: 0.80,
    max: 1,
    sel_min: 0.8,
    sel_max: 1,
  };

  if (maxed == true) {
    wheel_nav_params = {
      maxPercent: 1,
      min: 0.80,
      max: 1,
      sel_min: 0.80,
      sel_max: 1,
    };
  }
  //console.log("maxed="+maxed, wheel_nav_params)
}

function positionElements() {
  // manages classes for sizes, orientation and aspect

  var elements = ['#main', 'header', 'footer', '#related', '#screen'];

  slider_orientation: 'horizontal';
  dimension = 'wide';

  if (_w < _h) {
    // sets orientation

    //oriented = 'vertical';

    slider_orientation = 'horizontal';
  } else {
    oriented = 'horizontal';
   // slider_orientation = 'vertical';
  }

  if (orientation_last != oriented) {
    // this triggers on orientation change
    orientation_last = oriented;
    //    console.log("orientation changed to "+oriented,orientation_last)
    setSlider();
  }

  if (aspect <= 0.5) {
    dimension = 'super-narrow';
  } else if (aspect > 0.5 && aspect <= 0.75) {
    dimension = 'narrow';
  } else if (aspect > 0.75 && aspect <= 0.9) {
    dimension = 'semi-narrow';
  } else if (aspect > 0.9 && aspect <= 1.1) {
    dimension = 'square';
  } else if (aspect > 1.1 && aspect <= 1.25) {
    dimension = 'semi-wide';
  } else if (aspect > 1.25 && aspect <= 1.5) {
    dimension = 'wide';
  } else if (aspect > 1.5 && aspect <= 2) {
    dimension = 'super-wide';
  } else if (aspect > 2) {
    dimension = 'extra-super-wide';
  }

  for (e = 0; e < elements.length; e++) {
    //  console.log("set orientation",elements[e],oriented)
    jQuery(elements[e]).removeClass();

    jQuery(elements[e]).addClass(dimension);
    jQuery(elements[e]).addClass(oriented);

    if (maxed == true) {
      jQuery(elements[e]).addClass('maxed');
    } else {
    }
  }
  //console.log("slider-wrap",orientation,slider_orientation)

  jQuery('#slider-wrap').removeClass();
  jQuery('#slider-wrap').addClass(slider_orientation);
  jQuery('#slider-wrap').addClass(dimension);
}

function positionProjector() {
  var top = 50,
    width = '20vw',
    height = '20vw';

  if (aspect > 1.15 && aspect < 1.5) {
    top = (aspect - 1) * 100 + '%';
    width = '10vw';
    height = '10vw';
    //fontSize = 1.2
  } else if (aspect > 0.5 && aspect <= 1.15) {
    top = '20%';
    width = '15vw';
    height = '15vw';
    //fontSize = 1
  } else if (aspect >= 1.5) {
    top = '50%';
    width = '20vw';
    height = '20vw';
    //fontSize = 1.5
  }

  //jQuery("#featured-image-header").css("fontSize", fontSize + 'em')
  //jQuery("#featured-image-footer").css("fontSize", fontSize * 0.8 + "em")
}

function reposition_screen() {
  var width = '100vw';
  var height = '100vh';
  var top = '0';
  var bottom = '0';
  var left = 0;
  var margin_top = '0';
  var margin_left = '0';
  var inc = 'vh';

  if (aspect <= 0.5) {
    width = _w + 'px';
    height = _w * 2 + 'px';
    top = 50;
    left = 0;
    margin_top = _w * -1;
    margin_left = 0;
    bottom = _w;
    inc = 'px';
  } else if (aspect >= 2) {
    width = _h * 2 + 'px';
    height = _h + 'px';
    top = 0;
    left = 50;
    margin_top = 0;
    bottom = 0;
    margin_left = _h * -1;
    inc = 'px';
  }
  //jQuery('header').css('width',  width)
  //jQuery('header').css('height', height)
  //  jQuery('header').css('top', top + "%")
  //  jQuery('header').css('left', left + '%')
  //  jQuery('header').css('marginTop', margin_top)
  //jQuery('header').css('marginLeft', margin_left)

  //  isMaxed()

  jQuery('#main').css('width', width);
  jQuery('#main').css('height', height);
  jQuery('#main').css('top', top + '%');
  jQuery('#main').css('left', left + '%');
  jQuery('#main').css('marginTop', margin_top + inc);
  jQuery('#main').css('marginLeft', margin_left + inc);

  //console.log("aspect=" + aspect, "_w" + _w, "_h" + _h, "w=" + width, "h=" + height, "t=" + top, "l=" + left, "mt" + margin_top, "ml=" + margin_left);

  positionProjector();
  positionElements();

  jQuery('#slider').css('visibility', 'visible');

  var calibrate_elements = [
    {
      // default
      id: '.phi-centered',
      size: 61.8, //use number, it needs to be divided
      increment: 'vw',
    },
    {
      id: '#outer-ring',
      size: 80, //use number, it needs to be divided
      increment: 'vw',
    },
    {
      id: '#inner-ring',
      size: 72, //use number, it needs to be divided
      increment: 'vw',
    },
    {
      id: '#inner-subring',
      size: 65, //use number, it needs to be divided
      increment: 'vw',
    },
  ];

  jQuery('#stars').css('height', '100vh');
  jQuery('#stars').css('width', '100vw');
  jQuery('#stars').css('top', 0);
  jQuery('#stars').css('left', 0);
}

function isMaxed() {
  // FIX - this is still problematic and has been backed out for now
  maxed_changed = false;
  if ((aspect < 0.75 && _w < 768) || (aspect > 1.5 && _h < 640)) {
    // MAX OUT the wheel size below 768 and wide or narrow
    maxed = true;

    if (maxed_last == false) {
      //resetWheel();
      maxed_last = true;
      maxed_changed = true;
    }
  } else {
    maxed = false;
    if (maxed_last == true) {
      //resetWheel();

      maxed_last = false;
      maxed_changed = true;
    }
  }
  if (maxed_changed == true) {
    //console.log("maxed now =", maxed)
    if (wheels['outer-nav'] != undefined) {
      wheels['outer-nav'].raphael.remove();

      popAWheelie('outer-nav');

      makeWheelNav('outer-nav', menus['wheel-menu'].menu_levels);
    }
  }
}

function resetWheel() {
  setWheelNavParams();
  //console.log("resetWheel")

  wheels['outer-nav'].removeWheel();
  if (wheels['inner-nav'] != undefined) {
    wheels['inner-nav'].removeWheel();
  }
  if (wheels['inner-subnav'] != undefined) {
    wheels['inner-subnav'].removeWheel();
  }
}

function calibrateCircle(id, size, increment) {
  /*
  console.log("calibrate",id,size,increment)
 
   jQuery(id).css('width', size + increment)
   jQuery(id).css('height', size + increment)
   jQuery(id).css('margin-left', ((size / 2) * -1) + increment)
   jQuery(id).css('margin-top', ((size / 2) * -1) + increment)
*/
}
