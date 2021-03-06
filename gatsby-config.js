const path = require('path')

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `Gatsby Shopify Store`,
    description: `Shopify Demo store built on top of Shopify Starter by AlexanderProd`,
    author: `@peterhironaka`,
    menuLinks: [
      {
        name: 'Home',
        link: '/',
      },
      {
        name: 'Tops',
        link: '/collections/tops',
      },

      {
        name: 'Accessories',
        link: '/collections/accessories',
      },

      {
        name: 'About',
        link: '/about',
      },
    ],
  },

  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    // `gatsby-plugin-layout`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },

    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },

    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        displayName: true,
      },
    },

    {
      resolve: 'gatsby-plugin-crisp-chat',
      options: {
        websiteId: 'c8af00d4-eb3e-4fad-8109-bca724eba9a8',
        enableDuringDevelop: true, // Optional. Disables Crisp Chat during gatsby develop. Defaults to true.
        defer: true, // Optional. Sets the Crisp loading script to defer instead of async. Defaults to false.
        enableImprovedAccessibility: false, // Optional. Sets aria-label attribute on pop-up icon for screen readers. Defaults to true.
      },
    },

    {
      resolve: `@gatsby-contrib/gatsby-plugin-elasticlunr-search`,
      options: {
        // Fields to index
        fields: [`title`],
        // How to resolve each field`s value for a supported node type
        resolvers: {
          // For any node of type MarkdownRemark, list how to resolve the fields` values
          ShopifyProduct: {
            title: node => node.title,
            image: node => node.images[0].originalSrc,
            path: node => node.handle,
          },
        },
      },
    },

    {
      resolve: `gatsby-source-shopify`,
      options: {
        shopName: 'pjh-gatsbyshop',
        accessToken: '1e5bdddd448adedbe4e18e54469d9565',
        verbose: true,
      },
    },

    'gatsby-plugin-offline',
  ],
}
