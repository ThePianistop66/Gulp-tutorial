//  npm install PLUGIN --save-dev to install
// first install gulp and gulp-plugins
var gulp = require('gulp');
var pump = require('pump');
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');

var uglify = require('gulp-uglify');

var autoprefixer = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');
var sass = require('gulp-sass');
var babel = require('gulp-babel');

// less plugins
var less = require('gulp-less');
var LessAutoprefix = require('less-plugin-autoprefix');
var lessAutoprefix = new LessAutoprefix({
  browsers: ['last 2 versions']
})

//file paths
var DIST_PATH = 'public/dist';
var SCRIPTS_PATH = 'public/scripts/**/*.js';
var CSS_PATH = 'public/css/**/*.css';
var SCSS_PATH = 'public/scss/**/*.scss';
var LESS_PATH = 'public/less/**/*.less';


gulp.task('styles', cb => {
  console.log('starting styles task');
  pump([
    gulp.src(['public/css/reset.css', CSS_PATH]),
    sourcemaps.init(),
    autoprefixer(),
    concat('styles.css'),
    minifyCss(),
    sourcemaps.write(),
    gulp.dest(DIST_PATH),
    livereload()
  ]
  , cb
  );
});

// FOR REGULAR CSS
// gulp.task('styles', () => {
//   console.log('starting styles task');
//
//   return gulp.src(['public/css/reset.css', CSS_PATH])
//     //Possible to not pass object to autoprefixer
//     // .pipe(autoprefixer({
//     //   browsers: ['last 2 versions', 'ie 8']
//     // }))
//     .pipe(plumber(function (err) {
//       console.log('Styles Task Error');
//       console.log(err);
//       this.emit('end');
//     }))
//     .pipe(sourcemaps.init())
//     .pipe(autoprefixer())
//     .pipe(concat('styles.css'))
//     .pipe(minifyCss())
//     //sourcemaps write just before saving to folder
//     .pipe(sourcemaps.write())
//     .pipe(gulp.dest(DIST_PATH))
//     .pipe(livereload());
// });

// // FOR SCSS
// gulp.task('styles', () => {
//   console.log('starting styles task');
//
//   return gulp.src('public/scss/styles.scss')
//     .pipe(plumber(function (err) {
//       console.log('Styles Task Error');
//       console.log(err);
//       this.emit('end');
//     }))
//     .pipe(sourcemaps.init())
//     .pipe(autoprefixer())
//     // don't need to concatenate and minify because sass does it automatically.
//     .pipe(sass({
//       outputStyle: 'compressed'
//     }))
//     //sourcemaps write just before saving to folder
//     .pipe(sourcemaps.write())
//     .pipe(gulp.dest(DIST_PATH))
//     .pipe(livereload());
// });

// FOR LESS
// gulp.task('styles', () => {
//   console.log('starting styles task');
//
//   return gulp.src('public/less/styles.less')
//     .pipe(plumber(function (err) {
//       console.log('Styles Task Error');
//       console.log(err);
//       this.emit('end');
//     }))
//     .pipe(sourcemaps.init())
//     .pipe(less({
//       plugins: [lessAutoprefix]
//     }))
//     .pipe(minifyCss())
//     //sourcemaps write just before saving to folder
//     .pipe(sourcemaps.write())
//     .pipe(gulp.dest(DIST_PATH))
//     .pipe(livereload());
// });


// scripts
gulp.task('scripts', cb => {
  console.log('starting scripts task');
  pump([
    gulp.src(SCRIPTS_PATH),
    sourcemaps.init(),
    babel({
      presets:['es2015']
    }),
    concat('main.js'),
    uglify(),
    sourcemaps.write(),
    gulp.dest(DIST_PATH),
    livereload()
  ],
    cb
  );
});

//images
gulp.task('images', () => {
  console.log('starting images task');
});

gulp.task('default', ['images', 'styles','scripts'], () => {
  console.log('starting default task');
});

gulp.task('watch', ['default'], () => {
  console.log('starting watch task');
  require('./server.js');
  livereload.listen();
  gulp.watch(SCRIPTS_PATH, ['scripts']);
  // gulp.watch(SCRIPTS_PATH, CSS_PATH], ['scripts','styles']);
  gulp.watch(CSS_PATH, ['styles']);
  // gulp.watch(SCSS_PATH, ['styles']);
  // gulp.watch(LESS_PATH, ['styles']);
})
