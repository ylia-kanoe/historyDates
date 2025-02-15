import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { Slider } from "./components/slider";
import './style.scss'

ReactDOM.createRoot(document.getElementById("app") as HTMLElement).render(
    <div>
        <Slider />
    </div>
);