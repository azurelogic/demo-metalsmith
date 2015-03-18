var metalsmith = require('metalsmith'),
    markdown = require('metalsmith-markdown'),
    templates = require('metalsmith-templates'),
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
    .build(function (err) {
      if (err) {
        console.log(err);
      }
      else {
        console.log('Site build complete!');
      }
    });