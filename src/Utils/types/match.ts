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
      totalPoints: number
    }
    red: {
      totalPoints: number
    }
  }
  videos: [{
    key: string
  }]
}