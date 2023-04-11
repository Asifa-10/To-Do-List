import React, { useEffect, useState } from "react";
import todo from "../images/images.png";
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import "../App.css"
import { Tooltip } from "@mui/material";


const getLocalItems = () =>{
    let list= localStorage.getItem('lists');

    if (list) {
        return JSON.parse(localStorage.getItem('lists'))
    }else{
        return [];
    }
}

const Todo = () =>{

    const [inputData, setInputData]= useState();
    const [items, setItems]= useState(getLocalItems());
    const [toggleSubmit, setToggleSubmit]= useState(true);
    const [isEditItem, setIsEditItem]= useState(null);


    const addItem = () =>{
        if (!inputData) {
            alert("Please Enter some data!!")
        }else if (inputData && !toggleSubmit) {
            setItems(
                items.map((elem) =>{
                    if (elem.id === isEditItem) {
                        return{ ...elem,name: inputData}
                    }
                    return elem;
                })
            )

            setToggleSubmit(true);
            setInputData('');
            setIsEditItem(null);
        }else{
            const allInputData= {id: new Date().getTime().toString(), name: inputData}
            setItems([...items,allInputData]);
            setInputData('');
        }      
    }

    const deleteItem = (idx) =>{
        const updatedItems = items.filter((elem) =>{
                return idx !== elem.id;
        })

        setItems(updatedItems);
    }

    const editItem = (id) =>{
        let newEditItem = items.find((elem) => {
            return elem.id ===id;
        });

        setToggleSubmit(false);
        setInputData(newEditItem.name);
        setIsEditItem(id);
    }
    const removeAll = () =>{
        setItems([]);
    }

    useEffect(() =>{
        localStorage.setItem('lists', JSON.stringify(items))
    }, [items]);
    return(
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src={todo} alt="todologo"/><br/>
                        <figcaption>Add Your List Here</figcaption>
                    </figure>

                    <div className="addItems">
                        <input type="text" placeholder="✍️ Add Items...." value={inputData} onChange={(e) => setInputData(e.target.value)}/>
                        {
                            toggleSubmit ? <Button onClick={addItem}>
                            <Tooltip title="Add">
                                <AddIcon className="addbtn" />
                            </Tooltip>
                        </Button> : <Button onClick={editItem}>
                                    <Tooltip title="Update">
                                        <EditIcon className="updatebtn"/>
                                    </Tooltip>
                                </Button>
                        }
                        
                    </div>

                    <div className="showItems">
                        {
                            items.map((elem) =>{
                                return(
                                    <div className="eachItem" key={elem.id}>
                                    <h3>{elem.name}</h3>
                                    <Button onClick={() => editItem(elem.id)}>
                                    <Tooltip title="Edit">
                                        <EditIcon className="editbtn"/>
                                    </Tooltip>
                                </Button>
                                <Button onClick={() => deleteItem(elem.id)}>
                                    <Tooltip title="Delete">
                                        <DeleteIcon className="dltbtn"/>
                                    </Tooltip>
                                </Button>
                        </div>
                                )
                            })
                        }
                        
                    </div>

                    <div className="btns">
                        <button className="btn" data-sm-link="Remove All" onClick={removeAll}><span> CHECK LIST</span></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Todo;