import mongoose from 'mongoose';
import EventTable from '../models/eventmodel.js';


//TODO create function to return only the events of a certain day

export const createEvent = async (req, res) => {
    const { Subject, Location, StartTime, EndTime, isAllDay, Description, RecurrenceRule, Id, sfsuid } = req.body;
    //console.log(req.body);
    const newData = new EventTable({
        eventid: Id,
        sfsuid: sfsuid,
        Subject: Subject,
        Description: Description,
        isAllDay: isAllDay,
        StartTime: StartTime,
        EndTime: EndTime,
        days: StartTime,
        RecurrenceRule: RecurrenceRule,
        startDate: StartTime,
        endDate: EndTime,
        Location: Location,
        tags: ""
    });

    try {
        newData.save();
        res.status(202).json({ event: newData });
    }

    catch (err) {
        res.status(409).json({ message: "data create failed" });
    }
};

export const getEvents = async (req, res) => {
    try {
        const events = await EventTable.find({ 'sfsuid': req.params.sfsuid });
        res.json(events);
    }

    catch (err) {
        res.status(409).json({ message: "data not found" });
    }
};

export const updateEvent = async (req, res) => {

    const { Subject, Location, StartTime, EndTime, isAllDay, Description, RecurrenceRule, _id, sfsuid } = req.body;

    try {
        const event = await EventTable.findOneAndUpdate({'_id': _id, "sfsuid": sfsuid },
            {
                "Subject": Subject, "Location": Location, "StartTime": StartTime,
                "EndTime": EndTime, "isAllDay": isAllDay, "Description": Description,
                "days": StartTime, "RecurrenceRule": RecurrenceRule, "startDate": StartTime, "endDate": EndTime
            }, { new: true });

        res.status(202).json(event);
    } catch (err) {
        console.log(err);
        res.status(409).json({ message: "data update failed" });
    }
};

export const deleteEvent = async (req, res) => {

    const { objid, eventid } = req.query;
    const {sfsuid} = req.body;


    try {

        let event;

        if (objid !== 'undefined') {
            event = await EventTable.findOneAndDelete({_id:objid, sfsuid:sfsuid});
        }

        else if (eventid !== 'undefined') {
            event = await EventTable.findOneAndDelete({ eventid: +eventid, sfsuid:sfsuid});
        }
        res.json(event);
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ message: "delete unsuccessful" });
    }
};
