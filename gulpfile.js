var gulp = require('gulp'),
	browserify = require('gulp-browserify'),
	brfs = require('brfs'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat');

var paths = {
	scripts: ['client/js/**/*.js', 'client/js/*.js'],
	libs: ['client/lib/*.js'],
	styles: ['client/css/bootstrap.min.css'],
	fonts: ['client/fonts/*.*'],
	routes: ['client/routes/*.html'],
	templates: ['client/templates/*.ejs']
}

gulp.task('scripts', function() {
	gulp.src('client/js/app.js')
		.pipe(browserify({
			transform: [brfs],
			debug: true
		}))
		.pipe(rename('bundle.js'))
		.pipe(gulp.dest('./server/built-assets/js'));
});

gulp.task('styles', function() {
	gulp.src(paths.styles)
		.pipe(concat('bundle.css'))
		.pipe(gulp.dest('./server/built-assets/css'))
})

gulp.task('fonts', function() {
	gulp.src(paths.fonts)
		.pipe(gulp.dest('./server/built-assets/fonts'))
})

gulp.task('routes', function() {
	gulp.src(paths.routes)
		.pipe(gulp.dest('./server/built-routes'));
})

gulp.task('libs', function() {
	gulp.src(paths.libs)
		.pipe(gulp.dest('./server/built-assets/js'));
})

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.templates, ['scripts']);
  gulp.watch(paths.styles, ['styles']);
  gulp.watch(paths.routes, ['routes']);
});

gulp.task('build', ['scripts', 'styles', 'fonts', 'routes', 'libs']);
gulp.task('default', ['build','watch']);
