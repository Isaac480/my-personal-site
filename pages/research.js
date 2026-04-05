import { styled } from '../stitches.config'
import Head from 'next/head'
import Base from '../layouts/Base'
import stripHtml from '../lib/strip-html'
import { getAllPosts, getPostBySlug } from '../lib/blog'
import ListItem from '../components/ListItem'
import FeaturedArticle from '../components/FeaturedArticle'
import { ListGroup } from '../components/ListGroup'

export async function getStaticProps() {
  const allPosts = getAllPosts(['date', 'skip', 'slug', 'title'])

  const featuredParams = [
    'date',
    'slug',
    'title',
    'image',
    'content',
    'description',
  ]

  const featuredPosts = [
    getPostBySlug('oishi-research', featuredParams),
    getPostBySlug('lindenwood-research', featuredParams),
  ]

  return {
    props: {
      title: 'Research // Isaac Cohen',
      tagline: 'Observe. Analyze. Understand.',
      image: '/static/images/articles-bw.jpg',
      primaryColor: 'yellow',
      secondaryColor: 'pink',
      featuredPosts,
      allPosts,
    },
  }
}

function Articles(props) {
  const renderFeatured = () => {
    return props.featuredPosts.map((post, index) => {
      return (
        <FeaturedArticle
          key={index}
          index={index}
          href={`/${post.slug}/`}
          title={post.title}
          description={post.description}
          image={post.image}
          stats={post.stats}
          content={post.content}
        />
      )
    })
  }

  const renderAll = () => {
    return props.allPosts.map((post, index) => {
      if (!post.skip) {
        return (
          <ListItem
            key={index}
            index={index}
            href={`/${post.slug}/`}
            title={post.title}
            date={post.date}
          />
        )
      }
    })
  }

  const { title, image } = props
  const description = `If we see ourselves for who we truly are, we can better strive toward who we want to be. By studying the mechanisms underlying cognition and behavior, we gain insight into the forces that shape human experience, including what contributes to meaning, wellbeing, and fulfillment.`
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={stripHtml(description)} name="description" />
        <meta content={stripHtml(description)} property="og:description" />
        <meta content="https://zenorocha.com/articles" property="og:url" />
        <meta content={`https://zenorocha.com${image}`} property="og:image" />
      </Head>

      <>
        <p dangerouslySetInnerHTML={{ __html: description }} />

        <h2>Featured Research</h2>
        <FeaturedArticles>{renderFeatured()}</FeaturedArticles>

        
      </>
    </>
  )
}

const FeaturedArticles = styled('div', {
  margin: '10px 0 0 -20px',
  '@bp2': { display: 'flex', justifyContent: 'space-between' },
})

Articles.Layout = Base

export default Articles
