import { useQuery, gql } from "@apollo/client"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import React, { useEffect, useState } from "react"
import { Button, Card, Col, Row, Table } from "react-bootstrap"
import { useSelector } from "react-redux"
import { useParams, Navigate } from "react-router-dom"

const GET_Messages = gql`
	query Patient($id: String!) {
        patient(id: $id){
            id
            messages {
                description
            }
        }
    }
`

function CheckMessages(){
    const [messages, setMessages] = useState([])

    //const userId = useSelector((state) => state.auth.value.userId)
	const id = localStorage.getItem("userId")

    console.log("Message - patientId:" + id);
	
    const { loading, error, data: messagesData, refetch } = useQuery(GET_Messages, {
		variables: { id },
		fetchPolicy: "network-only",
		onCompleted: () => {
            console.log("===============success================")
            console.log(messagesData)
			setMessages(messagesData.patient.messages)
		}
	})


	return (
		<div>
			<br></br><br></br>
			
			{messages.length !== 0 && (
				<Table striped bordered hover variant="primary">
					<thead>
						<tr>
							<th>Daily Tips</th>
							
						</tr>
					</thead>
					<tbody>
						{messages.map((messages) => (
							<tr>
								<td>{messages.description}</td>
		
							</tr>
						))}
					</tbody>
				</Table>
			)}
			
		</div>
	)
}

export default CheckMessages
