import { createSlice } from "@reduxjs/toolkit";

import { AppState } from "./store";

export interface PriceState {
  priceState: {
    bpi: {
      USD: {
        code: string;
        rate: string;
      }
    };
    eth: {
      price: number | null;
    };
    time: {
      updated: string;
    };
  };
}

const initialState: PriceState = {
  priceState: {
    bpi: {
      USD: {
        code: '',
        rate: ''
      }
    },
    eth: {
      price: null
    },
    time: {
      updated: "",
    },
  },
};

export const priceSlice = createSlice({
  name: "price",
  initialState,
  reducers: {
    setPriceState(state, action) {
      state.priceState.bpi = action.payload.bpi;
      state.priceState.time.updated = action.payload.updated,
      state.priceState.eth.price = action.payload.ethPrice
    },
  },
});

export const { setPriceState } = priceSlice.actions;

export const selectPriceState = (state: AppState) => state.price.priceState;

export default priceSlice.reducer;
