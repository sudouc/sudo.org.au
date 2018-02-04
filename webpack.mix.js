const mix = require('laravel-mix');
const express = require('express')
const connectSSI = require('connect-ssi')
const app = express()


app.use(connectSSI({
    ext: '.html',
    baseDir: './'
}));


app.use(express.static('./'))

app.use(function(req, res, next) {
    res.status(404);
    res.send('404: File Not Found');
});

app.listen(3080, function () {
	console.log('Express Begun Successfully')
})


mix.autoload({})

mix.browserSync({
    proxy: 'localhost:3080',
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
     [ '404', '404' ],
     [ 'about', 'about' ],
	 [ 'home', 'home' ],
	 [ 'projects', 'projects' ],
     [ 'sponsorship', 'sponsorship' ],
	 [ 'sudo-global', 'sudo-global' ],
     [ 'talent', 'talent' ],
     [ 'vote', 'vote' ],
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
	[ 'sudo-global', 'sudo-global' ],
    [ 'talent', 'talent' ],
    [ 'vote', 'vote' ],
]

for(index in scripts) {
	var folder = scripts[index][0]
	var name = scripts[index][1]
	mix.js(folder + '/scripts/' + name + '.js', folder + '/scripts/min/' + name + '.min.js')
}
