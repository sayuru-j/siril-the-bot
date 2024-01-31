"use client";

import { SideBarItems } from "@/utils/SideBar";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import Keys from "../Keys";
import Models from "../Models";
import IconRenderer from "./Icons";

type SideBarProps = {
  children?: React.ReactNode;
  title?: string;
};

type SelectedItem = {
  name: string;
  isSelected: boolean;
};

const SideBar: React.FC<SideBarProps> = ({ children, title }) => {
  const path = usePathname();
  const [selectedItem, setSelectedItem] = useState<SelectedItem>({
    name: "",
    isSelected: false,
  });

  function openSidebarItem(name: string) {
    setSelectedItem({ name: name, isSelected: true });
  }

  function closeSidebarItem(name: string) {
    setSelectedItem({ name: name, isSelected: false });
  }

  return (
    <div className="h-full w-full lg:grid lg:grid-cols-4 flex">
      <div className="lg:hidden flex flex-col px-3 py-6 gap-4 items-center border-r-2 border-black">
        <h1 className="">
          <IconRenderer iconName="setting" iconSize="lg" />
        </h1>
        <div className="flex flex-col gap-2">
          {SideBarItems.map((item) => (
            <button
              key={item.name}
              className={`${
                selectedItem.name === item.name && selectedItem.isSelected
                  ? "rotate-6"
                  : ""
              } bg-accent inline-flex items-start p-2 font-bold uppercase border-black border-2 shadow-[4px_4px_0px_rgba(0,0,0,1)]`}
              type="button"
              onClick={() => openSidebarItem(item.name)}
            >
              {item.name === "Keys" && <IconRenderer iconName="key" />}
              {item.name === "Models" && <IconRenderer iconName="cube" />}
              {item.name === "Personalities" && (
                <IconRenderer iconName="people" />
              )}
              {item.name === "Analytics" && (
                <IconRenderer iconName="analytics" />
              )}
            </button>
          ))}
        </div>
      </div>
      <div className="h-full px-8 py-6 border-r-2 border-black hidden lg:block">
        {children}
        <h1 className="uppercase font-bold p-1">
          {title
            ? title
            : path.split("/")[path.split("/").length - 1].toUpperCase()}
        </h1>
        <div className="py-6 flex flex-col items-center justify-center gap-4">
          {SideBarItems.map((item) => (
            <button
              key={item.name}
              className={`${
                selectedItem.name === item.name && selectedItem.isSelected
                  ? "rotate-2"
                  : ""
              } bg-accent w-full inline-flex items-start p-2 font-bold uppercase border-black border-2 shadow-[4px_4px_0px_rgba(0,0,0,1)]`}
              type="button"
              onClick={() => openSidebarItem(item.name)}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
      {selectedItem.isSelected && (
        <div className="col-span-3 p-6 w-full">
          <div className="flex w-full justify-between items-start">
            <button
              type="button"
              className="px-8 py-1 font-bold inline-flex items-center justify-center bg-secondary-accent border-2 border-black mb-6 gap-2 shadow-[4px_4px_0px_rgba(0,0,0,1)]"
            >
              <>{selectedItem.name}</>
              <IconRenderer iconName="arrow-down" />
            </button>
            <button
              onClick={() => closeSidebarItem(selectedItem.name)}
              title="CloseBtn"
              type="button"
              className="px-2 flex items-start justify-center"
            >
              <IconRenderer iconName="close" />
            </button>
          </div>
          <div>
            {selectedItem.name === "Keys" && (
              <Keys
                key={selectedItem.name}
                isSelected={selectedItem.isSelected}
              />
            )}
            {selectedItem.name === "Models" && (
              <Models
                key={selectedItem.name}
                isSelected={selectedItem.isSelected}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBar;
