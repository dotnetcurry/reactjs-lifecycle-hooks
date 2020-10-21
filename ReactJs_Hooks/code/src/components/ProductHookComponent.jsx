import React, {useState, useEffect} from 'react'
import TableComponent from './TableComponent';
import {DataContext} from './datacontext';
import {HttpService} from './../services/httpservice';

const ProductHookComponent=()=>{
    const service = new HttpService();
    const categories =['Electronics', 'Electrical', 'Food'];
    const manufacturers = ['MSIT', 'TSFOODS', 'LS-Electrical'];
    const [product, updateProduct] = useState({ProductRowId:0, ProductId:'', 
                                               ProductName: '', CategoryName:'',
                                               Manufacturer:'', Description:'', BasePrice:0});
    const [products, updateProducts] = useState([]);

    const clear=()=>(
        updateProduct({ProductRowId:0, ProductId:'', 
        ProductName: '', CategoryName:'',
        Manufacturer:'', Description:'', BasePrice:0})
    );
        useEffect(()=>{
            service.getData()
            .then(response=>{
                updateProducts(response.data);
            })
            .catch(error=>{
                console.log(`Error Occured ${error}`);
            }); 
             
        },[]);

    const save=()=>{
        service.postData(product).then(response=>{
            updateProduct(response.data);
            updateProducts([...products, response.data]);
        })
        .catch(error=>{
            console.log(`Error Occured ${error}`);
        }); 
    }
    return (
        <div className="container">
            <table className="table table-bordered table-striped">
                <tbody>
                    <tr>
                        <td>
                            <div className="form-group">
                                <label>Product Row Id</label>
                                <input type="text" className="form-control" value={product.ProductRowId} readOnly/>
                            </div>
                            <div className="form-group">
                                <label>Product Id</label>
                                <input type="text" className="form-control" value={product.ProductId}
                                 onChange={(evt)=>{updateProduct({...product, ProductId:evt.target.value})}}/>
                            </div>
                            <div className="form-group">
                                <label>Product Name</label>
                                <input type="text" className="form-control" value={product.ProductName}
                                onChange={(evt)=>{updateProduct({...product, ProductName:evt.target.value})}}/>
                            </div>
                            <div className="form-group">
                                <label>Category Name</label>
                                
                                <select type="text" className="form-control" 
                                name="CategoryName" value={product.CategoryName}
                                onChange={(evt)=>{updateProduct({...product, CategoryName:evt.target.value})}}>
                                       <option>Select Category Name</option>
                                    {
                                       categories.map((v,i)=> (
                                        <option key={i} value={v}>{v}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Manufacturer</label>
                                <select type="text" className="form-control"
                                value={product.Manufacturer}
                                onChange={(evt)=>{
                                    updateProduct({...product, Manufacturer:evt.target.value});
                                }}
                                >
                                <option>Select Manufacturer</option>
                                    {
                                        
                                        manufacturers.map((v,i)=> (
                                        <option key={i} value={v}>{v}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <input type="text" className="form-control" value={product.Description}
                                onChange={(evt)=>{updateProduct({...product, Description:evt.target.value})}}/>
                            </div>
                            <div className="form-group">
                                <label>Base Price</label>
                                <input type="text" className="form-control" value={product.BasePrice}
                                 onChange={(evt)=>{updateProduct({...product, BasePrice:parseInt(evt.target.value)})}}/>
                            </div>
                            <div className="form-group">
                                <input type="button" value="Clear" className="btn btn-warning" onClick={clear}/>
                                <input type="button" value="Save" className="btn btn-success" onClick={save}/>
                            </div>
                    </td>
                    <td>
                        <h2>
                            List of Products
                        </h2>
                        <DataContext.Provider value={{products, updateProduct}}> 
                             <TableComponent></TableComponent>
                        </DataContext.Provider>
                    </td>
                    </tr>
                </tbody>
            </table>
        </div>       
    );
}

export default ProductHookComponent;