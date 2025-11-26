import GitHubIcon from "../icons/GitHubIcon"
import CodePenIcon from "../icons/CodePenIcon"
import LinkedInIcon from "../icons/LinkedInIcon"
import MediumIcon from "../icons/MediumIcon"
import FacebookIcon from "../icons/FacebookIcon"
import { useMediaQuery } from "react-responsive"

const socials = [
    {
        id: 1,
        icon: <GitHubIcon width={20} height={20} />,
        link: "https://github.com/siamtalukder484"
    },
    {
        id: 2,
        icon: <CodePenIcon width={20} height={20} />,
        link: "https://codepen.io/siamtalukder484"
    },
    {
        id: 3,
        icon: <LinkedInIcon width={20} height={20} />,
        link: "https://www.linkedin.com/in/siamtalukder"
    },
    {
        id: 4,
        icon: <MediumIcon width={20} height={20} />,
        link: "https://medium.com/@siamtalukder484"
    },
    {
        id: 5,
        icon: <FacebookIcon width={20} height={20} />,
        link: "https://www.facebook.com/siam.web.dev"
    },
];

const Footer = () => {
    const breakpoint1 = useMediaQuery({ maxWidth: 610 });

    return (
        <footer className="bg-[#020c1b] w-full min-h-[70px] p-[15px] flex items-center flex-col md:flex-row">
            {/* ---- Social Icons ---- */}
            <ul className="md:hidden flex items-center justify-between w-full max-w-[270px] mb-5">
                {
                    socials.map(social => (
                        <li
                            key={social.id}
                            className=""
                        >
                            <a
                                href={social.link}
                                target="_blank"
                                className="text-[#a8b2d1] hover:text-[#64ffda] block hover:translate-y-[-3px] p-2.5"
                                style={{
                                    transition: "0.25s cubic-bezier(0.645, 0.045, 0.355, 1)"
                                }}
                            >
                                {social.icon}
                            </a>
                        </li>
                    ))
                }
            </ul>

            {/* ---- Footer Text ---- */}
            <div className={`flex ${breakpoint1 ? "flex-col gap-y-3" : "flex-wrap gap-y-5"} justify-center items-center gap-x-8 sm:gap-x-10 w-full mx-auto max-w-[750px] lg:max-w-full`}>
                <div>
                    <p className="font-mono text-[13px] leading-[17px] text-[#8892b0]">
                        Design Inspired by:&nbsp;
                        <a
                            href="https://github.com/bchiang7"
                            target="_blank"
                            className="active:bg-[#226185] active:text-[#64ffda] hover:text-[#64ffda] font-bold"
                            style={{
                                transition: "0.25s cubic-bezier(0.645, 0.045, 0.355, 1)"
                            }}
                        >Brittany Chiang</a>
                    </p>
                </div>

                <div className={`w-[2px] h-6 bg-[#8892b0] ${breakpoint1 ? "hidden" : "block"}`}></div>

                <div>
                    <p className="font-mono text-[13px] text-[#8892b0] leading-[17px]">
                        Copyrighted by:&nbsp;
                        <a
                            href="https://github.com/siamtalukder484"
                            target="_blank"
                            className="active:bg-[#226185] active:text-[#64ffda] hover:text-[#64ffda] font-bold"
                            style={{
                                transition: "0.25s cubic-bezier(0.645, 0.045, 0.355, 1)"
                            }}
                        >Siam Talukder</a>
                    </p>
                </div>

                <div className="hidden lg:block w-[2px] h-6 bg-[#8892b0]"></div>

                <div>
                    <p className="font-mono text-[13px] text-[#8892b0] leading-[17px]">
                        Built by:&nbsp;
                        <a
                            href="https://github.com/iamrafsanrafi"
                            target="_blank"
                            className="active:bg-[#226185] active:text-[#64ffda] hover:text-[#64ffda] font-bold"
                            style={{
                                transition: "0.25s cubic-bezier(0.645, 0.045, 0.355, 1)"
                            }}
                        >Rafsan Rafi</a>
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer