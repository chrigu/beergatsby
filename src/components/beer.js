import PropTypes from "prop-types"
import React from "react"
import { Link } from "gatsby"

const Beer = ({title, slug}) => (
  <div>
      <h1>
        <Link to={slug}>
          {title}
        </Link>
      </h1>
  </div>
)

Beer.propTypes = {
  name: PropTypes.string,
  slug: PropTypes.string,
}

export default Beer
