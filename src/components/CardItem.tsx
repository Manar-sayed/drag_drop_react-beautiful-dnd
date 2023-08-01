import React from 'react'
import Image from "next/image";
import { Draggable } from 'react-beautiful-dnd';

function CardItem({ data, index }:any) {
    return (
      <Draggable index={index} draggableId={data.id.toString()} key={data.id}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`bg-gray-600 rounded-md p-3 m-3 mt-0 last:mb-0 hover:bg-gray-500`}
          >
            <h5 className="text-md my-3 text-lg leading-6 text-center">{data.title}</h5>
            {/* <h1>{data.id}</h1> */}
          </div>
        )}
      </Draggable>
    );
  }
export default CardItem