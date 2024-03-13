import { Checkbox, FormControlLabel } from "@mui/material";

export default function CFCheckbox({
  label,
  id,
  name,
  value,
  onChange,
  onBlur,
  editMode,
}) {
  return (
    <FormControlLabel
      label={label}
      color="black"
      sx={{
        ".MuiFormControlLabel-label": {
          color: "rgba(0, 0, 0, 0.8)",
        },
      }}
      control={
        <Checkbox
          id={id}
          name={name}
          value={value}
          checked={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={!editMode}
          sx={{
            ".MuiSvgIcon-root path": {
              fill: editMode ? "rgb(96, 44, 93)" : "rgba(0, 0, 0, 0.5)",
            },
          }}
        />
      }
    />
  );
}
