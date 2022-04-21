import { useQuery, gql } from "@apollo/client"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import React, { useEffect, useState } from "react"
import { Button, Card, Col, Row, Table } from "react-bootstrap"
import { useSelector } from "react-redux"
import { useParams, Navigate } from "react-router-dom"


const GET_All_Surveys = gql`
	query Patient($id: String!) {
        patientVitalSign(id: $id){
            id
            surveys {
                question1
                answer1
                question2
                answer2
                question3
                answer3
                question4
                asnwer4
            }
        }
    }
`

function CheckSurvey(){
    const [surveys, setSurveys] = useState([])

    const {patientId} = useParams()
    const id = patientId;

    console.log("Survey - patientId:" + id);
	
    const { loading, error, data: surveyData, refetch } = useQuery(GET_All_Surveys, {
		variables: { id },
		fetchPolicy: "network-only",
		onCompleted: () => {
            console.log("===============success================")
            console.log(surveyData)
			setSurveys(surveyData.patientVitalSign.surveys)
			
		}
	})


	return(
		<div>
			<br></br><br></br>
			
			{surveys.length !== 0 && (
				<Table striped bordered hover variant="dark">
					<thead>
						<tr>
							<th>Question1</th>
                            <th>Answer1</th>
                            <th>Question2</th>
                            <th>Answer2</th>
                            <th>Question3</th>
                            <th>Answer3</th>
                            <th>Question4</th>
                            <th>Answer4</th>
							
						</tr>
					</thead>
					<tbody>
						{surveys.map((survey) => (
							<tr>
								<td>{survey.question1}</td>
                                <td>{survey.answer1}</td>
								<td>{survey.question2}</td>
                                <td>{survey.answer2}</td>
                                <td>{survey.question3}</td>
                                <td>{survey.answer3}</td>
                                <td>{survey.question4}</td>
                                <td>{survey.answer4}</td>

							</tr>
						))}
					</tbody>
				</Table>
			)}
			
		</div>
	)
}

export default CheckSurvey
