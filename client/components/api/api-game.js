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

const listGame = async (params, credentials, signal) => {
    try {
      let response = await fetch('/api/games/' + params.userId, {
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
      let response = await fetch('/api/users/' + params.userId, {
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

export {
    createGame,
    listGame,
    removeGame
}