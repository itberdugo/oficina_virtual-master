import React from "react";

export default function PQRSVG({color = "currentColor"}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="Layer_1"
      enableBackground="new 0 0 50 50"
      version="1.1"
      viewBox="0 0 50 50"
      xmlSpace="preserve"
      fill={color}
    >
      <g id="Layer_1_1_">
        <path d="M29.618 5l-2-4h-5.236l-2 4H17v2H8v42h34V7h-9V5h-3.382zm-8 2l2-4h2.764l2 4H31v6H19V7h2.618zM33 15v-2h3v30H14V13h3v2h16zm7-6v38H10V9h7v2h-5v34h26V11h-5V9h7z"></path>
        <path d="M24 6H26V8H24z"></path>
        <path d="M18 19H32V21H18z"></path>
        <path d="M18 25H32V27H18z"></path>
        <path d="M18 31H32V33H18z"></path>
        <path d="M18 37H32V39H18z"></path>
      </g>
    </svg>
  );
}
