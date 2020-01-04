const Hangul = require('hangul-js')
const express = require('express')
const helmet = require('helmet')
const path = require('path')
const app = express()

const CURSED_TYPES = [
  { name: '멈뭄미', char: 'ㅁ' },
  { name: '엉엉이', char: 'ㅇ' },
  { name: '헣헣히', char: 'ㅎ' },
  { name: '섯섯시', char: 'ㅅ' },
  { name: '법붑비', char: 'ㅂ' }
]

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(helmet())

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'))
})

app.get('/v1/cursed', (req, res) => {
  const { body: { type = '멈뭄미', text, user } } = req

  const { char: cursedChar } = CURSED_TYPES.find(e => e.name === type)

  const parsedText = Hangul.d(text, true)

  for (let i = 0; i < parsedText.length; i++) {
    for (let j = 0; j < parsedText[i].length; j++) {
      if (
        (
          parsedText[i][j] === 'ㅇ' || (
            parsedText[i][j] === 'ㅁ' && type !== '헣헣히'
          )
        ) && !(
          parsedText[i].length === 4 && (j === 2 || j === 3)
        )
      ) parsedText[i][j] = cursedChar
    }
    parsedText[i] = Hangul.a(parsedText[i])
  }

  if (user) return res.send('<pre style="font-size:18px;">' + parsedText.join('') + '</pre>')
  res.json({ success: true, text: parsedText.join('') })
})

app.get('/v1/list', (req, res) => {
  res.json(CURSED_TYPES)
})

const port = 8011
app.listen(port, () => {
  console.log(`server is running on port : ${port}`)
})
