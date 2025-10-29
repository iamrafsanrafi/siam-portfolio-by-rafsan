import { useGSAP } from "@gsap/react"
import { allProjects } from "../constants/data"
import GitHubIcon from "../icons/GitHubIcon"
import RedirectIcon from "../icons/RedirectIcon"

import gsap from "gsap"

const ProjectsSection = () => {
    useGSAP(() => {
        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: "#projects",
                start: "top 90%"
            },
            delay: 0.35
        });

        // Animating the heading
        timeline.fromTo("#projects", {
            opacity: 0,
            yPercent: 5,
        }, {
            opacity: 1,
            yPercent: 0,
            ease: "power1.inOut",
            duration: 0.8
        });

        // Animating the projects one by one only when they are inside the viewport
        gsap.utils.toArray("#projects .project").forEach(project => {
            gsap.fromTo(project, {
                opacity: 0,
                yPercent: 10,
                ease: "power1.inOut"
            }, {
                opacity: 1,
                yPercent: 0,
                scrollTrigger: {
                    trigger: project,
                    start: "top 90%",
                },
                delay: 0.4
            })
        });
    }, []);

    return (
        <section id="projects" className="max-w-[1000px] mx-auto py-[150px]">
            {/* ---- Section Heading ---- */}
            <div id="project-heading" className="flex items-center mt-2.5 mb-10">
                <p className="font-mono text-xl text-[#64ffda] relative bottom-1 mr-2.5 select-none">03.</p>
                <h3 className="font-calibre text-[32px] text-[#ccd6f6] font-semibold leading-[42px]">Some Things I've Built</h3>
                <hr className="w-[300px] border-[#2d3952] ml-5 relative bottom-1" />
            </div>

            {/* ---- Projects ---- */}
            <div className="flex flex-col gap-y-[100px]">
                {allProjects.map(project => (
                    <div
                        key={project.id}
                        className={`project flex items-center relative ${project.id % 2 == 0 ? "justify-end" : "justify-start"}`}
                    >
                        {/* ---- Project Image ---- */}
                        <a
                            href={project.link}
                            target="_blank"
                            className="block max-w-[580px] bg-[#64ffda] rounded-[3px] hover:bg-transparent relative before:absolute before:cotent-[''] before:w-full before:h-full before:inset-0 before:z-3 before:bg-[#0a192f] before:mix-blend-screen group select-none"
                            style={{
                                transition: "0.25s cubic-bezier(0.645, 0.045, 0.355, 1)"
                            }}
                        >
                            <div
                                className="rounded-[3px] grayscale contrast brightness-90 mix-blend-multiply group group-hover:grayscale-0 group-hover:brightness-100 group-hover:mix-blend-normal"
                                style={{
                                    transition: "0.25s cubic-bezier(0.645, 0.045, 0.355, 1)"
                                }}
                            >
                                <img src={project.image} alt={project.name} className="w-full rounded-[3px]" />
                            </div>
                        </a>


                        {/* ---- Project Details ---- */}
                        <div className={`absolute z-5 max-w-[495px] ${project.id % 2 == 0 ? "text-left left-0" : "text-right right-0"}`}>
                            <p className="font-mono text-[13px] text-[#64ffda] leading-[17px] my-[10px]">Featured Project</p>

                            <h4
                                className="inline-block font-calibre font-semibold text-[28px] text-[#ccd6f6] hover:text-[#64ffda] mb-5 cursor-pointer"
                                style={{
                                    transition: "0.25s cubic-bezier(0.645, 0.045, 0.355, 1)"
                                }}
                            >
                                <a href={project.link} target="_blank">{project.name}</a>
                            </h4>

                            <div
                                className="font-calibre text-lg text-[#a8b2d1] leading-[28px] rounded-[3px] p-[25px] bg-[#172a45]"
                                style={{
                                    boxShadow: "rgba(2, 12, 27, 0.7) 0px 10px 30px -15px"
                                }}
                            >
                                {project.description}
                            </div>

                            <ul className={`flex gap-x-5 ${project.id % 2 == 0 ? "justify-start" : "justify-end"} mt-[25px] mb-2.5`}>
                                {project.technologies.map((t, index) => (
                                    <li
                                        key={index}
                                        className="font-mono text-[13px] text-[#8892b0] leading-[17px]"
                                    >{t}</li>
                                ))}
                            </ul>

                            {/* ---- Links ---- */}
                            <div className={`mt-2.5 ${project.id % 2 == 0 ? "-ml-2.5" : "-mr-2.5"}`}>
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
                    </div>
                ))}
            </div>
        </section>
    )
}

export default ProjectsSection