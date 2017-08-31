const mix = require('laravel-mix');
const express = require('express')
const connectSSI = require('connect-ssi')
const app = express()


app.use(connectSSI({
    ext: '.html',
    baseDir: './'
}));


app.use(express.static('./'))


app.listen(3001, function () {
	console.log('Express Begun Successfully')
})


mix.autoload({})

mix.browserSync({
    proxy: 'localhost:3001',
	files: ['**/*']
});

mix.webpackConfig({
	resolve: {
	    alias: {
			'vue$': 'vue/dist/vue.js',
			'jquery$': "jquery/src/jquery",
			"velocity": 'velocity-animate/velocity.min.js',
			"ScrollMagic": 'scrollmagic/scrollmagic/uncompressed/ScrollMagic.js',
			"animation.velocity": 'scrollmagic/scrollmagic/minified/plugins/animation.velocity.min.js',
			"debug.addIndicators": 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js',
	    }
	}
});



/**
 * Sudo Styles
 */

 /* Folder, Name */
 var styles = [
	[ 'about', 'about' ],
]

var fip = { includePaths: ['node_modules/foundation-sites/scss/', 'scss/sudo-global/styles/']};

 for(index in styles) {
	 var folder = styles[index][0]
	 var name = styles[index][1]
	 mix.sass('scss/' + folder + '/styles/' + name + '.scss', folder + '/styles', fip)
 }


/**
 * Sudo Script
 */


/* Folder, Name */
var scripts = [
	// [ 'about', 'about' ],
]

for(index in scripts) {
	var folder = scripts[index][0]
	var name = scripts[index][1]
	mix.js(folder + '/scripts/' + name + '.js', folder + '/scripts/min/' + name + '.min.js')
}
