import React, { useState, useRef } from 'react'
import Helmet from 'react-helmet'
import { Button } from 'antd'
import { PauseOutlined, CaretRightOutlined } from '@ant-design/icons'
import get from 'lodash/get'
import { graphql, navigate } from 'gatsby'
import ReactAudioPlayer from 'react-audio-player'

import Countdown from '../components/Countdown'
import NextPrevButtons from '../components/NextPrevButtons'
import HeaderImage from '../components/HeaderImage'
import Tags from '../components/Tags'
import Layout from '../components/Layout'

import { isLoggedIn } from '../utils/auth'
import { useInterval } from '../utils/customHooks'
import '../styles/blog-post.scss'

const BlogPost = (props) => {
  const { prev, next } = props.pageContext
  const post = get(props, 'data.contentfulBlogPost')
  const { title, heroImage, publishDate, body, tags, music } = post

  const [playing, setPlaying] = useState(false)
  const [ready, setReady] = useState(false)
  const [duration, setDuration] = useState(0)
  const player = useRef(null)

  useInterval(() => setDuration(duration - 1), playing ? 1000 : null)

  const onVideoButtonClick = () => {
    if (!playing && player.current.audioEl) {
      player.current.audioEl.current.play()
      setPlaying(true)
    } else {
      player.current.audioEl.current.pause()
      setPlaying(false)
    }
  }

  if (typeof window !== `undefined` && !isLoggedIn()) {
    navigate(`/login`)
    return null
  }

  return (
    <Layout tabIndex="0">
      <Helmet title={`${title} | Chuqi `} />
      <HeaderImage image={heroImage?.gatsbyImageData}>
        {music && (
          <div className="player-control">
            <Countdown duration={duration} />
            <Button
              size="large"
              shape="circle"
              icon={playing ? <PauseOutlined /> : <CaretRightOutlined />}
              disabled={!ready}
              onClick={onVideoButtonClick}
            />

            <ReactAudioPlayer
              ref={player}
              onEnded={() => {
                setDuration(player.current.audioEl.current.duration)
                setPlaying(false)
              }}
              onCanPlay={() => {
                setReady(true)
                setDuration(player.current.audioEl.current.duration)
              }}
              src={`https:${music.file.url}`}
            />
          </div>
        )}
      </HeaderImage>

      <div className="blog-post-page template-wrapper">
        <div className="blog-detail-header">
          <div className="title">{title}</div>
          <div className="date">{publishDate}</div>
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: body.childMarkdownRemark.html }}
          />
        </div>
        <Tags tags={tags} style={{ marginTop: 30 }} />
        <NextPrevButtons prev={prev} next={next} />
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      excerpt
      slug
      tags
      place
      music {
        title
        file {
          url
        }
      }
      publishDate(formatString: "MMMM Do, YYYY")
      heroImage {
        gatsbyImageData(
          jpegProgressive: true
          layout: FULL_WIDTH
          placeholder: BLURRED
          resizingBehavior: SCALE
        )
      }
      body {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`

export default BlogPost
