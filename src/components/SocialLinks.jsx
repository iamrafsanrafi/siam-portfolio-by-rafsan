import GitHubIcon from "../icons/GitHubIcon"
import CodePenIcon from "../icons/CodePenIcon"
import LinkedInIcon from "../icons/LinkedInIcon"
import MediumIcon from "../icons/MediumIcon"
import FacebookIcon from "../icons/FacebookIcon"

const socials = [
    {
        id: 1,
        icon: <GitHubIcon />,
        link: "https://github.com/siamtalukder484"
    },
    {
        id: 2,
        icon: <CodePenIcon />,
        link: "https://codepen.io/siamtalukder484"
    },
    {
        id: 3,
        icon: <LinkedInIcon />,
        link: "https://www.linkedin.com/in/siamtalukder"
    },
    {
        id: 4,
        icon: <MediumIcon />,
        link: "https://medium.com/@siamtalukder484"
    },
    {
        id: 5,
        icon: <FacebookIcon />,
        link: "https://www.facebook.com/siam.web.dev"
    },
];

const SocialLinks = () => {
    return (
        <div 
            id="social-links" 
            className="hidden md:flex flex-col items-center gap-y-5 fixed bottom-0 left-[40px]"
        >
            {/* ---- Social Icons ---- */}
            <ul className="flex flex-col items-center">
                {
                    socials.map(social => (
                        <li
                            key={social.id}
                            className=""
                        >
                            <a
                                href={social.link}
                                target="_blank"
                                className="text-[#a8b2d1] hover:text-[#64ffda] block hover:translate-y-[-3px] p-3.5"
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

            {/* ---- Vertical Line ---- */}
            <div className="h-[90px] w-[1px] bg-[#a8b2d1]"></div>
        </div>
    )
}

export default SocialLinks