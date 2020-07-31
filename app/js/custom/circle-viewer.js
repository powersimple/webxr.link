
    var photoCount = 0;
    var pieceCount = 0;
    var onPhoto = 0;
    var pieceCompleteCount = 0;
 //this is the interval that needs to be stoped.

    var transitions = ['center', 'random']
    var transitionType = 1;
    
    var viewerDest = null
    //console.log("circleviwer loaded")
    function circleViewer(dest) {
        
        photoCount = state.screen_images.length
        pieceCount = state.screen_images.length
        //console.log("CIRCLE VIEWER PRELOAD", dest, state.screen_images, pieceCount)
        
        viewerDest = dest
        for (var i = 0; i < state.screen_images.length; i++) {

            jQuery('#preload').append('<img src="' + state.screen_images[i].src + '">')
        };
        jQuery(window).load(function(){
           

        })
        loadCircleViewer(dest);
    }

    function loadCircleViewer(dest, screen_images) {
        jQuery(dest+'-container').html('');
        for (var i = 0; i < state.screen_images.length; i++) {
            var newWidth = (((100 - (100 / pieceCount) * i)) / 100) * 100; //((pieceWidth - ((pieceWidth / pieceCount) * i)) / pieceWidth) * 100;
            var newBackgroundSize = 100 + (100 - newWidth) / newWidth * 100; //100 + (100 - newWidth);
            var newTop = ((100 / pieceCount) * i) / 2;

            jQuery(dest+'-container').append('<div class="section" id="piece' + i + '" style="top: ' + newTop + '%; left: ' + newTop + '%; width: ' + newWidth + '%; height: ' + newWidth + '%; background-size:' + newBackgroundSize + '%; background-image: url(' + state.screen_images[i].src + ')"></div>')
        };
        //console.log("IMAGES", dest, state.screen_images)
        nextSlide();
    }

    function nextSlide() {
        // console.log("onphonto", onPhoto)
        clearInterval(state.circle_delay);
        pieceCompleteCount = 0;
        ++onPhoto;
        if (onPhoto >= photoCount) {
            onPhoto = 0;
        }
        
    //console.log("next", state.screen_images)
        for (var i = 0; i < state.screen_images.length; i++) {
           // console.log("nextloop ", "i=" + i, state.screen_images[i])
            var spinDelay = 0;
            var spin = 360;
            var piece = jQuery('#piece' + i);
            var image = state.screen_images[onPhoto]
            switch (transitions[transitionType]) {
                case 'random':
                    spinDelay = Math.random() / 2;
                    spin = Math.random() * 360;
                    break;
                case 'center':
                    spinDelay = (pieceCount - i) / 10;
                    spin = 181;
                    break;
            }

            TweenMax.to(piece, 1, {
                delay: spinDelay,
                directionalRotation: spin + '_long',
                onComplete: completeRotation,
                onCompleteParams: [piece,image],
                ease: Power4.easeIn
            })
        }
    }

    function completeRotation(piece,image) {
        //console.log("piece", piece, image.src)
        piece.css('background-image', 'url('+image.src+')');
        TweenMax.to(piece, 2, {
            directionalRotation: '0_short',
            onComplete: finishPieceanimation,
            ease: Elastic.easeOut
        })
    }

    function finishPieceanimation() {
        ++pieceCompleteCount;
        if (pieceCompleteCount == pieceCount) {
            state.circle_delay = setInterval(nextSlide, 5000);
        }
    }
