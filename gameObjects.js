//declare the main types of objects

class Player {
  constructor(position, score) {
    this.position = position;
    this.top = vec2(position[0], position[1] - 21);
    this.bl = vec2(position[0] - 17, position[1] + 13);
    this.br = vec2(position[0] + 17, position[1] + 13);
    this.score = 0;
    this.row = 9;
    this.column = 4;
    this.Dposition = vec2(0.0, 0.0);
    this.Dpacman = [
      vec2(position[0], position[1] - 21),
      vec2(position[0] - 17, position[1] + 13),
      vec2(position[0] + 17, position[1] + 13),
    ];
  }
}

//dots to be eaten
class Dot {
  constructor(position, valid) {
    this.position = position;
    this.valid = valid;
    this.visited = !valid;
  }
}

class Ghost {
  constructor(position, row, column) {
    this.position = position;
    this.tl = vec2(position[0] - 20, position[1] - 20);
    this.tr = vec2(position[0] + 20, position[1] - 20);
    this.bl = vec2(position[0] - 20, position[1] + 20);
    this.br = vec2(position[0] + 20, position[1] + 20);
    this.score = 0;
    this.row = row;
    this.column = column;
  }
}
//-----------------
//large box class ds x = 150 y = 100
class BoxL {
  constructor(position, colour) {
    this.position = position;
    this.colour = colour;
    this.tl = vec2(position[0] - 75, position[1] - 50); //top left corner position in pixels vec2()
    this.bl = vec2(position[0] - 75, position[1] + 50); //bottom left corner position in pixels vec2()
    this.br = vec2(position[0] + 75, position[1] + 50); //bottom right corner position in pixels vec2()
    this.tr = vec2(position[0] + 75, position[1] - 50); //top right corner position in pixels vec2()
  }
}
//-----------------
//small box class ds x = 50 y = 100
class BoxS {
  constructor(position, colour) {
    this.position = position;
    this.colour = colour;
    this.bl = vec2(position[0] - 25, position[1] + 50); //bottom left corner position in pixels vec2()
    this.tl = vec2(position[0] - 25, position[1] - 50); //top left corner position in pixels vec2()
    this.br = vec2(position[0] + 25, position[1] + 50); //bottom right corner position in pixels vec2()
    this.tr = vec2(position[0] + 25, position[1] - 50); //top right corner position in pixels vec2()
  }
}
//creation of the large and small boxes instances the number corresponds to the map sketch
var largeB1 = new BoxL(vec2(125, 100), vec3(1.0, 0.5, 0.0)); //boxL1
var largeB2 = new BoxL(vec2(325, 100), vec3(1.0, 0.5, 0.0)); //boxL2
var largeB3 = new BoxL(vec2(125, 400), vec3(1.0, 0.5, 0.0)); //boxL3
var largeB4 = new BoxL(vec2(325, 400), vec3(1.0, 0.5, 0.0)); //boxL4

var smallB1 = new BoxS(vec2(75, 250), vec3(1.0, 0.5, 0.0)); //boxS1
var centralBox = new BoxS(vec2(225, 250), vec3(1.0, 0.7, 0.0)); //boxS2
var smallB3 = new BoxS(vec2(375, 250), vec3(1.0, 0.5, 0.0)); //boxS3

//global exported arrays
let Boxes = [largeB1, largeB2, largeB3, largeB4, smallB1, smallB3];
var pacman = new Player(vec2(225, 475), 0);

