// File name: demo.js

import { MyToolkit } from "./mytoolkit.js";

// Implement a MyToolkit Button
var btn = new MyToolkit.Button();
btn.text = "Button1";
btn.setID("btn1");
btn.move(100, 100);
btn.onclick(function (e) {
  console.log(e);
});
btn.stateChanged(function (event) {
  console.log(event);
});
