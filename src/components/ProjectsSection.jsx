import { useGSAP } from "@gsap/react"
import { allProjects } from "../constants/data"
import GitHubIcon from "../icons/GitHubIcon"
import RedirectIcon from "../icons/RedirectIcon"
import gsap from "gsap"
import { useMediaQuery } from "react-responsive"

const ProjectsSection = () => {
    // Extra responsive breakpoint
    const breakpoint1 = useMediaQuery({ maxWidth: 480 });
    const breakpoint2 = useMediaQuery({ minWidth: 601 });
    const breakpoint3 = useMediaQuery({ minWidth: 1001 });

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
        <section id="projects" className="max-w-[1000px] mx-auto py-[100px] md:py-[150px]">
            {/* ---- Section Heading ---- */}
            <div className="flex items-center mt-2.5 mb-10">
                <p className="font-mono text-lg md:text-xl leading-[23px] md:leading-[26px] text-[#64ffda] relative bottom-1 mr-2.5 select-none">03.</p>

                <h3 className="font-calibre text-2xl leading-[31px] md:text-[32px] md:leading-[42px] text-[#ccd6f6] font-semibold">Some Things I've Built</h3>

                <hr className={`flex-1 ${breakpoint3 ? "max-w-[300px]" : "md:max-w-[200px]"} border-[#2d3952] ${breakpoint2 ? "ml-5" : "ml-2.5"} relative bottom-1`} />
            </div>

            {/* ---- Projects ---- */}
            <div className={`flex flex-col ${breakpoint2 ? "gap-y-[100px]" : "gap-y-[70px]"}`}>
                {allProjects.map(project => (
                    <div
                        key={project.id}
                        className={`project flex items-center relative ${project.id % 2 == 0 ? "justify-end" : "justify-start"}`}
                    >
                        {/* ---- Project Image ---- */}
                        <a
                            href={project.link}
                            target="_blank"
                            className={`block ${breakpoint2 ? "w-[58.33%] relative h-[380px] md:h-[360px] max-w-[580px]" : "w-full opacity-25 absolute inset-0 h-full"} bg-[#64ffda] rounded-[3px] hover:bg-transparent before:absolute before:cotent-[''] before:w-full before:h-full before:inset-0 before:z-3 before:bg-[#0a192f] before:mix-blend-screen group select-none`}
                            style={{
                                transition: "0.25s cubic-bezier(0.645, 0.045, 0.355, 1)"
                            }}
                        >
                            <div
                                className="rounded-[3px] grayscale contrast brightness-90 mix-blend-multiply group group-hover:grayscale-0 group-hover:brightness-100 group-hover:mix-blend-normal w-full h-full"
                                style={{
                                    transition: "0.25s cubic-bezier(0.645, 0.045, 0.355, 1)"
                                }}
                            >
                                <img src={project.image} alt={project.name} className="w-full h-full rounded-[3px] object-cover object-center" />
                            </div>
                        </a>


                        {/* ---- Project Details ---- */}
                        <div className={`${breakpoint1 ? "pt-[30px] px-[25px] pb-[20px]" : ""} ${breakpoint2 ? "absolute w-[50%] p-0" : "relative w-full"} ${!breakpoint1 && !breakpoint2 ? "pt-10 px-10 pb-[30px]" : ""} z-5 md:max-w-[495px] ${project.id % 2 == 0 ? "text-left left-0" : "text-right right-0"}`}>
                            <p className="font-mono text-[13px] text-[#64ffda] leading-[17px] my-[10px]">Featured Project</p>

                            <h4
                                className="inline-block font-calibre font-semibold text-2xl leading-[31px] md:text-[28px] md:leading-[36px] text-[#ccd6f6] mb-5 cursor-pointer"
                                style={{
                                    transition: "0.25s cubic-bezier(0.645, 0.045, 0.355, 1)"
                                }}
                            >
                                <a href={project.link} target="_blank" className="focus:text-[#64ffda] active:bg-[#226185] active:text-[#64ffda] hover:text-[#64ffda]">{project.name}</a>
                            </h4>

                            <p
                                className={`font-calibre text-lg text-[#a8b2d1] leading-[23px] rounded-[3px] ${breakpoint2 ? "bg-[#172a45] p-[25px]" : "bg-transparent py-5"}`}
                                style={{
                                    boxShadow: `${breakpoint2 ? "rgba(2, 12, 27, 0.7) 0px 10px 30px -15px" : "none"}`
                                }}
                            >
                                {project.description}
                            </p>

                            <ul className={`flex gap-x-5 ${project.id % 2 == 0 ? "justify-start" : "justify-end"} mt-[25px] mb-2.5`}>
                                {project.technologies.map((t, index) => (
                                    <li
                                        key={index}
                                        className={`font-mono text-[13px] ${breakpoint2 ? "text-[#8892b0]" : "text-[#ccd6f6]"} leading-[17px] mb-[7px]`}
                                    >{t}</li>
                                ))}
                            </ul>

                            {/* ---- Links ---- */}
                            <div className={`mt-2.5 ${project.id % 2 == 0 ? "-ml-2.5" : "-mr-2.5"}`}>
                                <a
                                    href={project.github}
                                    target="_blank"
                                    className="text-[#ccd6f6] focus:text-[#64ffda] active:bg-[#226185] active:text-[#64ffda] hover:text-[#64ffda] inline-block p-2.5"
                                    style={{
                                        transition: "0.25s cubic-bezier(0.645, 0.045, 0.355, 1)"
                                    }}
                                >
                                    <GitHubIcon width={22} height={21} />
                                </a>
                                <a
                                    href={project.link}
                                    target="_blank"
                                    className="text-[#ccd6f6] focus:text-[#64ffda] active:bg-[#226185] active:text-[#64ffda] hover:text-[#64ffda] inline-block p-2.5"
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