var layerSource;

function initWebGLProgram() {
    layerSource = document.getElementById("webgl-canvas");

    console.log("webgl")
        // Compile shaders...
        // Load textures...
        // Create geometry...
        // Save attributes and uniform locations

}

function getVR() {
    if (navigator.getVRDisplays) {

        navigator.getVRDisplays().then(function(displays) {

            if (displays.length > 0) {
                // We reuse this every frame to avoid generating garbage
                frameData = new VRFrameData();

                vrDisplay = displays[0];

                // We must adjust the canvas (our VRLayer source) to match the VRDisplay
                var leftEye = vrDisplay.getEyeParameters("left");
                var rightEye = vrDisplay.getEyeParameters("right");

                // update canvas width and height based on the eye parameters.
                // For simplicity we will render each eye at the same resolution
                layerSource.width = Math.max(leftEye.renderWidth, rightEye.renderWidth) * 2;
                layerSource.height = Math.max(leftEye.renderHeight, rightEye.renderHeight);

                // Code for showing an 'Enter VR' button should go here

            }

            // There are no VR displays connected.
        }).catch(function(err) {
            // VR Displays are not accessible in this context.
            // Perhaps you are in an iframe without the allowvr attribute specified.
        });
        return true;

    } else {
        console.log("no-web vr");
        // WebVR is not supported in this browser.
        return false;
    }
}