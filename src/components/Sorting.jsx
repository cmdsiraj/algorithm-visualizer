import { useEffect, useState, useCallback } from "react";
import "../styles/Sorting.css";
import {
  getSlectionSortAnimations,
  getBubbleSortAnimations,
  getQuickSortAnimations,
  getMergeSortAnimations,
} from "../Algos/SortingAlgorithms";

function Sorting() {
  const [array, setArray] = useState([]);
  const [currentSort, setCurrentSort] = useState("Select a Sorting Algorithm");
  const [timeoutArray, setTimeOutArray] = useState([]);

  const ARRAY_SIZE = window.innerWidth / 2 - 400;
  // const ARRAY_SIZE = 20;
  const ANIMATION_SPEED_MS = 1;
  const PRIMARY_COLOR = "#00ffff";
  const SECONDARY_COLOR = "#b300ff";
  const SORTED_COLOR = "#10a410";

  const resetColor = () => {
    const bars = document.getElementsByClassName("array-bar");
    if (bars) {
      Array.from(bars).forEach((bar) => {
        bar.style.backgroundColor = PRIMARY_COLOR;
      });
    }
  };

  const stopAlgo = () => {
    // console.log(timeoutArray);
    timeoutArray.forEach((id) => clearTimeout(id));
    setTimeOutArray([]);
  };

  const resetArray = () => {
    stopAlgo();
    resetColor();
    const newArray = [...array];
    setArray(newArray);
  };

  const randomArray = useCallback(() => {
    const arr = [];
    resetColor();
    for (let i = ARRAY_SIZE; i > 0; i--) {
      arr.push(randomNumberInRange(10, 500));
    }
    setArray(arr);
  }, [ARRAY_SIZE]);

  const randomNumberInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  useEffect(() => {
    randomArray();
  }, [randomArray]);

  const doAnimation = (animations) => {
    const bars = document.getElementsByClassName("array-bar");
    const timeOutIds = [];
    for (let i = 0; i < animations.length; i++) {
      var timeOutId;
      if (animations[i][0] === 0 || animations[i][0] === 1) {
        const [flag, barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = bars[barOneIdx].style;
        const barTwoStyle = bars[barTwoIdx].style;
        const color = flag === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        timeOutId = setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        timeOutId = setTimeout(() => {
          const [flag, swapElement, newHeight] = animations[i];
          const barOneStyle = bars[swapElement].style;
          barOneStyle.height = `${newHeight}px`;
          if (flag === -1) barOneStyle.backgroundColor = SORTED_COLOR;
        }, i * ANIMATION_SPEED_MS);
      }
      timeOutIds.push(timeOutId);
    }
    setTimeOutArray(timeOutIds);
  };

  const Selection = () => {
    setCurrentSort("Selection Sort");
    const animations = getSlectionSortAnimations(array);
    doAnimation(animations);
  };

  const Bubble = () => {
    setCurrentSort("Bubble Sort");
    const animations = getBubbleSortAnimations(array);
    doAnimation(animations);
  };

  const Quick = () => {
    setCurrentSort("Quick Sort");
    const animations = getQuickSortAnimations(array);
    doAnimation(animations);
  };

  const MergeSort = () => {
    setCurrentSort("Merge Sort");
    const animations = getMergeSortAnimations(array);
    doAnimation(animations);
  };

  const generateRandomArray = () => {
    stopAlgo();
    randomArray();
  }

  return (
    <>
      <div className="container">
        <div className="buttons">
          <button onClick={generateRandomArray}>Randomize Array</button>
          <button onClick={resetArray} className="tooltip">
            Reset
            <span className="tooltip-text">Not Working yet</span>
          </button>
          <button onClick={Selection}>Selection Sort</button>
          <button onClick={Bubble}>Bubble Sort</button>
          <button onClick={Quick}>Quick Sort</button>
          <button onClick={MergeSort}>Merge Sort</button>
          <button onClick={stopAlgo}>Stop</button>
        </div>
        <div className="display-container">
          <h2>{currentSort}</h2>
          <ul className="array-container">
            {array.map((ele, index) => (
              <li
                className="array-bar"
                key={index}
                style={{ height: `${ele}px`, backgroundColor: PRIMARY_COLOR }}
              ></li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Sorting;
