import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import AppList from "./AppList";
import { ItemTypes } from "./Constants";
import { Provider } from "./Context";
import DropZone from "./DropZone";

function App() {
  return (
    <Provider>
      <DndProvider backend={HTML5Backend}>
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <AppList />
          <DropZone />
        </div>
      </DndProvider>
    </Provider>
  );
}

export default App;
