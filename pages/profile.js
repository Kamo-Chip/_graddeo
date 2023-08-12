import profileStyles from "@/styles/pages/profile.module.css";
import Image from "next/image";
import { BiUserCircle } from "react-icons/bi";
import { Router, useRouter } from "next/router";
import textStyles from "@/styles/utils/text.module.css";
import displayStyles from "@/styles/utils/displays.module.css";
import { useState } from "react";

const userDetails = {};
const ProfilePage = () => {
  const router = useRouter();
  const [tab, setTab] = useState(0);

  return (
    <div>
      <span className={textStyles.pageHeading}>Profile</span>
      <div className={profileStyles.container} style={{ marginTop: "1rem" }}>
        <div className={profileStyles.header}>
          <div>
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
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <span className={displayStyles.tag}>
              📜{userDetails.degree ? userDetails.degree : "Not given"}
            </span>
            <span className={displayStyles.tag}>
              🏛️{userDetails.university ? userDetails.university : "Not given"}
            </span>
            <span className={displayStyles.tag}>
              {userDetails.schoolYear == "Undergraduate"
                ? "🐣"
                : userDetails.schoolYear == "Postgraduate"
                ? "🐥"
                : userDetails.schoolYear == "Alumni"
                ? "🐔"
                : "Not given"}
              {userDetails.schoolYear}
            </span>
            <span>Num connections</span>
          </div>
          <button>Edit profile</button>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span>Name</span>
          <span>Bio</span>
          <span>Video Intro</span>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          margin: "1rem 0",
          justifyContent: "space-evenly",
        }}
      >
        <span onClick={() => setTab(0)}>Info</span>
        <span onClick={() => setTab(1)}>Posts</span>
      </div>
      {tab == 0 ? (
        <>
          <div className={profileStyles.container}>
            <span className={textStyles.heading2}>Socials</span>
          </div>
          <div
            className={profileStyles.container}
            style={{ marginTop: "1rem" }}
          >
            <span className={textStyles.heading2}>Education</span>
          </div>
          <div
            className={profileStyles.container}
            style={{ marginTop: "1rem" }}
          >
            <span className={textStyles.heading2}>Skills</span>
          </div>
          <div
            className={profileStyles.container}
            style={{ marginTop: "1rem" }}
          >
            <span className={textStyles.heading2}>Experience</span>
          </div>
          <div
            className={profileStyles.container}
            style={{ marginTop: "1rem" }}
          >
            <span className={textStyles.heading2}>Projects</span>
          </div>
        </>
      ) : tab == 1 ? (
        <></>
      ) : null}
    </div>
  );
};

export default ProfilePage;
