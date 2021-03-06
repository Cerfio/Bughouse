import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
let rules = require('./rules.json');

let turnFirstBoard = 'white';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			board: [],
			piecesWhite: {
				pawn: [],
				knight: [],
				bishop: [],
				rook: [],
				queen: [],
				king: [],
			},
			piecesBlack: {
				pawn: [],
				knight: [],
				bishop: [],
				rook: [],
				queen: [],
				king: [],
			}
		};
	};
	selectPiece(cellX, cellY) {
		let colorPlayer = '';
		const { piecesWhite, piecesBlack } = this.state;

		if (turnFirstBoard === 'black')
			colorPlayer = piecesBlack;
		if (turnFirstBoard === 'white')
			colorPlayer = piecesWhite;
		Object.keys(colorPlayer).map((piece) => {
			for (let i = 0; i !== colorPlayer[piece].length; i++) {
				const { x, y } = colorPlayer[piece][i];
				if (cellX === x && cellY === y)
					console.log(piece);
			}
		});
	}
	initPieces() {
		Object.keys(rules).map((piece) => {
			const position = rules[piece].position;

			for (let i = 0; i !== rules[piece].number; i++) {
				this.state.piecesWhite[piece].push({
					x: i === 0 ? position.x : (position.x -10 + i) * -1,
					y: - position.y + 9
				});
				this.state.piecesBlack[piece].push({
					x: i === 0 ? position.x : (position.x -10 + i) * -1,
					y: position.y
				});
			}
		})
	}
	initBoard(numberRow = 8, numberCell = 8) {
		for (let row = 0; row !== numberRow; row++) {
			const copyBoard = this.state.board;
			const newRow = [];
			for (let cell = 0; cell !== numberCell; cell++) {
				if ((cell + row) % 2)
					newRow.push(<div onClick={() => this.selectPiece(cell + 1, row + 1)} style={{ width: '50px', height: '50px', backgroundColor: '#b58862' }}></div>);
				else
					newRow.push(<div onClick={() => this.selectPiece(cell + 1, row + 1)} style={{ width: '50px', height: '50px', backgroundColor: '#F0D9B5' }}></div>);
			};
			copyBoard[row] = newRow;
			this.setState({
				board: copyBoard
			})
		}
	}
	refreshMap() {
		const { piecesWhite, piecesBlack } = this.state;

		console.log(this.state.board)
		Object.keys(piecesWhite).map((piece) => {
			for (let i = 0; i !== piecesWhite[piece].length; i++) {
			 	const { x, y } = piecesWhite[piece][i];
				this.state.board[y - 1][x - 1].props.style['backgroundImage'] = `url(${rules[piece].image_white})`;
			}
		});
		Object.keys(piecesBlack).map((piece) => {
			for (let i = 0; i !== piecesBlack[piece].length; i++) {
			 	const { x, y } = piecesBlack[piece][i];
			 	this.state.board[y - 1][x - 1].props.style['backgroundImage'] = `url(${rules[piece].image_black})`;
			}
		});
	}
	componentDidMount() {
		this.initBoard();
		this.initPieces();
		this.refreshMap();
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

export default App;