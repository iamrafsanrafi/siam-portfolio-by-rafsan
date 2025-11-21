const FixedEmail = () => {
    return (
        <div id="fixed-email" className="fixed hidden md:flex bottom-0 right-[40px] flex-col items-center">
            {/* ---- Email ---- */}
            <a
                href="mailto:siamtalukder484@gmail.com"
                className="text-xs text-[#a8b2d1] hover:text-[#64ffda] font-mono tracking-[1.5px] mx-5 p-2.5 hover:-translate-y-[3px] "
                style={{
                    writingMode: "vertical-rl",
                    transition: "0.25s cubic-bezier(0.645, 0.045, 0.355, 1)"
                }}
            >
                siamtalukder484@gmail.com
            </a>

            {/* ---- Vertical Line ---- */}
            <div className="h-[90px] w-[1px] bg-[#a8b2d1]" />
        </div>
    );
};

export default FixedEmail;
