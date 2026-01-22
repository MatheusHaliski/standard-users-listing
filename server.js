import express from 'express'
import cors from 'cors'
import crypto from 'crypto'

const app = express()
app.use(cors())
app.use(express.json())

// WARNING: for production, do NOT keep plaintext PIN in code.
// Use env var + rate limit + HTTPS.
const PIN_SECRET = process.env.PIN_SECRET || '18405'

app.get('/pin-hash', (_req, res) => {
  const hash = crypto.createHash('sha256').update(PIN_SECRET).digest('hex')
  res.json({ hash })
})

const PORT = process.env.PORT || 5174
app.listen(PORT, () => {
  console.log(`PIN server listening on http://localhost:${PORT}`)
})
