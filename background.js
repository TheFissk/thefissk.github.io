let ctx = undefined;
const shaderLocations = {};
let positionBuffer = undefined;

export default async (context) => {
  ctx = context;

  ctx.enable(ctx.DEPTH_TEST);
  ctx.enable(ctx.CULL_FACE);
  ctx.clearColor(0, 0, 0, 0);

  const fShader = await createShader(
    ctx,
    ctx.FRAGMENT_SHADER,
    "./background.frag"
  );
  const vShader = await createShader(
    ctx,
    ctx.VERTEX_SHADER,
    "./background.vert"
  );

  const program = createProgram(ctx, fShader, vShader);
  ctx.useProgram(program);

  //get all of the shader locations
  shaderLocations.xPosition = ctx.getAttribLocation(program, "xPosition");
  shaderLocations.time = ctx.getUniformLocation(program, "time");


  //load pixels
  positionBuffer = ctx.createBuffer();
  ctx.bindBuffer(ctx.ARRAY_BUFFER, positionBuffer);

  //draw a row of pixels
  let positions = [];
  positions.length = 100;
  positions.fill(0, 0, 100);
  for (let index = 0; index < positions.length; index++) {
    positions[index] = (index / positions.length) * 2 - 1;
  }

  const positionData = new Float32Array(positions);

  ctx.bufferData(ctx.ARRAY_BUFFER, positionData, ctx.STATIC_DRAW);

  // Tell WebGL how to convert from clip space to pixels
  ctx.viewport(0, 0, ctx.canvas.width, ctx.canvas.height);

  // Turn on the attribute
  ctx.enableVertexAttribArray(shaderLocations.vPosition);

  requestAnimationFrame(render);
};

const render = (timeStamp) => {
  resize();

  //clear the canvas
  ctx.clear(ctx.COLOR_BUFFER_BIT);

  //draw the point cloud
  ctx.bindBuffer(ctx.ARRAY_BUFFER, positionBuffer);
  ctx.vertexAttribPointer(shaderLocations.vPosition, 1, ctx.FLOAT, false, 0, 0);
  ctx.drawArraysInstanced(ctx.POINTS, 0, 100, 10);
  ctx.uniform1f(shaderLocations.time, timeStamp);
  requestAnimationFrame(render);
};

/**
 *
 * @param {WebGL2RenderingContext} ctx the context to render the scene to
 * @param {WebGL2ShaderType} type the kind of shader to load to the context
 * @param {string} source a url pointing to the text of the shader
 * @returns
 */
async function createShader(ctx, type, source) {
  const shader = ctx.createShader(type);
  //the double await gives us the text of the file
  const shaderText = await (await fetch(source)).text();
  ctx.shaderSource(shader, shaderText);
  ctx.compileShader(shader);

  if (ctx.getShaderParameter(shader, ctx.COMPILE_STATUS)) return shader;
  console.log(`Error with ${source}\n${ctx.getShaderInfoLog(shader)}`);
  ctx.deleteShader(shader);
}

const createProgram = (ctx, fragShader, vertShader) => {
  const program = ctx.createProgram();
  ctx.attachShader(program, fragShader);
  ctx.attachShader(program, vertShader);
  ctx.linkProgram(program);
  if (ctx.getProgramParameter(program, ctx.LINK_STATUS)) return program;

  console.log(ctx.getProgramInfoLog(program));
  ctx.deleteProgram(program);
};

const resize = () => {
  // Lookup the size the browser is displaying the canvas in CSS pixels.
  const displayWidth = ctx.canvas.clientWidth;
  const displayHeight = ctx.canvas.clientHeight;
  // Check if the canvas is the same size as its parent div.
  if (ctx.canvas.width === displayWidth && ctx.canvas.height === displayHeight)
    return false;

  console.log(
    `Resizing the view from ${ctx.canvas.width}:${ctx.canvas.height} to ${displayWidth}:${displayHeight}`
  );
  // Make the canvas the same size
  ctx.canvas.width = displayWidth;
  ctx.canvas.height = displayHeight;

  //reset the viewport
  ctx.viewport(0, 0, ctx.drawingBufferWidth, ctx.drawingBufferHeight);
  return true;
};