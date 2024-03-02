// 1 START, 2 END, 3 HURDELS
export function getBfsAnimations(arr, start) {
  const animations = [];
  bfs([...arr], animations, start);
  return animations;
}

function bfs(arr, animations, start) {
  const queue = [];
  const parent = [];

  for (let i = 0; i < arr.length; i++) {
    parent.push(new Array(arr[0].length).fill(null));
  }

  queue.push([start[0], start[1]]);
  while (queue.length !== 0) {
    const curr = queue.shift();
    if (curr) {
      let x = curr[0],
        y = curr[1];
      if (x < 0 || y < 0) continue;
      if (x >= arr.length || y >= arr[0].length) continue;
      if (arr[x][y] === 2) {
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