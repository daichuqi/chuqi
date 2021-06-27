import React from 'react'
import { AppleFilled } from '@ant-design/icons'
import Helmet from 'react-helmet'
import { StaticImage } from 'gatsby-plugin-image'

import Layout from '../components/Layout'
import '../styles/home.scss'

const Home = () => (
  <Layout>
    <Helmet title="Home | Chuqi" />
    <div className="home-container">
      <div className="main">
        <div className="left-section">
          <div className="about">About</div>
          <div className="text">Richie is a dreamer.</div>
          <div className="text">
            He is currently working for
            <span style={{ margin: '0 5px' }}>
              <AppleFilled />
            </span>
            in Sunnyvale CA.
            <br />
            LOVE design, art and tech.
          </div>
          <br />
          <div className="text">
            <div className="contact">Contact</div>
            <div>daichuqi@gmail.com</div>
          </div>
        </div>
        <div className="right-section">
          <StaticImage src="../images/profile_img.jpg" alt="me" />
        </div>
      </div>
    </div>
  </Layout>
)

export default Home
