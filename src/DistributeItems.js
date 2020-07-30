import React, { useState, useEffect } from "react";
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
  const [pairs, setPairs] = useState([]);
  useEffect(() => {
    const defaultPairs = createPairs();
    setPairs(defaultPairs);
  }, []);
  return (
    <div className={classes.root}>
      {pairs.length === 0 && <Typography>No pairs found!</Typography>}
      {pairs.map(pair => (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>
              {pair.center.name} and {pair.item.name}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <b>Center</b>
              <br />
              Name : {pair.center.name}
              <br />
              Location : {pair.center.location}
              <br />
              Population : {pair.center.population}
              <br />
              Calorie Requirement : {pair.center.caloriesReqd} cal
              <br />
              <b>Item</b>
              <br />
              Name : {pair.item.name}
              <br />
              Location : {pair.item.location}
              <br />
              Quantity : {pair.item.quantity}
              <br />
              Total Calories : {pair.item.calories} cal
              <br />
              <b>Fitness Score : </b>
              {pair.fitnessScore}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default DistributeItems;
