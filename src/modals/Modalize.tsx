import React from "react";
import Close from "@/components/Close";
import { cn } from "@/utils/tailwind";

export default function Modalize({
  component,
  modalClassName="",
  componentProps
}: {
  modalClassName: string
}) {
  console.log(modalClassName);
  return  <div className="fixed top-0 left-0 w-screen h-screen overflow-y-auto bg-neutral-950/50 z-50 flex flex-col justify-center items-center">
    <div className="flex justify-end w-full max-w-[750px]">
      <Close onClick={componentProps.close} />
    </div>
    <div className={cn("rounded-lg border border-slate-600 bg-neutral-950 w-full h-[360px] max-w-[750px] overflow-x-hidden overflow-y-auto", modalClassName)}>
      {React.createElement(component, componentProps)}
    </div>
  </div>
}