const { db } = require("@/firebase");
const { addDoc, doc, getDoc } = require("firebase/firestore");

//Not done
export const createPost = async (userDetails, post) => {
  try {
    await addDoc(
      doc(db, "posts", {
        ...post,
        postedBy: {
          name: userDetails.name,
          id: userDetails.id,
          university: "Wits",
          schoolYear: "Postgrad",
          degree: "Acturial Science",
          image: "",
        },
      })
    );
  } catch (e) {
    console.error(e);
  }
};

export const isUserProfileValid = async (userId) => {
    const res = await getDoc(doc(db, "candidates", userId));

    const data = res.data();

    return data.university
}