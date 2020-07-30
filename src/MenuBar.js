import React from "react";
import { Button, ButtonGroup } from "@material-ui/core";

export default function MenuBar(props) {
  const { setMode } = props;
  return (
    <div style={{ paddingBottom: "10px", paddingLeft: "10px" }}>
      <ButtonGroup color="primary" aria-label="outlined button group">
        <Button onClick={() => setMode("donate")}>Donate</Button>
        <Button onClick={() => setMode("renderItems")}>
          View all donations
        </Button>
        <Button onClick={() => setMode("add")}>Add evacuation center</Button>
        <Button onClick={() => setMode("renderCenters")}>
          View all evacuation centers
        </Button>
        <Button onClick={() => setMode("distribute")}>Distribute Items</Button>
      </ButtonGroup>
    </div>
  );
}
