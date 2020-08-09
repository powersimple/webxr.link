/*
 js-mindmap

 Copyright (c) 2008/09/10 Kenneth Kufluk http://kenneth.kufluk.com/

 MIT (X11) license

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.

*/

/*
  Things to do:
    - remove Lines - NO - they seem harmless enough!
    - add better "make active" methods
    - remove the "root node" concept.  Tie nodes to elements better, so we can check if a parent element is root

    - allow progressive exploration
      - allow easy supplying of an ajax param for loading new kids and a loader anim
    - allow easy exploration of a ul or ol to find nodes
    - limit to an area
    - allow more content (div instead of an a)
    - test multiple canvases
    - Hidden children should not be bounded
    - Layout children in circles
    - Add/Edit nodes
    - Resize event
    - incorporate widths into the forces, so left boundaries push on right boundaries


  Make demos:
    - amazon explore
    - directgov explore
    - thesaurus
    - themes

*/
var initMindMap = false;

(function(jQuery) {
  'use strict';
var mindmap_width = jQuery('#mindmap').width(),
mindmap_height = jQuery('#mindmap').height(),
mindmap_position = jQuery('#mindmap').position()
//console.log("position",position)

  var TIMEOUT = 4, // movement timeout in seconds
    CENTRE_FORCE = 3, // strength of attraction to the centre by the active node
    Node,
    Line;

  // Define all Node related functions.
  Node = function(obj, name, parent, opts) {
    this.obj = obj;
    this.options = obj.options;

    this.name = name;
    this.href = opts.href;
    if (opts.url) {
      this.url = opts.url;
    }
    if (opts.color) {
      this.color = opts.color;
    }
    if (opts.size) {
      this.size = 'size' + opts.size;
    }
    if (opts.className) {
      this.className = opts.className;
    }
    if (opts.backgroundImage) {
      this.backgroundImage =  opts.backgroundImage;
    }
    // else { this.size = "100px"; }

    // create the element for display
    // this.el = jQuery('<a href="' + this.href + '" style="width: ' + this.size + '; height: ' + this.size + ';"><div><span>' + this.name + '</span></div></a>').addClass('node').addClass(this.color);
    var style = ''
    if(opts.backgroundImage != ''){
      style = 'style="background-image:url(' + opts.backgroundImage +')"'
    }
    this.el = jQuery(
      '<a href="' +
        this.href +
        '" '+style+'><div><span>' +
        this.name +
        '</span></div></a>'
    )
      .addClass('node')
//      .addClass('node')

      .addClass(this.color)
      .addClass(this.size);
    //  console.log(this.el)
    jQuery('#mindmap').prepend(this.el);

    if (!parent) {
      obj.activeNode = this;
      this.el.addClass('active root');
    } else {
      obj.lines[obj.lines.length] = new Line(obj, this, parent);
    }
    this.parent = parent;
    this.children = [];
    if (this.parent) {
      this.parent.children.push(this);
    }

    // animation handling
    this.moving = false;
    this.moveTimer = 0;
    this.obj.movementStopped = false;
    this.visible = true;
    this.x = 1;
    this.y = 1;
    this.dx = 0;
    this.dy = 0;
    this.hasPosition = false;

    this.content = []; // array of content elements to display onclick;

    this.el.css('position', 'absolute');

    var thisnode = this;

    this.el.draggable({
      drag: function() {
        obj.root.animateToStatic();
      },
    });

    this.el.click(function() {
      if (obj.activeNode) {
        obj.activeNode.el.removeClass('active');
        if (obj.activeNode.parent) {
          obj.activeNode.parent.el.removeClass('activeparent');
        }
      }
      if (typeof opts.onclick === 'function') {
        opts.onclick(thisnode);
      }
      obj.activeNode = thisnode;
      obj.activeNode.el.addClass('active');
      if (obj.activeNode.parent) {
        obj.activeNode.parent.el.addClass('activeparent');
      }
      obj.root.animateToStatic();
      return false;
    });
  };

  // ROOT NODE ONLY:  control animation loop
  Node.prototype.animateToStatic = function() {
    clearTimeout(this.moveTimer);
    // stop the movement after a certain time
    var thisnode = this;
    this.moveTimer = setTimeout(function() {
      //stop the movement
      thisnode.obj.movementStopped = true;
    }, TIMEOUT * 1000);

    if (this.moving) {
      return;
    }
    this.moving = true;
    this.obj.movementStopped = false;
    this.animateLoop();
  };

  // ROOT NODE ONLY:  animate all nodes (calls itself recursively)
  Node.prototype.animateLoop = function() {
    var i,
      len,
      mynode = this;
    this.obj.canvas.clear();
    for (i = 0, len = this.obj.lines.length; i < len; i++) {
      this.obj.lines[i].updatePosition();
    }
    if (this.findEquilibrium() || this.obj.movementStopped) {
      this.moving = false;
      return;
    }
    setTimeout(function() {
      mynode.animateLoop();
    }, 10);
  };

  // find the right position for this node
  Node.prototype.findEquilibrium = function() {
    var i,
      len,
      stable = true;
    stable = this.display() && stable;
    for (i = 0, len = this.children.length; i < len; i++) {
      stable = this.children[i].findEquilibrium() && stable;
    }
    return stable;
  };

  //Display this node, and its children
  Node.prototype.display = function(depth) {
    var parent = this,
      stepAngle,
      angle;

    depth = depth || 0;

    if (this.visible) {
      // if: I'm not active AND my parent's not active AND my children aren't active ...
      if (
        this.obj.activeNode !== this &&
        this.obj.activeNode !== this.parent &&
        this.obj.activeNode.parent !== this
      ) {
        // TODO hide me!
        this.el.hide();
        this.visible = false;
      }
    } else {
      if (
        this.obj.activeNode === this ||
        this.obj.activeNode === this.parent ||
        this.obj.activeNode.parent === this
      ) {
        this.el.show();
        this.visible = true;
      }
    }
    this.drawn = true;
    // am I positioned?  If not, position me.
    if (!this.hasPosition) {
      this.x = this.options.mapArea.x / 2;
      this.y = this.options.mapArea.y / 2;
      this.el.css({ left: this.x + 'px', top: this.y + 'px' });
      this.hasPosition = true;
    }
    // are my children positioned?  if not, lay out my children around me
    stepAngle = (Math.PI * 2) / this.children.length;
    jQuery.each(this.children, function(index) {
      if (!this.hasPosition) {
        if (!this.options.showProgressive || depth <= 1) {
          angle = index * stepAngle;
          this.x = 50 * Math.cos(angle) + parent.x;
          this.y = 50 * Math.sin(angle) + parent.y;
          this.hasPosition = true;
       //   console.log("position",mindmap_position,this.x, this.y)
          this.el.css({ left: this.x + 'px', top: this.y + 'px' });
        }
      }
    });
    // update my position
    return this.updatePosition();
  };

  // updatePosition returns a boolean stating whether it's been static
  Node.prototype.updatePosition = function() {
    var forces, showx, showy;
  //  console.log(forces,showx,showy)
    if (this.el.hasClass('ui-draggable-dragging')) {
      this.x = parseInt(this.el.css('left'), 10) + this.el.width() / 2;
      this.y = parseInt(this.el.css('top'), 10) + this.el.height() / 2;
      this.dx = 0;
      this.dy = 0;
      return false;
    }
    //apply accelerations
    forces = this.getForceVector();
    this.dx += forces.x * this.options.timeperiod;
    this.dy += forces.y * this.options.timeperiod;

    // damp the forces
    this.dx = this.dx * this.options.damping;
    this.dy = this.dy * this.options.damping;

    //ADD MINIMUM SPEEDS
    if (Math.abs(this.dx) < this.options.minSpeed) {
      this.dx = 0;
    }
    if (Math.abs(this.dy) < this.options.minSpeed) {
      this.dy = 0;
    }
    if (Math.abs(this.dx) + Math.abs(this.dy) === 0) {
      return true;
    }
    //apply velocity vector
    this.x += this.dx * this.options.timeperiod;
    this.y += this.dy * this.options.timeperiod;
    this.x = Math.min(this.options.mapArea.x, Math.max(1, this.x));
    this.y = Math.min(this.options.mapArea.y, Math.max(1, this.y));
    // display
    showx = this.x - this.el.width() / 2;
    showy = this.y - this.el.height() / 2 - 10;

    

    this.el.css({ left: showx + 'px', top: showy + 'px' });
    return false;
  };

  Node.prototype.getForceVector = function() {
    var i,
      x1,
      y1,
      xsign,
      dist,
      theta,
      f,
      xdist,
      rightdist,
      bottomdist,
      otherend,
      fx = 0,
      fy = 0,
      nodes = this.obj.nodes,
      lines = this.obj.lines;

    // Calculate the repulsive force from every other node
    for (i = 0; i < nodes.length; i++) {
      if (nodes[i] === this) {
        continue;
      }
      if (!nodes[i].visible) {
        continue;
      }
      // Repulsive force (coulomb's law)
      x1 = nodes[i].x - this.x;
      y1 = nodes[i].y - this.y;
      //adjust for variable node size
      //    var nodewidths = ((jQuery(nodes[i]).width() + this.el.width())/2);
      dist = Math.sqrt(x1 * x1 + y1 * y1);
      //      var myrepulse = this.options.repulse;
      //      if (this.parent==nodes[i]) myrepulse=myrepulse*10;  //parents stand further away
      if (Math.abs(dist) < 500) {
        if (x1 === 0) {
          theta = Math.PI / 2;
          xsign = 0;
        } else {
          theta = Math.atan(y1 / x1);
          xsign = x1 / Math.abs(x1);
        }
        // force is based on radial distance
        f = (this.options.repulse * 500) / (dist * dist);
        fx += -f * Math.cos(theta) * xsign;
        fy += -f * Math.sin(theta) * xsign;
      }
    }

    // add repulsive force of the "walls"
    //left wall
    xdist = this.x + this.el.width();
    f = (this.options.wallrepulse * 500) / (xdist * xdist);
    fx += Math.min(2, f);
    //right wall
    rightdist = this.options.mapArea.x - xdist;
    f = -(this.options.wallrepulse * 500) / (rightdist * rightdist);
    fx += Math.max(-2, f);
    //top wall
    f = (this.options.wallrepulse * 500) / (this.y * this.y);
    fy += Math.min(2, f);
    //bottom wall
    bottomdist = this.options.mapArea.y - this.y;
    f = -(this.options.wallrepulse * 500) / (bottomdist * bottomdist);
    fy += Math.max(-2, f);

    // for each line, of which I'm a part, add an attractive force.
    for (i = 0; i < lines.length; i++) {
      otherend = null;
      if (lines[i].start === this) {
        otherend = lines[i].end;
      } else if (lines[i].end === this) {
        otherend = lines[i].start;
      } else {
        continue;
      }
      // Ignore the pull of hidden nodes
      if (!otherend.visible) {
        continue;
      }
      // Attractive force (hooke's law)
      x1 = otherend.x - this.x;
      y1 = otherend.y - this.y;
      dist = Math.sqrt(x1 * x1 + y1 * y1);
      if (Math.abs(dist) > 0) {
        if (x1 === 0) {
          theta = Math.PI / 2;
          xsign = 0;
        } else {
          theta = Math.atan(y1 / x1);
          xsign = x1 / Math.abs(x1);
        }
        // force is based on radial distance
        f = (this.options.attract * dist) / 10000;
        fx += f * Math.cos(theta) * xsign;
        fy += f * Math.sin(theta) * xsign;
      }
    }

    // if I'm active, attract me to the centre of the area
    if (this.obj.activeNode === this) {
      // Attractive force (hooke's law)
      otherend = this.options.mapArea;
      x1 = otherend.x / 2 - this.options.centreOffset - this.x;
      y1 = otherend.y / 2 - this.y;
      dist = Math.sqrt(x1 * x1 + y1 * y1);
      if (Math.abs(dist) > 0) {
        if (x1 === 0) {
          theta = Math.PI / 2;
          xsign = 0;
        } else {
          xsign = x1 / Math.abs(x1);
          theta = Math.atan(y1 / x1);
        }
        // force is based on radial distance
        f = (0.1 * this.options.attract * dist * CENTRE_FORCE) / 1000;
        fx += f * Math.cos(theta) * xsign;
        fy += f * Math.sin(theta) * xsign;
      }
    }

    if (Math.abs(fx) > this.options.maxForce) {
      fx = this.options.maxForce * (fx / Math.abs(fx));
    }
    if (Math.abs(fy) > this.options.maxForce) {
      fy = this.options.maxForce * (fy / Math.abs(fy));
    }
   // console.log(fx,fy,mindmap_position.left,mindmap_position.top)
    return {
      x: fx,
      y: fy,
    };
  };

  Node.prototype.removeNode = function() {
    var i,
      oldnodes = this.obj.nodes,
      oldlines = this.obj.lines;

    for (i = 0; i < this.children.length; i++) {
      this.children[i].removeNode();
    }

    this.obj.nodes = [];
    for (i = 0; i < oldnodes.length; i++) {
      if (oldnodes[i] === this) {
        continue;
      }
      this.obj.nodes.push(oldnodes[i]);
    }

    this.obj.lines = [];
    for (i = 0; i < oldlines.length; i++) {
      if (oldlines[i].start === this) {
        continue;
      } else if (oldlines[i].end === this) {
        continue;
      }
      this.obj.lines.push(oldlines[i]);
    }

    this.el.remove();
  };

  // Define all Line related functions.
  Line = function(obj, startNode, endNode) {
    this.obj = obj;
    this.options = obj.options;
    this.start = startNode;
    this.colour = 'blue';
    this.size = 'thin';
    this.end = endNode;
  };

  Line.prototype.updatePosition = function() {
    if (
      !this.options.showSublines &&
      (!this.start.visible || !this.end.visible)
    ) {
      return;
    }
    this.size = this.start.visible && this.end.visible ? 'thick' : 'thin';
    this.color =
      this.obj.activeNode.parent === this.start ||
      this.obj.activeNode.parent === this.end
        ? 'red'
        : 'blue';
    this.strokeStyle = '#ff0';

    this.obj.canvas
      .path(
        'M' +
          this.start.x +
          ' ' +
          this.start.y +
          'L' +
          this.end.x +
          ' ' +
          this.end.y
      )
      .attr({ stroke: this.strokeStyle, opacity: 1, 'stroke-width': '2px' });
      
  };

  jQuery.fn.addNode = function(parent, name, options) {
    var obj = this[0],
      node = (obj.nodes[obj.nodes.length] = new Node(
        obj,
        name,
        parent,
        options
      ));
  //  console.log('add-node', obj.root);
    obj.root.animateToStatic();
    return node;
  };

  jQuery.fn.addRootNode = function(name, opts) {
    var node = (this[0].nodes[0] = new Node(this[0], name, null, opts));
    this[0].root = node;
    return node;
  };

  jQuery.fn.removeNode = function(name) {
    return this.each(function() {
      //      if (!!this.mindmapInit) return false;
      //remove a node matching the anme
      //      alert(name+' removed');
    });
  };

  jQuery.fn.mindmap = function(options) {
    // Define default settings.
    options = jQuery.extend(
      {
        attract: 6,
        repulse: 6,
        damping: 0.55,
        timeperiod: 10,
        wallrepulse: 0.4,
        mapArea: {
          x: -1,
          y: -1,
        },
        canvasError: 'alert',
        minSpeed: 0.05,
        maxForce: 0.1,
        showSublines: false,
        updateIterationCount: 20,
        showProgressive: true,
        centreOffset: 100,
        timer: 0,
      },
      options
    );
    
    var jQuerywindow = jQuery("#mindmap");

    return this.each(function() {
      var mindmap = this;

      this.mindmapInit = true;
      this.nodes = [];
      this.lines = [];
      this.activeNode = null;
      this.options = options;
      
      this.animateToStatic = function() {
        this.root.animateToStatic();
      };
      jQuerywindow.resize(function() {
        mindmap.animateToStatic();
      });

      //canvas
      
      if (options.mapArea.x === -1) {
        options.mapArea.x = mindmap_width;
      }
      if (options.mapArea.y === -1) {
        options.mapArea.y = mindmap_height;
      }
      console.log("mindmap width", mindmap_width, "mindmap height", mindmap_height)
      //create drawing area
      var canvas_x = mindmap_position.left//+(mindmap_width/2)
      var canvas_y = mindmap_position.top
      console.log("canvas",canvas_x, canvas_y, options.mapArea)
    
      this.canvas = Raphael(canvas_x, canvas_y, options.mapArea.x, options.mapArea.y);
     // console.log(options.mapArea,this.canvas)
      // Add a class to the object, so that styles can be applied
      jQuery(this).addClass('js-mindmap-active');

      // Add keyboard support (thanks to wadefs)
      jQuery(this).keyup(function(event) {
        var newNode,
          i,
          activeParent = mindmap.activeNode.parent;
        switch (event.which) {
          case 33: // PgUp
          case 38: // Up, move to parent
            if (activeParent) {
              activeParent.el.click();
            }
            break;
          case 13: // Enter (change to insert a sibling)
          case 34: // PgDn
          case 40: // Down, move to first child
            if (mindmap.activeNode.children.length) {
              mindmap.activeNode.children[0].el.click();
            }
            break;
          case 37: // Left, move to previous sibling
            if (activeParent) {
              newNode = null;
              if (activeParent.children[0] === mindmap.activeNode) {
                newNode =
                  activeParent.children[activeParent.children.length - 1];
              } else {
                for (i = 1; i < activeParent.children.length; i++) {
                  if (activeParent.children[i] === mindmap.activeNode) {
                    newNode = activeParent.children[i - 1];
                  }
                }
              }
              if (newNode) {
                newNode.el.click();
              }
            }
            break;
          case 39: // Right, move to next sibling
            if (activeParent) {
              newNode = null;
              if (
                activeParent.children[activeParent.children.length - 1] ===
                mindmap.activeNode
              ) {
                newNode = activeParent.children[0];
              } else {
                for (i = activeParent.children.length - 2; i >= 0; i--) {
                  if (activeParent.children[i] === mindmap.activeNode) {
                    newNode = activeParent.children[i + 1];
                  }
                }
              }
              if (newNode) {
                newNode.el.click();
              }
            }
            break;
          case 45: // Ins, insert a child
            break;
          case 46: // Del, delete this node
            break;
          case 27: // Esc, cancel insert
            break;
          case 83: // 'S', save
            break;
        }
        return false;
      });
    });
  };
})(jQuery);

