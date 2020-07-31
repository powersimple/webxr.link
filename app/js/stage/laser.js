jQuery(document).ready(function () {

    var canvas = jQuery("#laser")[0];
  //  console.log(canvas)
    var wCanvas = jQuery(window).width(),
        hCanvas = jQuery(window).height();
    init();

    function init() {
        var ctx = canvas.getContext("2d");
        resize(canvas, wCanvas, hCanvas);

        var lasers = [];

        var t = 30;
        var mx = Math.PI * 2 / t;
        for (var d = 0; d < t; d++) {
            lasers.push(new Laser(wCanvas / 2, hCanvas / 2, 1, 100, mx * d, 360 * t * (1 / (d + 1))));
        }

        var time = 0;
        setInterval(function () {
            time += Math.PI / 180;
            ctx.globalCompositeOperation = 'destination-out';
            ctx.fillStyle = 'rgba(0, 0, 0, .3)';
            ctx.fillRect(0, 0, wCanvas, hCanvas);
            ctx.globalCompositeOperation = 'lighter';

            for (var l = 0; l < lasers.length; l++) {
                var laser = lasers[l];

                var xLaser = laser.CordXLaser,
                    yLaser = laser.CordYLaser,
                    wLaser = laser.WidthLaser,
                    hLaser = laser.HeightLaser,
                    cLaser = laser.ColorLaser,
                    rLaser = laser.RotationLaser;

                /// Draw Laser
                ctx.beginPath();
                ctx.arc(xLaser, yLaser, 5, 0, 2 * Math.PI);
                ctx.fillStyle = "hsla(" + cLaser + ", 50%, 10%,1) ";
                ctx.fill();
                // Num of sticks

                for (var t = 0; t < 10; t++) {
                    // (1 / Math.cos(t)) * (1 / (1 + t))
                    var rotate = rLaser * (1 / Math.cos(t * (Math.PI * 2 + 1))) / (t + 1);

                    ctx.beginPath();
                    ctx.moveTo(xLaser, yLaser);
                    ctx.lineTo(xLaser + Math.cos(rotate) * hLaser, yLaser + Math.sin(rotate) * hLaser, wLaser, hLaser);
                    ctx.closePath();
                    ctx.strokeStyle = "hsla(" + cLaser + ", 50%, 10%,1) ";
                    ctx.stroke();
                    xLaser += Math.cos(rotate) * hLaser;
                    yLaser += Math.sin(rotate) * hLaser;
                }


                laser.Update();
            }

        }, 100 / 6);

    }

    jQuery(window).resize(function () {
        var win = jQuery(window);
        resize(canvas, win.width(), win.height());
    });

    function resize(e, w, h) {
        wCanvas = e.width = w;
        hCanvas = e.height = h;
    }

    function Laser(cordX, cordY, width, height, rotation, color) {
        this.CordXLaser = cordX;
        this.CordYLaser = cordY;
        this.SetCords = function (x, y) {
            this.CordXMirror = x;
            this.CordYMirror = y;
        };

        this.WidthLaser = width;
        this.HeightLaser = height;
        this.SetSizes = function (w, h) {
            this.WidthMirror = w;
            this.HeightMirror = h;
        };

        this.LifeLaser = 0;
        this.RotationLaser = rotation;
        this.SetRotation = function (r) {
            this.RotationLaser = r;
        };

        this.ColorLaser = color;
        this.SetColor = function (c) {
            this.ColorLaser = c;
        };

        this.Update = function () {
            this.LifeLaser++;

            var vel = 2;
            this.RotationLaser += Math.PI / 180 * vel;
            this.ColorLaser++;
        };
    }

    /*function Mirror(cordX, cordY, width, height, rotation)
    {
      this.CordXMirror	 = cordX;
      this.CordYMirror	 = cordY;
      this.SetCords(x, y)
      {
      	this.CordXMirror = x;
      	this.CordYMirror = y;
      };
      
      this.WidthMirror	 = width;
      this.HeightMirror   = height;
      this.SetSizes = function(w, h)
      { 
        this.WidthMirror = w;
        this.HeightMirror = h;
      };
      
      this.RotationMirror = rotation;
      this.SetRotation = function(r)
      { this.RotationMirror = r; };
      
      
      this.Update = function()
      {
        
      };
    }*/

});