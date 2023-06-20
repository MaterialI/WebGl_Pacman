// // //define the graphics here
// // //draw the objects and world
// // //objects will be imported from other file like gameMechanics, where the data will get generated.
import {
  vertices,
  squares,
  dots,
  pacman,
  lines,
  ghost1,
  ghost2,
  setUpAdjacencyGraph,
  graph,
} from "./gameObjects.js";
import { dfs, updateGhostPosition, updateGhostPosition1 } from "./ghostAI.js";
// // Global variables
console.log(squares);
var dPx;
var dPy;
var playerBufferId;
var ghost1BufferID;
var ghost2BufferID;

var canvas;
var program;
var ptsToBeDrawn = []; // points draw buffer with updates of the eaten/non-eaten points
var Dvertices = []; //used to make the transformations on the vertices
var Dsquares = []; //draw and transformation buffer
var Dghost1 = ghost1.Dghost;
var Dghost2 = ghost2.Dghost;
var Dlines = lines;
var Dghost1pos = ghost1.Dghostpos;
var Dghost2pos = ghost2.Dghostpos;
var linesIndexes = [0, 1, 1, 2, 2, 3, 3, 0];
var gl;
var keyDown = 0,
  keyUp = 0,
  keyLeft = 0,
  keyRight = 0;

function normalizeCoordinates(array) {
  for (let i = 0; i < array.length; i++) {
    array[i][0] = (array[i][0] - canvas.width / 2) / (canvas.width / 2);
    array[i][1] =
      ((array[i][1] - canvas.height / 2) / (canvas.height / 2)) * -1;
  }
}
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
function searchForValidP(object, dotsArray) {
  if (keyUp == 1) {
    if (object.row == 0) return false;
    if (dotsArray[object.row - 1][object.column].valid == true) return true;
    else return false;
  }
  if (keyDown == 1) {
    if (object.row == 9) return false;
    if (dotsArray[object.row + 1][object.column].valid == true) return true;
    else return false;
  }
  if (keyLeft == 1) {
    if (object.column == 0) return false;
    if (dotsArray[object.row][object.column - 1].valid == true) return true;
    else return false;
  }
  if (keyRight == 1) {
    if (object.column == 8) return false;
    if (dotsArray[object.row][object.column + 1].valid == true) return true;
    else return false;
  }
}

function updatePacmanPosition() {
  if (searchForValidP(pacman, dots)) {
    if (keyUp == 1) {
      pacman.row -= 1;
      dots[pacman.row][pacman.column].visited = true;
      pacman.Dposition[1] += dPy;
    }
    if (keyDown == 1) {
      pacman.row += 1;
      dots[pacman.row][pacman.column].visited = true;
      pacman.Dposition[1] -= dPy;
    }
    if (keyLeft == 1) {
      pacman.column -= 1;
      dots[pacman.row][pacman.column].visited = true;
      pacman.Dposition[0] -= dPx;
    }
    if (keyRight == 1) {
      pacman.column += 1;
      dots[pacman.row][pacman.column].visited = true;
      pacman.Dposition[0] += dPx;
    }
  }
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

  normalizeCoordinates(Dghost1);
  Dghost1.push(ghost1.tl);
  Dghost1.push(ghost1.br);
  normalizeCoordinates(Dghost2);
  Dghost2.push(ghost2.tl);
  Dghost2.push(ghost2.br);
  normalizeCoordinates(Dlines);
  normalizeCoordinates(pacman.Dpacman);

  //add the points to the vertices to be drawn
  for (let i = 0; i < vertices.length; i++)
    for (let j = 0; j < vertices[i].length; j++) Dvertices.push(vertices[i][j]);
  //convert the points from pixel coordinates to clip coordinates
  normalizeCoordinates(Dvertices);
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
  //======================================================

  setUpAdjacencyGraph();
  console.log(graph);
  dPx = dots[9][5].position[0] - dots[9][4].position[0];
  dPy = dots[8][5].position[1] - dots[9][5].position[1];
  console.log(dPx, dPy);
  // Load shaders and initialize attribute buffers

  program = initShaders(gl, "vertex-shader1", "fragment-shader1");
  gl.useProgram(program);

  requestAnimationFrame(render);
};

var count = 0;

