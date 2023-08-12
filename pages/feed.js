import textStyles from "@/styles/utils/text.module.css";
import feedStyles from "@/styles/pages/feed.module.css";
import displayStyles from "@/styles/utils/displays.module.css";
import { BiUserCircle } from "react-icons/bi";
import {
  MdCampaign,
  MdEvent,
  MdQuestionAnswer,
  MdSend,
  MdClose,
  MdImage,
} from "react-icons/md";
import { useState } from "react";
import postStyles from "@/styles/components/ui_elements/post.module.css";
import { FcLike } from "react-icons/fc";
import { IoCreate } from "react-icons/io5";
import PostCard from "@/components/ui_elements/PostCard";
import CustomSelect from "@/components/ui_elements/CustomSelect";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase";

const posts = [
  {
    id: "",
    type: "Question",
    postedBy: {
      name: "Lubona Chibwa",
      id: "",
      university: "Wits",
      schoolYear: "Undergrad",
      degree: "Computer Science",
      image: "",
    },
    timePosted: "00:00",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
    image: "",
    numReplies: 1,
    numLikes: 2,
    replies: [
      {
        postedBy: {
          name: "Kamogelo Khumalo",
          id: "",
          university: "UP",
          schoolYear: "Postgrad",
          degree: "Acturial Science",
          image: "",
        },
        timePosted: "00:00",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
        numLikes: 1,
      },
    ],
  },
];
const FeedPage = () => {
  const [tab, setTab] = useState(0);
  const [isPostQuestion, setIsPostQuestion] = useState(false);
  const [isPostOpportunity, setIsPostOpportunity] = useState(false);
  const [isPostEvent, setIsPostEvent] = useState(false);
  const [isPostGeneral, setIsPostGeneral] = useState(false);
  const [postDetails, setPostDetails] = useState({});
  const [user] = useAuthState(auth);


  if (isPostQuestion) {
    return (
      <PostQuestionView setPost={setIsPostQuestion} handlePost={() => {}} />
    );
  }

  if (isPostOpportunity) {
    return (
      <PostOpportunityView
        setPost={setIsPostOpportunity}
        handlePost={() => {}}
      />
    );
  }
  if (isPostEvent) {
    return <PostEventView setPost={setIsPostEvent} handlePost={() => {}} />;
  }
  return (
    <div className={feedStyles.container}>
      <span
        style={{
          position: "absolute",
          bottom: "5rem",
          zIndex: "3",
          right: "1rem",
          backgroundColor: "var(--primary-1)",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={() => setIsPostGeneral(true)}
      >
        <IoCreate size="32px" />
      </span>
      {isPostGeneral ? (
        <div
          style={{
            position: "absolute",
            top: "0",
            bottom: "0",
            left: "0",
            right: "0",
            backgroundColor: "#00000085",
            zIndex: "3",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setIsPostGeneral(false)}
        >
          <CreatePostCard
            setIsPostEvent={setIsPostEvent}
            setIsPostOpportunity={setIsPostOpportunity}
            setIsPostQuestion={setIsPostQuestion}
          />
        </div>
      ) : null}
      <span className={textStyles.pageHeading}>Feed</span>
      <CreatePostCard
        setIsPostEvent={setIsPostEvent}
        setIsPostOpportunity={setIsPostOpportunity}
        setIsPostQuestion={setIsPostQuestion}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          margin: "1rem 0",
          justifyContent: "space-evenly",
        }}
      >
        <span onClick={() => setTab(0)}>All</span>
        <span onClick={() => setTab(1)}>Opportunities</span>
        <span onClick={() => setTab(2)}>Questions</span>
        <span onClick={() => setTab(3)}>Events</span>
      </div>
      <div>
        {posts.map((element, idx) => {
          return (
            <div key={`post${idx}`}>
              <PostCard post={element} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const PostQuestionView = ({ setPost, handlePost }) => {
  return (
    <div className={feedStyles.postModal}>
      <span
        style={{
          marginLeft: "auto",
          marginBottom: "1rem",
          position: "absolute",
          right: ".75rem",
        }}
        onClick={() => setPost(false)}
      >
        <MdClose />
      </span>
      <span className={textStyles.pageHeading}>Ask a question</span>
      <textarea placeholder="What would you like to share?" />
      <label
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "200px",
          border: "dashed 2px var(--border-color)",
        }}
      >
        <MdImage />
        Add image
      </label>
      <input type="file" id="postImage" style={{ display: "none" }} />
      <button
        style={{
          position: "absolute",
          bottom: "1rem",
          left: ".75rem",
          right: ".75rem",
        }}
        onClick={handlePost}
      >
        Post
      </button>
    </div>
  );
};

const PostOpportunityView = ({ setPost, handlePost }) => {
  return (
    <div className={feedStyles.postModal}>
      <span
        style={{
          marginLeft: "auto",
          marginBottom: "1rem",
          position: "absolute",
          right: ".75rem",
        }}
        onClick={() => setPost(false)}
      >
        <MdClose />
      </span>
      <span className={textStyles.pageHeading}>Post opportunity</span>
      <input type="text" placeholder="title" />
      <div style={{ display: "flex", flexDirection: "row", margin: "1rem 0" }}>
        <CustomSelect
          id="industry"
          title="Industry"
          options={["Tech", "Others"]}
          showSelectedOptionAsTitle
          handleChange={() => {}}
          margin="0 1rem 0 0"
        />
        <CustomSelect
          id="type"
          title="Type"
          options={["Tech", "Others"]}
          showSelectedOptionAsTitle
          handleChange={() => {}}
        />
      </div>
      <input type="text" placeholder="Company" />
      <textarea placeholder="Description" />
      <input type="text" placeholder="Link" />
      <label
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "200px",
          border: "dashed 2px var(--border-color)",
        }}
      >
        <MdImage />
        Add image
      </label>
      <input type="file" id="postImage" style={{ display: "none" }} />
      <button
        style={{
          position: "absolute",
          bottom: "1rem",
          left: ".75rem",
          right: ".75rem",
        }}
        onClick={handlePost}
      >
        Post
      </button>
    </div>
  );
};

const PostEventView = ({ setPost, handlePost }) => {
  return (
    <div className={feedStyles.postModal}>
      <span
        style={{
          marginLeft: "auto",
          marginBottom: "1rem",
          position: "absolute",
          right: ".75rem",
        }}
        onClick={() => setPost(false)}
      >
        <MdClose />
      </span>
      <span className={textStyles.pageHeading}>Post event</span>
      <input type="text" placeholder="title" />
      <div style={{ display: "flex", flexDirection: "row", margin: "1rem 0" }}>
        <input type="date" placeholder="title" />
        <CustomSelect
          id="industry"
          title="Industry"
          options={["Tech", "Others"]}
          showSelectedOptionAsTitle
          handleChange={() => {}}
          margin="0 1rem 0 0"
        />
      </div>
      <input type="text" placeholder="Company" />
      <textarea placeholder="Description" />
      <input type="text" placeholder="Link" />
      <label
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "200px",
          border: "dashed 2px var(--border-color)",
        }}
      >
        <MdImage />
        Add image
      </label>
      <input type="file" id="postImage" style={{ display: "none" }} />
      <button
        style={{
          position: "absolute",
          bottom: "1rem",
          left: ".75rem",
          right: ".75rem",
        }}
        onClick={handlePost}
      >
        Post
      </button>
    </div>
  );
};

const CreatePostCard = ({
  setIsPostEvent,
  setIsPostOpportunity,
  setIsPostQuestion,
}) => {
  return (
    <div
      style={{
        backgroundColor: "var(--primary-1)",
        padding: ".75rem 0",
        border: "solid 1px var(--border-color)",
        borderRadius: "var(--radius-sm)",
        marginTop: "1rem",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          borderBottom: "solid 1px var(--border-color)",
        }}
      >
        <span style={{ marginLeft: ".75rem", marginRight: "1rem" }}>
          <BiUserCircle size="50px" />
        </span>

        <span>What would you like to share?</span>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          marginTop: ".75rem",
        }}
      >
        <span
          className={feedStyles.postOption}
          onClick={() => setIsPostOpportunity(true)}
        >
          <MdCampaign />
          <span>Opportunity</span>
        </span>
        <span
          className={feedStyles.postOption}
          onClick={() => setIsPostQuestion(true)}
        >
          <MdQuestionAnswer />
          <span>Question</span>
        </span>
        <span
          className={feedStyles.postOption}
          onClick={() => setIsPostEvent(true)}
        >
          <MdEvent />
          <span>Event</span>
        </span>
      </div>
    </div>
  );
};

export default FeedPage;
