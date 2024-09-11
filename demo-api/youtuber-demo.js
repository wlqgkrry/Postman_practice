// express 모듈 세팅
const express = require('express')
const app = express()

app.listen(1234)



// 데이터 세팅
let youtuber1 = {
    channelTitle : "십오야",
    sub : "593만명",
    videoNum : "993개",
}

let youtuber2 = {
    channelTitle : "침착맨",
    sub : "227만명",
    videoNum : "6.6천개",
}

let youtuber3 = {
    channelTitle : "테오",
    sub : "54.8만명",
    videoNum : "726개",
}


// map은 key - value 쌍으로, json과 비슷하게 생겼다.
// map youtuber과 url 연결 세팅
let db = new Map()

//db의 id
var id = 1      //블록 스코프로 인해 let은 쓰지 못하고 var만 쓸 수 있음

db.set(id++, youtuber1)
db.set(id++, youtuber2)
db.set(id++, youtuber3)


// REST API 설계 - 전체 조회
app.get('/youtubers', function(req, res){
    res.json({
        message : "text"
    })
})


// REST API 설계 - 개별 조회
app.get('/youtuber/:id', function(req, res){
    let {id} = req.params
    id = parseInt(id)

    const youtuber = db.get(id)
    if(youtuber == undefined){
        res.json({
            message : "유튜버 정보를 찾을 수 없습니다."
        })
    }
    else{
        res.json(youtuber)
    }
})

// http 외 모듈인 '미들웨어' : json 설정
// http외에 사용할 다른 미들웨어(express - 다른 모듈들)을 어떻게 세팅할지 말해주는 함수 = use
// use함수를 통해 express.json()형태로 사용할 것이다
app.use(express.json())


// post로 다른 유튜버 정보 받기
app.post('/youtuber', (req, res) => {

    console.log(req.body)
    
    // 등록..? Map(db)에 저장(set) 해주셔야 해요
    db.set(id++, req.body)


    // let {id} = req.params
    // id = parseInt(id)
    
    res.json({
        message : `${db.get(id-1).channelTitle}님, 유튜버 생활을 응원합니다!`
    })
})





