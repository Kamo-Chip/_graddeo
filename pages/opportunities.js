import OpportunityCard from "@/components/ui_elements/OpportunityCard";
import CustomSelect from "@/components/ui_elements/CustomSelect";
import opportunityStyles from "@/styles/pages/opportunities.module.css";
import textStyles from "@/styles/utils/text.module.css";
import { BiUserCircle } from "react-icons/bi";

const OpportunityPage = () => {
  const opportunities = [
    {
      title: "Technology Graduate Programme",
      type: "Graduate programme",
      industry: "Software",
      company: "Accenture",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur",
      link: "#",
      image: "",
      postedBy: {
        name: "Kamogelo Khumalo",
        id: "#",
      },
    },
    {
      title: "Technology Graduate Programme",
      type: "Graduate programme",
      industry: "Software",
      company: "Accenture",
      description: "",
      link: "#",
      image: "",
      postedBy: {
        name: "Kamogelo Khumalo",
        id: "#",
      },
    },
  ];
  return (
    <div className={opportunityStyles.container}>
      <span className={textStyles.pageHeading}>Opportunities</span>
      <div style={{ display: "flex", flexDirection: "row", margin: "1rem 0" }}>
        <CustomSelect
          id="industry"
          title="Industry"
          options={["Tech", "Others"]}
          showSelectedOptionAsTitle
          handleChange={() => {}}
          margin="0 1rem 0 0"
        />
        <CustomSelect
          id="type"
          title="Type"
          options={["Tech", "Others"]}
          showSelectedOptionAsTitle
          handleChange={() => {}}
        />
      </div>
      <div className={opportunityStyles.opportunitiesContainer}>
        {opportunities.map((element, idx) => {
          return (
            <div key={`opportunity${idx}`} style={{ marginBottom: "1rem" }}>
              <OpportunityCard opportunity={element} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OpportunityPage;
