import { auth, db } from "@/firebase";
import onboardPageStyles from "@/styles/pages/onboard.module.css";
import { useAuthState } from "react-firebase-hooks/auth";
import CustomSelect from "@/components/ui_elements/CustomSelect";
import { MdImage } from "react-icons/md";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";

const OnboardCandidatePage = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [userDetails, setUserDetails] = useState({
    id: "",
    name: user.displayName,
    bio: "",
    connections: [],
    videoIntro: null,
    socials: [],
    education: [],
    skills: [],
    experience: [],
    projects: [],
    profilePhoto: "",
    posts: [],
    university: "",
    degree: "",
    schoolYear: "",
    userType: "candidate",
  });

  const handleSelectChange = (e) => {
    const source = e.target.parentElement.parentElement.id;
    const value = e.target.innerText;

    setUserDetails({ ...userDetails, [source]: value });
  };

  const handleInputChange = (e) => {
    const source = e.target.id;
    const { value } = e.target;

    setUserDetails({ ...userDetails, [source]: value });
  };

  //Not yet implemented
  const handleFileUpload = () => {
    console.log("Must implement");
  };

  const handleSubmit = async () => {
    console.log(userDetails);
    try {
      await setDoc(doc(db, "users", user.uid), {
        ...userDetails,
        id: user.uid,
      });
      router.push("/feed");
    } catch (e) {
      console.error(e);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className={onboardPageStyles.container}>
      <span>{"Let's get to know you"}</span>
      <input
        type="text"
        id="name"
        onChange={handleInputChange}
        defaultValue={user.displayName}
      />
      <CustomSelect
        id="university"
        title="University"
        options={["Wits", "UP"]}
        showSelectedOptionAsTitle
        handleChange={handleSelectChange}
        margin="0 1rem 0 0"
      />
      <CustomSelect
        id="schoolYear"
        title="School year"
        options={["Undergrad", "Postgrad", "Alumni"]}
        showSelectedOptionAsTitle
        handleChange={handleSelectChange}
        margin="0 1rem 0 0"
      />
      <CustomSelect
        id="degree"
        title="Degree"
        options={["Computer Science", "Arts"]}
        showSelectedOptionAsTitle
        handleChange={handleSelectChange}
        margin="0 1rem 0 0"
      />
      <label
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "200px",
          border: "dashed 2px var(--border-color)",
        }}
        htmlFor="profilePhoto"
      >
        <MdImage />
        Add image
      </label>
      <input
        type="file"
        id="profilePhoto"
        style={{ display: "none" }}
        onChange={handleFileUpload}
      />
      <button onClick={handleSubmit}>Create profile</button>
    </div>
  );
};

export default OnboardCandidatePage;
