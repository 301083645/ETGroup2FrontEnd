import { useQuery, gql } from "@apollo/client"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import React, { useEffect, useState } from "react"
import { Button, Card, Col, Row, Table } from "react-bootstrap"
import { useSelector } from "react-redux"
import { useParams, Navigate } from "react-router-dom"


const GET_Alerts = gql`
	query Patient($id: String!) {
        patientVitalSign(id: $id){
            id
            alerts {
                description
            }
        }
    }
`

function CheckAlert(){
    const [alerts, setAlerts] = useState([])

    const {patientId} = useParams()
    const id = patientId;

    console.log("Alert - patientId:" + id);
	
    const { loading, error, data: alertsData, refetch } = useQuery(GET_Alerts, {
		variables: { id },
		fetchPolicy: "network-only",
		onCompleted: () => {
            console.log("===============success================")
            console.log(alertsData)
			setAlerts(alertsData.patientVitalSign.alerts)
			
		}
	})


	return(
		<div>
			<br></br><br></br>
			
			{alerts.length !== 0 && (
				<Table striped bordered hover variant="dark">
					<thead>
						<tr>
							<th>Alert</th>
							
						</tr>
					</thead>
					<tbody>
						{alerts.map((alerts) => (
							<tr>
								<td>{alerts.description}</td>
		
							</tr>
						))}
					</tbody>
				</Table>
			)}
			
		</div>
	)
}

export default CheckAlert
