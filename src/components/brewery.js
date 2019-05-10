import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Brewery = ({title, slug}) => (
  <div>
      <h1>
        <Link to={slug}>
          {title}
        </Link>
      </h1>
  </div>
)

Brewery.propTypes = {
  name: PropTypes.string,
  slug: PropTypes.string,
}

export default Brewery
