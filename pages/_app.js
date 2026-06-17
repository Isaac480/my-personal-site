import '../public/static/css/prism.css'
import 'remixicon/fonts/remixicon.css'

import { useEffect } from 'react'
import Router from 'next/router'
import * as gtag from '../lib/gtag'
import CommandBar from '../components/CommandBar'

Router.events.on('routeChangeComplete', url => gtag.pageview(url))

function trackVisit(path) {
  fetch('/api/track-visit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ path, referrer: document.referrer }),
  }).catch(() => {})
}

Router.events.on('routeChangeComplete', trackVisit)

const Noop = ({ children }) => children

export default function MyApp({ Component, pageProps }) {
  const Layout = Component.Layout || Noop

  useEffect(() => {
    trackVisit(window.location.pathname)
  }, [])

  return (
    <CommandBar>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CommandBar>
  )
}
