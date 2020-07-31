last_outer_notch = 0,
    last_inner_notch = 0
var menu_raphael = {}
var wheels = {}




function makeWheelNav(dest, data, _p) {
    setWheelNavParams()
    _p = wheel_nav_params

    if (dest == "outer-nav") {
        child_dest = "inner-nav"
            //console.log("makeWheelNav", dest, data, _p);
        child_params = wheel_nav_params;
    } else if (dest == "inner-nav") {
        child_dest = 'inner-subnav'
        child_params = wheel_nav_params;
    }

    //console.log("makeWheelNav", dest, data, _p);


    var titles = [];
    var ids = []
    wheels[dest] = new wheelnav(dest);
    //console.log(dest,data,_p);
    wheels[dest].spreaderEnable = false;
    //    WebSlice.titleRotateAngle -45;
    wheels[dest].cssMode = true;
    wheels[dest].navAngle = 270;
    wheels[dest].selectedNavItem = 2;
    wheels[dest].selectedNavItemIndex = null;
    wheels[dest].maxPercent = _p.maxPercent;
    // wheels[dest].clickModeRotate = false;
    //  wheels[dest].slicePathFunction = slicePath().CogSlice;
    //wheels[dest].slicePathCustom = slicePath().CogSliceCustomization();
    wheels[dest].slicePathFunction = slicePath().DonutSlice;
    wheels[dest].slicePathCustom = slicePath().PieSliceCustomization();
    wheels[dest].slicePathCustom.minRadiusPercent = _p.min;
    wheels[dest].slicePathCustom.maxRadiusPercent = _p.max;
    wheels[dest].sliceSelectedPathCustom = slicePath().PieSliceCustomization();
    //    wheels[dest].sliceSelectedPathCustom = slicePath().CogSliceCustomization();

    wheels[dest].sliceSelectedPathCustom.minRadiusPercent = _p.sel_min;
    wheels[dest].sliceSelectedPathCustom.maxRadiusPercent = _p.sel_max;

    wheels[dest].titleSelectedAttr = {};
    for (i = 0; i < data.length; i++) {
        //console.log(data[i]);
        titles.push(data[i].title);
        ids.push(data[i].id)
    }
    wheels[dest].initWheel(titles) // init before creating wheel so we can define the items.


    var rotation = 90; //first item is is the default rotation
    var degrees = (360 / wheels[dest].navItemCount); //divide circle by number of items
    var tilt = rotation // default the tilt of text to the rotation
    for (i = 0; i < wheels[dest].navItemCount; i++) { // loop through items
        // console.log("tilt"+i,titles[i],tilt);


        wheels[dest].navItems[i].titleRotateAngle = tilt; // set tilt
        tilt = degrees + (rotation - degrees) // rotate angle is additive using this formula


    }

    if (dest == 'outer-nav') {
        //console.log("inner child", data[0].children)
        if (data[0].children.length > 0) {
            //   console.log("inner child", data[0].children)
            makeWheelNav("inner-nav", data[0].children, wheel_nav_params)
        }
    }

    // console.log("wheel"+dest,wheels[dest])

    wheels[dest].createWheel();

    counter = 0;
    //console.log("NAV ITEMS",data);
    for (var i = 0; i < wheels[dest].navItemCount; i++) {


        // console.log("local-data",i,data[i]);
        /*
        type = data[i].type // set the type for the log
        if(type == "category"){
            data[i].object = "category"
    
            data[i].object_id = data[i].id  
        }
        */
        wheels[dest].navItems[i].data = data[i];



        wheels[dest].navItems[i].navigateFunction = function() { // Click event for wheel - JSHint doesn't like it when you set events in a loop, but whaddyagonnado? Fuhgetaboudit, the browser doesn't seem to care. and you can't click on the wheel without this.

            console.log()
            jQuery("#slider").slider("option", "value", this.data.notch) //positions the slider handle
            setSliderNotch(menus['wheel-menu'].slug_nav[this.data.slug]) // triggers the notch

        }

    }
    menu_raphael[dest] = wheels[dest].raphael // raphael makes it all happen

    reposition_screen()

    // console.log(dest,menu_raphael[dest]);
}

