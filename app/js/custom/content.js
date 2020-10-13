function setSlideContent(slide, id,object) {
  console.log("setSlideContents", slide, id, object)
   
      
        
        
     //   console.log("title="+title_length,"content"+content_length)

      
    if (object == 'category'){
      console.log("cat", slide, id, object)
        if (categories[id] != undefined) {
          
          console.log("category", slide, id, object, categories[id])
          jQuery("#slide-" + object + "-" + id + " h2").html(categories[id].name)
          jQuery("#slide-" + object + "-" + id + " section div.content").html(categories[id].description)
      
        }
      } else {
        if (posts[id] != undefined) {
          console.log("post", id, posts[id])
          var title_length = posts[id].title.length,
            content_length = posts[id].content.length
          current_slide_id = '#slide-' + object + "-" + id
          current_slide_title = posts[id].title
          current_slide_content = posts[id].content
         

          jQuery("#slide-" + object + "-" + id + " h2").html(current_slide_title)
          jQuery("#slide-" + object + "-" + id + " section div.content").html(current_slide_content)
          if(posts[id].featured_media != 0){
            
              curent_slide_image = media_assets[posts[id].featured_media].full_path
            if (curent_slide_image != ''){
              jQuery('#screen-image-container').html('<img src="' + curent_slide_image+'">')

            }


          }




        }
      }
 
 
 
      $carousel.slick('slickGoTo', slide);
    
  }
  
  
  
  
  
  function setText(){
    if (typeof languages !== 'undefined') { // wpml present
  
      if(state.language == languages.default){//use defaults
        page_title = posts[state.post_id].title + " | " + site_title;
      } else { // get data. 
  
        page_title = retreiveML('posts',"title",state.post_id,state.language)
        //console.log("new page title " + page_title)
  
      }
  
    } else { // wpml not present, use default
      
  
      page_title = posts[state.post_id].title + " | " + site_title;
      
    }
    //set variables
    document.title = page_title;
  }
  
  
  
  
  function setContent(dest, object_id, object) {
    state.slide = posts_nav[object_id]
    state.object = posts_nav[object]

    state.object_id = posts_nav[object_id]
   

    jQuery('#projects-content').fadeOut();
    jQuery('#project-info').fadeOut();
  
    jQuery('#wheel-menu-content').fadeIn();
    
    //console.log("setContent",dest,object_id,object,posts[object_id])
    if (posts[object_id] != undefined) {
      //console.log("selected post", posts[object_id])
      state.post_id = object_id;
      setText();
      
  
      setImage(object_id, //post id (ideally)
        "featured", //destination = id of empty tag and template waiting for its goodness
        'featured_media', //the attr of the objectg that we're passing, in this case, this is featured media
        "flip" // the type of effect that awaits
      );
      var video_path = null;
      if(posts[object_id].featured_video != undefined){
      var video_path = uploads_path + "" + posts[object_id].featured_video.video_path;
    
      
      setVideo(posts[object_id].featured_video.video_id,"#bg-video")
      }
      setRelated(posts[object_id])
      if (posts[object_id].screen_images.length >0){
        
        setScreenImages(posts[object_id].screen_images,"#screen-image","circleViewer");//array of images, destination, imagedisplaycallback
      } else {
        jQuery('#screen-image-container').html('')
      }
  //   console.log("tags", posts[object_id].tags)
  
    }
  
    setSlideContent(dest, object_id, object)
  
    /*
          for category wheels
          if(cat_children.length>0){
            for(c=0;c<cat_children.length;c++){
              
              data.push({
                    id : categories[cat_children[c]].id,
                    title : categories[cat_children[c]].name,
                    type: "category",
                    children: categories[cat_children[c]].children
                }
              )
              
            }
            
  
            makeWheelNav(dest, data, inner_subnav_params)
            //
  
          
  
        } else {
          
        }*/
  
  }