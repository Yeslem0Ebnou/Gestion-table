import React from "react";
import InputField from "./InputField";
import axios from "axios";

interface IData {
    id?: number;
    name: string;
    title: string;
    date: string;
}
interface formFieldprops {
    id?: number;
    onSubmitWithSucess:(value: IData)=> void;
}

export default function FormFields({id, onSubmitWithSucess}: formFieldprops) {
    const [nameInput, setNameInput] = React.useState('');
    const [titleInput, setTitleInput] = React.useState('');
    const [dateInput, setDateInput] = React.useState('');
    const Id = id;


    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDateInput(e.target.value);
    }
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitleInput(e.target.value);
    }
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNameInput(event.target.value)
    }
    React.useEffect(() => {
        const currentDate = new Date().toISOString().split('T')[0];
        setDateInput(currentDate);
    },[])
    const onclick = async (e: React.FormEvent) => {
        e.preventDefault()
        if ( nameInput.length===0 || titleInput.length===0) 
            return ;
        // submiting in formation to db-server
        const newData: IData = {
            id: Id,
            name: nameInput,
            title: titleInput,
            date: dateInput
        }
        try {
            // Post newData
            const response = await axios.post<IData>(
                'http://localhost:3001/mydata',
                newData
            );
            if (response.data){
                onSubmitWithSucess(response.data);
                setNameInput('');
                setTitleInput('');
            }
        } catch(error) {
            console.log(error) // Handle any errors
        }
    }

    return (
        <>
            <form action="" className="container" onSubmit={onclick}>
                <div className="form-group">
                    <InputField placeholder="Name" value={nameInput} onChange={handleNameChange} />
                    {/* <span className="badge badge-info">Name value : {nameInput}</span> */}
                </div>
                <div className="form-group">
                    <InputField placeholder="Title" value={titleInput} onChange={handleTitleChange} />
                    {/* <span className="badge badge-info">Title value : {titleInput}</span> */}
                </div>
                <div className="form-group">
                    <InputField type="date" value={dateInput} onChange={handleDateChange} />
                    {/* <span className="bagde badge-info">Date : {dateInput}</span> */}
                </div>
                <div className="form-group">
                    <button className="btn btn-primary btn-block">Add</button>
                </div>
            </form>
        </>
    );
}