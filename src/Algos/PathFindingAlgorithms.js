// 1 START, 2 END, 3 HURDELS
export function getBfsAnimations(arr, start, end) {
  const animations = [];
  bfs(arr, animations, start, end);
  return animations;
}

export function getDfsAnimations(arr, start, end) {
  const animations = [];
  dfs(arr, start, end, start, animations);
  return animations;
}

function bfs(arr, animations, start, end) {
  const queue = [];
  const parent = [];

  for (let i = 0; i < arr.length; i++) {
    parent.push(new Array(arr[0].length).fill(null));
  }

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

function dfs(arr, start, end, curr, animations) {
  let x = curr[0],
    y = curr[1];
  if (x < 0 || x >= arr.length || y < 0 || y >= arr[0].length) return false;
  else if (arr[x][y] === 3) return false;
  else if (x === end[0] && y === end[1]) return true;
  else if (arr[x][y] === -1) return false;

  animations.push([0, x, y]);
  arr[x][y] = -1;

  return (
    dfs(arr, start, end, [x + 1, y], animations) ||
    dfs(arr, start, end, [x - 1, y], animations) ||
    dfs(arr, start, end, [x, y + 1], animations) ||
    dfs(arr, start, end, [x, y - 1], animations)
  );
}
