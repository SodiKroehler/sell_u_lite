import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { debug } from '@lib/logger/flamLogger'

export const fetchFlo = createAsyncThunk('/library/fetchFlo', async (arg, { getState }) => {
  const state: any = getState();
  const queryString = 'api/flo?floID=' + state.libraryReducer.currFlo;
  const data = await fetch(queryString).then(r => r.json());
  return data.flo.chits as Chit[]
  // return data.chits as Chit[]
})

export const refreshLive = createAsyncThunk('/library/refreshLive', async (arg, { getState }) => {
  const state: any = getState();
  const queryString = 'api/VANESSA/refreshLive?num=5'
  const data = await fetch(queryString).then(r => r.json());
  return data as Tile[]
  // return data.chits as Chit[]
})

// export const newChitSubmitted = createAsyncThunk('/library/newChitSubmitted', async (newPost:string) => {
//   const d = JSON.parse(newPost)
//   const queryString = 'api/chit?artist=' + d.artist + "&album=" + d.album + "&desc=" + d.desc;
//   const data = await fetch(queryString, {
//     method: "POST"
//   }).then(r => r.json())
//   return data
// })

export interface Chit {
  id: string,
  name: string,
  floID: string,
  link: string,
  gif: string
}

export interface Tile {
  id: number,
  chit: Chit,
  prompt: String
}

export interface Flo {
  id: string,
  name: string,
  level: string,
}

export interface LibState {
  chits: Chit[],
  tiles: Tile[],
  currPage: number,
  loading: boolean,
  moreLoading: boolean,
  ending: boolean,
  currFlo: string,
  libStatus: 'outdated' | 'idle' | 'loading' | 'succeeded' | 'failed',
  error: string | null
};

const initialState: LibState = {
  chits: [],
  tiles: [],
  currPage: 0,
  loading: false,
  moreLoading: false,
  ending: false,
  currFlo: "live",
  libStatus: 'idle',
  error: null,
};

export const librarySlice = createSlice({
  name: 'library',
  initialState: initialState,
  reducers: {
    nextPage: (state) => {
      state.currPage += 2;
      state.loading = true;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setEnding: (state, action: PayloadAction<boolean>) => {
      state.ending = action.payload
    },
    changeFlo: (state, action: PayloadAction<string>) => {
      state.currFlo = action.payload
      state.libStatus = 'outdated';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFlo.pending, (state, action) => {
        state.libStatus = 'loading'
      })
      .addCase(fetchFlo.fulfilled, (state, action) => {
        state.libStatus = 'succeeded'
        state.chits = action.payload
      })
      .addCase(fetchFlo.rejected, (state, action) => {
        state.libStatus = 'failed'
        state.error = action.error.message ? action.error.message : ''
      })
      .addCase(refreshLive.pending, (state, action) => {
        state.libStatus = 'loading'
      })
      .addCase(refreshLive.fulfilled, (state, action) => {
        let lastTileIndex = state.tiles.length;
        state.libStatus = 'succeeded'

        for (let n = 0; n < action.payload.length; n++) {
          let newTile = action.payload[n];
          newTile.id = lastTileIndex;
          lastTileIndex += 1;
          state.tiles.push(newTile);
        }

      })
      .addCase(refreshLive.rejected, (state, action) => {
        state.libStatus = 'failed'
        state.error = action.error.message ? action.error.message : ''
      })
  }
})

export const {
  nextPage,
  setLoading,
  setEnding,
  changeFlo
} = librarySlice.actions;

export default librarySlice.reducer;
