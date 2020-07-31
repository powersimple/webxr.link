function setProject(post_id){
    
    if(state.object_id != post_id){
        var slug = posts[post_id].slug
        var slide = menus['projects'].slug_nav[slug]
    //  console.log("set project",post_id,posts[post_id].slug,posts[post_id],"slugnum="+menus['projects'].slug_nav[slug])
        
        jQuery('#wheel-menu-content').fadeOut();
        jQuery('#projects-content').fadeIn();
        setSlideContent(slide,post_id)
        setImage(post_id, //post id (ideally)
            "featured", // @string destination = id of empty tag and template waiting for its goodness
            'featured_media', //@string the attr of the objectg that we're passing, in this case, this is featured media
            "flip" // @string the type of effect that awaits
        );
        var video_path = uploads_path + "" + posts[post_id].featured_video.video_path;

        
        setVideo(posts[post_id].featured_video.video_id,"#bg-video")
        projectInfo(post_id)
        state.object_id = post_id
    }
}
function projectInfo(post_id){
    var template = jQuery('#project-info-template').html()
    var project_info = posts[post_id].project_info
    var loc = '#project-info'
    jQuery(loc).html(template)
   // console.log(posts[post_id].project_info,template)
    var link = '<a href="'+project_info.url+'" target="_blank">Go to </a>'
    jQuery(loc + " .client").html(project_info.client)
    jQuery(loc + " .agency").html(project_info.agency)
    jQuery(loc + " .project-url").html(link)
    jQuery(loc + " .era").html(project_info.era)
    jQuery('project-info').html(template).fadeIn();
    var s = project_info.client;
    var client_wrap = []
    for (var i = 0; i < s.length; i++) {
        client_wrap.push(s[i]);
    }
    //console.log("client",client_wrap)
}