// File name: mytoolkit.js

import { SVG } from "./svg.min.js";

var MyToolkit = (function () {
  var Button = function () {
    var draw = SVG().addTo("body").size("100%", "100%");
    var rect = draw.rect(100, 50).fill("red");
    var clickEvent = null;
    var defaultState = "idle";
    var stateEvent = null;

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
    rect.mouseup(function () {
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
        rect.move(x, y);
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
    };
  };
  return { Button };
})();

export { MyToolkit };
