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
import { useEffect, useState } from "react";
import postStyles from "@/styles/components/ui_elements/post.module.css";
import { FcLike } from "react-icons/fc";
import { timeSincePosted } from "@/lib/format";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/firebase";
import { Timestamp, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { handleInputChange } from "@/lib/inputHandlers";
import {
  getPostHeader,
  handleLike,
  handlePostLike,
  handleReply,
  handleReplyLike,
} from "@/lib/dbFunctions";

const PostCard = ({ post, userDetails }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [posterDetails, setPosterDetails] = useState(null);
  const [isRepliesUpdated, setIsRepliesUpdated] = useState(false);
  const [replyDetails, setReplyDetails] = useState({
    postedBy: {
      id: userDetails.id,
    },
    timePosted: "",
    text: "",
    numLikes: 0,
  });

  useEffect(() => {
    getPostHeader(post.postedBy.id).then((res) => {
      setPosterDetails(res);
    });
    for (let i = 0; i < post.replies.length; i++) {
      getPostHeader(post.replies[i].postedBy.id).then((res) => {
        post.replies[i].postedBy = res;
      });
    }
    setIsRepliesUpdated();
  }, [post]);

  useEffect(() => {
    console.log(post);
  }, []);

  if (!posterDetails) {
    return (
      <div className={postStyles.container} style={{ height: "400px" }}></div>
    );
  }

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
            {post.postType}
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
              <span>{posterDetails.name}</span>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <span className={displayStyles.tag}>
                  {posterDetails.university}
                </span>
                <span
                  className={displayStyles.tag}
                  style={{ margin: "0 .25rem" }}
                >
                  {posterDetails.schoolYear}
                </span>
                <span className={displayStyles.tag}>
                  {posterDetails.degree}
                </span>
                <span style={{ marginLeft: ".5rem", fontSize: "14px" }}>
                  {timeSincePosted(post.timePosted) == "now"
                    ? timeSincePosted(post.timePosted)
                    : `${timeSincePosted(post.timePosted)} ago`}
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
          <div dangerouslySetInnerHTML={{ __html: post.text }} />
          <div>{post.image}</div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "auto",
            }}
          >
            <span>{post.likes.length}</span>
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
                        {timeSincePosted(element.timePosted)} ago
                      </span>
                    </div>
                  </div>
                </div>
                <span>{element.text}</span>
                {/* <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "auto",
                  }}
                  onClick={() => handleReplyLike(post.id, idx)}
                >
                  <span>{post.numLikes}</span>
                  <FcLike />
                </div> */}
              </div>
            );
          })}
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
            position: "absolute",
            bottom: ".75rem",
            left: ".75rem",
            right: ".75rem",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <input
              type="text"
              placeholder="Share your thoughts here"
              style={{ width: "100%" }}
              id="text"
              onChange={(e) =>
                handleInputChange(e, replyDetails, setReplyDetails)
              }
            />
          </div>
          <span onClick={() => handleReply(post.id, replyDetails)}>
            <MdSend size="24px" />
          </span>
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
        {post.postType}
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
          <span>{posterDetails.name}</span>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <span className={displayStyles.tag}>
              {posterDetails.university}
            </span>
            <span className={displayStyles.tag} style={{ margin: "0 .25rem" }}>
              {posterDetails.schoolYear}
            </span>
            <span className={displayStyles.tag}>{posterDetails.degree}</span>
            <span style={{ marginLeft: ".5rem", fontSize: "14px" }}>
              {timeSincePosted(post.timePosted)} ago
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
        <div dangerouslySetInnerHTML={{ __html: post.text }} />
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
          {post.replies.length == 1
            ? `${post.replies.length} reply`
            : `${post.replies.length} replies`}
        </span>
        <div
          style={{ display: "flex", alignItems: "center" }}
          onClick={() => handlePostLike(post.id, userDetails.id)}
        >
          <span>{post.likes.length}</span>
          <FcLike />
        </div>
      </div>
      {/* <div
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
      </div> */}
    </div>
  );
};

export default PostCard;
