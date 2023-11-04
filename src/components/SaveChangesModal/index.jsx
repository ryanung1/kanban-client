import React from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import DotLoader from "react-spinners/DotLoader";

function SaveChangesModal({
  saveChangesModal,
  setSaveChangesModal,
  activeBoard,
  setActiveBoard,
  activeColumns,
  setActiveColumns,
  nextBoardId,
  setNextBoardId,
  boardData,
}) {
  const [fetchLoading, setFetchLoading] = useState(false);
  const findBoard = (id) => {
    for (const board of boardData) {
      if (board["board_id"] == id) return board;
    }
  };
  const allTasks = () => {
    let tasks = [];
    for (let i = 0; i < activeColumns.length; i++) {
      let temp = activeColumns[i]["tasks"];
      tasks = tasks.concat(temp);
      console.log(tasks);
    }
    return tasks;
  };

  const updateTasks = async () => {
    setFetchLoading(true);

    const tasks = allTasks();

    for (let i = 0; i < tasks.length; i++) {
      let options = {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tasks[i]),
      };

      try {
        const response = await fetch(
          `https://kanban-server-sont.onrender.com/boards/1/columns/1/tasks/${tasks[i]["task_id"]}`,
          options
        );
        const data = await response.json();
        // toast.success("Your changes have been successfully saved!")
        console.log(data);
      } catch (error) {
        console.log(error.message);
        return;
      }
    }
    toast.success("Your changes have been saved!");
    setFetchLoading(false);
  };

  const onSubmit = async () => {
    await updateTasks();
    const nextBoard = findBoard(nextBoardId);
    setActiveBoard(nextBoard);
    setActiveColumns(nextBoard["columns"]);
    setSaveChangesModal({ display: false, navigate: false });
  };

  return (
    <>
      {saveChangesModal ? (
        <>
          <div className="opacity-25 absolute z-60 inset-0 bg-black"></div>
          <div className="absolute font-jakarta top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]">
            <div className="relative flex overflow-x-hidden overflow-y-auto z-50 outline-none focus:outline-none">
              <div className="flex justify-center items-center min-w-3/5 my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-center justify-between p-4 rounded-t">
                    <h3 className="pl-3 pt-2 text-grey text-grey-medium uppercase tracking-widest font-jakarta">
                      Would you like to save changes
                    </h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 float-right text-3xl leading-none outline-none focus:outline-none"
                      onClick={() => setSaveChangesModal(false)}
                    >
                      <div className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="h-6 w-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </div>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="relative flex flex-col space-y-2 justify-start w-full"></div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6  rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setSaveChangesModal(false)}
                    >
                      Close
                    </button>
                    <button
                      className="bg-purple text-white active:bg-purple-hover font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => onSubmit()}
                    >
                      {fetchLoading ? (
                        <div className="flex justify-center items-center">
                           
                          <p className="mr-4">Saving</p>
                          <DotLoader size={15} color="white"/>

                        </div>
                      ) : (
                        "Save Changes"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

export default SaveChangesModal;