function triggerWheelNav(notch) {
    var data_nav = menus['wheel-menu'].data_nav
    var this_notch = data_nav[notch]
    var this_dest = this_notch.dest;

    //console.log("trigger wheel, notch:", this_notch, " | dest:", this_dest, "last outer notch:"+ last_outer_notch);






    if (this_dest == 'outer-nav') {
        if (wheels["inner-nav"] != undefined) {
            wheels[this_dest].navigateWheel(this_notch.slice)

        }
        popAWheelie("inner-nav")
        if (this_notch.children.length > 0) {

            makeWheelNav("inner-nav", this_notch.children, wheel_nav_params)
        }





        last_outer_notch = notch;

    } else if (this_dest == 'inner-nav') {


        // console.log(last_outer_notch, last_inner_notch,notch,this_notch)
        if (last_outer_notch != this_notch.parent) { //if we go backwards we need to change the parent.
            wheels["outer-nav"].navigateWheel(data_nav[this_notch.parent].slice) //dialback the outer ring to its slice
            makeWheelNav("inner-nav", data_nav[this_notch.parent].children, wheel_nav_params) //receate the inner ring for the parent
            wheels[this_dest].navigateWheel(this_notch.slice) //now we can dial the inner ring where it belongs
            last_outer_notch = this_notch.parent //who's your daddy?

        } else {

            wheels["outer-nav"].navigateWheel(data_nav[this_notch.parent].slice)
            if (wheels["inner-nav"] != undefined) { //if the inner nav exists

                // console.log(' != undefined')
                wheels[this_dest].navigateWheel(this_notch.slice)
                if (wheels["inner-subnav"] != undefined) { //and there's an inner subnav
                    wheels["inner-subnav"].raphael.remove() //destroy it

                }

            } else {

                // console.log('  undefined')
                makeWheelNav("inner-nav", data_nav[this_notch.parent].children, wheel_nav_params)
                wheels[this_dest].navigateWheel(this_notch.slice)
            }


            if (this_notch.children.length > 0) { //if there are children 
                makeWheelNav("inner-subnav", this_notch.children, wheel_nav_params) //make a ring for them
            } else {
                popAWheelie("inner-subnav") //blow up the ring that that's there.
            }
        }
        last_inner_notch = notch


    } else if (this_dest == 'inner-subnav') { // onto the third inner ring
        //congratulations outer-ring you're a grandparent.
        console.log(' innersubnav')



        if (last_outer_notch != this_notch.grandparent) { //if we go backwards we need to change the parent.
            wheels["outer-nav"].navigateWheel(data_nav[this_notch.grandparent].slice) //dialback the outer ring to its slice
            console.log("naviate outer", this_notch, "grand:", data_nav[this_notch.grandparent], "parent", data_nav[this_notch.parent]);
            last_outer_notch = this_notch.grandparent // set the outer notch back so we can go forward again.
            popAWheelie("inner-nav")

            makeWheelNav("inner-nav", data_nav[this_notch.grandparent].children, wheel_nav_params) //receate the inner ring for the parent
            wheels["inner-nav"].navigateWheel(data_nav[this_notch.parent].slice)
            if (data_nav[this_notch.parent].children.length > 0) {
                makeWheelNav("inner-subnav", data_nav[this_notch.parent].children, wheel_nav_params) //receate the inner ring for the parent
                wheels["inner-nav"].navigateWheel(data_nav[this_notch.parent].slice)
            }



        }

        if (last_inner_notch != this_notch.parent) { //who's your daddy?
            console.log("where have I gone wrong?", this_notch, data_nav[this_notch.parent]);
            //receate the inner ring for the parent
            wheels["inner-nav"].navigateWheel(data_nav[this_notch.parent].slice)
                //now we can dial the inner ring where it belongs
            makeWheelNav("inner-subnav", data_nav[this_notch.parent].children, wheel_nav_params) //receate the inner ring for the parent
            wheels["inner-subnav"].navigateWheel(this_notch.slice) //steer to right slice

            last_inner_notch = this_notch.parent //I am your father
        } else {
            console.log(wheels["inner-subnav"])

            if (wheels["inner-subnav"].raphael == undefined) {
                console.log("make innersubnav", this_notch, last_inner_notch, data_nav[this_notch.parent]);
                makeWheelNav("inner-subnav", data_nav[this_notch.parent].children, wheel_nav_params) //birth of the inner ring

            } else {
                console.log("navigate innersubnav", this_notch, last_inner_notch, data_nav[this_notch.parent]);
                wheels[this_dest].navigateWheel(this_notch.slice) //steer inner ring
            }
        }

    }





    last_dest = this_dest;

    //console.log("trigger_wheelNav",this_notch);

}

function popAWheelie(dest) { // this removes the inner rings when you click on navigation and reloads them as necessary
    if (dest == "outer-nav") { // if outer ring
        if (wheels["inner-nav"] != undefined) { //and inner ring exists
            wheels["inner-nav"].raphael.remove(); // destroy it

            if (wheels["inner-subnav"] != undefined) { //if  inner subnav
                wheels["inner-subnav"].raphael.remove() //destoy that too.
            }
        }

    } else if (dest == "inner-nav") { // if you select from the inner nave
        if (wheels["inner-subnav"] != undefined) { //and there's an inner subnav
            wheels["inner-subnav"].raphael.remove() //destroy it
        }
    }



}