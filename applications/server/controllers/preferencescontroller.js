import PreferencesTable from '../models/preferencesmodel.js';

export const createPreference = async (req, res) => {
    const {eventid, amount, timeUnits, relative, otherEventid,
           location, repeat, days, numberOfTimes, everyTimeUnit, tags} = req.body;
           
    
    const newData = new PreferencesTable({
        eventid:eventid,
        amount: amount, 
        timeUnits: timeUnits,
        relative: relative,
        otherEventid: otherEventid,
        location: location,
        repeat: repeat,
        days: days,
        numberOfTimes: numberOfTimes,
        everyTimeUnit: everyTimeUnit,
        tags: tags
    });

    try{
        newData.save();
        res.status(202).json({preference: newData});
    }

    catch(err){
        res.status(409).json({message: "data create failed"});
    }
}

export const getPreference = async (req, res) => {
     try{
        const preference = await PreferencesTable.find({'eventid' : req.params.eventid});
        res.json(preference);
    }

    catch(err){
        res.status(409).json({message: "data not found"});
    }
}

export const updatePreference = async (req, res) => {

    const preference = req.body;
    
    try {
        var pref = await PreferencesTable.updateOne({'eventid' : preference.eventid}, 
                                {'amount': preference.amount, 'timeUnits': preference.timeUnits,'relative': preference.relative,
                                'otherEventid': preference.otherEventid,'location': preference.location, 'repeat': preference.repeat, 'days': preference.days,
                                'numberOfTimes': preference.numberOfTimes, 'everyTimeUnit': preference.everyTimeUnit, 'tags': preference.tags});

        if(pref.matchedCount==0){
            const newData = new PreferencesTable({
                eventid:preference.eventid,
                relative: preference.relative,
                tags: preference.tags
            });
        
            try{
                newData.save();
                res.status(202).json({preference: newData});
                return;
            }
        
            catch(err){
                res.status(409).json({message: "data create failed"});
                return;
            }
          
        };
        res.status(202).json(pref);
        return;
    } catch (err) {
      console.log(err);
      res.status(409).json({message: "data update failed"});
    }
}

export const deletePreference = async (req, res) => {

    const {eventid} = req.params;

    try{
        const pref = await PreferencesTable.deleteOne({'eventid': eventid});
        res.json(pref);
    }
    catch (err) {
        console.log(err);
        res.status(400).json({message: "delete unsuccessful"});
    }
}