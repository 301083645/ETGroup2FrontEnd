import React, { Component, useEffect, useState } from "react"
import axios from "axios"
import { Button, Card, Col, Row, Form } from "react-bootstrap"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useParams, Navigate } from "react-router-dom"
const { gql, useQuery, useMutation } = require("@apollo/client")

function Video(){

    return(


    <div style={{paddingTop: "30px"}}>
      <iframe
        width="560" height="315"
        src="https://www.youtube.com/embed/rI_6l992GrA"
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen
        title="video"
      />{" "}
      <iframe width="560" height="315" src="https://www.youtube.com/embed/CkRDw4En_78" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      {" "}
      <iframe width="560" height="315" src="https://www.youtube.com/embed/pt8VYOfr8To" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      {" "}
      <iframe width="560" height="315" src="https://www.youtube.com/embed/ZTnYVDn7RD4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>


    )

}

export default Video