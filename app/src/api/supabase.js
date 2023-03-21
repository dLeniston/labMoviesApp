import { supabaseClient } from "../utils/client";

// Function to select ids from a given table, parse result and add to array to return
// intended to be used to set up state for favourites and watchlist
export const getUserSelection = async (table) => {
    let idArray = [];
    let { data, error } = await supabaseClient.from(table).select("id");
    if(!error){
        for(var key in data){
            idArray.push(data[key].id);
        }
        console.log(idArray);
        return idArray; 
    }else{
        throw error;
    }
}