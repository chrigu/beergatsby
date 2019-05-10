/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require(`path`)

const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions
    if (node.internal.type === `MarkdownRemark`) {
      const slug = createFilePath({ node, getNode, basePath: `pages` })

      let pageType = 'brewery'
      
      if (slug.indexOf('breweries') === -1) {
          pageType = 'beer'
      }

      createNodeField({
        node,
        name: `slug`,
        value: slug,
      })

      createNodeField({
        node,
        name: `pageType`,
        value: pageType,
      })
    }
}

exports.createPages = ({ graphql, actions }) => {
    // **Note:** The graphql function call returns a Promise
    // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise for more info
    const { createPage } = actions
    return graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
                pageType
              }
              frontmatter {
                  id
                  brewery
              }
            }
          }
        }
      }
    `
  ).then(result => {
        result.data.allMarkdownRemark.edges.forEach(({ node }) => {

          let templatePath = `./src/templates/beer.js`
          let context = {
              // Data passed to context is available
              // in page queries as GraphQL variables.
              slug: node.fields.slug,
          }

          if (node.fields.pageType === 'brewery') {
              templatePath = `./src/templates/brewery.js`
              context.id = node.frontmatter.id
          } else {
            context.brewery = node.frontmatter.brewery
          }

          createPage({
              path: node.fields.slug,
              component: path.resolve(templatePath),
              context
          })
      })
      })
  }