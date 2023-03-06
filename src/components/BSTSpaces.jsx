import './css/BSTSpaces.css';
import { useEffect, useState } from 'react';
const BSTSpaces = ({setTestData, testData}) => {
    const [vacantSpaces, setVacantSpaces] = useState(0);
    const updateResidentialSpaces = () => {
        // Get the value of the input box
        const maxSpaces = event.target.value;
        // Get all  clases residential-row
        const residentialRows = document.querySelectorAll(".residential-row");
        // Log the number of residential rows
        console.log(residentialRows.length);

        // Set the value of the input for residential places vacant to the value of the input box for maximum possible spaces 
        document.getElementById("residentialPlacesVacant").value = maxSpaces - residentialRows.length;

    }

    // Add event listener to the maximum possible spaces input box
    const maximumSpacesChanged = (event) => {
        updateResidentialSpaces();
    }
    
    // When the component loads, update the residential places vacant
    useEffect(() => {
        // Get the home details 
        fetch('/api/homedetails')
        .then(response => response.json())
        .then(data => {
// Get the JSON value Maximum_Occupancy
console.log(data, "data");
            const maxSpaces = data.Maximum_Occupancy;
            // Set the value of the input box for maximum possible spaces to the value of Maximum_Occupancy
            document.getElementById("maxSpaces").value = maxSpaces;


        });
        updateResidentialSpaces();
    }, []);



    return (
        <div className = "col-xl-5 col-sm-12">
            <h1>Total Beds</h1>
            <div className="form-group">
                <label htmlFor="maxSpaces">Maximum Possible Spaces</label>
                <input type="number" className="form-control" id="maxSpaces" placeholder="Maximum Possible Spaces" onChange={ maximumSpacesChanged }/>
                <label htmlFor="residentialPlacesVacant">Total Residential Places Vacant</label>
                <input type="number" className="form-control" id="residentialPlacesVacant" placeholder="Total Residential Places Vacant" disabled />
                <label htmlFor="nursingPlacesVacant">Total Nursing Places Vacant</label>
                <input type="number" className="form-control" id="nursingPlacesVacant" placeholder="Total Nursing Places Vacant" disabled />
                <label htmlFor="totalPlacesVacant">Total Places Vacant</label>
                <input type="number" className="form-control" id="totalPlacesVacant" placeholder="Total Places Vacant" disabled />
            </div>

        </div>

    )

}

export default BSTSpaces;
