import {
  React,
  useState,
  useEffect
} from 'react';
import Carousel from 'react-bootstrap/Carousel';
import BSTTable from './BSTTable';
import {
  Row
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './css/BSTCarousel.css';
import $ from 'jquery';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';


const BSTCarousel = ({
    setTestData,
    testData,
    guid,
    setGuid,
    carehomeData,
    saveData,
    cqcCategories
  }) => {
    var checkboxCount = 0;
    let cqcStack = cqcCategories;
    const checkboxItems = ["Care With Nursing", "Care for Adults Over 65", "Under 65's", "Residential", "Mental Health Conditions", "Dementia", "Learning Disabilities", "EMI", "Physical Disabilities", "Sensory Impairments", "Discharge to Assess"];
    const inputItems = [
      ["Name", "input", "Title"],
      ["Home Description", "textarea", "HomeDescription"],
      ["Address", "textarea", "Address"],
      ["Phone", "input", "Phone"],
      ["Email", "input", "Email"],
      ["Registered Manager Name", "input", "RegisteredManagerName"],
      ["Deputy Manager Name", "input", "DeputyManagerName"],
      ["Clinical Lead Name", "input", "ClinicalLeadName"],
    ]
    let toCheck = [];

    console.log(cqcStack);

    // Add an onclick event listener to showHelpButton
    const showHelp = () => {
      // If show, hide. If hide, show.
      $(".bst-help-container").toggleClass("hide");
    }

    const changeChecks = () => {
      // Loop through toCheck
      toCheck.forEach((value, index) => {
        // Get all checkboxes with the value of checkbox + index
        let checkbox = document.querySelectorAll(`input[value="checkbox${value}"]`);

        // Tick the checkbox
        checkbox[0].checked = true;
        // 
      });
    }

    const userDetailsClicked = async () => {
      const response = await fetch('/auth/me', {
        credentials: "same-origin",
        useCredentials: "same-origin"
      });
    }

    // After everything has rendered, call changeChecks
    useEffect(() => {
      changeChecks();
      let checkboxesToCheck = document.querySelectorAll(`input[value="checkedValue"]`);
      checkboxesToCheck.forEach((value, index) => {
        value.checked = true;
      })
    }, []);

    return (
      
        <div className="bst-carousel">
        <Carousel interval={null} controls={false} indicators={false}>
        <Carousel.Item>
          
          {/* Text input */}
          <div>
            <Row>
              {/* Bootstrap columns with 2/3 width and 1/3 width */}
                <h2>Home Details</h2>
              <div className="col-xl-5 col-sm-12">
                {/* Text input with label */}
                
                {/* for every item in inputItems, map a new bst-form-input with the second item of the item being the type of input 
                */}
                {inputItems.map((item, key) => {
                  let index = key +1;
                  if(item[1] === "textarea"){
                    return(
                      
                        <div className="bst-form-input" key={key}>
  
                          <div className="form-group row">
                            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">{item[0]}</label>
                              <div className="col-sm-10">
                                <textarea type="text" className="form-control" id={"BSTInput" + key} value={carehomeData[index]}/>
                              </div>
                          </div>
                        </div>
                    )
                  }
                  return (
                    <div className="bst-form-input" key={key}>
  
                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">{item[0]}</label>
                      <div className="col-sm-10">
                        <input type="text" className="form-control" id={"BSTInput" + key} value={carehomeData[index]}/>
                      </div>
                    </div>
                
                </div>
                  )
                
                })}
                <div className="bst-form-input checkbox-inputs">
                  Go through every checkbox item
                  {checkboxItems.map((item, key) => {
                    // If the details array is not empty and the cqcCategories array is not empty
                    if(carehomeData.length > 0 && cqcCategories.length > 0) {
                      // Checks if the item is in the cqcCategories array
                      if(cqcCategories.indexOf(item) > -1) {
  
                        let index = cqcCategories.indexOf(item);
                        cqcCategories.splice(index, 1);
                        // Add key to toCheck array
                        toCheck.push(key);
                        checkboxCount++;
                        return (
                          <div className="form-check" key={key}>
                              <input className="form-check-input" type="checkbox" value={"checkbox"+key} id={"checkbox"+checkboxCount}/>
                              <label className="form-check-label" htmlFor="flexCheckDefault" id={"checkboxLabel"+checkboxCount}>
                                {item}
                              </label>
                            </div>
                        )
                      }
                    }
                    
                    checkboxCount++;
                    return (
                      <div className="form-check" key={key}>
                          <input className="form-check-input" type="checkbox" value={"checkbox"+key} id={"checkbox"+checkboxCount}/>
                          <label className="form-check-label" htmlFor="flexCheckDefault" id={"checkboxLabel"+checkboxCount}>
                            {item}
                          </label>
                        </div>
                    )
                    
                  })}
                      
                  {cqcCategories.map((value, index) => {
                    checkboxCount++;
                    return(
                      <div className="form-check" index={index}>
                          <input className="form-check-input" type="checkbox" value={"checkedValue"} id={"checkbox"+checkboxCount}/>
                          <label className="form-check-label" htmlFor="flexCheckDefault" id={"checkboxLabel"+checkboxCount}>
                            {value}
                          </label>
                      </div>
                    )
                  })}
  
                  
                </div>
              </div>
              <div className="col-xl-7 col-sm-12">
                <a onClick={showHelp} href="javascript:;">Show Help</a>
                <div className="bst-help-container hide">
                  <ul>
                    <li>M/H - (mental health)</li>
                    <li>DE - (dementia)</li>
                    <li>LD - (learning difficulty)</li>
                    <li>PD - (physical difficulty)</li>
                    <li>SI - (sensory impairment)</li>
                  </ul>
                  <p>Spot purchase beds</p>
                  <ul>
                    <li>DTA (discharge to assess) beds</li>
                    <li>Odd spot purchase beds (usually for discharge to assess of DToC, delayed transfer of care)</li>
                    <li>DToC beds that they might
                    have commissioned via the acutes (some hospitals have bought beds within care homes)
                    </li>
                  </ul>
                </div>
                <br/>
                <Button variant="primary" onClick={saveData}>Save Details</Button>
                <Button variant="primary" onClick={userDetailsClicked}>Get User Details</Button>
  
              </div>
  
            </Row>
  
          </div>
  
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block carousel-image"
            src="https://images.unsplash.com/photo-1676599991259-ee336e714e36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
            alt="Second slide"
          />
  
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block carousel-image"
            src="https://images.unsplash.com/photo-1676576155040-f316def18b9a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
            alt="Third slide"
          />
  
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
        </div>
      )
    }
export default BSTCarousel;