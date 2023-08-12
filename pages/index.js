import { auth, db } from "@/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { Router, useRouter } from "next/router";

export default function Home() {
  const provider = new GoogleAuthProvider();
  const router = useRouter();
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      if (result.user) {
        router.push("/feed");
        await setDoc(doc(db, "candidates", result.user.uid), {
          id: result.user.uid,
          name: result.user.displayName,
          email: result.user.email,
        });
        router.push("/feed");
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
