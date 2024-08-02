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
 */

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


container.addEventListener('mouseover',function(event){
    container.classList.add('grey')
})

//document.addEventListener('keydown', clearAllImg)

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
    }

    if(piece === 'br' || piece === 'wr' || piece === 'wq' || piece === 'bq'){
        let tempX = x
        let tempY = y
        for(let i = x+1 ; i < 8 ; i++){
            let square = document.querySelector('.p'+(i)+''+y)
            let dotDiv = document.querySelector('.p'+(i)+''+y+'>div')
            if(checkForPiece(square)){
                if((blackPieces.includes(piece) && blackPieces.includes(board[i][y])) || (whitePieces.includes(piece) && whitePieces.includes(board[i][y]))){
                    
                }else{
                    dotDiv.classList.add('grey-dot')
                }
                break
            }
            dotDiv.classList.add('grey-dot')
        }
        for(let j = x-1 ; j >=0 ; j--){
            let square = document.querySelector('.p'+(j)+''+y)
            let dotDiv = document.querySelector('.p'+(j)+''+y+'>div')
            if(checkForPiece(square)){
                if((blackPieces.includes(piece) && blackPieces.includes(board[j][y])) || (whitePieces.includes(piece) && whitePieces.includes(board[j][y]))){
                    
                }else{
                    dotDiv.classList.add('grey-dot')
                }
                break
            }
            dotDiv.classList.add('grey-dot')
        }
        for(let k = y+1 ; k < 8 ; k++){
            //document.querySelector('.p'+x+''+(k)+'>div').classList.add('grey-dot')
            let square = document.querySelector('.p'+x+''+k)
            let dotDiv = document.querySelector('.p'+x+''+k+'>div')
            if(checkForPiece(square)){
                if((blackPieces.includes(piece) && blackPieces.includes(board[x][k])) || (whitePieces.includes(piece) && whitePieces.includes(board[x][k]))){
                    
                }else{
                    dotDiv.classList.add('grey-dot')
                }
                break
            }
            dotDiv.classList.add('grey-dot')
        }
        for(let l = y-1 ; l >= 0; l--){
            //document.querySelector('.p'+x+''+(l)+'>div').classList.add('grey-dot')
            let square = document.querySelector('.p'+x+''+l)
            let dotDiv = document.querySelector('.p'+x+''+l+'>div')
            if(checkForPiece(square)){
                if((blackPieces.includes(piece) && blackPieces.includes(board[x][l])) || (whitePieces.includes(piece) && whitePieces.includes(board[x][l]))){
                    
                }else{
                    dotDiv.classList.add('grey-dot')
                }
                break
            }
            dotDiv.classList.add('grey-dot')
        }
    }

    if(piece === 'bb' || piece === 'wb'  || piece === 'wq' || piece === 'bq'){
        let tempX = x
        let tempY = y
        while(tempX-1 >= 0 && tempY-1 >= 0){
            let square = document.querySelector('.p'+(tempX-1)+''+(tempY-1))
            let dotDiv = document.querySelector('.p'+(tempX-1)+''+(tempY-1)+'>div')
            if(checkForPiece(square)){
                if((blackPieces.includes(piece) && blackPieces.includes(board[tempX-1][tempY-1])) || (whitePieces.includes(piece) && whitePieces.includes(board[tempX-1][tempY-1]))){
                    
                }else{
                    dotDiv.classList.add('grey-dot')
                }
                break
            }
            dotDiv.classList.add('grey-dot')
            tempX -= 1
            tempY -= 1
        }
        tempX = x
        tempY = y
        while(tempX+1 <= 7 && tempY+1 <= 7){
            let square = document.querySelector('.p'+(tempX+1)+''+(tempY+1))
            let dotDiv = document.querySelector('.p'+(tempX+1)+''+(tempY+1)+'>div')
            if(checkForPiece(square)){
                if((blackPieces.includes(piece) && blackPieces.includes(board[tempX+1][tempY+1])) || (whitePieces.includes(piece) && whitePieces.includes(board[tempX+1][tempY+1]))){
                    
                }else{
                    dotDiv.classList.add('grey-dot')
                }
                break
            }
            dotDiv.classList.add('grey-dot')
            tempX += 1
            tempY += 1
        }
        tempX = x
        tempY = y
        while(tempX+1 <= 7 && tempY-1 >= 0){
            let square = document.querySelector('.p'+(tempX+1)+''+(tempY-1))
            let dotDiv = document.querySelector('.p'+(tempX+1)+''+(tempY-1)+'>div')
            if(checkForPiece(square)){
                if((blackPieces.includes(piece) && blackPieces.includes(board[tempX+1][tempY-1])) || (whitePieces.includes(piece) && whitePieces.includes(board[tempX+1][tempY-1]))){
                    
                }else{
                    dotDiv.classList.add('grey-dot')
                }
                break
            }
            dotDiv.classList.add('grey-dot')
            tempX += 1
            tempY -= 1
        }
        tempX = x
        tempY = y
        while(tempX-1 >= 0 && tempY+1 <= 7){
            let square = document.querySelector('.p'+(tempX-1)+''+(tempY+1))
            let dotDiv = document.querySelector('.p'+(tempX-1)+''+(tempY+1)+'>div')
            if(checkForPiece(square)){
                if((blackPieces.includes(piece) && blackPieces.includes(board[tempX-1][tempY+1])) || (whitePieces.includes(piece) && whitePieces.includes(board[tempX-1][tempY+1]))){
                    
                }else{
                    dotDiv.classList.add('grey-dot')
                }
                break
            }
            dotDiv.classList.add('grey-dot')
            tempX -= 1
            tempY += 1
        }
    }

    if(piece === 'wkn' || piece === 'bkn'){
        for(let p = 0 ; p <= 7 ; p++){
            let tempX = x + knightMoves[p][0]
            let tempY = y + knightMoves[p][1]
            if(tempX >= 0 && tempX <= 7 && tempY >= 0 && tempY <= 7){
                document.querySelector('.p'+(x+knightMoves[p][0])+''+(y+knightMoves[p][1])+'>div').classList.add('grey-dot')
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
            removeDots()
            console.log(checkForPiece(newSquare))
            
            if(newSquare.classList.contains('grey')){
                newSquare.classList.remove('grey')
            }else{
                removeGrey()
                newSquare.classList.add('grey')
                showMoves(board[i][j], i, j)
            }
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
        console.log(newSquare)
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

