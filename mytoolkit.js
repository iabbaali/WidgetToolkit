// File name: mytoolkit.js

import { SVG } from "./svg.min.js";

var idleColor = "#7CB9E8";
var pressedColor = "#002D62";
var hoverColor = "#545AA7";
var textColor = "#fff";

var MyToolkit = (function () {
  const states = {
    IDLE: "idle",
    PRESSED: "pressed",
    EXECUTE: "execute",
    HOVER: "hover",
    UPDATE: "update",
  };
  var Button = function () {
    var clickEvent = null;
    var currentState = states.IDLE;
    var stateEvent = null;

    var draw = SVG().addTo("body");
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
      move: function (x, y) {
        group.move(x, y);
      },
      stateChanged: function (eventHandler) {
        stateEvent = eventHandler;
      },
      onclick: function (eventHandler) {
        clickEvent = eventHandler;
      },
      set text(content) {
        text.text(content);
        text.center(rect.width() / 2, rect.height() / 2);
      },
    };
  };
  var CheckBox = function () {
    const checkStates = {
      UNCHECKED: "unchecked",
      CHECKED: "checked",
    };

    var currentCheckState = checkStates.UNCHECKED;
    var currentWidgetState = states.IDLE;

    var checkStateEvent = null;
    var widgetStateEvent = null;

    var draw = SVG().addTo("body");
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
      move: function (x, y) {
        group.move(x, y);
      },
      widgetStateChanged: function (eventHandler) {
        widgetStateEvent = eventHandler;
      },
      checkStateChanged: function (eventHandler) {
        checkStateEvent = eventHandler;
      },
      set text(content) {
        text.text(content);
        text.x(box.x() + box.width());
        text.cy(box.cy());
      },
    };
  };
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

    var draw = SVG().addTo("body").size("100%", "100%");
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
    draw.size("100%", currY * 2);
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
      move: function (x, y) {
        outer.move(x, y);
      },
      widgetStateChanged: function (eventHandler) {
        widgetStateEvent = eventHandler;
      },
      checkStateChanged: function (eventHandler) {
        checkStateEvent = eventHandler;
      },
    };
  };
  var TextBox = function () {
    var textChangedEvent = null;
    var widgetStateEvent = null;
    var currentWidgetState = states.IDLE;

    var draw = SVG().addTo("body");
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
      move: function (x, y) {
        group.move(x, y);
      },
      widgetStateChanged: function (eventHandler) {
        widgetStateEvent = eventHandler;
      },
      textChanged: function (eventHandler) {
        textChangedEvent = eventHandler;
      },
    };
  };
  var ScrollBar = function () {
    var scrollThumbEvent = null;
    var currentState = states.IDLE;
    var stateEvent = null;

    var draw = SVG().addTo("body").size(50, 250);
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
    function transition() {
      if (stateEvent != null) {
        stateEvent(currentState);
      }
    }
    return {
      move: function (x, y) {
        group.move(x, y);
      },
      stateChanged: function (eventHandler) {
        stateEvent = eventHandler;
      },
      scrollThumbMoved: function (eventHandler) {
        scrollThumbEvent = eventHandler;
      },
      set height(h) {
        rect.height(h);
        draw.height(h * 1.75);
        bottomBtn.move(rect.x(), rect.y() + rect.height());
        bottomArrow.move(rect.x(), rect.y() + rect.height());
        bottomArrow.cx(rect.cx());
        bottomArrow.cy(bottomBtn.cy());
      },
      get thumbPosition() {
        return thumb.y();
      },
    };
  };
  var ProgressBar = function () {
    var currentState = states.IDLE;
    var stateEvent = null;
    var incrementEvent = null;

    var draw = SVG().addTo("body").size(225, 50);
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
      move: function (x, y) {
        group.move(x, y);
      },
      stateChanged: function (eventHandler) {
        stateEvent = eventHandler;
      },
      progressIncremented: function (eventHandler) {
        incrementEvent = eventHandler;
      },
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
      set width(w) {
        rect.width(w);
        draw.width(w * 1.5);
      },
      set incrementValue(i) {
        let scaledValue = (i * rect.width()) / 100;
        progress.width(scaledValue);
      },
      get incrementValue() {
        return (progress.width() * 100) / rect.width();
      },
    };
  };
  return { Button, CheckBox, RadioButton, TextBox, ScrollBar, ProgressBar };
})();

export { MyToolkit };
