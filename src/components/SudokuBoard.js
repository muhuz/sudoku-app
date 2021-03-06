import React from 'react';
import update from 'immutability-helper';
import '../style/board.css';

class SudokuBoard extends React.Component {
    constructor(props) {
        super(props);
        this.boardRefs = new Array(9);
        const initialBoardState = new Array(9);
        for (let i = 0; i < 9; i++) {
            initialBoardState[i] = new Array(9);
            this.boardRefs[i] = new Array(9);
            for (let j = 0; j < 9; j++) {
                this.boardRefs[i][j] = React.createRef();
                initialBoardState[i][j] = {
                    row:i, 
                    col:j, 
                    num:'',
                    // isActive:false, 
                    isConflict:false
                }
            }
        }

        this.state = {
            board: initialBoardState,
            conflits:[]
        };

        this.onInputKeyDown = this.onInputKeyDown.bind(this);
    }

    onInputKeyDown(e, row, col) {
        e.preventDefault();
        if (/^[1-9]$/.test(e.key)) {
            this.setState(update(this.state, {board: {[row]: {[col]: {num: {$set: e.key}}}}}));
        } else if (e.key === 'Backspace'){
            this.setState(update(this.state, {board: {[row]: {[col]: {num: {$set: ''}}}}}));
        } else if (e.keyCode == '37') {
            // left arrow
            if (col > 0) {
                this.boardRefs[row][col-1].current.focus();
            } else {
                this.boardRefs[row][8].current.focus();
            }
        } else if (e.keyCode == '38') {
            // up arrow
            if (row > 0) {
                this.boardRefs[row - 1][col].current.focus();
            } else {
                this.boardRefs[8][col].current.focus();
            }
        } else if (e.keyCode == '39') {
            // right arrow
            if (col < 8) {
                this.boardRefs[row][col + 1].current.focus();
            } else {
                this.boardRefs[row][0].current.focus();
            }
        } else if (e.keyCode == '40') {
            // down arrow
            if (row < 8) {
                this.boardRefs[row + 1][col].current.focus();
            } else {
                this.boardRefs[0][col].current.focus();
            } 
        }
    }

    checkConflicts() {
        
    }

    render() {
        var tableRows = [];
        for (let i = 0; i < 9; i++) {
            let row = [];
            for (let j = 0; j < 9; j++) {
                row.push(
                    <td>
                        <input className='square'
                        value={this.state.board[i][j].num} 
                        onKeyDown={(e) => this.onInputKeyDown(e, i, j)}
                        onChange={(e) => this.onInputChange}
                        row={i}
                        col={j}
                        ref={this.boardRefs[i][j]}/>
                    </td>
                )
            }
            tableRows.push(<tr>{row}</tr>)
        }
        return (
            <table className="SudokuBoard">
                <tbody>
                {tableRows}
                </tbody>
            </table>
        );
    }

}

export default SudokuBoard;


// var NUM_ROWS = 9;
// var NUM_COLS = 9;

/*
Two way data binding Square
*/

// restrict the input to only 1-9
// function setSudokuFilter(textbox) {
//     textbox.addEventListener("keydown", function(e) {
//         if (/^[1-9]$/.test(e.key)) {
//             this.value = e.key;
//             e.preventDefault();
//         } else if (e.key != 'Backspace'){
//             e.preventDefault();
//         }
//     });
// }

// function check_row(row, col, n, conflicts) {
//     for (let j = 0; j <= 8; j++) {
//         if (j != col) {
//             if ((board.getNumber(row, j) == n) && (board.getNumber(row, j) != null)) {
//                 conflicts.push(board.getElement(row, j));
//             }
//         }
//     }
// }

// function check_column(row, col, n, conflicts) {
//     for (let i = 0; i <= 8; i++) {
//         if (i != row) {
//             if (board.getNumber(i, col) == n) {
//                 conflicts.push(board.getElement(i, col));
//             }
//         }
//     }
// }

// function check_square(row, col, n, conflicts) {
//     let starting_row = Math.floor(row/3);
//     let starting_col = Math.floor(col/3);
//     for (let i = 0; i <= 2; i++) {
//         for (let j = 0; j <= 2; j++) {
//             if (3*starting_row + i != row && 3*starting_col + j != col) {
//                 if (board.getNumber(3*starting_row + i, 3*starting_col + j) == n) {
//                     conflicts.push(board.getElement(3*starting_row + i, 3*starting_col + j))
//                 }
//             }
//         }
//     }
// }

