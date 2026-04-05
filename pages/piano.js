import React from 'react'
import Head from 'next/head'
import Base from '../layouts/Base'
import FeaturedProject from '../components/FeaturedProject'
import { FeaturedProjects } from '../components/FeaturedProjects'
import stripHtml from '../lib/strip-html'
import items from '../data/projects'
import styles from './piano.module.css'
import { bytetalk, appearances, youtube } from '../data/podcasts'
import { ListGroup } from '../components/ListGroup'
import Link from 'next/link'



export async function getStaticProps() {
  const meta = {
    title: 'Piano // Isaac Cohen',
    tagline: 'Interpret. Refine. Perform.',
    image: '/static/images/projects-bw.jpg',
    primaryColor: 'cyan',
    secondaryColor: 'green',
  }

  return { props: meta }
}

function Projects(props) {
  const renderFeatured = () => {
    const featured = ['Dracula', 'Clipboard.js', 'Resend', 'React Email']

    return items
      .map(item => {
        return item.projects.filter(project => featured.includes(project.title))
      })
      .filter(item => {
        if (item.length > 0) {
          return item
        }
      })
      .flat()
      .map((item, index) => {
        return <FeaturedProject key={index} project={item} />
      })
  }

  const renderAll = () => {
    return items.map((item, index) => {
      return (
        <div key={index}>
          <h4>{item.year}</h4>
          <ul>
            {item.projects.map((project, pIndex) => {
              return <ProjectItem key={pIndex} project={project} />
            })}
          </ul>
        </div>
      )
    })
  }

  const getTotalProjects = () => {
    let total = 0

    for (let i = 0; i < items.length; i++) {
      total = total + items[i].projects.length
    }

    return total
  }

  const { title, image } = props
  const description = `I began playing the <strong>piano</strong> at age four, but only in recent years have I understood its deeper place in my life. It provides a quiet refuge—a daily space to refine <strong>technique</strong>, explore new pieces, and lose myself in <strong>sound</strong>. Classically trained, I especially enjoy the works of romantic composers including Chopin, Liszt, and <strong>Scriabin</strong>. Currently, all my efforts are concentrated in preparing <a href="https://youtu.be/DpizevH7zeE?si=-m840yPJ3h2MCABU" target="_blank" rel="noopener noreferrer">Scriabin's Piano Concerto</a>, which I will perform in December 2026 with the University Symphony Orchestra.`

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={stripHtml(description)} name="description" />
        <meta content={stripHtml(description)} property="og:description" />
        <meta content="https://zenorocha.com/projects" property="og:url" />
        <meta content={`https://zenorocha.com${image}`} property="og:image" />
      </Head>


      <>
        <p dangerouslySetInnerHTML={{ __html: description }} />

        <h2>Featured Content</h2>
        <div className={styles.videoGrid}>
  <figure className={styles.videoFigure}>
    <div className={styles.videoWrapper}>
      <video
        src="/static/video/Rach-clip.MOV"
        className={styles.video}
        controls
        playsInline
        preload="metadata"
      />
    </div>
    <figcaption className={styles.caption}>
      Rachmaninoff Cello Sonata with Danielle Guo
    </figcaption>
  </figure>

  <figure className={styles.videoFigure}>
    <div className={styles.videoWrapper}>
      <video
        src="/static/video/Mozart-clip.MOV"
        className={styles.video}
        controls
        playsInline
        preload="metadata"
      />
    </div>
    <figcaption className={styles.caption}>
      Mozart Piano Concerto No. 17 - 2022 Kaufman Concerto Competition Winners Recital
    </figcaption>
  </figure>


</div>
<h2>
  <a
    href="https://www.youtube.com/@isaaccohenpiano908"
    target="_blank"
    rel="noopener noreferrer"
  >
    YouTube Page &#8599; {/* ↗ */}
  </a>
</h2> 
<h2>
  <a href="/piano-repertoire">
    Repertoire &#8599;
  </a>
</h2>
<h2>Experiences</h2>
    


        {renderAll()}
      </>
    </>
  )
}


function ProjectItem(props) {
  const { project } = props

  return (
    <li>
      <a href={project.url} target="_blank">
        {project.title}
      </a>
    </li>
  )
}

Projects.Layout = Base

export default Projects
