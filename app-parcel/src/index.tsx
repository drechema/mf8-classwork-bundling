/*
import './mystyles.css';
const logoImg = require('./content/logo_1.png');

let sampleNumber: number = null;
sampleNumber = 6;
console.log(`Hello from parcel ${sampleNumber}`);

const img = document.createElement("img");
img.src = logoImg;
document.getElementById('imgContainer').appendChild(img);
*/
import React from "react";
import ReactDOM from "react-dom";
import { HelloComponent } from "./hello";

ReactDOM.render(<HelloComponent />, document.getElementById("root"));