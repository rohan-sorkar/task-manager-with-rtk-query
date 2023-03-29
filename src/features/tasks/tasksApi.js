import apiSlice from "../api/apiSlice";

const tasksApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTasks: builder.query({
            query: () => '/tasks?_sort=id&_order=desc'
        }),
        getTask: builder.query({
            query: (id) => `/tasks/${id}`
        }),
        addTask: builder.mutation({
            query: (data) => ({
                url: '/tasks', 
                method: 'POST',
                body: data
            }),
            async onQueryStarted(arg, {dispatch, getState, queryFulfilled}) {
                try{
                    const result = await queryFulfilled
                    dispatch(
                        apiSlice.util.updateQueryData('getTasks', undefined, (draft) => {
                            draft.unshift({...result?.data})
                        })
                    )
                } 
                catch(err) {}
            }
        }),
        updateTask: builder.mutation({
            query: ({id, data}) => ({
                url: `/tasks/${id}`, 
                method: 'PATCH',
                body: data
            }),
            async onQueryStarted(arg, {dispatch, getState, queryFulfilled}) {
                const patchResult = dispatch(
                    apiSlice.util.updateQueryData('getTasks', undefined, (draft) => {

                        const updateIndex = draft.findIndex((t) => t.id == arg.id)
                        draft[updateIndex] = {
                            ...draft[updateIndex],
                            ...arg.data
                        }
                    })
                )
                try{
                    await queryFulfilled;
                } 
                catch(err) {
                    patchResult.undo()
                }
            }
        }),
        deleteTask: builder.mutation({
            query: (id) => ({
                url: `/tasks/${id}`,
                method: 'DELETE'
            }),

            async onQueryStarted(arg, {dispatch, getState, queryFulfilled}) {
                const patchResult = dispatch(
                    apiSlice.util.updateQueryData('getTasks', undefined, (draft) => {
                        return draft.filter((task) => task.id != arg)
                    })
                )
                try{
                    await queryFulfilled;
                } 
                catch(err) {
                    patchResult.undo()
                }
            }

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

export const {useGetTasksQuery, useChangeTaskStatusMutation, useDeleteTaskMutation, useAddTaskMutation, useGetTaskQuery, useUpdateTaskMutation} = tasksApi;