function render() {
  count++;

  //to update the points according to the location visited
  // Load the data into the GPU ============================
  //update the draw field

  if (count == 60) {
    if (keyUp == 1) {
      updatePacmanPosition();
    }
    if (keyDown == 1) {
      updatePacmanPosition();
    }
    if (keyLeft == 1) {
      updatePacmanPosition();
    }
    if (keyRight == 1) {
      updatePacmanPosition();
    }
    updateGhostPosition(ghost1);
    updateGhostPosition1(ghost2);
    count = 0;
  }
  ptsToBeDrawn = [];
  for (let i = 0; i < 10; i++)
    for (let j = 0; j < dots[i].length; j++)
      if (!dots[i][j].visited) ptsToBeDrawn.push(dots[i][j].position);

  //draw a pacman========================================================
  playerBufferId = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, playerBufferId);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(pacman.Dpacman), gl.STATIC_DRAW);
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
  gl.uniform2fv(playerDelta, pacman.Dposition);
  var pointColorUniform = gl.getUniformLocation(program, "vColour");
  gl.uniform3fv(pointColorUniform, [1.0, 0.9, 0.0]);

  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  gl.drawArrays(gl.TRIANGLES, 0, 3);

  //draw points========================================================
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
  gl.drawArrays(gl.POINTS, 0, Dvertices.length - 31);

  //draw a ghost1=========================================================
  ghost1BufferID = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, ghost1BufferID);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(Dghost1), gl.STATIC_DRAW);

  var ghost1PositionAttribLocation = gl.getAttribLocation(program, "vPosition");

  gl.vertexAttribPointer(
    ghost1PositionAttribLocation,
    2,
    gl.FLOAT,
    false,
    0,
    0
  );
  gl.enableVertexAttribArray(ghost1PositionAttribLocation);
  var ghost1SpecialUniform = gl.getUniformLocation(program, "translated");
  gl.uniform1i(ghost1SpecialUniform, true);
  var playerDelta = gl.getUniformLocation(program, "delta");
  gl.uniform2fv(playerDelta, ghost1.Dghostpos);
  var ghost1ColorUniform = gl.getUniformLocation(program, "vColour");
  gl.uniform3fv(ghost1ColorUniform, [1.0, 0.0, 0.0]);

  gl.drawArrays(gl.TRIANGLES, 0, 6);

  //draw a ghost2=====================================================
  ghost2BufferID = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, ghost2BufferID);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(Dghost2), gl.STATIC_DRAW);
  var ghost2PositionAttribLocation = gl.getAttribLocation(program, "vPosition");

  gl.vertexAttribPointer(
    ghost2PositionAttribLocation,
    2,
    gl.FLOAT,
    false,
    0,
    0
  );
  gl.enableVertexAttribArray(ghost2PositionAttribLocation);
  var ghost2SpecialUniform = gl.getUniformLocation(program, "translated");
  gl.uniform1i(ghost2SpecialUniform, true);
  var playerDelta = gl.getUniformLocation(program, "delta");
  gl.uniform2fv(playerDelta, ghost2.Dghostpos);
  var ghost2ColorUniform = gl.getUniformLocation(program, "vColour");
  gl.uniform3fv(ghost2ColorUniform, [0.0, 1.0, 0.0]);

  gl.drawArrays(gl.TRIANGLES, 0, 6);

  //draw squares================================================

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
  var objSpecialUniform = gl.getUniformLocation(program, "translated");
  gl.uniform1i(objSpecialUniform, false);
  gl.enableVertexAttribArray(squarePositionAttribLocation);
  //draw the obstacles on the field
  var squareColorUniform = gl.getUniformLocation(program, "vColour");
  gl.uniform3fv(squareColorUniform, [0.0, 0.2, 1.0]);
  gl.drawArrays(gl.TRIANGLES, 0, Dsquares.length);

  //draw lines box ==========================================
  var linesBufferId = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, linesBufferId);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(Dlines), gl.STATIC_DRAW);

  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array(linesIndexes),
    gl.STATIC_DRAW
  );
  // Associate our shader variables with our squares data buffer
  var linesPositionAttribLocation = gl.getAttribLocation(program, "vPosition");
  gl.bindBuffer(gl.ARRAY_BUFFER, linesBufferId);
  gl.vertexAttribPointer(linesPositionAttribLocation, 2, gl.FLOAT, false, 0, 0);

  //draw the obstacles on the field
  var linesColorUniform = gl.getUniformLocation(program, "vColour");
  gl.uniform3fv(linesColorUniform, [0.0, 0.2, 1.0]);
  gl.enableVertexAttribArray(linesPositionAttribLocation);
  gl.drawElements(gl.LINES, 8, gl.UNSIGNED_SHORT, 0);
  //gl.drawArrays(gl.LINES, 0, 5);

  //run the animation loop
  requestAnimationFrame(render);
}

export { searchForValidP, Dghost1pos };
