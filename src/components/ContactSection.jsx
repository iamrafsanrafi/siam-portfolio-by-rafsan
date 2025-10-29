import { useGSAP } from "@gsap/react"
import Button from "./Button"
import gsap from "gsap"

const ContactSection = () => {
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
        <section id="contact" className="flex flex-col items-center max-w-[600px] mx-auto py-[150px]">
            {/* ---- Section Heading ---- */}
            <div>
                <p className="font-mono text-base text-[#64ffda] text-center leading-[21px] mt-2.5 mb-5">
                    <span className="select-none">04. </span>
                    What's Next?
                </p>

                <h2 className="font-calibre font-semibold text-[60px] text-[#ccd6f6] text-center leading-[78px] mb-5">Get In Touch</h2>
            </div>

            {/* ---- Description ---- */}
            <p className="font-calibre text-xl text-[#8892b0] leading-[26px] text-center mb-[15px]">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam consectetur minima autem, expedita dolorem vitae laudantium tempore officia illum, illo, nemo ab voluptatum perferendis cupiditate eligendi. Nobis asperiores pariatur ad.
            </p>

            <a href="mailto:siamtalukder484@gmail.com" className="mt-[50px]">
                <Button value="Say Hello" />
            </a>
        </section>
    )
}

export default ContactSection