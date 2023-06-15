//declare the main types of objects

class Player {
  constructor(position, score) {
    this.position = position;
    this.dir = 0; //clock movement
    this.top = vec2(position[0], position[1] - 21);
    this.bl = vec2(position[0] - 17, position[1] + 13);
    this.br = vec2(position[0] + 17, position[1] + 13);
    this.score = score;
    this.colour = vec3(255 / 255, 192 / 255, 0 / 255);
    this.level = 10;
  }
}

//dots to be eaten
class Dot {
  constructor(position) {
    this.position = position;
    this.colour = vec3(1.0, 1.0, 0.0);
    this.radius = 15;
    this.visited = false;
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
//to be decided which form to pass
let dots = [
  //1-st layer
  [
    new Dot(vec2(25, 25)),
    new Dot(vec2(75, 25)),
    new Dot(vec2(125, 25)),
    new Dot(vec2(175, 25)),
    new Dot(vec2(225, 25)),
    new Dot(vec2(275, 25)),
    new Dot(vec2(325, 25)),
    new Dot(vec2(375, 25)),
    new Dot(vec2(425, 25)),
  ],
  //2nd layer
  [new Dot(vec2(25, 75)), new Dot(vec2(225, 75)), new Dot(vec2(425, 75))],
  //3rd layer
  [new Dot(vec2(25, 125)), new Dot(vec2(225, 125)), new Dot(vec2(425, 125))],
  //4thlayer
  [
    new Dot(vec2(25, 175)),
    new Dot(vec2(75, 175)),
    new Dot(vec2(125, 175)),
    new Dot(vec2(175, 175)),
    new Dot(vec2(225, 175)),
    new Dot(vec2(275, 175)),
    new Dot(vec2(325, 175)),
    new Dot(vec2(375, 175)),
    new Dot(vec2(425, 175)),
  ],
  //5thlayer
  [
    new Dot(vec2(25, 225)),
    new Dot(vec2(125, 225)),
    new Dot(vec2(175, 225)),
    new Dot(vec2(275, 225)),
    new Dot(vec2(325, 225)),
    new Dot(vec2(425, 225)),
  ],
  //6layer
  [
    new Dot(vec2(25, 275)),
    new Dot(vec2(125, 275)),
    new Dot(vec2(175, 275)),
    new Dot(vec2(275, 275)),
    new Dot(vec2(325, 275)),
    new Dot(vec2(425, 275)),
  ],
  //7th layer
  [
    new Dot(vec2(25, 325)),
    new Dot(vec2(75, 325)),
    new Dot(vec2(125, 325)),
    new Dot(vec2(175, 325)),
    new Dot(vec2(225, 325)),
    new Dot(vec2(275, 325)),
    new Dot(vec2(325, 325)),
    new Dot(vec2(375, 325)),
    new Dot(vec2(425, 325)),
  ],
  //8th layer
  [new Dot(vec2(25, 375)), new Dot(vec2(225, 375)), new Dot(vec2(425, 375))],
  //9th layer
  [new Dot(vec2(25, 425)), new Dot(vec2(225, 425)), new Dot(vec2(425, 425))],
  //10th layer
  [
    new Dot(vec2(25, 475)),
    new Dot(vec2(75, 475)),
    new Dot(vec2(125, 475)),
    new Dot(vec2(175, 475)),
    new Dot(vec2(225, 475)),
    new Dot(vec2(275, 475)),
    new Dot(vec2(325, 475)),
    new Dot(vec2(375, 475)),
    new Dot(vec2(425, 475)),
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

var vertices = dots.map((row) => row.map((obj) => obj.position));
export { vertices, squares, dots, pacman, centralBox };
console.log(vertices);
