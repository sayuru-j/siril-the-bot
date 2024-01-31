import React from "react";
import { IconType } from "react-icons";
import { IoClose, IoAdd, IoKey, IoCube } from "react-icons/io5";
import { BiSolidChevronDownSquare } from "react-icons/bi";
import { IoIosSettings, IoMdAnalytics, IoIosPeople } from "react-icons/io";
import { MdFileCopy } from "react-icons/md";
import { MdKeyOff } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";

type Icon = {
  name: IconNames;
  icon: IconType;
};

type IconNames =
  | "close"
  | "add"
  | "arrow-down"
  | "setting"
  | "key"
  | "cube"
  | "copy"
  | "key-off"
  | "delete"
  | "analytics"
  | "people";
type IconSizes = "sm" | "md" | "lg" | "xl";

const iconSizes = {
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
};

const icons: Icon[] = [
  {
    name: "close",
    icon: IoClose,
  },
  {
    name: "add",
    icon: IoAdd,
  },
  {
    name: "arrow-down",
    icon: BiSolidChevronDownSquare,
  },
  {
    name: "setting",
    icon: IoIosSettings,
  },
  {
    name: "key",
    icon: IoKey,
  },
  {
    name: "cube",
    icon: IoCube,
  },
  {
    name: "copy",
    icon: MdFileCopy,
  },
  {
    name: "key-off",
    icon: MdKeyOff,
  },
  {
    name: "delete",
    icon: MdOutlineDelete,
  },
  {
    name: "analytics",
    icon: IoMdAnalytics,
  },
  {
    name: "people",
    icon: IoIosPeople,
  },
];

interface IconRendererProps {
  iconName: IconNames;
  iconSize?: IconSizes;
}

export default function IconRenderer({
  iconName,
  iconSize = "md",
}: IconRendererProps): React.JSX.Element | null {
  const selectedIcon = icons.find((icon) => icon.name === iconName);
  const size = iconSizes[iconSize];

  if (selectedIcon) {
    const IconComponent = selectedIcon.icon;
    return <IconComponent size={size} />;
  }

  return null;
}
