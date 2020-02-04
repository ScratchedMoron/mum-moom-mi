const Hangul = require('hangul-js')
const express = require('express')
const helmet = require('helmet')
const app = express()

const CURSED_TYPES = [
  { name: '멈뭄미', char: 'ㅁ', src: 'http://mmm.nigga.shop/images/mmm.jpg' },
  { name: '엉엉이', char: 'ㅇ', src: 'http://mmm.nigga.shop/images/ooo.png' },
  { name: '헣헣히', char: 'ㅎ', src: 'http://mmm.nigga.shop/images/hhh.jpg' },
  { name: '섯섯시', char: 'ㅅ', src: 'http://mmm.nigga.shop/images/sss.jpg' },
  { name: '법붑비', char: 'ㅂ', src: 'http://mmm.nigga.shop/images/bbb.png' }
]

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(helmet())
app.use(express.static('public'))

app.post('/v1/cursed', (req, res) => {
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

const port = 8000
app.listen(port, () => {
  console.log(`server is running on port : ${port}`)
})
