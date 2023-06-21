import { pacman, ghost1, ghost2, graph, level, dotsG } from "./gameObjects.js";
import { searchForValidP, Dghost1pos } from "./gameBody.js";
//const destinationNode = dotsG[pacman.position[0]][pacman.position[1]];
var path = [];
var path1 = [];
level.isAggressive;
var dPx = 0.2222222222222222;
var dPy = 0.20000000000000007;

function updateGhostPosition(ghost) {
  //call the path-finding algorithm
  //the dfs is not efficient and used for "roaming" of the ghost in non aggressive state
  //the bfs is following the pacman, thus used for "aggressive" mode
  if (ghost.column == pacman.column && ghost.row == pacman.row) return true;
  if (level.isAggressive)
    path = bfs(
      graph,
      `${ghost.row}${ghost.column}`,
      `${pacman.row}${pacman.column}`
    );
  else {
    if (path.length == 0)
      path = dfs(
        graph,
        `${ghost.row}${ghost.column}`,
        `${pacman.row}${pacman.column}`
      );
  }

  console.log(path);

  //fetch a move from list we take from the generated list
  //turn on for bfs
  if (level.isAggressive) path.shift();
  var move = path.shift();
  //make a move corresponding to the generated move

  if (ghost.row - move[0] > 0) {
    ghost.row -= 1;
    ghost.Dghostpos[1] += dPy;
  } else if (ghost.row - move[0] < 0) {
    ghost.row += 1;
    ghost.Dghostpos[1] -= dPy;
  } else if (ghost.column - move[1] > 0) {
    ghost.column -= 1;
    ghost.Dghostpos[0] -= dPx;
  } else if (ghost.column - move[1] < 0) {
    ghost.column += 1;
    ghost.Dghostpos[0] += dPx;
  }
  return false;
}
function updateGhostPosition1(ghost) {
  //call the path-finding algorithm
  //call the path-finding algorithm
  //the dfs is not efficient and used for "roaming" of the ghost in non aggressive state
  //the bfs is following the pacman, thus used for "aggressive" mode
  if (ghost.column == pacman.column && ghost.row == pacman.row) return true;
  if (level.isAggressive)
    path1 = bfs(
      graph,
      `${ghost.row}${ghost.column}`,
      `${pacman.row}${pacman.column}`
    );
  else {
    if (path1.length == 0)
      path1 = dfs(
        graph,
        `${ghost.row}${ghost.column}`,
        `${pacman.row}${pacman.column}`
      );
  }
  //fetch a move from list we take from the generated list
  if (level.isAggressive) path1.shift();
  var move = path1.shift();
  //make a move corresponding to the generated move
  if (ghost.row - move[0] > 0) {
    ghost.row -= 1;
    ghost.Dghostpos[1] += dPy;
  }
  if (ghost.row - move[0] < 0) {
    ghost.row += 1;
    ghost.Dghostpos[1] -= dPy;
  }
  if (ghost.column - move[1] > 0) {
    ghost.column -= 1;
    ghost.Dghostpos[0] -= dPx;
  }
  if (ghost.column - move[1] < 0) {
    ghost.column += 1;
    ghost.Dghostpos[0] += dPx;
  }
}

function dfs(graph, start, target, visited = [], path = []) {
  visited.push(start);
  path.push(start);

  if (start === target) {
    return path;
  }
  console.log(start);
  for (let neighbor of graph[start]) {
    if (!visited.includes(neighbor)) {
      const result = dfs(graph, neighbor, target, visited, path);
      if (result) {
        return result;
      }
    }
  }

  path.pop();
  visited.pop();

  return null;
}

function bfs(adjacencyList, start, finish) {
  // Create a queue for BFS traversal
  const queue = [];
  queue.push([start]);

  // Create a set to keep track of visited nodes
  const visited = new Set();
  visited.add(start);

  // Perform BFS
  while (queue.length > 0) {
    const path = queue.shift();
    const current = path[path.length - 1];

    // Check if the current node is the target node
    if (current === finish) {
      return path; // Return the path if target found
    }

    // Visit all adjacent nodes of the current node
    const neighbors = adjacencyList[current];
    for (let neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push([...path, neighbor]);
      }
    }
  }

  return null; // Return null if path not found
}

export { updateGhostPosition, updateGhostPosition1, dfs };
