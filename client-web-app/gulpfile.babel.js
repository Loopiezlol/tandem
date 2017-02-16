/* eslint-disable import/no-extraneous-dependencies, no-console */
import gulp from 'gulp';
// import babel from 'gulp-babel';
import eslint from 'gulp-eslint';
import connect from 'gulp-connect';
import sass from 'gulp-sass';
import del from 'del';
import cors from 'cors';
import webpack from 'webpack-stream';
import webpackConfig from './webpack.config.babel';

const paths = {
  allSrcJs: './**/*.js?(x)',
  styles: './app/styles/**/*.scss',
  clientEntryPoint: './app/app.jsx',
  gulpFile: 'gulpfile.babel.js',
  webpackFile: 'webpack.config.babel.js',
  distDir: './dist/',
  clientBundle: './dist/client-bundle.js?(.map)',
};

gulp.task('server', () => connect.server({
  port: 3001,
  root: 'dist/',
  host: '0.0.0.0',
  livereload: true,
  middleware: () => ([cors()]),
}));

gulp.task('lint', () =>
  gulp.src([
    paths.allSrcJs,
    paths.gulpFile,
    paths.webpackFile,
    '!dist/*.js',
  ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError()),
);

gulp.task('clean', () => del(paths.clientBundle));

gulp.task('styles', () =>
  gulp.src(paths.styles)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.distDir)),
);

gulp.task('main', ['styles', 'lint', 'clean'], () =>
  gulp.src(paths.clientEntryPoint)
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(paths.distDir))
    .pipe(connect.reload()),
);

gulp.task('watch', () => {
  gulp.watch([
    paths.allSrcJs,
    paths.styles,
  ], ['main']);
});

gulp.task('default', ['server', 'watch', 'main']);
