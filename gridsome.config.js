// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here requires a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'manascode',
  // siteDescription: 'Manascode is a personal blog , from where you can learn about Python tutorial, Django tutorial, Javascript and Vue.js from scratch . Manascode provides you in detail tutorials to learn something in easy way. Follow us to be a full stack web developer in 2020.',
  siteUrl: 'https://manascode.com',
  templates: {
    Post: '/:title',
    Tag: '/tag/:id',
  },

  plugins: [
    {
      use: '@gridsome/vue-remark',
      options: {
        typeName: 'Gem', // Required
        baseDir: './content/posts', // Where .md files are located
        template: './src/templates/Post.vue', // Optional
      },
    },
    {
      use: '@gridsome/plugin-sitemap',
      options: {
        cacheTime: 600000, // default
        exclude: ['404'],
        config: {
          '/*': {
            changefreq: 'weekly',
            priority: 0.5,
          },
          '/about': {
            changefreq: 'monthly',
            priority: 0.7,
          },
        },
      },
    },
    {
      // Create posts from markdown files
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'Post',
        path: 'content/posts/*.md',
        refs: {
          // Creates a GraphQL collection from 'tags' in front-matter and adds a reference.
          tags: {
            typeName: 'Tag',
            create: true,
          },
        },
      },
    },
    {
      use: '@gridsome/plugin-google-analytics',
      options: {
        id: 'UA-141182931-5',
      },
    },
  ],

  transformers: {
    //Add markdown support to all file-system sources
    remark: {
      externalLinksTarget: '_blank',
      externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
      anchorClassName: 'icon icon-link',
      plugins: ['@gridsome/remark-prismjs'],
    },
  },
};
