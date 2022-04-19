import { useQuery, gql } from "@apollo/client"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import React, { useEffect, useState } from "react"
import { Button, Card, Col, Row, Table } from "react-bootstrap"
import { useSelector } from "react-redux"
import { useParams, Navigate } from "react-router-dom"

const GET_History = gql`
	query Patient($id: String!) {
        patientVitalSign(id: $id){
            id
            vitalSigns {
                bodyTemp
                heartRate
                bloodPressure
                respiratoryRate
            }
        }
    }
`

function History() {
    const [vitalSigns, setVitalsigns] = useState([])
    const {patientId} = useParams()
    const id = patientId;
    console.log("History - patientId:" + id);
	
    const { loading, error, data: vitalsignsData, refetch } = useQuery(GET_History, {
		variables: { id },
		fetchPolicy: "network-only",
		onCompleted: () => {
            console.log("===============success================")
            console.log(vitalsignsData)
			setVitalsigns(vitalsignsData.patientVitalSign.vitalSigns)
		}
	})


	return (
		<div>
			<br></br><br></br>
			
			{vitalSigns.length !== 0 && (
				<Table striped bordered hover variant="dark">
					<thead>
						<tr>
							<th>Body Temperature</th>
							<th>Heart Rate</th>
							<th>Blood Pressure</th>
							<th>Respiratory Rate</th>
						</tr>
					</thead>
					<tbody>
						{vitalSigns.map((vitalSigns) => (
							<tr>
								<td>{vitalSigns.bodyTemp}</td>
								<td>{vitalSigns.heartRate}</td>
								<td>{vitalSigns.bloodPressure}</td>
								<td>{vitalSigns.respiratoryRate}</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
			
		</div>
	)
}

export default History

