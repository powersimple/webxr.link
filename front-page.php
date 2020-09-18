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
        <div id="stargate">
            <div class="inner iris irison">
              <div id="render"></div>
          </div>
        </div>
    </section>
   

  </div>
   <section id="related"></section>
  
      <div id="mindmap">
  
    </div>
    

</main>
  <div id="slider-wrap">
      <div id="up-arrow" class="arrow"><?php include "svg/arrow-key.svg";?></div>
      <div id="slider"></div>
      <div id="down-arrow" class="arrow"><?php include "svg/arrow-key.svg";?></div>
    </div>
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
<script id="vertex-shader" type="no-js">
  //https://www.shadertoy.com/view/MdlXz8
            void main()	{
              gl_Position = vec4( position, 1.0 );
            }
          </script>
          <script id="fragment-shader" type="no-js">
            uniform float iGlobalTime;
            uniform vec2 iResolution;         
          #define TAU 6.28318530718
          #define MAX_ITER 5
          
          void main() 
          {
              float time = iGlobalTime * .5+23.0;
              // uv should be the 0-1 uv of texture...
              vec2 uv = gl_FragCoord.xy / iResolution.xy;
              
          
              vec2 p = mod(uv*TAU, TAU)-250.0;
          
              vec2 i = vec2(p);
              float c = 1.0;
              float inten = .005;
          
              for (int n = 0; n < MAX_ITER; n++) 
              {
                  float t = time * (1.0 - (3.5 / float(n+1)));
                  i = p + vec2(cos(t - i.x) + sin(t + i.y), sin(t - i.y) + cos(t + i.x));
                  c += 1.0/length(vec2(p.x / (sin(i.x+t)/inten),p.y / (cos(i.y+t)/inten)));
              }
              c /= float(MAX_ITER);
              c = 1.17-pow(c, 1.4);
              vec3 colour = vec3(pow(abs(c), 8.0));
              colour = clamp(colour + vec3(0.0, 0.35, 0.5), 0.0, 1.0);
              
          
                 gl_FragColor  = vec4(colour, 1.0);
          }
          
          
          </script>

<?php
get_footer(); 
?>