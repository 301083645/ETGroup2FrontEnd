import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function AI() {
  const [base, setBase] = useState({cough:'', dyspnoea:'', sputum:'', chestpain:''});
  const [data, setData] = useState([[]]);
  const apiUrl = "http://localhost:1000/run/";
  const [diagnosis, setDiagnosis] = useState();

  const calculate = (e) => {
    e.preventDefault();
    const data2 = { dyspnoea: base.dyspnoea, cough: base.cough, chestpain: base.chestpain, sputum: base.sputum };
    console.log(data2);
        axios.post(apiUrl, data2)
        .then((result) => {
          console.log("result for Testing: " + result.data);
          console.log("result2:" + result.data[0][0])
          if(result.data[0][0] >= result.data[0][1] && result.data[0][0] >= result.data[0][2]){
            setDiagnosis("Cold");
            console.log("Dagnosis:" + result.data[0][0] );
          }else if(result.data[0][0] < result.data[0][1] && result.data[0][1] >= result.data[0][2]){
            setDiagnosis("Pneumonia");
            console.log("Dagnosis:" + result.data[0][1] );
          }else{setDiagnosis("Lung Cancer"); console.log("Dagnosis:" + result.data[0][2] );}
          setData(result.data);
        }).catch((error) => {
          console.log("Error in fetchData:", error)});
  };

const onChange = (e) => {
    e.persist();
    setBase({...base, [e.target.name]: e.target.value});
  }

  return (
<div>
<br></br>
<div>
<Form onSubmit={calculate}>
  <h1>Self Diagnosis Test</h1><br></br>
  <h4>Rate your degree of symptom from 1 to 5</h4><br></br>
  <Form.Group>
    <Form.Label> cough:</Form.Label>
    <Form.Select type="number" name="cough" id="cough" placeholder="Enter cough" value={base.cough} onChange={onChange}>
    <option>Please choose one</option>
    <option>1</option>
    <option>2</option>
    <option>3</option>
    <option>4</option>
    <option>5</option>
    </Form.Select> 
  </Form.Group>

  <Form.Group>
    <Form.Label> dyspnoea:</Form.Label>
    <Form.Select type="number" name="dyspnoea" id="dyspnoea" placeholder="Enter dyspnoea" value={base.dyspnoea} onChange={onChange}>
    <option>Please choose one</option>
    <option>1</option>
    <option>2</option>
    <option>3</option>
    <option>4</option>
    <option>5</option>
    </Form.Select> 
  </Form.Group>

  <Form.Group>
    <Form.Label> sputum:</Form.Label>
    <Form.Select type="number" name="sputum" id="sputum" placeholder="Enter sputum" value={base.sputum} onChange={onChange} >
    <option>Please choose one</option>
    <option>1</option>
    <option>2</option>
    <option>3</option>
    <option>4</option>
    <option>5</option>
    </Form.Select> 
  </Form.Group>

  <Form.Group>
    <Form.Label> chestpain:</Form.Label>
    <Form.Select type="number" name="chestpain" id="chestpain" placeholder="Enter chestpain" value={base.chestpain} onChange={onChange} >
    <option>Please choose one</option>
    <option>1</option>
    <option>2</option>
    <option>3</option>
    <option>4</option>
    <option>5</option>
    </Form.Select> 
  </Form.Group>
    <br></br>
  <Button variant="primary" type="submit">
    Calculate
  </Button>
</Form>
</div>  
<br></br><br></br>
      
<div style={{paddingTop: "20px", paddingBottom: "40px"}}>

    <h1 style={{color: "red", paddingBottom: "30px"}}>Your possible disease: <b>{diagnosis}</b> </h1>
    
    <h2>Detailed Information</h2>
    <h3>The values for diagnosis will be:</h3>
    <li>cold: 1,0,0</li> 
    <li>pneumonia: 0,1,0</li>
    <li>lungCancer: 0,0,1 </li> 
    <br></br>
    <h3>Test Result</h3>
    {
        data[0].map((value, index) => (
            <p key={index}> {index+1}. &nbsp;&nbsp; {value}</p>
          ))
    }
    <h4>The higher the number, the higher the likelihood of the disease.</h4>

    
    </div>

</div>
    

  );
}
//
export default AI;
