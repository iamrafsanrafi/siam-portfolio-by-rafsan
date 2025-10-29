import { skills } from "../constants/data";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const AboutSection = () => {
    useGSAP(() => {
        gsap.from("#about", {
            scrollTrigger: {
                trigger: "#about",
                start: "top 90%"
            },
            opacity: 0,
            yPercent: 5,
            ease: "power1.inOut",
            delay: 0.35
        })
    }, [])

    return (
        <section id="about" className="max-w-[1000px] mx-auto py-[150px]">
            {/* ---- Section Heading ---- */}
            <div className="flex items-center mt-2.5 mb-10">
                <p className="font-mono text-xl text-[#64ffda] relative bottom-1 mr-2.5 select-none">01.</p>
                <h3 className="font-calibre text-[32px] text-[#ccd6f6] font-semibold leading-[42px]">About Me</h3>
                <hr className="w-[300px] border-[#2d3952] ml-5 relative bottom-1" />
            </div>

            {/* ---- Main Content Wrapper ---- */}
            <div className="flex justify-between">
                {/* ---- Info Part ---- */}
                <div className="max-w-[480px]">
                    <p className="font-calibre text-xl text-[#8892b0] leading-[1.3] mb-[15px] text-justify">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate sit saepe asperiores voluptatem aperiam, dignissimos sed enim expedita quam veniam?
                    </p>

                    <p className="font-calibre text-xl text-[#8892b0] leading-[1.3] mb-[15px] text-justify">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae saepe consequatur esse nesciunt natus aspernatur deleniti illo quam. Dolorum voluptatum quaerat sunt. Ipsum doloremque laborum ad, a quas necessitatibus labore.
                    </p>

                    <p className="font-calibre text-xl text-[#8892b0] leading-[1.3] mb-[15px]">These are some of the technologies I've recently been working with:</p>

                    {/* ---- Skills List ---- */}
                    <ul style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, minmax(140px, 200px)"
                    }}>
                        {
                            skills.map((skill, index) => (
                                <li
                                    key={index}
                                    className="font-mono text-[13px] text-[#8892b0] mb-[10px] pl-5 relative before:content-['▹'] before:absolute before:left-0 before:text-[#64ffda] before:text-sm before:leading-[12px]"
                                >{skill}</li>
                            ))
                        }
                    </ul>
                </div>

                {/* ---- Image Part ---- */}
                <div className={`w-[320px] h-[320px] relative`}>
                    <div
                        className={`w-[320px] h-[320px] rounded-[5px] group bg-[#64ffda] transition`}
                    >
                        <a
                            href="https://github.com/siamtalukder484"
                            target="_blank"
                            className="block mix-blend-multiply grayscale contrast-100 hover:grayscale-0 hover:mix-blend-normal"
                            style={{
                                transition: "all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1)"
                            }}
                        >
                            <img
                                src="/images/Siam Talukder.jpg"
                                alt="Image of — Siam Talukder"
                                loading="lazy"
                                className="w-full"
                            />
                        </a>

                        <div
                            className={`w-[320px] h-[320px] border border-[#64ffda] rounded-[3px] absolute top-5 left-5 z-[-1] group group-hover:top-3 group-hover:left-3`}
                            style={{
                                transition: "all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1)"
                            }}
                        >
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutSection