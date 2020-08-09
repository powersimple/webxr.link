<!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js no-svg">
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<link rel="profile" href="https://gmpg.org/xfn/11">
    <link rel="shortcut icon" href="<?php echo get_stylesheet_directory_uri();?>/images/icons/favicon.ico" />
<?php wp_head(); 
    $url = wp_upload_dir();
?>
    <link href="<?php echo get_stylesheet_directory_uri();?>/assets/lib/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">

   
   
    <link href="<?php echo get_stylesheet_directory_uri();?>/assets/lib/animate.css/animate.css" rel="stylesheet">
    <link href="<?php echo get_stylesheet_directory_uri();?>/assets/lib/components-font-awesome/css/font-awesome.min.css" rel="stylesheet">
    <link href="<?php echo get_stylesheet_directory_uri();?>/assets/lib/flexslider/flexslider.css" rel="stylesheet">

    <!-- Main stylesheet and color file-->
    <link href="<?php echo get_stylesheet_directory_uri();?>/style.css" rel="stylesheet">
<?php if(is_front_page()){
  $page_title= '';
} else {
  $page_title = $post->post_title . " | ";
}

  if(strpos($_SERVER['HTTP_HOST'],'192.168')){
    $page_title = '🅳🅴🆅 '.$page_title;
  } else if (strpos($_SERVER['HTTP_HOST'],'staging')){
    $page_title = '🆂🆃🅰🅶🅸🅽🅶 '.$page_title;// doesn't work
  }

?>




    <title><?=$page_title?><?=get_bloginfo('name')?> - <?=bloginfo("description");?></title>
 <script>
      // Wordpress PHP variables to render into JS at outset.
      var active_id = <?=$post->ID?>,
      active_object = "<?=$post->post_type?>",
      home_page = <?=get_option( 'page_on_front' )?>,
      site_title = "<?=get_bloginfo('name')?>",
      xr_path = "<?=get_stylesheet_directory_uri()?>/xr/",
      data_path = "<?=get_stylesheet_directory_uri()?>/data/",
      useWheelNav = false,
      uploads_path =  "<?=$url['baseurl']?>/",
      slug = "<?=$post->post_name;?>",
      profile_template = ''//hack
      
      var hero_slides = [
          <?php 
          /*
          $slides = get_slides($post->ID);
          $slide_version_list = array();
        foreach ($slides as $key => $media_id) {
          $src= wp_get_attachment_image_src( $media_id,"Full");
          //var_dump($src);//var_dump(get_media_data($media_id));
          $media_data = get_media_data($media_id);
        //  var_dump($media_data);
          $versions = getThumbnailVersions($media_id);
          $version_list = array();
          foreach($versions as $v => $version){
              array_push($version_list,"'".$v."'".": '".$version."'");

          }
          array_push($slide_version_list,"{".implode(",",$version_list)."}
          ");
          
        
        // print "<BR>";
          // var_dump($versions);
            extract((array) get_media_data($media_id));
        }
        print implode(",",$slide_version_list);
      */
        ?>
         ]
      <?php
          if(function_exists('icl_object_id')){
              global $sitepress;

              print "var languages = ".json_encode(getLanguageList());
            

          }
      ?>
     
  </script>
  <link rel="stylesheet" type="text/css" media="print" href="<?=get_stylesheet_directory_uri()?>/print.css">
</head>



  <body data-spy="scroll" data-target=".onpage-navigation" data-offset="60" class="<?php echo @$class_bg;?>">


        <div class="page-loader">
        <div class="loader">Loading...</div>
      </div>
<header id="header" class="navbar navbar-custom navbar-fixed-top navbar-transparent" role="navigation">
        <div class="container">
         
          <div class="navbar-header">
           <div  id="logo" class="onpage-navigation"><a class="navbar-brand" href="/"><img src="<?=get_stylesheet_directory_uri()?>/images/logo/logo.svg"></a></div>
          </div>
          <div class="collapse navbar-collapse" id="custom-collapse">
         

                    <div id="site-title" class="onpage-navigation"><?=bloginfo("description");?></div>
                  
                  
            </div>
            <div id="main-menu"></div>
      </div>  
</header>
      
      
<?php

//$hero = getHero(@$post->ID);
if(@$hero == ''){
  //$hero = '/images/photos/GA-view.jpg';
}
 
?>
