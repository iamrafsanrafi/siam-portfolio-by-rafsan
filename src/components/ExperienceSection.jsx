import { useEffect, useRef, useState } from "react";
import { allJobs } from "../constants/data";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useMediaQuery } from "react-responsive";

const ExperienceSection = () => {
    // States
    const [selectedJob, setSelectedJob] = useState(1);
    const [barPosition, setBarPosition] = useState(0);

    // Extra hooks
    const tabsRef = useRef([]);
    const barRef = useRef(null);

    // Extra responsive breakpoint
    const breakpoint1 = useMediaQuery({ minWidth: 481 });
    const breakpoint2 = useMediaQuery({ minWidth: 601 });
    const breakpoint3 = useMediaQuery({ minWidth: 1001 });

    // Constants
    const TAB_HEIGHT = 42;

    const currentJob = allJobs[selectedJob - 1];

    useGSAP(() => {
        gsap.from("#jobs", {
            scrollTrigger: {
                trigger: "#jobs",
                start: "top 90%"
            },
            opacity: 0,
            yPercent: 5,
            ease: "power1.inOut",
            delay: 0.35
        })
    }, []);

    // Functions
    const updateBarPosition = (idx) => {
        if (breakpoint2) {
            setBarPosition(TAB_HEIGHT * idx);
        }
        else {
            let position = 0;
            for(let i = 0; i < idx; i++) {
                position += tabsRef.current[i].offsetWidth;
            }
            const tabWidth = tabsRef.current[idx].offsetWidth;
            barRef.current.style.width = `${tabWidth}px`
            setBarPosition(position);
        }
    }

    return (
        <section id="jobs" className="max-w-[700px] mx-auto py-[100px] md:py-[150px]">
            {/* ---- Section Heading ---- */}
            <div className="flex items-center mt-2.5 mb-10">
                <p className="font-mono text-lg md:text-xl leading-[23px] md:leading-[26px] text-[#64ffda] relative bottom-1 mr-2.5 select-none">02.</p>

                <h3 className="font-calibre text-2xl leading-[31px] md:text-[32px] md:leading-[42px] text-[#ccd6f6] font-semibold">Where I've Worked</h3>

                <hr className={`flex-1 ${breakpoint3 ? "max-w-[300px]" : "md:max-w-[200px]"} border-[#2d3952] ${breakpoint2 ? "ml-5" : "ml-2.5"} relative bottom-1`} />
            </div>

            {/* ---- Experience Part ---- */}
            <div className={`flex ${breakpoint2 ? "flex-row" : "flex-col"}`}>
                {/* ---- Tabs ---- */}
                <ul className={`relative min-w-[200px] md:min-w-[210px] flex shrink-0 ${breakpoint2 ? "flex-col" : "flex-row overflow-x-auto mb-[30px]"}`}>
                    {allJobs.map((job, index) => (
                        <li
                            key={job.id}
                            tabIndex={0}
                            ref={(el) => tabsRef.current[index] = el}
                            className={`font-mono flex items-center shrink-0 text-[13px] leading-[17px] cursor-pointer ${breakpoint2 ? "" : "min-w-[120px] justify-center"} h-[42px] px-[15px] md:px-5 ${breakpoint2 ? "pb-[2px]" : ""} ${breakpoint2 ? "border-l-2 border-l-[#333f58]" : "border-b-2 border-b-[#333f58]"} hover:bg-[#172a45] focus:bg-[#172a45] active:bg-[#226185] active:text-[#64ffda] hover:text-[#64ffda] ${selectedJob === job.id ? "text-[#64ffda]" : "text-[#606a86] bg-transparent"} outline-none whitespace-nowrap`}
                            onClick={() => {
                                setSelectedJob(job.id);
                                updateBarPosition(index)
                            }}
                            style={{
                                transition: "0.2s cubic-bezier(0.645, 0.045, 0.355, 1)"
                            }}
                        >{job.company}</li>
                    ))}

                    {/* Bar */}
                    <span
                        ref={barRef}
                        className={`absolute ${breakpoint2 ? "left-0 top-0 w-[2px] h-[42px]" : "bottom-0 left-0 w-[120px] h-[2px]"} bg-[#64ffda] ease-out`}
                        style={{
                            [breakpoint2 ? "top" : "left"]: `${barPosition}px`,
                            transition: "0.25s cubic-bezier(0.645, 0.045, 0.355, 1)",
                        }}
                    ></span>
                </ul>

                {/* ---- Specific Job ---- */}
                <div className={`pt-3 ${breakpoint2 ? "pl-5" : ""} md:pl-[30px]`}>
                    <h4 className="font-calibre font-medium text-[22px] text-[#ccd6f6] leading-[29px] mb-[5px]">
                        {currentJob.title}

                        <span className="text-[#64ffda]">
                            @ <a href={currentJob.link} target="_blank" className="cursor-pointer relative after:absolute after:bottom-0 after:left-0 after:content-[''] after:w-0 after:h-[1px] after:bg-[#64ffda] after:transition-all after:duration-300 after:ease-linear after:opacity-50 hover:after:w-full">{currentJob.company}</a>
                        </span>
                    </h4>

                    <p className="font-mono text-[13px] leading-[17px] text-[#a8b2d1] mb-[30px] tracking-wider">{currentJob.date}</p>

                    {/* ---- Description List ---- */}
                    <ul className="flex flex-col gap-y-2.5">
                        {
                            currentJob.descriptions.map((description, index) => (
                                <li
                                    key={index}
                                    className="pl-[30px] font-calibre text-lg leading-[23px] text-justify text-[#8892b0] relative before:content-['▹'] before:absolute before:top-1 before:left-0 before:text-[#64ffda] before:text-lg before:leading-[23px]"
                                >{description}</li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default ExperienceSection