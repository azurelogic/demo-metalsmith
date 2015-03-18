var metalsmith = require('metalsmith');

var siteBuild = metalsmith(__dirname)
    .metadata({
      site: {
        title: 'azurelogic.com',
        url: 'https://azurelogic.com'
      }
    })
    .source('./src')
    .destination('./build')
    .build(function (err) {
      if (err) {
        console.log(err);
      }
      else {
        console.log('Site build complete!');
      }
    });