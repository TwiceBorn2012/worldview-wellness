import React from 'react'
import PropTypes from 'prop-types'
import { graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'

class VideoFeed extends React.Component {
  render() {
    const { data } = this.props
    const { nodes: videos } = data.allFeedRumble

    return (
      <div className="columns is-multiline">
        {videos &&
          videos.map((video) => (
            <div className="is-parent column is-6" key={video.id}>
              <article
                className={`blog-list-item tile is-child box notification`}
              >
                <header>
                  <div className="featured-thumbnail">
                    <PreviewCompatibleImage
                      imageInfo={{
                        image: video.media.content.attrs.url,
                        alt: `thumbnail for video ${video.title}`,
                      }}
                    />
                  </div>
                  <p className="post-meta">
                    <a
                      className="title has-text-primary is-size-4"
                      href={video.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {video.title}
                    </a>
                    <span> &bull; </span>
                    <span className="subtitle is-size-5 is-block">
                      {new Date(video.isoDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: '2-digit',
                      })}
                    </span>
                  </p>
                </header>
                <p>
                  <a
                    className="button"
                    href={video.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Watch Video →
                  </a>
                </p>
              </article>
            </div>
          ))}
      </div>
    )
  }
}

VideoFeed.propTypes = {
  data: PropTypes.shape({
    allFeedRumble: PropTypes.shape({
      nodes: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query VideoFeedQuery {
        allFeedRumble(limit: 4) {
          nodes {
            id
            title
            isoDate
            link
            media {
              thumbnail {
                attrs {
                  url
                }
              }
              content {
                attrs {
                  url
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <VideoFeed data={data} count={count} />}
  />
)
