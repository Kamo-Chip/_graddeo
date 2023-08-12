import textStyles from "@/styles/utils/text.module.css";
import CustomSelect from "@/components/ui_elements/CustomSelect";
import EventCard from "@/components/ui_elements/EventCard";

const EventsPage = () => {
  const events = [
    {
      title: "AdaptIT Hackathon",
      date: "29 August 2023",
      company: "AdaptIT",
      industry: "Software",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur",
      link: "#",
      image: "",
      postedBy: { name: "Kamogelo Khumalo", id: "" },
    },
    {
      title: "AdaptIT Hackathon",
      date: "29 August 2023",
      company: "AdaptIT",
      industry: "Software",
      description: "",
      link: "#",
      image: "",
      postedBy: { name: "Kamogelo Khumalo", id: "" },
    },
  ];
  return (
    <div>
      <span className={textStyles.pageHeading}>Events</span>
      <div style={{ display: "flex", flexDirection: "row", margin: "1rem 0" }}>
        <CustomSelect
          id="industry"
          title="Industry"
          options={["Tech", "Others"]}
          showSelectedOptionAsTitle
          handleChange={() => {}}
          margin="0 1rem 0 0"
        />
      </div>
      <div>
        {events.map((element, idx) => {
          return (
            <div key={`opportunity${idx}`} style={{ marginBottom: "1rem" }}>
              <EventCard event={element} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EventsPage;
