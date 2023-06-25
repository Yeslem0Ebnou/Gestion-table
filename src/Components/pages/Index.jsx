import React from "react";
import Table from "../Table/Table";
// import data from "../../data/data.json"
import FormFields from "../Forms/FormFields";

export default function Index() {

    const [data, setData] = React.useState([])
    const [headers, setHeaders] = React.useState([])
    const [isOpenForm, setIsOpenForm] = React.useState(false)
    const [alertOps, setAlertOps] = React.useState(false)

    const getLastId = () => { // Last Id from Data
        if(data.length === 0)
            return null;
        
        const lastId = data.reduce((maxId, item) => {
            return Math.max(maxId, item.id);
        },0);

        return lastId;
    }

    const lastId = getLastId();
    React.useEffect(() => { // Get Data of users in database
        fetch("http://localhost:3001/mydata")
        .then(response => response.json())
        .then(data => setData(data))
    }, []);
    React.useEffect(() => { // Get Headers of Data
        fetch("http://localhost:3001/headers")
        .then(response => response.json())
        .then(data => setHeaders(data))
    }, [])
    const toggleBtn = () => { // Toggle Button for Open and Close Form
        setIsOpenForm(!isOpenForm);
    }
    const onSubmitWithSucess = (value) => {
        setData([...data, value])
        setAlertOps(!alertOps)
    }
    const onDeleteElement = (id) => {
        fetch(`http://localhost:3001/mydata/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                alert('Element deleted successfully');
                const filteredCondition = (element) => element.id !== id;
                const filteredElements = data.filter(filteredCondition);
                setData(filteredElements);
            } else {
                alert('Failed to delete element');
            }
        })
        .catch(error => {
            alert(`Error occured while deleting element: ${error}`);
        })
    }
    

    return (
        <>
        <div className="container">
            <h1>Index page</h1>
            {alertOps && <div className="alert alert-success text-center">
                <button className="close float-right" onClick={()=>setAlertOps(!alertOps)}>&times;</button>
                <span>Add is completed with sucess !</span>
            </div>}
            {isOpenForm || <button className="btn close float-right m-1 p-1" onClick={toggleBtn}>+</button>}
            {isOpenForm && <div className="container shadow p-2 rounded">
                <button className="btn close float-right mb-2" onClick={toggleBtn}>&times;</button>
                <FormFields id={lastId+1} onSubmitWithSucess={onSubmitWithSucess} />
            </div>}
            <Table headers={headers} data={data} onDeleteElement={onDeleteElement} />
        </div>
        </>
    );
}