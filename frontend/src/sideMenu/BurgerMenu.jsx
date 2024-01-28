import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { JoinOpenContext, ReadyContext, SidebarOpenContext } from "..";
import { reveal as BurgerMenuComponent } from "react-burger-menu";
import MenuContent from "./MenuContent";

const BurgerMenu = () => {
  const { ready } = useContext(ReadyContext);

  const { sidebarOpen, setSidebarOpen } = useContext(SidebarOpenContext);
  const { joinOpen } = useContext(JoinOpenContext);

  const location = useLocation();

  useEffect(() => {
    console.log({ location: location });
  }, [location]);

  useEffect(() => {
    if (joinOpen) {
      setSidebarOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [joinOpen]);

  return (
    <div
      className={`${window.location.pathname === "/social" ? "md:hidden" : ""}`}
    >
      {ready && (
        <BurgerMenuComponent
          right
          pageWrapId={"page-wrap"}
          outerContainerId={"outer-container"}
          isOpen={sidebarOpen}
          onStateChange={state => setSidebarOpen(state.isOpen)}
        >
          <MenuContent />
        </BurgerMenuComponent>
      )}
    </div>
  );
};

export default BurgerMenu;
