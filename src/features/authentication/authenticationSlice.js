import { createSlice } from "@reduxjs/toolkit"

const authenticationSlice = createSlice({
    name: 'authentication',
    initialState: { payload: null },
    reducers: {
        setCredentials: (state, action) => {
            const { userInfo } = action.payload
            state.payload = action.payload
            state.userInfo = userInfo
        },
        logOut: (state, action) => {
            state.payload = null
            state.userInfo = null
        }
    },
})

export const { setCredentials, logOut } = authenticationSlice.actions

export default authenticationSlice.reducer

export const selectLoginPayload = (state) => state.authentication.payload
export const selectUserInfo = (state) => state.authentication.userInfo