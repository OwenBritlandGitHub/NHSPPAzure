import { React, useState, useEffect } from 'react';
import BSTTableRow from './BSTTableRow.jsx'
import './css/BSTTable.css';
import {nanoid} from 'nanoid';


const BSTTable = ({ testData, setTestData }) => {
    
      const removeSpaces = (toRemove) => {
        const newTestData = [...testData];
        for(var i = 0; i < toRemove.length; i++)
        {
            newTestData.splice(toRemove[i], 1);
        }
        setTestData(newTestData);
      };

    const addRow = () => {
        let newRow = {
            "Gender": "Choose",
            "BedType": "Choose",
            "Cat": [],
            "SharedRoom": "Choose",
            "SpotPurchaseBed": "No",
            "BlockBookedBed": "No",
            "UpDown": "Choose"
        }
        setTestData([...testData, newRow]);
    }

    const delRow = () => {
        let toRemove = [];
        let table = document.getElementsByName("BSTTableRow");
        for (var i = 0; i < table.length; i++)
        {
            if(table[i].firstChild.firstChild.checked)
            {
                console.log("YES");
                toRemove.push(i);
            }
        }
        
        // Order the indexes in descending order
        
        toRemove.sort(function(a, b){return b-a});
        removeSpaces(toRemove);
    }

 
    return (
        <div id="BSTTableWrapper">
            

            <div id="BSTTableControls">
                <button id="BSTTableCreate" type="button" onClick={() => addRow(testData)}>Add New</button>
                <button id="BSTTableDelete" type="button" onClick={() => delRow()}>Delete</button>
            </div>
            <table id="BSTTableBody">
                <thead>
                    <tr id="tableHeadID">
                        <th></th>
                        <th>Gender</th>
                        <th>Bed Type</th>
                        <th>Categories <br/>(See Help)</th>
                        <th>Shared Room</th>
                        <th>Spot</th>
                        <th>Block</th>
                        <th>Up/Down</th>
                    </tr>
                </thead>
                <tbody id="BSTTableAllRows">
                    {testData.map((record, index) =><BSTTableRow record={record} key={nanoid()}/>)}
                </tbody>
            </table>
        </div>
    )
}
export default BSTTable;