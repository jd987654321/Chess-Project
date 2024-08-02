/**
 * notes for myself when coming back to work on this,
 * 
 * we need to get the checkboard thing done asap, but the lines are
 * blurry due to some weird way fillRect draws things
 * 
 * theres an article about how to offset it, implement that
 * 
 * 
 * 
 * 
 */


/**
 * Dimensions of the pieces (width x height)
 *  -pawn:   74  x 96      ~   75 x 100
 *  -bishop: 103 x 104     ~   100 x 100
 *  -rook:   86 x 95       ~   85 x 95
 *  -knight: 100 x 101     ~   100 x 100
 *  -queen: 116 x 105      ~   115 x 105
 *  -king: 104 x 105       ~   100 x 100
 */

let canvas = document.getElementById('canvas')
let ct = canvas.getContext('2d')

let gray = '#7E7E7E'
let green = '#78E367'
let white = '#EEECEC'

let canvasHeight = canvas.height
let canvasWidth = canvas.width
let chunkHeight = canvasHeight/8
let chunkWidth = canvasWidth/8

let boardh = canvas.offsetHeight
let boardw = canvas.offsetWidth


// canvas.addEventListener('mousemove', function(event){
//     let rect = canvas.getBoundingClientRect();
//     console.log((event.clientX-rect.left) + ' ' + (event.clientY-rect.top ))

// })


ct.fRect=function(x,y,w,h){
    x=parseInt(x)
    y=parseInt(y)
    ct.fillRect(x,y,w,h)
}

function drawSquare(color, x, y){
    ct.fillStyle = color
    ct.fRect(x*chunkWidth, y*chunkHeight, chunkWidth, chunkHeight)
}

function drawCheckerboard(width, height){
    for(let i = 0 ; i < 8 ; i++){
        for(let j = 0 ; j < 8 ; j++){
            if((i % 2 === 0 && j % 2 === 0) || (i % 2 === 1 && j % 2 === 1)){
                drawSquare(green, i, j)
            }else{
                drawSquare(white, i, j)
            }
        }
    }
    // ctx.fill()
}

drawCheckerboard(boardw, boardh)

ct.dImage=function(image, x,y,w,h){
    x=parseInt(x)
    y=parseInt(y)
    ct.drawImage(image, x,y,w,h)
}

ct.imageSmoothingEnabled = false
let bishop = new Image()
bishop.src = 'pieces/black_bishop.png'
bishop.onload = function(){
    ct.dImage(bishop, 4.5, 3.5, 103/2, 104/2)
}

let pawn = new Image()
pawn.src = 'pieces/black_pawn.png'
pawn.onload = function(){
    ct.dImage(pawn, 14+ chunkWidth, 6+ chunkHeight, 74/2, 96/2)
}

let knight = new Image()
knight.src = 'pieces/black_knight.png'
knight.onload = function(){
    ct.dImage(knight, 3.5 , 4+chunkHeight, 100/2,101/2)
}

let rook = new Image()
rook.src = 'pieces/black_rook.png'
rook.onload = function(){
    
    ct.dImage(rook, 11+chunkWidth, 6.5, 85/2, 95/2)
}

let queen = new Image()
queen.src = 'pieces/black_queen.png'
queen.onload = function(){
    ct.dImage(queen, 3.5+chunkWidth*2, 3+chunkHeight, 116/2, 105/2)
}

// let king = new Image()
// king.src = 'pieces/black_king.png'
// king.onload = function(){
//     ct.dImage(king, chunkWidth*3, chunkHeight*2, 104, 105)
// }






