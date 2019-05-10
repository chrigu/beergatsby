import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { Link } from "gatsby"

export default ({ data: {beer, brewery} }) => {
  return (
    <Layout>
      <div>
        <h1>{beer.frontmatter.title}</h1>
        <p>{beer.frontmatter.style}</p>
        <div dangerouslySetInnerHTML={{ __html: beer.html }} />
        <h2>Brewed by</h2>
        <Link to={brewery.fields.slug}><p>{brewery.frontmatter.title}</p></Link>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!, $brewery: String!) {
    beer: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        style
      }
    }
    brewery: markdownRemark(
        frontmatter: {id: {eq: $brewery}}) {
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
  }
`