const { src, dest, watch, parallel, series } = require('gulp');

const scss 					= require('gulp-sass')(require('sass'));
const concat 				= require('gulp-concat');
const browserSync		= require('browser-sync').create();
const uglify 				= require('gulp-uglify-es').default;
const autoprefixer	= require('gulp-autoprefixer');
const imagemin			= require('gulp-imagemin');
const del 					= require('del');
const cssmin				= require('gulp-cssmin');


function browsersync() {
	browserSync.init({
		server: {
			baseDir: 'app/'
		}
	});
}

function cleanDist() {
	return del('dist')
}

function minCss() {
	return src([
			'node_modules/reset-css/reset.css',
			// 'node_modules/normalize.css/normalize.css',
			'app/css/style.css'
		])
		.pipe(cssmin())
		.pipe(concat('style.min.css'))
		.pipe(dest('app/css'))
		.pipe(browserSync.stream())
}

function styles() {
	return src('app/scss/style.scss')
		.pipe(scss({outputStyle: 'compressed'}))
		.pipe(autoprefixer({
			overrideBrowserslist: ['last 10 version'],
			grid: true
		}))
		.pipe(dest('app/css'))
		.pipe(browserSync.stream())
}

function scripts() {
	return src([
			'node_modules/jquery/dist/jquery.js',
			'node_modules/vide/dist/jquery.vide.js',
			'app/js/main.js'
		])
		.pipe(concat('main.min.js'))
		.pipe(uglify())
		.pipe(dest('app/js'))
		.pipe(browserSync.stream())
}

function images() {
	return src('app/img/**/*')
		.pipe(imagemin(
				[
					imagemin.gifsicle({interlaced: true}),
					imagemin.mozjpeg({quality: 75, progressive: true}),
					imagemin.optipng({optimizationLevel: 5}),
					imagemin.svgo({
						plugins: [
							{removeViewBox: true},
							{cleanupIDs: false}
						]
					})
				]
			))
		.pipe(dest('dist/img'))
}

function watching() {
	watch(['app/scss/**/*.scss'], styles);
	watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
	watch(['app/css/**/*.css', '!app/css/style.min.css'], minCss);
	watch(['app/*.html']).on('change', browserSync.reload);
}

function build() {
	return src([
			'app/fonts/**/*',
			'app/*.html',
			'app/*.php',
			'app/css/style.min.css',
			'app/js/main.min.js',
			'app/videos/**'
		], {base: 'app'})
	.pipe(dest('dist'))
}


exports.styles 			= styles; 
exports.watching		= watching;
exports.browsersync = browsersync;
exports.scripts 		= scripts;
exports.images 			= images;
exports.cleanDist 	= cleanDist;
exports.minCss			= minCss;

exports.build 			= series (cleanDist, images, build);
exports.default 		= parallel(styles, minCss, scripts, browsersync, watching);