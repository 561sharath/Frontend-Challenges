import { useState } from "react";
import "./transferList.css";
import { useNavigate } from "react-router-dom";

export default function TransferList() {
  const [textData, setTextData] = useState("");
  const [todoListData, setToDoListData] = useState([]);
  const [completeTasksData, setCompleteTasksData] = useState([]);
  const [editingTaskItem, setEditingTaskItem] = useState(null);

  const dataEnter = (e) => {
    if (e.key === "Enter" && textData.trim().length > 0) {
      setToDoListData((prev) => [
        ...prev,
        {
          id: Date.now(),
          name: textData.trim(),
          isTrue: false,
          isEditing: false,
        },
      ]);
      setTextData("");
    }
  };

  const toDoCheckBoxChange = (item) => {
    const newTodoData = todoListData.map((data, index) =>
      data.id === item.id ? { ...data, isTrue: !data.isTrue } : data
    );
    setToDoListData(newTodoData);
  };

  const completeCheckBoxChange = (item) => {
    const newCompleteTodoData = completeTasksData.map((data, index) =>
      data.id === item.id ? { ...data, isTrue: !data.isTrue } : data
    );
    setCompleteTasksData(newCompleteTodoData);
  };

  const leftTranfer = () => {
    const newRightData = [...completeTasksData];
    const newLeftData = todoListData.filter((data, index) => {
      if (data.isTrue === false || data.isEditing === true) {
        return data;
      } else {
        newRightData.push({ ...data, isTrue: false });
      }
    });
    setToDoListData(newLeftData);
    setCompleteTasksData(newRightData);
  };

  const rightTranfer = () => {
    const newLeftData = [...todoListData];
    const newRightData = completeTasksData.filter((data, index) => {
      if (data.isTrue === false || data.isEditing === true) {
        return data;
      } else {
        newLeftData.push({ ...data, isTrue: false });
      }
    });
    setCompleteTasksData(newRightData);
    setToDoListData(newLeftData);
  };

  const allRightMove = () => {
    const newData = todoListData.map((data, index) => ({
      ...data,
      isTrue: false,
      isEditing: false
    }));
    setToDoListData([]);
    setCompleteTasksData((prev) => [...prev, ...newData]);
    setEditingTaskItem(null);
  };

  const allLeftMove = () => {
    const newData = completeTasksData.map((data, index) => ({
      ...data,
      isTrue: false,
      isEditing: false
    }));
    setCompleteTasksData([]);
    setToDoListData((prev) => [...prev, ...newData]);
    setEditingTaskItem(null);
  };

  const checkStatus = (data) => {
    const result = data.some((item, index) => item.isTrue === true);
    return result;
  };

  const deleteItemPending = (id) => {
    const newData = todoListData.filter((item) => item.id !== id);
    setToDoListData(newData);
  };

  const deleteItemCompleted = (id) => {
    const newData = completeTasksData.filter((item) => item.id !== id);
    setCompleteTasksData(newData);
  };

  const oneditPending = (item) => {
    const newData = todoListData.map((data) => {
      if (editingTaskItem && data.id === editingTaskItem.id) {
        // reset previous edit
        return { ...data, isEditing: false };
      } else if (data.id === item.id) {
        // enable new edit
        return { ...data, isEditing: true };
      }
      return data;
    });

    setToDoListData(newData);
    setEditingTaskItem(item);
  };

  const cancelEditItem = (item) => {
    const newData = todoListData.map((data) =>
      data.id === item.id ? { ...data, isEditing: false } : data
    );
    setToDoListData(newData);
    setEditingTaskItem(null);
  };

  const onSaveEditItem = (item) => {
    const newData = todoListData.map((data) =>
      data.id === item.id
        ? { ...data, name: editingTaskItem.name, isEditing: false }
        : data
    );
    setToDoListData(newData);
    setEditingTaskItem(null);
  };

  
  return (
    <div>
      <h1 className="App">Transfer List</h1>
      <div className="input-container">
        <input
          placeholder="Enter Task"
          type="text"
          className="input-box"
          value={textData}
          onChange={(e) => setTextData(e.target.value)}
          onKeyDown={dataEnter}
        />
      </div>
      <div className="tasks-container">
        <div className="todo-container">
          <span style={{ fontWeight: "800" }}>Todo</span>
          {todoListData.map((item, index) => (
            <div key={item.id} className="todo-data">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
                className="todo-item"
              >
                {item.isEditing ? (
                  <>
                    <div>
                      <input
                        type="text"
                        value={editingTaskItem.name}
                        onChange={(e) =>
                          setEditingTaskItem({
                            ...editingTaskItem,
                            name: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <button onClick={() => cancelEditItem(item)}>
                        Cancel
                      </button>
                      <button onClick={() => onSaveEditItem(item)}>Save</button>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <input
                        type="checkbox"
                        id={item.id}
                        name={item.name}
                        value={item.name}
                        onChange={() => toDoCheckBoxChange(item)}
                      />
                      <label htmlFor={item.id}>{item.name}</label>
                    </div>
                    <div>
                      <button
                        className="edit-effect"
                        onClick={() => oneditPending(item)}
                      >
                        ✏️
                      </button>
                      <button
                        className="cancel-effect"
                        onClick={() => deleteItemPending(item.id)}
                      >
                        ❌
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="options-container">
          <span style={{ fontWeight: "800" }}>Options</span>
          <div className="options-box">
            <button
              className="option-button"
              onClick={() => leftTranfer()}
              disabled={!checkStatus(todoListData)}
            >
              ▶️
            </button>
            <button
              className="option-button"
              onClick={() => allRightMove()}
              disabled={todoListData.length === 0}
            >
              ⏮️
            </button>
            <button
              className="option-button"
              onClick={() => rightTranfer()}
              disabled={!checkStatus(completeTasksData)}
            >
              ◀️
            </button>
            <button
              className="option-button"
              onClick={() => allLeftMove()}
              disabled={completeTasksData.length === 0}
            >
              ⏭️
            </button>
          </div>
        </div>
        <div className="complte-tasks-container">
          <span style={{ fontWeight: "800" }}>Complete Tasks</span>
          {completeTasksData.map((item, index) => (
            <div key={item.id} className="todo-data">
              <div
                className="todo-item"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <div>
                  <input
                    type="checkbox"
                    id={item.id}
                    name={item.name}
                    value={item.name}
                    onChange={() => completeCheckBoxChange(item)}
                  />
                  <label htmlFor={item.id}>{item.name}</label>
                </div>
                <button
                  className="cancel-effect"
                  onClick={() => deleteItemCompleted(item.id)}
                >
                  ❌
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
