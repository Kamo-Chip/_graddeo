import layoutStyles from "@/styles/components/layouts/appLayout.module.css";
import Navigation from "../ui_elements/Navigation";
import { useRouter } from "next/router";

const AppLayout = ({ children }) => {
  const router =useRouter();

  
  return (
    <div className={layoutStyles.container}>
      {children}
      <Navigation />
    </div>
  );
};

export default AppLayout;
