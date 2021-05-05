// File name: mytoolkit.js

import { SVG } from "./svg.min.js";

var MyToolkit = (function () {
  var Button = function () {
    var clickEvent = null;
    var defaultState = "idle";
    var stateEvent = null;

    var draw = SVG().addTo("body");

    var group = draw.group();
    var rect = group.rect(100, 50).fill("red");
    var text = group.text("");

    text.center(rect.width() / 2, rect.height() / 2);

    rect.mouseover(function () {
      this.fill({ color: "blue" });
      defaultState = "hover";
      transition();
    });
    rect.mouseout(function () {
      this.fill({ color: "red" });
      defaultState = "idle";
      transition();
    });
    rect.mouseup(function (event) {
      this.fill({ color: "red" });
      if (defaultState == "pressed") {
        // use enumeration instead
        if (clickEvent != null) {
          clickEvent(event);
        }
      }
      defaultState = "up";
      transition();
    });
    rect.mousedown(function () {
      this.fill({ color: "red" });
      defaultState = "pressed";
      transition();
    });
    // rect.mousemove(function (event) {
    //   if (stateEvent != null) {
    //     stateEvent(defaultState);
    //   }
    // });
    // rect.click(function (event) {
    //   this.fill({ color: "pink" });
    //   if (clickEvent != null) clickEvent(event);
    // });
    function transition() {
      if (stateEvent != null) {
        stateEvent(defaultState);
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
      setID: function (id) {
        rect.attr("id", id);
      },
      set text(content) {
        text.text(content);
        text.center(rect.width() / 2, rect.height() / 2);
      },
    };
  };
  return { Button };
})();

export { MyToolkit };
