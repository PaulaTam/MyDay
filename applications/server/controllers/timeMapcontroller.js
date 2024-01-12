import TimeMapTable from "../models/timeMapModel.js";


export const getTimeTo = async (req, res, next) => {
    try{
        const {startLocation, endLocation} = req.body;
        const timeMapping = await TimeMapTable.where({startLocation: startLocation}).where({endLocation: endLocation});
        res.json(timeMapping);
    }

    catch(err){
        res.status(409).json({message: "data not found"});
    }
}
export const createTimemap = async (req, res, next) => {

    //res.send({message: "create time map"});
    var places= ["Burk Hall, Holloway Avenue, San Francisco, CA, USA","Lam Family College of Business, Business, 1600 Holloway Ave, San Francisco, CA 94132, USA",
    "School SFSU, Creative Arts, Holloway Avenue, San Francisco, CA, USA","SFSU Psychology Clinic, San Francisco State University, Ethnic Studies & Psychology, Holloway Avenue, San Francisco, CA, USA",
    "Fine Arts Gallery, San Francisco State University, Holloway Avenue, San Francisco, CA, USA","Mashouf Wellness Center, Font Boulevard,h San Francisco, CA, USA",
    "Hensill Hall, Holloway Avenue, San Francisco, CA, USA","College of Health & Social Sciences (CHSS) | SFSU, Holloway Avenue, San Francisco, CA, USA","Humanities Building, San Francisco, CA, USA",
    "J. Paul Leonard Library, Holloway Avenue, San Francisco, CA, USA","Marcus Hall (George and Judy Marcus Hall), 8 Tapia Dr, San Francisco, CA 94132",
    "SFSU College of Science and Engineering, San Francisco State University, Holloway Avenue, San Francisco, CA, USA","Thornton Hall, 20th Avenue, San Francisco, CA, USA"]
    for(var i=0; i<13; i++ ){
        for(var j=0;j<13;j++){
            
            const oldMap = await TimeMapTable.findOne({startLocation: places[i],endLocation: places[j]});

            if (oldMap) {
              console.log("exists")
            }
            else{
                const newData=new TimeMapTable({
                    startLocation: places[i],
                    endLocation: places[j],
                    timeTo: 0
                });
            try{
                newData.save();
            }
        
            catch(err){
                //res.status(409).json({message: "data create failed"});
            }}
           
        }
    }
    res.send({message: "finished"});
}

