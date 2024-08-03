/**
 * honestly i have no idea how I'm going to code the movement of the pieces
 * so lets start with the rook, 
 * when i click the piece i want other divs nearby to light up and show
 * that I can move my piece there, how do i detect which divs to move to?
 * 
 * it might be easier to tag each square with a position, this way I can 
 * start with the current positon and then loop until I find nearby positons
 * that fit what i need
 * 
 * ok so when i click a piece, it will check all possible spots, mark them
 * with a tag, then if i click a place with a tag it will move it there
 * 
 * movement system, when selecting a piece, change global state to position, 
 * 
 * possible things to happen
 * 
 *  -> user selects a square with a grey dot
 *  -> user selects a sqaure without a grey dot, in which we remove all grey dots
 *     like we are doing already, and then either change state to that piece or
 *     change state to empty
 */
let pieceToMove = 'none'
let pieceToMovePos = '00'
let container = document.querySelector('#container')

const knightMoves = [
    [1,2],[-1,-2],[-1,2],[1,-2],[2,1],[-2,-1],[-2,1],[2,-1]
]
const blackPieces = [
    'bp', 'bb', 'bkn', 'br', 'bq', 'bk'
]

const whitePieces = [
    'wp', 'wb', 'wkn', 'wr', 'wq', 'wk'
]

const notationToPieceName = {
    'bp': 'Black Pawn',
    'bb': 'Black Bishop',
    'bkn': 'Black Knight',
    'br': 'Black Rook',
    'bq': 'Black Queen',
    'bk': 'Black King',
    'wp': 'White Pawn',
    'wb': 'White Bishop',
    'wkn': 'White Knight',
    'wr': 'White Rook',
    'wq': 'White Queen',
    'wk': 'White King'
}

const gridToChessNotation = {
    '00': 'a8', '01': 'b8', '02': 'c8', '03': 'd8', '04': 'e8', '05': 'f8', '06': 'g8', '07': 'h8',
    '10': 'a7', '11': 'b7', '12': 'c7', '13': 'd7', '14': 'e7', '15': 'f7', '16': 'g7', '17': 'h7',
    '20': 'a6', '21': 'b6', '22': 'c6', '23': 'd6', '24': 'e6', '25': 'f6', '26': 'g6', '27': 'h6',
    '30': 'a5', '31': 'b5', '32': 'c5', '33': 'd5', '34': 'e5', '35': 'f5', '36': 'g5', '37': 'h5',
    '40': 'a4', '41': 'b4', '42': 'c4', '43': 'd4', '44': 'e4', '45': 'f4', '46': 'g4', '47': 'h4',
    '50': 'a3', '51': 'b3', '52': 'c3', '53': 'd3', '54': 'e3', '55': 'f3', '56': 'g3', '57': 'h3',
    '60': 'a2', '61': 'b2', '62': 'c2', '63': 'd2', '64': 'e2', '65': 'f2', '66': 'g2', '67': 'h2',
    '70': 'a1', '71': 'b1', '72': 'c1', '73': 'd1', '74': 'e1', '75': 'f1', '76': 'g1', '77': 'h1'
  }



container.addEventListener('mouseover',function(event){
    container.classList.add('grey')
})

document.addEventListener('keydown', function(event){
    console.log(board)
})


let board = [
    ['  ', 'bkn', '  ', 'bk', '  ', 'bb', 'bkn', 'br'],
    ['bp', '  ' , 'bp', 'bp', 'bp', 'bp', 'bp' , 'bp'],
    ['  ', 'bp' , '  ', '  ', '  ', '  ', '  ' , '  '],
    ['  ', 'bb' , 'br', '  ', 'bq', '  ', '  ' , '  '],
    ['  ', '  ' , '  ', '  ', 'wq', '  ', '  ' , '  '],
    ['wkn', '  ' , '  ', '  ', '  ', '  ', '  ' , '  '],
    ['wp', 'wp' , 'wp', 'wp', 'wp', 'wp', 'wp' , 'wp'],
    ['wr', '  ', 'wb', 'wk', 'wq', 'wb', 'wkn', 'wr']
]

