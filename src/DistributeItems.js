import React, { useState, useEffect } from "react";
import _, { set } from "lodash";
import createPairs from "./PairCreation";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
}));

const DistributeItems = () => {
  const classes = useStyles();
  const centers = JSON.parse(localStorage.getItem("centers"));
  const [pairs, setPairs] = useState({});

  useEffect(() => {
    const defaultPairs = createPairs();
    const groupedPairs = _.groupBy(defaultPairs, pair => pair.center.name);
    setPairs(groupedPairs);
  }, []);
  return (
    <div className={classes.root}>
      {Object.keys(pairs).length === 0 && (
        <Typography>Distributing items...</Typography>
      )}
      {Object.keys(pairs).map(key => (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>{key}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <b>Center : </b>
              <br />
              Name : {pairs[key][0].center.name}
              <br />
              Location : {pairs[key][0].center.location}
              <br />
              Population : {pairs[key][0].center.population}
              <br />
              Total Calorie Requirement :{" "}
              {
                centers.filter(center => center.name === key)[0].caloriesReqd
              }{" "}
              cal
              <br />
              Total Calories Received :{" "}
              {pairs[key].reduce(
                (total, pair) =>
                  total +
                  Math.min(pair.item.calories, pair.center.caloriesReqd),
                0
              )}{" "}
              cal
              <ul>
                {pairs[key].map(pair => (
                  <li>
                    <b>Item - </b>
                    <br />
                    Name : {pair.item.name}
                    <br />
                    Location : {pair.item.location}
                    <br />
                    Quantity : {pair.item.quantity}
                    <br />
                    Calories Available : {pair.item.calories} cal
                    <br />
                    Calories Received :{" "}
                    {Math.min(pair.item.calories, pair.center.caloriesReqd)} cal
                    <br />
                    <b>Fitness Score : </b>
                    {pair.fitnessScore}
                  </li>
                ))}
              </ul>
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default DistributeItems;
