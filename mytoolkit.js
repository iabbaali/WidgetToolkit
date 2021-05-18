// File name: mytoolkit.js

import { SVG } from "./svg.min.js";

var idleColor = "#7CB9E8";
var pressedColor = "#002D62";
var hoverColor = "#545AA7";
var textColor = "#fff";
var draw = SVG().addTo("body").size("100%", "100%");

/**
 * This function represents the entire toolkit. The following widgets
 * are available in this toolkit:
 * Button, Checkbox, Radio Button, Text Box, Scroll Bar, Progress Bar, and Slider.
 */
var MyToolkit = (function () {
  const states = {
    IDLE: "idle",
    PRESSED: "pressed",
    EXECUTE: "execute",
    HOVER: "hover",
    UPDATE: "update",
  };
  /**
   * Creates the Button widget and exposes the following methods:
   * move, stateChanged, onclick, and text (setter)
   * @constructor
   * @memberof MyToolkit
   * @returns {} Button widget
   */
  var Button = function () {
    var clickEvent = null;
    var currentState = states.IDLE;
    var stateEvent = null;

    // var draw = SVG().addTo("body");
    var group = draw.group();
    var rect = group.rect(100, 50).fill({ color: idleColor }).radius(20);
    var text = group
      .text("")
      .font({ family: "Lato, sans-serif", size: 18 })
      .fill({ color: textColor });

    text.center(rect.width() / 2, rect.height() / 2);

    rect.mouseover(function () {
      rect.fill({ color: hoverColor });
      currentState = states.HOVER;
      transition();
    });
    rect.mouseout(function () {
      rect.fill({ color: idleColor });
      currentState = states.IDLE;
      transition();
    });
    rect.mouseup(function (event) {
      if (currentState == states.PRESSED) {
        if (clickEvent != null) {
          currentState = states.EXECUTE;
          transition();
          clickEvent(event);
        }
      }
      currentState = states.HOVER;
      rect.fill({ color: hoverColor });
      transition();
    });
    rect.mousedown(function () {
      rect.fill({ color: pressedColor });
      currentState = states.PRESSED;
      transition();
    });
    function transition() {
      if (stateEvent != null) {
        stateEvent(currentState);
      }
    }
    return {
      /**
       * Moves the button widget to the specified x and y coordinate
       * @param {number} x x coordinate
       * @param {number} y y coordinate
       * @memberof MyToolkit.Button
       * @instance
       */
      move: function (x, y) {
        group.move(x, y);
      },
      /**
       * Exposes an event handler that notifies consuming code when the widget state has changed
       * @param {function} eventHandler An event handler for when the widget state changes
       * @memberof MyToolkit.Button
       * @instance
       */
      stateChanged: function (eventHandler) {
        stateEvent = eventHandler;
      },
      /**
       * Exposes an event handler that notifies consuming code when the button is clicked
       * @param {function} eventHandler An event handler for when the button is clicked
       * @memberof MyToolkit.Button
       * @instance
       */
      onclick: function (eventHandler) {
        clickEvent = eventHandler;
      },
      /**
       * The text content inside the button
       * @memberof MyToolkit.Button
       * @instance
       * @type {string}
       */
      set text(content) {
        text.text(content);
        text.center(rect.width() / 2, rect.height() / 2);
      },
    };
  };
  /**
   * Creates the CheckBox widget and exposes the following methods:
   * move, widgetStateChanged, checkStateChanged, and text (setter)
   * @constructor
   * @memberof MyToolkit
   * @returns {} CheckBox widget
   */
  var CheckBox = function () {
    const checkStates = {
      UNCHECKED: "unchecked",
      CHECKED: "checked",
    };

    var currentCheckState = checkStates.UNCHECKED;
    var currentWidgetState = states.IDLE;
    var checkStateEvent = null;
    var widgetStateEvent = null;

    // var draw = SVG().addTo("body");
    var group = draw.group();
    var box = group.rect(30, 30).fill({ color: idleColor }).radius(10);
    var line1 = group.line(box.x() - 20, box.y() + 20, box.x(), box.y());
    line1.stroke({ color: pressedColor, width: 3, linecap: "round" });
    line1.center(box.cx(), box.cy());
    line1.hide();
    var line2 = group.line(box.x(), box.y(), box.x() + 20, box.y() + 20);
    line2.stroke({ color: pressedColor, width: 3, linecap: "round" });
    line2.center(box.cx(), box.cy());
    line2.hide();
    var text = group.text("").font({ family: "Lato, sans-serif" });
    text.x(box.x() + box.width());
    text.cy(box.cy());

    box.mouseover(function () {
      box.fill({ color: hoverColor });
      currentWidgetState = states.HOVER;
      transition();
    });
    box.mouseout(function () {
      box.fill({ color: idleColor });
      currentWidgetState = states.IDLE;
      transition();
    });
    group.click(function (event) {
      if (currentCheckState == checkStates.CHECKED) {
        currentCheckState = checkStates.UNCHECKED;
        line1.hide();
        line2.hide();
      } else if (currentCheckState == checkStates.UNCHECKED) {
        currentCheckState = checkStates.CHECKED;
        line1.show();
        line2.show();
        line1.center(box.cx(), box.cy());
        line2.center(box.cx(), box.cy());
      }
      currentWidgetState = states.PRESSED;
      if (checkStateEvent != null) {
        checkStateEvent(currentCheckState);
      }
      transition();
    });
    function transition() {
      if (widgetStateEvent != null) {
        widgetStateEvent(currentWidgetState);
      }
    }
    return {
      /**
       * Moves the checkbox widget to the specified x and y coordinate
       * @param {number} x x coordinate
       * @param {number} y y coordinate
       * @memberof MyToolkit.CheckBox
       * @instance
       */
      move: function (x, y) {
        group.move(x, y);
      },
      /**
       * Exposes an event handler that notifies consuming code when the widget state has changed
       * @param {function} eventHandler An event handler for when the widget state changes
       * @memberof MyToolkit.CheckBox
       * @instance
       */
      widgetStateChanged: function (eventHandler) {
        widgetStateEvent = eventHandler;
      },
      /**
       * Exposes an event handler that notifies consuming code when the checked state has changed
       * @param {function} eventHandler An event handler for when the box is checked/unchecked
       * @memberof MyToolkit.CheckBox
       * @instance
       */
      checkStateChanged: function (eventHandler) {
        checkStateEvent = eventHandler;
      },
      /**
       * The text content next to the check box
       * @memberof MyToolkit.CheckBox
       * @instance
       * @type {string}
       */
      set text(content) {
        text.text(content);
        text.x(box.x() + box.width());
        text.cy(box.cy());
      },
    };
  };
  /**
   * Creates the RadioButton widget and exposes the following methods:
   * move, widgetStateChanged, and checkStateChanged
   * @constructor
   * @param {Array} options An array that contains subarrays for each radio button ([[string, boolean]]). The first element of the subarray is the text next to the radio button (string) and the second element is whether or not the button is selected (boolean). Only one button can be selected (true) at a time.
   * @memberof MyToolkit
   * @returns {} RadioButton widget
   */
  var RadioButton = function (options) {
    var checkStateEvent = null;
    var widgetStateEvent = null;
    var currentWidgetState = states.IDLE;

    const clearOptions = () => {
      var j = -1;
      for (let i = 0; i < options.length; ++i) {
        let opt = options[i];
        if (opt[1] === true) {
          j = i;
        }
        opt[1] = false;
      }
      if (j !== -1) {
        options[j][1] = true;
      }
    };
    const updateState = (options, innerBoxes) => {
      for (let i = 0; i < options.length; i++) {
        if (options[i][1] === true) {
          innerBoxes[i].show();
          innerBoxes[i].cx(outerBoxes[i].cx());
          innerBoxes[i].cy(outerBoxes[i].cy());
        } else {
          innerBoxes[i].hide();
        }
      }
    };

    const transition = () => {
      if (widgetStateEvent != null) {
        widgetStateEvent(currentWidgetState);
      }
    };

    const resetOptions = () => {
      for (let i = 0; i < options.length; ++i) {
        let opt = options[i];
        opt[1] = false;
      }
    };
    clearOptions();

    let outerBoxes = [];
    let innerBoxes = [];

    // var draw = SVG().addTo("body").size("100%", "100%");
    var outer = draw.group();
    var currY = null;
    for (let opt of options) {
      let group = outer.group();
      let box = group.circle(25).fill({ color: idleColor });
      let text = group.text(opt[0]).font({ family: "Lato, sans-serif" });
      let innerBox = group.circle(18).fill({ color: pressedColor });
      innerBox.cx(box.cx());
      innerBox.cy(box.cy());
      innerBoxes.push(innerBox);
      outerBoxes.push(box);

      text.x(box.x() + box.width());
      text.cy(box.cy());

      if (currY) {
        group.y(currY + box.height() / 2);
      }
      currY = group.y() + box.height();
    }
    // draw.size("100%", currY * 2);
    updateState(options, innerBoxes);

    for (let i = 0; i < options.length; ++i) {
      outerBoxes[i].click(function (event) {
        resetOptions();
        options[i][1] = true;
        if (checkStateEvent != null) {
          checkStateEvent(i);
        }
        currentWidgetState = states.PRESSED;
        transition();
        updateState(options, innerBoxes);
      });
      outerBoxes[i].mouseover(() => {
        outerBoxes[i].fill({ color: hoverColor });
        currentWidgetState = states.HOVER;
        transition();
      });
      outerBoxes[i].mouseout(() => {
        outerBoxes[i].fill({ color: idleColor });
        currentWidgetState = states.IDLE;
        transition();
      });
    }
    return {
      /**
       * Moves the radio button widget to the specified x and y coordinate
       * @param {number} x x coordinate
       * @param {number} y y coordinate
       * @memberof MyToolkit.RadioButton
       * @instance
       */
      move: function (x, y) {
        outer.move(x, y);
      },
      /**
       * Exposes an event handler that notifies consuming code when the widget state has changed
       * @param {function} eventHandler An event handler for when the widget state changes
       * @memberof MyToolkit.RadioButton
       * @instance
       */
      widgetStateChanged: function (eventHandler) {
        widgetStateEvent = eventHandler;
      },
      /**
       * Exposes an event handler that notifies consuming code when the checked state has changed and which n has been checked
       * @param {function} eventHandler An event handler for when the checked state changes and to which n
       * @memberof MyToolkit.RadioButton
       * @instance
       */
      checkStateChanged: function (eventHandler) {
        checkStateEvent = eventHandler;
      },
    };
  };
  /**
   * Creates the TextBox widget and exposes the following methods:
   * move, widgetStateChanged, and textChanged
   * @constructor
   * @memberof MyToolkit
   * @returns {} TextBox widget
   */
  var TextBox = function () {
    var textChangedEvent = null;
    var widgetStateEvent = null;
    var currentWidgetState = states.IDLE;

    // var draw = SVG().addTo("body");
    var group = draw.group();
    var box = group
      .rect(225, 30)
      .attr({
        stroke: pressedColor,
        fill: idleColor,
        opacity: 0.5,
        strokeColor: pressedColor,
        "stroke-width": 1.5,
      })
      .radius(5);
    var text = group.text("").font({ family: "Lato, sans-serif", size: 12 });
    text.x(box.x());
    text.cy(box.cy());
    var caret = group.rect(2, 15).fill({ color: hoverColor });
    caret.move(box.x() + text.length(), box.y());
    caret.cy(box.cy());
    caret.hide();
    var runner = caret.animate().width(0);
    runner.loop(1000, 1, 0);

    const notifyTextChanged = (text) => {
      if (textChangedEvent != null) {
        textChangedEvent(text);
      }
    };

    const transition = () => {
      if (widgetStateEvent != null) {
        widgetStateEvent(currentWidgetState);
      }
    };

    SVG.on(window, "keyup", (event) => {
      var prevState = currentWidgetState;
      currentWidgetState = states.UPDATE;
      let previousText = text.text();
      transition();
      switch (event.key) {
        case "Backspace": {
          let content = text.text().substring(0, text.text().length - 1);
          text.text(content);
          text.cy(box.cy());
          caret.x(box.x() + text.length());
          if (text.text() !== previousText) {
            notifyTextChanged(text.text());
          }

          break;
        }
        case "Control": {
        }
        case "Shift": {
          break;
        }
        default: {
          if (text.length() < box.width() - 5) {
            text.text(text.text() + event.key);
            text.cy(box.cy());
            caret.x(box.x() + text.length());
            if (text.text() !== previousText) {
              notifyTextChanged(text.text());
            }
          }
        }
      }
      currentWidgetState = prevState;
      transition();
    });
    box.mouseover(function () {
      caret.show();
      caret.move(box.x() + text.length(), box.y());
      caret.cy(box.cy());
      runner.loop(10000, 1, 0);
      currentWidgetState = states.HOVER;
      transition();
    });
    box.mouseout(function () {
      currentWidgetState = states.IDLE;
      transition();
      caret.hide();
    });
    return {
      /**
       * Moves the text box widget to the specified x and y coordinate
       * @param {number} x x coordinate
       * @param {number} y y coordinate
       * @memberof MyToolkit.TextBox
       * @instance
       */
      move: function (x, y) {
        group.move(x, y);
      },
      /**
       * Exposes an event handler that notifies consuming code when the widget state has changed
       * @param {function} eventHandler An event handler for when the widget state changes
       * @memberof MyToolkit.TextBox
       * @instance
       */
      widgetStateChanged: function (eventHandler) {
        widgetStateEvent = eventHandler;
      },
      /**
       * Exposes an event handler that notifies consuming code when the text has changed
       * @param {function} eventHandler An event handler for when the text changes
       * @memberof MyToolkit.TextBox
       * @instance
       */
      textChanged: function (eventHandler) {
        textChangedEvent = eventHandler;
      },
      /**
       * The text in the text box
       * @memberof MyToolkit.TextBox
       * @instance
       * @type {string}
       */
      get text() {
        return text.text();
      },
    };
  };
  /**
   * Creates the ScrollBar widget and exposes the following methods:
   * move, stateChanged, scrollThumbMoved, height (setter), and thumbPosition (getter)
   * @constructor
   * @memberof MyToolkit
   * @returns {} ScrollBar widget
   */
  var ScrollBar = function () {
    var scrollThumbEvent = null;
    var currentState = states.IDLE;
    var stateEvent = null;
    var movingElement = null;
    var direction = null;

    // var draw = SVG().addTo("body").size(50, 250);
    var group = draw.group().attr({
      stroke: pressedColor,
      fill: idleColor,
      strokeColor: "#000",
      "stroke-width": 1,
    });
    var rect = group.rect(25, 150).fill({ color: idleColor }).radius(2);
    var topGroup = group.group();
    var topBtn = topGroup
      .rect(rect.height() / 6, rect.height() / 6)
      .fill({ color: pressedColor })
      .move(rect.x(), rect.y() - rect.height() / 6);
    var topArrow = topGroup.polygon("50, 0, 70, 40, 30, 40").size(20, 20);
    topArrow.cx(topBtn.cx());
    topArrow.cy(topBtn.cy());
    var bottomGroup = group.group();
    var bottomBtn = bottomGroup
      .rect(rect.height() / 6, rect.height() / 6)
      .fill({ color: pressedColor })
      .move(rect.x(), rect.y() + rect.height());
    var bottomArrow = bottomGroup.polygon("30, 0, 50, 40, 70, 0").size(20, 20);
    bottomArrow.cx(bottomBtn.cx());
    bottomArrow.cy(bottomBtn.cy());
    var thumb = group
      .rect(rect.height() / 6 - 4, rect.height() / 6)
      .fill({ color: pressedColor })
      .radius(2);
    thumb.y(thumb.y() + 2);
    thumb.cx(rect.cx());

    group.mouseover(function () {
      rect.fill({ color: hoverColor, opacity: 0.7 });
      currentState = states.HOVER;
      transition();
    });
    group.mouseout(function () {
      rect.fill({ color: idleColor });
      currentState = states.IDLE;
      transition();
    });
    topGroup.click(function () {
      let topMax = topArrow.height() + 10;
      if (thumb.y() - 10 <= topMax) {
        return;
      }
      thumb.y(thumb.y() - 10);
      currentState = states.UPDATE;
      transition();
      if (scrollThumbEvent != null) {
        scrollThumbEvent("up");
      }
    });
    bottomGroup.click(function () {
      let bottomMax = rect.height();
      if (thumb.y() >= bottomMax) {
        return;
      }
      thumb.y(thumb.y() + 10);
      currentState = states.UPDATE;
      transition();
      if (scrollThumbEvent != null) {
        scrollThumbEvent("down");
      }
    });
    thumb.mouseup(function () {
      movingElement = null;
    });
    thumb.mousedown(function () {
      movingElement = thumb;
    });
    SVG.on(group, "mouseleave", (event) => {
      if (scrollThumbEvent != null && direction != null) {
        scrollThumbEvent(direction);
        direction = null;
      }
      movingElement = null;
    });
    group.mousemove(function (event) {
      if (movingElement != null) {
        let newY = event.clientY - thumb.height();
        if (newY >= rect.height() + 8) {
          return;
        }
        if (newY - 16 <= topArrow.height()) {
          return;
        }
        if (newY < thumb.y()) {
          direction = "up";
        } else if (newY > thumb.y()) {
          direction = "down";
        }
        thumb.y(newY);
      }
    });
    function transition() {
      if (stateEvent != null) {
        stateEvent(currentState);
      }
    }
    return {
      /**
       * Moves the scroll bar widget to the specified x and y coordinate
       * @param {number} x x coordinate
       * @param {number} y y coordinate
       * @memberof MyToolkit.ScrollBar
       * @instance
       */
      move: function (x, y) {
        group.move(x, y);
      },
      /**
       * Exposes an event handler that notifies consuming code when the widget state has changed
       * @param {function} eventHandler An event handler for when the widget state changes
       * @memberof MyToolkit.ScrollBar
       * @instance
       */
      stateChanged: function (eventHandler) {
        stateEvent = eventHandler;
      },
      /**
       * Exposes an event handler that notifies consuming code when the scroll thumb has moved and in which direction (up vs. down)
       * @param {function} eventHandler An event handler for when the thumb moves up or down
       * @memberof MyToolkit.ScrollBar
       * @instance
       */
      scrollThumbMoved: function (eventHandler) {
        scrollThumbEvent = eventHandler;
      },
      /**
       * The height of the scroll bar
       * @memberof MyToolkit.ScrollBar
       * @instance
       * @type {number}
       */
      set height(h) {
        rect.height(h);
        draw.height(h * 1.75);
        bottomBtn.move(rect.x(), rect.y() + rect.height());
        bottomArrow.move(rect.x(), rect.y() + rect.height());
        bottomArrow.cx(rect.cx());
        bottomArrow.cy(bottomBtn.cy());
      },
      /**
       * The position of the scroll thumb
       * @memberof MyToolkit.ScrollBar
       * @instance
       * @type {number}
       */
      get thumbPosition() {
        return thumb.y();
      },
    };
  };
  /**
   * Creates the ProgressBar widget and exposes the following methods:
   * move, stateChanged, progressIncremented, increment, width (setter), and incrementValue (setter and getter)
   * @constructor
   * @memberof MyToolkit
   * @returns {} ProgressBar widget
   */
  var ProgressBar = function () {
    var currentState = states.IDLE;
    var stateEvent = null;
    var incrementEvent = null;

    // var draw = SVG().addTo("body").size(225, 50);
    var group = draw.group().attr({
      stroke: pressedColor,
      fill: idleColor,
      strokeColor: "#000",
      "stroke-width": 1,
    });
    var rect = group
      .rect(200, 15)
      .fill({ color: idleColor, opacity: 0.5 })
      .radius(2);
    var progress = group.rect(0, 14).fill({ color: pressedColor }).radius(2);
    progress.cy(rect.cy());

    group.mouseover(function () {
      rect.fill({ color: hoverColor });
      currentState = states.HOVER;
      transition();
    });
    group.mouseout(function () {
      rect.fill({ color: idleColor });
      currentState = states.IDLE;
      transition();
    });

    function transition() {
      if (stateEvent != null) {
        stateEvent(currentState);
      }
    }
    return {
      /**
       * Moves the progress bar widget to the specified x and y coordinate
       * @param {number} x x coordinate
       * @param {number} y y coordinate
       * @memberof MyToolkit.ProgressBar
       * @instance
       */
      move: function (x, y) {
        group.move(x, y);
      },
      /**
       * Exposes an event handler that notifies consuming code when the widget state has changed
       * @param {function} eventHandler An event handler for when the widget state changes
       * @memberof MyToolkit.ProgressBar
       * @instance
       */
      stateChanged: function (eventHandler) {
        stateEvent = eventHandler;
      },
      /**
       * Exposes an event handler that notifies consuming code when the progress bar has incremented
       * @param {function} eventHandler An event handler for when the progress bar increments
       * @memberof MyToolkit.ProgressBar
       * @instance
       */
      progressIncremented: function (eventHandler) {
        incrementEvent = eventHandler;
      },
      /**
       * Increments the value of the progress bar by the given argument
       * @param {number} value The value the progress bar should be incremented by. Value is a numerical value from 0-100
       * @memberof MyToolkit.ProgressBar
       * @instance
       */
      increment: function (value) {
        if (value >= 0 && value <= 100) {
          let currValue = (progress.width() * 100) / rect.width();
          let newValue = 0;
          if (currValue + value >= 100) {
            newValue = 100;
          } else {
            newValue = currValue + value;
          }
          let scaledValue = (newValue * rect.width()) / 100;
          progress.width(scaledValue);
          if (incrementEvent != null) {
            incrementEvent("incremented");
          }
        }
      },
      /**
       * The width of the progress bar
       * @memberof MyToolkit.ProgressBar
       * @instance
       * @type {number}
       */
      set width(w) {
        rect.width(w);
        if (draw.width() < w) {
          draw.width(w * 1.5);
        }
      },
      /**
       * The increment value of the progress bar
       * @memberof MyToolkit.ProgressBar
       * @instance
       * @type {number}
       */
      set incrementValue(i) {
        let scaledValue = (i * rect.width()) / 100;
        progress.width(scaledValue);
      },
      get incrementValue() {
        return (progress.width() * 100) / rect.width();
      },
    };
  };
  /**
   * Creates the Slider widget and exposes the following methods:
   * move, stateChanged, tickChanged, ticks (setter), start (setter), and end (setter)
   * @constructor
   * @memberof MyToolkit
   * @returns {} Slider widget
   */
  var Slider = function () {
    var currentState = states.IDLE;
    var stateEvent = null;
    var tickChangedEvent = null;
    var ticks = [];
    var sliderCircle = null;
    var startContent = null;
    var endContent = null;
    var startValue = "";
    var endValue = "";

    // var draw = SVG().addTo("body").size(250, 50);
    var group = draw.group().attr({
      stroke: pressedColor,
      fill: idleColor,
      strokeColor: "#000",
      "stroke-width": 1,
    });
    var rect = group
      .rect(200, 8)
      .fill({ color: idleColor, opacity: 0.5 })
      .radius(2);

    function drawTicks(numTicks) {
      let start = rect.x();
      let spacing = rect.width() / (numTicks - 1);
      for (let i = 0; i < numTicks; i++) {
        let tick = group.rect(5, rect.height() + 10);
        tick.attr({
          stroke: pressedColor,
          fill: idleColor,
          strokeColor: pressedColor,
          "stroke-width": 1,
        });
        tick.move(start, rect.y()).cy(rect.cy());
        ticks.push(tick);
        start += spacing;
        tick.click(function () {
          if (sliderCircle != null) {
            sliderCircle.move(this.x(), this.y());
            sliderCircle.cx(this.cx());
            sliderCircle.cy(this.cy());
            if (tickChangedEvent != null) {
              tickChangedEvent(i);
            }
          }
          currentState = states.UPDATE;
          transition();
        });
      }
      startContent = group.text(startValue).font({
        family: "Lato, sans-serif",
        color: pressedColor,
        fill: pressedColor,
        "stroke-width": 0,
        size: 13,
      });
      startContent.move(ticks[0].x() - 5, ticks[0].y() + 12);
      endContent = group.text(endValue).font({
        family: "Lato, sans-serif",
        color: pressedColor,
        fill: pressedColor,
        "stroke-width": 0,
        size: 13,
      });
      endContent.move(ticks[ticks.length - 1].x() - 5, ticks[0].y() + 12);
    }

    function drawSliderCircle(tickNumber) {
      let circle = group.circle(12).fill({ color: pressedColor });
      circle.move(ticks[tickNumber].x(), ticks[tickNumber].y());
      circle.cy(ticks[tickNumber].cy());
      circle.cx(ticks[tickNumber].cx());
      sliderCircle = circle;
    }

    group.mouseover(function () {
      rect.fill({ color: hoverColor, opacity: 1 });
      currentState = states.HOVER;
      transition();
    });
    group.mouseout(function () {
      rect.fill({ color: idleColor });
      currentState = states.IDLE;
      transition();
    });

    function transition() {
      if (stateEvent != null) {
        stateEvent(currentState);
      }
    }
    return {
      /**
       * Moves the slider widget to the specified x and y coordinate
       * @param {number} x x coordinate
       * @param {number} y y coordinate
       * @memberof MyToolkit.Slider
       * @instance
       */
      move: function (x, y) {
        group.move(x, y);
      },
      /**
       * Exposes an event handler that notifies consuming code when the widget state has changed
       * @param {function} eventHandler An event handler for when the widget state changes
       * @memberof MyToolkit.Slider
       * @instance
       */
      stateChanged: function (eventHandler) {
        stateEvent = eventHandler;
      },
      /**
       * Exposes an event handler that notifies consuming code the slider tick position has changed and to which tick (n)
       * @param {function} eventHandler An event handler for when tick selected changes
       * @memberof MyToolkit.Slider
       * @instance
       */
      tickChanged: function (eventHandler) {
        tickChangedEvent = eventHandler;
      },
      /**
       * The number of ticks within the slider
       * @memberof MyToolkit.Slider
       * @instance
       * @type {number}
       */
      set ticks(t) {
        drawTicks(t);
        drawSliderCircle(0);
      },
      /**
       * The text on the far left tick of the slider
       * @memberof MyToolkit.Slider
       * @instance
       * @type {string}
       */
      set start(content) {
        startValue = content;
        if (startContent != null) {
          startContent.text(content);
        }
      },
      /**
       * The text on the far right tick of the slider
       * @memberof MyToolkit.Slider
       * @instance
       * @type {string}
       */
      set end(content) {
        endValue = content;
        if (endContent != null) {
          endContent.text(content);
        }
      },
    };
  };
  return {
    Button,
    CheckBox,
    RadioButton,
    TextBox,
    ScrollBar,
    ProgressBar,
    Slider,
  };
})();

export { MyToolkit };
