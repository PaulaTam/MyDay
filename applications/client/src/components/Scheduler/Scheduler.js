import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ScheduleComponent,
  Inject,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
} from "@syncfusion/ej2-react-schedule";
import { TreeViewComponent } from '@syncfusion/ej2-react-navigations';
import "./Scheduler.css";
import { useForm } from "react-hook-form";

import { createEvent, updateEvent, getEvents, deleteEvent, getSuggestedEvents } from "../../actions/events";
import { getPreference, createPreference, updatePreference, deletePreference } from "../../actions/preferences";
import { Button, Modal, Form, ListGroup } from 'react-bootstrap';
export const Scheduler = () => {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const [treeData, setTreeData] = useState([]);
  const [schedulerData, setschedulerData] = useState([]);
  const [suggestedEvents, setSuggestedEvents] = useState([]);
  const [currentDayData, setCurrentDayData] = useState([]);
  const [tags, setTags] = useState([]);
  const [relative, setRelative] = useState("");
  const [showPrefsWindow, setShowPrefsWindow] = useState(false);
  const { handleSubmit, register } = useForm();
  const handleClose = () => setShowPrefsWindow(false);
  const handleShow = () => setShowPrefsWindow(true);
  let schedulerRef = useRef(null);

  const initSuggestedEvents = () => {

    // calls api to retrieve and set suggested events
    getSuggestedEvents(currentDayData).then((res) => {
      let { data } = res;

      if (data === undefined || data === "no suggestion") {
        return;
      }

      setSuggestedEvents(data);
      let tempSuggestArr = [];
      data.map((elem, idx) => {
        tempSuggestArr.push({ Id: elem.ID, Name: elem.Subject });
      });

      setTreeData(tempSuggestArr);
    }).catch((err) => {
      console.log(err);
    });
  };

  const clearPrefs = () => {
    setTags([]);
    setRelative("");
  };

  const initPreferences = (eventid) => {

    getPreference(eventid).then((data) => {

      if (data === undefined || data.length === 0) {
        clearPrefs();
        return;
      }

      setTags(data[0].tags);
      setRelative(data[0].relative);

    }).catch((err) => {
      clearPrefs();
      console.log(err);
    });

  };

  useEffect(() => {
    if (showPrefsWindow) {
      document.getElementsByClassName("e-dlg-container e-schedule-dialog e-dlg-center-center e-schedule-dialog-container")[0].style.display = "none";
    }
  }, [showPrefsWindow]);

  useEffect(() => {
    getEvents(user?.sfsuid).then((res) => {

      var start = new Date();
      start.setHours(8, 0, 0, 0);

      var end = new Date();
      end.setHours(16, 59, 59, 999);
      let { data } = res;
      setschedulerData(data);
    }).catch((err) => {
      console.log(err);
    });
  }, []);



  useEffect(() => {
    initSuggestedEvents();
  }, [currentDayData]);

  const eventAction = async (e) => {

    if (e.requestType === "eventCreated") {



      try {
        let data = await createEvent(e.addedRecords[0]);

        if (data?.event._id && relative && tags.length > 0) {
          const prefData = { eventid: data?.event._id, relative: relative, tags: tags };
          await createPreference(prefData);
        }

      }

      catch (err) {
        console.log(err);
      }

    }
    else if (e.requestType === "eventChanged") {
      try {
        let data = await updateEvent(e.changedRecords[0]);
        setschedulerData([...schedulerData.map((elem) => elem._id === data._id ? data : elem)]);

        if (data._id && relative && tags.length > 0) {
          const prefData = { eventid: data._id, relative: relative, tags: tags };
          await updatePreference(prefData);
        }

      }

      catch (err) {
        console.log(err);
      }
    }
    else if (e.requestType === "eventRemoved") {

      try {
        const data = await deleteEvent(e.deletedRecords[0]._id, e.deletedRecords[0].Id);
        setschedulerData([...schedulerData.filter((elem) => elem._id !== data._id)]);
        
        if (e.deletedRecords[0]._id) {
          await deletePreference(e.deletedRecords[0]._id);
        }
      }

      catch (err) {
        console.log(err);
      }
    }
  };

  const onSavePreference = (prefData) => {

    let tempTagsArray = [];

    for (let key in prefData) {
      if (prefData.hasOwnProperty(key)) {
        if (prefData[key] === true) {
          tempTagsArray.push(key);
        }
      }
    }

    setTags(tempTagsArray);
    setRelative(prefData.relative);
    handleClose();
  };

  const PreferenceWindow = () => {

    return (
      <>
        <Modal show={showPrefsWindow} onHide={() => { handleClose(); showEventWindow(); }} backdrop="static">
          <Modal.Header className="pref-window-bg" closeButton>
            <Modal.Title data-testid="preferences-title-testid">Preferences</Modal.Title>
          </Modal.Header >
          <Modal.Body data-testid="tags-title-testid" className="pref-title">Tags</Modal.Body>

          <Form onSubmit={handleSubmit(onSavePreference)}>
            <div id="tags-dropdown-id" className="tags-dropdown" >
              <span className="anchor">Select Tags</span>
              <ListGroup data-testid="tags-dropdown-testid" className="tag-items" as="ul">
                <ListGroup.Item as="li"><input {...register("Bar")} type="checkbox" />Bar</ListGroup.Item>
                <ListGroup.Item as="li"><input {...register("Boba")} type="checkbox" />Boba</ListGroup.Item>
                <ListGroup.Item as="li"><input {...register("Break")} type="checkbox" />Break</ListGroup.Item>
                <ListGroup.Item as="li"><input {...register("Breakfast")} type="checkbox" />Breakfast</ListGroup.Item>
                <ListGroup.Item as="li"><input {...register("Burger")} type="checkbox" />Burger</ListGroup.Item>
                <ListGroup.Item as="li"><input {...register("Coffee")} type="checkbox" />Coffee</ListGroup.Item>
                <ListGroup.Item as="li"><input {...register("Food")} type="checkbox" />Food</ListGroup.Item>
                <ListGroup.Item as="li"><input {...register("Gym")} type="checkbox" />Gym</ListGroup.Item>
                <ListGroup.Item as="li"><input {...register("Ice Cream")} type="checkbox" />Ice Cream</ListGroup.Item>
                <ListGroup.Item as="li"><input {...register("Pizza")} type="checkbox" />Pizza</ListGroup.Item>
                <ListGroup.Item as="li"><input {...register("Reading")} type="checkbox" />Reading</ListGroup.Item>
                <ListGroup.Item as="li"><input {...register("Relax")} type="checkbox" />Relax</ListGroup.Item>
                <ListGroup.Item as="li"><input {...register("Smoothie")} type="checkbox" />Smoothie</ListGroup.Item>
                <ListGroup.Item as="li"><input {...register("Study")} type="checkbox" />Study</ListGroup.Item>
                <ListGroup.Item as="li"><input {...register("Swimming")} type="checkbox" />Swimming</ListGroup.Item>
                <ListGroup.Item as="li"><input {...register("Workout")} type="checkbox" />Workout</ListGroup.Item>
              </ListGroup>
            </div>

            <p className="current" data-testid="current-tags-testid">Current Tags: {tags.join(", ")}</p>
            <Modal.Body data-testid="relative-title-testid" className="pref-title">Relative</Modal.Body>
            <Form.Select data-testid="relative-dropdown-testid" className="relative-dropdown" aria-label="Default select example" {...register("relative")}>
              <option value="Before">Before</option>
              <option value="After">After</option>
            </Form.Select>
            <p className="current" data-testid="current-relative-testid">Current Relative: {relative}</p>
            <br></br>
            <Button data-testid="savechanges-btn-testid" variant="primary" type="submit" style={{ marginRight: "5px" }} onClick={() => showEventWindow()}>
              Save Changes
            </Button>
            <Button data-testid="close-btn-testid" variant="secondary" onClick={() => { handleClose();clearPrefs(); showEventWindow(); }}>
              Close
            </Button>
          </Form>

        </Modal>
      </>
    );
  };

  const showEventWindow = () => {
    document.getElementsByClassName("e-dlg-container e-schedule-dialog e-dlg-center-center e-schedule-dialog-container")[0].style.display = "flex";
  };

  const handleTagsDropdown = () => {

    setTimeout(() => {
      let checkList = document.getElementById('tags-dropdown-id');
      if (checkList) {
        checkList.getElementsByClassName('anchor')[0].onclick = function (evt) {
          if (checkList.classList.contains('visible'))
            checkList.classList.remove('visible');
          else
            checkList.classList.add('visible');
        };
      }

    }, 200);
  };

  const onPopUpOpen = (e) => {

    if (e.data?._id && e.type === "Editor") {
      initPreferences(e.data._id);
    }

    if (!document.getElementById("prefs-btn-id")) {
      let temppreferenceElem = document.createElement('button');
      temppreferenceElem.id = "prefs-btn-id";
      temppreferenceElem.className = "e-schedule-dialog e-control e-btn e-lib e-primary e-event-save e-flat";
      temppreferenceElem.innerHTML = 'Add Prefs';
      temppreferenceElem.onclick = () => { handleShow(); handleTagsDropdown(); };
      document.getElementsByClassName("e-footer-content")[0].appendChild(temppreferenceElem);
    }

    else {
      document.getElementById("prefs-btn-id").onclick = () => { handleShow(); handleTagsDropdown(); };
    }


    if (!e.target?.className) {
      return;
    }

    // if event is being updated then don't do anything
    if (e.target === undefined || e.target.className === "e-appointment e-appointment-border" || e.target.className === "e-appointment") {
      return;
    }

    // sets custom dropdown location layout for new events
    setTimeout(() => {
      let template = document.createElement("template");
      template.innerHTML = `<div class="e-location-container" id="e-location-container-id">
          <div class="e-float-input e-control-wrapper">
              <select data-testid="loc-dropdown-testid" class="e-location e-field" type="text" name="Location" value id="Location" title="Location" aria-labelledby="label_Location">
                  <option value="Burk Hall, Holloway Avenue, San Francisco, CA, USA" selected>Burk Hall</option>
                  <option value="Lam Family College of Business, Business, 1600 Holloway Ave, San Francisco, CA 94132, USA">Business</option>
                  <option value="School SFSU, Creative Arts, Holloway Avenue, San Francisco, CA, USA">Creative Arts</option>
                  <option value="SFSU Psychology Clinic, San Francisco State University, Ethnic Studies & Psychology, Holloway Avenue, San Francisco, CA, USA">Ethnic Studies & Psychology</option>
                  <option value="Fine Arts Gallery, San Francisco State University, Holloway Avenue, San Francisco, CA, USA">Fine Arts</option>
                  <option value="Mashouf Wellness Center, Font Boulevard,h San Francisco, CA, USA">Gym</option>
                  <option value="Hensill Hall, Holloway Avenue, San Francisco, CA, USA">Hensill Hall</option>
                  <option value="College of Health & Social Sciences (CHSS) | SFSU, Holloway Avenue, San Francisco, CA, USA">HSS</option>
                  <option value="Humanities Building, San Francisco, CA, USA">Humanities</option>
                  <option value="J. Paul Leonard Library, Holloway Avenue, San Francisco, CA, USA">Library</option>
                  <option value="Marcus Hall (George and Judy Marcus Hall), 8 Tapia Dr, San Francisco, CA 94132">Marcus Hall</option>
                  <option value="SFSU College of Science and Engineering, San Francisco State University, Holloway Avenue, San Francisco, CA, USA">Science</option>
                  <option value="Thornton Hall, 20th Avenue, San Francisco, CA, USA">Thornton Hall</option>
              </select>
              <input id="loc-disabled-inputbox-id" disabled/>
              <label class="e-float-text e-label-top" id="label_Location" for="Location">Location</label>
          </div>
          </div>`;

      const oldNode = document.getElementsByClassName("e-location-container");
      oldNode[0].replaceWith(template.content.firstChild);

    }, 500);

  };

  // set start and end times of current day
  const currentDayStartEnd = () => {
    var start = new Date();
    start.setHours(0, 0, 0, 0);

    var end = new Date();
    end.setHours(23, 59, 59, 999);

    return [start, end];
  };

  //get events for current day
  const getTodaysEvents = (e) => {
    setCurrentDayData(
      schedulerRef.current.getEvents(
        currentDayStartEnd()[0],
        currentDayStartEnd()[1],
        true
      )
    );
  };

  const dragdropsuggestion = (args) => {

    for (let e of suggestedEvents) {
      if (e.ID === +args.draggedNodeData.id) {
        let eventData = {
          Id: e.ID,
          Subject: args.draggedNodeData.text,
          StartTime: currentDayStartEnd()[0],
          EndTime: currentDayStartEnd()[1],
          IsAllDay: e.IsAllDay,
          Location: e.Location,
          RecurrenceRule: e.RecurrenceRule,
          Description: e.Description
        };

        schedulerRef.current.openEditor(eventData, "Add", true);
      }
    }
  };

  const showSuggestions = () => {
    if (document.getElementById("suggestions-id").style.display === "none") {
      document.getElementById("suggestions-id").style.display = "block";
    }
    else {
      document.getElementById("suggestions-id").style.display = "none";
    }
  };

  return (
    <div className="schedule-container" data-testid="scheduler-container-testid">
    <div className="scheduler-btns-container">
      <div className="suggestion-containter" data-testid ="suggestions-containter-testid">
        {treeData.length > 0 ?
          <button className="suggestion-btn dropdown-toggle" data-testid ="suggestions-button-testid" role="button" onClick={showSuggestions}>
            Suggestions
          </button>
          :
          <button type="button" data-testid ="suggestions-default-testid" className="suggestion-btn">
            No suggestions
          </button>}
        <div id="suggestions-id" data-testid ="suggestions-id-testid" style={{ display: "none" }} className=" treeview-component">
          <TreeViewComponent fields={{ dataSource: treeData, id: "Id", text: 'Name' }} allowDragAndDrop={true}
            nodeDragStop={dragdropsuggestion} />
        </div>
      </div>
      <button className="map-btn"> <Link className="map-link" to='/map' state={currentDayData}>Map</Link></button>
    </div>

      {handleShow && <PreferenceWindow />}
      <ScheduleComponent
        data-testid="scheduler-component-testid"
        ref={schedulerRef}
        eventSettings={{
          dataSource: schedulerData,
          fields: {
            subject: { name: "Subject", validation: { required: true } },
          },
          location: {
            name: "Location",
            validation: {
              required: true,
            },
          },
          enableTooltip: true,
        }}
        actionComplete={(e) => eventAction(e)}
        dataBound={(e) => getTodaysEvents(e)}
        popupOpen={(e) => onPopUpOpen(e)}
      >
        <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
      </ScheduleComponent>
    </div>
  );
};
