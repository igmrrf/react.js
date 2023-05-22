import { EnhancerArray, PayloadAction } from "@reduxjs/toolkit";
import { Reducer } from "redux";

const round = (num: number) => Math.round(num * 100) / 100;

const monitorReducerEnhancer =
  (createStore: any) =>
  (reducer: Reducer, initialState: any, enhancer: EnhancerArray<any>) => {
    const monitoredReducer = (state: any, action: PayloadAction) => {
      const start = performance.now();
      const newState = reducer(state, action);
      const end = performance.now();
      const diff = round(end - start);

      console.log("reducer process time:", diff);

      return newState;
    };

    return createStore(monitoredReducer, initialState, enhancer);
  };

export default monitorReducerEnhancer;
