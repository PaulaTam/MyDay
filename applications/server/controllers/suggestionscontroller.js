import PreferencesTable from '../models/preferencesmodel.js';
import PlacesOfInterestTable from '../models/placesOfInterestModel.js';
import TimeMapTable from '../models/timeMapModel.js';

export const getSuggestions = async (req, res) => {
 
    var data= req.body;
    var events = getRealitveEvents(data);
   var poi = await PlacesOfInterestTable.find();
   // console.log(poi);
    var todayPOIs= todaysPOI(poi);
    var vaildPOIs =await vaildPOI(events,todayPOIs);
   //console.log(todayPOIs);

   var prePref= await PreferencesTable.find({"eventid": events[0]._id, 'relative': "After"});
    var nextPref= await PreferencesTable.find({"eventid": events[1]._id,'relative': "Before"});
    var tags = new Array;
   if (prePref.length>0){
        for(var j=0;j<prePref.length;j++){            
         if(prePref[j].toObject().tags.length>0){
            for(var i =0; i<prePref[j].toObject().tags.length; i++){
                tags.push(prePref[j].toObject().tags[i]);
            }
        }
        }
    
    }
    if (nextPref.length>0){
        for(var j=0;j<nextPref.length;j++){            
         if(nextPref[j].toObject().tags.length>0){
            for(var i =0; i<nextPref[j].toObject().tags.length; i++){
                tags.push(nextPref[j].toObject().tags[i]);
            }
        }
        }
    
    }
    
    
var suggestions = getSuggestionByTag(tags,vaildPOIs);
if(suggestions != "no suggestion"){
    var newSuggestions = JSON.parse(JSON.stringify(suggestions));
    for(var i =0;i < newSuggestions.length;i++){
        newSuggestions[i].ID=i+1;
    }
    res.send(newSuggestions);
    }else{
    res.send(suggestions);
    }

};

export function getRealitveEvents(data) {

    var lengthArray= data.length;
   var preEvent= {'user': 0, "start": "Mon Oct 31 2022 0:00:00 GMT-0700 (Pacific Daylight Time)", "end": "Mon Oct 31 2022 0:00:00 GMT-0700 (Pacific Daylight Time)",'Location': "NULL"};
    var nextEvent= {'user': 0, "start": "Mon Oct 31 2022 23:59:00 GMT-0700 (Pacific Daylight Time)", "end": "Mon Oct 31 2022 23:59:00 GMT-0700 (Pacific Daylight Time)",'Location': "NULL"};
     var events = [{'user': 0,'id':0, "StartTime": "Mon Oct 31 2022 0:00:00 GMT-0700 (Pacific Daylight Time)", "EndTime": "Mon Oct 31 2022 0:00:00 GMT-0700 (Pacific Daylight Time)",'Location': "NULL"},{'user': 0,'id':0, "StartTime": "Mon Oct 31 2022 23:59:00 GMT-0700 (Pacific Daylight Time)", "EndTime": "Mon Oct 31 2022 23:59:00 GMT-0700 (Pacific Daylight Time)",'Location': "NULL"}];

    var today = new Date();
    var todaytime = today.getHours() + today.getMinutes()/60; 
    var preEventStartTime = new Date(events[0].StartTime).getHours()+new Date(events[0].StartTime).getMinutes()/60;
    var preEventEndTime = new Date(events[0].EndTime).getHours() + new Date(events[0].EndTime).getMinutes()/60;
    var nextEventStartTime = new Date(events[1].StartTime).getHours() + new Date(events[1].StartTime).getMinutes()/60;
    var nextEventEndTime = new Date(events[1].EndTime).getHours() + new Date(events[1].EndTime).getMinutes()/60;

    for( var i =0; i<lengthArray;i++){
        var eventStartTime = new Date(data[i].StartTime).getHours() + new Date(data[i].StartTime).getMinutes()/60;

        var eventEndTime = new Date(data[i].EndTime).getHours() + new Date(data[i].EndTime).getMinutes()/60;


        if (eventStartTime < todaytime && eventStartTime >= preEventStartTime ){ //if the event being checked starts before now and start time is after the current previous event
            events[0]=data[i]; //the new previous event is current event being checked
            preEventStartTime = eventStartTime;
            preEventEndTime = eventEndTime;
        };
        if (eventStartTime > todaytime && eventStartTime < nextEventStartTime){ //event id after current time and before next event
        events[1]= data[i];
            nextEventStartTime= eventStartTime;
            nextEventEndTime= eventEndTime;
        }
    }
    return (events);
};

