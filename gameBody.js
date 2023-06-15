// // //define the graphics here
// // //draw the objects and world
// // //objects will be imported from other file like gameMechanics, where the data will get generated.
import { vertices, squares, dots, pacman, centralBox } from "./gameObjects.js";
// // Global variables
console.log(squares);
var playerBufferId;
var canvas;
var program, program1;
var ptsToBeDrawn = []; //draw buffer
var Dvertices = []; //used to make the transformations on the vertices
var Dsquares = []; //draw and transformation buffer
var Dpacman = [];
var pacmanPosition;
var gl;
var keyDown = 0,
  keyUp = 0,
  keyLeft = 0,
  keyRight = 0;

window.addEventListener("keydown", getKey, false);
function getKey(key) {
  if (key.key == "ArrowDown") keyDown = 1;
  else keyDown = 0;
  if (key.key == "ArrowUp") keyUp = 1;
  else keyUp = 0;
  if (key.key == "ArrowLeft") keyLeft = 1;
  else keyLeft = 0;
  if (key.key == "ArrowRight") keyRight = 1;
  else keyRight = 0;
}

function updatePacmanPosition(loc) {
  pacmanPosition = loc;
  Dpacman[0] = vec2(loc[0], loc[1] + 0.084);
  Dpacman[1] = vec2(loc[0] + 0.0748, loc[1] - 0.052);
  Dpacman[2] = vec2(loc[0] + 0.0748, loc[1] - 0.052);
}

window.onload = function init() {
  canvas = document.getElementById("gl-canvas");
  gl = WebGLUtils.setupWebGL(canvas);
  if (!gl) {
    alert("WebGL isn't available");
  }
  // Configure WebGL
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  //convert the pixel coordinates into the clip coordinates

  //======================================================

  //make the dplayer vertices to draw them;
  Dpacman[0] = pacman.top;
  Dpacman[1] = pacman.br;
  Dpacman[2] = pacman.bl;
  pacmanPosition = pacman.position;
  pacmanPosition[0] =
    (pacmanPosition[0] - canvas.width / 2) / (canvas.width / 2);
  pacmanPosition[1] =
    ((pacmanPosition[1] - canvas.height / 2) / (canvas.height / 2)) * -1;
  for (let i = 0; i < 3; i++) {
    Dpacman[i][0] = (Dpacman[i][0] - canvas.width / 2) / (canvas.width / 2);
    Dpacman[i][1] =
      ((Dpacman[i][1] - canvas.height / 2) / (canvas.height / 2)) * -1;
  }
  console.log(Dpacman);
  //add the points to the vertices to be drawn
  for (let i = 0; i < vertices.length; i++)
    for (let j = 0; j < vertices[i].length; j++) Dvertices.push(vertices[i][j]);
  //convert the points from pixel coordinates to clip coordinates
  for (let i = 0; i < Dvertices.length; i++) {
    Dvertices[i][0] = (Dvertices[i][0] - canvas.width / 2) / (canvas.width / 2);
    Dvertices[i][1] =
      ((Dvertices[i][1] - canvas.height / 2) / (canvas.height / 2)) * -1;
  }

  //adding the verices of squares to draw
  //squares are arranged into 2 triangles
  //thus passed 6 vertices instead of 4

  for (let i = 0; i < squares.length; i++)
    for (let j = 0; j < squares[i].length; j++) {
      var tmp = squares[i][j];
      Dsquares.push(tmp);
    }
  //convertion of the pixel coordinates to clip coordinates
  //with skipping of the already modified vertexes
  var count = 0;
  for (let i = 0; i < Dsquares.length; i++) {
    if (++count == 6) {
      //genius
      count = 0;
    }

    if (count == 3 || count == 4) {
      continue;
    }
    Dsquares[i][0] = (Dsquares[i][0] - canvas.width / 2) / (canvas.width / 2);
    Dsquares[i][1] =
      ((Dsquares[i][1] - canvas.height / 2) / (canvas.height / 2)) * -1;
  }
  //for (let i = 0; i < 3; i++) Dsquares.push(Dpacman[i]);
  //console.log(Dsquares);
  //======================================================

  // Load shaders and initialize attribute buffers
  // program = initShaders(gl, "vertex-shader", "fragment-shader");
  program = initShaders(gl, "vertex-shader1", "fragment-shader1");
  gl.useProgram(program);

  requestAnimationFrame(render);
};

function render() {
  //gl.useProgram(program);

  //to update the points according to the location visited
  // Load the data into the GPU ============================
  //update the draw field
  if (keyUp == 1) {
    updatePacmanPosition(vec2(pacmanPosition[0], pacmanPosition[1] + 0.1));
  }

  ptsToBeDrawn = [];
  for (let i = 0; i < 10; i++)
    for (let j = 0; j < dots[i].length; j++)
      if (!dots[i][j].visited) ptsToBeDrawn.push(dots[i][j].position);

  //draw a pacman
  playerBufferId = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, playerBufferId);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(Dpacman), gl.STATIC_DRAW);
  var playerPositionAttribLocation = gl.getAttribLocation(program, "vPosition");

  gl.vertexAttribPointer(
    playerPositionAttribLocation,
    2,
    gl.FLOAT,
    false,
    0,
    0
  );
  gl.enableVertexAttribArray(playerPositionAttribLocation);
  var playerSpecialUniform = gl.getUniformLocation(program, "translated");
  gl.uniform1i(playerSpecialUniform, true);
  var playerDelta = gl.getUniformLocation(program, "delta");
  gl.uniform1f(playerDelta, 0.4);
  var pointColorUniform = gl.getUniformLocation(program, "vColour");
  gl.uniform3fv(pointColorUniform, [1.0, 0.9, 0.0]);

  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  gl.drawArrays(gl.TRIANGLES, 0, 3);

  //draw points
  var pointBufferId = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, pointBufferId);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(ptsToBeDrawn), gl.STATIC_DRAW);

  // Associate our shader variables with our points data buffer
  var pointPositionAttribLocation = gl.getAttribLocation(program, "vPosition");
  gl.bindBuffer(gl.ARRAY_BUFFER, pointBufferId);
  gl.vertexAttribPointer(pointPositionAttribLocation, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(pointPositionAttribLocation);

  var pointSpecialUniform = gl.getUniformLocation(program, "translated");
  gl.uniform1i(pointSpecialUniform, false);
  var pointColorUniform = gl.getUniformLocation(program, "vColour");
  gl.uniform3fv(pointColorUniform, [1.0, 0.7, 0.1]);
  gl.drawArrays(gl.POINTS, 0, Dvertices.length - 1);

  //draw squares

  var squaresBufferId = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, squaresBufferId);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(Dsquares), gl.STATIC_DRAW);
  // Associate our shader variables with our squares data buffer
  var squarePositionAttribLocation = gl.getAttribLocation(program, "vPosition");
  gl.bindBuffer(gl.ARRAY_BUFFER, squaresBufferId);
  gl.vertexAttribPointer(
    squarePositionAttribLocation,
    2,
    gl.FLOAT,
    false,
    0,
    0
  );
  gl.enableVertexAttribArray(squarePositionAttribLocation);
  //draw the obstacles on the field
  var squareColorUniform = gl.getUniformLocation(program, "vColour");
  gl.uniform3fv(squareColorUniform, [0.0, 0.2, 1.0]);
  gl.drawArrays(gl.TRIANGLES, 0, Dsquares.length);

  //run the animation loop
  requestAnimationFrame(render);
}
