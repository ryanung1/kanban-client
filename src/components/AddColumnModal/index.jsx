import React from 'react'
import { useState } from "react"
import { toast } from 'react-hot-toast'

function AddColumnModal({addBoardModal, setAddBoardModal, activeColumns, reload, setReload, activeBoard, boardData, currentBoardIndex, setCurrentBoardIndex, addColumnModal, setAddColumnModal}) {
    const [board_id, setBoardID] = useState(activeBoard["board_id"])
    console.log(board_id)

    const createColumn = async (title) => {
            const newColumn = {
                "column_name": title,
            }

            let options = {
                method: 'POST',
                credentials: 'include',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newColumn)
              }

              try {
                const response = await fetch(`https://kanban-server-sont.onrender.com/boards/${board_id}/columns`, options);
                const data = await response.json();
                toast.success("Column has been created!")
                return data
                
              } catch (error) {
                console.log(error.message)
              }
      } 

    const findIndex = (id) => {
        for(let i=0; i<boardData.length; i++) {
            if(boardData[i]["board_id"] == id) {
                return i
            }
        }

    }

    const handleFormChange = async (e) => {
        e.preventDefault()
        const title = e.target.title.value
        const data = await createColumn(title)
        const index = findIndex(board_id)
        setCurrentBoardIndex(index)
        setReload(!reload)
        setAddColumnModal(false)
    }
    return (
        <>
            {addColumnModal ? (
                <>
                    <div onClick={() => setAddColumnModal(false)} className="opacity-25 absolute z-60 inset-0 bg-black"></div>
                    <div className='absolute font-jakarta top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]'>
                        <div className="relative flex overflow-x-hidden overflow-y-auto z-50 outline-none focus:outline-none">
                        <div className="flex justify-center items-center mx-auto">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none m-8">
                            {/*header*/}
                            <div className="flex items-center justify-between p-4 rounded-t">
                                <h3 className="pl-3 pt-2 text-black font-jakarta">
                                Add New Column
                                </h3>
                            </div>
                            {/*body*/}
                            <form onSubmit={(e) => handleFormChange(e)} className='mx-6 my-2 text-grey-medium font-jakarta-medium'>
                                <div className="mb-6">
                                    <label htmlFor="title" name="title" className="block mb-2 text-sm font-medium text-grey-medium w-[300px] md:w-[400px]">Title</label>
                                    <input type="text" id="title" name="title" className="bg-gray-50 border border-gray-300 text-grey-medium text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Column Name" required />
                                </div>

                                <div className="flex items-center justify-end p-6  rounded-b">
                                    <button
                                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => setAddColumnModal(false)}
                                    >
                                    Close
                                    </button>
                                    <button

                                    className="bg-purple text-white active:bg-purple-hover font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="submit"
                                    >
                                    Add Column
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

export default AddColumnModal