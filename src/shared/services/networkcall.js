
import axios from 'axios';
const networkOperations ={
    async getData(URL){
        try{
        const response = await axios.get(URL);
        //const data = await response.json();
        return response.data;
        //axios
        }
        catch(err){
            console.log("Error is ",err);
        }

    },
    async postData(URL,data){
        try{
            const response = await axios.post(URL,data);
            return response;
        
        }
            catch(err){
                console.log(">>V>>V>V>V>>V");
                throw err;
            }
    },
    putData(){},
    deleteData(){}
}
export default networkOperations;