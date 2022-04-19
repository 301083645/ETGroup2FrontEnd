import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { setLocalUserLogin } from "../../features/authSlice"

export const Router4Patient = ({ children }) => {
	const role = useSelector((state) => state.auth.value.role)||localStorage.getItem("role")
    const dispatch = useDispatch()
    if (role === "patient") {
        dispatch(setLocalUserLogin)
		return children
	}

	return <Navigate to="/login" />
}
