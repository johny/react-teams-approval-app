import axios from 'axios'

const BASE_API = `https://s3-eu-west-1.amazonaws.com/spx-development`

export interface Team {
  id: string
  name: string
  users: string[]
}

export interface User {
  id: string
  first_name: string
  last_name: string
  email: string
}


/**
 * Fetches list of teams from SPX api
 */
export const getTeams = async () => {
  const requestUrl = `${BASE_API}/contents/teams`

  try {
    const { data } = await axios.get<Team[]>(requestUrl)
    return data
  } catch (err) {
    throw err
  }
}

export const getUsers = async () => {
  const requestUrl = `${BASE_API}/contents/users`

  try {
    const { data } = await axios.get<User[]>(requestUrl)
    return data
  } catch (err) {
    throw err
  }
}
