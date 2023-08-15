import profileStyles from "@/styles/pages/profile.module.css";
import Image from "next/image";
import { BiSolidNetworkChart, BiUserCircle } from "react-icons/bi";
import { Router, useRouter } from "next/router";
import textStyles from "@/styles/utils/text.module.css";
import displayStyles from "@/styles/utils/displays.module.css";
import { useEffect, useState } from "react";
import {
  connectToUser,
  getPostsFromIds,
  unConnectToUser,
} from "@/lib/dbFunctions";
import PostCard from "./PostCard";
import { MdEMobiledata } from "react-icons/md";
import { CgExternal } from "react-icons/cg";
import {
  AiFillBell,
  AiFillGithub,
  AiFillInstagram,
  AiFillLinkedin,
  AiFillYoutube,
} from "react-icons/ai";
import { convertToFormattedDate } from "@/lib/format";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase";

const UserProfile = ({ userDetails, isSameUser, user, isViewerConnected }) => {
  const router = useRouter();
  const [tab, setTab] = useState(0);
  const [posts, setPosts] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [numConnections, setNumConnections] = useState(
    userDetails.connections.length
  );

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

  const formatSocials = (social) => {
    const [type, username] = social.split(":");
    let link = "";
    let icon = null;
    switch (type) {
      case "gitHub":
        link = "https://github.com/";
        icon = <AiFillGithub />;
        break;
      case "instagram":
        link = "https://www.instagram.com/";
        icon = <AiFillInstagram />;
        break;
      case "linkedIn":
        link = "https://www.linkedin.com/in/";
        icon = <AiFillLinkedin />;
        break;
      case "youTube":
        link = "https://www.youtube.com/@";
        icon = <AiFillYoutube />;
        break;
    }
    return (
      <a
        href={`${link}${username}`}
        target="_blank"
        style={{ whiteSpace: "nowrap" }}
      >
        <span>{icon}</span>
        <span>{username}</span>
        <span>
          <CgExternal />
        </span>
      </a>
    );
  };

  useEffect(() => {
    getPostsFromIds(userDetails.posts).then((res) => {
      setPosts(res);
    });
    setIsConnected(isViewerConnected);
  }, []);

  return (
    <div>
      {console.log(userDetails)}
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
            <span>{numConnections} connections</span>
          </div>
          {isSameUser ? (
            <button onClick={handleEditProfile}>Edit profile</button>
          ) : (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <button onClick={handleMessage}>Message</button>
              {!isConnected ? (
                <button
                  onClick={() => {
                    connectToUser(user.uid, userDetails.id);
                    setIsConnected(true);
                    setNumConnections((prevState) => ++prevState);
                  }}
                >
                  Connect
                </button>
              ) : (
                <button
                  onClick={() => {
                    unConnectToUser(user.uid, userDetails.id);
                    setIsConnected(false);
                    setNumConnections((prevState) => --prevState);
                  }}
                >
                  Remove connection
                </button>
              )}
            </div>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span>{userDetails.name}</span>
          <span>{userDetails.bio}</span>
          <span>Video Intro</span>
          <video
            controls
            width="200"
            style={{ maxHeight: "140px", width: "auto" }}
            id="videoIntro"
          >
            <source src={userDetails.videoIntro} type="video/mp4" />
          </video>
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
            <span
              className={textStyles.heading2}
              style={{ marginBottom: "1rem" }}
            >
              Socials
            </span>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              {userDetails.socials.map((element, idx) => {
                return (
                  <div
                    key={`social${idx}`}
                    className={displayStyles.tag}
                    style={{ margin: "0 .5rem .5rem 0" }}
                  >
                    {formatSocials(element)}
                  </div>
                );
              })}
            </div>
          </div>
          <div
            className={profileStyles.container}
            style={{ marginTop: "1rem" }}
          >
            <span
              className={textStyles.heading2}
              style={{ marginBottom: "1rem" }}
            >
              Skills
            </span>
            {userDetails.skills.map((element, idx) => {
              return (
                <div
                  key={`skill${idx}`}
                  className={displayStyles.tag}
                  style={{ margin: "0 .5rem .5rem 0" }}
                >
                  {element}
                </div>
              );
            })}
          </div>
          <div
            className={profileStyles.container}
            style={{ marginTop: "1rem" }}
          >
            <span className={textStyles.heading2}>Experience</span>
            {userDetails.experience.map((element, idx) => {
              return (
                <div key={`exp${idx}`}>
                  <b>{element.title}</b>
                  <br />
                  <span>
                    {convertToFormattedDate(element.start)} -{" "}
                    {element.end != "Present"
                      ? convertToFormattedDate(element.end)
                      : element.end}
                  </span>
                </div>
              );
            })}
          </div>
          <div
            className={profileStyles.container}
            style={{ marginTop: "1rem" }}
          >
            <span className={textStyles.heading2}>Projects</span>
            {userDetails.projects.map((element, idx) => {
              return (
                <div key={`proj${idx}`}>
                  <b>{element.title}</b>
                  <br />
                  <span>{element.description}</span>
                  <br />
                  <a href={element.link} target="_blank">
                    Check it out <CgExternal />
                  </a>
                </div>
              );
            })}
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
