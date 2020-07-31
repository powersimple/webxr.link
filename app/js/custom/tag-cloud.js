function tagCloud() {


    var tag_cloud = menus['tag-cloud'].menu_array
        //console.log(tag_cloud)
        //console.log(tag_cloud.length)
    var entries = []
    for (var i = 0; i < tag_cloud.length; i++) {

        entries.push({
            label: tag_cloud[i].title,
            url: '/#' + tag_cloud[i].slug + '/',
            target: '_top'
        })

    }
    var tag_cloud_w = _w * .5
        //console.log("tag cloud",entries)
    var settings = {
        entries: entries,
        width: tag_cloud_w,
        height: tag_cloud_w,
        radius: '65%',
        radiusMin: 75,
        bgDraw: true,
        bgColor: '#111',
        opacityOver: 1.00,
        opacityOut: 0.05,
        opacitySpeed: 6,
        fov: 800,
        speed: 2,
        bgColor: 'transparent',
        fontFamily: 'Krona One, Arial, sans-serif',
        fontSize: '1em',
        fontWeight: 'normal', //bold
        fontStyle: 'normal', //italic 
        fontStretch: 'normal', //wider, narrower, ultra-condensed, extra-condensed, condensed, semi-condensed, semi-expanded, expanded, extra-expanded, ultra-expanded
        fontToUpperCase: false
    };
    //var svg3DTagCloud = new SVG3DTagCloud( document.getElementById( 'holder'  ), settings );
    jQuery('#tag-cloud').svg3DTagCloud(settings);

}
jQuery("#tag-cloud-button").on("click", function() {
    jQuery('#tag-cloud').fadeToggle("slow", "linear");
})