export default function tryParseJSON (jsonString){
    try {
        let parsed = JSON.parse(jsonString);   
        console.log("pars") 
        console.log(jsonString)
        console.log(parsed)  
        return parsed!==undefined;
        
    }
    catch (e) { }

    return false;
};