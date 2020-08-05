import React from "react";
import _ from "lodash";
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
  const items = _.groupBy(
    JSON.parse(localStorage.getItem("items")),
    item => item.name
  );
  const classes = useStyles();

  console.log(items);
  return (
    <Container maxWidth="sm" fixed="true" className={classes.root}>
      {items.length === 0 && <Typography>No item found!</Typography>}
      {Object.keys(items).map(key => (
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
              <ul>
                {items[key].map(item => (
                  <li>
                    Location : {item.location}, Quantity : {item.quantity} kg,
                    Calories : {item.calories / 1000} Kcal
                    <br />
                  </li>
                ))}
              </ul>
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
}
