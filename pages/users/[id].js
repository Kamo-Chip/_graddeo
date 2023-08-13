import { Router, useRouter } from "next/router";
import textStyles from "@/styles/utils/text.module.css";
import displayStyles from "@/styles/utils/displays.module.css";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/firebase";
import { getUserDetails } from "@/lib/dbFunctions";
import UserProfile from "@/components/ui_elements/UserProfile";
import { getDoc, doc, getDocs, collection } from "firebase/firestore";

export const getStaticProps = async (context) => {
  let snapshot = await getDoc(doc(db, "users", context.params.id));
  let user = snapshot.data();
  return {
    props: { userDetails: user },
  };
};

export const getStaticPaths = async () => {
  let users = [];
  const snapshot = await getDocs(collection(db, "users"));
  snapshot.forEach((doc) => {
    users.push({ ...doc.data() });
  });

  const paths = users.map((user) => {
    return {
      params: { id: user.id },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

const ProfilePage = ({ userDetails }) => {
  const [user] = useAuthState(auth);
  if (!userDetails || !user) {
    return <div>Loading...</div>;
  }
  return (
    <UserProfile
      userDetails={userDetails}
      isSameUser={user.uid == userDetails.id}
    />
  );
};

export default ProfilePage;
