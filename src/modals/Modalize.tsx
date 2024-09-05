import React from "react";

export default function Modalize({
  component,
  componentProps
}: {
  component: any,
  componentProps: any
}) {
  return  <div className="fixed top-0 left-0 w-screen h-screen overflow-y-auto bg-neutral-950/50 z-50 flex flex-col justify-center items-center">
    {React.createElement(component, componentProps)}
  </div>
}