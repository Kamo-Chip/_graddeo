import textStyles from "@/styles/utils/text.module.css";
import feedStyles from "@/styles/pages/feed.module.css";
import displayStyles from "@/styles/utils/displays.module.css";
import { BiUserCircle } from "react-icons/bi";
import {
  MdCampaign,
  MdClose,
  MdEvent,
  MdQuestionAnswer,
  MdSend,
} from "react-icons/md";
import { useState } from "react";
import postStyles from "@/styles/components/ui_elements/post.module.css";
import { FcLike } from "react-icons/fc";

const PostCard = ({ post }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (isExpanded) {
    return (
      <div className={postStyles.expandedContainer}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}
        >
          <span
            style={{ marginLeft: "auto", marginBottom: "1rem" }}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <MdClose />
          </span>
          <span
            style={{ position: "absolute", top: "1.5rem", right: ".75rem" }}
            className={displayStyles.tag}
          >
            {post.type}
          </span>
          <div style={{ display: "flex" }}>
            <span style={{ marginRight: ".5rem" }}>
              <BiUserCircle size="40px" />
            </span>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span>{post.postedBy.name}</span>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <span className={displayStyles.tag}>
                  {post.postedBy.university}
                </span>
                <span
                  className={displayStyles.tag}
                  style={{ margin: "0 .25rem" }}
                >
                  {post.postedBy.schoolYear}
                </span>
                <span className={displayStyles.tag}>
                  {post.postedBy.degree}
                </span>
                <span style={{ marginLeft: ".5rem", fontSize: "14px" }}>
                  {post.timePosted}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            flexDirection: "column",
            borderBottom: "solid 1px var(--border-color)",
            paddingBottom: "1rem",
          }}
        >
          <div>{post.text}</div>
          <div>{post.image}</div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "auto",
            }}
          >
            <span>{post.numLikes}</span>
            <FcLike />
          </div>
        </div>
        <div>
          {post.replies.map((element, idx) => {
            return (
              <div
                key={`reply${idx}`}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <div style={{ display: "flex" }}>
                  <span style={{ marginRight: ".5rem" }}>
                    <BiUserCircle size="40px" />
                  </span>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <span>{element.postedBy.name}</span>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <span className={displayStyles.tag}>
                        {element.postedBy.university}
                      </span>
                      <span
                        className={displayStyles.tag}
                        style={{ margin: "0 .25rem" }}
                      >
                        {element.postedBy.schoolYear}
                      </span>
                      <span className={displayStyles.tag}>
                        {element.postedBy.degree}
                      </span>
                      <span style={{ marginLeft: ".5rem", fontSize: "14px" }}>
                        {element.timePosted}
                      </span>
                    </div>
                  </div>
                </div>
                <span>{element.text}</span>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "auto",
                  }}
                >
                  <span>{post.numLikes}</span>
                  <FcLike />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  return (
    <div className={postStyles.container}>
      <span
        style={{ position: "absolute", top: ".75rem", right: ".75rem" }}
        className={displayStyles.tag}
      >
        {post.type}
      </span>
      <div style={{ display: "flex" }}>
        <span style={{ marginRight: ".5rem" }}>
          <BiUserCircle size="40px" />
        </span>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span>{post.postedBy.name}</span>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <span className={displayStyles.tag}>
              {post.postedBy.university}
            </span>
            <span className={displayStyles.tag} style={{ margin: "0 .25rem" }}>
              {post.postedBy.schoolYear}
            </span>
            <span className={displayStyles.tag}>{post.postedBy.degree}</span>
            <span style={{ marginLeft: ".5rem", fontSize: "14px" }}>
              {post.timePosted}
            </span>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "grid",
          marginTop: "1rem",
          gridTemplateColumns: post.image ? "80% 20%" : "100%",
        }}
      >
        <div>{post.text}</div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "1rem 0 1rem 0",
        }}
      >
        <span
          onClick={() => {
            setIsExpanded(!isExpanded);
          }}
        >
          {post.numReplies == 1
            ? `${post.numReplies} reply`
            : `${post.numReplies} repies`}
        </span>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span>{post.numLikes}</span>
          <FcLike />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          padding: ".75rem",
          justifyContent: "space-between",
          backgroundColor: "#fff",
          alignItems: "center",
          border: "solid 1px var(--border-color)",
          borderRadius: "var(--radius-sm)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <BiUserCircle size="30px" />
          <span style={{ marginLeft: ".5rem" }}>Share your thoughts here</span>
        </div>

        <span>
          <MdSend size="24px" />
        </span>
      </div>
    </div>
  );
};

export default PostCard;
