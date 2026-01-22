import express from "express"
import path from "node:path"
import { fileURLToPath } from "node:url"

const app = express()
const PORT = process.env.PORT || 5174

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const distPath = path.join(__dirname, "dist")

app.use(express.static(distPath))

app.get("*", (_req, res) => {
  res.sendFile(path.join(distPath, "index.html"))
})

app.listen(PORT, () => {
  console.log(`Frontend server listening on http://localhost:${PORT}`)
})
