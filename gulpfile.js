var del = require('del');
var gulp = require('gulp');
var runSequence = require('run-sequence');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var browserify = require('browserify');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');



//
// SUB-TASKS
//

gulp.task('clean', function (cb) {
	del(['build/**'], { force: true }, cb);
});

gulp.task('lint', function() {
	return gulp
		.src(['src/**/*.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('browserify', function () {
  // set up the browserify instance on a task basis
	var b = browserify({
		entries: 'src/core.js',
		standalone: 'TV',
		debug: true
	});

  return b.bundle()
	.pipe(source('smart-tv.js'))
	.pipe(buffer())
	.pipe(sourcemaps.init({loadMaps: true}))
	.pipe(uglify())
	.on('error', gutil.log)
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest('./dist/'));
});



//
// TASKS
//

gulp.task('build', function (cb) {
	runSequence(
		'clean',
		'lint',
		'browserify',
		cb
	);
});



// WATCH

gulp.task('watch', ['build'], function () {
	gulp.watch('config.js', ['build']);
	gulp.watch('.jshintrc', ['lint']);
	gulp.watch('src/**/*.js', ['build']);
});
