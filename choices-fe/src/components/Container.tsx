import React from "react";

interface ContainerProp {
    visible: boolean,
    children:React.ReactNode
}
const Container:React.FC<ContainerProp>=({visible,children})=>{
  if(visible){
      return <div>
          {children}
      </div>
  }
  return <div></div>
}
export default Container;