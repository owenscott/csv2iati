var gulp = require('gulp'),
	browserify = require('gulp-browserify'),
	brfs = require('brfs'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat');

var paths = {
	scripts: ['src/js/**/*.js', 'src/js/*.js'],
	styles: ['src/css/bootstrap.min.css'],
	fonts: ['src/fonts/*.*']
}

gulp.task('scripts', function() {
	gulp.src('src/js/app.js')
		.pipe(browserify({
			transform: [brfs],
			debug: true
		}))
		.pipe(rename('bundle.js'))
		.pipe(gulp.dest('./dist/js'));
});

gulp.task('styles', function() {
	gulp.src(paths.styles)
		.pipe(concat('bundle.css'))
		.pipe(gulp.dest('./dist/css'))
})

gulp.task('fonts', function() {
	gulp.src(paths.fonts)
		.pipe(gulp.dest('./dist/fonts'))
})

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.styles, ['styles'])
});

gulp.task('default', ['scripts', 'styles', 'fonts', 'watch']);