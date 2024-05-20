import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { redirect } from 'next/navigation'



export const checkout = createAsyncThunk('/store/checkout', async (arg, {getState}) => {
  const state : any = getState();
  const queryString = 'api/checkout_sessions' 
  const data = await fetch(queryString, {
    method: "POST",
    mode: 'no-cors',
    body: JSON.stringify({
      items: state.cart
    })
  });
  // .then(r => r.json())
  // return data
})

export interface Item {
  id: number,
  name: string, 
  description: string,
  group: string,
  gif: string
}

export interface GameState {
  icon:   String,
  storeState: 'off' | 'checkout' | 'on'
  cart: Item[]
};

const initialStateinitzer = () => {
  const initialState: GameState = {
    icon: '',
    storeState:  'off',
    cart: []
  };

  return initialState
}

export const storeSlice = createSlice({
  name: 'store',
  initialState: initialStateinitzer(),
  reducers: {
    setIcon: (state, action: PayloadAction<string>) => {
      state.icon = action.payload
    },     
  },
  extraReducers(builder) {
    builder
      .addCase(checkout.fulfilled, (state, action) => {
        state.cart = []
        console.log("checkout completed")
        // redirect(action.payload.surl)
      })     
  }
})

export const {
  setIcon,
} = storeSlice.actions;

export default storeSlice.reducer;


