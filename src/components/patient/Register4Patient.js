import axios from "axios"
import React, { useState } from "react"
import { useDispatch } from "react-redux"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { setLoginSuccess } from "../../features/authSlice"
import { gql, useMutation, useQuery } from "@apollo/client"
import "./Patient.css"

const REGISTER = gql`
	mutation Register(
		$email: String!
		$password: String!
		$role: String!
		$firstName: String!
		$lastName: String!
		$patientNumber: String!
		$address: String!
		$city: String!
		$phoneNumber: String!
	) {
		register(
			email: $email
			password: $password
			patientNumber: $patientNumber
			role: $role
			firstName: $firstName
			lastName: $lastName
			address: $address
			city: $city
			phoneNumber: $phoneNumber
		) {
			id
			email
			role
			token
		}
	}
`

function Register4Patient() {
	const [
		register,
		{ data: registerData, loading: registerLoading, error: registerError }
	] = useMutation(REGISTER, {
		onCompleted: (registerData) => {
			dispatch(setLoginSuccess(registerData.register))
			navigate("/home")
		}
	})
	const [user, setUser] = useState({
		password: "",
		email: "",
		role: "patient",
		patientNumber: "",
		firstName: "",
		lastName: "",
		address: "",
		city: "",
		phoneNumber: ""
	})
	const navigate = useNavigate()

	//Set dispatch for Redux
	const dispatch = useDispatch()

	const onInputChange = (e) =>
		setUser({ ...user, [e.target.name]: e.target.value })

	const handleRegister = async (e) => {
		e.preventDefault()

		register({
			variables: user
		})
	}

	return (
		<>
			<br></br><br></br>
			<div className="stu-div-css">
			<Form onSubmit={(e) => handleRegister(e)}>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Email Address</Form.Label>
					<Form.Control
						type="email"
						placeholder="Enter email"
						name="email"
						value={user.email}
						onChange={(e) => onInputChange(e)}
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Password"
						name="password"
						value={user.password}
						onChange={(e) => onInputChange(e)}
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicFirstName">
					<Form.Label>First Name</Form.Label>
					<Form.Control
						type="text"
						placeholder="First Name"
						name="firstName"
						value={user.firstName}
						onChange={(e) => onInputChange(e)}
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicLastName">
					<Form.Label>Last Name</Form.Label>
					<Form.Control
						type="text"
						placeholder="Last Name"
						name="lastName"
						value={user.lastName}
						onChange={(e) => onInputChange(e)}
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicPatientNumber">
					<Form.Label>Patient Number</Form.Label>
					<Form.Control
						type="text"
						placeholder="patientNumber"
						name="patientNumber"
						value={user.patientNumber}
						onChange={(e) => onInputChange(e)}
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicAddress">
					<Form.Label>Address</Form.Label>
					<Form.Control
						type="text"
						placeholder="address"
						name="address"
						value={user.address}
						onChange={(e) => onInputChange(e)}
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicCity">
					<Form.Label>City</Form.Label>
					<Form.Control
						type="text"
						placeholder="city"
						name="city"
						value={user.city}
						onChange={(e) => onInputChange(e)}
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicPhoneNumber">
					<Form.Label>Phone Number</Form.Label>
					<Form.Control
						type="text"
						placeholder="phoneNumber"
						name="phoneNumber"
						value={user.phoneNumber}
						onChange={(e) => onInputChange(e)}
					/>
				</Form.Group>

				
				<Button variant="success" type="submit">
					Register
				</Button>
			</Form>
			</div>
		</>
	)
}

export default Register4Patient
