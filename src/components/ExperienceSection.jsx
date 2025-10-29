import { useState } from "react";
import { allJobs } from "../constants/data";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const ExperienceSection = () => {
    // States
    const [selectedJob, setSelectedJob] = useState(1);
    const [barPosition, setBarPosition] = useState(0);

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
    }, [])

    return (
        <section id="jobs" className="max-w-[700px] mx-auto py-[150px]">
            {/* ---- Section Heading ---- */}
            <div className="flex items-center mt-2.5 mb-10">
                <p className="font-mono text-xl text-[#64ffda] relative bottom-1 mr-2.5 select-none">02.</p>
                <h3 className="font-calibre text-[32px] text-[#ccd6f6] font-semibold leading-[42px]">Where I've Worked</h3>
                <hr className="w-[300px] border-[#2d3952] ml-5 relative bottom-1" />
            </div>

            {/* ---- Experience Part ---- */}
            <div className="flex">
                {/* ---- Tabs ---- */}
                <ul className="relative min-w-[212px]">
                    {allJobs.map((job, index) => (
                        <li
                            key={job.id}
                            className={`font-mono flex items-center text-[13px] cursor-pointer h-[42px] px-5 pb-[2px] border-l border-l-[#333f58] hover:bg-[#172a45] hover:text-[#64ffda] ${selectedJob === job.id ? "text-[#64ffda] bg-[#172a45]" : "text-[#606a86] bg-transparent"}`}
                            onClick={() => {
                                setSelectedJob(job.id);
                                setBarPosition(TAB_HEIGHT * index);
                            }}
                        >{job.company}</li>
                    ))}

                    {/* Bar */}
                    <span
                        className="absolute top-0 left-0 w-[2px] h-[42px] bg-[#64ffda]  ease-out"
                        style={{
                            top: `${barPosition}px`,
                            transition: "0.25s cubic-bezier(0.645, 0.045, 0.355, 1)"
                        }}
                    ></span>
                </ul>

                {/* ---- Specific Job ---- */}
                <div className="pt-3 pl-[30px]">
                    <h4 className="font-calibre font-medium text-[22px] text-[#ccd6f6] leading-[29px] mb-[5px]">
                        {currentJob.title}

                        <span className="text-[#64ffda]">
                            @ <a href={currentJob.link} target="_blank" className="cursor-pointer relative after:absolute after:bottom-0 after:left-0 after:content-[''] after:w-0 after:h-[1px] after:bg-[#64ffda] after:transition-all after:duration-300 after:ease-linear after:opacity-50 hover:after:w-full">{currentJob.company}</a>
                        </span>
                    </h4>

                    <p className="font-mono text-[13px] text-[#a8b2d1] mb-[30px] tracking-wider">{currentJob.date}</p>

                    {/* ---- Description List ---- */}
                    <ul className="flex flex-col gap-y-2.5">
                        {
                            currentJob.descriptions.map((description, index) => (
                                <li
                                    key={index}
                                    className="pl-[30px] font-calibre text-lg text-justify text-[#8892b0] relative before:content-['▹'] before:absolute before:top-1 before:left-0 before:text-[#64ffda] before:text-lg before:leading-[23px]"
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