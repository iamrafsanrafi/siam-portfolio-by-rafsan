import { useGSAP } from "@gsap/react"
import Button from "./Button"
import gsap from "gsap"
import { useMediaQuery } from "react-responsive"

const ContactSection = () => {
    // Extra responsive breakpoints
    const breakpoint1 = useMediaQuery({ minWidth: 1001 });
    const breakpoint2 = useMediaQuery({ maxWidth: 480 });

    useGSAP(() => {
        gsap.from("#contact", {
            scrollTrigger: {
                trigger: "#contact",
                start: "top 90%"
            },
            opacity: 0,
            yPercent: 6,
            ease: "power1.inOut",
            delay: 0.35
        })
    }, []);

    return (
        <section id="contact" className="flex flex-col items-center max-w-[600px] mx-auto mb-[100px] py-[100px] md:py-[150px]">
            {/* ---- Section Heading ---- */}
            <div>
                <p className={`font-mono ${breakpoint1 ? "text-base leading-[21px]" : "text-sm leading-[18px]"} text-[#64ffda] text-center mt-2.5 mb-5`}>
                    <span className="select-none">04. </span>
                    What's Next?
                </p>

                <h2 className={`font-calibre font-semibold text-[40px] leading-[52px] ${breakpoint1 ? "text-[60px] leading-[78px]" : "md:text-[50px] md:leading-[65px]"}  text-[#ccd6f6] text-center  mb-5`}>Get In Touch</h2>
            </div>

            {/* ---- Description ---- */}
            <p className={`font-calibre ${breakpoint2 ? "text-lg leading-[23px]" : "text-xl leading-[26px]"} text-[#8892b0] text-center mb-[15px]`}>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam consectetur minima autem, expedita dolorem vitae laudantium tempore officia illum, illo, nemo ab voluptatum perferendis cupiditate eligendi. Nobis asperiores pariatur ad.
            </p>

            <a href="mailto:siamtalukder484@gmail.com" className="mt-[50px]">
                <Button value="Say Hello" />
            </a>
        </section>
    )
}

export default ContactSection