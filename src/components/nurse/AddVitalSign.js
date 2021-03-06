import React, { Component, useEffect, useState } from "react"
import axios from "axios"
import { Button, Card, Col, Row, Form } from "react-bootstrap"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useParams, Navigate } from "react-router-dom"
const { gql, useQuery, useMutation } = require("@apollo/client")

const CREATE_ASSIGN_VitalSign = gql`
	mutation CreateAndAssignVitalSign(
		$bodyTemp: String!
		$heartRate: String!
		$bloodPressure: String!
		$respiratoryRate: String!
		$patientId: String!
	) {
		createAndAssignVitalSign(
			bodyTemp: $bodyTemp
			heartRate: $heartRate
			bloodPressure: $bloodPressure
			respiratoryRate: $respiratoryRate
			patientId: $patientId
		) {
			id
		}
	}
`
// const ASSIGN_VitalSign = gql`
// 	mutation AssignVitalSign($vitalSignId: String!,$patientId:String!) 
//     {
// 		assignVitalSign(vitalSignId: $vitalSignId,patientId:$patientId) {
// 			id
// 		}
// 	}
// `


function AddVitalSign(){

    const {patientId} = useParams()

    const [vitalSign, setVitalSign] = useState({
		bodyTemp: "",
		heartRate: "",
		bloodPressure: "",
		respiratoryRate: ""
	})
	const token = useSelector((state) => state.auth.value.token)

	const navigate = useNavigate()

	const [
		createAndAssignVitalSign,
		{
			data: createAndAssignVitalSignData,
			loading: createAndAssignVitalSignLoading,
			error: createAndAssignVitalSignError
		}
	] = useMutation(CREATE_ASSIGN_VitalSign, {
        onCompleted: () => {
			navigate("/nurse/patients")
		}
	})

    //  const [
	//  	assignVitalSign,
	//  	{
	//  		data: deleteVitalSignData,
	//  		loading: deleteVitalSignLoading,
	//  		error: deleteVitalSignError
	//  	}
	//  ] = useMutation(ASSIGN_VitalSign)

    

    const onInputChange = (e) => {
        setVitalSign({ ...vitalSign, [e.target.name]: e.target.value })
    }
	
	const handleCreateVitalSign = async (e) => {
		e.preventDefault()
        console.log('Check vital sign' +" "+ vitalSign.bloodPressure)
		
		createAndAssignVitalSign({
			variables: {
				bodyTemp: vitalSign.bodyTemp,
				heartRate: vitalSign.heartRate,
				bloodPressure: vitalSign.bloodPressure,
				respiratoryRate: vitalSign.respiratoryRate,
				patientId:patientId
			}
		})
        
    
        
	}

    return(
<>
			<br></br><br></br>

            <br></br><br></br>
			<div className="admin-div-css">
			<Form onSubmit={(e) => handleCreateVitalSign(e)}>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>bodyTemp</Form.Label>
					<Form.Control
						type="txt"
						placeholder="bodyTemp"
						name="bodyTemp"
						value={vitalSign.bodyTemp}
						onChange={(e) => onInputChange(e)}
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>heartRate</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter vitalSign"
						name="heartRate"
						value={vitalSign.heartRate}
						onChange={(e) => onInputChange(e)}
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>bloodPressure</Form.Label>
					<Form.Control
						type="text"
						placeholder="bloodPressure"
						name="bloodPressure"
						value={vitalSign.bloodPressure}
						onChange={(e) => onInputChange(e)}
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>respiratoryRate</Form.Label>
					<Form.Control
						type="semester"
						placeholder="Enter respiratoryRate"
						name="respiratoryRate"
						value={vitalSign.respiratoryRate}
						onChange={(e) => onInputChange(e)}
					/>
				</Form.Group>
				<Button variant="success" type="submit">
					Create
				</Button>
			</Form>
			</div>


		</>


    )

}

export default AddVitalSign