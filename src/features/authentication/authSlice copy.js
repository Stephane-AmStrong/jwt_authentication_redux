import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: 'auth',
    // name: 'auth',
    initialState: { payload: null, user: null },
    reducers: {
        setCredentials: (state, action) => {
            const { userInfo } = action.payload
            state.loginPayload = action.payload
            state.user = userInfo
        },
        logOut: (state, action) => {
            state.loginPayload = null
            state.user = null
        }
    },
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state) => state.auth.user
export const selectLoginPayload = (state) => state.auth.loginPayload