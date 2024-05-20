import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { useAppDispatch, useAppSelector } from "../hooks";



export const joinRoom = createAsyncThunk('/game/joinRoom', async (arg, { getState }) => {
  const state: any = getState();
  // const queryString = 'https://mock.codes/404'
  const queryString = 'api/game/joinroom'
  const data = await fetch(queryString, {
    method: "POST",
    body: JSON.stringify({
      nickname: state.gameReducer.nickname,
      roomName: arg
    })
  }).then(r => r.json())
  return data
})
// export const joinRoom = createAsyncThunk('/game/joinRoom', async (arg, { getState }) => {
//   const state: any = getState();
//   const queryString = 'api/game/joinroom'

//   async (obj, { dispatch, getState, rejectWithValue, fulfillWithValue }) => {
//     try {
//       const response = await fetch(queryString);
//       console.log(response)
//       if (!response.ok) {
//         return rejectWithValue(response.status)
//       }
//       const data = await response.json();
//       console.log(data)
//       return fulfillWithValue(data)
//     } catch (error) {
//       throw rejectWithValue(error.message)
//     }
//   }
// })

export const isReady = createAsyncThunk('/game/isReady', async (arg, { getState }) => {
  const state: any = getState();

  const queryString = 'api/game/start'

  const data = await fetch(queryString, {
    method: "POST",
    body: JSON.stringify({
      icon: state?.gameReducer.icon
    })
  }).then(r => r.json())
  return data
})



export const getChit = createAsyncThunk('/game/getChit', async (arg, { getState }) => {
  const queryString = 'api/chit?id=' + arg[0]
  const data = await fetch(queryString, {
    method: "GET",
  }).then(r => r.json())

  data.index = arg[1]
  return data
})

export const swap = createAsyncThunk('/game/swap', async (arg, { getState }) => {
  const state: any = getState();
  const queryString = 'api/game/swap'
  const data = await fetch(queryString, {
    method: "POST",
    body: JSON.stringify({
      cardId: state.chits[arg[0]].id,
      index: arg[0],
      reason: arg[1]
    })
  }).then(r => r.json())
  return data
})

export const submit = createAsyncThunk('/game/submit', async (arg, { getState }) => {
  // const state: any  = getState();
  const queryString = 'api/game/submit'
  const data = await fetch(queryString, {
    method: "POST",
    body: JSON.stringify({
      cardId: arg[0],
      index: arg[1],
    })
  }).then(r => r.json())
  return data
})



export const vote = createAsyncThunk('/game/vote', async (arg, { getState }) => {
  const state: any = getState();

  const queryString = 'api/game/vote'
  const data = await fetch(queryString, {
    method: "POST",
    body: JSON.stringify({
      subs: state.gameReducer.votes
    })
  }).then(r => r.json())
  return data
})

export const scoreUpdated = createAsyncThunk('/game/scoreUpdated', async (arg, { getState }) => {
  const queryString = 'api/game/score'
  const data = await fetch(queryString, {
    method: "GET",
  }).then(r => r.json())
  return data
})

export const newRound = createAsyncThunk('/game/newRound', async (arg, { getState }) => {
  const queryString = 'api/game/newRound'
  const data = await fetch(queryString, {
    method: "POST",
    body: JSON.stringify({})
  }).then(r => r.json())
  return data
})

export const exit = createAsyncThunk('/game/exit', async (arg, { getState }) => {
  const queryString = 'api/game/exit'
  const data = await fetch(queryString, {
    method: "POST",
    body: JSON.stringify({})
  }).then(r => r.json())
  return data
})


export interface Chit {
  id: number,
  name: string,
  collectionId: string,
  link: string,
  gif: string
}
export interface Tile {
  id: number,
  chit: Chit
}

export interface GameState {
  icon: String,
  gameState: 'off' | 'waiting' | 'choosing' | 'voting' | 'results' | 'ending',
  roomId: String,
  roomName: String,
  prompt: String,
  message: String,
  score: Number,
  chits: Tile[],
  selected: Number,
  submissions: Tile[]
  icons: { [key: string]: string },
  votes: { [key: string]: string },
  finals: { [key: string]: string },
  statusMsg: string,
};

