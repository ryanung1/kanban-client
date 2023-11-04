import React from 'react'
import { useState, useEffect } from 'react';


function NavModal({isMenuActive, setIsMenuActive, activeBoard, setActiveBoard, boardData, setActiveColumns, setSaveChangesModal, saveChangesModal, setNextBoardId}) {

    const changeBoard = (e, board) => {
        console.log(e.currentTarget.id)
        if (saveChangesModal["display"]) {
            setIsMenuActive(false)
            setSaveChangesModal((prevState) => ({
                ...prevState,
                navigate: true
            }))
            setNextBoardId(e.currentTarget.id)
        } else {
            setIsMenuActive(false)
            setActiveBoard(board)
            setActiveColumns(board["columns"])
        }

    }



        // const createBoard = async () => {
        //   const options = {
        //     method: 'POST',
        //     credentials: 'include',
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify({
        //         "board_name": "new Board is created"
        //     })
        //   }
    
        //   try {
        //     const response = await fetch("http://localhost:3001/boards", options);
        //     const data = await response.json();
        //   } catch (error) {
        //     console.log(error.message)
        //   }
        // }
    const activeBoardStyles = "pl-6 flex w-[90%] bg-purple text-white px-2 py-2 rounded-r-[30px] font-jakarta-medium cursor-pointer"
    const inActiveBoardStyles = "pl-6 flex w-[90%] text-grey-medium rounded-r-[30px] px-2 py-2 font-jakarta-medium hover:bg-purple-hover hover:text-white cursor-pointer"

  return (
      <>
        {isMenuActive ? (
          <div className='absolute font-jakarta'>
            <div
              className="relative flex overflow-x-hidden overflow-y-auto top-[350px] z-50 outline-none focus:outline-none"
            >
              <div className="flex justify-center items-center min-w-4/5 my-6 mx-auto max-w-3xl text-xs">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full h-full bg-white outline-none focus:outline-none justify-center items-center">
                  {/*header*/}
                  <div className="flex items-center justify-between w-full p-4 rounded-t">
                    <h3 className="pl-3 pt-2 text-grey text-grey-medium uppercase tracking-widest font-jakarta">
                      All Boards {`(${boardData.length})`}
                    </h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 float-right text-3xl leading-none outline-none focus:outline-none"
                      onClick={() => setIsMenuActive(false)}
                    >
                      <div className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none mt-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-6 w-6">
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="relative flex flex-col space-y-1 justify-start w-full">
                    {boardData.map((b, i) =>                     
                            <div onClick={(e) => changeBoard(e, b)} className={b["board_id"] == activeBoard["board_id"] ? activeBoardStyles : inActiveBoardStyles} id={b["board_id"]} key={i}>
                                {/* <img className='h-6 w-6' src="/assets/icon-board.svg" alt="" /> */}
                                <svg className='w-4 h-4'
                                viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" 
                                    fill={b["board_id"] == activeBoard["board_id"] ? "white" : "#828FA3"}/>
                                </svg>
                                <p className='pl-3 text-left'>{b["board_name"]}</p>
                            </div>) 
                    }

                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end rounded-b m-4">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setIsMenuActive(false)}
                    >
                      Close
                    </button>
                    <button
                      className="bg-purple text-white active:bg-purple-hover font-bold uppercase text-xs px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setIsMenuActive(false)}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </div>
        ) : null}
      </>

    )
}

export default NavModal