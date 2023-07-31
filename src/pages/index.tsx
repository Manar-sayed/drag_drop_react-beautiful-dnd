
import Layout from '@/components/layout'
import CardItem from '@/components/CardItem'
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import BoardData from "../data/board-data.json";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export default function Home() {
  const [ready, setReady] = useState(false);
  const [show, setShow] = useState(null);
  const [boardData, setBoardData] = useState(BoardData);
  // const [showForm, setShowForm] = useState(false);
  // const [selectedBoard, setSelectedBoard] = useState(0);
  //  const [fail, setFail] = useState(0);
let newBoardData;
  useEffect(() => {
    if (process) {
      setReady(true);
    }
  }, []);
  const makeTrue=(re:any)=>{
    setShow(re.source);
 
      console.log("show is ",show)
  

  }

  const onDragEnd = (re: any) => {
    if (!re.destination) return;
     newBoardData = boardData;

       var dragItem =newBoardData[parseInt(re.source.droppableId)].items[re.source.index];
       // to enable each colum to take one value
        const m=newBoardData[parseInt(re.destination.droppableId)].items.length+1
        const n=newBoardData[parseInt(re.destination.droppableId)].name
        if(m >1 ){
          if(n==="Answers"){
            newBoardData[parseInt(re.destination.droppableId)].items.push(
              //re.destination.index,
              dragItem
           );
           newBoardData[parseInt(re.source.droppableId)].items.splice(
             re.source.index,
             1
           );
           
          console.log("n =>",n)
          }
          // newBoardData[parseInt(re.source.droppableId)].items.splice(
          //   re.source.index,
          //   1
          // );
          // newBoardData[parseInt(re.destination.droppableId)].items.splice(
          //   re.destination.index,
          //   0,
          //   dragItem
          // );

          return;
        }
        else{
          // if(n=='Answers'){console.log("Answers")}
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
     
      // console.log("m",m,re.destination.droppableId)
   

      setBoardData(newBoardData);


  };

  var changeClassName = 'bg-sky-100';
  return (
    <Layout>
      <div className="p-10 flex flex-col h-screen">
        {/* Board columns */}
        {ready && (
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="grid grid-cols-4 gap-5 my-5">

              {boardData.map((board, bIndex) => {
                // var hasOneOrZeroCards = true;
                // if (board.items.length > 1) {
                //   hasOneOrZeroCards = true;
                // }

                if (bIndex == 0) {
                  return (
                    <div key={board.name} className='flex  row-span-5'>
                      <Droppable droppableId={bIndex.toString()} key={board.name} >
                        {(provided, snapshot) => (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                          >
                            <div
                              className={`bg-gray-100 rounded-md shadow-md
                              flex flex-col relative overflow-hidden
                              ${snapshot.isDraggingOver && "bg-green-100"}`}
                            >
                              {/* style for line at the top of div */}
                              <span
                                className="w-full h-1 bg-gradient-to-r from-pink-700 to-red-200
                            absolute inset-x-0 top-0"></span>
                              {/* header for each div or block */}
                              <h4 className=" p-3 flex justify-between items-center mb-2">
                                <span className="text-2xl text-gray-600">
                                  {board.name}
                                </span>
                              </h4>

                              <div className="overflow-y-auto overflow-x-hidden h-auto"
                                style={{ maxHeight: 'calc(100vh - 290px)' }}>
                                {board.items.length > 0 &&
                                  board.items.map((item, iIndex) => {
                                    return (
                                      <CardItem
                                        key={item.id}
                                        data={item}
                                        index={iIndex}
                                        className="m-3"
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
                  <Droppable droppableId={bIndex.toString()} key={board.name}>
                    {(provided, snapshot) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        <div
                          className={`${changeClassName} rounded-md shadow-md
                                    flex flex-col relative overflow-hidden
                                    ${snapshot.isDraggingOver && "bg-green-100"} `
                          }
                        >

                          <span
                            className="w-full h-1 bg-gradient-to-r from-pink-700 to-red-200
                                absolute inset-x-0 top-0"></span>
                          {/* header for each div or block */}
                          <h4 className=" p-3 flex justify-between items-center mb-2">
                            <span className="text-2xl text-gray-600">
                              {board.name}
                            </span>
                          </h4>
                          {board.items.length == 1 && (
                            <div className="overflow-y-auto overflow-x-hidden h-auto"
                              style={{ maxHeight: 'calc(100vh - 290px)' }}>
                              {
                                board.items.map((item, iIndex) => {
                                  return (
                                    <div key={uuidv4()} className="m-3">
                                      <CardItem
                                        key={item.id}
                                        data={item}
                                        index={iIndex}
                                        className={`m-3`}
                                      />
                                      {item.id === bIndex ? (
                                        <>
                                          <div className='text-green-700'>
                                            <p>Success</p>
                                          </div>
                                          {/* changeClassName='bg-green-200' */}
                                        </>

                                      ) :
                                        (<div className='text-red-700'>
                                          <p>fail</p>
                                        </div>)}
                                    </div>
                                  );

                                })
                              }
                              {provided.placeholder}
                            </div>
                          )}


                        </div>
                      </div>
                    )}
                    
                  </Droppable>
                );
                // to display other columns ---------------------




              })}
            </div>
          </DragDropContext>
        )}
      </div>
    </Layout>
  );
}
