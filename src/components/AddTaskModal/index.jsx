import React from 'react'
import { useState } from 'react'

function AddTaskModal({addTaskModal, setAddTaskModal, activeColumns, reload, setReload}) {
    const [subtaskList, setSubtaskList] = useState([])
    const [columnID, setColumnID] = useState(activeColumns[0]["column_id"])


    const createTask = async (title, description) => {
            const newTask = {
                "task_name": title,
                "task_description": description,
                "completed": false
            }

            let options = {
                method: 'POST',
                credentials: 'include',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newTask)
              }

              try {
                const response = await fetch(`https://kanban-server-sont.onrender.com/boards/1/columns/${columnID}/tasks`, options);
                const data = await response.json();
                return data
                
              } catch (error) {
                console.log(error.message)
              }
        

  
      } 

    const createSubtasks = async(task_id, subtask) => {
        const newSubtask = {
            "subtask_name": subtask,
            "subtask_description": "",
            "completed": false
        }
        let options = {
            method: 'POST',
            credentials: 'include',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newSubtask)
          }
        
          try {
            const response = await fetch(`http://localhost:3001/boards/1/columns/1/tasks/${task_id}/subtasks`, options);
            const data = await response.json();
            return data
            
          } catch (error) {
            console.log(error.message)
          }
    }



    const handleSubtaskAdd = () => {
        setSubtaskList([...subtaskList, { subtask: "" }])
    }

    const handleSubtaskRemove = (index) => {
        const list = [...subtaskList]
        list.splice(index, 1)
        setSubtaskList(list)
    }

    const handleSubtaskChange = (e, index) => {
        const {name, value} = e.target
        const list = [...subtaskList]
        list[index][name] = value;
        setSubtaskList(list)

    }

    const handleSelectChange = (e) => {
        const {value, id} = e.target
        const column_id = value
        setColumnID(column_id)
    }

    const handleFormChange = async (e) => {
        e.preventDefault()
        const title = e.target.title.value
        const description = e.target.description.value
        const data = await createTask(title, description)
        const task_id = (data[0]["task_id"])

        // If subtaskList is empty, return
        // else: for each entry in subList create a subtask and assign it to the task_id that has been returned from previous post request
        if (subtaskList.length == 0) {
            null

        } else {
            for(let i = 0; i<subtaskList.length; i++) {
                const subtask_name = subtaskList[i]["subtask"]
                await createSubtasks(task_id, subtask_name)
            }
        }
        setReload(!reload)
        setAddTaskModal(false)
    }
    
    return (
        <>
            {addTaskModal ? (
                <>
                    <div onClick={() => setAddTaskModal(false)} className="opacity-25 absolute z-60 inset-0 bg-black"></div>
                    <div className='absolute font-jakarta top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]'>
                        <div className="relative flex overflow-x-hidden overflow-y-auto z-50 outline-none focus:outline-none">
                        <div className="flex justify-center items-center mx-auto">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none m-8">
                            {/*header*/}
                            <div className="flex items-center justify-between p-4 rounded-t">
                                <h3 className="pl-3 pt-2 text-black font-jakarta">
                                Add New Task
                                </h3>
                            </div>
                            {/*body*/}
                            <form onSubmit={(e) => handleFormChange(e)} className='mx-6 my-2 text-grey-medium font-jakarta-medium'>
                                <div className="mb-6">
                                    <label htmlFor="title" name="title" className="block mb-2 text-sm font-medium text-grey-medium w-[300px] md:w-[400px]">Title</label>
                                    <input type="text" id="title" name="title" className="bg-gray-50 border border-gray-300 text-grey-medium text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="New Task Name" required />
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="description" name="description" className="block mb-2 text-sm font-medium text-gray-900">Description</label>
                                    <textarea type="textarea" id="description" name="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required >
                                    </textarea>
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="subtasks" className="block mb-2 text-sm font-medium">Subtasks</label>
                                    {subtaskList.map((subtask, index) => (
                                        <div key={index} name="subtasks" className='flex flex-col gap-1'>
                                            <div name="first-division" className='flex py-1 gap-4 justify-between items-center'>
                                                <input value = {subtask.subtask} onChange={(e) => handleSubtaskChange(e, index)} id="subtasks" name="subtask" type="text" className="bg-gray-50 border border-gray-300 rounded w-full py-1 my-1" required />
                                                <div name="second-division" className='flex justify-center items-center'>
                                                    <button onClick={() => handleSubtaskRemove(index)} type="button" name="remove-btn" className='text-grey-medium'>
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
                                                    </button>
                                                
                                                </div>
                                            </div>
                                            {/* {subtaskList.length - 1 === index || subtaskList.length === 0 && 
                                                (
                                                    <button type="button" name="add-btn" className='bg-grey-light-lines rounded-[20px] font-jakarta text-purple text-xs p-2 py-3'>
                                                        <span> + Add a subtask</span>
                                                    </button>
                                                )} */}
                                        </div>
                                    ))}
                                    <button onClick={handleSubtaskAdd} type="button" name="add-btn" className='bg-grey-light-lines rounded-[20px] font-jakarta text-purple text-xs p-2 py-3 w-full'>
                                        <span> + Add a subtask</span>
                                    </button>

                                </div>
                                <h2 className="text-sm mb-1">Status</h2>
                                <select onChange={(e) => handleSelectChange(e)} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                                    {activeColumns.map((column, index) => (
                                        <option name="column" key={column.column_id} id={column.column_id} value={column.column_id}>{column.column_name}</option>
                                    ))}
                                </select>
                                <div className="flex items-center justify-end p-6  rounded-b">
                                    <button
                                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => setAddTaskModal(false)}
                                    >
                                    Close
                                    </button>
                                    <button
                                    className="bg-purple text-white active:bg-purple-hover font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="submit"
                                    // onClick={() => setAddTaskModal(false)}
                                    >
                                    Add Task
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

export default AddTaskModal