var ghost1 = new Ghost(vec2(225, 225), 4, 4);
var ghost2 = new Ghost(vec2(225, 275), 5, 4);
//to be decided which form to pass
let dots = [
  //1-st layer
  [
    new Dot(vec2(25, 25), true),
    new Dot(vec2(75, 25), true),
    new Dot(vec2(125, 25), true),
    new Dot(vec2(175, 25), true),
    new Dot(vec2(225, 25), true),
    new Dot(vec2(275, 25), true),
    new Dot(vec2(325, 25), true),
    new Dot(vec2(375, 25), true),
    new Dot(vec2(425, 25), true),
  ],
  //2nd layer
  [
    new Dot(vec2(25, 75), true),
    new Dot(vec2(75, 75), false),
    new Dot(vec2(125, 75), false),
    new Dot(vec2(175, 75), false),
    new Dot(vec2(225, 75), true),
    new Dot(vec2(275, 75), false),
    new Dot(vec2(325, 75), false),
    new Dot(vec2(375, 75), false),
    new Dot(vec2(425, 75), true),
  ],
  //3rd layer
  [
    new Dot(vec2(25, 125), true),
    new Dot(vec2(75, 125), false),
    new Dot(vec2(125, 125), false),
    new Dot(vec2(175, 125), false),
    new Dot(vec2(225, 125), true),
    new Dot(vec2(275, 125), false),
    new Dot(vec2(325, 125), false),
    new Dot(vec2(375, 125), false),
    new Dot(vec2(425, 125), true),
  ],
  //4thlayer
  [
    new Dot(vec2(25, 175), true),
    new Dot(vec2(75, 175), true),
    new Dot(vec2(125, 175), true),
    new Dot(vec2(175, 175), true),
    new Dot(vec2(225, 175), true),
    new Dot(vec2(275, 175), true),
    new Dot(vec2(325, 175), true),
    new Dot(vec2(375, 175), true),
    new Dot(vec2(425, 175), true),
  ],
  //5thlayer
  [
    new Dot(vec2(25, 225), true),
    new Dot(vec2(75, 225), false),
    new Dot(vec2(125, 225), true),
    new Dot(vec2(175, 225), true),
    new Dot(vec2(225, 225), false),
    new Dot(vec2(275, 225), true),
    new Dot(vec2(325, 225), true),
    new Dot(vec2(375, 225), false),
    new Dot(vec2(425, 225), true),
  ],
  //6layer
  [
    new Dot(vec2(25, 275), true),
    new Dot(vec2(75, 275), false),
    new Dot(vec2(125, 275), true),
    new Dot(vec2(175, 275), true),
    new Dot(vec2(225, 275), false),
    new Dot(vec2(275, 275), true),
    new Dot(vec2(325, 275), true),
    new Dot(vec2(375, 275), false),
    new Dot(vec2(425, 275), true),
  ],
  //7th layer
  [
    new Dot(vec2(25, 325), true),
    new Dot(vec2(75, 325), true),
    new Dot(vec2(125, 325), true),
    new Dot(vec2(175, 325), true),
    new Dot(vec2(225, 325), true),
    new Dot(vec2(275, 325), true),
    new Dot(vec2(325, 325), true),
    new Dot(vec2(375, 325), true),
    new Dot(vec2(425, 325), true),
  ],
  //8th layer
  [
    new Dot(vec2(25, 375), true),
    new Dot(vec2(75, 375), false),
    new Dot(vec2(125, 375), false),
    new Dot(vec2(175, 375), false),
    new Dot(vec2(225, 375), true),
    new Dot(vec2(275, 375), false),
    new Dot(vec2(325, 375), false),
    new Dot(vec2(375, 375), false),
    new Dot(vec2(425, 375), true),
  ],
  //9th layer
  [
    new Dot(vec2(25, 425), true),
    new Dot(vec2(75, 425), false),
    new Dot(vec2(125, 425), false),
    new Dot(vec2(175, 425), false),
    new Dot(vec2(225, 425), true),
    new Dot(vec2(275, 425), false),
    new Dot(vec2(325, 425), false),
    new Dot(vec2(375, 425), false),
    new Dot(vec2(425, 425), true),
  ],
  //10th layer
  [
    new Dot(vec2(25, 475), true),
    new Dot(vec2(75, 475), true),
    new Dot(vec2(125, 475), true),
    new Dot(vec2(175, 475), true),
    new Dot(vec2(225, 475), true),
    new Dot(vec2(275, 475), true),
    new Dot(vec2(325, 475), true),
    new Dot(vec2(375, 475), true),
    new Dot(vec2(425, 475), true),
  ],
];

