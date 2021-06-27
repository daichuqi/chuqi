import React from 'react'

import { GatsbyImage } from 'gatsby-plugin-image'
import './style.scss'

const HeaderImage = ({ image, children }) => (
  <div className="HeaderImage">
    <div className="background-image-container">
      {image ? <GatsbyImage image={image} className="progressive-image" /> : null}
    </div>
    {children}
  </div>
)

export default HeaderImage
