export async function getMatchsResults(event_key: string) {
  try {   
    const res = await fetch(`https://www.thebluealliance.com/api/v3/team/frc5439/event/${event_key}/matches`, {
      method: 'GET',
      headers: {
        'X-TBA-Auth-Key': 'ExMO0gWOUqWU14KvPGkP5m7nAy7GslibiaGrH72NcWbkFtZauH3HXzc3i7sAvxUj',
      },
    });

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