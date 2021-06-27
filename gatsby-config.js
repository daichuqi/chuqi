module.exports = {
  siteMetadata: {
    title: 'CQ',
    author: 'Richie',
    description: 'hi',
    siteUrl: 'https://www.daichuqi.com',
  },
  plugins: [
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/users/*`] },
    },
    {
      resolve: 'gatsby-source-contentful',
      options: {
        accessToken: '3qwbHguO88Bgaz9RTWQgy5ATSUZbC_Yhu0wiVvKlr98',
        spaceId: 'csmf8eqht06z',
      },
    },
    'gatsby-plugin-sass',
    'gatsby-plugin-image',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: { trackingId: 'UA-125866345-1' },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: { icon: 'src/images/favicon.png' },
    },
    'gatsby-transformer-remark',
    'gatsby-plugin-mdx',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
      __key: 'images',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: './src/pages/',
      },
      __key: 'pages',
    },
  ],
}
