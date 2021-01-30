# mum-moom-mi (멈뭄미)

## description (설명)

"멈뭄미" 는 nodejs 기반으로 만들어진 api server 입니다.

데모를 위해 간단한 html 이 작성되어 있어 웹으로 접속할 수 있습니다.

### api spec

#### [post] /v1/cursed
```
body: {
  type = '멈뭄미', // 변환 타입입니다. api를 통해 타입 리스트를 받을 수 있습니다.
  text, // 변환할 텍스트입니다.
  user // 데모를 위한 paramter 입니다. true 일경우 <pre> 태그로 감싸진 html 이 반환, 아닐 시 json 이 반환됩니다.
}

response: {
  success, / /성공 여부입니다.
  text // 변환된 텍스트입니다.
}
```

#### [get] /v1/list
```
response: [
  {
    name: '멈뭄미', // 저주의 이름입니다. 변환 api 사용시 type 이란 이름으로 사용됩니다.
    char: 'ㅁ', // 바뀌는 자음입니다.
    src: 'http://mmm.zifori.me/images/mmm.jpg' // 제공되는 이미지 주소입니다.
  },
  { name: '엉엉이', char: 'ㅇ', src: 'http://mmm.zifori.me/images/ooo.png' },
  { name: '헣헣히', char: 'ㅎ', src: 'http://mmm.zifori.me/images/hhh.jpg' },
  { name: '섯섯시', char: 'ㅅ', src: 'http://mmm.zifori.me/images/sss.jpg' },
  { name: '법붑비', char: 'ㅂ', src: 'http://mmm.zifori.me/images/bbb.png' }
]
```

## install (설치)

```
> npm install
```

## run (실행)

아래와 같이 입력후 http://localhost:8000 으로 접속합니다.

```
> npm start
```

## feedback (피드백)

[git issue](https://github.com/ScratchedMoron/mum-moom-mi/issues)를 통해 남겨주세요
