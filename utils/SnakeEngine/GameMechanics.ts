import { Dispatch, SetStateAction } from "react";

export const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, setDirection: Dispatch<SetStateAction<string>>) => {
    switch (e.key) {
        case "ArrowUp":
            setDirection("ArrowUp");
            console.log("ArrowUp")
            break;
        case "ArrowDown":
            console.log("ArrowDown")
            setDirection("ArrowDown");
            break;
        case "ArrowLeft":
            console.log("ArrowLeft")
            setDirection("ArrowLeft");
            break;
        case "ArrowRight":
            console.log("ArrowRight")
            setDirection("ArrowRight");
            break;
    }
}