import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";

import Layout from "../components/Layout";
import Features from "../components/Features";
import BlogRoll from "../components/BlogRoll";

export const IndexPageTemplate = ({
  image,
  heading,
  mainpitch,
  description,
  intro,
  main: {
    image1: { image: image1 },
    image2: { image: image2 },
    image3: { image: image3 }
  }
}) => (
  <div>
    <div className="tile is-ancestor">
      <figure className="tile image">
        <img
          src={
            !!image1.childImageSharp ? image1.childImageSharp.fluid.src : image1
          }
        />
      </figure>
      <div className="tile is-parent is-vertical">
        <figure className="tile image ">
          <img
            src={
              !!image2.childImageSharp
                ? image2.childImageSharp.fluid.src
                : image2
            }
          />
        </figure>
        <figure className="tile image ">
          <img
            src={
              !!image.childImageSharp ? image.childImageSharp.fluid.src : image
            }
          />
        </figure>
      </div>
      <figure className="tile image">
        <img
          src={
            !!image3.childImageSharp ? image3.childImageSharp.fluid.src : image3
          }
        />
      </figure>
    </div>

    <section className="section section--gradient">
      <div className="container">
        <div className="section">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="content">
                <div className="content">
                  <div className="tile">
                    <h1 className="title">{mainpitch.title}</h1>
                  </div>
                  <div className="tile">
                    <h3 className="subtitle">{mainpitch.description}</h3>
                  </div>
                </div>
                <div className="columns">
                  <div className="column is-12">
                    <h3 className="has-text-weight-semibold is-size-2">
                      {heading}
                    </h3>
                    <p>{description}</p>
                  </div>
                </div>
                <Features gridItems={intro.blurbs} />
                <div className="columns">
                  <div className="column is-12 has-text-centered">
                    <Link className="btn" to="/products">
                      See all products
                    </Link>
                  </div>
                </div>
                <div className="column is-12">
                  <h3 className="has-text-weight-semibold is-size-2">
                    Latest stories
                  </h3>
                  <BlogRoll />
                  <div className="column is-12 has-text-centered">
                    <Link className="btn" to="/blog">
                      Read more
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  heading: PropTypes.string,
  mainpitch: PropTypes.object,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array
  }),
  main: PropTypes.object
};

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;
  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        heading={frontmatter.heading}
        mainpitch={frontmatter.mainpitch}
        description={frontmatter.description}
        intro={frontmatter.intro}
        main={frontmatter.main}
      />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object
    })
  })
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        heading
        mainpitch {
          title
          description
        }
        description
        intro {
          blurbs {
            image {
              childImageSharp {
                fluid(maxWidth: 240, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            text
          }
          heading
          description
        }
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        main {
          image1 {
            image {
              childImageSharp {
                fluid(maxWidth: 240, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            alt
          }
          image2 {
            image {
              childImageSharp {
                fluid(maxWidth: 240, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            alt
          }
          image3 {
            image {
              childImageSharp {
                fluid(maxWidth: 240, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            alt
          }
        }
      }
    }
  }
`;
