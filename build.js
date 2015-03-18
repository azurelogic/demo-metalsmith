var metalsmith = require('metalsmith'),
    markdown = require('metalsmith-markdown'),
    templates = require('metalsmith-templates'),
    serve = require('metalsmith-serve'),
    watch = require('metalsmith-watch'),
    moment = require('moment');

var siteBuild = metalsmith(__dirname)
    .metadata({
      site: {
        title: 'azurelogic.com',
        url: 'https://azurelogic.com'
      }
    })
    .source('./src')
    .destination('./build')
    .use(markdown())
    .use(templates({
      engine: 'jade',
      moment: moment
    }))
    .use(serve({
      port: 8080,
      verbose: true
    }))
    .use(watch({
      pattern: '**/*',
      livereload: true
    }))
    .build(function (err) {
      if (err) {
        console.log(err);
      }
      else {
        console.log('Site build complete!');
      }
    });