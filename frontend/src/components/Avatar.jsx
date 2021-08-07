import React from "react";
import { ReactComponent as AvatarSvg } from "../assets/images/avatar.svg";
import { stringToGradient } from "../scripts/utils";

const Avatar = ({ name, className = "" }) => {
  return (
    <span
      style={{ backgroundImage: stringToGradient(name) }}
      className={`w-10 h-10 p-2 inline-flex rounded-full text-white ${className}`}
    >
      <AvatarSvg className="text-white fill-current" />
    </span>
  );
};

export default Avatar;
