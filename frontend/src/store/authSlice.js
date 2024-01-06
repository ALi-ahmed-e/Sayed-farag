import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'
import { toast } from 'react-toastify';

export const checkLoggedIn = createAsyncThunk('auth/checkLoggedIn', async (id, { rejectWithValue, getState }) => {

    try {
        const res = await axios.post('/api/users/check-logged-in', { withCredentials: true })

        localStorage.setItem('user', JSON.stringify(res.data.user))
        return res.data.user

    } catch (error) {
        // localStorage.clear()
        // toast.error('حدث خطأ ما يرجي اعاده المحاولة')
        return rejectWithValue(error.response.data.message)
    }

})

export const signIn = createAsyncThunk('auth/signIn', async (userData, { rejectWithValue, getState }) => {

    try {
        //log in user
        const res = await axios.post(`/api/users/login`, userData, { withCredentials: true })

        localStorage.setItem('user', JSON.stringify(res.data.user))
        return res.data.user

    } catch (error) {
        toast.error(error.response.data.message)
        return rejectWithValue(error.response.data.message)
    }

})

export const createUser = createAsyncThunk('auth/createUser', async (userData, { rejectWithValue, getState }) => {

    try {
        //log in user
        const res = await axios.post(`/api/users/create-user`, userData, { withCredentials: true })

        return res.data.user

    } catch (error) {
        toast.error('حدث خطأ ما يرجي اعاده المحاولة')
        return rejectWithValue(error.response.data.message)
    }

})

export const logout = createAsyncThunk('auth/logout', async (userData, { rejectWithValue, getState }) => {

    try {
        //log in user
        const res = await axios.post(`/api/users/logout`, { withCredentials: true })

        localStorage.clear()
        return null

    } catch (error) {
        toast.error('حدث خطأ ما يرجي اعاده المحاولة')
        return rejectWithValue(error.response.data.message)
    }

})

// export const getStudents = createAsyncThunk('auth/getStudents', async (data, { rejectWithValue, getState }) => {

//     try {
//         const res = await axios.post(`/api/students/get-students/`, data, { withCredentials: true })

//         return res.data

//     } catch (error) {
//         toast.error('حدث خطأ ما يرجي اعاده المحاولة')
//         return rejectWithValue(error.response.data.message)
//     }

// })


export const deleteStudent = createAsyncThunk('auth/deleteStudent', async (id, { rejectWithValue, getState }) => {

    try {
        //log in user
        const res = await axios.delete(`/api/students/delete-student/${id}`, { withCredentials: true })

        return res.data

    } catch (error) {
        toast.error('حدث خطأ ما يرجي اعاده المحاولة')
        return rejectWithValue(error.response.data.message)
    }

})



export const editStudents = createAsyncThunk('auth/editStudents', async (data, { rejectWithValue, getState }) => {

    try {
        //editStudents
        const res = await axios.put(`/api/students/edit-student`, data, { withCredentials: true })

        return res.data.user

    } catch (error) {
        toast.error('حدث خطأ ما يرجي اعاده المحاولة')
        return rejectWithValue(error.response.data.message)
    }

})




const initstate = {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    isLoading: false,
    // students: []
}

const AuthSlice = createSlice({
    name: "Auth",
    initialState: initstate,
    reducers: {
        toggleToCart: (state, action) => {

        },
    },
    extraReducers: (builder) => {
        //login
        builder.addCase(signIn.pending, (state, action) => {

            state.isLoading = true
        })
        builder.addCase(signIn.fulfilled, (state, action) => {

            state.isLoading = false
            state.user = action.payload
            toast.success('تم العمليه بنجاح')
        })
        builder.addCase(signIn.rejected, (state, action) => {

            state.isLoading = false
        })

        //check logged in

        builder.addCase(checkLoggedIn.pending, (state, action) => {

            state.isLoading = true
        })
        builder.addCase(checkLoggedIn.fulfilled, (state, action) => {

            state.isLoading = false
            state.user = action.payload
            toast(` (${state?.user?.name}) اهلا `, { toastId: '232rfre' })

        })
        builder.addCase(checkLoggedIn.rejected, (state, action) => {
            toast(` (جاري تسجيل الخروج`, { toastId: '3242rf' })
            localStorage.clear()
            state.user = null
            state.isLoading = false
        })

        //logout

        builder.addCase(logout.pending, (state, action) => {

            state.isLoading = true
        })
        builder.addCase(logout.fulfilled, (state, action) => {

            state.isLoading = false
            state.user = action.payload
            toast.success('تم العمليه بنجاح')
        })
        builder.addCase(logout.rejected, (state, action) => {

            state.isLoading = false
        })

        //searchStudents


        // //getStudents
        // builder.addCase(getStudents.pending, (state, action) => {

        //     state.isLoading = true
        // })
        // builder.addCase(getStudents.fulfilled, (state, action) => {

        //     state.isLoading = false
        //     state.students = action.payload

        // })
        // builder.addCase(getStudents.rejected, (state, action) => {

        //     state.isLoading = false
        // })

        //createUser
        builder.addCase(createUser.pending, (state, action) => {

            state.isLoading = true
        })
        builder.addCase(createUser.fulfilled, (state, action) => {

            state.isLoading = false
            if (action.payload.role != 'admin' || 'مشرف') {

                // state.students.users.push(action.payload)
            }
            toast.success('تم العمليه بنجاح')
        })
        builder.addCase(createUser.rejected, (state, action) => {

            state.isLoading = false
        })
        //createUser
        builder.addCase(deleteStudent.pending, (state, action) => {

            state.isLoading = true
        })
        builder.addCase(deleteStudent.fulfilled, (state, action) => {

            state.isLoading = false
            state.students.users = state.students.users.filter(item => item._id !== action.payload.id)
            toast.success('تم العمليه بنجاح')
        })
        builder.addCase(deleteStudent.rejected, (state, action) => {

            state.isLoading = false
        })
        //createUser
        builder.addCase(editStudents.pending, (state, action) => {

            state.isLoading = true
        })
        builder.addCase(editStudents.fulfilled, (state, action) => {

            state.isLoading = false

            toast.success('تم العمليه بنجاح')
        })
        builder.addCase(editStudents.rejected, (state, action) => {

            state.isLoading = false
        })

        // builder.addCase(getGroups.fulfilled, (state, action) => {

        //     state.isLoading = false
        //     state.groups = action.payload

        // })
        // builder.addCase(toggleGroups.fulfilled, (state, action) => {

        //     state.isLoading = false
        //     state.groups = action.payload

        // })
        // //searchStudents
        // builder.addCase(searchStudents.pending, (state, action) => {

        //     state.isLoading = true
        // })
        // builder.addCase(searchStudents.fulfilled, (state, action) => {

        //     state.isLoading = false
        //     state.students = action.payload

        // })
        // builder.addCase(searchStudents.rejected, (state, action) => {

        //     state.isLoading = false
        // })

        // //getStudents
        // builder.addCase(getStudents.pending, (state, action) => {

        //     state.isLoading = true
        // })
        // builder.addCase(getStudents.fulfilled, (state, action) => {

        //     state.isLoading = false
        //     state.students = action.payload

        // })
        // builder.addCase(getStudents.rejected, (state, action) => {

        //     state.isLoading = false
        // })
        // //getStudents

        // builder.addCase(deleteAllStudents.fulfilled, (state, action) => {

        //     state.isLoading = false
        //     state.students = []

        // })

    }
})





export default AuthSlice.reducer
export const { toggleToCart } = AuthSlice.actions
