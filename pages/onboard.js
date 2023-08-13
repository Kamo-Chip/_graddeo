import { auth, db } from "@/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { Router, useRouter } from "next/router";

const OnboardPage = () => {
  const provider = new GoogleAuthProvider();
  const router = useRouter();

  const handleLogin = async (userType) => {
    try {
      const result = await signInWithPopup(auth, provider);
      if (result.user) {
        const res = await getDoc(doc(db, "users", result.user.uid));
        if (res.exists()) {
          router.push("/feed");
        } else {
          router.push(`/onboard/${userType}`);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <button onClick={() => handleLogin("candidates")}>Student login</button>
      <button onClick={() => handleLogin("hirer")}>Company login</button>
    </div>
  );
};

export default OnboardPage;
