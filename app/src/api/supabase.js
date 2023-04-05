import { supabaseClient } from "../utils/client";

// Function to select ids from a given table, parse result and add to array to return
// intended to be used to set up state for favourites and watchlist
export const getUserSelection = async (table, user) => {
   if(user){
        let idArray = [];
        let { data, error } = await supabaseClient.from(table).select("id").eq("user_id", user);
        if(!error){
            for(var key in data){
                idArray.push(data[key].id);
            }
            return idArray; 
        }else{
            throw error;
        }
   }
}

// Function to return an item from a table
// Can be used to return a specific item to process details, or check if a record exists
export const returnItem = async (table, column, key, value) => {
    let {data, error } = await supabaseClient.from(table).select(column).eq(key, value);
    if(!error){
        return data;
    }else{
        throw error;
    }
}