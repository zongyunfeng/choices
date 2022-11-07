import {createAsyncThunk} from "@reduxjs/toolkit";
import {getComputationItem} from "../service/OptionsApi";

const fetchComputationItemById = createAsyncThunk(
    'computation/fetchItemByIdStatus',
    async (id: string, thunkAPI) => {
        const response = await getComputationItem(id)
        return response.data.data
    }
)

export {fetchComputationItemById}