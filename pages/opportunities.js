import OpportunityCard from "@/components/ui_elements/OpportunityCard";
import CustomSelect from "@/components/ui_elements/CustomSelect";
import opportunityStyles from "@/styles/pages/opportunities.module.css";
import textStyles from "@/styles/utils/text.module.css";
import { BiUserCircle } from "react-icons/bi";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { getPostHeader } from "@/lib/dbFunctions";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "@/firebase";

const sOpportunities = [
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

const OpportunityPage = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [opportunitiesToDisplay, setOpportunitiesToDisplay] = useState([]);
  const [industryFilter, setIndustryFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const filterBy = (filterType, filterValue) => {
    if (!filterValue) {
      setOpportunitiesToDisplay(opportunities);
    } else {
      let newOpportunities = opportunities.filter(
        (opportunity) => opportunity[filterType] == filterValue
      );
      setOpportunitiesToDisplay(newOpportunities);
    }
  };

  useEffect(() => {
    filterBy("industry", industryFilter);
  }, [industryFilter]);

  useEffect(() => {
    filterBy("type", typeFilter);
  }, [typeFilter]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "opportunities"), (snapshot) => {
      let newOpportunities = [];
      snapshot.docs.forEach((doc) => {
        newOpportunities.push(doc.data());
      });
      setOpportunities(newOpportunities);
      setOpportunitiesToDisplay(newOpportunities);
      console.log(newOpportunities);
    });

    return unsub;
  }, []);
  return (
    <div className={opportunityStyles.container}>
      <span className={textStyles.pageHeading}>Opportunities</span>
      <div style={{ display: "flex", flexDirection: "row", margin: "1rem 0" }}>
        <CustomSelect
          id="industry"
          title="Industry"
          options={["Tech", "Others"]}
          showSelectedOptionAsTitle
          handleChange={(e) => {
            setIndustryFilter(e.target.innerText);
          }}
          margin="0 1rem 0 0"
        />
        <CustomSelect
          id="type"
          title="Type"
          options={["Internship", "Job", "Graduate programme", "Bursary"]}
          showSelectedOptionAsTitle
          handleChange={(e) => {
            setTypeFilter(e.target.innerText);
          }}
        />
        {industryFilter || typeFilter ? (
          <span
            onClick={() => {
              setIndustryFilter("");
              setTypeFilter("");
            }}
          >
            Clear
          </span>
        ) : null}
      </div>
      <div className={opportunityStyles.opportunitiesContainer}>
        {opportunitiesToDisplay.map((element, idx) => {
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
