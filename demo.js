// File name: demo.js

import { MyToolkit } from "./mytoolkit.js";

var btn = new MyToolkit.Button();
btn.text = "Button 1";
btn.move(20, 20);
btn.onclick(function (e) {
  console.log("Button clicked: " + e);
});
btn.stateChanged(function (event) {
  console.log("Button state changed: " + event);
});

var checkbox = new MyToolkit.CheckBox();
checkbox.text = "Checkbox 1";
checkbox.move(50, 50);
checkbox.checkStateChanged(function (e) {
  console.log("Check state changed: " + e);
});
checkbox.widgetStateChanged(function (event) {
  console.log("Checkbox state changed: " + event);
});

var scrollbar = new MyToolkit.ScrollBar();
scrollbar.height = 150;
scrollbar.move(10, 10);
scrollbar.scrollThumbMoved(function (e) {
  console.log("Scroll thumb moved: " + e);
});
scrollbar.stateChanged(function (event) {
  console.log("Scrollbar state changed: " + event);
});

var slider = new MyToolkit.Slider();
slider.ticks = 7;
slider.start = "Low";
slider.end = "High";
slider.move(10, 10);
slider.stateChanged(function (event) {
  console.log("Slider state changed: " + event);
});
slider.tickChanged(function (event) {
  console.log("Slider tick changed: " + event);
});

var progressbar = new MyToolkit.ProgressBar();
progressbar.width = 200;
progressbar.move(10, 10);
setInterval(loopProgressBar, 1000);
function loopProgressBar() {
  if (progressbar.incrementValue >= 100) {
    progressbar.incrementValue = 0;
  } else {
    progressbar.increment(10);
  }
}
progressbar.stateChanged(function (event) {
  console.log("Progress bar state changed: " + event);
});
progressbar.progressIncremented(function (event) {
  console.log("Progress bar value changed: " + event);
});

var textbox = new MyToolkit.TextBox();
textbox.move(30, 100);
textbox.textChanged(function (e) {
  console.log("Text in textbox changed: " + e);
});
textbox.widgetStateChanged(function (event) {
  console.log("Textbox state changed: " + event);
});

var options = [
  ["RadioButton 0", false],
  ["RadioButton 1", false],
  ["RadioButton 2", true],
];
var radiobutton = new MyToolkit.RadioButton(options);
radiobutton.move(30, 10);
radiobutton.checkStateChanged(function (e) {
  console.log("Radio button check state changed: " + e);
});
radiobutton.widgetStateChanged(function (event) {
  console.log("Radio button state changed: " + event);
});
