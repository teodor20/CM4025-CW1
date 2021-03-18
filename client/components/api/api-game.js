// ------Normal users------
const createGame = async (params, credentials, game) => {
    try {
        let response = await fetch('/api/games/' + params.userId, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(game),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + credentials.t
          }
        })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
}

const getUserGames = async (params, credentials) => {
  try {
      let response = await fetch('/api/games/' + params.userId, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        }
      })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}

// ------End normal users------

// ------Admin users------

const listGame = async (params, credentials, signal) => {
    try {
      let response = await fetch('/api/games/admin' + params.userId, {
        method: 'GET',
        signal: signal,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + credentials.t
          }
      })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
}

const removeGame = async (params, credentials, gameId) => {
  try {
    let response = await fetch('/api/games/admin' + params.userId, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify({
          id: gameId
      })
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}

const clearDurationForAllGames = async (params, credentials) => {
  try {
      let response = await fetch('/api/games/admin/' + params.userId, {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        }
      })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}

export {
    createGame,
    listGame,
    removeGame,
    getUserGames,
    clearDurationForAllGames
}