import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { baseURL } from "../../utils/baseURL"


//const API_URI = "http://localhost:8800/api"
const API_URI = baseURL

const baseQuery = fetchBaseQuery({baseUrl : API_URI + "/api" })

export const apiSlice = createApi({
    baseQuery , tagTypes: [], endpoints:(builder)=>({}),
})