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
import { useEffect, useState } from "react";
import postStyles from "@/styles/components/ui_elements/post.module.css";
import { FcLike } from "react-icons/fc";
import { IoCreate } from "react-icons/io5";
import PostCard from "@/components/ui_elements/PostCard";
import CustomSelect from "@/components/ui_elements/CustomSelect";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/firebase";
import { Router, useRouter } from "next/router";
import { handleInputChange, handleSelectChange } from "@/lib/inputHandlers";
import {
  addDoc,
  arrayUnion,
  collection,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";
import {
  createEvent,
  createOpportunity,
  createPost,
  getPosts,
  getUserDetails,
} from "@/lib/dbFunctions";

const FeedPage = () => {
  const [tab, setTab] = useState(0);
  const [isPostQuestion, setIsPostQuestion] = useState(false);
  const [isPostOpportunity, setIsPostOpportunity] = useState(false);
  const [isPostEvent, setIsPostEvent] = useState(false);
  const [isPostGeneral, setIsPostGeneral] = useState(false);
  const [user] = useAuthState(auth);
  const [userDetails, setUserDetails] = useState({});
  const [posts, setPosts] = useState([]);
  const [postsToDisplay, setPostsToDisplay] = useState([]);

  const router = useRouter();

  const isUserSignedIn = () => {
    console.log("user is signed in");
    return user != null;
  };

  const directToOnboard = () => {
    router.push("/onboard");
  };

  const checkUserSign = () => {
    if (!isUserSignedIn()) {
      directToOnboard();
    }
  };

  const filterPostsByType = (type) => {
    if (type == "All") {
      setPostsToDisplay(posts);
    } else {
      let newPosts = posts.filter((post) => post.postType == type);
      setPostsToDisplay(newPosts);
    }
  };

  useEffect(() => {
    if (user) {
      getUserDetails(user.uid).then((res) => {
        setUserDetails(res);
      });
    }
  }, [user]);

  useEffect(() => {
    console.log(tab);
    if (tab == 0) {
      filterPostsByType("All");
    } else if (tab == 1) {
      filterPostsByType("Opportunity");
    } else if (tab == 2) {
      filterPostsByType("Question");
    } else if (tab == 3) {
      filterPostsByType("Event");
    }
  }, [tab]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "posts"), (snapshot) => {
      let newPosts = [];
      snapshot.docs.forEach((doc) => {
        newPosts.push(doc.data());
      });
      setPosts(newPosts);

      // Done on first mount because posts state is cannot be used in filterPostByType method
      if (tab == 0) {
        setPostsToDisplay(newPosts);
      }
      console.log(newPosts);
    });

    return unsub;
  }, []);

  if (isPostOpportunity) {
    return (
      <PostOpportunityView
        setPost={setIsPostOpportunity}
        checkUserSign={checkUserSign}
        userDetails={userDetails}
      />
    );
  }

  if (isPostQuestion) {
    return (
      <PostQuestionView
        setPost={setIsPostQuestion}
        checkUserSign={checkUserSign}
        userDetails={userDetails}
      />
    );
  }

  if (isPostEvent) {
    return (
      <PostEventView
        setPost={setIsPostEvent}
        checkUserSign={checkUserSign}
        userDetails={userDetails}
      />
    );
  }

  return (
    <div className={feedStyles.container}>
      <span
        style={{
          position: "fixed",
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
        onClick={() => {
          checkUserSign();
          setIsPostGeneral(true);
        }}
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
          onClick={() => {
            setIsPostGeneral(false);
          }}
        >
          <CreatePostCard
            setIsPostEvent={setIsPostEvent}
            setIsPostOpportunity={setIsPostOpportunity}
            setIsPostQuestion={setIsPostQuestion}
            checkUserSign={checkUserSign}
          />
        </div>
      ) : null}
      <span className={textStyles.pageHeading}>Feed</span>
      <CreatePostCard
        setIsPostEvent={setIsPostEvent}
        setIsPostOpportunity={setIsPostOpportunity}
        setIsPostQuestion={setIsPostQuestion}
        checkUserSign={checkUserSign}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          margin: "1rem 0",
          justifyContent: "space-evenly",
        }}
      >
        <span
          onClick={() => setTab(0)}
          style={{
            textDecoration: tab == 0 ? "underline" : "none",
            textDecorationThickness: "2px",
          }}
        >
          All
        </span>
        <span
          onClick={() => setTab(1)}
          style={{
            textDecoration: tab == 1 ? "underline" : "none",
            textDecorationThickness: "2px",
          }}
        >
          Opportunities
        </span>
        <span
          onClick={() => setTab(2)}
          style={{
            textDecoration: tab == 2 ? "underline" : "none",
            textDecorationThickness: "2px",
          }}
        >
          Questions
        </span>
        <span
          onClick={() => setTab(3)}
          style={{
            textDecoration: tab == 3 ? "underline" : "none",
            textDecorationThickness: "2px",
          }}
        >
          Events
        </span>
      </div>
      <div>
        {postsToDisplay.length ? (
          postsToDisplay.map((element, idx) => {
            return (
              <div key={`post${idx}`} style={{ marginBottom: "1rem" }}>
                <PostCard post={element} userDetails={userDetails} />
              </div>
            );
          })
        ) : (
          <div>No posts to display</div>
        )}
      </div>
    </div>
  );
};

