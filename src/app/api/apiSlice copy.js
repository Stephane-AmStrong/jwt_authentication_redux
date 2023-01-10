import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials, logOut } from '../../features/authentication/authenticationSlice'
import { compareDesc } from 'date-fns'

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://localhost:7102/api/v1',
  credentials: 'include',
  /*Allowing cross-origin credentials is a security risk. A website at another domain can send a signed-in user's credentials to the app on the user's behalf without the user's knowledge. */
  prepareHeaders: (headers, { getState }) => {
    const loginPayload = getState().authentication.payload

    if (loginPayload) {
      // console.log(`expiryDate =${loginPayload.accessToken.expiryDate}`);
      headers.set("authorization", `Bearer ${loginPayload.accessToken.value}`)
    }
    return headers
  }
})

/*
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result?.error?.originalStatus === 403) {
    console.log('sending refresh token')
    // send refresh token to get new access token 
    const refreshResult = await baseQuery('/account/refresh-token', api, extraOptions)
    console.log(refreshResult)
    if (refreshResult?.data) {
      const user = api.getState().auth.user
      // store the new token 
      api.dispatch(setCredentials({ ...refreshResult.data, user }))
      // retry the original query with new access token 
      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(logOut())
    }
  }

  return result
}
*/

const baseQueryWithReauth = async (args, api, extraOptions) => {
  // let result = await baseQuery(args, api, extraOptions)
  let result = await baseQuery(args, api, extraOptions)

  console.log(`args =  ${JSON.stringify(args)} | api =  ${JSON.stringify(api)} | extraOptions =  ${JSON.stringify(extraOptions)}`)

  // const user = api.getState().token.value
  const loginPayload = api.getState().authentication.payload

  if (loginPayload) {
    const comparaison = compareDesc(new Date(loginPayload.accessToken.expiryDate), new Date());

    console.log(comparaison);
    // console.log(`loginPayload = ${loginPayload.accessToken.expiryDate}`);
  }

  if (loginPayload && compareDesc(new Date(loginPayload.accessToken.expiryDate), new Date()) > 0) {

    console.log('sending refresh token')

    const refreshRequest = {
      accessToken: loginPayload.accessToken.value,
      refreshToken: loginPayload.refreshToken.value
    }
    // send refresh token to get new access token 
    const refreshResult = await baseQuery('/account/refresh-token', api, refreshRequest)
    console.log(refreshResult)
    if (refreshResult?.data) {
      const user = api.getState().authentication.user
      // store the new token 
      api.dispatch(setCredentials({ ...refreshResult.data, user }))
      // retry the original query with new access token 
      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(logOut())
    }
  }

  return result
}

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({})
})