import { useQuery, gql, useMutation } from "@apollo/client"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import React, { useEffect, useState } from "react"
import { Button, Card, Col, Row, Table, Form } from "react-bootstrap"
import { useSelector } from "react-redux"
import { useParams, Navigate } from "react-router-dom"

const GET_SURVEYS = gql`
query Patient($id: String!) {
    patient(id: $id){
        id
        surveys{
            question1
            answer1
            question2
            answer2
            question3
            answer3
            question4
            answer4
        }
    }
}
`

const SUBMIT_SURVEY = gql`
mutation SubmitSurvey(
    $userId: String!
    $answer1: String!
    $answer2: String!
    $answer3: String!
    $answer4: String!
) {
    submitSurvey(
        userId: $userId
        answer1: $answer1
        answer2: $answer2
        answer3: $answer3
        answer4: $answer4
    ) {
        id
    }
}
`

function SubmitSurvey(){
    const [survey, setSurvey] = useState({
	})

    const id = localStorage.getItem("userId")

    const token = useSelector((state) => state.auth.value.token)

	const navigate = useNavigate()

    const { loading, error, data: surveyData } = useQuery(GET_SURVEYS, {
		variables: { id },
		fetchPolicy: "network-only",
		onCompleted: () => {
			console.log("========Success of GET SURVEY");
            console.log(surveyData)
			setSurvey(surveyData.patient.surveys[0])
		}
	})

    const [
		submitSurvey,
		{
			data: submitSurveyData,
			loading: submitSurveyLoading,
			error: submitSurveyError
		}
	] = useMutation(SUBMIT_SURVEY, {
		variables: { id },
		fetchPolicy: "network-only",
		onCompleted: () => {
			navigate("/patients/home")
		}
	})

    const onInputChange = (e) => {
		setSurvey({ ...survey, [e.target.name]: e.target.value })
	}
	const handleSubmitSurvey = async (e) => {
		e.preventDefault()
		submitSurvey({
			variables: { ...survey, id }
		})
	}

    return (
		<>
			<br></br><br></br>
			<div className="admin-div-css">
			<Form onSubmit={(e) => handleSubmitSurvey(e)}>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>{survey.question1}</Form.Label>
					<Form.Control
						type="txt"
						placeholder="answer1"
						name="answer1"
						value={survey.answer1}
						onChange={(e) => onInputChange(e)}
					/>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>{survey.question2}</Form.Label>
					<Form.Control
						type="txt"
						placeholder="answer2"
						name="answer2"
						value={survey.answer2}
						onChange={(e) => onInputChange(e)}
					/>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>{survey.question3}</Form.Label>
					<Form.Control
						type="txt"
						placeholder="answer3"
						name="answer3"
						value={survey.answer3}
						onChange={(e) => onInputChange(e)}
					/>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>{survey.question4}</Form.Label>
					<Form.Control
						type="txt"
						placeholder="answer4"
						name="answer4"
						value={survey.answer4}
						onChange={(e) => onInputChange(e)}
					/>
				</Form.Group>

				<Button variant="success" type="submit">
					Submit
				</Button>
			</Form>
			</div>
		</>
	)
}

export default SubmitSurvey