/*jslint devel: true, browser: true, continue: true, plusplus: true, indent: 2 */
var mindmapNodes = {};

function setPostNodes(related_posts){
  var post_nodes = []
  //  console.log("post nodes",posts)

  for (var p  in related_posts) {
   // console.log("related",p, related_posts[p], posts[related_posts[p]].related)
  }

  return post_nodes
}


function setMindMapNotch(notch) {
  var mindmapData = {},
  id = notch.object_id,
  nav_type = notch.object

  mindmapData.root = {
    nav_type : nav_type,
    id: id,
    title: notch.title,
    href: notch.url,
    className:'root-node',
    backgroundImage : '',
    nodes: []
  }

  if (nav_type == "category") {
    if (categories[id].posts != undefined) {
      //  console.log("cat", categories[id].posts)
        //categories[id].nodes = setPostNodes(categories[id].posts)
      for (c = 0; c < categories[id].posts.length; c++) {
      //  console.log("cat notch", posts[categories[id].posts[c]])
        

            mindmapData.root.nodes.push(posts[categories[id].posts[c]])
        }
    }

  }


  loadMindmap('#mindmap', mindmapData)

}
function getNodeImage(this_node){
  
      if(this_node.post_media != undefined){
        
        if (this_node.post_media._thumbnail_id != undefined) {
          
          if (this_node.post_media._thumbnail_id[0] != undefined) {
            //console.log("get node image", this_node.title, this_node.post_media._thumbnail_id[0].full_path,this_node)
            return this_node.post_media._thumbnail_id[0].full_path

          }
        }

      }
    
}

