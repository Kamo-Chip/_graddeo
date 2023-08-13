import profileStyles from "@/styles/pages/profile.module.css";
import Image from "next/image";
import { BiUserCircle } from "react-icons/bi";
import { Router, useRouter } from "next/router";
import textStyles from "@/styles/utils/text.module.css";
import displayStyles from "@/styles/utils/displays.module.css";
import { useEffect, useState } from "react";
import { handleInputChange } from "@/lib/inputHandlers";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { MdCancel } from "react-icons/md";

const EditProfile = () => {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState(null);

  const handleEdit = async () => {
    await updateDoc(doc(db, "users", userDetails.id), userDetails);
    router.push(`/users/${userDetails.id}`);
  };

  const addToSocials = (e) => {
    setUserDetails({
      ...userDetails,
      socials: [...userDetails.socials, `${e.target.id}:${e.target.value}`],
    });
  };

  const addToSkills = (e) => {
    let value = document.querySelector("#skills").value;
    if (!userDetails.skills.includes(value)) {
      console.log(value);
      setUserDetails({
        ...userDetails,
        skills: [...userDetails.skills, value],
      });
    } else {
      console.log(value);
    }
  };

  const removeSkill = (e) => {
    let value = e.currentTarget.id.split("-")[1];
    let newSkills = userDetails.skills.filter((element) => value != element);
    setUserDetails({ ...userDetails, skills: newSkills });
  };

  useEffect(() => {
    setUserDetails(JSON.parse(router.query.data));
  }, []);

  if (!userDetails) {
    return <div>Loading..</div>;
  }

  return (
    <div>
      <span className={textStyles.pageHeading}>Profile</span>
      <div className={profileStyles.container} style={{ marginTop: "1rem" }}>
        <span>Degree</span>
        <input
          type="text"
          id="degree"
          defaultValue={userDetails.degree}
          onChange={(e) => handleInputChange(e, userDetails, setUserDetails)}
        />
        <span>University</span>
        <input
          type="text"
          id="university"
          defaultValue={userDetails.university}
          onChange={(e) => handleInputChange(e, userDetails, setUserDetails)}
        />
        <span>School year</span>
        <input
          type="text"
          id="schoolYear"
          defaultValue={userDetails.schoolYear}
          onChange={(e) => handleInputChange(e, userDetails, setUserDetails)}
        />
        <span>Name</span>
        <input
          type="text"
          id="name"
          defaultValue={userDetails.name}
          onChange={(e) => handleInputChange(e, userDetails, setUserDetails)}
        />
        <span>Bio</span>
        <textarea
          type="text"
          id="bio"
          defaultValue={userDetails.bio}
          onChange={(e) => handleInputChange(e, userDetails, setUserDetails)}
        />
        <div style={{ display: "flex", flexDirection: "row" }}>
          {userDetails.profilePhoto ? (
            <Image
              loader={() => userDetails.profilePhoto}
              src={userDetails.profilePhoto}
              style={{ borderRadius: "50%" }}
              height={120}
              width={120}
              alt=""
            />
          ) : (
            <span>
              <BiUserCircle size="120px" />
            </span>
          )}
          <label className={displayStyles.button}>Upload</label>
          <input type="file" style={{ display: "none" }} />
        </div>
        <span>Video Intro</span>
        <label htmlFor="videoIntro" className={displayStyles.button}>
          Upload video
        </label>

        <input type="file" id="videoIntro" style={{ display: "none" }} />
        {userDetails.video ? <video src={userDetails.videoIntro} /> : null}
        <span className={textStyles.heading2}>Socials</span>
        <input
          type="text"
          placeholder="GitHub"
          id="gitHub"
          onChange={addToSocials}
        />
        <input
          type="text"
          placeholder="Instagram"
          id="instagram"
          onChange={addToSocials}
        />
        <input
          type="text"
          placeholder="LinkedIn"
          id="linkedIn"
          onChange={addToSocials}
        />
        <input
          type="text"
          placeholder="YouTube"
          id="youTube"
          onChange={addToSocials}
        />
        <span className={textStyles.heading2}>Education</span>
        <div>
          <input type="text" placeholder="" />
          <div style={{ display: "flex", flexDirection: "row" }}>
            <input type="date" placeholder="start" />
            <input type="date" placeholder="end" />
          </div>
          <div>
            <span>Still work there?</span>
            <input type="checkbox" />
          </div>
        </div>
        <div>
          <input type="text" placeholder="title" />
          <div style={{ display: "flex", flexDirection: "row" }}>
            <input type="date" placeholder="start" />
            <input type="date" placeholder="end" />
          </div>
          <div>
            <span>Still work there?</span>
            <input type="checkbox" />
          </div>
        </div>
        <span className={textStyles.heading2}>Skills</span>
        <div>
          <input type="text" placeholder="Skill" id="skills" />
          <span className={displayStyles.button} onClick={addToSkills}>
            Add
          </span>
        </div>
        <div>
          {userDetails.skills.map((element, idx) => {
            return (
              <div key={`skill${idx}`} className={displayStyles.tag}>
                {element}
                <span
                  style={{ marginLeft: "1rem" }}
                  id={`rem-${element}`}
                  onClick={removeSkill}
                >
                  <MdCancel />
                </span>
              </div>
            );
          })}
        </div>
        <span className={textStyles.heading2}>Experience</span>
        <div>
          <input type="text" placeholder="title" />
          <div style={{ display: "flex", flexDirection: "row" }}>
            <input type="date" placeholder="start" />
            <input type="date" placeholder="end" />
          </div>
          <div>
            <span>Still work there?</span>
            <input type="checkbox" />
          </div>
        </div>

        <span className={textStyles.heading2}>Projects</span>
        <div>
          <input type="text" placeholder="title" />
          <input type="text" placeholder="link" />
        </div>
        <button onClick={handleEdit}>Save changes</button>
      </div>
    </div>
  );
};

export default EditProfile;
