import {React, useState, useEffect} from 'react';
import './css/BSTTable.css';

const BSTTableRow = ({record}, {index}) => {
    // Once the component is loaded
    // useEffect(() => {
    //     // Select all the checkboxes with the class space-deletion-class
    //     const checkbox = document.querySelectorAll('.space-deletion-class');
    //     for (let i = 0; i < checkbox.length; i++) {
    //         checkbox[i].addEventListener('change', function() {
    //             if (this.checked) {
    //                 const parentDiv = this.parentNode.parentNode.parentNode;
    //                 parentDiv.parentNode.removeChild(parentDiv);
    //             }
    //         });
    //     }

    // }, []);
   
    
    return (
            <tr name="BSTTableRow" className="residential-row">
                    <td ><input type="checkbox" className="space-deletion-class"></input></td>

                    <td >
                        <select defaultValue={record.Gender}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Unisex">Unisex</option>
                            <option value="Choose">Choose...</option>
                        </select>
                    </td>
                    <td >
                        <select defaultValue={record.BedType}>
                            <option value="General">General</option>
                            <option value="EMD">EMD</option>
                            <option value="Respite">Respite</option>
                            <option value="Choose">Choose...</option>
                        </select>
                    </td>
                    <td >
                        <label>
                            <input type="checkbox" defaultChecked={record.Cat.indexOf("M/H")> -1} value="M/H" />
                            M/H
                        </label>
                        <label>
                            <input type="checkbox" defaultChecked={record.Cat.indexOf("DE")> -1} value="DE" />
                            DE
                        </label>
                        <label>
                            <input type="checkbox" defaultChecked={record.Cat.indexOf("LD")> -1} value="LD" />
                            LD
                        </label>
                        <label>
                            <input type="checkbox" defaultChecked={record.Cat.indexOf("PD")> -1} value="PD" />
                            PD
                        </label>
                        <label>
                            <input type="checkbox" defaultChecked={record.Cat.indexOf("SI")> -1} value="SI" />
                            SI
                        </label>
                    </td>
                    <td >
                        <select defaultValue={record.SharedRoom}>
                            <option value="Yes">No</option>
                            <option value="No">Yes</option>
                            <option value="Choose">Choose...</option>
                        </select>
                    </td>
                    <td >
                        <select defaultValue={record.SpotPurchaseBed}>
                            <option value="Yes">No</option>
                            <option value="No">Yes</option>
                        </select>
                    </td>
                    <td >
                        <select defaultValue={record.BlockBookedBed}>
                            <option value="Yes">No</option>
                            <option value="No">Yes</option>
                        </select>
                    </td>
                    <td>
                        <select defaultValue={record.UpDown}>
                            <option value="Upstairs">Upstairs</option>
                            <option value="Downstairs">Downstairs</option>
                            <option value="Choose">Choose...</option>
                        </select>
                    </td>
            </tr>
    )
};

export default BSTTableRow;

