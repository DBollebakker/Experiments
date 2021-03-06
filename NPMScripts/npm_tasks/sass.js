const sass = require('node-sass');
const fs = require('fs');
const sassGlobbing = require('node-sass-glob-importer');
const sassImportOnce = require('node-sass-once-importer');
const paths = {
    dev: {
        root: "dev/",
        sass: "dev/sass/",
        img: "dev/img/",
        fonts: "dev/fonts/",
        js: "dev/script/js/",
        ts: "dev/script/ts/",
        svg: "dev/svg/",
        svgMap: './assets/dev/svg/map/**/*.svg',
        svgMapLoggedIn: './assets/dev/svg/map-loggedin/**/*.svg',
        svgLib: './assets/dev/svg/lib/**/*.svg'
    },
    dist: {
        root: 'dist',
        css: 'dist/css/',
        fonts: 'dist/fonts/',
        img: 'dist/img/',
        svg: 'dist/svg/',
        svgLib: 'dist/svg/lib',
        js: 'dist/js/'
    }
}

sass.render({
    file: paths.dev.sass + 'styles.scss',
    importer: [sassGlobbing(), sassImportOnce()],
    outputStyle: 'nested',
    indentType:"space",
    indentWidth: 2,
    sourceMap: true,
    outFile: paths.dist.css + "style.css",
    includePaths:['/dev/sass']
  }, 
  function(error, result) {
    if (error) {
      console.log(error.status);
      console.log(error.column);
      console.log(error.message);
      console.log(error.line);
    }
    else {
      console.log("Included files: \n", result.stats.includedFiles);
      console.log("Duration:", result.stats.duration);
      //console.log(JSON.stringify(result.map)); // note, JSON.stringify accepts Buffer too
      fs.writeFile(paths.dist.css + "styles.css", result.css, function(err){
        if(!err){
          console.log(result.message);
        }else {
            console.log(err.message);
            //console.log(err.status);
        }
      });
      
      fs.writeFile(paths.dist.css + "styles.css.map", result.map, function(err){
        if(!err){
          console.log(result.message);
        }else {
            console.log(err.message);
            //console.log(err.status);
        }
      });
    }
});
