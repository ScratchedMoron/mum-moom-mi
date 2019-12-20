const Hangul = require('hangul-js')
const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.get('/v1/cursed', (req, res) => {
  const { query: { type, text, user } } = req
  const parsedText = Hangul.d(text, true)
  for (const i in parsedText) {
    for (const j in parsedText[i]) {
      if (parsedText[i][j] === 'ㅇ') parsedText[i][j] = 'ㅁ'
    }
    parsedText[i] = Hangul.a(parsedText[i])
  }
  if (user) return res.send('<pre style="font-size:18px;">' + parsedText.join('') + '</pre>')
  res.json({ success: true, text: parsedText.join('') })
})

const port = 8011
app.listen(port, () => {
  console.log(`server is running on port : ${port}`)
})
