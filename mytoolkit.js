// File name: mytoolkit.js

import { SVG } from "./svg.min.js";

var idleColor = "#7CB9E8";
var pressedColor = "#002D62";
var hoverColor = "#545AA7";
var textColor = "#fff";

var MyToolkit = (function () {
  var Button = function () {
    const states = {
      IDLE: "idle",
      PRESSED: "pressed",
      EXECUTE: "execute",
      HOVER: "hover",
    };

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
    const widgetStates = {
      IDLE: "idle",
      HOVER: "hover",
    };

    var currentCheckState = checkStates.UNCHECKED;
    var currentWidgetState = widgetStates.IDLE;

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
      currentWidgetState = widgetStates.HOVER;
      transition();
    });
    box.mouseout(function () {
      box.fill({ color: idleColor });
      currentWidgetState = widgetStates.IDLE;
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
      if (checkStateEvent != null) {
        checkStateEvent(currentCheckState);
      }
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
  return { Button, CheckBox };
})();

export { MyToolkit };
