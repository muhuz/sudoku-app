import React from 'react';
import '../style/board.css';

// class Square extends React.Component {
//     constructor(props) {
//         super(props);
//         this.handleChange = this.handleChange.bind(this);
//     }

//     render() {
//         return (
//             <input readOnly ref={this.props.ref} className="square" onKeyDown={this.handleChange} value={this.props.value}/>
//         );
//     }

//     handleChange(e) {
//         this.props.onKeyDown(e, this.props.row, this.props.col);
//     }
// };

const Square = React.forwardRef((props, ref) => (
    <input readOnly ref={ref} className="square" onKeyDown={props.onKeyDown} value={props.value}/>
));

// function Square(props){
//     return (
        
//     );
// }


    // handleKey(e) {
    //     if (/^[1-9]$/.test(e.key)) {
    //         this.setState({num:e.key});
    //     } else if (e.key === 'Backspace'){
    //         this.setState({num:null});
    //     } else {
    //         e.preventDefault();
    //     }
    // }

    // constructor(element, row, col, number) {
    //     this.element = element;
    //     this.element.row = row;
    //     this.element.col = col;
    //     // this.element.update(number);
    //     this.element.addEventListener("change", this.handleEvent);
    //     setSudokuFilter(this.element);
    //     this.number = number;
    // }

    // handleEvent(event) {
    //     switch (event.type) {
    //         case "change":
    //             this.change(this.element.value);
    //     }
    // }

    // change(number) {
    //     this.number = number;
    //     this.element.value = number;
    // }

    // getNumber() {
    //     return this.element.value;
    // }


export default Square;