var dotsG = [
  //1-st layer
  [
    new Dot(vec2(25, 25), true),
    new Dot(vec2(75, 25), true),
    new Dot(vec2(125, 25), true),
    new Dot(vec2(175, 25), true),
    new Dot(vec2(225, 25), true),
    new Dot(vec2(275, 25), true),
    new Dot(vec2(325, 25), true),
    new Dot(vec2(375, 25), true),
    new Dot(vec2(425, 25), true),
  ],
  //2nd layer
  [
    new Dot(vec2(25, 75), true),
    new Dot(vec2(75, 75), false),
    new Dot(vec2(125, 75), false),
    new Dot(vec2(175, 75), false),
    new Dot(vec2(225, 75), true),
    new Dot(vec2(275, 75), false),
    new Dot(vec2(325, 75), false),
    new Dot(vec2(375, 75), false),
    new Dot(vec2(425, 75), true),
  ],
  //3rd layer
  [
    new Dot(vec2(25, 125), true),
    new Dot(vec2(75, 125), false),
    new Dot(vec2(125, 125), false),
    new Dot(vec2(175, 125), false),
    new Dot(vec2(225, 125), true),
    new Dot(vec2(275, 125), false),
    new Dot(vec2(325, 125), false),
    new Dot(vec2(375, 125), false),
    new Dot(vec2(425, 125), true),
  ],
  //4thlayer
  [
    new Dot(vec2(25, 175), true),
    new Dot(vec2(75, 175), true),
    new Dot(vec2(125, 175), true),
    new Dot(vec2(175, 175), true),
    new Dot(vec2(225, 175), true),
    new Dot(vec2(275, 175), true),
    new Dot(vec2(325, 175), true),
    new Dot(vec2(375, 175), true),
    new Dot(vec2(425, 175), true),
  ],
  //5thlayer
  [
    new Dot(vec2(25, 225), true),
    new Dot(vec2(75, 225), false),
    new Dot(vec2(125, 225), true),
    new Dot(vec2(175, 225), true),
    new Dot(vec2(225, 225), true),
    new Dot(vec2(275, 225), true),
    new Dot(vec2(325, 225), true),
    new Dot(vec2(375, 225), false),
    new Dot(vec2(425, 225), true),
  ],
  //6layer
  [
    new Dot(vec2(25, 275), true),
    new Dot(vec2(75, 275), false),
    new Dot(vec2(125, 275), true),
    new Dot(vec2(175, 275), true),
    new Dot(vec2(225, 275), true),
    new Dot(vec2(275, 275), true),
    new Dot(vec2(325, 275), true),
    new Dot(vec2(375, 275), false),
    new Dot(vec2(425, 275), true),
  ],
  //7th layer
  [
    new Dot(vec2(25, 325), true),
    new Dot(vec2(75, 325), true),
    new Dot(vec2(125, 325), true),
    new Dot(vec2(175, 325), true),
    new Dot(vec2(225, 325), true),
    new Dot(vec2(275, 325), true),
    new Dot(vec2(325, 325), true),
    new Dot(vec2(375, 325), true),
    new Dot(vec2(425, 325), true),
  ],
  //8th layer
  [
    new Dot(vec2(25, 375), true),
    new Dot(vec2(75, 375), false),
    new Dot(vec2(125, 375), false),
    new Dot(vec2(175, 375), false),
    new Dot(vec2(225, 375), true),
    new Dot(vec2(275, 375), false),
    new Dot(vec2(325, 375), false),
    new Dot(vec2(375, 375), false),
    new Dot(vec2(425, 375), true),
  ],
  //9th layer
  [
    new Dot(vec2(25, 425), true),
    new Dot(vec2(75, 425), false),
    new Dot(vec2(125, 425), false),
    new Dot(vec2(175, 425), false),
    new Dot(vec2(225, 425), true),
    new Dot(vec2(275, 425), false),
    new Dot(vec2(325, 425), false),
    new Dot(vec2(375, 425), false),
    new Dot(vec2(425, 425), true),
  ],
  //10th layer
  [
    new Dot(vec2(25, 475), true),
    new Dot(vec2(75, 475), true),
    new Dot(vec2(125, 475), true),
    new Dot(vec2(175, 475), true),
    new Dot(vec2(225, 475), true),
    new Dot(vec2(275, 475), true),
    new Dot(vec2(325, 475), true),
    new Dot(vec2(375, 475), true),
    new Dot(vec2(425, 475), true),
  ],
];
dots[9][4].visited = true;
var squares = Boxes.map((obj) => [
  obj.tl,
  obj.tr,
  obj.br,
  obj.tl,
  obj.br,
  obj.bl,
]);
var lines = [centralBox.tl, centralBox.tr, centralBox.br, centralBox.bl];
var vertices = dots.map((row) => row.map((obj) => obj.position));

var graph = {};
function setUpAdjacencyGraph() {
  for (let i = 0; i < 10; i++)
    for (let j = 0; j < 9; j++) {
      if (dots[i][j].valid != false) {
        if (j != 0)
          if (dotsG[i][j - 1].valid) addEdge(`${i}${j}`, `${i}${j - 1}`);
        if (j != 8)
          if (dotsG[i][j + 1].valid) addEdge(`${i}${j}`, `${i}${j + 1}`);
        if (i != 9)
          if (dotsG[i + 1][j].valid) addEdge(`${i}${j}`, `${i + 1}${j}`);
        if (i != 0)
          if (dotsG[i - 1][j].valid) addEdge(`${i}${j}`, `${i - 1}${j}`);
      }
    }
}

// Function to add an edge between two nodes
function addEdge(value, value1) {
  if (!graph.hasOwnProperty(value)) {
    graph[value] = [];
  }

  if (!graph.hasOwnProperty(value1)) {
    graph[value1] = [];
  }

  if (!graph[value].includes(value1)) {
    graph[value].push(value1);
  }

  if (!graph[value1].includes(value)) {
    graph[value1].push(value);
  }
}

export {
  vertices,
  squares,
  dots,
  pacman,
  centralBox,
  lines,
  ghost1,
  ghost2,
  dotsG,
  graph,
  setUpAdjacencyGraph,
};
