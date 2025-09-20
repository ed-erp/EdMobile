import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type FlowType = 'login' | 'forgotPassword' | 'signup' | null;

interface AuthFlowState {
  flow: FlowType;
  isUserLoggedIn: boolean;
}

const initialState: AuthFlowState = {
  flow: null,
  isUserLoggedIn: false,
};

const authFlowSlice = createSlice({
  name: 'authFlow',
  initialState,
  reducers: {
    setFlow: (state, action: PayloadAction<FlowType>) => {
      state.flow = action.payload;
    },
    resetFlow: state => {
      state.flow = null;
    },
    setIsUserLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isUserLoggedIn = action.payload;
    },
  },
});

export const { setFlow, resetFlow, setIsUserLoggedIn } = authFlowSlice.actions;
export default authFlowSlice.reducer;
