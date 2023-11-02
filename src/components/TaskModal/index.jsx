import React from 'react'
import { useState, useEffect } from 'react'

function TaskModal({taskModalActive, setTaskModalActive, currentModalContent, setCurrentModalContent}) {
    const [subtasks, setSubtasks] = useState(currentModalContent["subtasks"])    
    const calculateCompleted = () => {
        let noOfCompleted = 0
        for (let i=0; i<subtasks.length; i++) {
            if (subtasks[i]["completed"]) {
                noOfCompleted ++
            } 
        }

        return noOfCompleted
    }
    const [numberOfCompleted, setNumberOfCompleted] = useState(0)

    useEffect(() => {
        setNumberOfCompleted(calculateCompleted);
    }, [subtasks]);




    const updateTasks = async () => {

        for (let i=0; i<subtasks.length; i++) {
            let options = {
                method: 'PATCH',
                credentials: 'include',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(subtasks[i])
              }

              try {
                const response = await fetch(`http://localhost:3001/boards/1/columns/1/tasks/1/subtasks/${subtasks[i]["subtask_id"]}`, options);
                const data = await response.json();
                
              } catch (error) {
                console.log(error.message)
              }
        }

  
      }  


    const FormCheckBox = ({subtask, i, subtasks, setSubtasks, setNumberOfCompleted, numberOfCompleted}) => {

        const toggleCheck = () => {
            let updatedSubTasks = [...subtasks];
            updatedSubTasks.map(st => {
                if (st["subtask_id"] == subtask["subtask_id"]) {
                    st["completed"] = !st["completed"];
                }
            })
            setSubtasks(updatedSubTasks);
        }

        return (
            <div key={i} id={subtask["subtask_id"]} className='py-2 bg-grey-light-background flex justify-start rounded'>
                <input type="checkbox" name={subtask["subtask_name"]} className='ml-2 mr-3 accent-purple' checked={subtask["completed"] == true} onChange={toggleCheck} />
                <label htmlFor={subtask["subtask_name"]} className={subtask["completed"] == true ? "line-through text-xs" : "text-xs"}>{subtask["subtask_name"]}</label>
            </div>
        )
    }



  return (
    <>
        {taskModalActive ? (
            <>
                <div onClick={() => setTaskModalActive(false)} className="opacity-25 absolute z-60 inset-0 bg-black"></div>
                <div className='absolute font-jakarta top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]'>
                    <div className="relative flex overflow-x-hidden overflow-y-auto z-50 outline-none focus:outline-none">
                    <div className="flex justify-center items-center min-w-3/5 my-6 mx-auto">
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-center justify-between p-4 rounded-t">
                            <h3 className="pl-3 pt-2 text-black font-jakarta">
                            {currentModalContent["task_name"]}
                            </h3>
                            <button
                            className="p-1 ml-auto bg-transparent border-0 float-right text-3xl leading-none outline-none focus:outline-none"
                            onClick={() => setTaskModalActive(false)}
                            >
                            <div className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
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
                        <div className="flex flex-col p-4 space-y-2 w-full">
                            <p className='pl-3 text-grey-medium font-jakarta-medium text-sm'>{currentModalContent["task_description"]}</p>
                            <div className='pl-3 gap-2 flex flex-col'>
                                <h2 className="text-grey-medium font-jakarta text-sm">{`Subtasks (${numberOfCompleted} of ${subtasks.length})`}</h2>
                                {subtasks.map((subtask, i) => 
                                    <FormCheckBox key={i} subtask={subtask} index={i} subtasks={subtasks} setSubtasks={setSubtasks} numberOfCompleted={numberOfCompleted} setNumberOfCompleted={setNumberOfCompleted}/> 
                                    
                                )}
                            </div>

                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-6  rounded-b">
                            <button
                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setTaskModalActive(false)}
                            >
                            Close
                            </button>
                            <button
                            className="bg-purple text-white active:bg-purple-hover font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setTaskModalActive(false)}
                            >
                            Save Changes
                            </button>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </>
        ) : null}
      </>
  )
}

export default TaskModal