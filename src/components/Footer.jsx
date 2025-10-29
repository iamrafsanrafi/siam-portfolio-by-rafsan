const Footer = () => {
    return (
        <footer className="flex justify-center items-center gap-x-10 bg-[#020c1b] w-full min-h-[70px]">
            <div>
                <p className="font-mono text-[13px] text-[#8892b0] leading-[12px] p-2.5">
                    Design Inspired by:&nbsp;
                    <a
                        href="https://github.com/bchiang7"
                        target="_blank"
                        className="hover:text-[#64ffda] font-bold"
                        style={{
                            transition: "0.25s cubic-bezier(0.645, 0.045, 0.355, 1)"
                        }}
                    >Brittany Chiang</a>
                </p>
            </div>

            <div className="w-[2px] h-6 bg-[#8892b0]"></div>

            <div>
                <p className="font-mono text-[13px] text-[#8892b0] leading-[12px] p-2.5">
                    Copyrighted by:&nbsp;
                    <a
                        href="https://github.com/siamtalukder484"
                        target="_blank"
                        className="hover:text-[#64ffda] font-bold"
                        style={{
                            transition: "0.25s cubic-bezier(0.645, 0.045, 0.355, 1)"
                        }}
                    >Siam Talukder</a>
                </p>
            </div>

            <div className="w-[2px] h-6 bg-[#8892b0]"></div>

            <div>
                <p className="font-mono text-[13px] text-[#8892b0] leading-[12px] p-2.5">
                    Built by:&nbsp;
                    <a
                        href="https://github.com/iamrafsanrafi"
                        target="_blank"
                        className="hover:text-[#64ffda] font-bold"
                        style={{
                            transition: "0.25s cubic-bezier(0.645, 0.045, 0.355, 1)"
                        }}
                    >Rafsan Rafi</a>
                </p>
            </div>
        </footer>
    )
}

export default Footer