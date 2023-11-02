import React, { useEffect, useState } from "react";
import {
  Nav,
  SideMenu,
  Column,
  TaskModal,
  SaveChangesModal,
  AddTaskModal,
  AddBoardModal,
  NewUserModal,
  AddColumnModal,
} from "../../components";
import { AnimatePresence, easeIn, motion } from "framer-motion";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function MainPage() {
  //Stores All board data
  const [boardData, setBoardData] = useState();
  const [reload, setReload] = useState(false);
  const [currentBoardIndex, setCurrentBoardIndex] = useState(0);
  //View Task Modal
  const [taskModalActive, setTaskModalActive] = useState(false);
  //Add Board Modal
  const [addBoardModal, setAddBoardModal] = useState(false);
  const [addColumnModal, setAddColumnModal] = useState(false);
  //Save Changes Modal
  const [saveChangesModal, setSaveChangesModal] = useState({
    display: false,
    navigate: false,
  });
  //Add Task Modal
  const [addTaskModal, setAddTaskModal] = useState(false);

  //Current Task Modal Content Displayed
  const [currentModalContent, setCurrentModalContent] = useState();

  //Stored Board ID for navigation
  const [nextBoardId, setNextBoardId] = useState();

  const [isLoading, setIsLoading] = useState(true);

  //Current board data to be displayed on screen
  const [activeBoard, setActiveBoard] = useState();

  //SideMenu status
  const [sideMenu, setSideMenu] = useState(true);

  //Current column data to be displayed on screen
  const [activeColumns, setActiveColumns] = useState();

  const [newUser, setNewUser] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const options = {
        method: "GET",
        credentials: "include",
      };

      try {
        const response = await fetch(
          "https://kanban-server-sont.onrender.com/boards/user",
          options
        );
        const data = await response.json();
        console.log(data.length);
        if (data.length != 0) {
          setBoardData(data);
          setActiveBoard(data[currentBoardIndex]);
          setActiveColumns(data[currentBoardIndex]["columns"]);
          setIsLoading(false);
        } else {
          // setIsLoading(false)
          console.log("here")
          setNewUser(true);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    getData();
  }, [reload]);

  const createNewColumn = () => {
    const board_id = activeBoard["board_id"];
  };

  const findColumn = (sourceID) => {
    for (const column of activeColumns) {
      if (column["column_id"] == sourceID) return column;
    }
  };

  const findIndex = (sourceID) => {
    return activeColumns.map((c) => c["column_id"]).indexOf(sourceID);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = findColumn(parseInt(source.droppableId));
      const indexOfSource = findIndex(parseInt(source.droppableId));
      const destColumn = findColumn(parseInt(destination.droppableId));
      const indexOfDestination = findIndex(parseInt(destination.droppableId));
      const copiedSourceTasks = sourceColumn["tasks"];
      const copiedDestTasks = destColumn["tasks"];
      let [removed] = copiedSourceTasks.splice(source.index, 1);
      copiedDestTasks.splice(destination.index, 0, removed);
      removed["column_id"] = parseInt(destination.droppableId);
      let newColumnLayout = activeColumns;
      newColumnLayout[indexOfSource]["tasks"] = copiedSourceTasks;
      newColumnLayout[indexOfDestination]["tasks"] = copiedDestTasks;
      setActiveColumns(newColumnLayout);
      setSaveChangesModal((prevState) => ({
        ...prevState,
        display: true,
      }));
    } else {
      const column = findColumn(parseInt(source.droppableId));
      const indexOfColumn = findIndex(parseInt(source.droppableId));
      const copiedTasks = [...column["tasks"]];
      let [removed] = copiedTasks.splice(source.index, 1);
      console.log(removed);
      removed["column_id"] = parseInt(destination.index);
      copiedTasks.splice(destination.index, 0, removed);
      console.log(copiedTasks);
      let newColumnLayout = activeColumns;
      newColumnLayout[indexOfColumn]["tasks"] = copiedTasks;
      setActiveColumns(newColumnLayout);
    }
  };

  return newUser ? (
    <NewUserModal newUser={newUser} setNewUser={setNewUser} />
  ) : (
    <motion.div className="flex flex-row h-screen w-screen">
      {taskModalActive ? (
        <TaskModal
          taskModalActive={taskModalActive}
          setTaskModalActive={setTaskModalActive}
          currentModalContent={currentModalContent}
          setCurrentModalContent={setCurrentModalContent}
          currentBoardIndex={currentBoardIndex}
          setCurrentBoardIndex={setCurrentBoardIndex}
        />
      ) : null}

      {saveChangesModal["display"] ? (
        saveChangesModal["navigate"] ? (
          <SaveChangesModal
            activeBoard={activeBoard}
            setActiveBoard={setActiveBoard}
            activeColumns={activeColumns}
            setActiveColumns={setActiveColumns}
            saveChangesModal={saveChangesModal}
            setSaveChangesModal={setSaveChangesModal}
            nextBoardId={nextBoardId}
            setNextBoardId={setNextBoardId}
            boardData={boardData}
            currentBoardIndex={currentBoardIndex}
            setCurrentBoardIndex={setCurrentBoardIndex}
          />
        ) : null
      ) : null}
      {addTaskModal ? (
        <AddTaskModal
          activeBoard={activeBoard}
          setActiveBoard={setActiveBoard}
          activeColumns={activeColumns}
          setActiveColumns={setActiveColumns}
          saveChangesModal={saveChangesModal}
          setSaveChangesModal={setSaveChangesModal}
          nextBoardId={nextBoardId}
          setNextBoardId={setNextBoardId}
          boardData={boardData}
          setAddTaskModal={setAddTaskModal}
          addTaskModal={addTaskModal}
          reload={reload}
          setReload={setReload}
          currentBoardIndex={currentBoardIndex}
          setCurrentBoardIndex={setCurrentBoardIndex}
        />
      ) : null}
      {addBoardModal ? (
        <AddBoardModal
          activeBoard={activeBoard}
          setActiveBoard={setActiveBoard}
          activeColumns={activeColumns}
          setActiveColumns={setActiveColumns}
          saveChangesModal={saveChangesModal}
          setSaveChangesModal={setSaveChangesModal}
          nextBoardId={nextBoardId}
          setNextBoardId={setNextBoardId}
          boardData={boardData}
          setAddBoardModal={setAddBoardModal}
          addBoardModal={addBoardModal}
          reload={reload}
          setReload={setReload}
          currentBoardIndex={currentBoardIndex}
          setCurrentBoardIndex={setCurrentBoardIndex}
        />
      ) : null}
      {addColumnModal ? (
        <AddColumnModal
          activeBoard={activeBoard}
          setActiveBoard={setActiveBoard}
          activeColumns={activeColumns}
          setActiveColumns={setActiveColumns}
          saveChangesModal={saveChangesModal}
          setSaveChangesModal={setSaveChangesModal}
          nextBoardId={nextBoardId}
          setNextBoardId={setNextBoardId}
          boardData={boardData}
          setAddBoardModal={setAddBoardModal}
          addBoardModal={addBoardModal}
          reload={reload}
          setReload={setReload}
          currentBoardIndex={currentBoardIndex}
          setCurrentBoardIndex={setCurrentBoardIndex}
          addColumnModal={addColumnModal}
          setAddColumnModal={setAddColumnModal}
        />
      ) : null}

      <AnimatePresence>
        {sideMenu ? (
          <motion.div
            key={sideMenu}
            initial={{
              width: 0,
              opacity: 0,
            }}
            animate={{
              width: "100%",
              opacity: 1,
              transition: {
                width: {
                  duration: 2,
                },
                opacity: {
                  delay: 0.2,
                  duration: 0.4,
                },
              },
            }}
            exit={{
              width: "0",
              opacity: 0,
              transition: {
                width: {
                  duration: 0.3,
                },
                opacity: {
                  duration: 0,
                },
              },
            }}
            className="hidden md:flex md:visible min-w-[220px] max-w-[250px] justify-center border-r-[1px] border-grey-light-lines"
          >
            <SideMenu
              sideMenu={sideMenu}
              setSideMenu={setSideMenu}
              activeBoard={activeBoard}
              setActiveBoard={setActiveBoard}
              boardData={boardData}
              activeColumns={activeColumns}
              setActiveColumns={setActiveColumns}
              setSaveChangesModal={setSaveChangesModal}
              saveChangesModal={saveChangesModal}
              nextBoardId={nextBoardId}
              setNextBoardId={setNextBoardId}
              addBoardModal={addBoardModal}
              setAddBoardModal={setAddBoardModal}
            />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                duration: 0.3,
              },
            }}
            exit={{ opacity: 0 }}
            onClick={() => setSideMenu(true)}
            className="hidden absolute bg-purple w-[45px] h-[40px] rounded-r-[40px] left-0 top-[85%] md:flex justify-center items-center z-70"
          >
            <img
              className="h-[11px] w-[16px]"
              src="assets/icon-show-sidebar.svg"
              alt=""
            />
          </motion.div>
        )}
      </AnimatePresence>
      {!isLoading ? 
      <div className="bg-grey-light-background h-full w-screen flex flex-col">
          <Nav
            boardData={boardData}
            activeBoard={activeBoard}
            setActiveBoard={setActiveBoard}
            sideMenu={sideMenu}
            setActiveColumns={setActiveColumns}
            setSaveChangesModal={setSaveChangesModal}
            saveChangesModal={saveChangesModal}
            nextBoardId={nextBoardId}
            setNextBoardId={setNextBoardId}
            addTaskModal={addTaskModal}
            setAddTaskModal={setAddTaskModal}
          />
        <div className="flex h-full gap-4 overflow-x-scroll overflow-y-scroll min-h-[500px] p-2">
          <DragDropContext onDragEnd={onDragEnd}>
              {activeColumns.map((c, i) => {
                  return (
                    <div className="h-auto overflow-visible min-h-[500px]">
                      <Droppable
                        className="bg-white"
                        droppableId={`${c["column_id"]}`}
                        key={i}
                      >
                        {(provided, snapshot) => {
                          return (
                            <Column
                              provided={provided}
                              snapshot={snapshot}
                              key={c["column_id"]}
                              column_id={c["column_id"]}
                              column_name={c["column_name"]}
                              tasks={c["tasks"]}
                              setTaskModalActive={setTaskModalActive}
                              setCurrentModalContent={setCurrentModalContent}
                            />
                          );
                        }}
                      </Droppable>
                    </div>
                  )
                })}

          </DragDropContext>
          <button
            onClick={() => setAddColumnModal(true)}
            className="flex justify-center items-center bg-grey-light-lines min-w-[240px] mt-12 ml-4 rounded-xl"
          >
            <h2 className="font-jakarta text-grey-medium">+ Add New Column</h2>
          </button>
        </div>
      </div>
      
      
      : 
      <div className="h-full w-screen flex justify-center items center mt-44">
        <h1>Loading your tasks...</h1>

      </div>
}

    </motion.div>
  );
}
// result => console.log(result)

export default MainPage;
