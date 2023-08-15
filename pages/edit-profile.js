import profileStyles from "@/styles/pages/profile.module.css";
import Image from "next/image";
import { BiUserCircle } from "react-icons/bi";
import { Router, useRouter } from "next/router";
import textStyles from "@/styles/utils/text.module.css";
import displayStyles from "@/styles/utils/displays.module.css";
import { useEffect, useState } from "react";
import { handleInputChange } from "@/lib/inputHandlers";
import { doc, updateDoc } from "firebase/firestore";
import { db, storage } from "@/firebase";
import { MdCancel } from "react-icons/md";
import {
  deleteObject,
  getDownloadURL,
  uploadBytes,
  ref,
} from "firebase/storage";

const EditProfile = () => {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState({
    experience: [{ title: "", start: "", end: "" }],
    projects: [{ title: "", description: "", link: "" }],
  });

  const handleResourceUpload = async (resourceName) => {
    try {
      const file = document.querySelector(`#${resourceName}`).files[0];
      if (!file) return;

      const storageRef = ref(
        storage,
        `${userDetails.id}/${resourceName}/${resourceName}`
      );
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setUserDetails({ ...userDetails, [resourceName]: url });

      document.querySelector(`#${resourceName}`).value = "";
    } catch (e) {
      console.error(e);
    }
  };

  const deleteResource = async (resourceName) => {
    const storageRef = ref(
      storage,
      `${userDetails.id}/${resourceName}/${resourceName}`
    );
    try {
      await deleteObject(storageRef);
      setUserDetails({ ...userDetails, profilePhoto: "" });
    } catch (e) {
      console.error(e);
    }
  };

  const handleEdit = async () => {
    console.log(userDetails);
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

  const addProfileItem = (itemType) => {
    if (itemType == "experience") {
      setUserDetails({
        ...userDetails,
        experience: [
          ...userDetails.experience,
          { title: "", start: "", end: "" },
        ],
      });
    } else if (itemType == "projects") {
      setUserDetails({
        ...userDetails,
        projects: [...userDetails.projects, { title: "", link: "" }],
      });
    }
  };

  const removeProfileItem = (itemType, idx) => {
    setUserDetails({
      ...userDetails,
      [itemType]: userDetails[itemType].filter((element, i) => idx != i),
    });
  };

  const handleProfileItemChange = (e, itemType) => {
    let [source, idx] = e.target.id.split("-");
    let value = e.target.value;
    let newItem = userDetails[itemType];

    if (itemType == "experience") {
      newItem.forEach((element, i) => {
        if (idx == i) {
          if (source == "stillWorkThere") {
            if (e.target.checked) {
              element.end = "Present";
            } else {
              element.end = "";
            }
          } else {
            element[source] = value;
          }
        }
      });
    } else {
      newItem.forEach((element, i) => {
        if (idx == i) {
          element[source] = value;
        }
      });
    }
    setUserDetails({ ...userDetails, [itemType]: newItem });
  };

  const getSocialsValue = (socialType) => {
    return userDetails?.socials
      .filter((element) => {
        return element.split(":")[0] == socialType;
      })[0]
      .split(":")[1];
  };
  useEffect(() => {
    setUserDetails(JSON.parse(router.query.data));
  }, []);

  if (!userDetails.degree) {
    return <div>Loading..</div>;
  }

  return (
    <div>
      {console.log(userDetails)}
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
          {userDetails.profilePhoto ? (
            <button onClick={() => deleteResource("profilePhoto")}>
              Delete profile photo
            </button>
          ) : (
            <label htmlFor="profilePhoto" className={displayStyles.button}>
              Upload profile photo
            </label>
          )}

          <input
            id="profilePhoto"
            name="profilePhoto"
            type="file"
            style={{ display: "none" }}
            onChange={(e) => handleResourceUpload("profilePhoto")}
          />
        </div>
        <span>Video Intro</span>
        {userDetails.videoIntro ? (
          <button onClick={() => deleteResource("videoIntro")}>
            Delete video
          </button>
        ) : (
          <label htmlFor="videoIntro" className={displayStyles.button}>
            Upload video
          </label>
        )}

        <input
          type="file"
          id="videoIntro"
          style={{ display: "none" }}
          onChange={() => handleResourceUpload("videoIntro")}
        />
        {!userDetails.videoIntro ? (
          <div>No video</div>
        ) : (
          <video
            controls
            width="200"
            style={{ maxHeight: "140px", width: "auto" }}
            id="videoIntro"
          >
            <source src={userDetails.videoIntro} type="video/mp4" />
          </video>
        )}
        <span className={textStyles.heading2}>Socials</span>
        <input
          type="text"
          placeholder="GitHub"
          id="gitHub"
          defaultValue={getSocialsValue("gitHub")}
          onChange={addToSocials}
        />
        <input
          type="text"
          placeholder="Instagram"
          id="instagram"
          defaultValue={getSocialsValue("instagram")}
          onChange={addToSocials}
        />
        <input
          type="text"
          placeholder="LinkedIn"
          id="linkedIn"
          defaultValue={getSocialsValue("linkedIn")}
          onChange={addToSocials}
        />
        <input
          type="text"
          placeholder="YouTube"
          id="youTube"
          defaultValue={getSocialsValue("youTube")}
          onChange={addToSocials}
        />
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
        {userDetails.experience.map((element, idx) => {
          return (
            <div key={`experience${idx}`}>
              <input
                type="text"
                placeholder="title"
                id={`title-${idx}`}
                defaultValue={userDetails.experience[idx].title}
                onChange={(e) => handleProfileItemChange(e, "experience")}
              />
              <div style={{ display: "flex", flexDirection: "row" }}>
                <input
                  type="date"
                  placeholder="start"
                  id={`start-${idx}`}
                  defaultValue={userDetails.experience[idx].start}
                  onChange={(e) => handleProfileItemChange(e, "experience")}
                />
                {document.querySelector(`#stillWorkThere-${idx}`)?.checked ||
                userDetails.experience[idx].end == "Present" ? (
                  <span>Present</span>
                ) : (
                  <input
                    type="date"
                    placeholder="end"
                    id={`end-${idx}`}
                    defaultValue={userDetails.experience[idx].end}
                    onChange={(e) => handleProfileItemChange(e, "experience")}
                  />
                )}
              </div>
              <div>
                <span>Still work there?</span>
                <input
                  type="checkbox"
                  id={`stillWorkThere-${idx}`}
                  defaultChecked={userDetails.experience[idx].end == "Present"}
                  onChange={(e) => handleProfileItemChange(e, "experience")}
                />
              </div>
              {idx > 0 ? (
                <button onClick={() => removeProfileItem("experience", idx)}>
                  Remove
                </button>
              ) : null}
            </div>
          );
        })}
        <button
          onClick={() => addProfileItem("experience")}
          style={{ width: "fit-content" }}
        >
          Add
        </button>
        <span className={textStyles.heading2}>Projects</span>
        {userDetails.projects.map((element, idx) => {
          return (
            <div key={`project${idx}`}>
              <input
                type="text"
                placeholder="title"
                id={`title-${idx}`}
                defaultValue={userDetails.projects[idx].title}
                onChange={(e) => handleProfileItemChange(e, "projects")}
              />
              <input
                type="text"
                placeholder="Description"
                id={`description-${idx}`}
                defaultValue={userDetails.projects[idx].description}
                onChange={(e) => handleProfileItemChange(e, "projects")}
              />
              <input
                type="url"
                placeholder="link"
                id={`link-${idx}`}
                defaultValue={userDetails.projects[idx].link}
                onChange={(e) => handleProfileItemChange(e, "projects")}
              />
              <button
                onClick={() => addProfileItem("projects")}
                onChange={(e) => handleProfileItemChange(e, "projects")}
              >
                Add
              </button>
              {idx > 0 ? (
                <button onClick={() => removeProfileItem("projects", idx)}>
                  Remove
                </button>
              ) : null}
            </div>
          );
        })}
        <span className={textStyles.heading2}>Documents</span>
        {userDetails.resume ? (
          <div>
            <button>Delete resume</button>
            <span>{userDetails.resume}</span>
          </div>
        ) : (
          <label htmlFor="resume" className={displayStyles.button}>
            Upload resume
          </label>
        )}
        <input
          type="file"
          id="resume"
          style={{ display: "none" }}
          onChange={() => handleResourceUpload("resume")}
        />
        <button onClick={handleEdit}>Save changes</button>
      </div>
    </div>
  );
};

export default EditProfile;
