import React, { useContext } from 'react';
import {DataContext} from './datacontext';
const TableComponent =() => {
    // subscribe to DataContext and read provider values
    const dataContext = useContext(DataContext);
    // {{products, updateProduct}}
    // if the DataContext is complex object, then propeties 
    // from it will be read using the reflection and indexes
    const dataSource = dataContext[Object.keys(dataContext)[0]]; // products array
    const event = dataContext[Object.keys(dataContext)[1]]; // read the method

    const tableColumns = [];
    for(const p in dataSource[0]){
        tableColumns.push(p)
    }
    return (
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
                {
                    tableColumns.map((c,idx) => (
                        <th key={idx}>{c}</th>
                    ))
                }
            </tr>  
          </thead>
          <tbody>
          {
            dataSource.map((d,i)=> (
                <tr key={i} onClick={()=>event(d)}>
                {
                    tableColumns.map((c,idx) => (
                        <td key={idx}>{d[c]}</td>
                    ))
                }   
                </tr>
            ))
          }
          </tbody>
        </table>
    ); 

};

export default TableComponent;