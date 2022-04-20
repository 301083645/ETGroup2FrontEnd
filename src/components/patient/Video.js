import React, { Component, useEffect, useState } from "react"
import axios from "axios"
import { Button, Card, Col, Row, Form } from "react-bootstrap"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useParams, Navigate } from "react-router-dom"
const { gql, useQuery, useMutation } = require("@apollo/client")

function Video(){

    return(


    <div>
      <iframe
        src="https://www.youtube.com/embed/rI_6l992GrA"
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen
        title="video"
      />{" "}
    </div>


    )

}

export default Video