import profileStyles from "@/styles/pages/profile.module.css";
import Image from "next/image";
import { BiUserCircle } from "react-icons/bi";
import { Router, useRouter } from "next/router";
import textStyles from "@/styles/utils/text.module.css";
import displayStyles from "@/styles/utils/displays.module.css";
import { useEffect, useState } from "react";
import CustomSelect from "@/components/ui_elements/CustomSelect";
import CandidateCard from "@/components/ui_elements/CandidateCard";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "@/firebase";
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
  const [users, setUsers] = useState([]);
  const [usersToDisplay, setUsersToDisplay] = useState([]);
  const [degreeFilter, setDegreeFilter] = useState("");
  const [schoolYearFilter, setSchoolYearFilter] = useState("All");
  const [nameFilter, setNameFilter] = useState("");
  const router = useRouter();

  const filterByName = (name) => {
    if (!nameFilter) {
      setUsersToDisplay(users);
    } else {
      let newUsers = users.filter((element) =>
        element.name.toLowerCase().includes(name.toLowerCase())
      );
      setUsersToDisplay(newUsers);
    }
  };

  const filterBy = (filterType, filterValue) => {
    if (!filterValue) {
      setUsersToDisplay(users);
    } else {
      let newUsers = users.filter(
        (userDetails) => userDetails[filterType] == filterValue
      );
      setUsersToDisplay(newUsers);
    }
  };

  useEffect(() => {
    filterByName(nameFilter);
  }, [nameFilter]);

  useEffect(() => {
    filterBy("degree", degreeFilter);
  }, [degreeFilter]);

  useEffect(() => {
    if (schoolYearFilter != "All") {
      filterBy("schoolYear", schoolYearFilter);
    } else {
      setUsersToDisplay(users);
    }
  }, [schoolYearFilter]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "users"), (snapshot) => {
      let newUsers = [];
      snapshot.docs.forEach((doc) => {
        newUsers.push(doc.data());
      });
      setUsers(newUsers);
      setUsersToDisplay(newUsers);
      console.log(newUsers);
    });

    return unsub;
  }, []);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <span className={textStyles.pageHeading}>Peer search</span>
      <input
        type="text"
        placeholder="Search"
        id="nameFilter"
        style={{ marginTop: "1rem" }}
        onChange={(e) => setNameFilter(e.target.value)}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          margin: "1rem 0",
        }}
      >
        <CustomSelect
          id="degree"
          title="Degree"
          options={["Tech", "Others"]}
          showSelectedOptionAsTitle
          handleChange={(e) => {
            setDegreeFilter(e.target.innerText);
          }}
          margin="1rem 0"
        />
        {degreeFilter || schoolYearFilter != "All" || nameFilter ? (
          <span
            onClick={() => {
              setDegreeFilter("");
              setSchoolYearFilter("All");
              setNameFilter("");
              document.querySelector("#nameFilter").value = "";
            }}
          >
            Clear
          </span>
        ) : null}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 .75rem",
          marginBottom: "1rem",
        }}
      >
        <span
          onClick={() => setSchoolYearFilter("All")}
          style={{
            textDecoration: schoolYearFilter == "All" ? "underline" : "none",
          }}
        >
          All
        </span>
        <span
          onClick={() => setSchoolYearFilter("Undergrad")}
          style={{
            textDecoration:
              schoolYearFilter == "Undergrad" ? "underline" : "none",
          }}
        >
          Undergrads
        </span>
        <span
          onClick={() => setSchoolYearFilter("Postgrad")}
          style={{
            textDecoration:
              schoolYearFilter == "Postgrad" ? "underline" : "none",
          }}
        >
          Postgrads
        </span>
        <span
          onClick={() => setSchoolYearFilter("Alumni")}
          style={{
            textDecoration: schoolYearFilter == "Alumni" ? "underline" : "none",
          }}
        >
          Alumni
        </span>
      </div>
      {usersToDisplay.map((element, idx) => {
        return (
          <div
            key={`peer${idx}`}
            onClick={() => router.push(`/users/${element.id}`)}
          >
            <CandidateCard userDetails={element} />
          </div>
        );
      })}
    </div>
  );
};

export default PeersPage;