const PostOpportunityView = ({ setPost, userDetails }) => {
  const [postDetails, setPostDetails] = useState({
    id: "",
    postType: "Opportunity",
    postedBy: {
      id: userDetails.id,
    },
    timePosted: null,
    text: "",
    image: "",
    likes: [],
    replies: [],
  });
  const [opportunityDetails, setOpportunityDetails] = useState({
    title: "",
    industry: "",
    type: "",
    company: "",
    link: "",
    image: "",
    description: "",
    postedBy: {
      id: userDetails.id,
    },
  });

  const handleSubmit = async () => {
    createPost({
      ...postDetails,
      text:
        `<b>${opportunityDetails.title}</b><br/>` +
        ". " +
        postDetails.text +
        `<br/><a target="_blank">${opportunityDetails.link}</a>`,
    });
    createOpportunity({
      ...opportunityDetails,
      description: postDetails.text,
      image: postDetails.image,
    });
    setPost(false);
  };

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
      <input
        type="text"
        id="title"
        placeholder="title"
        onChange={(e) => {
          handleInputChange(e, opportunityDetails, setOpportunityDetails);
        }}
      />
      <div style={{ display: "flex", flexDirection: "row", margin: "1rem 0" }}>
        <CustomSelect
          id="industry"
          title="Industry"
          options={["Tech", "Others"]}
          showSelectedOptionAsTitle
          handleChange={(e) =>
            handleSelectChange(e, opportunityDetails, setOpportunityDetails)
          }
          margin="0 1rem 0 0"
        />
        <CustomSelect
          id="type"
          title="Type"
          options={["Internship", "Job", "Graduate programme", "Bursary"]}
          showSelectedOptionAsTitle
          handleChange={(e) =>
            handleSelectChange(e, opportunityDetails, setOpportunityDetails)
          }
        />
      </div>
      <input
        id="company"
        type="text"
        placeholder="Company"
        onChange={(e) =>
          handleInputChange(e, opportunityDetails, setOpportunityDetails)
        }
      />
      <textarea
        placeholder="Description"
        id="text"
        onChange={(e) => handleInputChange(e, postDetails, setPostDetails)}
      />
      <input
        type="text"
        placeholder="Link"
        id="link"
        onChange={(e) =>
          handleInputChange(e, opportunityDetails, setOpportunityDetails)
        }
      />
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
      <input
        type="file"
        id="postImage"
        style={{ display: "none" }}
        onChange={() => {}}
      />
      <button
        style={{
          position: "absolute",
          bottom: "1rem",
          left: ".75rem",
          right: ".75rem",
        }}
        onClick={handleSubmit}
      >
        Post
      </button>
    </div>
  );
};

