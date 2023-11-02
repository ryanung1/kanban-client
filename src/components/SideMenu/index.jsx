import React from "react";

function SideMenu({
  sideMenu,
  setSideMenu,
  activeBoard,
  setActiveBoard,
  boardData,
  setActiveColumns,
  activeColumns,
  setSaveChangesModal,
  saveChangesModal,
  nextBoardId,
  setNextBoardId,
  addBoardModal,
  setAddBoardModal
}) {
  const activeBoardStyles =
    "pl-5 flex w-[95%] bg-purple text-white px-1 py-2 rounded-r-[30px] font-jakarta cursor-pointer items-center";
  const inActiveBoardStyles =
    "pl-5 flex w-[95%] text-grey-medium rounded-r-[30px] px-1 py-2 font-jakarta hover:bg-purple-hover hover:text-white cursor-pointer items-center";

  const changeBoard = (e, board) => {
    console.log(e.currentTarget.id);
    if (saveChangesModal["display"]) {
      setSaveChangesModal((prevState) => ({
        ...prevState,
        navigate: true,
      }));
      setNextBoardId(e.currentTarget.id);
    } else {
      setActiveBoard(board);
      setActiveColumns(board["columns"]);
    }
  };

  return (
    <div className="flex flex-col justify-between items-center w-full text-xs">
      <div className="w-full flex flex-col">
        <div className="h-[70px] flex items-center">
          <img
            src="assets/logo-dark.svg"
            alt=""
            className="pl-5 w-full max-w-[160px]"
          />
        </div>
        <h3 className="pl-6 pt-4 text-grey text-grey-medium uppercase tracking-widest font-jakarta text-xs">
          All Boards {boardData === undefined ? null : `(${boardData.length})`}
        </h3>
        <div className="space-y-2 flex flex-col mt-3">
          {boardData === undefined
            ? null
            : boardData.map((b, i) => (
                <div
                  onClick={(e) => changeBoard(e, b)}
                  className={
                    b["board_id"] == activeBoard["board_id"]
                      ? activeBoardStyles
                      : inActiveBoardStyles
                  }
                  id={b["board_id"]}
                  key={i}
                >
                  {/* <img className='h-6 w-6' src="/assets/icon-board.svg" alt="" /> */}
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z"
                      fill={
                        b["board_id"] == activeBoard["board_id"]
                          ? "white"
                          : "#828FA3"
                      }
                    />
                  </svg>
                  <p className="pl-4 text-left text-sm">{b["board_name"]}</p>
                </div>
              ))}
          <div
            onClick={(e) => setAddBoardModal(true)}
            className="pl-5 flex w-[95%] text-purple px-1 py-2 rounded-r-[30px] font-jakarta cursor-pointer items-center"
          >
            {/* <img className='h-6 w-6' src="/assets/icon-board.svg" alt="" /> */}
            <svg
              className="w-4 h-4"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z"
                fill="#828FA3"
              />
            </svg>
            <p className="pl-4 text-left text-sm"> + Create New Board</p>
          </div>
        </div>
      </div>
      <button
        onClick={() => setSideMenu(false)}
        className="flex flex-row justify-center items-center p-2 font-jakarta-medium m-1"
      >
        <img className="pr-4" src="assets/icon-hide-sidebar.svg" alt="" />
        Hide Sidebar
      </button>
    </div>
  );
}

export default SideMenu;
