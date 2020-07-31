function setRelated(post) {

  /*
  
      This is fun! 
      This sets the related variable as an object of taxonomies, 
      containing an array of related post ids
  
    */

  var this_post = null,
    this_cat = null //defaults

  related = {} // create empty object
  related.cats = {} //vessel for related categories
  related.tags = {} //vessel for related tags 
  //if you put in another taxonomy, add it to the loop above.

  var local_data = {
    'cats': categories,
    'tags': tags
  } //put taxonomies into object using alias in post


  /*
    ready for a ridiculous triple summersault? Let's do this!
    You see, the nested loop for related content will work the same for categories and tags, so why not put an outer loop of the local data to loop through them, so if this function changes, it does so once. 
  */
  for (var r in related) { //loop through related taxonomy aliases to get name dynamically
    // r is the taxonomy alias =>string

    for (var t = 0; t < post[r].length; t++) { // loop through array of taxonomies of the post object that got passed in.
      //t is the array key of the taxonomy =>int
      // console.log(r,posts[r])
      for (var p = 0; p < local_data[r][post[r][t]].posts.length; p++) {
        //p is the post_id of the related post from the taxonomy
        this_post = local_data[r][post[r][t]].posts[p] // id of post in question
        if (post.id != this_post) { // exclude self
          if (posts[this_post] != undefined) { //proceed if post exists
            var type = posts[this_post].type // set the post type locally
            if (related[r][type] == undefined) { // if this related post type doesn't have an object yet
              related[r][type] = [] //then create an array to stuff the posts ids in 

            }
            related[r][type].push(this_post); // by using an object by id prevents duplicates, the post id can be used


          }

        }
      }
    }
  }

  delete local_data // no reason keeping the aliased taxonomies in memory

  displayRelated()


  //console.log("related",related)

}

function displayRelated() {
  jQuery("#related").html('');
  rel_list = ''
  var aspect = getAspect(jQuery("#related ul li").width(), jQuery("#related ul li").height())


  for (var tax in related) { // loop through Taxonomies
    rel_list += '<ul class="' + tax + '">' //

    for (var type in related[tax]) {
      for (var p = 0; p < related[tax][type].length; p++) {
        post_id = related[tax][type][p] // post_id of related content
        var bg_image = ''; // default empty
        var src = '' // default empty
        var media_id = getMediaID(post_id, 'featured_media') // returns media id or zero if media object is undefined
       // console.log(media_id)
        if (media_id > 0) {
            src = getImageSRC(media_id,'#related ul li','thumbnail')
        }
        // console.log("set related","src="+src,post_id,media_id);
        if (src != '') {

          bg_image = ' style="background-image:url(' + src + ')"'
        }
        rel_list += '<li ' + bg_image + ' class="ui-widget ' + type + '" data-rel="' + post_id + '">'
        // console.log("related post",post_id)
        rel_list += post_id
        rel_list += '</li>'

      }
    }
    rel_list += '</ul>'
  }
  jQuery("#related").html(rel_list);

}



function tipHoverContent(id) {
  //console.log("hover tip",id)
  var tipContent = '';
  if (posts[id].type == 'project') {
    tipContent += '<span class="hover-title">' + posts[id].project_info.client + '</span>'
    if (posts[id].project_info.agency != '') {
      tipContent += '<span class="hover-sub">' + posts[id].project_info.agency + '</span>'
    }
  }
  return tipContent
}

function selectRelatedPost(post_id) {

  if (posts[post_id].type == 'project') {
    setProject(post_id)
    // setSliderNotch(1)//Projects hardset to notch one.
    // setContent(1, post_id, posts[post_id].type)

  }






}


(function ($) {




  $(document).tooltip({
    items: "[data-rel]", // tootip for related data
    //  tooltipClass:'rel-tip',
    content: function () {
      var post_id = $(this).data('rel');
      var tip = ''
      var bg_image = ''; // default empty
      var src = '' // default empty
      var media_id = getMediaID(post_id, 'featured_media') // returns media id or zero if media object is undefined

      if (media_id != 0) {
        src = getImageSRC(media_id, '.rel-tooltip', 'thumbnail');
      }
     // console.log("set related", src, post_id, media_id);
      if (src != '') {

        bg_image = ' style="background-image:url(' + src + ')"'
      }
      $(this).on("click", function (e) {
        e.preventDefault();
        selectRelatedPost(post_id);

      }).on("mouseover", function (e) {
        console.log("related1" + post_id, "mouseover");
        e.preventDefault();
        console.log("related" + post_id, "mouseover");
      }).on("mouseout", function (e) {
        e.preventDefault();
        //    console.log("related"+post_id,"mouseoout");
      }).on("mousedown", function (e) {
        e.preventDefault();
        //    console.log("related"+post_id,"mousedown");
      }).on("mouseup", function (e) {
        e.preventDefault();
        //    console.log("related"+post_id,"mouseup");
      });

      tip += '<div class="rel-tooltip"' + bg_image + '>'

      //tip += tipHoverContent(id)

      tip += '</div>'
      console.log(tip)
      //return tip
    }
  });
})(jQuery);