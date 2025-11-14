import { useEffect, useRef, useState } from "react"
import Button from "../Button";
import { navOptions } from "../../constants/data";
import { useMediaQuery } from "react-responsive";

const MobileNavbar = ({ handleScrollTo, prevScrollValue }) => {
    // States
    const [isNavSticky, setIsNavSticky] = useState(false);
    const [hideStickyNav, setHideStickyNav] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [animateCross, setAnimateCross] = useState(false);

    // Extra hooks
    const sidebarRef = useRef(null);

    // Sidebar responsive breakpoints
    const isSmallerMobile = useMediaQuery({maxWidth: 330});
    const isMobile = useMediaQuery({ maxWidth: 480 });
    const isTablet = useMediaQuery({ minWidth: 600 });

    // useEffect to manage the sticky nav on window scroll
    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY;
            const previousScroll = prevScrollValue.current;

            // Determine if scrolling down or up
            const scrollingDown = currentScroll > previousScroll;
            const scrollingUp = currentScroll < previousScroll;

            // If user scrolled a small amount then make the navbar sticky
            if (currentScroll >= 20) {
                setIsNavSticky(true);

                // Hide or show the navbar based on scrolling down or up
                if (currentScroll > 80) {
                    if (scrollingDown) {
                        setHideStickyNav(true);
                    }
                    else if (scrollingUp) {
                        setHideStickyNav(false);
                    }
                }
                else {
                    // Show navbar between 20px - 120px scroll
                    setHideStickyNav(false);
                }
            }
            else {
                setIsNavSticky(false);
                setHideStickyNav(false);
            }

            // Update previous scroll value
            prevScrollValue.current = currentScroll;
        }

        document.addEventListener("scroll", handleScroll);

        return () => document.removeEventListener("scroll", handleScroll);
    }, []);

    // useEffect to close sidebar on outside click
    useEffect(() => {
        // Locking body scroll when sidebar is open
        const body = document.querySelector("body");

        if (showSidebar) {
            body.style.overflow = "hidden";
        }
        else {
            body.style.overflowY = "scroll";
        }

        const handleClickOutside = (e) => {
            if (showSidebar === true && sidebarRef.current && !sidebarRef.current.contains(e.target)) {
                endAnimation();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [showSidebar]);

    // Functions
    function startAnimation() {
        // Show the sidebar
        setShowSidebar(true);

        setIsAnimating(true);

        setTimeout(() => {
            setAnimateCross(true);
        }, 100);
    }

    function endAnimation() {
        // Hide the sidebar
        setShowSidebar(false);

        setTimeout(() => {
            setAnimateCross(false);
        }, 150)

        setTimeout(() => {
            setIsAnimating(false);
        }, 200)
    }

    return (
        <nav
            className={`md:hidden flex items-center justify-between fixed z-10 w-full bg-[#0a192f] px-[25px] ${isNavSticky ? "h-[70px] [box-shadow:0_10px_30px_-10px_rgba(2,12,27,0.7)]" : "h-[100px]"} ${hideStickyNav ? "-translate-y-[100%]" : ""} `}
        >
            {/* ---- Logo ---- */}
            <a
                href="/"
                id="logo"
                className="active:bg-[#226185]"
            >
                <img src="/images/logo.png" alt="Logo of Siam Talukder" className="w-[42px] h-[42px]" />
            </a>

            {/* ---- Icons ---- */}
            <div className="relative">
                {/* ---- Menu Icon (Manual Design) ---- */}
                <div
                    onClick={startAnimation}
                    className={`flex flex-col items-end ${isAnimating ? "" : "gap-y-[8px]"} p-[15px] mr-[-15px] active:bg-[#226185] ${showSidebar ? "animate-menu-collapse" : "animate-menu-open"}`}
                >
                    <div className="w-9 h-[2px] bg-[#64ffda] rounded-[3px]"></div>
                    <div className="w-[30px] h-[2px] bg-[#64ffda] rounded-[3px]"></div>
                    <div className="w-6 h-[2px] bg-[#64ffda] rounded-[3px]"></div>
                </div>

                {/* ---- Cross Icon ---- */}
                <div
                    onClick={endAnimation}
                    className={`${(animateCross && showSidebar) && "block"} ${!animateCross ? "hidden" : ""} absolute top-[-15px] right-[-15px] z-20 p-[15px] active:bg-[#226185]`}
                >
                    <div
                        className={`relative w-[30px] h-[30px] ${(animateCross && showSidebar) ? "animate-cross-spin-forward" : "animate-cross-spin-backward"}`}
                        style={{
                            transition: "all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1)"
                        }}
                    >
                        <div className="absolute top-1/2 -translate-y-1/2 w-[30px] h-[2px] bg-[#64ffda] -rotate-45"></div>
                        <div className="absolute top-1/2 -translate-y-1/2 w-[30px] h-[2px] bg-[#64ffda] rotate-45"></div>
                    </div>
                </div>
            </div>

            {/* ---- Nav Options Sidebar (Hidden by default) ---- */}
            <div
                ref={sidebarRef}
                className={`${isMobile ? "w-[75%]" : "w-1/2"} h-screen ${isTablet ? "p-[50px]" : "p-[25px]"} fixed z-10 top-0 right-0 bg-[#172a45] ${showSidebar ? "translate-x-0" : "translate-x-100"}`}
                style={{
                    transition: "all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1)",
                    boxShadow: "rgba(2, 12, 27, 0.7) -10px 0px 30px -15px"
                }}
            >
                {/* ---- Nav Options ---- */}
                <ul className={`w-full h-full flex flex-col items-center ${isTablet ? "gap-y-[16px]" : "gap-y-[8px]"} justify-center font-mono`}>
                    {
                        navOptions.map(option => (
                            <li
                                key={option.id}
                                className="w-full flex flex-col items-center"
                            >
                                <span className="w-full text-sm text-[#64ffda] text-center mb-[5px] select-none">0{option.id}.</span>

                                <span
                                    className={`${isSmallerMobile && "text-[13px] leading-[17px]"} ${isTablet && "text-lg leading-[23px]"} ${(!isSmallerMobile && !isTablet && "text-base leading-[21px]")} w-full text-[#ccd6f6] text-center pt-[3px] px-5 pb-5 active:bg-[#226185] active:text-[#64ffda]`}
                                    style={{
                                        transition: "0.25s cubic-bezier(0.645, 0.045, 0.355, 1)"
                                    }}
                                    onClick={() => {
                                        endAnimation();
                                        handleScrollTo(option.link);
                                    }}
                                >
                                    {option.name}
                                </span>
                            </li>
                        ))
                    }

                    <li className="mt-[22px]">
                        <a
                            href="/resume/Resume_of_Siam_Talukder.pdf"
                            target="_blank"
                            className="cursor-pointer"
                        >
                            <Button value="Resume" paddingX="50px" paddingY="18px" fontSize="14px" />
                        </a>
                    </li>
                </ul>
            </div>
        </nav >
    )
}

export default MobileNavbar;