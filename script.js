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
  const rows = board.length
  const cols = board[0].length

  // Top left --> Bottom right
  for (let row = 3; row < rows; row++) {
    for (let col = 0; col < cols - 3; col++) {
      
      if (board[row][col] === currentPlayer &&
          board[row-1][col + 1] === currentPlayer &&
          board[row-2][col + 2] === currentPlayer &&
          board[row-3][col + 3] === currentPlayer 
      ) {
        
        const winningIdArray = [
          `${row}-${col}`, 
          `${row - 1}-${col + 1}`, 
          `${row - 2}-${col + 2}`, 
          `${row - 3}-${col + 3}`
        ]
      
        // Pass the winning IDs to our colorWinningCells function, so it can do its job.
        colorWinningCells(winningIdArray)

         return true
        }
    }
  }

  // Top right --> Bottom left
  for (let row = 0; row < rows - 3; row++) {
    for (let col = 0; col < cols - 3; col++) {
      if (board[row][col] == currentPlayer &&
          board[row + 1][col + 1] == currentPlayer &&
          board[row + 2][col + 2] == currentPlayer &&
          board[row + 3][col + 3] == currentPlayer 
      ) {
        const winningIdArray = [
          `${row}-${col}`, 
          `${row + 1}-${col + 1}`, 
          `${row + 2}-${col + 2}`, 
          `${row + 3}-${col + 3}`
        ]
        // Pass the winning IDs to our colorWinningCells function, so it can do its job.
        colorWinningCells(winningIdArray)

         return true
      }
    }
  }

  return false
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

  return false
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

  return false
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
  if (winner) return 

  // Use the cellId to grab the right element from our HTML
  updateBoard(cellId)

  // After board is updated, check if there is a winner
  winner = checkForWinner()

  if (winner) winnerText()

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

function winnerText() {
  const winMessage = currentPlayer === playerOne ? "Red player wins!" : "Yellow player wins!"
  // This grabs out winnerText element from HTML, then we can make changes to it.
  const winnerText = document.querySelector('.winner-text')

  winnerText.textContent = winMessage
  winnerText.style.color = currentPlayer


        
}

function restartGame() {
  winner = false;

  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      board[row][col] = '';
      const cell = document.getElementById(`${row}-${col}`);
      cell.style.backgroundColor = 'lightblue';
      cell.classList.remove('glowing-element');
    }
  }

  document.querySelector('.winner-text').textContent = '';
}