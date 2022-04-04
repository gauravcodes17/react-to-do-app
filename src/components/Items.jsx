import React from "react";
import ClearIcon from "@mui/icons-material/Clear";

const Items = (props) => {
  return (
    <>
      <div className="todo_style">
        <li>
          ({props.id + 1}) &nbsp; {props.item}
        </li>
        <span
          className="far fa-edit"
          title="Edit Item"
          onClick={() => {
            props.edit(props.edid);
          }}
        >
        </span>
        <span
          className="times"
          title="Delete Item"
          onClick={() => {
            props.delete(props.edid);
          }}
        >
          <ClearIcon />
        </span>
      </div>
    </>
  );
}

export default Items;
