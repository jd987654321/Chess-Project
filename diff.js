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
 * 
 * i need to loop through every black piece and mark every location that they threaten,
 * 
 */


let pieceToMove = 'none'
let pieceToMovePos = '00'
let container = document.querySelector('#container')

const knightMoves = [
    [1, 2], [-1, -2], [-1, 2], [1, -2], [2, 1], [-2, -1], [-2, 1], [2, -1]
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

function isValidPosition(x, y) {
    return x >= 0 && x <= 7 && y >= 0 && y <= 7;
}


container.addEventListener('mouseover', function (event) {
    container.classList.add('grey')
})

document.addEventListener('keydown', function(){
    console.log(board)
    // displayPromotionBoard('white', 1)
})


let board = [
    ['  ', 'bkn', '  ', 'bk', '  ', 'bb', 'bkn', 'br'],
    ['bp', 'wp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp'],
    ['  ', 'bp', '  ', '  ', '  ', '  ', '  ', '  '],
    ['  ', 'bb', 'br', '  ', 'bq', '  ', '  ', '  '],
    ['  ', '  ', '  ', '  ', 'wq', '  ', '  ', '  '],
    ['wkn', '  ', '  ', 'bp', '  ', '  ', '  ', '  '],
    ['wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp'],
    ['wr', '  ', 'wb', 'wk', 'wq', 'wb', 'wkn', 'wr']
]

let blackThreats = [
    ['  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ']
]

let whiteThreats = [
    ['  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ']
]

function clearThreats(color){
    let threats;
    if(color === 'white'){
        threats = whiteThreats
    }else{
        threats = blackThreats
    }

    for(let i = 0 ; i <= 7 ; i++){
        for(let j = 0 ; j <= 7 ; j++){
            threats[i][j] = '  '
        }
    }
}

//for each piece go thru each 
function checkThreats(color){
    let threats;
    let pieces;
    if(color === 'white'){
        threats = whiteThreats
        pieces = whitePieces
    }else{
        threats = blackThreats
        pieces = blackPieces
    }

    //while loop to check each direction
    /**
     * things to check
     * -if piece is the same colored piece, then i stop and dont leave an x
     * -if piece is opposite colored and not the king, i stop and leave an x
     * -if opponent king is threatened change game state to check
     * 
     * checking pawn moves
     * -two diagonals in front
     * 
     * queen
     * -row, column and diagonals
     * 
     * rook
     * -row and column
     * 
     * bishop
     * -diagonals
     * 
     * king
     * -one move in every direction
     * 
     * 
     */

    for(let i = 0 ; i <= 7 ; i++){
        for(let j = 0 ; j <= 7 ; j++){
            let piece = board[i][j]
            if(pieces.includes(piece)){
                if(piece === 'wp'){

                }   
            }
        }
    }
}

/**
 * board[row][column]
 *   'num1 num2'
 *   num1 -> row    -> y
 *   num2 -> column -> x
 */

function checkSide(piece, x, y) {
    let square = document.querySelector('.p' + x + '' + y)
    let dotDiv = square.querySelector('div')
    let IMG = square.querySelector('img')
    if (checkForPiece(square)) {
        if (!(blackPieces.includes(piece) && blackPieces.includes(board[x][y])) && !(whitePieces.includes(piece) && whitePieces.includes(board[x][y]))) {
            square.classList.add('can-capture')
            IMG.classList.add('can-capture-img')
        }
        return false
    }
    dotDiv.classList.add('grey-dot')
    return true
}

function checkCapture(piece, x, y){
    let square = document.querySelector('.p' + x + '' + y)
    let dotDiv = square.querySelector('div')
    let IMG = square.querySelector('img')
    if (checkForPiece(square)) {
        if (!(blackPieces.includes(piece) && blackPieces.includes(board[x][y])) && !(whitePieces.includes(piece) && whitePieces.includes(board[x][y]))) {
            square.classList.add('can-capture')
            IMG.classList.add('can-capture-img')
        }
    }
}

//so we need two grids


let promoPieces = document.querySelectorAll('.promotion-board > img')

promoPieces.forEach((element) => {
    element.onclick = function(){
        for(let i = 0 ; i <= 7 ; i++){
            if(board[0][i] === 'wp'){
                let newPiece = element.getAttribute('src')
                document.querySelector('.p0' + i + '>img').setAttribute('src', newPiece)
                if(newPiece.substring(14,15) === '.'){
                    board[0][i] = newPiece.substring(12,14)
                }else{
                    board[0][i] = newPiece.substring(12,15)
                }
                hidePromotionBoard()
                break
            }else if(board[7][i] === 'bp'){
                let newPiece = element.getAttribute('src')
                document.querySelector('.p7' + i + '>img').setAttribute('src', newPiece)
                if(newPiece.substring(14,15) === '.'){
                    board[7][i] = newPiece.substring(12,14)
                }else{
                    board[7][i] = newPiece.substring(12,15)
                }
                hidePromotionBoard()
                break
            }
        }
    }
})

function displayPromotionBoard(color, y) {
    let board = document.getElementById('white-promotion-board')
    let board2 = document.getElementById('black-promotion-board')
    
    if(color === 'white'){
        board.style.display = 'flex'
    }else{
        board2.style.display = 'flex'
    }

    switch (y) {
        case 0:
            board.style.margin = '0px 420px 560px 0px'
            board2.style.margin = '560px 420px 0px 0px'
            break
        case 1:
            board.style.margin = '0px 300px 560px 0px'
            board2.style.margin = '560px 300px 0px 0px'
            break
        case 2:
            board.style.margin = '0px 180px 560px 0px'
            board2.style.margin = '560px 180px 0px 0px'
            break
        case 3:
            board.style.margin = '0px 60px 560px 0px'
            board2.style.margin = '560px 60px 0px 0px'
            break
        case 4:
            board.style.margin = '0px 0px 560px 60px'
            board2.style.margin = '560px 0px 0px 60px'
            break
        case 5:
            board.style.margin = '0px 0px 560px 180px'
            board2.style.margin = '560px 0px 0px 180px'
            break
        case 6:
            board.style.margin = '0px 0px 560px 300px'
            board2.style.margin = '560px 0px 0px 300px'
            break
        case 7:
            board.style.margin = '0px 0px 560px 420px'
            board2.style.margin = '560px 0px 0px 420px'
            break
    }
}

function hidePromotionBoard(){
    document.getElementById('white-promotion-board').style.display = 'none'
    document.getElementById('black-promotion-board').style.display = 'none'
}

//implement logic for promotion 

/*
function checkSide(piece, x, y) {
    let square = document.querySelector('.p' + x + '' + y)
    let dotDiv = square.querySelector('div')
    let IMG = square.querySelector('img')
    if (checkForPiece(square)) {
        if (!(blackPieces.includes(piece) && blackPieces.includes(board[x][y])) && !(whitePieces.includes(piece) && whitePieces.includes(board[x][y]))) {
            square.classList.add('can-capture')
            IMG.classList.add('can-capture-img')
        }
        return false
    }
    dotDiv.classList.add('grey-dot')
    return true
}
*/

function checkPawnMove(x,y){
    let nextSquare = document.querySelector('.p' + (x) + y)
    if (checkForPiece(nextSquare)) {
        return false
    }
    nextSquare.querySelector('div').classList.add('grey-dot')
    return true
}

function showMoves(piece, x, y) {
    if (piece === 'wp') {
        if (x === 6) {
            for (let o = 0; o < 2; o++) {
                if (!checkPawnMove((x-o-1), y)) {
                    break
                }
            }
        }else{
            checkPawnMove(x-1, y)
        }
        if(y-1 >= 0){
            checkCapture(piece, x-1, y-1)
        }
        if(y+1 <= 7){
            checkCapture(piece, x-1, y+1)
        }
        // for()

    } else if (piece === 'bp') {
        if (x === 1) {
            for (let i = 0; i < 2; i++) {
                if (!checkPawnMove(x+i+1, y)) {
                    break
                }
            }
        }else{
            checkPawnMove(x+1,y)
        }
        if(y-1 >= 0){
            checkCapture(piece, x+1, y-1)
        }
        if(y+1 <= 7){
            checkCapture(piece, x+1, y+1)
        }
    }

    if (piece === 'br' || piece === 'wr' || piece === 'wq' || piece === 'bq') {
        let tempX = x
        let tempY = y
        //down
        for (let i = x + 1; i < 8; i++) {
            if (!checkSide(piece, i, y)) {
                break
            }
        }
        //up
        for (let j = x - 1; j >= 0; j--) {
            if (!checkSide(piece, j, y)) {
                break
            }
        }
        //right
        for (let k = y + 1; k < 8; k++) {
            if (!checkSide(piece, x, k)) {
                break
            }
        }
        //left
        for (let l = y - 1; l >= 0; l--) {
            if (!checkSide(piece, x, l)) {
                break
            }
        }
    }

    if (piece === 'bb' || piece === 'wb' || piece === 'wq' || piece === 'bq') {
        let tempX = x
        let tempY = y
        //up left
        while (tempX - 1 >= 0 && tempY - 1 >= 0) {
            if (!checkSide(piece, tempX - 1, tempY - 1)) {
                break
            }
            tempX -= 1
            tempY -= 1
        }
        tempX = x
        tempY = y
        //down right
        while (tempX + 1 <= 7 && tempY + 1 <= 7) {
            if (!checkSide(piece, tempX + 1, tempY + 1)) {
                break
            }
            tempX += 1
            tempY += 1
        }
        tempX = x
        tempY = y
        //down left
        while (tempX + 1 <= 7 && tempY - 1 >= 0) {
            if (!checkSide(piece, tempX + 1, tempY - 1)) {
                break
            }
            tempX += 1
            tempY -= 1
        }
        tempX = x
        tempY = y
        //up right
        while (tempX - 1 >= 0 && tempY + 1 <= 7) {
            if (!checkSide(piece, tempX - 1, tempY + 1)) {
                break
            }
            tempX -= 1
            tempY += 1
        }
    }

    if (piece === 'wkn' || piece === 'bkn') {
        for (let p = 0; p <= 7; p++) {
            let tempX = x + knightMoves[p][0]
            let tempY = y + knightMoves[p][1]
            if (tempX >= 0 && tempX <= 7 && tempY >= 0 && tempY <= 7) {
                // let square = document.querySelector('.p' + tempX + '' + tempY)
                // let dotDiv = square.querySelector('div')
                // let IMG = square.querySelector('img')
                
                // if(checkForPiece(square)){
                //     if (!(blackPieces.includes(piece) && blackPieces.includes(board[tempX][tempY])) && !(whitePieces.includes(piece) && whitePieces.includes(board[tempX][tempY]))) {
                        
                //     } 
                //     dotDiv.classList.add('grey-dot')
                // }
                checkSide(piece, tempX, tempY)
            }
        }
    }
}

/*
if (checkForPiece(square)) {
        if (!(blackPieces.includes(piece) && blackPieces.includes(board[x][y])) && !(whitePieces.includes(piece) && whitePieces.includes(board[x][y]))) {
            square.classList.add('can-capture')
            IMG.classList.add('can-capture-img')
        }
        return false
    }
    dotDiv.classList.add('grey-dot')
    return true
    */

function checkForPiece(element) {
    return element.contains(element.querySelector('img'))
}

function removeIndicators() {
    let allDots = document.querySelectorAll('.square>.grey-dot')
    let allCanCaptureDivs = document.querySelectorAll('.can-capture')
    let allCanCaptureImgs = document.querySelectorAll('.can-capture-img')
    allDots.forEach((element) => {
        element.classList.remove('grey-dot')
    })
    allCanCaptureImgs.forEach((element) => {
        element.classList.remove('can-capture-img')
    })
    allCanCaptureDivs.forEach((element) => {
        element.classList.remove('can-capture')
    })
}

function removeGrey() {
    let allGreys = document.querySelectorAll('.grey')
    allGreys.forEach((element) => {
        element.classList.remove('grey')
    })
}


// function checkSquare(direction, maxMoves){
//     for()
// }

for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
        let outerSquare = document.createElement('div')
        let newSquare = document.createElement('div')
        let newIMG = document.createElement('img')

        //dotHolder div can be turned into a dot by adding class grey-dot
        let dotHolder = document.createElement('div')

        outerSquare.classList.add('outer')

        newSquare.classList.add('square')
        newSquare.classList.add('p' + i + '' + j)

        if (board[i][j] !== '  ') {
            newIMG.src = '60x60pieces/' + board[i][j] + '.png'
            newIMG.alt = 'nope'
            newSquare.append(newIMG)
            // console.log(board[i][j])
        }

        newSquare.onmouseover = function () {
            newSquare.classList.add('lightgrey')
            // newSquare.classList.add('can-capture')
            // newIMG.classList.add('can-capture-img')
        }

        newSquare.onmouseleave = function () {
            newSquare.classList.remove('lightgrey')
            // newSquare.classList.remove('can-capture')
            // newIMG.classList.remove('can-capture-img')
        }

        newSquare.onclick = function () {
            if (newSquare.classList.contains('can-capture') || newSquare.querySelector('div').classList.contains('grey-dot')) {
                let ii = parseInt(pieceToMovePos.substring(0, 1))
                let jj = parseInt(pieceToMovePos.substring(1, 2))
                let piece = board[ii][jj]

                //remove old image 
                if (newSquare.querySelector('img') !== null) {
                    newSquare.removeChild(newSquare.querySelector('img'))
                }

                let oldSquare = document.querySelector('.p' + ii + '' + jj)
                let image = oldSquare.querySelector('img')
                oldSquare.removeChild(image)
                newSquare.appendChild(image)
                removeGrey()
                removeIndicators()
                board[ii][jj] = '  '
                board[i][j] = piece

                if((piece === 'wp' && i === 0) || (piece === 'bp' && i === 7)){
                    displayPromotionBoard(notationToPieceName[piece].substring(0,5).toLowerCase(), j)
                }
            } else if (newSquare.classList.contains('grey')) {
                newSquare.classList.remove('grey')
                removeIndicators()
            } else {
                removeGrey()
                removeIndicators()
                newSquare.classList.add('grey')
                showMoves(board[i][j], i, j)
            }
            pieceToMove = board[i][j]
            pieceToMovePos = '' + i + j
        }



        if ((i % 2 === 0 && j % 2 === 0) || (i % 2 === 1 && j % 2 === 1)) {
            outerSquare.classList.add('capture-green')
            newSquare.classList.add('green')
        } else {
            outerSquare.classList.add('capture-grey')
            newSquare.classList.add('white')
        }

        //dotHolder div is supposed to be added after the img div so
        //it renders properly
        newSquare.append(dotHolder)
        outerSquare.append(newSquare)
        container.append(outerSquare)
        //console.log(newSquare)
    }
}

function removeImage(element) {
    if (checkForPiece(element)) {
        let pieceImage = element.querySelector('img')
        element.removeChild(pieceImage)
    }
}

function clearAllImg() {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            let square = document.querySelector('.p' + i + j)
            removeImage(square)
        }
    }
}

function redrawPieces() {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (board[i][j] !== '  ') {
                let square = document.querySelector('.p' + i + j)
                if (!checkForPiece(square)) {
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