// function applySudokuConflict(element) {
//     console.log("finding conflicts")
//     let active_row = element.row;
//     let active_col = element.col;
//     let active_num = element.value;
//     let conflicts = [];
//     check_row(active_row, active_col, active_num, conflicts); 
//     check_column(active_row, active_col, active_num, conflicts);
//     check_square(active_row, active_col, active_num, conflicts);
//     if (conflicts.length != 0) {
//         conflicts.map(s => s.classList.add('sudoku-conflict'));
//         element.classList.add('sudoku-conflict');
//     }
// }

// function setSudokuFilter(textbox) {
//     textbox.addEventListener("keydown", function(e) {
//         console.log(this.value)
//         if (/^[1-9]$/.test(e.key)) {
//             this.value = e.key;
//             e.preventDefault();
//             console.log(this.row);
//             applySudokuConflict(this);
//         } else if (e.keyCode == '37') {
//             // left arrow
//             if (this.col > 0) {
//                 board.getElement(this.row, this.col - 1).focus();
//             }
//             else {
//                 board.getElement(this.row, 8).focus();
//             }
//         } else if (e.keyCode == '38') {
//             // up arrow
//             if (this.row > 0) {
//                 board.getElement(this.row - 1, this.col).focus();
//             }
//             else {
//                 board.getElement(8, this.col).focus();
//             }
//         } else if (e.keyCode == '39') {
//             // right arrow
//             if (this.col < 8) {
//                 board.getElement(this.row, this.col + 1).focus();
//             }
//             else {
//                 board.getElement(this.row, 0).focus();
//             }
//         } else if (e.keyCode == '40') {
//             // down arrow
//             if (this.row < 8) {
//                 board.getElement(this.row + 1, this.col).focus();
//             }
//             else {
//                 board.getElement(0, this.col).focus();
//             } 
//         } else if (e.key != 'Backspace'){
//             e.preventDefault();
//         }
//     });
// }

// // Add arrow key navigation to document when square is selected
// document.addEventListener("keydown", function(e) {
//     if (document.activeElement.className == 'square') {
//         let active_row = document.activeElement.row;
//         let active_col = document.activeElement.col;
//         if (e.keyCode == '37') {
//             // left arrow
//             if (active_col > 0) {
//                 board.getElement(active_row, active_col - 1).focus();
//             }
//             else {
//                 board.getElement(active_row, 8).focus();
//             }
//         } else if (e.keyCode == '38') {
//             // up arrow
//             if (active_row > 0) {
//                 board.getElement(active_row - 1, active_col).focus();
//             }
//             else {
//                 board.getElement(8, active_col).focus();
//             }
//         } else if (e.keyCode == '39') {
//             // right arrow
//             if (active_col < 8) {
//                 board.getElement(active_row, active_col + 1).focus();
//             }
//             else {
//                 board.getElement(active_row, 0).focus();
//             }

//         } else if (e.keyCode == '40') {
//             // down arrow
//             if (active_row < 8) {
//                 board.getElement(active_row + 1, active_col).focus();
//             }
//             else {
//                 board.getElement(0, active_col).focus();
//             }
//         }
//     }
// });

// function clearBoard(board){
//     for (let i = 0; i < NUM_ROWS; i++) {
//         for (let j = 0; j < NUM_COLS; j++) {
//             board.grid[i][j].change(null);
//         }
//     }
// };

// document.getElementById('ClearBoard').addEventListener("click", function() {
//     clearBoard(board);
// });

// class SudokuBoard {
//     constructor(table, num_rows, num_cols) {
//         this.table = table;
//         this.grid = [];
//         for (let i=0; i<num_rows; i++) {
//             this.grid[i] = new Array(num_cols);
//         };

//         // initialize the table
//         for (var i = 0; i < num_rows; i++) {
//             let row = this.table.insertRow();
//             for (let j = 0; j < num_cols; j++) {
//                 let cell = row.insertCell();
//                 let input = document.createElement('input');
//                 input.className = "square";
//                 this.grid[i][j] = new Square(input, i, j, null);
//                 cell.appendChild(input);
//             }
//         }
//     }

//     getElement(row, col) {
//         return this.grid[row][col].element;
//     }

//     getNumber(row, col) {
//         return this.getElement(row, col).value;
//     }
// };


// var puzzle_table = document.getElementById('PuzzleBoard');
// var board = new SudokuBoard(puzzle_table, NUM_ROWS, NUM_COLS);

// puzzle_table.addEventListener("click", function(e){
//     console.log(e);
// })
