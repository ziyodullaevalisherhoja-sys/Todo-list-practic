import './App.css';
import React, { useState, useEffect } from "react";
import { FaRegSun, FaMoon, FaPlus } from "react-icons/fa";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";

function App() {
    const [inputValue, setInputValue] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [modalInput, setModalInput] = useState("");
    const [theme, setTheme] = useState("light");
    const [editId, setEditId] = useState(null);

    const [data, setData] = useState([
      { id: 1, title: "NOTE #1", isDone: true },
      { id: 2, title: "NOTE #2", isDone: true },
      { id: 3, title: "NOTE #3", isDone: false }
    ]);

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    const toggleTheme = () => {
      setTheme(theme === "light" ? "dark" : "light");
    };

    const handleApply = () => {
      if(modalInput.trim() !== "") {
        setData([...data, { id: Date.now(), title: modalInput, isDone: false }]);
        setModalInput("");
        setModalOpen(false);
      }
    };

    const deleteItem = (id) => {
      setData(data.filter(item => item.id !== id));
    };

    const toggleDone = (id) => {
      let newData = data.map(item => {
        if(item.id === id) {
          return { ...item, isDone: !item.isDone };
        }
        return item;
      });
      setData(newData);
    };

    const startEdit = (id, currentTitle) => {
        setEditId(id);
        setInputValue(currentTitle);
    };

    const saveEdit = () => {
        let newData = data.map(item => {
            if(item.id === editId) {
                return { ...item, title: inputValue };
            }
            return item;
        });
        setData(newData);
        setEditId(null);
        setInputValue("");
    };

  return (
    <div className={`app-wrapper ${theme}`}>
      <div className="container">
        <h1>TODO LIST</h1>

        <div className="top-bar">
          <div className="search">
            <input 
                type="text" 
                placeholder={editId ? "Edit your note..." : "Search note..."} 
                value={inputValue} 
                onChange={(e) => setInputValue(e.target.value)} 
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && editId) saveEdit();
                }}
            />
          </div>

          <select>
            <option value="ALL">ALL</option>
          </select>

          {editId && (
              <button className="apply-btn" onClick={saveEdit} style={{padding: '10px 15px', background: "#28a745"}}>SAVE</button>
          )}

          <button className="theme" onClick={toggleTheme}>
            {theme === "light" ? <FaRegSun /> : <FaMoon />}
          </button>
        </div>

        <div className="list">
          {data.length === 0 ? <p className="empty-state">No notes found...</p> : null}
          {data.map((item) => {
            return (
              <div className={`item ${item.isDone ? "done" : ""}`} key={item.id}>
                <input type="checkbox" checked={item.isDone} onChange={() => toggleDone(item.id)} />
                <span>{item.title}</span>

                <div className="actions">
                    <MdOutlineModeEdit onClick={() => startEdit(item.id, item.title)} style={{cursor: "pointer", color: editId === item.id ? "#6c63ff" : "inherit"}}/>
                    <MdDeleteOutline onClick={() => deleteItem(item.id)} style={{cursor: "pointer"}}/>
                </div>
              </div>
            );
          })}
        </div>

        <button className="add" onClick={() => setModalOpen(true)}>
          <FaPlus />
        </button>

        {modalOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>NEW NOTE</h2>
              <input 
                type="text" 
                placeholder="Input your note..." 
                value={modalInput} 
                onChange={(e) => setModalInput(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') handleApply();
                }}
                autoFocus
              />
              <div className="modal-actions">
                <button className="cancel-btn" onClick={() => setModalOpen(false)}>CANCEL</button>
                <button className="apply-btn" onClick={handleApply}>APPLY</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;