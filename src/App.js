import React, { useEffect, useState } from "react"
import {
	BrowserRouter as Router,
	Route,
	Link,
	Redirect,
	Routes
} from "react-router-dom"

///////////////////////////
// Modules needed
///////////////////////////
import { NavDropdown } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import Container from "react-bootstrap/Container"
import "./App.css"

///////////////////////////
// Basic Navigation
///////////////////////////
import Home from "./components/Home"
import Login from "./components/Login"
import { useDispatch, useSelector } from "react-redux"
import {
	setLocalUserLogin,
	setLoginSuccess,
	setLogoutSuccess
} from "./features/authSlice"
import Register4Nurse from "./components/nurse/Register4Nurse"
import Register4Patient from "./components/patient/Register4Patient"

///////////////////////////
// Nurse Navigation
///////////////////////////
import { Router4Nurse } from "./components/nurse/Router4Nurse"
import ListAllPatients from "./components/nurse/ListAllPatients"
import AddVitalSign from "./components/nurse/AddVitalSign"
import History from "./components/nurse/History"
import Message from "./components/nurse/Message"



///////////////////////////
// Patient Navigation
///////////////////////////
import { Router4Patient } from "./components/patient/Router4Patient"




function App() {
	const [userEmail, setUserEmail] = useState("")

	const email = useSelector((state) => state.auth.value.email)
	const role = useSelector((state) => state.auth.value.role)

	const dispatch = useDispatch()

	const token = localStorage.getItem("token")
	useEffect(() => {
		if (token != null) {
			dispatch(setLocalUserLogin())
		}
	}, [])

	const logout = () => {
		dispatch(setLogoutSuccess())
	}

	return (
		<Router>
			<Navbar bg="warning" variant="light" expand="xxl" className="app-nav">
				<Container>
					<Navbar.Brand href="/home" className="app-logo">Patient Management</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="mr-auto">
							<Nav.Link as={Link} to="/home">
								Home
							</Nav.Link>
							<Nav.Link as={Link} to="/login">
								Login
							</Nav.Link>
							<NavDropdown title="Register" id="collasible-nav-dropdown">
								<NavDropdown.Item as={Link} to="/nurse-register">
									Register for Nurse
								</NavDropdown.Item>
								<NavDropdown.Item as={Link} to="/patient-register">
									Register for Patient
								</NavDropdown.Item>
							</NavDropdown>

							{/* {role === "patient" && (
								<NavDropdown title="-----" id="basic-nav-dropdown">
									<NavDropdown.Item as={Link} to="/patient/...">
										------------
									</NavDropdown.Item>
									<NavDropdown.Item as={Link} to="/patient/...">
										------------
									</NavDropdown.Item>
								</NavDropdown>
							)}
							*/}
							{role === "nurse" && (
								<NavDropdown title="Management" id="basic-nav-dropdown">
	
									<NavDropdown.Item as={Link} to="nurse/patients">
										List of All Patients
									</NavDropdown.Item>
									<NavDropdown.Item as={Link} to="nurse/../..">
										------------
									</NavDropdown.Item>
									<NavDropdown.Item as={Link} to="nurse/.....">
										------------
									</NavDropdown.Item>
								</NavDropdown>
							)} 
						</Nav>
					</Navbar.Collapse>
					{email && <Navbar.Brand>{email}</Navbar.Brand>}
					{email && (
						<Navbar.Brand className="btn" onClick={logout}>
							{" "}
							Log out
						</Navbar.Brand>
					)}
				</Container>
			</Navbar>

			<div className="center-container">
				<Routes>
					<Route index element={<Home />} />
					<Route path="home" element={<Home />} />
					<Route path="nurse-register" element={<Register4Nurse/>} />
					<Route path="patient-register" element={<Register4Patient/>} />
					<Route path="login" element={<Login />} />
					<Route
						path="patient/..."
						element={
							<Router4Patient>
								<></>
							</Router4Patient>
						}
					/>
					<Route
						path="patient/..."
						element={
							<Router4Patient>
								<></>
							</Router4Patient>
						}
					/>
					

					<Route
						exact
						path="nurse/patients"
						element={
							<Router4Nurse>
								<ListAllPatients/>
							</Router4Nurse>
						}
					/>

					<Route
						path="nurse/addVitalSign/:patientId"
						element={
							<Router4Nurse>
								<AddVitalSign/>
							</Router4Nurse>
						}
					/>
					<Route
						path="nurse/history/:patientId"
						element={
							<Router4Nurse>
								<History/>
							</Router4Nurse>
						}
					/>
					<Route
						path="nurse/message/:patientId"
						element={
							<Router4Nurse>
								<Message/>
							</Router4Nurse>
						}
					></Route>
				</Routes>
			</div>
		</Router>
	)
}
//<Route render ={()=> < App />} path="/" />
export default App