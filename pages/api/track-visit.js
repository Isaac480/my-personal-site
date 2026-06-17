import { google } from 'googleapis'

const SHEET_RANGE = 'Visits!A:H'

let sheetsClient

function getSheetsClient() {
  if (sheetsClient) return sheetsClient

  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })

  sheetsClient = google.sheets({ version: 'v4', auth })
  return sheetsClient
}

export default async function trackVisit(req, res) {
  if (req.method !== 'POST') {
    res.status(405).end()
    return
  }

  if (
    !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ||
    !process.env.GOOGLE_PRIVATE_KEY ||
    !process.env.GOOGLE_SHEET_ID
  ) {
    console.error('track-visit: missing Google env vars', {
      hasEmail: !!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      hasKey: !!process.env.GOOGLE_PRIVATE_KEY,
      hasSheetId: !!process.env.GOOGLE_SHEET_ID,
    })
    res.status(200).json({ ok: false, message: 'Tracking not configured' })
    return
  }

  try {
    const { path, referrer } = req.body

    const ip =
      req.headers['x-real-ip'] ||
      req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
      'unknown'
    const country = req.headers['x-vercel-ip-country'] || ''
    const region = req.headers['x-vercel-ip-country-region'] || ''
    const city = decodeURIComponent(req.headers['x-vercel-ip-city'] || '')
    const userAgent = req.headers['user-agent'] || ''
    const timestamp = new Date().toISOString()

    await getSheetsClient().spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: SHEET_RANGE,
      valueInputOption: 'RAW',
      requestBody: {
        values: [[timestamp, ip, country, region, city, path, referrer, userAgent]],
      },
    })

    console.log('track-visit: logged', path, ip)
    res.status(200).json({ ok: true })
  } catch (e) {
    console.error('track-visit: failed', e.message)
    res.status(500).json({ message: e.message })
  }
}
