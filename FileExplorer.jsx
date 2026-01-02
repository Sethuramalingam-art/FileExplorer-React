import React, { useState, useEffect, useMemo } from "react";

const FileExplorer = () => {
  const fileExplorerState = {
    item: {
      root: {
        id: "root",
        name: "Root",
        type: "folder",
        parentID: null,
      },
      folder1: {
        id: "folder1",
        name: "Folder 1",
        type: "folder",
        parentID: "root",
      },
      file1: {
        id: "file1",
        name: "File 1.txt",
        type: "file",
        parentID: "folder1",
      },
      file2: {
        id: "file2",
        name: "File 2.txt",
        type: "file",
        parentID: "folder1",
      },
      folder2: {
        id: "folder2",
        name: "Folder 2",
        type: "folder",
        parentID: "root",
      },
      file3: {
        id: "file3",
        name: "File 3.txt",
        type: "file",
        parentID: "folder2",
      },
      file4: {
        id: "file4",
        name: "File 4.txt",
        type: "file",
        parentID: "folder2",
      },
      folder3: {
        id: "folder3",
        name: "Folder 3",
        type: "folder",
        parentID: "root",
      },
      file5: {
        id: "file5",
        name: "File 5.txt",
        type: "file",
        parentID: "folder3",
      },
    },
    activatedItem: null,
    expandedItems: new Set(["root", "folder1"]),
    selectedItems: new Set(["file1"]),
  };

  const [state, setState] = useState(fileExplorerState);

  const setActivedItem = (itemID) => {
    setState((prevState) => ({
      ...prevState,
      activatedItem: itemID,
    }));
  };

  const getChildren = (state, parentID) => {
    return Object.values(state.item).filter(
      (item) => item.parentID === parentID
    );
  };

  const getItemPath = (state, itemID) => {
    const path = [];
    const basePath = { name: "Home", id: null };
    let currentID = itemID;
    while (currentID) {
      const currentItem = state.item[currentID];
      if (!currentItem) break;
      path.unshift({ name: currentItem.name, id: currentItem.id });
      currentID = currentItem.parentID;
    }
    return [basePath, ...path];
  };

  const pathArray = useMemo(
    () => getItemPath(state, state.activatedItem),
    [state]
  );

  const childToRender = useMemo(
    () => getChildren(state, state.activatedItem),
    [state]
  );
  return (
    <div>
      <h2>File Explorer</h2>
      <div className="file-explorer">
        {/* Render file explorer UI here */}
        {pathArray.map((p, index) => (
          <>
            <span key={p.id || "home"} onClick={() => setActivedItem(p.id)}>
              {p.name}
            </span>
            {index !== pathArray.length - 1 && <span> &gt; </span>}
          </>
        ))}
      </div>
      <div className="box-wrapper">
        {childToRender.map((e) => (
          <div
            onClick={() => {
              if (e.type === "folder") {
                setActivedItem(e.id);
              }
            }}
            key={e.id}
            className={`box ${e.type}`}
          >
            {e.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileExplorer;
