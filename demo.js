// File name: demo.js

import { MyToolkit } from "./mytoolkit.js";

var btn = new MyToolkit.Button();
btn.text = "Button1";
btn.move(20, 20);
btn.onclick(function (e) {
  console.log(e);
});
btn.stateChanged(function (event) {
  console.log(event);
});

var checkbox = new MyToolkit.CheckBox();
checkbox.text = "Checkbox1";
checkbox.move(50, 50);
checkbox.checkStateChanged(function (e) {
  console.log(e);
});
checkbox.widgetStateChanged(function (event) {
  console.log(event);
});

var scrollbar = new MyToolkit.ScrollBar();
scrollbar.height = 150;
console.log(scrollbar.thumbPosition);
scrollbar.move(10, 10);
scrollbar.scrollThumbMoved(function (e) {
  console.log(e);
});
scrollbar.stateChanged(function (event) {
  console.log(event);
});

var textbox = new MyToolkit.TextBox();
textbox.move(30, 100);
textbox.textChanged(function (e) {
  console.log(e);
});
textbox.widgetStateChanged(function (event) {
  console.log(event);
});

var options = [
  ["RadioButton 0", false],
  ["RadioButton 1", false],
  ["RadioButton 2", true],
];
var radiobutton = new MyToolkit.RadioButton(options);
radiobutton.move(10, 10);
radiobutton.checkStateChanged(function (e) {
  console.log(e);
});
radiobutton.widgetStateChanged(function (event) {
  console.log(event);
});
