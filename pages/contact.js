import React from 'react'
import Head from 'next/head'
import Base from '../layouts/Base'
import stripHtml from '../lib/strip-html'
import Toast from '../components/Toast'
import { Box } from '../components/Box'
import { styled } from '../stitches.config'

export async function getStaticProps() {
  const meta = {
    title: 'Contact // Isaac Cohen',
    tagline: 'Emails. Emails. Emails.',
    image: '/static/images/reminder-bw.jpg',
    primaryColor: 'cyan',
    secondaryColor: 'green',
  }

  return { props: meta }
}

function Contact(props) {
  const { title, image } = props
  const description = `Send me an email and I'll do my best to respond quickly.`
  const [isEmailSent, setIsEmailSent] = React.useState(undefined)
  const [showToast, setShowToast] = React.useState(false)

  const onSendEmail = async (e) => {
    e.preventDefault()

    try {
      const isProd = process.env.NODE_ENV === 'production'
      const base = isProd ? 'https://zenorocha.com' : 'http://localhost:3000'

      await fetch(`${base}/api/email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: e.target.name.value,
          email: e.target.email.value,
          message: e.target.message.value,
        }),
      })

      setIsEmailSent(true)
      setShowToast(true)
    }
    catch(e) {
      console.error(e)
      setIsEmailSent(false)
      setShowToast(true)
    }
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={stripHtml(description)} name="description" />
        <meta content={stripHtml(description)} property="og:description" />
        <meta content="https://zenorocha.com/contact" property="og:url" />
        <meta content={`https://zenorocha.com${image}`} property="og:image" />
      </Head>

      <Box>
        <p dangerouslySetInnerHTML={{ __html: description }} />
        <h2>Personal email:</h2>
        Isaac.coh3n@gmail.com
        <h2>Professional email:</h2>
        Isaaccohen@uchicago.edu
      </Box>
    </>
  )
}

const Form = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '400px'
})

const FormGroup = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '10px',
})

const Label = styled('label', {
  color: '$secondary',
  textTransform: 'uppercase',
  fontSize: '12px',
  fontWeight: '500'
})

const Input = styled('input', {
  color: '$primary',
  background: 'none',
  border: '1px solid $secondary',
  borderRadius: '$borderRadius',
  padding: '10px',
  '&:focus': { outline: 'none', borderColor: '$cyan' },
})

const Textarea = styled('textarea', {
  color: '$primary',
  background: 'none',
  border: '1px solid $secondary',
  borderRadius: '$borderRadius',
  padding: '10px',
  '&:focus': { outline: 'none', borderColor: '$cyan' },
})

const Button = styled('button', {
  color: '$background',
  background: '#fff',
  border: '1px solid #fff',
  borderRadius: '$borderRadius',
  cursor: 'pointer',
  padding: '10px',
  marginTop: '5px',
  transition: 'all 0.2s ease-in-out',
  '&:hover': { background: 'transparent', borderColor: '$cyan', color: '$cyan' },
  '&:focus': { background: 'transparent', borderColor: '$cyan', color: '$cyan', outline: 'none' },
})

Contact.Layout = Base

export default Contact
