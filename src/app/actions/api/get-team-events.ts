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

  if(year == "2020") {
    return [
      {
        "code": "QCMO",
        "name": "Festival de Robotique a Montreal Regional (Annulé)",
        "city": "Montreal",
        "stateprov": "QC",
        "country": "Canada",
        "dateStart": "2020-04-08T00:00:00",
        "dateEnd": "2020-04-11T23:59:59",
        "website": null,
      }
    ]
  }
  
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