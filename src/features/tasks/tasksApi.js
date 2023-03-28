import apiSlice from "../api/apiSlice";

const tasksApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTasks: builder.query({
            query: () => '/tasks'
        }),
        changeTaskStatus: builder.mutation({
            query: ({id, data}) => ({
                url: `/tasks/${id}`,
                method: 'PATCH',
                body: data 
            })
        })
    })
});

export const {useGetTasksQuery, useChangeTaskStatusMutation} = tasksApi;