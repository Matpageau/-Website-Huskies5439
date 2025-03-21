export async function getTeamEvents(year: string) {
  try {   
    const res = await fetch(`https://www.thebluealliance.com/api/v3/team/frc5439/events/${year}/keys`, {
      method: 'GET',
      headers: {
        'X-TBA-Auth-Key': 'ExMO0gWOUqWU14KvPGkP5m7nAy7GslibiaGrH72NcWbkFtZauH3HXzc3i7sAvxUj',
      },
    });

    // Check if the response status is ok
    if (!res.ok) {
      throw new Error(`Failed to fetch events, status: ${res.status}`);
    }

    const data = await res.json();
    return data

  } catch (error) {
    console.error("Error fetching team events:", error);
    return null
  }
}
