import { useQuery, gql } from "@apollo/client"
import axios from "axios"
import { Navigate, useNavigate } from "react-router-dom"
import React, { useEffect, useState } from "react"
import { Button, Card, Col, Row } from "react-bootstrap"
import { useSelector } from "react-redux"

const GET_ALL_Patients = gql`
	{
		patients {
			id
			firstName
			lastName
			patientNumber
			email
			address
			city
		}
	}
`

function ListAllPatients() {
	const [patients, setPatients] = useState([])
	const token = useSelector((state) => state.auth.value.token)
	const {
		loading: loadingPatients,
		error: errorPatients,
		data: dataPatients
	} = useQuery(GET_ALL_Patients, {
		fetchPolicy: "network-only",
		onCompleted: () => {
			setPatients(dataPatients.patients)
		}
	})

	const navigate = useNavigate()
	const handleVitalSign = (e) => {
		e.preventDefault()
		const patientId = e.target.value
		console.log(patientId)
		navigate(`/nurse/addVitalSign/${patientId}`)
	}

	const handleHistory = (e) => {
		e.preventDefault()
		const patientId = e.target.value
		console.log(patientId)
		navigate(`/nurse/history/${patientId}`)
	}

	const handleMessage = (e) => {
		e.preventDefault()
		const patientId = e.target.value
		console.log(patientId)
		navigate(`/nurse/message/${patientId}`)
	}

	const handleAlert = (e) => {
		e.preventDefault()
		const patientId = e.target.value
		console.log(patientId)
		navigate(`/nurse/alert/${patientId}`)
	}

	const handleSurvey = (e) => {
		e.preventDefault()
		const patientId = e.target.value
		console.log(patientId)
		navigate(`/nurse/sendsurvey/${patientId}`)
	}

	const handleSurvey2 = (e) => {
		e.preventDefault()
		const patientId = e.target.value
		console.log(patientId)
		navigate(`/nurse/checksurvey/${patientId}`)
	}

	return (
		<div>
			<br></br><br></br>
			<div className="admin-div-css">
			<h2 style={{color: "#1e4558", padding: "10px", fontWeight: "bold"}}>Patients List</h2>
			<Row xs={1} md={3} className="g-4">
				{patients.map((patient) => (
					<Col>
						<Card>
							<Card.Header as="h5">
								<b>Name:</b> {patient.firstName + " " + patient.lastName}
							</Card.Header>
							<Card.Body>
								<Card.Title><b>Patient Number:</b> {patient.patientNumber}</Card.Title>
								<br></br>
								<Card.Text><b>Email:</b> {patient.email}</Card.Text>
								<Card.Text>
								<b>Address:</b> {patient.address + " " + patient.city}
								</Card.Text>
							</Card.Body>
							<Button
										value={patient.id}
										variant="success"
										onClick={(e) => handleVitalSign(e)}
									>
										Add Vital Sign
							</Button>
							<Button
										value={patient.id}
										variant="primary"
										onClick={(e) => handleHistory(e)}
									>
										View History
							</Button>
							<Button
										value={patient.id}
										variant="secondary"
										onClick={(e) => handleMessage(e)}
									>
										Send Daily Tip
							</Button>

							<Button
										value={patient.id}
										variant="secondary"
										onClick={(e) => handleAlert(e)}
									>
										Check Alert
							</Button>

							<Button
										value={patient.id}
										variant="secondary"
										onClick={(e) => handleSurvey(e)}
									>
										Send Survey
							</Button>

							<Button
										value={patient.id}
										variant="secondary"
										onClick={(e) => handleSurvey2(e)}
									>
										Check Survey
							</Button>

						</Card>
					</Col>
				))}
			</Row>
			</div>
		</div>
	)
}

export default ListAllPatients