/**
 * board[row][column]
 *   'num1 num2'
 *   num1 -> row    -> y
 *   num2 -> column -> x
 */

function checkSide(piece, x, y){
    let square = document.querySelector('.p'+x+''+y)
    let dotDiv = square.querySelector('div')
    if(checkForPiece(square)){
        if(!(blackPieces.includes(piece) && blackPieces.includes(board[x][y])) && !(whitePieces.includes(piece) && whitePieces.includes(board[x][y]))){
            dotDiv.classList.add('grey-dot')
        }
        return false
    }
    dotDiv.classList.add('grey-dot')
    return true
}

function showMoves(piece, x, y){

    if(piece === 'wp'){
        //if the pawn is on the starting rank, let it go two places, otherwise just one place,
        //I have to check if the pawn gets to the end 
        if(board[x-1][y]){
            document.querySelector('.p'+(x-1)+''+y+'>div').classList.add('grey-dot')
            if(board[x-2][y]){
                document.querySelector('.p'+(x-2)+''+y+'>div').classList.add('grey-dot')
            }
        }
        if(x === 6){
            for(let i = 0 ; i < 2 ; i++){

            }
        }
    }

    if(piece === 'br' || piece === 'wr' || piece === 'wq' || piece === 'bq'){
        let tempX = x
        let tempY = y
        //down
        for(let i = x+1 ; i < 8 ; i++){
            if(!checkSide(piece, i, y)){
                break
            }
        }
        //up
        for(let j = x-1 ; j >=0 ; j--){
            if(!checkSide(piece, j,y)){
                break
            }
        }
        //right
        for(let k = y+1 ; k < 8 ; k++){
            if(!checkSide(piece, x,k)){
                break
            }
        }
        //left
        for(let l = y-1 ; l >= 0; l--){
            if(!checkSide(piece, x,l)){
                break
            }
        }
    }

    if(piece === 'bb' || piece === 'wb'  || piece === 'wq' || piece === 'bq'){
        let tempX = x
        let tempY = y
        //up left
        while(tempX-1 >= 0 && tempY-1 >= 0){
            if(!checkSide(piece, tempX-1, tempY-1)){
                break
            }
            tempX -= 1
            tempY -= 1
        }
        tempX = x
        tempY = y
        //down right
        while(tempX+1 <= 7 && tempY+1 <= 7){
            if(!checkSide(piece, tempX+1, tempY+1)){
                break
            }
            tempX += 1
            tempY += 1
        }
        tempX = x
        tempY = y
        //down left
        while(tempX+1 <= 7 && tempY-1 >= 0){
            if(!checkSide(piece, tempX+1, tempY-1)){
                break
            }
            tempX += 1
            tempY -= 1
        }
        tempX = x
        tempY = y
        //up right
        while(tempX-1 >= 0 && tempY+1 <= 7){
            if(!checkSide(piece, tempX-1, tempY+1)){
                break
            }
            tempX -= 1
            tempY += 1
        }
    }

    if(piece === 'wkn' || piece === 'bkn'){
        for(let p = 0 ; p <= 7 ; p++){
            let tempX = x + knightMoves[p][0]
            let tempY = y + knightMoves[p][1]
            if(tempX >= 0 && tempX <= 7 && tempY >= 0 && tempY <= 7){
                let square = document.querySelector('.p'+tempX+''+tempY)
                let dotDiv = square.querySelector('div')
                
                if((blackPieces.includes(piece) && blackPieces.includes(board[tempX][tempY])) || (whitePieces.includes(piece) && whitePieces.includes(board[tempX][tempY]))){
                    
                }else{
                    dotDiv.classList.add('grey-dot')
                }
            }
        }
    }
}

function checkForPiece(element){
    return element.contains(element.querySelector('img'))
}

