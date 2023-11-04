import React from 'react'
import { Task } from "../index"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"


function Column({column_id, column_name, tasks, setTaskModalActive, setCurrentModalContent, provided, snapshot}) {

  return (
    <div
    {...provided.droppableProps}
    ref={provided.innerRef}
    style={{ background: snapshot.isDraggingOver ? '#E9EFFA' : null }} 
    className="min-w-[275px] max-w-[300px] overflow-y-visible p-2 flex flex-col gap-4 rounded-[10px]">
        <div className="flex gap-3 items-center ml-3">
            <div className="rounded-[50%] w-[15px] h-[15px] bg-red"></div>
            <h1 className='font-jakarta-medium uppercase text-grey-medium tracking-[2px] text-sm'>{`${column_name === undefined ? null : column_name} (${tasks === undefined ? null : tasks.length})`}</h1>
        </div>
        <div className='h-full w-full flex flex-col p-1 gap-4'>
            {tasks === undefined ? null : tasks.map((t,i) => {
              return(
                <Draggable
                  key={t["task_id"]}
                  draggableId={`${t["task_id"]}`}
                  index={i}
                >
                  {(provided, snapshot) => {
                    return (
                      <Task
                          provided={provided}
                          snapshot={snapshot}
                          key={t["task_id"]}
                          d
                          column_id={t["column_id"]}
                          completed={t["completed"]}
                          task_description={t["task_description"]}
                          task_id={t["task_id"]}
                          task_name={t["task_name"]}
                          subtasks={t["subtasks"]}
                          setTaskModalActive={setTaskModalActive}
                          setCurrentModalContent={setCurrentModalContent}
                      />
                    )
                  }}
                </Draggable>
              )
              })}
        </div>

    </div>
  )
}

export default Column
