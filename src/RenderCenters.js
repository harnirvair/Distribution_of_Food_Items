import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Container } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
}));
export default function RenderCenters() {
  const centers = JSON.parse(localStorage.getItem("centers"));
  const classes = useStyles();

  return (
    <Container maxWidth="sm" fixed="true" className={classes.root}>
      {centers.length === 0 && <Typography>No center found!</Typography>}
      {centers.map(center => (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>{center.name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Location : {center.location}
              <br />
              Population : {center.population}
              <br />
              Calorie Requirement : {center.caloriesReqd} cal
              <br />
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
}
