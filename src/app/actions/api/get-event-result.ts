"use server"
import axios from "axios";

export interface GetTeamParams {
  year: string;
  eventCode: string;
}

export default async function getEventResult({ year, eventCode }: GetTeamParams) {   
  const config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `https://frc-api.firstinspires.org/v3.0/${year}/rankings/${eventCode}?teamNumber=5439`,
    headers: { 
      'Authorization': 'Basic bWFsYWRhcml4Ojk3NjNmZWRjLWUwNjAtNDJhYi1hOTBiLWMzZWRmMDJjNjZkZQ=='
    }
  };
  
  try {
    const response = await axios.request(config)
    return response.data
  } catch (error) {
    console.error("Une erreure est survenue lors du chargement de l'équipe.", error)
  }
}