import { useEffect, useState } from "react"
import Button from "../Button";
import { navOptions } from "../../constants/data";
import { useMediaQuery } from "react-responsive";

const Navbar = ({ handleScrollTo, prevScrollValue }) => {
    // States
    const [isNavSticky, setIsNavSticky] = useState(false);
    const [hideStickyNav, setHideStickyNav] = useState(false);

    // Navbar extra responsive breakpoint
    const isLaptop = useMediaQuery({minWidth: 1000});

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
                if (currentScroll > 120) {
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

    return (
        <nav
            className={`hidden md:flex items-center justify-between fixed z-10 w-full bg-[#0a192f] ${isLaptop ? "px-[50px]" : "px-10"} ${isNavSticky ? "h-[70px] [box-shadow:0_10px_30px_-10px_rgba(2,12,27,0.7)]" : "h-[100px]"} ${hideStickyNav ? "-translate-y-[100%]" : ""}`}
        >
            {/* ---- Logo ---- */}
            <a
                href="/"
                id="logo"
            >
                <img src="/images/logo.png" alt="Logo of Siam Talukder" className="w-[42px] h-[42px]" />
            </a>

            {/* ---- Nav Options ---- */}
            <ul
                className="flex items-center gap-x-5 font-mono text-center"
            >
                {
                    navOptions.map(option => (
                        <li
                            id="nav-item"
                            key={option.id}
                        >
                            <span className="text-xs text-[#64ffda] select-none">0{option.id}.</span>
                            <span
                                className="py-3 px-2.5 text-[13px] leading-[17px] text-[#CCD6F6] hover:text-[#64ffda] cursor-pointer"
                                style={{
                                    transition: "0.25s cubic-bezier(0.645, 0.045, 0.355, 1)"
                                }}
                                onClick={() => handleScrollTo(option.link)}
                            >
                                {option.name}
                            </span>
                        </li>
                    ))
                }
                <li id="nav-item">
                    <a
                        href="/resume/Resume_of_Siam_Talukder.pdf"
                        target="_blank"
                        className="cursor-pointer"
                    >
                        <Button value="Resume" paddingX="16px" paddingY="12px" fontSize="13px" />
                    </a>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar