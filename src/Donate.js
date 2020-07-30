import React, { useState } from "react";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Container
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { foodItems, defaultItem } from "./Constants";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

export default function Donate({ addItem }) {
  const [item, setItem] = useState(defaultItem);

  const handleChange = event => {
    const name = event.target.name;
    setItem({
      ...item,
      [name]: event.target.value
    });
  };

  return (
    <Container maxWidth="sm" fixed="true">
      <form
        id="addPerson"
        style={{ display: "block" }}
        noValidate
        autoComplete="off"
      >
        <FormControl
          variant="outlined"
          style={{ padding: "2px", marginTop: "5px" }}
        >
          <InputLabel htmlFor="outlined-age-native-simple">Type</InputLabel>
          <Select
            native
            value={item.name}
            onChange={handleChange}
            label="Name"
            inputProps={{
              name: "name",
              id: "outlined-age-native-simple"
            }}
          >
            <option aria-label="None" value="" />
            {foodItems.map(foodItem => (
              <option value={foodItem.name}>{foodItem.name}</option>
            ))}
          </Select>
        </FormControl>
        <FormControl
          variant="outlined"
          style={{ padding: "2px", marginTop: "5px" }}
        >
          <InputLabel htmlFor="outlined-age-native-simple">Location</InputLabel>
          <Select
            native
            value={item.location}
            onChange={handleChange}
            label="Location"
            inputProps={{
              name: "location",
              id: "outlined-age-native-simple"
            }}
          >
            <option aria-label="None" value="" />
            <option value={"Delhi"}>Delhi</option>
            <option value={"Maharashtra"}>Maharashtra</option>
            <option value={"Tamil Nadu"}>Tamil Nadu</option>
            <option value={"Uttar Pradesh"}>Uttar Pradesh</option>
            <option value={"Gujarat"}>Gujarat</option>
            <option value={"Rajasthan"}>Rajasthan</option>
            <option value={"Karnataka"}>Karnataka</option>
          </Select>
        </FormControl>
        <TextField
          required
          value={item.quantity}
          style={{ padding: "2px", marginTop: "5px" }}
          id="quantity"
          label="Quantity (in kgs)"
          variant="outlined"
          name="quantity"
          onChange={e => setItem({ ...item, quantity: e.target.value })}
        />
        <Button
          variant="contained"
          color="primary"
          style={{ display: "block", position: "absolute", marginTop: "5px" }}
          onClick={() => {
            if (!item.name || !item.location || !item.quantity) {
              alert("Name, Location and Quantity are a necessary field");
            } else {
              addItem(item);
              setItem(defaultItem);
            }
          }}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
}
