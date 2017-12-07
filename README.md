# Sudo Web – sudo.org.au


## Introduction

This is the source code for http://sudo.org.au. It's built on plain HTML, JS and Sass CSS Compiler.

As with any Sudo Project, we'll setup a standard working environment so everyone can work on the same playing field. For more information on Laravel Mix, visit https://laravel.com/docs/5.4/mix


## Getting started

1. Download and install NPM. (If you want to test you've got it installed, you can run `npm -v` in terminal / command prompt)
2. Change directory to the sudo.org.au in the console window.
3. Run `npm update` to install all required dependencies
4. Run `npm run watch` to start a local web server and view the website.

## Contributing

When wanting to make a change to the repo, it's advised that you first hit `fork` on the GitHub page, so that you effectively take a copy of the original. Once you've made your changes on your own version of the website, you can then submit what's called a `pull request` to allow the owner of the repo to review any changes you may have.

The Sudo Website is built on top of [Foundation by Zurb](foundation.zurb.com/sites/). Please [read the docs](foundation.zurb.com/sites/docs/) for any queries you can't seem to find in this README. 

# Advanced

## Modifying files

When modifying any HTML, feel free to modify anything within it, preview the page in browser (Eg. http://localhost:3000/about/) and then commit it.

For SCSS and JS files, it get's a little bit more complex. **Do not modify any `*-min.js` or `*.css` files, as they will be quickly overwritten**. Only modify *.js and *.scss files to edit the Javascript and Stylesheets respectively.


### SCSS

Each page has it's own SCSS file & it should describe the looks of the page. Feel free to copy other directories to make a new section.

If you have any syntax errors, rest assured you will get an error from the console saying why it can't compile it.


### JS

Javascript is written in ES2015 / ES6. It may look quite different to normal JS, but don't worry. You can write normal JS and everything should compile just fine. 

If you want to learn more about ES2016, have a look at https://laracasts.com/series/es6-cliffsnotes/episodes/3

Similar to SCSS, if you have any syntax errors, it will give you errors and you won't be able to compile it!


## Adding Scripts / Styles

Each SCSS and JS file, compiles down to it's own CSS and 'Minified JS' file respectively. They both have different naming schemes and end up in different locations. Use the scheme below to understand how one file changes:

**SCSS to CSS looks like this:**

`/scss/{PAGENAME}/styles/{PAGENAME}.scss > /{PAGENAME}/styles/{PAGENAME}.css`

**JS to 'Minified JS' looks like this:**

`/{PAGENAME}/scripts/{PAGENAME}.js > /{PAGENAME}/scripts/{PAGENAME}-min.js`


### Note:

When adding scripts / styles in regards to new pages, remember to add to the styles / scripts array in the `webpack.mix.js` file. This is the file that allows the compiler to know which files need transpiling and which it should leave alone.

```js


/**
 * Sudo Styles
 */

 /* Folder, Name */
 var styles = [
	[ 'about', 'about' ],
]


```

```js

/**
 * Sudo Script
 */


/* Folder, Name */
var scripts = [
	// [ 'about', 'about' ],
]

```
