import React, { useState } from "react";
import './App.css'

function App() {
  const [boxArray, setBoxArray] = useState([]);
  const [selectedBox, setSelectedBox] = useState(-1);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [prevMouseCoordinate, setPrevMouseCoordinate] = useState({});

  const handleAddClick = () => {
    var dupArray = [...boxArray];
    dupArray.push({ xValue: 200, yValue: 200 });
    setBoxArray(dupArray);
  }

  const handleDeleteClick = () => {
    var dupArray = [...boxArray];
    dupArray.splice(selectedBox, 1);
    setBoxArray(dupArray);
  }

  const handleSelect = (index) => {
    setSelectedBox(index);
  }

  const handleMouseDown = (event, index) => {
    setIsMouseDown(true);
    setSelectedBox(index);
    setPrevMouseCoordinate({xValue: event.clientX, yValue: event.clientY});
  } 

  const handleMouseUp = () => {
    setIsMouseDown(false);
  } 

  const handleMouseMove = (e) => {
    if(isMouseDown) {
      var delta = {xDelta: e.clientX-prevMouseCoordinate.xValue, yDelta: e.clientY-prevMouseCoordinate.yValue};
      var dupArray = [...boxArray];
      dupArray[selectedBox].xValue = dupArray[selectedBox].xValue + delta.xDelta;
      dupArray[selectedBox].yValue = dupArray[selectedBox].yValue + delta.yDelta;
      setBoxArray(dupArray);
      setPrevMouseCoordinate({xValue: e.clientX, yValue: e.clientY})
    }
  }

  return (
    <div className="App">
      <button onClick={handleAddClick} >Add New Node</button>
      <button onClick={handleDeleteClick} >Delete Selected Node</button>
      <div className="container" >
        {
          boxArray.map((box, index) =>
            <div key={index} className="blue-box" style={{top: box.yValue, left: box.xValue}} 
            onMouseDown={(event) => handleMouseDown(event, index)}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onClick={() => handleSelect(index)} />)
        }
      </div>
    </div>
  );
}

export default App;
