import Head from 'next/head'
import Base from '../layouts/Base'
import stripHtml from '../lib/strip-html'
import { bytetalk, appearances, youtube } from '../data/podcasts'
import ListItem from '../components/ListItem'
import { ListGroup } from '../components/ListGroup'

export async function getStaticProps() {
  const meta = {
    title: 'Running // Isaac Cohen',
    tagline: 'Consistency. Patience. Results.',
    image: '/static/images/podcasts-bw.jpg',
    primaryColor: 'pink',
    secondaryColor: 'purple',
  }

  return { props: { ...meta }, revalidate: 60 }
}

function Podcasts(props) {
  const renderFeatured = items => {
    const featured = [
      'TFRRS Profile',
      'Strava Profile',
      'UCTF Profile',
    ]

    return items
      .filter(item => featured.includes(item.title))
      .map((item, index) => {
        return (
          <ListItem
            key={index}
            index={index}
            href={item.url}
            title={item.title}
            date={item.date}
          />
        )
      })
  }

  const renderEpisode = items => {
    return items.map((item, index) => {
      return (
        <ListItem
          key={index}
          index={index}
          href={item.url}
          title={item.title}
          date={item.date}
        />
      )
    })
  }

  const { title, image } = props
  const description = `I began competing for the Hunter Hawks in high school, and today I push my boundaries with the <strong>Maroons</strong> at the Division III level, with the ultimate goal of breaking the elusive 4 minute mile barrier.`

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={stripHtml(description)} name="description" />
        <meta content={stripHtml(description)} property="og:description" />
        <meta content="https://zenorocha.com/podcasts" property="og:url" />
        <meta content={`https://zenorocha.com${image}`} property="og:image" />
      </Head>

      <>
        <p dangerouslySetInnerHTML={{ __html: description }} />

<video
  src="/static/video/1600.mp4"
  controls
  width="784"      // adjust as needed
  height="444"     // adjust as needed
  style={{ borderRadius: '8px', margin: '16px 0' }}
>
  Your browser does not support the video tag.
</video>

1st place in the 1600m | 4:19.61 | Donald Douglas Games 2023

        <h2>Featured Media</h2>
        <ListGroup>{renderFeatured(appearances)}</ListGroup>
        
        <h2>Achievements</h2>
        <p></p>
        <ul>
          <li>3-time City Champion</li>
          <li>3rd place at New York State Championships in the 1600m</li>
          <li>NBON All-American in the 4xMile Relay</li>
        </ul>

        <h2>Personal Records</h2>
        <p></p>
        <ul>
          <li><strong>800m</strong> – 1:57.54</li>
          <li><strong>1500m</strong> – 3:55.25</li>
          <li><strong>Mile</strong> – 4:11.88</li>
          <li><strong>3000m</strong> – 8:25.47</li>
          <li><strong>5000m</strong> - 14:56.79</li>
          <li><strong>8k XC</strong> – 25:09.6</li>
        </ul>
      </>
    </>
  )
}

Podcasts.Layout = Base

export default Podcasts
