// File name: demo.js

import { MyToolkit } from "./mytoolkit.js";

// Implement a MyToolkit Button
var btn = new MyToolkit.Button();
btn.text = "Button1";
btn.move(20, 20);
btn.onclick(function (e) {
  console.log(e);
});
btn.stateChanged(function (event) {
  console.log(event);
});
