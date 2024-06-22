const playerOne = 'red'
const playerTwo = 'yellow'
let winner = false

// Set the player that starts
let currentPlayer = playerOne

let board = [
// 0   1    2   3   4   5   6
  ['', '', '', '', '', '', ''], // 0
  ['', '', '', '', '', '', ''], // 1
  ['', '', '', '', '', '', ''], // 2
  ['', '', '', '', '', '', ''], // 3
  ['', '', '', '', '', '', ''], // 4
  ['', '', '', '', '', '', ''], // 5
]

function checkForDiagonalWinner() {
  const rows = board.length;
  const cols = board[0].length;

  // Top left --> Bottom right
  for (let i=3; i < rows; i++) {
    for (let j=0; j < cols - 3; j++) {
      console.log(`i:${i} j:${j}`)
      if (board[j][i] === currentPlayer &&
          board[j-1][i+1] === currentPlayer &&
          board[j-2][i+3] === currentPlayer &&
          board[j-3][i+3] === currentPlayer 
      ) {
        console.log("winner was found")
        const winningIdArray = [
          `${i}-${j}`, 
          `${i - 1}-${j + 1}`, 
          `${i - 2}-${j + 2}`, 
          `${i - 3}-${j + 3}`
        ]
        // Pass the winning IDs to our colorWinningCells function, so it can do its job.
        colorWinningCells(winningIdArray)

         return true;
        }
    }
  }
}


// Check for vertical winners
function checkForVerticalWinner() {
  for (let col = 0; col < board[0].length; col++) {
    for (let row = 0; row < board.length -3; row++) {
      if (board[row][col] === currentPlayer && 
          board[row + 1][col] === currentPlayer && 
          board[row + 2][col] === currentPlayer &&
          board[row + 3][col] === currentPlayer) {
        // Before we return true, we can update the colors of the cells we just found
       
        const winningIdArray = [
                    `${row}-${col}`, 
                    `${row + 1}-${col}`, 
                    `${row + 2}-${col}`, 
                    `${row + 3}-${col}`
                  ]
        // Pass the winning IDs to our colorWinningCells function, so it can do its job.
        colorWinningCells(winningIdArray)
        
        return true
      }
    }
  }
}

function checkHorizontalWinner() {
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {

      if (board[row][col] === board[row][col + 1] && 
          board[row][col] === board[row][col + 2] && 
          board[row][col] === board[row][col + 3] && 
          board[row][col] !== '') {
          // This executes when we find four in a row - horizontally
          const winningIdArray = [
                    `${row}-${col}`,  
                    `${row}-${col + 1}`, 
                    `${row}-${col + 2}`, 
                    `${row}-${col + 3}`
                  ]
          colorWinningCells(winningIdArray)
          return true
      }
    }
  }
}

function checkForWinner() {
  return checkForVerticalWinner() || checkHorizontalWinner() || checkForDiagonalWinner()
}

function colorWinningCells(IdArray) {
  // Loop through the array of IDs
  for (let i = 0; i < IdArray.length; i++) {
    // Get the ID of the cell
    const id = IdArray[i]
    // Get the cell element
    const cell = document.getElementById(id)
    // Add the glowing class to the element, to make it glow
    cell.classList.add('glowing-element')
    
    
  }
}

function updateCellBackground(cellId) {
  // If there is winner, skip function:
  if (winner) {
    return 
  }
  // Use the cellId to grab the right element from our HTML
  updateBoard(cellId)

  // After board is updated, check if there is a winner
 winner = checkForWinner()

  // right after setting a the currentPlayer color, switch players using our func
  switchCurrentPlayer()
}

function updateBoard(cellId) {
  const cellNumbersArray = cellId.split('-')
  const column = Number(cellNumbersArray[1])

  for (let i = 5; i >= 0; i--) {
    if (board[i][column] === '') {
      board[i][column] = currentPlayer
      const cell = document.getElementById(i + '-' + column)
      console.log("CellClicked: ", (i + '-' + column))
      cell.style.backgroundColor = currentPlayer
      break
    }
  }
}
              
function switchCurrentPlayer() {
  if (currentPlayer === playerOne) {
    currentPlayer = playerTwo
  } else {
    currentPlayer = playerOne
  }
}

function updateWinner(cellId) {
  let column = Number(cellId.split('-')[1]);
  for (let l = 0; l < 4; l++) {
    if (board[l][column] === "winning-cell") {
      const winnerText = currentPlayer === playerOne ? "Red player wins!" : "Yellow player wins!";
      document.querySelector('.update-color').textContent = winnerText;
    }
  }
}
