import {React, useState, useEffect, useDebugValue, useDeferredValue} from 'react';

const BSTAdmin = () => {

    /*
    example JSON for the table:
    */
    const exampleJSON = [
        {
            "Establishment": "Establishment 1",
            "Address": "Address 1",
            "Phone": "Phone 1",
            "Current Vacancies": "Current Vacancies 1",
            exampleHREF: "https://www.google.com",
            homeID: "homeID1"
        },
        {
            "Establishment": "Establishment 2",
            "Address": "Address 2",
            "Phone": "Phone 2",
            "Current Vacancies": "Current Vacancies 2",
            exampleHREF: "https://www.google.com",
            homeID: "homeID2"
        }
    ];

    useEffect(() => {
        // Add event listener to adminSearchHomes
        let userInputted;
        document.getElementById("adminSearchHomes").addEventListener("keyup", (event) => {
            userInputted = event.target.value;
            let establishments = document.querySelectorAll("td:nth-child(1)");
            for (let i = 0; i < establishments.length; i++) {
                if (establishments[i].innerText.toLowerCase().includes(userInputted.toLowerCase())) {
                    establishments[i].parentElement.style.display = "table-row";
                }
                else {
                    establishments[i].parentElement.style.display = "none";
                }
            }

        });

        // Add event listener to each pst-button which takes them to the PST page with the homeID
        let pstButtons = document.querySelectorAll(".pst-button");
        for (let i = 0; i < pstButtons.length; i++) {
            pstButtons[i].addEventListener("click", (event) => {
                let homeID = exampleJSON[i].homeID;
                window.location.href = "/pst/" + homeID;
            }
            );
        }

    }, []);

    return (
        <div>
            <div className="container">

                <div className="row mt-3 mb-3">
                    <div className="col">
                        <button type="button" className="btn btn-warning">Export to Excel</button>
                    </div>
                    <div className="col">
                        {/* Bootstrap search */}
                        <div className="input-group">
                            <input type="text" id="adminSearchHomes" className="form-control" placeholder="Search" aria-label="Search" aria-describedby="button-addon2" />
                        </div>
                    </div>
                </div>

                {/* Bootstrap table with 4 cols - Establishment, Address, Phone, Current Vacancies */}
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">
                                Establishment
                            </th>
                            <th scope="col">Address</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Current Vacancies</th>
                        </tr>
                    </thead>
                    <tbody>
                        {exampleJSON.map((record, index) => (
                            <tr key={index}>

                                <td>
                                    <a href={ record.exampleHREF }>{record.Establishment}</a>
                                    <br />
                                    <button type="button" className="btn btn-primary btn-sm mt-2 pst-button">PST</button>
                                </td>
                                <td>{record.Address}</td>
                                <td>{record.Phone}</td>
                                <td>{record["Current Vacancies"]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default BSTAdmin;