const initialStateinitzer = () => {
  const initialState: GameState = {
    icon: '',
    gameState: 'off',
    roomId: '',
    roomName: '',
    prompt: '',
    message: '',
    score: 0,
    chits: [],
    selected: -1,
    submissions: [],
    icons: {},
    votes: {},
    finals: {},
    statusMsg: ''
  };

  for (let i = 0; i < 7; i++) {
    const defaultChitName = 1
    const newDefChit: Tile = {
      id: i,
      chit: {
        id: 1,
        name: "chitters_debut_BACK",
        collectionId: "chitters_debut",
        link: 'https://chits-video.s3.amazonaws.com/chitters_debut_BACK.mp4',
        gif: 'https://chits-video.s3.amazonaws.com/PREVIEW_chitters_debut_BACK.png'
      }
    }
    initialState.chits.push(newDefChit)
  }
  return initialState
}

export const gameSlice = createSlice({
  name: 'game',
  initialState: initialStateinitzer(),
  reducers: {
    setIcon: (state, action: PayloadAction<string>) => {
      state.icon = action.payload

    },
    chitWasSelected: (state, action: PayloadAction<number>) => {
      state.selected = action.payload;
    },
    // chitWasUnacceptable: (state, action: PayloadAction<string>) => {
    //     console.log(action.payload + "needs to be switched")
    //     //need to trigger a card change
    // },
    gameWasStarted: (state) => {
      state.score = 0
      state.gameState = 'choosing'
    },
    newVote: (state, action) => {
      state.votes[action.payload[0]] = action.payload[1]
    },
    recievedSubmissions: (state, action) => {
      for (let i = 0; i < action.payload.length; i++) {
        state.submissions[i] = { id: i, chit: action.payload[i].chit };
      }
      state.gameState = 'voting'
    },
    recievedVotes: (state, action) => {
      state.finals = action.payload
      state.gameState = 'results'
    },
    resultsFinished: (state) => {
      state.gameState = 'ending'
    },
  },
  extraReducers(builder) {
    builder
      .addCase(joinRoom.fulfilled, (state, action) => {
        state.statusMsg = "joining room"
        state.roomName = action.payload.roomName
        state.roomId = action.payload.roomId
        // state.icon = 'waiting'
        state.gameState = 'waiting'
      })
      .addCase(joinRoom.rejected, (state, action) => {
        state.statusMsg = "couldn't find your room. you're sure you typed it correct, right?"
      })
      .addCase(getChit.rejected, (state, action) => {
        console.log(action.payload)
      })
      .addCase(getChit.fulfilled, (state, action) => {
        state.chits[action.payload.index].chit = action.payload.chit
      })
      .addCase(swap.fulfilled, (state, action) => {
        state.selected = -1
        state.chits[action.payload.index].chit = action.payload.chit.chit
      })
      .addCase(swap.rejected, (state, action) => {
        console.log(action)
      })
      .addCase(isReady.fulfilled, (state, action) => {
        state.prompt = action.payload.prompt.prompt
      })
      .addCase(isReady.rejected, (state, action) => {
        console.log(action)
      })
      .addCase(submit.fulfilled, (state, action) => {
        const p = Object.keys(action.payload.players)
        for (let i = 0; i < p.length; i++) {
          state.votes[p[i]] = ''
          state.icons[p[i]] = action.payload.players[p[i]]
        }
      })
      .addCase(vote.fulfilled, (state, action) => {
        console.log("votes registered")
      })
      .addCase(scoreUpdated.fulfilled, (state, action) => {
        state.score = action.payload.score
      })
      .addCase(newRound.fulfilled, (state, action) => {
        state.prompt = action.payload.prompt.prompt
      })
      .addCase(exit.fulfilled, (state, action) => {
        state = initialStateinitzer()
      })
  }
})

export const {
  chitWasSelected,
  newVote,
  gameWasStarted,
  recievedSubmissions,
  resultsFinished,
  setIcon,
} = gameSlice.actions;

export default gameSlice.reducer;


