import { apiSlice } from "../api/apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (body) => ({
        url: `/auth/login`,
        method: "POST",
        headers: {
          ContentType: "application/json"
        },
        body: body
      })
    })
  })
});

export const { useLoginMutation } = authApi;
