import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import { graphql } from 'gatsby'
import Brewery from "../components/brewery"
import Beer from "../components/beer"
import SEO from "../components/seo"

const IndexPage = ({data: {breweries, beers}}) => {
  console.log(breweries, beers)
  return (
  <Layout>
    <SEO title="Home" keywords={[`beer`]} />
    <h1>Hi beerlover</h1>
    <p>This site is about beer</p>
    <h2>Featured Breweries</h2>
    <div className="breweries">
    {breweries.edges.map(({node}, index) => {
          return <Brewery key={index} title={node.frontmatter.title} slug={node.fields.slug}/>
        })}
    </div>
    <h2>Featured Beers</h2>
    <div className="beers">
    {beers.edges.map(({node}, index) => {
          return <Beer key={index} title={node.frontmatter.title} slug={node.fields.slug}/>
        })}
    </div>
  </Layout>
)}

export default IndexPage

export const query = graphql`
  query {
    breweries: allMarkdownRemark(
      limit: 2
      filter: {fields: {pageType: {eq: "brewery"}}}) {
      edges {
        node {
          fields {
            slug
            pageType
          }
          frontmatter {
            title
          }
        }
      }
    }
    
    beers: allMarkdownRemark(
      limit: 4
      filter: {fields: {pageType: {eq: "beer"}}}) {
      edges {
        node {
          fields {
            slug
            pageType
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`