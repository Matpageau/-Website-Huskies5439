"use server"
import axios from "axios";

interface GetTeamParams {
  year: string;
}

export default async function getTeamEvents({ year }: GetTeamParams) {   
  const config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `https://frc-api.firstinspires.org/v3.0/${year}/events?teamNumber=5439`,
    headers: { 
      'Authorization': 'Basic bWFsYWRhcml4Ojk3NjNmZWRjLWUwNjAtNDJhYi1hOTBiLWMzZWRmMDJjNjZkZQ=='
    }
  };
  
  try {
    const response = await axios.request(config)
    if(response.data.eventCount > 0) {
      return response.data.Events
    }
  } catch (error) {
    console.error("Une erreure est survenue lors du chargement de l'équipe.", error)
    return undefined
  }
}