// 1 START, 2 END, 3 HURDELS
export function getBfsAnimations(arr, start, end) {
  const animations = [];
  bfs(arr, animations, start, end);
  return animations;
}

export function getDfsAnimations(arr, start, end) {
  const animations = [];
  dfs(arr, start, end, start, animations, false);
  return animations;
}

export function getDfsAstarAnimations(arr, start, end) {
  const animations = [];
  const res = dfs(arr, start, end, start, animations, true);
  console.log("res: ", res);
  return animations;
}

function bfs(arr, animations, start, end) {
  const queue = [];

  queue.push([start[0], start[1]]);
  while (queue.length !== 0) {
    const curr = queue.shift();
    if (curr) {
      let x = parseInt(curr[0]),
        y = parseInt(curr[1]);
      if (x < 0 || y < 0) continue;
      if (x >= arr.length || y >= arr[0].length) continue;
      if (x === end[0] && y === end[1]) {
        return true;
      }
      if (arr[x][y] === 3 || arr[x][y] === -1) continue;

      animations.push([0, x, y]);
      arr[x][y] = -1;

      queue.push([x + 1, y]);

      queue.push([x, y + 1]);

      queue.push([x - 1, y]);

      queue.push([x, y - 1]);
    }
  }
  return false;
}

function dfs(arr, start, end, curr, animations, astar) {
  let x = curr[0],
    y = curr[1];
  if (x < 0 || x >= arr.length || y < 0 || y >= arr[0].length) {
    return false;
  } else if (arr[x][y] === 3) {
    return false;
  } else if (x === end[0] && y === end[1]) return true;
  else if (arr[x][y] === -1) {
    return false;
  }

  animations.push([0, x, y]);
  arr[x][y] = -1;

  if (astar) {
    const p1 = [x + 1, y],
      p2 = [x - 1, y],
      p3 = [x, y + 1],
      p4 = [x, y - 1];

    const d1 = distance_manhattan(p1, end),
      d2 = distance_manhattan(p2, end),
      d3 = distance_manhattan(p3, end),
      d4 = distance_manhattan(p4, end);

    const points = getOrder(p1, d1, p2, d2, p3, d3, p4, d4);
    console.log(points);
    let res = false;
    for (let i = 0; i < points.length; i++) {
      res = dfs(arr, start, end, points[i][0], animations, true);
      if (res === true) return true;
    }
    return res;
    // return dfs(arr, start, end, nextPoint, animations, true);
  } else
    return (
      dfs(arr, start, end, [x + 1, y], animations, false) ||
      dfs(arr, start, end, [x - 1, y], animations, false) ||
      dfs(arr, start, end, [x, y + 1], animations, false) ||
      dfs(arr, start, end, [x, y - 1], animations, false)
    );
}

function getOrder(p1, d1, p2, d2, p3, d3, p4, d4) {
  const pairs = [
    [p1, d1],
    [p2, d2],
    [p3, d3],
    [p4, d4],
  ];
  return pairs.sort((a, b) => a[1] - b[1]);
}

function distance_manhattan(p1, p2) {
  return Math.abs(p1[0] - p2[0]) + Math.abs(p1[1] - p2[1]);
}
