import React, { useState, useEffect } from "react";
import Items from "./Items";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";

const getLocalItems = () => {
  return localStorage.getItem("lists");
}

const TodoApp = () => {
  const [text, setText] = useState("");
  const [updateText, setUpdateText] = useState(JSON.parse(getLocalItems()));
  const [icon, setIcon] = useState(false);
  const [getId, setGetId] = useState(null);

  const change = (e) => {
    setText(e.target.value);
  }

  const submitInput = () => {
    if (!text) {
      alert("Please Add Items");
    } else if (text && icon) {
      setUpdateText(
        updateText.map((elem) => {
          if (elem.uid === getId) {
            return {
              ...elem,
              data: text,
            }
          }
          return elem;
        })
      );
      setIcon(false);
      setText("");
      setGetId(null);
      alert("Saved Successfully");
    } else {
      const dataId = {
        uid: new Date().getTime().toString(),
        data: text,
      };
      setUpdateText([...updateText, dataId]);
      setText("");
      alert("Added Successfully");
    }
  }

  const editItems = (id) => {
    const newEditedItem = updateText.find((elem) => {
      return elem.uid === id;
    });
    setIcon(true);
    setText(newEditedItem.data);
    setGetId(id);
  }

  const deleteItems = (id) => {
    const finalData = updateText.filter((elem) => {
      return id !== elem.uid;
    });
    setUpdateText(finalData);
    alert("Deleted");
  }

  const removeAllData = () => {
    setUpdateText([]);
    alert("Delete All Data Successfully");
  }

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(updateText));
  }, [updateText]);

  return (
    <div className="main_div">
      <div className="center_div">
        <br />
        <h3>Add Your Favourite Programming Languages...</h3>
        <br />
        <input
          type="text"
          placeholder="Add Items..."
          onChange={change}
          value={text}
        />
        <button className="button1" onClick={submitInput}>
          {icon ? <SaveIcon /> : <AddIcon />}
        </button>
        <ol>
          {updateText.map((elem, i) => {
            return (
              <Items
                key={elem.uid}
                id={i}
                edid={elem.uid}
                item={elem.data}
                edit={editItems}
                delete={deleteItems}
              />
            );
          })}
        </ol>
        <button
          onClick={removeAllData}
          style={{
            padding: "6px 15px",
            backgroundColor: "red",
            color: "#fff",
            cursor: "pointer",
            outline: "none",
            border: "none",
            fontSize: "15px",
            borderRadius: "4px",
            marginTop: "25px",
            fontWeight: "500",
            letterSpacing: "0.5px",
          }}
        >
          Remove All
        </button>
      </div>
    </div>
  );
}

export default TodoApp;
