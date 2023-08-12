import navigationStyles from "@/styles/components/ui_elements/navigation.module.css";
import { MdEvent, MdSearch, MdDynamicFeed } from "react-icons/md";
import { RiGroup2Fill } from "react-icons/ri";
import { BiSolidUserCircle } from "react-icons/bi";
import { useRouter } from "next/router";

const Navigation = () => {
  const router = useRouter();

  return (
    <div className={navigationStyles.container}>
      <span
        className={navigationStyles.option}
        onClick={() => {
          router.push("/events");
        }}
      >
        <MdEvent />
        <span>Events</span>
      </span>
      <span
        className={navigationStyles.option}
        onClick={() => {
          router.push("/opportunities");
        }}
      >
        <MdSearch />
        <span>Opportunities</span>
      </span>
      <span
        className={navigationStyles.option}
        onClick={() => {
          router.push("/feed");
        }}
      >
        <MdDynamicFeed />
        <span>Feed</span>
      </span>
      <span
        className={navigationStyles.option}
        onClick={() => {
          router.push("/peers");
        }}
      >
        <RiGroup2Fill />
        <span>Peers</span>
      </span>
      <span
        className={navigationStyles.option}
        onClick={() => {
          router.push("/profile");
        }}
      >
        <BiSolidUserCircle />
        <span>Profile</span>
      </span>
    </div>
  );
};

export default Navigation;
