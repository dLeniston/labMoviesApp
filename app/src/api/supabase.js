import { supabaseClient } from "../utils/client";

// Function to select ids from a given table, parse result and add to array to return
// intended to be used to set up state for favourites and watchlist
export const getUserSelection = async (table, user) => {
   if(user){
        let idArray = [];
        let { data, error } = await supabaseClient.from(table).select("id").eq("user_id", user);
        console.log("supabase return: ", data);
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