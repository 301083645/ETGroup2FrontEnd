import React, { Component, useEffect, useState } from "react"
import axios from "axios"
import { Button, Card, Col, Row, Form } from "react-bootstrap"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useParams, Navigate } from "react-router-dom"
const { gql, useQuery, useMutation } = require("@apollo/client")

const CREATE_ASSIGN_Survey = gql`
	mutation CreateAndAssignSurvey(
		$question1: String!
		$answer1: String!
		$question2: String!
		$answer2: String!
		$question3: String!
		$answer3: String!
		$question4: String!
		$answer4: String!
		$patientId: String!
	) {
		createAndAssignSurvey(
			question1: $question1
			answer1: $answer1
			question2: $question2
			answer2: $answer2
			question3: $question3
			answer3: $answer3
			question4: $question4
			answer4: $answer4
			patientId: $patientId
		) {
			id
		}
	}
`


function SendSurvey(){

    const {patientId} = useParams();

    const [survey, setSurvey] = useState({
		question1: "",
		question2: "",
		question3: "",
		question4: "",
		answer1: "",
		answer2: "",
		answer3: "",
		answer4: ""
	})
	const token = useSelector((state) => state.auth.value.token)

	const navigate = useNavigate()

	const [
		createAndAssignSurvey,
		{
			data: data,
			loading: loading,
			error: error
		}
	] = useMutation(CREATE_ASSIGN_Survey, {
        onCompleted: () => {
			navigate("/nurse/patients")
		}
	})



    

    const onInputChange = (e) => {
        setSurvey({ ...survey, [e.target.name]: e.target.value })
    }
	
	const handleCreateSurvey = async (e) => {
		e.preventDefault()
		
		createAndAssignSurvey({
			variables: {
				question1: survey.question1,
				question2: survey.question2,
				question3: survey.question3,
				question4: survey.question4,
				answer1: survey.answer1,
				answer2: survey.answer2,
				answer3: survey.answer3,
				answer4: survey.answer4,


				patientId:patientId
			}
		})
        
    
        
	}

    return(
<>
			<br></br><br></br>
			<div className="admin-div-css">
			
			<p>Create Survey</p>
            <p>patient Id: {patientId}</p>
			</div>

            <br></br><br></br>
			<div className="admin-div-css">
			<Form onSubmit={(e) => handleCreateSurvey(e)}>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Question 1</Form.Label>
					<Form.Control
						type="txt"
						placeholder="question1"
						name="question1"
						value={survey.question1}
						onChange={(e) => onInputChange(e)}
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Question 2</Form.Label>
					<Form.Control
						type="txt"
						placeholder="question2"
						name="question2"
						value={survey.question2}
						onChange={(e) => onInputChange(e)}
					/>
				</Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Question 3</Form.Label>
					<Form.Control
						type="txt"
						placeholder="question3"
						name="question3"
						value={survey.question3}
						onChange={(e) => onInputChange(e)}
					/>
				</Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Question 4</Form.Label>
					<Form.Control
						type="txt"
						placeholder="question4"
						name="question4"
						value={survey.question4}
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

export default SendSurvey