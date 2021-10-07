import React, { useState } from "react";
import ReactFlow, {
  addEdge,
  Controls,
  removeElements,
  MiniMap,
} from "react-flow-renderer";

const initialElements = [
  {
    id: "1",
    type: "input", // input node
    data: { label: "Input Node" },
    position: { x: 500, y: 10 },
  },
  // default node
  {
    id: "2",
    // you can also pass a React component as a label
    data: { label: <div>Default Node</div> },
    position: { x: 250, y: 200 },
  },
  {
    id: "3",
    data: { label: "default node" },
    position: { x: 750, y: 150 },
  },
  {
    id: "4",
    type: "output",
    data: { label: "output node" },
    position: { x: 500, y: 410 },
  },
  // animated edge
  {
    id: "e1-2",
    source: "1",
    target: "2",
    animated: true,
    label: "label with animated and smooth edge",
    type: "smoothstep",
  },
  {
    id: "e1-3",
    source: "1",
    target: "3",
    animated: true,
    label: "label with arrow head and step edge",
    arrowHeadType: "arrowclosed",
    type: "step",
    style: { stroke: "blue" },
    labelStyle: { fill: "blue", fontWeight: 700 },
  },
  {
    id: "e3-4",
    source: "3",
    target: "4",
    label: "Label with styled BG",
    labelBgPadding: [4, 10],
    labelBgBorderRadius: 4,
    labelBgStyle: { fill: "yellow", color: "grey", fillOpacity: "1" },
  },
];

const onLoad = (reactFlowInstance) => {
  console.log("on load", reactFlowInstance);
  reactFlowInstance.fitView();
};

export const Basic = () => {
  const [elements, setElements] = useState(initialElements);

  const onConnect = (params) => {
    setElements((els) => addEdge(params, els));
  };

  const onElementsRemove = (elementsToRemove) => {
    setElements((els) => removeElements(elementsToRemove, els));
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <ReactFlow
        onElementsRemove={onElementsRemove}
        onConnect={onConnect}
        elements={elements}
        onLoad={onLoad}
        snapToGrid={true}
        snapGrid={[15, 15]}
      >
        <MiniMap
          nodeStrokeColor={(n) => {
            if (n.style?.background) return n.style.background;
            if (n.type === "input") return "#0041d0";
            if (n.type === "output") return "#ff0072";
            if (n.type === "default") return "#1a192b";

            return "#eee";
          }}
          nodeColor={(n) => {
            if (n.style?.background) return n.style.background;

            return "#fff";
          }}
          nodeBorderRadius={2}
        />
        <Controls />
      </ReactFlow>
    </div>
  );
};
