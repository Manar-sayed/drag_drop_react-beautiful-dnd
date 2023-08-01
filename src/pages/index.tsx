
import Layout from '@/components/layout'
import CardItem from '@/components/CardItem'
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import BoardData from "../data/board-data.json";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { CheckIcon } from '@heroicons/react/20/solid';
import { CheckBadgeIcon } from '@heroicons/react/24/outline';
import { XCircleIcon } from '@heroicons/react/24/solid';

export default function Home() {
  const [ready, setReady] = useState(false);
  const [show, setShow] = useState(null);
  const [boardData, setBoardData] = useState(BoardData);
  // const [showForm, setShowForm] = useState(false);
  // const [selectedBoard, setSelectedBoard] = useState(0);
  //  const [fail, setFail] = useState(0);


  //to make it global
  let newBoardData;
  //to show full screen after refresh 
  useEffect(() => {
    if (process) {
      setReady(true);
    }
  }, []);

  /********************************* Start of Drag Fun **********************************/
  const onDragEnd = (re: any) => {
    // stop if i try to drop out the distination
    if (!re.destination) return;

    // at first the value will be array(json) from fetch data 
    newBoardData = boardData;
    //parseInt(re.source.droppableId == newBoardData[i] then i take only index of the drag item 
    var dragItem = newBoardData[parseInt(re.source.droppableId)].items[re.source.index];//newBoardData[1].items[1] [ex]
    // to enable each colum to take one value (destination)
    const numOfItems = newBoardData[parseInt(re.destination.droppableId)].items.length + 1
    // check i destination column is (Answers col)
    const colNameToDrop = newBoardData[parseInt(re.destination.droppableId)].name

    // if question column has one value stop adding more
    if (numOfItems > 1) {
      if (colNameToDrop === "Answers") {
        //to add back to answers col
        newBoardData[parseInt(re.destination.droppableId)].items.push(
          dragItem
        );
        // remove it from current col
        newBoardData[parseInt(re.source.droppableId)].items.splice(
          re.source.index,
          1
        );
        // console.log("you try to drop back  in column called  =>", colNameToDrop)
      }

      return;
    }
    // default case (qusetion col still empty) source-> (Answers col)
    else {
      //عشان امسح اللى بسحبه من الاجابات المتاحة
      newBoardData[parseInt(re.source.droppableId)].items.splice(
        re.source.index,
        1
      );
      newBoardData[parseInt(re.destination.droppableId)].items.splice(
        re.destination.index,
        0,
        dragItem
      );
    }



    setBoardData(newBoardData);


  };
  /********************************* End of Drag Fun **********************************/


  return (
    <Layout>
      <div className="mx-3 flex h-screen">
        {/* Board columns */}
        {ready && (
          <DragDropContext onDragEnd={onDragEnd} >
            <div className="grid grid-cols-4 gap-10 m-5">
              {boardData.map((board, bIndex) => {
                //to show Answers col 
                if (bIndex == 0) {
                  return (
                    <div key={board.name} className='flex row-span-3 -ms-20 me-10'>
                      <Droppable droppableId={bIndex.toString()} key={board.name} >
                        {(provided, snapshot) => (
                          //snapshot نسخه من اللى بسحبه
                          <div
                            {...provided.droppableProps}//????????????
                            ref={provided.innerRef}
                          >
                            <div
                              className={`bg-gray-100 rounded-md shadow-md
                              flex flex-col relative overflow-hidden pb-5
                              ${snapshot.isDraggingOver && "bg-violet-200"}`}
                            >
                              {/* style for line at the top of div */}
                              <span className=
                                "w-full h-1 bg-gradient-to-r from-pink-700 to-red-200 absolute inset-x-0 top-0">
                              </span>

                              {/* header for each div or block */}
                              <h4 className="p-3 flex justify-center items-center mb-2">
                                <span className="text-2xl text-sky-800 ">
                                  {board.name}
                                </span>
                              </h4>

                              <div className="overflow-y-auto overflow-x-hidden h-auto"
                                style={{ maxHeight: 'calc(100vh - 290px)' }}>
                                {/* board.items.length > 0 && */}
                                {board.items.map((item, iIndex) => {
                                  return (
                                    <CardItem
                                      key={item.id}
                                      data={item}
                                      index={iIndex}
                                    />
                                  );
                                })}
                                {provided.placeholder}
                              </div>

                            </div>
                          </div>
                        )}
                      </Droppable>
                    </div>
                  );
                }

                // to display other columns ---------------------
                return (
                  <div className='me-7'>
                  <Droppable droppableId={bIndex.toString()} key={board.name} >
                    {(provided, snapshot) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        <div
                          className={`bg-gray-100 rounded-md shadow-md
                                    flex flex-col relative overflow-hidden
                                    ${snapshot.isDraggingOver && "bg-violet-100"} `
                          }
                        >

                          <span className=
                            "w-full h-1 bg-gradient-to-r from-pink-700 to-red-200 absolute inset-x-0 top-0">
                          </span>

                          <h4 className=" p-3 flex justify-center items-center mb-2">
                            <span className="text-2xl text-gray-600">
                              {board.name}
                            </span>
                          </h4>

                          <div className="overflow-y-auto overflow-x-hidden h-auto"
                            style={{ maxHeight: 'calc(100vh - 290px)' }}>
                            {

                              board.items.map((item, iIndex) => {
                                var shdowcolor = 'shadow-red-300';
                                return (
                                  <div key={uuidv4()} className={`m-3  pt-3`}>
                                    <CardItem
                                      key={item.id}
                                      data={item}
                                      index={iIndex}
                                      className={`${shdowcolor}`}
                                    />
                                    {item.id === bIndex ?
                                      (
                                        <div className='flex justify-center items-center'>
                                          <CheckBadgeIcon className='w-16 h-7 text-green-600'></CheckBadgeIcon>
                                        </div>
                                      )
                                      : (
                                        <div className='flex justify-center items-center'>
                                          <XCircleIcon className='w-16 h-7 text-red-700'></XCircleIcon>
                                        </div>)
                                    }
                                    {/* {item.id === bIndex ? (
                                        <><div className='text-green-700'>
                                            <p>Success</p>
                                          </div></>) 
                                          :(<div className='text-red-700'>
                                          <p>fail</p>
                                        </div>)}
                                    */}
                                  </div>
                                );
                              })
                            }
                            {provided.placeholder}
                          </div>
                        </div>
                      </div>
                    )}
                  </Droppable>
                  </div>
                );
              })}
            </div>
          </DragDropContext>
        )}
      </div>
    </Layout>
  );
}
