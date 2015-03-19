var metalsmith = require('metalsmith'),
    markdown = require('metalsmith-markdown'),
    templates = require('metalsmith-templates'),
    serve = require('metalsmith-serve'),
    watch = require('metalsmith-watch'),
    excerpts = require('metalsmith-excerpts'),
    collections = require('metalsmith-collections'),
    branch = require('metalsmith-branch'),
    permalinks = require('metalsmith-permalinks'),
    feed = require('metalsmith-feed'),
    wordcount = require('metalsmith-word-count'),
    sitemap = require('metalsmith-sitemap'),
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
    .use(excerpts())
    .use(collections({
      posts: {
        pattern: 'posts/**.html',
        sortBy: 'publishDate',
        reverse: true
      }
    }))
    .use(branch('posts/**.html')
        .use(permalinks({
          pattern: 'posts/:title',
          relative: false
        }))
    )
    .use(branch('!posts/**.html')
        .use(branch('!index.md').use(permalinks({
          relative: false
        })))
    )
    .use(wordcount({
      metaKeyCount: "wordCount",
      metaKeyReadingTime: "readingTime",
      speed: 300,
      seconds: false,
      raw: false
    }))
    .use(templates({
      engine: 'jade',
      moment: moment
    }))
    .use(feed({collection: 'posts'}))
    .use(sitemap({
      output: 'sitemap.xml',
      urlProperty: 'path',
      hostname: 'https://azurelogic.com',
      defaults: {
        priority: 0.5,
        changefreq: 'daily'
      }
    }));
if (process.env.NODE_ENV !== 'production') {
  siteBuild = siteBuild
      .use(serve({
        port: 8080,
        verbose: true
      }))
      .use(watch({
        pattern: '**/*',
        livereload: true
      }))
}
siteBuild.build(function (err) {
      if (err) {
        console.log(err);
      }
      else {
        console.log('Site build complete!');
      }
    });