function getSuggestionByTag(tags,data){
    //console.log(tags);
    var suggestions= new Array; //array for suggested points of intrest
    if(data.length>0){
        if(data.length<6){
            for(var i =0; i<data.length;i++){
                suggestions.push(data[i]);
            };
            return suggestions;
        }
        var array= new Array(data.length).fill(0);//array to assign points to see which poi point of interests match most tags

        for( var i = 0; i<data.length;i++){
            for(var j= 0; j<tags.length;j++){
               if(data[i].toObject().tag && data[i].toObject().tag.includes(tags[j])){ //everytime a tag matchs add a point
                      array[i]++;
                    
                }
            }
        }
        array.push(-1);
        var max1= array.length-1;
            var max2= array.length-1;
            var max3 = array.length-1;
            var max4= array.length-1;
            var max5 = array.length-1;
            
        for( var i = 0; i<array.length;i++){ //get Location of data(poi) with most points
            if(array[i]> array[max1]){
                max5=max4;
                max4=max3;
                max3=max2;
                max2=max1;
                max1=i;
            }else
             if(array[i]> array[max2]){
                max5=max4;
                max4=max3;
                max3=max2;
                max2=i;
                
            }else
            if(array[i]> array[max3]){
                max5=max4;
                max4=max3;
                max3=i;
                
            }else
           if(array[i]> array[max4]){
                max5=max4;
                max4=i;
                
            }else
            if(array[i]> array[max5]){
                max5=i;
                
            }
            
        }
        
        suggestions.push(data[max1]);
        suggestions.push(data[max2]);
        suggestions.push(data[max3]);
        suggestions.push(data[max4]);
        suggestions.push(data[max5]);
        return suggestions;
    }else return("no suggestion");
}

function todaysPOI(data){
    var todayPOIs= new Array;
    const weekdays= ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

const date = dd + '/' + mm + '/' + yyyy;
    for(var i = 0; i<data.length;i++){
        if(data[i].toObject().day.includes(date) || data[i].toObject().day.includes(weekdays[today.getDay()]) ){
            todayPOIs.push(data[i]);
        }
    }
    return(todayPOIs);
}

async function vaildPOI(events,data){
    var today= new Date();
    var hours = new Date(events[1].StartTime).getHours();
    var minutes = new Date(events[1].StartTime).getMinutes();
    var nowTime = today.getHours() +today.getMinutes()/60;
    var isOpen = new Array;
    if(data.length<1){
        return {};
    }
    for(var i =0;i<data.length;i++ ){
        var StartTime = new Date(data[i].toObject().StartTime).getHours()+new Date(data[i].toObject().StartTime).getMinutes()/60;
        var EndTime = new Date(data[i].toObject().EndTime).getHours()+new Date(data[i].toObject().EndTime).getMinutes()/60;
        if(StartTime<nowTime && nowTime<EndTime){
            isOpen.push(data[i]);
        }
    }

    var nowHours = today.getHours();
    var nowMinutes = today.getMinutes();
    var timeTilNextEvent = (hours*60 +minutes)-(nowHours*60+nowMinutes);
    var vaildpois = new Array;
    var startLoc = (events[0].Location);
    var endloc = (events[1].Location);
    for(var i = 0; i<isOpen.length;i++){
        var timeToPOI=0;
        var timeFromPOI=0;
        if(startLoc == "NULL"){
            timeToPOI=0;
        }else{
            var timemap = await TimeMapTable.find({'startLocation':startLoc,'endLocation':isOpen[i].toObject().Location});
            if(timemap && timemap.length > 0){
            timeToPOI = timemap[0].toObject().timeTo;
            };
        }
        if(endloc == "NULL"){
            timeFromPOI=0;
        }else{
            var timemap = await TimeMapTable.find({'startLocation':isOpen[i].toObject().Location,'endLocation':endloc});
            if(timemap && timemap.length > 0){
            timeFromPOI = timemap[0].toObject().timeTo;
            };
        }
        if(timeFromPOI+timeToPOI+isOpen[i].toObject().avgtime < timeTilNextEvent){
            vaildpois.push(isOpen[i]);
        }
    }
    
    return vaildpois;
}