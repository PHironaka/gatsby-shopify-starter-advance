const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const products = await graphql(`
  {
    allShopifyProduct {
      edges {
        node {
          id
          handle
        }
      }
    }
  }
  `)

  const collections = await graphql(`
    {
      allShopifyCollection {
        edges {
          node {
            id
            title
            handle
          }
        }
      }
    }
  `)

  const template = path.resolve("src/templates/ProductPage/index.js")
  const collectionTemplate = path.resolve("src/templates/Collection/index.js")


  products.data.allShopifyProduct.edges.forEach(edge => {
    createPage({
      path: `/product/${edge.node.handle}`,
      component: template,
      context: {
        id: edge.node.id,
        handle: edge.node.handle,
      },
    })
  })

  collections.data.allShopifyCollection.edges.forEach(edge => {
    createPage({
      path: `/collections/${edge.node.handle}`,
      component: collectionTemplate,
      context: {
        id: edge.node.id,
        handle: edge.node.handle,
      },
    })
  })


}