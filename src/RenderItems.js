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
export default function RenderItems() {
  const items = JSON.parse(localStorage.getItem("items"));
  const classes = useStyles();

  return (
    <Container maxWidth="sm" fixed="true" className={classes.root}>
      {items.length === 0 && <Typography>No item found!</Typography>}
      {items.map(item => (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>{item.name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Location : {item.location}
              <br />
              Quantity : {item.quantity}
              <br />
              Total Calories : {item.calories} cal
              <br />
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
}