const PostQuestionView = ({ setPost, userDetails }) => {
  const [postDetails, setPostDetails] = useState({
    id: "",
    postType: "Question",
    postedBy: {
      id: userDetails.id,
    },
    timePosted: null,
    text: "",
    image: "",
    likes: [],
    replies: [],
  });

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
      <textarea
        placeholder="What would you like to share?"
        id="text"
        onChange={(e) => handleInputChange(e, postDetails, setPostDetails)}
      />
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
      <button
        style={{
          position: "absolute",
          bottom: "1rem",
          left: ".75rem",
          right: ".75rem",
        }}
        onClick={() => {
          createPost(postDetails);
          setPost(false);
        }}
      >
        Post
      </button>
    </div>
  );
};

const PostEventView = ({ setPost, userDetails }) => {
  const [postDetails, setPostDetails] = useState({
    id: "",
    postType: "Event",
    postedBy: {
      id: userDetails.id,
    },
    timePosted: null,
    text: "",
    image: "",
    likes: [],
    replies: [],
  });
  const [eventDetails, setEventDetails] = useState({
    title: "",
    industry: "",
    company: "",
    link: "",
    image: "",
    description: "",
    postedBy: {
      id: userDetails.id,
    },
  });

  const handleSubmit = async () => {
    createPost({
      ...postDetails,
      text:
        `<b>${eventDetails.title}</b>.<br/>` +
        postDetails.text +
        `<br/><a target="_blank">${eventDetails.link}</a>`,
    });

    createEvent({
      ...eventDetails,
      description: postDetails.text,
      image: postDetails.image,
    });
    setPost(false);
  };

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
      <input
        type="text"
        placeholder="title"
        id="title"
        onChange={(e) => handleInputChange(e, eventDetails, setEventDetails)}
      />
      <div style={{ display: "flex", flexDirection: "row", margin: "1rem 0" }}>
        <input
          type="date"
          placeholder="title"
          id="date"
          onChange={(e) => handleInputChange(e, eventDetails, setEventDetails)}
        />
        <CustomSelect
          id="industry"
          title="Industry"
          options={["Tech", "Others"]}
          showSelectedOptionAsTitle
          handleChange={(e) =>
            handleSelectChange(e, eventDetails, setEventDetails)
          }
          margin="0 1rem 0 0"
        />
      </div>
      <input
        type="text"
        placeholder="Company"
        id="company"
        onChange={(e) => handleInputChange(e, eventDetails, setEventDetails)}
      />
      <textarea
        placeholder="Description"
        id="text"
        onChange={(e) => handleInputChange(e, postDetails, setPostDetails)}
      />
      <input
        type="text"
        placeholder="Link"
        id="link"
        onChange={(e) => handleInputChange(e, eventDetails, setEventDetails)}
      />
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
      <input type="file" id="image" style={{ display: "none" }} />
      <button
        style={{
          position: "absolute",
          bottom: "1rem",
          left: ".75rem",
          right: ".75rem",
        }}
        onClick={handleSubmit}
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
  checkUserSign,
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
          onClick={() => {
            checkUserSign();
            setIsPostOpportunity(true);
          }}
        >
          <MdCampaign />
          <span>Opportunity</span>
        </span>
        <span
          className={feedStyles.postOption}
          onClick={() => {
            checkUserSign();
            setIsPostQuestion(true);
          }}
        >
          <MdQuestionAnswer />
          <span>Question</span>
        </span>
        <span
          className={feedStyles.postOption}
          onClick={() => {
            checkUserSign();
            setIsPostEvent(true);
          }}
        >
          <MdEvent />
          <span>Event</span>
        </span>
      </div>
    </div>
  );
};

export default FeedPage;
