import profileStyles from "@/styles/pages/profile.module.css";
import Image from "next/image";
import { BiUserCircle } from "react-icons/bi";
import { Router, useRouter } from "next/router";
import textStyles from "@/styles/utils/text.module.css";
import displayStyles from "@/styles/utils/displays.module.css";
import { useState } from "react";
import CustomSelect from "@/components/ui_elements/CustomSelect";
import CandidateCard from "@/components/ui_elements/CandidateCard";

const peers = [
  {
    name: "Kamogelo Khumalo",
    university: "Wits",
    schoolYear: "Undergrad",
    degree: "Computer Science",
    image: "",
  },
];
const PeersPage = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <span className={textStyles.pageHeading}>Peer search</span>
      <input type="text" placeholder="Search" style={{ marginTop: "1rem" }} />
      <CustomSelect
        id="degree"
        title="Degree"
        options={["Tech", "Others"]}
        showSelectedOptionAsTitle
        handleChange={() => {}}
        margin="1rem 0"
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 .75rem",
          marginBottom: "1rem",
        }}
      >
        <span>All</span>
        <span>Undergrads</span>
        <span>Postgrads</span>
        <span>Alumni</span>
      </div>
      {peers.map((element, idx) => {
        return (
          <div key={`peer${element}`}>
            <CandidateCard userDetails={element} />
          </div>
        );
      })}
    </div>
  );
};

export default PeersPage;
