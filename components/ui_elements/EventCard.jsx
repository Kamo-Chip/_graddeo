import { BiUserCircle } from "react-icons/bi";
import cardStyles from "@/styles/components/ui_elements/card.module.css";
import displayStyles from "@/styles/utils/displays.module.css";
import { useState } from "react";
import Link from "next/link";
import { Router } from "next/router";

const EventCard = ({ event }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div
      className={cardStyles.container}
      style={{ minHeight: "160px", paddingTop: "calc(130px)" }}
    >
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          right: "0",
          height: "120px",
          background: "var(--border-color)",
        }}
      >
        <button
          style={{ position: "absolute", top: ".75rem", right: ".75rem" }}
          onClick={() => {
            Router.push(event.link);
          }}
        >
          View more
        </button>
        <span
          style={{ position: "absolute", bottom: ".75rem", right: ".75rem" }}
        >
          {event.date}
        </span>
        <span
          style={{ position: "absolute", bottom: ".75rem", left: ".75rem" }}
        >
          {event.title}
        </span>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span className={displayStyles.tag}>{event.industry}</span>
        <button
          onClick={() => {
            setIsExpanded(!isExpanded);
          }}
        >
          Details
        </button>
      </div>
      {isExpanded ? (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {event.description ? (
            <>
              <span style={{ margin: "1rem 0" }}>Description</span>
              <span>{event.description}</span>
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
              href={`/users/${event.postedBy.id}`}
              style={{ display: "flex", alignItems: "center" }}
            >
              <BiUserCircle size="50px" />
              <span>{event.postedBy.name}</span>
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default EventCard;
