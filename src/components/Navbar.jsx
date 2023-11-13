import { useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { BsChatLeft } from "react-icons/bs";
import { RiNotification3Line } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import { Cart, Chat, NavButton, Notification, UserProfile } from ".";
import { useStateContext } from "../context/ContextProvider";

import AvatarImage from "../data/avatar.jpg";

const Navbar = () => {
  const {
    activeMenu,
    setActiveMenu,
    handleClick,
    isClicked,
    screenSize,
    setScreenSize,
  } = useStateContext();

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  return (
    <div className="flex justify-between p-2 md:mx-6 relative">
      <NavButton
        title={"Menu"}
        customHandler={() => setActiveMenu((prevState) => !prevState)}
        color={"blue"}
        icon={<AiOutlineMenu />}
      />

      <div className="flex">
        <NavButton
          title={"Cart"}
          customHandler={() => handleClick("cart")}
          color={"blue"}
          icon={<FiShoppingCart />}
        />

        <NavButton
          title={"Chat"}
          customHandler={() => handleClick("chat")}
          color={"blue"}
          dotColor={"#03C9D7"}
          icon={<BsChatLeft />}
        />

        <NavButton
          title={"Notifications"}
          customHandler={() => handleClick("notification")}
          color={"blue"}
          dotColor={"#03C9D7"}
          icon={<RiNotification3Line />}
        />

        <TooltipComponent content={"Profile"} position="BottomCenter">
          <div
            className="flex items-center gap-2 cursor-pointer p-2 hover:bg-light-gray rounded-lg"
            onCanPlay={() => handleClick("userProfile")}
          >
            <img src={AvatarImage} className="rounded-full w-8 h-8" />

            <p>
              <span className="text-gray-400 text-14">Hi,</span>{" "}
              <span className="text-gray-400 font-bold ml-1 text-14">
                Faizan
              </span>
            </p>

            <MdKeyboardArrowDown className="text-gray-400 text-14" />
          </div>
        </TooltipComponent>

        {isClicked.cart && <Cart />}
        {isClicked.chat && <Chat />}
        {isClicked.notification && <Notification />}
        {isClicked.profile && <UserProfile />}
      </div>
    </div>
  );
};

export default Navbar;
