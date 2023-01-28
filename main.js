import backgroundPixelField from "./background.js";
import textCycle from "./textCycle.js";

window.addEventListener("load", (e) => {
  backgroundPixelField(document.getElementById("display-canvas"));

  textCycle(document.getElementById("name"), 10, 50);
});
