import React, { useState, useEffect } from "react";
import "./styles.css";
import { Container } from "@material-ui/core";
import MenuBar from "./MenuBar";
import { makeStyles } from "@material-ui/core/styles";
import Donate from "./Donate";
import { foodItems } from "./Constants";
import RenderItems from "./RenderItems";
import AddCenter from "./AddEvacuationCenter";
import RenderCenters from "./RenderCenters";
import DistributeItems from "./DistributeItems";
import {
  GenerateDonatedItems,
  GenerateEvacuationCenters
} from "./DataGeneration";

const useStyles = makeStyles(theme => ({
  root: {
    justifyContent: "center"
  }
}));

const defaultItems = GenerateDonatedItems();
const defaultCenters = GenerateEvacuationCenters();

export default function App() {
  const classes = useStyles();
  const [mode, setMode] = useState("");
  const [items, setItems] = useState(defaultItems);
  const [centers, setCenters] = useState(defaultCenters);

  const addItem = item => {
    let tempItems = items;
    let calories =
      foodItems.filter(foodItem => foodItem.name === item.name)[0].calPerKg *
      Number(item.quantity);
    let tempItem = { ...item, calories: calories };
    tempItems.push(tempItem);
    setItems(tempItems);
    localStorage.setItem("items", JSON.stringify(items));
  };

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const addCenter = center => {
    let tempCenters = centers;
    let caloriesReqd = Number(center.population) * 2000;
    let tempCenter = { ...center, caloriesReqd: caloriesReqd };
    tempCenters.push(tempCenter);
    setCenters(tempCenters);
    localStorage.setItem("centers", JSON.stringify(centers));
  };

  useEffect(() => {
    localStorage.setItem("centers", JSON.stringify(centers));
  }, [centers]);

  let tot = items.reduce((total, item) => total + item.calories, 0);
  let reqd = centers.reduce((total, center) => total + center.caloriesReqd, 0);
  console.log("TOT", tot);
  console.log("REQD", reqd);

  return (
    <Container maxWidth="md" fixed="true" className={classes.root}>
      <MenuBar setMode={setMode} />
      {mode === "donate" && <Donate addItem={addItem} />}
      {mode === "renderItems" && <RenderItems />}
      {mode === "add" && <AddCenter addCenter={addCenter} />}
      {mode === "renderCenters" && <RenderCenters />}
      {mode === "distribute" && <DistributeItems />}
    </Container>
  );
}
