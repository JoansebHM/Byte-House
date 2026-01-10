import type React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

function Button(props: ButtonProps) {
  return (
    <button
      className="cursor-pointer w-full py-3 bg-black dark:bg-white text-white dark:text-black border border-black dark:border-white font-bold hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white transition-colors"
      {...props}
    >
      {props.label}
    </button>
  );
}

export default Button;
