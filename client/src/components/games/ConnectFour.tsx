

import React, { useEffect, useReducer } from 'react';
import { io } from 'socket.io-client';

const NUM_COL = 7;
const NUM_ROW = 6;
const NUM_TO_WIN = 4;
interface onClickType {
  entries: [];
  onClick: (params: any) => any;
}

interface actionType {
  type: string,
  colIdx: number,
  id?: string
}
interface boardType {
  board: [],
  currentPlayer: number,
  isGameOver: boolean,
  winner: null | number
}

export default function ConnectFour() {
    const [{board, winner, isGameOver}, dispatchBoard] = useReducer(reducer, genEmptyState())
    const socket = io('http://localhost:3001');
    // useEffect(() => {
    //   socket.once('update-board', ({type, colIdx,id}: actionType) => {{
    //     console.log(type, colIdx, id)
    //     dispatchBoard({type, colIdx})
        
    //   }})
    // }, [])
   
    return (
      <>
        {winner != null && <h1 className='text-white'>Player {winner} Wins</h1>}
        <div className="board flex">
        {board.map((colEntries: [], colIdx: number) => {
        const onClickCol = () => dispatchBoard({type: 'move', colIdx}) ;
        
        const data = {type: 'move', colIdx: colIdx, }
        function sendMove() {
        socket.emit('new-board', (data))
        console.log('sentData')
        }
      
      
        return <Column key={colIdx} entries={colEntries} onClick={onClickCol}/>
        
        })}
        </div>
  
        {isGameOver && (
        <button className="p-1 text-base mt-2 rounded-lg bg-[#02203c] text-white" onClick={() => {
          dispatchBoard({type: 'restart'})
        }}>
        Restart
        </button>
        )}
      </>
    );
  }
  
  const Column: React.FC<onClickType> = ({entries, onClick }) => (
      <div className="column flex flex-col" onClick={onClick}>
        {entries.map((entry, rowIdx) => {
          const color = entry === 1 ? "bg-[#0000ff]" : "bg-[red]"

          return (
          
            <div key={rowIdx} className="tile w-10 h-10 border-black border flex justify-center items-center ">
              {entry != null && <div className={`w-4/5 h-4/5 rounded-full ${color}   `} />}
            </div>
          
        )})}
      </div>
  )
  
  
  const reducer = (state: boardType, action: actionType)  => {
    const socket = io('http://localhost:3001');
    switch(action.type) {
      case 'restart':
        return genEmptyState();
      case 'update':
   
     
       
      case 'move':
    
      
      const relevantCol = state.board[action.colIdx]
      if (!relevantCol) {
      return
      }
      const colIsFull = relevantCol[0] != null;
      
      if(state.isGameOver || colIsFull) return state;
      const {board, currentPlayer} = state;
      type myTypea = Array<Array<number>>
      const boardClone: myTypea = [...board];
      type myType = any[]
      const colClone: myType = [...relevantCol];
    
      
      const rowIdx = colClone.lastIndexOf(null);
      colClone[rowIdx] = currentPlayer;
      boardClone[action.colIdx] = colClone;
      
      const didWinVertical = didWin({
        startRow: rowIdx,
        startCol: action.colIdx,
        rowInc: 1,
        colInc: 0,
        board: boardClone, currentPlayer
      })
      const didWinHorizontal = didWin({
        startRow: rowIdx,
        startCol: action.colIdx,
        rowInc: 0,
        colInc: 1,
        board: boardClone, currentPlayer
      })
      const didWinDiagonal = didWin({
        startRow: rowIdx,
        startCol: action.colIdx,
        rowInc: 1,
        colInc: 1,
        board: boardClone, currentPlayer
      }) ||
      didWin({startRow: rowIdx,
        startCol: action.colIdx,
        rowInc: -1,
        colInc: 1,
        board: boardClone, currentPlayer})
      const winner = didWinVertical || didWinHorizontal || didWinDiagonal ? currentPlayer : null
      const isBoardFull = boardClone.every(column => column[0] != null)
      
      return {
        board: boardClone,
        currentPlayer: state.currentPlayer === 1 ? 2 : 1,
        winner,
        isGameOver: winner != null || isBoardFull,
      }
      default:
        throw new Error('Unexpected action type')
    }
    
  }
  
  function genEmptyState() {
    return {
      board: new Array(NUM_COL).fill(null).map(() => new Array(NUM_ROW).fill(null)),
      currentPlayer: 1,
      winner: null,
      isGameOver: false, 
    }
  }

  interface didWina {
    startRow: number,
    startCol: number,
    rowInc: number,
    colInc: number,
    board: number[][],
    currentPlayer: number
  }
  const didWin = ({startRow, startCol, rowInc, colInc, board, currentPlayer}: didWina) => {
    let numInARow= 0;
    let currRow = startRow;
    let currCol = startCol;
   
    while (currCol < NUM_COL && currRow < NUM_ROW &&
      board[currCol][currRow] === currentPlayer) {
        numInARow++;
        currRow += rowInc;
        currCol += colInc;
      }
    currRow = startRow - rowInc;
    currCol = startCol - colInc;

    while (currCol >= 0 && currRow >= 0 &&
      board[currCol][currRow] === currentPlayer) {
        numInARow++;
        currRow -= rowInc;
        currCol -= colInc;
      }
    return numInARow >= NUM_TO_WIN
  }