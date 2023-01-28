import backgroundPixelField from "./background.js";

window.addEventListener("load", (e) => {
  const canvas = document.getElementById("display-canvas");
  const ctx = canvas.getContext("webgl2", { antialias: false });

  if (!ctx) throw new Error("WebGL2 context not created sucessfully");

  backgroundPixelField(ctx);
});
