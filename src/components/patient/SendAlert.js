import React, { Component, useEffect, useState } from "react"
import axios from "axios"
import { Button, Card, Col, Row, Form } from "react-bootstrap"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useParams, Navigate } from "react-router-dom"
const { gql, useQuery, useMutation } = require("@apollo/client")

const CREATE_SEND_Alert = gql`
    mutation CreateAndSendAlert(
        $description: String!
        $patientId: String!
    ) {
        createAndSendAlert(
            description: $description
            patientId: $patientId
        ){
            id
        }

    }
`

function SendAlert(){

    const patientId = localStorage.getItem("userId")
	console.log("Patinet Id:" + patientId);

    const [alert, setAlert] = useState({
		description: ""
	})
    const token = useSelector((state) => state.auth.value.token)

	const navigate = useNavigate()

    const [
		createAndSendAlert,
		{
			data: Data,
			loading: Loading,
			error: Error
		}
	] = useMutation(CREATE_SEND_Alert, {
        onCompleted: () => {
			console.log("Alert Sent:"+ patientId);
			navigate("/home")
		}
	})

    const onInputChange = (e) => {
        setAlert({ ...alert, [e.target.name]: e.target.value })
    }
	
	const handleCreateAlert = async (e) => {
		e.preventDefault()
		
		createAndSendAlert({
			variables: {
				description: alert.description,
				patientId:patientId
			}
		})

        console.log("Alert " + alert.description);
        
	}
    return(
        <>
			<br></br><br></br>

            <br></br><br></br>
			<div className="admin-div-css">
			<Form onSubmit={(e) => handleCreateAlert(e)}>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Alert</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter description"
						name="description"
						value={alert.description}
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


export default SendAlert