import React from 'react';

require('../solver/columnObject')
require('../solver/dataObject')
require('../solver/doublyLinkedList')

class SudokuSolver extends React.Component {

    constructor() {
        this.createCoverMatrix()
    }

    // solve () {

    // }

    createCoverMatrix() {
        /*
        324 Columns:
        81 cell conditions:
            - each cell must have a number
        81 row conditions:
            - each row must have 1 of each number
        81 columns conditions:
            - each column must have 1 of each number
        81 square conditions:
            - each square must have 1 of each number
    
        729 Rows:
        1 row for every possible option in a each cell. 81 cells and 9 number possible in 
        each cell which gives us 81 * 9 = 729 total rows

        Cell[0][0] #1
        Cell[0][0] #2
        ...
        Cell[0][0] #9
        Cell[0][1] #1
        Cell[0][2] #2
        ...
        Cell[0][8] #9
        Cell[1][0] #1
        ...
        Cell[8][8] #9
        */
        this.coverMatrix = [];
        
        for (let i=0; i++; i<9) {
            for (let j=0; j++; j<9) {
                for (let n=1; n++; n<=9) {
                    arr = Array(324).fill(0);
                    var name = 'Row: ${i} Col: ${j} N: ${n}';
                    var row_header = new ColumnObject(name);
                    var row_obj = new DoublyLinkedList()
                    row_obj.addLeftRight(row_header);
                    arr[this.cellCondition(i,j,n)] = new DataObject();
                    arr[81 + this.rowCondition(i,j,n)] = new DataObject();
                    arr[2*81 + this.colCondition(i,j,n)] = new DataObject();
                    arr[3*81 + this.squareConditionsure(i,j,n)] = new DataObject();
                    row_obj.addLeftRight(arr[this.cellCondition(i,j,n)]);
                    row_obj.addLeftRight(arr[81 + this.rowCondition(i,j,n)]);
                    row_obj.addLeftRight(arr[2*81 + this.colCondition(i,j,n)]);
                    row_obj.addLeftRight(arr[3*81 + this.squareConditionsure(i,j,n)]);
                    CoverMatrix.push(arr);
                }
            }
        }

        // Create the header for the column objects
        this.header = new columnObject('header');
        this.matrixObj = new DoublyLinkedList();
        matrixObj.add(header);
        for (let j=0; j < CoverMatrix[0].length; j++) {
            var colObj = new ColumnObject(j);
            var linkedList_j = new DoublyLinkedList();
            linkedList_j.addLeftRight(colObj);
            for (let i=0; i < 729; i++) {
                if (CoverMatrix[i][j] != 0) {
                    linkedList_j.addUpDown(arr[i][j]);
                }
            }
        }
    }

    cellCondition(i, j, n) {
        // returns 0 to 80 index for cell condition
        return 9*i + j;
    }

    rowCondition(i, j, n) {
        // returns 0 to 80 index for row condition
        return 9*i + n-1
    }

    colCondition(i, j, n) {
        // returns 0 to 80 index for column condition
        return 9*j + n-1
    }

    squareCondition(i, j, n) {
        // returns 0 to 80 index for square condition
        return 9*(3 * Math.floor(i/3) + Math.floor(j/3)) + (n-1)
    }
};

// function linkMatrix(A) {
//     // takes a matrix and forms the column headers and
//     // creates the doubly linked lists
//     // Returns data object
//     const header = new columnObject('header');
//     const matrixObj = new DoublyLinkedList();
//     matrixObj.add(header);
//     for (let j=0; j < A[0].length; j++) {
//         var colObj = new ColumnObject(j);
//         var linkedList_j = new DoublyLinkedList();
//         linkedList_j.addLeftRight(colObj);
//         for (let i=0; i < A.length; i++) {
//             if (A[i][j] == 1) {
//                 var Aij = new DataObject();
//                 Aij.c = linkedList_j.head();
//                 linkedList_j.addUpDown(Aij);
//             }
//         }
//         matrixObj.addLeftRight(linkedList_j);
//     }

//     for (let i=0; i < A.length; i++) {
//         var horizontalList = new DoublyLinkedList();
//         for (let j=0; A[i].lenght; j++) {
//             if (A[i][j] == 1) {
//                 horizontalList.addLeftRight();
//             }   
//         }
//     }

//     return header;
// }