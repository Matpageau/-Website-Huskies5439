export type Match = {
  match_number: number
  set_number: number
  comp_level: string
  alliances: {
    blue: {
      score: number
      team_keys: string[]
    }
    red: {
      score: number
      team_keys: string[]
    }
  }
  winning_alliance: string
  score_breakdown: {
    blue: {
      total_points: number
      totalPoints: number
    }
    red: {
      total_points: number
      totalPoints: number
    }
  }
  videos: [{
    key: string
  }]
}