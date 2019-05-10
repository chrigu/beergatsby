import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Beer from '../components/beer'

export default ({data: {brewery, beers}}) => {
  return (
    <Layout>
      <div>
        <h1>{brewery.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: brewery.html }} />
        <h2>Beers</h2>
        <div className="breweries">
        {beers.edges.map(({node}, index) => {
            return <Beer key={index} title={node.frontmatter.title} slug={node.fields.slug}/>
            })}
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($id: String!) {
    brewery: markdownRemark(frontmatter: { id: { eq: $id } }) {
      html
      frontmatter {
        title
      }
    }

    beers: allMarkdownRemark(
        filter: {fields: {pageType: {eq: "beer"}}, frontmatter: {brewery: {eq: $id}}}) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
        }
      }
  }
`