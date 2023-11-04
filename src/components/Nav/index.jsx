import React from 'react'
import  NavModal from "../NavModal"
import { useState } from 'react'
import { toast } from 'react-hot-toast'

function Nav({activeBoard, setActiveBoard, boardData, sideMenu, setActiveColumns, nextBoardId, setNextBoardId, saveChangesModal, setSaveChangesModal, setAddTaskModal, addTaskModal}) {
    const [isMenuActive, setIsMenuActive] = useState(false)
    console.log(activeBoard)


    const checkEmptyBoard = () => {
        if(activeBoard["columns"].length == 0) {
            toast.error("This board is empty, create a new column first before creating a task")
        } else {
            setAddTaskModal(true)
        }
    }
    
    // const addBoard = {
    //     "task_name": "testing again",
    //     "task_description": "task description test test test",
    //     "completed": false
    //   }

    // const addOneBoard = async () =>{
    //     const options = {
    //       method: 'POST',
    //       credentials: 'include',
    //       headers: { "Content-Type": "application/json" },
    //       body:JSON.stringify(addBoard)
    //   }
  
    //   try {
    //     const response = await fetch("http://localhost:3001/boards/2/columns/2/tasks", options);
  
    //     if(response.status == 201) {
    //         alert("Correct!"); 
    //     } else {
    //         alert("Incorrect credentials");
    //     }
    //   } catch (error) {
    //     console.log(error.message)
    //   }
  
    // }

  return (
    <header className='bg-white h-[64px] flex justify-center items-center w-full'>
        <NavModal 
        isMenuActive={isMenuActive} 
        setIsMenuActive={setIsMenuActive}
        activeBoard={activeBoard}
        setActiveBoard={setActiveBoard}
        boardData={boardData}
        setActiveColumns={setActiveColumns}
        nextBoardId={nextBoardId}
        saveChangesModal={saveChangesModal}
        setNextBoardId={setNextBoardId}
        setSaveChangesModal={setSaveChangesModal}
        />
        <div className='w-full bg-white h-full flex flex-row justify-between px-4 items-center border-b-[1px] border-grey-light-lines'>
            <div className={sideMenu ? "flex flex-row  items-center h-full w-[65%]" : "flex flex-row  items-center h-full w-[75%]"}>
                <img src="assets/logo-mobile.svg" className='mr-3 md:hidden'></img>
                {/* For Mobile */}

                <div
                className="flex flex-row justify-center items-center font-jakarta uppercase text-m rounded ease-linear transition-all duration-150 md:hidden"
                onClick={() => setIsMenuActive(true)}
                >
                    <h1 className=''>{activeBoard["board_name"]}</h1>
                    
                    {isMenuActive ? <img src="assets/icon-chevron-up.svg" alt="" className="h-4/5 text-center pt-1 pl-2 md:hidden"/> : <img src="assets/icon-chevron-down.svg" alt="" className=" md:hidden h-4/5 text-center pt-1 pl-2"/> }

                </div>

                {/* For medium screen logo    */}
                {sideMenu ? null : 
                <div className="h-full md:border-r-[1px] md:border-grey-light-lines flex justify-center items-center pr-3">
                 <img src="assets/logo-dark.svg" className='mr-3 hidden md:flex w-[120px] h-auto'></img>
                </div>}



                {/* For medium screen title */}
                <div
                className="hidden md:flex flex-row justify-center items-center font-jakarta uppercase text-m rounded ease-linear transition-all duration-150"
                >
                    <h1 className={sideMenu ? "pt-[4px] pl-2" : "pt-[4px] pl-6"}
                    >{activeBoard["board_name"]}</h1>

                </div>
            </div>
            <div className={sideMenu ? "flex flex-row items-center justify-end h-full w-[35%]" : "flex flex-row items-center justify-end h-full w-[25%]"}>
                <button onClick={() => checkEmptyBoard()} className='flex justify-center items-center h-3/5 bg-purple hover:bg-purple-hover rounded-[40px] w-[40px] mr-4 md:w-3/5 md:max-w-[150px]'>
                    <img src="assets/icon-add-task-mobile.svg" alt="" className='md:hidden' />
                    <p className='hidden text-xs md:flex font-jakarta-medium text-white'>+ Add New Task</p>
                </button>
                <img src="assets/icon-vertical-ellipsis.svg" alt="" />
            </div>
        </div>
    </header>
  )
}

export default Nav