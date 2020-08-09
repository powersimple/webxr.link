<?php
get_header(); ?>
<script>
  var useWheelNav = true
</script>
<main id="main" role="main">
 <div id="screen" class="phi-centered">


    <span class="ripple"></span>

    <div id="circle-mask">

      <div id="screen-image-wrap">
        <div id="screen-image-header" class="screen-caption">
          <div id="screen-image-title"></div>
          <div id="screen-image-caption"></div>
        </div>
        <div id="screen-image-container"></div>
        <div id="screen-image-footer" class="screen-caption">
          <div id="screen-image-description"></div>
        </div>
      </div>





      <div id="bg-video">
        <video id="video" controls="true " autoplay="autoplay" muted="muted" preload="auto" loop="loop">
          <source src="#" type="video/mp4">
        </video>

      </div>

      <article id="wheel-menu-content" class="slideshow"></article>
      <article id="projects-content" class="slideshow"></article>
      <!-- -->
      <!--masks contents above this svg-->

      <svg id="circle-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice">
        <defs>
          <mask id="mask" x="0" y="0" width="528.934px" height="394.314px">
            <rect x="0" y="0" width="100%" height="100%" />
            <circle class="cls-1" cx="500" cy="499" r="475" />
          </mask>
        </defs>
        <rect x="0" y="0" width="100%" height="100%" />
      </svg>
    </div><!-- outer nav ring -->
      <section id="wheel-nav">
        <nav id="outer-ring">
          <div id="outer-nav" class="wheelNav"></div>
        </nav>
        <nav id="inner-ring">
          <!-- inner nav ring -->
          <div id="inner-nav" class="wheelNav"></div>
        </nav>
        <nav id="inner-subring">
          <!-- inner subnav ring -->
          <div id="inner-subnav" class="wheelNav"></div>
        </nav>
    </section>
   

  </div>
   <section id="related"></section>
    <div id="slider-wrap">
      <div id="up-arrow" class="arrow"><?php include "svg/arrow-key.svg";?></div>
      <div id="slider"></div>
      <div id="down-arrow" class="arrow"><?php include "svg/arrow-key.svg";?></div>
    </div>
      <div id="mindmap">
  
    </div>
    

</main>
<script>
  jQuery(document).ready(function() {
  // enable the mindmap in the #mindmap
  jQuery('#mindmap').mindmap();
 //jQuery('#wheel-nav').css('display', 'none');
  //jQuery('#slider-wrap').css('display', 'none');
  // add the data to the mindmap
 // loadMindmap('#mindmap');
});
</script>
<?php
get_footer(); 
?>