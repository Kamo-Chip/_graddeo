import { BiUserCircle } from "react-icons/bi";
import displayStyles from "@/styles/utils/displays.module.css";
import cardStyles from "@/styles/components/ui_elements/card.module.css";
const CandidateCard = ({ userDetails }) => {
  return (
    <div className={cardStyles.container}>
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
          <span>{userDetails.name}</span>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <span className={displayStyles.tag}>{userDetails.university}</span>
            <span className={displayStyles.tag} style={{ margin: "0 .25rem" }}>
              {userDetails.schoolYear}
            </span>
            <span className={displayStyles.tag}>{userDetails.degree}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateCard;