function removeDots(){
    let allDots = document.querySelectorAll('.square>.grey-dot')
    allDots.forEach((element) => {
        element.classList.remove('grey-dot')
    })
}

function removeGrey(){
    let allGreys = document.querySelectorAll('.grey')
    allGreys.forEach((element) => {
        element.classList.remove('grey')
    })
}


// function checkSquare(direction, maxMoves){
//     for()
// }

for(let i = 0 ; i < 8 ; i++){
    for(let j = 0 ; j < 8 ; j++){
        let newSquare = document.createElement('div')

        //dotHolder div can be turned into a dot by adding class grey-dot
        let dotHolder = document.createElement('div')

        newSquare.classList.add('square')
        newSquare.classList.add('p' + i + '' + j)

        if(board[i][j] !== '  '){
            let newIMG = document.createElement('img')
            newIMG.src = '60x60pieces/' + board[i][j] + '.png'
            newIMG.alt = 'nope'
            newSquare.append(newIMG)
            // console.log(board[i][j])
        }

        newSquare.onmouseover = function(){
            newSquare.classList.add('lightgrey')
            //console.log(newSquare.classList)
        }

        newSquare.onmouseleave = function(){
            newSquare.classList.remove('lightgrey')
        }

        newSquare.onclick = function(){

            // console.log(newSquare.querySelector('div').classList.contains('grey-dot'))
            // console.log(newSquare.querySelector('div').classList)
            // console.log(pieceToMovePos)
            
            if(newSquare.querySelector('div').classList.contains('grey-dot')){
                let ii = parseInt(pieceToMovePos.substring(0,1))
                let jj = parseInt(pieceToMovePos.substring(1,2))
                let piece = board[ii][jj]

                //remove old image 
                if(newSquare.querySelector('img') !== null){
                    newSquare.removeChild(newSquare.querySelector('img'))
                }

                let oldSquare = document.querySelector('.p' + ii + '' + jj)
                let image = oldSquare.querySelector('img')
                oldSquare.removeChild(image)
                newSquare.appendChild(image)
                removeGrey()
                removeDots()
                board[ii][jj] = '  '
                board[i][j] = piece
            }else if(newSquare.classList.contains('grey')){
                newSquare.classList.remove('grey')
                removeDots()
            }else{
                removeGrey()
                removeDots()
                newSquare.classList.add('grey')
                showMoves(board[i][j], i, j)
            }
            pieceToMove = board[i][j]
            pieceToMovePos = '' + i + j
        }
        
        

        if((i % 2 === 0 && j % 2 === 0) || (i % 2 === 1 && j % 2 === 1)){
            newSquare.classList.add('green')
        }else{
            newSquare.classList.add('white')
        }

        //dotHolder div is supposed to be added after the img div so
        //it renders properly
        newSquare.append(dotHolder)
        container.append(newSquare)
        //console.log(newSquare)
    }
}

function removeImage(element){
    if(checkForPiece(element)){
        let pieceImage = element.querySelector('img')
        element.removeChild(pieceImage)
    }
}

function clearAllImg(){
    for(let i = 0 ; i < 8 ; i++){
        for(let j = 0 ; j < 8 ; j++){
            let square = document.querySelector('.p' + i + j)
            removeImage(square)
        }
    }
}

function redrawBoard(){
    for(let i = 0 ; i < 8 ; i++){
        for(let j = 0 ; j < 8 ; j++){
            if(board[i][j] !== '  '){
                let square = document.querySelector('.p' + i + j)
                if(!checkForPiece(square)){
                    let newIMG = document.createElement('img')
                    newIMG.src = '60x60pieces/' + board[i][j] + '.png'
                    newIMG.alt = 'nope'
                    square.append(newIMG)
                }
            }
        }
    }
}

// let dot = document.createElement('div')
// dot.classList.add('grey-dot')
// document.querySelector('.p22').append(dot)
// document.querySelector('.p23').append(dot)

