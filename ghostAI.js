import { pacman, ghost1, ghost2, dots, dotsG, graph } from "./gameObjects.js";
import { searchForValidP, Dghost1pos } from "./gameBody.js";
//const destinationNode = dotsG[pacman.position[0]][pacman.position[1]];
var path = [];
var dPx = 0.2222222222222222;
var dPy = 0.20000000000000007;
function updateGhostPosition(ghost) {
  if (path.length == 0) {
    path = dfs(
      graph,
      `${ghost.row}${ghost.column}`,
      `${pacman.row}${pacman.column}`
    );
  }
  console.log(path);
  const move = path.shift();
  console.log(move);
  if (searchForValidP(ghost, dotsG)) {
    if (ghost.row - move[0] == -1) {
      ghost.row -= 1;
      //dots[ghost.row][ghost.column].visited = true;
      Dghost1pos[1] += dPy;
    }
    if (ghost.row - move[0] == 1) {
      ghost.row += 1;
      //dots[ghost.row][ghost.column].visited = true;
      Dghost1pos[1] -= dPy;
    }
    if (ghost.column - move[1] == -1) {
      ghost.column -= 1;
      // dots[ghost.row][ghost.column].visited = true;
      Dghost1pos[0] -= dPx;
    }
    if (ghost.column - move[1] == 1) {
      ghost.column += 1;
      //dots[ghost.row][ghost.column].visited = true;
      Dghost1pos[0] += dPx;
    }
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

// Example usage:

export { updateGhostPosition, dfs };
