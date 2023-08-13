import { db } from "@/firebase";
import {
  addDoc,
  doc,
  getDoc,
  collection,
  arrayUnion,
  updateDoc,
  Timestamp,
  getDocs,
  onSnapshot,
} from "firebase/firestore";

export const getUserDetails = async (userId) => {
  let userDetails = null;
  try {
    const res = await getDoc(doc(db, "users", userId));
    userDetails = res.data();
  } catch (e) {
    console.error(e);
  }

  return userDetails;
};

export const createPost = async (postDetails) => {
  console.log(postDetails);
  try {
    const res = await addDoc(collection(db, "posts"), {
      ...postDetails,
      timePosted: Timestamp.now(),
      postedBy: {
        id: postDetails.postedBy.id,
      },
    });
    await updateDoc(doc(db, "users", postDetails.postedBy.id), {
      posts: arrayUnion(res.id),
    });
    await updateDoc(doc(db, "posts", res.id), {
      id: res.id,
    });
  } catch (e) {
    console.error(e);
  }
};

export const createOpportunity = async (opportunityDetails) => {
  try {
    await addDoc(collection(db, "opportunities"), {
      ...opportunityDetails,
      timePosted: Timestamp.now(),
    });
  } catch (e) {
    console.error(e);
  }
};

export const createEvent = async (eventDetails) => {
  try {
    await addDoc(collection(db, "events"), {
      ...eventDetails,
      timePosted: Timestamp.now(),
    });
  } catch (e) {
    console.error(e);
  }
};

export const handlePostLike = async (postId, userId) => {
  await updateDoc(doc(db, "posts", postId), {
    likes: arrayUnion(userId),
  });
};

export const handleReply = async (postId, replyDetails) => {
  await updateDoc(doc(db, "posts", postId), {
    replies: arrayUnion({ ...replyDetails, timePosted: Timestamp.now() }),
  });
};

export const getPosts = async () => {
  let posts = [];
  try {
    onSnapshot(collection(db, "posts"), (snapshot) => {
      snapshot.docs.forEach((doc) => {
        posts.push(doc.data());
      });
    });
  } catch (e) {
    console.error(e);
  }

  return posts;
};

export const getPostHeader = async (userId) => {
  let headerDetails = {};
  try {
    const res = await getDoc(doc(db, "users", userId));
    const data = res.data();

    headerDetails.name = data.name;
    headerDetails.id = userId;
    headerDetails.university = data.university;
    headerDetails.schoolYear = data.schoolYear;
    headerDetails.degree = data.degree;
    headerDetails.image = data.image;
  } catch (e) {
    console.error(e);
  }

  return headerDetails;
};

export const getPostsFromIds = async (postIds) => {
  let posts = [];

  try {
    for (let i = 0; i < postIds.length; i++) {
      const res = await getDoc(doc(db, "posts", postIds[i]));
      posts.push(res.data());
    }
  } catch (e) {
    console.error(e);
  }

  return posts;
};
