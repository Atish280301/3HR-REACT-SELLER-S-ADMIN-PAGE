import React, { useEffect, useState } from 'react';
import './PageONE.css';
const PageONE = () => {
    //take value from form
    const [NameObj, SetNameObj] = useState({id: "", price: "", name: ""});

    //Count Total Value 
    const [TotalValue, SetTotalValue] = useState(0);

    //Store Data From LocalStorage In State
    const [localStorageData, SetLocalStorageData] = useState([]);
    useEffect(()=>{
        const DataFromLocalStorage = [];
        let Total = 0;
        for(let i = 0; i < localStorage.length; i++){
            const key = localStorage.key(i);
            const value = JSON.parse(localStorage.getItem(key));

            Total += parseInt(value.price);

            DataFromLocalStorage.push(value);
        }
        SetTotalValue(Total);
        SetLocalStorageData(DataFromLocalStorage)
    },[])

    //take value from form
    const TakeForm = (event) => {
        SetNameObj((prev) => ({...prev, [event.target.name] : event.target.value}));
    }

    //When You Click On Submit It Will Show In LocalStorage & OutputUI
    const SubmitForm = (event) => {
        event.preventDefault();
        const price = parseInt(NameObj.price);
        localStorage.setItem(`${NameObj.id}`,JSON.stringify(NameObj));
        SetLocalStorageData([...localStorageData, NameObj]);
        SetTotalValue((prev) => prev + price);
        SetNameObj({id: "", price: "", name: ""})
    }

    //Delete Item From LI & LocalStorage
    const DeleteItem = (id, price) =>{
        const updateData = localStorageData.filter((item) => item.id !== id);
        SetTotalValue((prev) => prev - price)
        SetLocalStorageData(updateData);
        localStorage.removeItem(id);
    }

    return(
        <>
            <div className='Total-Box'>
                <h3>Total Value Is : {TotalValue}</h3>
            </div>
            <div className='Form-Box'>
                <div>
                    <label className='lbl'>Product ID : </label>
                    <input 
                        type="text" 
                        name = "id"
                        placeholder='Product ID' 
                        onChange={TakeForm} 
                        value =  {NameObj.id}
                    />
                </div>
                <div>
                    <label className='lbl'>Product Price : </label>
                    <input 
                        type="text" 
                        name = "price"
                        placeholder='Price' 
                        onChange={TakeForm} 
                        value =  {NameObj.price}
                    />
                </div>
                <div>
                    <label className='lbl'>Product Name : </label>
                    <input 
                        type="text" 
                        name = "name"
                        placeholder='Product Name' 
                        onChange={TakeForm} 
                        value =  {NameObj.name}
                    />
                </div>
            </div>
            <div className='Button-Box'>
                <button className='btn' onClick={SubmitForm}>Submit</button>
            </div>
            <div className='List-Box'>
                <div className='UL'>
                    {localStorageData.map((item, index)=>(
                        <div key={index} className='LI'>
                            <p>{item.id}</p>
                            <p>{item.name}</p>
                            <p>{item.price}</p>
                            <button className='DLT' onClick={()=>DeleteItem(item.id, parseInt(item.price))}>Delete</button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
export default PageONE;