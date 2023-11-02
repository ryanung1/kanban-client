import React from 'react'
import { useState } from "react"

function NewUserModal({newUser, setNewUser, reload, setReload}) {


    const createBoard = async (title) => {
            const newBoard = {
                "board_name": title,
            }

            let options = {
                method: 'POST',
                credentials: 'include',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newBoard)
              }

              try {
                const response = await fetch(`https://kanban-server-sont.onrender.com/boards`, options);
                const data = await response.json();
                return data
                
              } catch (error) {
                console.log(error.message)
              }
      } 

    // const findIndex = (id) => {
    //     for(let i=0; i<boardData.length; i++) {
    //         if(boardData[i]["board_id"] == id) {
    //             return i
    //         }
    //     }

    // }

    const handleFormChange = async (e) => {
        e.preventDefault()
        const title = e.target.title.value
        const data = await createBoard(title)
        setNewUser(false)
        setReload(!reload)
    }
    return (
        <>
            {newUser ? (
                <>
                    <div className="opacity-25 absolute z-60 inset-0 bg-black"></div>
                    <div className='absolute font-jakarta top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]'>
                        <div className="relative flex overflow-x-hidden overflow-y-auto z-50 outline-none focus:outline-none">
                        <div className="flex justify-center items-center mx-auto">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none m-8">
                            {/*header*/}
                            <div className="flex flex-col items-center justify-between p-4 rounded-t">
                                <h3 className="pl-3 pt-2 text-black font-jakarta text-xl">
                                Welcome to Kanban!
                                </h3>
                            </div>
                            {/*body*/}
                            <form onSubmit={(e) => handleFormChange(e)} className='mx-6 my-2 text-grey-medium font-jakarta-medium'>
                                <h2 className='font-jakarta text-black mb-4'>Start by adding a Board:</h2>
                                <div className="mb-6">
                                    <label htmlFor="title" name="title" className="block mb-2 text-sm font-medium text-grey-medium w-[300px] md:w-[400px]">Board Title</label>
                                    <input type="text" id="title" name="title" className="bg-gray-50 border border-gray-300 text-grey-medium text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Board or Project name" required />
                                </div>

                                <div className="flex items-center justify-center p-2  rounded-b">
                                    {/* <button
                                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => setAddBoardModal(false)}
                                    >
                                    Close
                                    </button> */}
                                    <button
                                    className="bg-purple text-white active:bg-purple-hover font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="submit"
                                    >
                                    Add Board
                                    </button>
                                </div>
                            </form>

                            {/*footer*/}
                            </div>
                        </div>
                        </div>
                    </div>
                </>
            ) : null}
          </>
      )
}

export default NewUserModal