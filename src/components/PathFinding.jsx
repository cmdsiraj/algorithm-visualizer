import { useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import "../styles/PathFinding.css";
import { getBfsAnimations } from "../Algos/PathFindingAlgorithms";

// 1 START, 2 END, 3 HURDELS

function PathFinding() {
  const [map, setMap] = useState([]);
  const NUM_ROWS = 25;
  const NUM_COLS = 40;
  const START_COLOR = "#85e285";
  const END_COLOR = "#d72c2c";
  const FREE_WAY_COLOR = "#fff";
  const HURDEL_COLOR = "#000";
  const VISITED_COLOR = "lightblue";
  const PATH_COLOR = "#d89a2a";

  const ANIMATION_TIME = 20;

  const init_map = useCallback(() => {
    const array = [];
    for (let i = 0; i < NUM_ROWS; i++) {
      array.push(Array(NUM_COLS).fill(0));
    }
    array[0][0] = 1;
    array[NUM_ROWS - 1][NUM_COLS - 1] = 2;
    for (let i = 0; i < 250; i++) {
      let row = Math.floor(Math.random() * NUM_ROWS);
      let col = Math.floor(Math.random() * NUM_COLS);
      if (row === 0 && col === 0) continue;
      if (row === NUM_ROWS - 1 && col === NUM_COLS - 1) continue;
      array[row][col] = 3;
    }
    setMap(array);
  }, []);

  useEffect(() => {
    init_map();
  }, [init_map]);

  const doAnimations = (animations) => {
    const mapRows = document.getElementsByClassName("row");
    const cells = Array.from(mapRows).map((row) =>
      row.getElementsByClassName("cell")
    );
    for (let i = 0; i < animations.length; i++) {
      const [flag, x, y] = animations[i];
      const cellStyle = cells[x][y].style;
      setTimeout(() => {
        if (flag === 0) {
          if (x === 0 && y === 0) cellStyle.backgroundColor = START_COLOR;
          else cellStyle.backgroundColor = VISITED_COLOR;
        } else if (flag === 1) {
          if (x === 0 && y === 0) cellStyle.backgroundColor = START_COLOR;
          if (x === NUM_ROWS && y === NUM_COLS)
            cellStyle.backgroundColor = END_COLOR;
          else cellStyle.backgroundColor = PATH_COLOR;
        }
      }, i * ANIMATION_TIME);
    }
  };

  const dfs = () => {
    const animations = getBfsAnimations(map, [0, 0]);
    doAnimations(animations);
  };

  return (
    <>
      <div className="map">
        {map.map((row, index1) => (
          <div className="row" key={NUM_ROWS * NUM_COLS + index1 + 1}>
            {row.map((col, index2) => {
              const color =
                col === 1
                  ? START_COLOR
                  : col === 2
                  ? END_COLOR
                  : col === 3
                  ? HURDEL_COLOR
                  : FREE_WAY_COLOR;
              return (
                <button
                  className="cell"
                  id={`${index1}${index2}`}
                  key={`${index1}${index2}`}
                  value={col}
                  style={{ backgroundColor: color }}
                ></button>
              );
            })}
          </div>
        ))}
      </div>
      <button onClick={dfs}>Find Path</button>
    </>
  );
}

export default PathFinding;
