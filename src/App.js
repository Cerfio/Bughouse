import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
let rules = require('./rules.json');
// [{
// 	position: {
// 		x: 0,
// 		y: 0,
// 	},
// 	image: ''
// }]

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			board: [],
			pieces: {
				pawn: [],
				knight: [],
				bishop: [],
				rook: [],
				queen: [],
				king: [],
			}
		};
	};
	initPieces() {
		Object.keys(rules).map((piece) => {
			const position = rules[piece].position;

			for (let i = 0; i !== rules[piece].number; i++) {
				this.state.pieces[piece].push({
					x: i === 0 ? position.x : (position.x -10 + i) * -1,
					y: position.y
				});
			}
		})
		console.log(this.state.pieces)
	}
	initBoard(numberRow = 8, numberCell = 8) {
		for (let row = 0; row !== numberRow; row++) {
			const copyBoard = this.state.board;
			const newRow = [];
			for (let cell = 0; cell !== numberCell; cell++) {
				if ((cell + row) % 2)
					newRow.push(<div style={{ width: '50px', height: '50px', backgroundColor: '#b58862' }}></div>);
				else
					newRow.push(<div style={{ width: '50px', height: '50px', backgroundColor: '#F0D9B5' }}></div>);
			};
			copyBoard[row] = newRow;
			this.setState({
				board: copyBoard
			})
		}
	}
	componentDidMount() {
		this.initBoard();
		this.initPieces();
	};
	render() {
		return (
			<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', width: '100%', height: '100%'}}>
				<div style={{display: 'flex', flexDirection: 'column', flex: '1 1 auto'}}>
					<div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap'}}>
						<div style={{display: 'flex', flexDirection: 'column'}}>
							{this.state.board.map((row, indexRow) =>
								<div key={indexRow} style={{ display: 'flex' }}>
									{ row.map((cell, indexCell) => <div key={indexCell}> { cell } </div>) }
								</div>
							)}
						</div>
						<div style={{display: 'flex', flexDirection: 'column'}}>
							{this.state.board.map((row, index) =>
								<div key={index} style={{ display: 'flex' }}>
									{/* { row.map((cell) => cell) } */}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

// function Appa() {
// 	const isInitialMount = useRef(true);
// 	const [board, setBoard] = useState([
// 		[1, 2],
// 		[3, 4],
// 		[5, 6]
// 	  ]);

// 	  useEffect(() => {
// 		if (isInitialMount.current) {
// 			isInitialMount.current = false;
// 		 } else {
// 		for (let z = 0; z !== 8; z++) {
// 			const tmp = [];
// 			for (let a = 0; a !== 8; a++) {
// 		// // 		if (a % 2)
// 		// 			tmp.push(<div style={{ width: '50px', height: '50px', backgroundColor: '#b58862' }}></div>);
// 		// // 		else
// 		// // 			tmp.push(<div className="tesst" style={{ width: '50px', height: '50px', backgroundColor: '#F0D9B5' }}></div>);
// 				tmp.push(a);
// 			};
// 			board[z] = tmp;
// 			setBoard(board);
// 		}
// 		}
// 		console.log(board)
// 	}, [board]);

// 	return (
// 		<div className="App">
					// 			<div style={{ display: 'flex' }}>
						// 				{board.map((row, index) => {
// 					return (
// 						<div key={index}>
// 							<p>salut</p>
// 						</div>
// 					)
// 				})}
// 				{/* {board.map((row, index) => {
// 					return (
// 						<div key={index}>
// 							{row.map((cell) => {
// 								return (cell)
// 							})}
// 						</div>
// 						// <p>fafaf</p>
// 					// <div>
// 					// 	{row.map((cell) => { 
// 					// 		return (<p>fals</p>)
// 					// 	})}
// 					// </div>
// 					)
// 				}
// 				)} */}
// 			</div>
// 		</div>
// 	);
// }

export default App;
