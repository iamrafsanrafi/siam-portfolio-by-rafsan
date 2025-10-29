import Button from "./Button"

const HeroSection = () => {
    return (

        <section id="hero" className="flex items-center justify-center min-h-screen">
            <div className="max-w-[1000px] mx-[150px] py-[150px]">
                <p id="hero-greetings" className="font-mono text-base text-[#64ffda] mb-5 ml-[3px]">Hi, my name is</p>

                <h1 id="hero-name" className="font-calibre text-[80px] leading-[1.1] font-semibold text-[#ccd6f6]">
                    Siam Talukder.
                </h1>

                <h2 id="hero-profession" className="font-calibre text-[80px] leading-[1.1] font-semibold text-[#8892b0] mb-[34px]">
                    MERN Stack Developer, Mentor
                </h2>

                <p id="hero-description" className="max-w-[500px] mt-[25px] mb-[15px] font-calibre text-xl leading-[1.3] text-[#8892b0] text-justify">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem temporibus in totam deserunt sapiente dolorem consequatur, animi error? Iure, nam. Excepturi vel deserunt ex veritatis maxime ipsa dolor eaque quam nostrum ducimus.
                </p>

                <a id="hero-button" href="https://rust-bell-04b.notion.site/29af4bf3bb0080d58361f0127305719b" target="_blank" className="inline-block mt-[50px]">
                    <Button value="Check out my course!" />
                </a>
            </div>
        </section>

    )
}

export default HeroSection