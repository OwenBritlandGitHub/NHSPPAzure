import BSTCarousel from './BSTCarousel';
import BSTNav from './BSTNav';
import BSTFooter from './BSTFooter';
import Button from 'react-bootstrap/Button';
import { React, useState, useEffect } from 'react';
import BSTSpaces  from './BSTSpaces';
import {nanoid} from 'nanoid';
// Import swal
import Swal from 'sweetalert2';
let carehomeDataCollection = [];
let cqcCategories = [];

const BSTHomepageContainer = () => {
    const [testData, setTestData] = useState([]);
    const [selectedHomeIndex, setSelectedHomeIndex] = useState(0);
    const [guid, setGuid] = useState("");
    const [carehomeData, setCarehomeData] = useState([]);
    const [loading, setLoading] = useState(true);
    
    
    const buttonClicked = async () => {
                // Take data, and put all the information into a JSON object under "ResidentialPlaces"
        // Then send it to the server
    
        // Get all the rows in the table
        let table = document.getElementsByName("BSTTableRow");
        // For every row
        let jsonDataArray = [];

        for (var i = 0; i < table.length; i++)
        {
            const gender = table[i].getElementsByTagName("select")[0].value;
            const bedType = table[i].getElementsByTagName("select")[1].value;
            const catValues = Array.from(table[i].querySelectorAll("input[type=checkbox]:checked")).map(cb => cb.value);
            const sharedRoom = table[i].getElementsByTagName("select")[2].value;
            const spotPurchaseBed = table[i].getElementsByTagName("select")[3].value;
            const blockBookedBed = table[i].getElementsByTagName("select")[4].value;
            const upDown = table[i].getElementsByTagName("select")[5].value;
            // Add all the variables into an array
            const allJSON = {
                Gender: gender,
                BedType: bedType,
                Cat: catValues,
                SharedRoom: sharedRoom,
                SpotPurchaseBed: spotPurchaseBed,
                BlockBookedBed: blockBookedBed,
                UpDown: upDown

            }
            jsonDataArray.push(allJSON);

    }

        
        let temp = {
            "ResidentialPlaces": jsonDataArray
        }
        console.log(temp);
        console.log("===");
        // Fetch request to post data to /api/updateresidentialplaces
        await fetch('/api/updateresidentialplaces', {
            method: "POST",
            body: JSON.stringify(temp)
          }

          )

          let inputBoxValues = [];
          let checkedValues = [];
          // BSTCarouselContainer
          let BSTCarouselContainer = document.getElementById("BSTCarouselContainer");
          let inputBoxes = BSTCarouselContainer.getElementsByClassName("form-control");
          let checkboxes = BSTCarouselContainer.getElementsByClassName("form-check-input");
          let checkboxLabels = BSTCarouselContainer.getElementsByClassName("form-check-label");
    
          for (var i = 0; i < inputBoxes.length; i++) {
            inputBoxValues.push(document.getElementById("BSTInput" + i).value);
          }
    
          for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked === true) {
              checkedValues.push(checkboxLabels[i].textContent);
            }
          }
    
          //everything past CQCcategories is default data as there is no ability to edit them yet
     //  maxSpaces is the ID of the input box for max spaces
     let maxSpaces = document.getElementById("maxSpaces").value;
          const uploadJSON = {
            "GUID": guid,
            "Title": inputBoxValues[0],
            "HomeDescription": inputBoxValues[1],
            "Address": inputBoxValues[2],
            "Phone": inputBoxValues[3],
            "Email": inputBoxValues[4],
            "RegisteredManagerName": inputBoxValues[5],
            "DeputyManagerName": inputBoxValues[6],
            "ClinicalLeadName": inputBoxValues[7],
            "CQCCategories": checkedValues,
            "TopUpFee": true,
            "Notes": "",
            "AccountStatus": "Active",
            "Fee": 1500,
            "Maximum_Occupancy": maxSpaces,
            "CqcNumber": null,
            "CqcScore": "Requires Improvement",
            "CqcLink": "https://www.sundownsolutions.co.uk/en/index.aspx",
            "GDPRTicked": true,
            "GDPRDate": "2019-07-15T23:00:00Z",
            "Modified": "2019-10-01T14:56:07Z",
            "Created": "2016-10-04T07:59:08Z",
            "VersionString": "32.0"
          };
    
          await fetch('/api/updatedetails', {
            method: "POST",
            body: JSON.stringify(uploadJSON)
          }).then(
            Swal.fire({
              title: 'Success!',
              text: 'Your updates have been submitted',
              icon: 'success',
              confirmButtonText: 'OK'
            }));
   
    }
    useEffect(() => { 
        const fetchData = async () => { 
            await fetch('/api/BSTBeds').then(
                (response) => response.json()).then((jsonData) => { 
                    let temp = [];
                    for (var i = 0; i < jsonData.ResidentialPlaces.length; i++)
                    {
                        console.log(jsonData.ResidentialPlaces[i]);
                        temp.push(jsonData.ResidentialPlaces[i]);
                    }
                    setTestData(temp);
                }
            );
        }
        fetchData();
    }, []);

    const setCarehomeIndex = async (index) => {
      setSelectedHomeIndex(index);
      setCarehomeData(carehomeDataCollection[index]);
    }

    const handleSelect = (option) => {
      let index = carehomeDataCollection.findIndex(function(item) {
        return item[1] === option.target.value;
      });
      setCarehomeIndex(index);
    }
    
    //get carehomedetails
    useEffect(() => {
      const fetchData = async () => {
        await fetch('/api/homedetails').then((response) => response.json()).then((actualData) => {
          let temp = [];
          for(var i=0; i < actualData.length; i++) {
            Object.keys(actualData[i]).forEach(function(key) {
              temp.push(actualData[i][key]);
            })
            carehomeDataCollection.push(temp);
            cqcCategories.push(temp[9]);
            temp = [];
          }
          setCarehomeIndex(0);
          setLoading(false);
          })
          .catch((err) => {
            console.log(err.message);
          });
      }
      fetchData();
    }, []);

    const saveData = async () => {
     console.log("Save button pressed");
    }

    if (loading) {
      <div>
            <BSTNav />
            <BSTFooter />
        </div>
    } else {
      return (
        <div>
            <BSTNav />
            <div id="BSTCarouselContainer">
              <div className="form-group row">
                  <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Carehome: </label>
                  <div className="col-sm-10">
                    <select id={"CarehomeSelector"} onChange={handleSelect}>
                      {carehomeDataCollection.map((item, key) => {
                        return (
                          <option value={item[1]}>{item[1]}</option>
                          )
                      })}
                    </select>
                  </div>
              </div>
              <BSTCarousel setTestData = { setTestData } testData={ testData } guid = { guid } setGuid = { setGuid } carehomeData = {carehomeData} saveData = {saveData} cqcCategories={cqcCategories[selectedHomeIndex]}/>
            </div>
            <div id="SpacesContainer">
              <BSTSpaces />
            </div>
            <div className="m-3">
                <Button variant="primary" onClick={buttonClicked}>Save Details</Button>
            </div>
            <BSTFooter />
        </div>
    )
    }
    

}

export default BSTHomepageContainer