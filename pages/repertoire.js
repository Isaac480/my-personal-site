// pages/repertoire.js
import fs from 'fs'
import path from 'path'
import Head from 'next/head'
import matter from 'gray-matter'
import { convertMarkdownToHtml } from '../lib/blog'

export async function getStaticProps() {
  const markdownFilePath = path.join(process.cwd(), 'writing', 'piano-repertoire.md')
  const fileContents = fs.readFileSync(markdownFilePath, 'utf8')
  const { data, content } = matter(fileContents)
  const htmlContent = await convertMarkdownToHtml(content)

  return {
    props: {
      title: data.title,
      description: data.description,
      image: data.image,
      htmlContent,
    },
  }
}

export default function Repertoire({ title, description, image, htmlContent }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
      </Head>

      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
        <h1>{title}</h1>
        <p>{description}</p>

        {image && (
          <img
            src={image}
            alt={title}
            style={{
              width: '100%',
              maxWidth: '800px', // scale down if large
              height: 'auto',
              borderRadius: '8px',
              margin: '2rem 0',
            }}
          />
        )}

        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </main>
    </>
  )
}
