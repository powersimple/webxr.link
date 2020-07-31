function setSocial() {

    var social_menu = menus['social-links'].items
    var menu_items = ''
    for (s in social_menu) {
        var item = posts[social_menu[s].object_id]
        var src = getImageSRC(item.featured_media)

        menu_items += '<li><a href="' + item.social_url + '" target="_blank"><img src="' + src + '" alt="' + item.title + '"></a></li>'
    }
    // console.log("s",menu_items)
    jQuery('#social-links ul').html(menu_items)
}