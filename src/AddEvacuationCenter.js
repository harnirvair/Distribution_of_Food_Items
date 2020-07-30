import React, { useState } from "react";
import { TextField, Container, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { defaultCenterData } from "./Constants";

export default function AddCenter({ addCenter }) {
  const [center, setCenter] = useState(defaultCenterData);

  const handleChange = event => {
    const name = event.target.name;
    setCenter({
      ...center,
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
        <TextField
          required
          value={center.name}
          style={{ padding: "2px", marginTop: "5px" }}
          id="name"
          label="Name"
          variant="outlined"
          name="quantity"
          onChange={e => setCenter({ ...center, name: e.target.value })}
        />
        <FormControl
          variant="outlined"
          style={{ padding: "2px", marginTop: "5px" }}
        >
          <InputLabel htmlFor="outlined-age-native-simple">Location</InputLabel>
          <Select
            native
            value={center.location}
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
          value={center.population}
          style={{ padding: "2px", marginTop: "5px" }}
          id="population"
          label="Population"
          variant="outlined"
          name="population"
          onChange={e => setCenter({ ...center, population: e.target.value })}
        />
        <Button
          variant="contained"
          color="primary"
          style={{ display: "block", position: "absolute", marginTop: "5px" }}
          onClick={() => {
            if (!center.location || !center.population || !center.name) {
              alert("Name, Location and Population are a necessary field");
            } else {
              addCenter(center);
              setCenter(defaultCenterData);
            }
          }}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
}
