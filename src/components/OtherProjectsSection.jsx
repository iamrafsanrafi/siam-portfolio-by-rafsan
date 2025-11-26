import FolderIcon from "../icons/FolderIcon";
import Button from "./Button";
import { otherProjects } from "../constants/data";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import RedirectIcon from "../icons/RedirectIcon";
import GitHubIcon from "../icons/GitHubIcon";
import { useMediaQuery } from "react-responsive";

const OtherProjectsSection = () => {
    // Constants
    const INITIAL_LIMIT = 6;

    // States
    const [showingLimit, setShowingLimit] = useState(INITIAL_LIMIT);

    // Extra hooks
    const hasAnimatedRef = useRef(false);
    const previousLimitRef = useRef(INITIAL_LIMIT);

    // Extra responsive breakpoints
    const breakpoint1 = useMediaQuery({ maxWidth: 614 });
    const breakpoint2 = useMediaQuery({ maxWidth: 1229 });

    // Functions
    const showMore = () => setShowingLimit(otherProjects.length);
    const showLess = () => setShowingLimit(INITIAL_LIMIT);

    // GSAP Animation
    useGSAP(() => {
        // Animation configuration
        const ANIMATION_CONFIG = {
            y: 20,
            duration: 0.25,
            ease: "cubic-bezier(0.645, 0.045, 0.355, 1)",
        };

        if (!hasAnimatedRef.current) {
            // Hide all projects initially
            gsap.set("#other-projects .project", { opacity: 0, y: ANIMATION_CONFIG.y });

            // Animate section heading
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: "#other-projects",
                    start: "top 95%",
                    once: true,
                },
                delay: 0.35,
                onStart: () => {
                    hasAnimatedRef.current = true;
                },
            });

            tl.fromTo(
                "#other-projects .heading",
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 0.6, ease: "power1.inOut" }
            );

            // Animate each project individually when entering viewport
            gsap.utils.toArray("#other-projects .project").forEach((project, i) => {
                gsap.fromTo(
                    project,
                    { opacity: 0, y: ANIMATION_CONFIG.y },
                    {
                        scrollTrigger: {
                            trigger: project,
                            start: "top 95%",
                            once: true,
                            onEnter: () => {
                                gsap.to(project, {
                                    opacity: 1,
                                    y: 0,
                                    delay: (i % 3) * 0.15,
                                    duration: ANIMATION_CONFIG.duration,
                                    ease: ANIMATION_CONFIG.ease,
                                    clearProps: "transform",
                                });
                            },
                        },
                    }
                );
            });
        }

        // Animating other hidden projects when clicking show more
        else if (showingLimit > previousLimitRef.current) {
            const moreProjects = document.querySelectorAll("#other-projects .more-project");

            if (moreProjects.length > 0) {
                gsap.set(moreProjects, { y: ANIMATION_CONFIG.y });

                gsap.to(moreProjects, {
                    y: 0,
                    opacity: 1,
                    stagger: 0.08,
                    duration: ANIMATION_CONFIG.duration,
                    ease: ANIMATION_CONFIG.ease,
                    clearProps: "transform",
                });
            }
        }

        previousLimitRef.current = showingLimit;
    }, [showingLimit]);

    return (
        <section id="other-projects" className="max-w-[1000px] mx-auto py-[100px] md:py-[150px]">
            {/* ---- Section Heading ---- */}
            <div className="heading flex flex-col items-center">
                <h3 className="font-calibre text-2xl leading-[31px] md:text-[32px] md:leading-[42px] text-[#ccd6f6] font-semibold">
                    Other Noteworthy Projects
                </h3>
            </div>

            {/* ---- Other Projects ---- */}
            <div className={`grid grid-cols-12 gap-[15px] mt-[50px] cursor-default transition-all duration-300`}>
                {otherProjects.slice(0, showingLimit).map((project, index) => (
                    <a
                        key={project.id}
                        href={project.link}
                        target="_blank"
                        tabIndex={0}
                        className={`${index + 1 <= INITIAL_LIMIT ? "project" : "more-project opacity-0"} ${breakpoint1 ? "col-span-12" : ""} ${(!breakpoint1 && breakpoint2) ? "col-span-6" : "col-span-4"} block bg-[#172a45] py-8 px-7 transition-all focus:-translate-y-[5px] active:-translate-y-[5px] hover:-translate-y-[5px] group`}
                        style={{
                            boxShadow: "rgba(2, 12, 27, 0.7) 0px 10px 30px -15px",
                            transition: "0.25s cubic-bezier(0.645, 0.045, 0.355, 1)"
                        }}
                    >
                        <div className="flex items-center justify-between">
                            <FolderIcon />
                            <div className="mr-[-10px]">
                                <a
                                    href={project.github}
                                    target="_blank"
                                    className="text-[#ccd6f6] hover:text-[#64ffda] inline-block p-2.5"
                                    style={{
                                        transition: "0.25s cubic-bezier(0.645, 0.045, 0.355, 1)"
                                    }}
                                >
                                    <GitHubIcon width={22} height={21} />
                                </a>
                                <a
                                    href={project.link}
                                    target="_blank"
                                    className="text-[#ccd6f6] hover:text-[#64ffda] inline-block p-2.5"
                                    style={{
                                        transition: "0.25s cubic-bezier(0.645, 0.045, 0.355, 1)"
                                    }}
                                >
                                    <RedirectIcon />
                                </a>
                            </div>
                        </div>

                        <h4
                            className="font-calibre font-semibold text-[22px] text-[#ccd6f6] group-hover:text-[#64ffda] leading-[29px] mt-[30px] mb-2.5"
                            style={{
                                transition: "0.25s cubic-bezier(0.645, 0.045, 0.355, 1)"
                            }}
                        >
                            {project.title}
                        </h4>

                        <p className="font-calibre text-[17px] text-justify text-[#a8b2d1] leading-[22px] mb-[35px]">
                            {project.description}
                        </p>

                        <ul className="flex flex-wrap gap-x-[15px] mt-5">
                            {project.technologies.map((t, index) => (
                                <li
                                    key={index}
                                    className="font-mono text-xs text-[#8892b0] leading-[21px]"
                                >
                                    {t}
                                </li>
                            ))}
                        </ul>
                    </a>
                ))}
            </div>

            {/* ---- Show More / Less Button only when projects are more than limit ---- */}
            {
                otherProjects.length > INITIAL_LIMIT && (
                    <div className="text-center mt-[100px]">
                        {showingLimit === INITIAL_LIMIT ? (
                            <Button value="Show More" handleClick={showMore} />
                        ) : (
                            <Button value="Show Less" handleClick={showLess} />
                        )}
                    </div>
                )
            }
        </section>
    );
};

export default OtherProjectsSection;