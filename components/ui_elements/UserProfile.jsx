import profileStyles from "@/styles/pages/profile.module.css";
import Image from "next/image";
import { BiUserCircle } from "react-icons/bi";
import { Router, useRouter } from "next/router";
import textStyles from "@/styles/utils/text.module.css";
import displayStyles from "@/styles/utils/displays.module.css";
import { useEffect, useState } from "react";
import { getPostsFromIds } from "@/lib/dbFunctions";
import PostCard from "./PostCard";

const UserProfile = ({ userDetails, isSameUser }) => {
  const router = useRouter();
  const [tab, setTab] = useState(0);
  const [posts, setPosts] = useState([]);

  const handleEditProfile = () => {
    router.push(
      {
        pathname: "/edit-profile",
        query: { data: JSON.stringify(userDetails) },
      },
      "/edit-profile"
    );
  };

  const handleMessage = () => {};

  useEffect(() => {
    getPostsFromIds(userDetails.posts).then((res) => {
      setPosts(res);
    });
  }, []);

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
              🏛️
              {userDetails.university ? userDetails.university : "Not given"}
            </span>
            <span className={displayStyles.tag}>
              {userDetails.schoolYear == "Undergrad"
                ? "🐣"
                : userDetails.schoolYear == "Postgrad"
                ? "🐥"
                : userDetails.schoolYear == "Alumni"
                ? "🐔"
                : "Not given"}
              {userDetails.schoolYear}
            </span>
            <span>{userDetails.connections.length} connections</span>
          </div>
          {isSameUser ? (
            <button onClick={handleEditProfile}>Edit profile</button>
          ) : (
            <button onClick={handleMessage}>Message</button>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span>{userDetails.name}</span>
          <span>{userDetails.bio}</span>
          <span>Video Intro</span>
          <video src={userDetails.videoIntro} />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          margin: "1rem 0",
          justifyContent: "space-evenly",
        }}
      >
        <span
          onClick={() => setTab(0)}
          style={{ textDecoration: tab == 0 ? "underline" : "none" }}
        >
          Info
        </span>
        <span
          onClick={() => setTab(1)}
          style={{ textDecoration: tab == 1 ? "underline" : "none" }}
        >
          Posts
        </span>
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
        <div>
          {posts.map((element, idx) => {
            return (
              <div key={`post${idx}`} style={{ marginBottom: "1rem" }}>
                <PostCard post={element} userDetails={userDetails} />
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default UserProfile;
