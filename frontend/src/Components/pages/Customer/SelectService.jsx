import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useState } from "react";

const SelectService = () => {
  const [services, setServices] = useState([]);

  const handleChange = (event) => {
    setServices(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="service-select-label">Service</InputLabel>
        <Select
          labelId="service-select-label"
          id="service-select"
          multiple
          value={services}
          onChange={handleChange}
          input={<OutlinedInput label="Service" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          <MenuItem value="Dry Cleaning">Dry Cleaning</MenuItem>
          <MenuItem value="Washing">Wash</MenuItem>
          <MenuItem value="Ironing">Iron</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectService;
