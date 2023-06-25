import { Fragment } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

interface Tabelprops {
    headers? : string[];
    data? : dataprops[];
    onDeleteElement?: (value: number) => void;
}
interface dataprops {
    id? : number;
    name? : string;
    title? : string;
    date? : string;
}

export default function Table( {headers, data, onDeleteElement}:Tabelprops ) {
    
    return (
        <Fragment>
            <table className="table table-striped table-sm">
                <thead>
                    <tr>
                        {headers?.map((header, key)=> <th key={key}>{header}</th> )}
                    </tr>
                </thead>
                <tbody>
                    {data?.map((element) => 
                        <tr key={element.id}>
                            <td> {element.name} </td>
                            <td> {element.title} </td>
                            <td> {element.date} </td>
                            <td className="">
                                <button className="btn btn-danger" onClick={() => onDeleteElement &&  onDeleteElement(element.id ?? -1)} ><FontAwesomeIcon icon={faTrash}/></button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </Fragment>
    );
}