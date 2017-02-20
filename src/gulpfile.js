
const gulp = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const gulpif = require('gulp-if');
const cleanCSS = require('gulp-clean-css');
const order = require("gulp-order");
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const plumber = require('gulp-plumber');

const config = {
	styles: {
		src: ['./scss/**/*.scss'],
		main: ['./scss/main.scss'],
		dest: '../public/css/',
		autoprefixer: ['last 2 versions']
	},
	scripts: {
		src: ['./js/**/*.js'],
		dest: '../public/js/',
		bundle: 'app.js',
    orderBundle: ['js/menu.js', 'js/giphy.js', 'js/panel.js', 'js/remove.js', 'js/favourite.js', 'js/web.js', 'js/youtube.js', 'js/app.js']
	}
};

gulp.task('dev:styles', styles(false));
gulp.task('dev:scripts', devScripts);
gulp.task('default', devWatch);

gulp.task('prod:styles', styles(true));
gulp.task('prod:scripts', prodScripts);
gulp.task('prod', ['prod:styles', 'prod:scripts']);

function styles(isProduction) {
	return () => {
		return gulp
			.src(config.styles.main)
			.pipe(plumber())
			.pipe(gulpif(!isProduction, sourcemaps.init()))
			.pipe(sass().on('error', sass.logError))
			.pipe(autoprefixer({
				browsers: config.styles.autoprefixer
			}))
			.pipe(gulpif(isProduction, cleanCSS({
				compatibility: 'ie8'
			})))
			.pipe(gulpif(!isProduction, sourcemaps.write()))
			.pipe(gulp.dest(config.styles.dest));
	};
}

function devScripts() {
	return gulp
		.src(config.scripts.src)
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(babel())
		.pipe(order(config.scripts.orderBundle, { base: './' }))
		.pipe(concat(config.scripts.bundle))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(config.scripts.dest));
}

function prodScripts() {
	return gulp
		.src(config.scripts.src)
		.pipe(babel())
		.pipe(order(config.scripts.orderBundle, { base: './' }))
		.pipe(concat(config.scripts.bundle))
		.pipe(uglify())
		.pipe(gulp.dest(config.scripts.dest));
}

function devWatch() {
	gulp.watch(config.styles.src, ['dev:styles']);
	gulp.watch(config.scripts.src, ['dev:scripts']);
}
