import { BiUserCircle } from "react-icons/bi";
import cardStyles from "@/styles/components/ui_elements/card.module.css";
import displayStyles from "@/styles/utils/displays.module.css";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import { getPostHeader } from "@/lib/dbFunctions";

const OpportunityCard = ({ opportunity }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [posterDetails, setPosterDetails] = useState({});
  const [isPosterUpdated, setIsPosterUpdated] = useState(false);

  const router = useRouter();

  useEffect(() => {
    getPostHeader(opportunity.postedBy.id).then((res) => {
      setPosterDetails(res);
    });
    setIsPosterUpdated(true);
  }, [opportunity]);

  return (
    <div className={cardStyles.container}>
      <div className={cardStyles.main}>
        <div style={{ display: "flex" }}>
          <BiUserCircle size="50px" />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: ".5rem",
            }}
          >
            <span style={{}}>{opportunity.title}</span>
            <span>{opportunity.company}</span>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: ".5rem",
              }}
            >
              <div
                className={displayStyles.tag}
                style={{ marginRight: "1rem" }}
              >
                {opportunity.industry}
              </div>
              <div className={displayStyles.tag}>{opportunity.type}</div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <button
            style={{ marginBottom: ".5rem", width: "60px" }}
            onClick={() => {
              router.push(opportunity.link);
            }}
          >
            Apply
          </button>
          <button
            style={{ width: "60px" }}
            onClick={() => {
              setIsExpanded(!isExpanded);
            }}
          >
            {isExpanded ? "Close" : "Details"}
          </button>
        </div>
      </div>
      {isExpanded ? (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {opportunity.description ? (
            <>
              <span style={{ margin: "1rem 0" }}>Description</span>
              <span>{opportunity.description}</span>
            </>
          ) : null}

          <div
            style={{
              marginTop: "1rem",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Posted by</span>
            <Link
              href={`/users/${posterDetails.id}`}
              style={{ display: "flex", alignItems: "center" }}
            >
              <BiUserCircle size="50px" />
              <span>{posterDetails.name}</span>
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default OpportunityCard;