function setGrandChildren(child_node) {

  var grandchildren = []
  

  if (child_node.related != undefined) {

    for (var p in child_node.related) {
     // console.log("related", p, child_node.related[p], posts[child_node.related[p]])
      grandchildren.push(posts[child_node.related[p]])
    }
  }


  return grandchildren
}

function loadMindmap(target_div, mindmapData) {
  if (initMindMap == false) {
    initMindMap = true
  } else {
//    jQuery('#mindmap').raphael.remove();
    
}
  mindmap_width = jQuery(target_div).css("width");
  mindmap_height = jQuery(target_div).css("height");
 

  var create_root = function(){
    return (jQuery(target_div).addRootNode(mindmapData.root.title, {
      href: '/',
      url: '/',
      // size: jQuery(target_div + '>ul>li>a').attr('size'),
      // color: jQuery(target_div + '>ul>li>a').attr('color'),
      onclick: function (node) {
        jQuery(node.obj.activeNode.content)
          .each(function () {
            this.hide();
          });
      }
    }))
  }

  var addLI = function (child_node,parent_node) {

    
   
    
      var backgroundImage = getNodeImage(child_node)
 //  console.log('bg',backgroundImage, child_node)
    // var parentnode = jQuery(this)
        parentnode = root;
      
      this.mynode = jQuery(target_div).addNode(parent_node, 
          child_node.title, {
          //          href:jQuery('a:eq(0)',this).text().toLowerCase(),
          href: "/",
          size: "/",
          //color: "red",
          className : 'child-node',
          backgroundImage: backgroundImage,
          onclick: function (node) {
            jQuery(node.obj.activeNode.content)
              .each(function () {
                this.hide();
              });
            jQuery(node.content).each(function () {
              this.show();
            });
          }
        })
        
      console.log("mynode",this.mynode)
      var grandchildren = setGrandChildren(child_node)
      var current_node = this.mynode

      for(g=0;g<grandchildren.length;g++){
        if(grandchildren[g].id != child_node.id){
         // console.log("grandchild", grandchildren[g].id,child_node.id, this.mynode);
          var backgroundImage = getNodeImage(posts[grandchildren[g].id])
          var href = getNodeImage(posts[grandchildren[g].id])

         // console.log('grandbg',backgroundImage)
          this.mynode = jQuery(target_div).addNode(current_node,
            grandchildren[g].title, {
            //          href:jQuery('a:eq(0)',this).text().toLowerCase(),
           // href: "/",
            size: "/",
            className: 'grandchild-node',
            backgroundImage: backgroundImage,
           /// color: "green",
            onclick: function (node) {
              //getBehavior('grandchild', posts[grandchildren[g].id])
              
              
              jQuery(node.obj.activeNode.content)
                .each(function () {
                  this.hide();
                });
              jQuery(node.content).each(function () {
                this.show();
              });
            }
          })

        }
      }
     
      jQuery(this).hide();
      
        

    //jQuery('>ul>li', this).each(addLI);
  }
  function getBehavior(level,post){
    if(post.type == 'resource'){
      if (post.info != undefined){
        console.log(post.info,post.info.keys(a).length)
        return false
      }


    }
    console.log('click',level,post)
    return false
  }
  



//console.log('nodes', mindmapData.root.nodes)
if (mindmapData.root.nodes.length >0){ // intializes nod build.
  

  
  jQuery(target_div).html('') // empties the contatiner div
var  root = create_root();// runs the root creation function based on variables passed in.
//console.log('htmlroot', root);
  for (n=0; n<mindmapData.root.nodes.length;n++){
    addLI(mindmapData.root.nodes[n], root)// loops through the first nodes
  }
} 

}

  /*
  //ORIGINAL CODE that crawls list, to be disposed of
  var root = (jQuery(target_div + '>ul>li').get(0).mynode = jQuery(
    target_div
  ).addRootNode(jQuery(target_div + '>ul>li>a').text(), {
    href: '/',
    url: '/',
    size: jQuery(target_div + '>ul>li>a').attr('size'),
    color: jQuery(target_div + '>ul>li>a').attr('color'),
    onclick: function(node) {
      jQuery(node.obj.activeNode.content).each(function() {
        this.hide();
      });
    },
  }));
  
  console.log('htmlroot', root);

  jQuery(target_div + '>ul>li').hide();

  var addLI = function() {
    var parentnode = jQuery(this)
      .parents('li')
      .get(0);
    if (typeof parentnode == 'undefined') parentnode = root;
    else parentnode = parentnode.mynode;

    this.mynode = jQuery(target_div).addNode(
      parentnode,
      jQuery('a:eq(0)', this).text(),
      {
        //          href:jQuery('a:eq(0)',this).text().toLowerCase(),
        href: jQuery('a:eq(0)', this).attr('href'),
        size: jQuery('a:eq(0)', this).attr('size'),
        color: jQuery('a:eq(0)', this).attr('color'),
        onclick: function(node) {
          jQuery(node.obj.activeNode.content).each(function() {
            this.hide();
          });
          jQuery(node.content).each(function() {
            this.show();
          });
        },
      }
    );
    jQuery(this).hide();
    jQuery('>ul>li', this).each(addLI);
  };

  jQuery(target_div + '>ul>li>ul').each(function() {
    jQuery('>li', this).each(addLI);
  });
  */