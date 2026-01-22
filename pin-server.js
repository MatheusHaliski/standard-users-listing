import express from 'express'
import cors from 'cors'
import crypto from 'crypto'

const app = express()
app.use(cors())
app.use(express.json())

// ⚠️ PIN REAL (nunca exponha no front)
const PIN_SECRET = '18405'

// endpoint que retorna o HASH do PIN
app.get('/pin-hash', (_req, res) => {
  const hash = crypto
      .createHash('sha256')
      .update(PIN_SECRET)
      .digest('hex')

  res.json({ hash })
})

app.listen(5174, () => {
  console.log('🔐 PIN server running at http://localhost:5174')
})
