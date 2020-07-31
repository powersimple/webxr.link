##Code Named: KitchenSink this theme runs WebXR.link
This is a Wordpress theme in Chrysalis evolving into a WebXR enabled site built on a NojeJS stack and Uses Gulp to build SASS and JS on Save by running gulp. Is experimenting with Webpack and Rollup for XR bundling.

You can clone this into your /wp-content/themes folder

Before you begin, make sure you have gulp and gulp-cli installed globally
(npm install -g gulp, gulp-cli)
You also need ruby installed to run SASS

commmandline to your theme folder
1. NPM INSTALL
2. Go into app/sass/styles.scss and edit the header to make this theme yours. change screenshot.png if you wish.
3. go into gulp.babel.js and set your url path as the localhost proxy to run browsersync.
4. Go into Wordpress admin Appearances->themes-> and activate this theme
5. put your your dev url and it should load.
6. run gulp (just type gulp)

Edit your javascripts in app/custom

This is an as-is work-in-progress
You're welcome to help yourself to the code, feel free to contact me with questions. Ben Erwin