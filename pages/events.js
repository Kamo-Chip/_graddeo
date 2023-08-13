import textStyles from "@/styles/utils/text.module.css";
import CustomSelect from "@/components/ui_elements/CustomSelect";
import EventCard from "@/components/ui_elements/EventCard";
import { useEffect, useState } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "@/firebase";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [eventsToDisplay, setEventsToDisplay] = useState([]);
  const [industryFilter, setIndustryFilter] = useState("");

  const filterByIndustry = (industry) => {
    if (!industry) {
      setEventsToDisplay(events);
    } else {
      let newEvents = events.filter((event) => event.industry == industry);
      setEventsToDisplay(newEvents);
    }
  };

  useEffect(() => {
    filterByIndustry(industryFilter);
  }, [industryFilter]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "events"), (snapshot) => {
      let newEvents = [];
      snapshot.docs.forEach((doc) => {
        newEvents.push(doc.data());
      });
      setEvents(newEvents);
      setEventsToDisplay(newEvents);
      console.log(newEvents);
    });

    return unsub;
  }, []);

  return (
    <div>
      <span className={textStyles.pageHeading}>Events</span>
      <div style={{ display: "flex", flexDirection: "row", margin: "1rem 0" }}>
        <CustomSelect
          id="industry"
          title="Industry"
          options={["Tech", "Others"]}
          value={industryFilter}
          showSelectedOptionAsTitle
          handleChange={(e) => {
            setIndustryFilter(e.target.innerText);
          }}
          margin="0 1rem 0 0"
        />
        {industryFilter ? (
          <span onClick={() => setIndustryFilter("")}>Clear</span>
        ) : null}
      </div>
      <div>
        {eventsToDisplay.length ? (
          eventsToDisplay.map((element, idx) => {
            return (
              <div key={`opportunity${idx}`} style={{ marginBottom: "1rem" }}>
                <EventCard event={element} />
              </div>
            );
          })
        ) : (
          <div>No events to display</div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;
