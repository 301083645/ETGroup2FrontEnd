import React, { Component, useEffect, useState } from "react"
import axios from "axios"
import { Button, Card, Col, Row, Form } from "react-bootstrap"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useParams, Navigate } from "react-router-dom"
const { gql, useQuery, useMutation } = require("@apollo/client")

const CREATE_SEND_Message = gql`
    mutation CreateAndSendMessage(
        $description: String!
        $patientId: String!
    ) {
        createAndSendMessage(
            description: $description
            patientId: $patientId
        ){
            id
        }

    }
`

function SendMessage(){

    const {patientId} = useParams()

    const [message, setMessage] = useState({
		description: ""
	})
    const token = useSelector((state) => state.auth.value.token)

	const navigate = useNavigate()

	const [
		createAndSendMessage,
		{
			data: createAndSendMessageData,
			loading: createAndSendMessageLoading,
			error: createAndSendMessageError
		}
	] = useMutation(CREATE_SEND_Message, {
        onCompleted: () => {
			navigate("/nurse/patients")
		}
	})

    const onInputChange = (e) => {
        setMessage({ ...message, [e.target.name]: e.target.value })
    }
	
	const handleCreateMessage = async (e) => {
		e.preventDefault()
		
		createAndSendMessage({
			variables: {
				description: message.description,
				patientId:patientId
			}
		})

        console.log("message " + message.description);
        
	}
    
    return(
        <>
			<br></br><br></br>
			

            <br></br><br></br>
			<div className="admin-div-css">
			<Form onSubmit={(e) => handleCreateMessage(e)}>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Message</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter description"
						name="description"
						value={message.description}
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


export default SendMessage