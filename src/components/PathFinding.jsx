import { useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import "../styles/PathFinding.css";
import {
  getBfsAnimations,
  getDfsAnimations,
  getDfsAstarAnimations,
} from "../Algos/PathFindingAlgorithms";

// 1 START, 2 END, 3 HURDELS

function PathFinding() {
  const [map, setMap] = useState([]);
  const [start, setStart] = useState([0, 0]);
  const [selectionType, setSelectionType] = useState(null);
  const [numberOfWalls, setNumberOfWalls] = useState(250);

  const NUM_ROWS = 25;
  const NUM_COLS = 40;

  const START_COLOR = "#85e285";
  const END_COLOR = "#d72c2c";
  const FREE_WAY_COLOR = "#fff";
  const HURDEL_COLOR = "#000";
  const VISITED_COLOR = "lightblue";
  const PATH_COLOR = "#d89a2a";

  const ANIMATION_TIME = 20;

  const [end, setEnd] = useState([NUM_ROWS - 1, NUM_COLS - 1]);

  const init_map = useCallback(() => {
    console.log(numberOfWalls);
    const array = [];
    for (let i = 0; i < NUM_ROWS; i++) {
      array.push(Array(NUM_COLS).fill(0));
    }
    array[0][0] = 1;
    array[NUM_ROWS - 1][NUM_COLS - 1] = 2;
    for (let i = 0; i < numberOfWalls; i++) {
      let row = Math.floor(Math.random() * NUM_ROWS);
      let col = Math.floor(Math.random() * NUM_COLS);
      if (row === 0 && col === 0) continue;
      if (row === NUM_ROWS - 1 && col === NUM_COLS - 1) continue;
      array[row][col] = 3;
    }
    setMap(array);
  }, [numberOfWalls]);

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

  const bfs = () => {
    const animations = getBfsAnimations([...map], start, end);
    doAnimations(animations);
  };

  const dfs = () => {
    const animations = getDfsAnimations([...map], start, end);
    doAnimations(animations);
  };

  const dfsAstar = () => {
    console.log(numberOfWalls);
    const animations = getDfsAstarAnimations([...map], start, end);
    doAnimations(animations);
  };

  const setPlayerOption = (e) => {
    console.log(map);
    if (selectionType && e.target.value !== 3) {
      let x = parseInt(e.target.id.split("-")[0]);
      let y = parseInt(e.target.id.split("-")[1]);
      if (selectionType === "start") {
        setStart([x, y]);
        console.log(x, y);
        // const prev = document.getElementsByClassName("cell start");

        // console.log((prev[0].style.backgroundColor = FREE_WAY_COLOR));
        // prev[0].classList.remove("start");
        // // console.log((prev[0].value = 0));

        // // prev[0].style.backgroundColor = FREE_WAY_COLOR;
        // // prev[0].style.backgroundColor = PATH_COLOR;

        // e.target.classList.add("start");
        // e.target.style.backgroundColor = START_COLOR;
        // e.target.value = 1;
      } else if (selectionType === "end") {
        setEnd([x, y]);
        console.log(x, y);
        // const prev = document.getElementsByClassName("cell end");
        // prev[0].classList.remove("end");
        // console.log((prev[0].style.backgroundColor = FREE_WAY_COLOR));
        // // console.log((prev[0].value = 0));

        // e.target.classList.add("end");
        // e.target.style.backgroundColor = END_COLOR;
        // e.target.value = 3;
      }
    }
  };

  return (
    <>
      <div className="path-container">
        <div className="section-sideNav">
          <button onClick={bfs}>Breadth First</button>
          <button onClick={dfs}>Depth First</button>
          <button onClick={dfsAstar}>DFS A*</button>
          <button onClick={() => init_map()}>Randomize Map</button>
          <button onClick={() => setSelectionType("start")}>
            Select Start
          </button>
          <button onClick={() => setSelectionType("end")}>Select End</button>
          <span className="input">
            <label>Wall Count</label>
            <input
              type="number"
              onChange={(e) => setNumberOfWalls(e.target.value)}
              value={numberOfWalls}
            />
          </span>
        </div>
        <div className="section-map">
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
                      className={`cell ${
                        col === 1 ? "start" : col === 2 ? "end" : ""
                      }`}
                      id={`${index1}-${index2}`}
                      key={`${index1}${index2}`}
                      value={col}
                      style={{ backgroundColor: color }}
                      onClick={setPlayerOption}
                    ></button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default PathFinding;
