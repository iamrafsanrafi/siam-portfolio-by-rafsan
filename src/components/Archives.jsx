import { useEffect } from "react"
import { archives } from "../constants/data"
import GitHubIcon from "../icons/GitHubIcon"
import RedirectIcon from "../icons/RedirectIcon"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

const Archives = () => {
    useGSAP(() => {
        gsap.fromTo("#archive .heading", {
            opacity: 0,
            yPercent: 20
        }, {
            opacity: 1,
            yPercent: 0,
            ease: "power1.inOut"
        });

        gsap.fromTo("table", {
            opacity: 0,
            yPercent: 5
        }, {
            opacity: 1,
            yPercent: 0,
            ease: "power1.inOut"
        });

        gsap.utils.toArray("tr").forEach(row => {
            gsap.fromTo(row, {
                opacity: 0,
                yPercent: 8,
                ease: "power1.inOut"
            }, {
                opacity: 1,
                yPercent: 0,
                scrollTrigger: {
                    trigger: row,
                    start: "top 90%"
                },
                duration: 0.5,
                delay: 0.3
            })
        })
    }, [])

    useEffect(() => {
        window.scrollTo({
            top: 0
        })
    }, []);

    return (
        <section id="archive">
            <div className="heading">
                <h1 className="font-calibre font-semibold text-[80px] text-[#ccd6f6] leading-[88px]">Archive</h1>

                <p className="font-mono text-base text-[#64ffda] leading-6 mb-5">A big list of things I’ve worked on</p>
            </div>

            <table className="w-full min-w-[1340px] my-[100px] mx-[-20px] cursor-default table-fixed">
                <colgroup>
                    <col className="w-[10%]" />
                    <col className="w-[25%]" />
                    <col className="w-[15%]" />
                    <col className="w-[44%]" />
                    <col className="w-[100px]" />
                </colgroup>

                <thead>
                    <tr>
                        <th className="font-calibre font-bold text-xl text-[#8892b0] leading-[30px] text-left py-2.5 px-5">Year</th>
                        <th className="font-calibre font-bold text-xl text-[#8892b0] leading-[30px] text-left py-2.5 px-5">Title</th>
                        <th className="font-calibre font-bold text-xl text-[#8892b0] leading-[30px] text-left py-2.5 px-5">Made at</th>
                        <th className="font-calibre font-bold text-xl text-[#8892b0] leading-[30px] text-left py-2.5 px-5">Built with</th>
                        <th className="font-calibre font-bold text-xl text-[#8892b0] leading-[30px] text-left py-2.5 px-5">Link</th>
                    </tr>
                </thead>

                <tbody>
                    {archives.map((archive) => (
                        <tr key={archive.id} className="h-[55px] hover:bg-[#172a45]">
                            {/* Year */}
                            <td className="align-middle font-mono text-base text-[#64ffda] leading-6 py-2.5 px-5">
                                {archive.year}
                            </td>

                            {/* Title */}
                            <td className="align-middle font-calibre font-bold text-xl text-[#ccd6f6] leading-[30px] py-2.5 px-5">
                                {archive.title}
                            </td>

                            {/* Made At */}
                            <td className="align-middle font-calibre text-lg text-[#8892b0] leading-[27px] py-2.5 px-5">
                                {archive.madeAt}
                            </td>

                            {/* Built With */}
                            <td className="align-middle font-mono text-xs text-[#8892b0] leading-[18px] py-2.5 px-5">
                                <div className="flex flex-wrap items-center gap-x-1">
                                    {archive.technologies.map((t, index) => (
                                        <span key={index} className="inline-block">
                                            {t}
                                            {index + 1 < archive.technologies.length && <span>&nbsp;·&nbsp;</span>}
                                        </span>
                                    ))}
                                </div>
                            </td>

                            {/* Links */}
                            <td className="align-middle py-2.5 px-5">
                                <div className="flex items-center justify-between flex-nowrap whitespace-nowrap">
                                    {archive.links[0] && archive.links[0] !== "" ? (
                                        <a
                                            href={archive.links[0]}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-shrink-0 text-[#a8b2d1] hover:text-[#64ffda]"
                                            aria-label="github"
                                        >
                                            <GitHubIcon width={20} height={20} />
                                        </a>
                                    ) : (
                                        <span className="flex-shrink-0 font-calibre text-xl text-[#8892b0] leading-[30px]">—</span>
                                    )}

                                    {archive.links[1] && archive.links[1] !== "" ? (
                                        <a
                                            href={archive.links[1]}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-shrink-0 text-[#a8b2d1] hover:text-[#64ffda]"
                                            aria-label="live"
                                        >
                                            <RedirectIcon width={20} height={20} />
                                        </a>
                                    ) : (
                                        <span className="flex-shrink-0 font-calibre text-xl text-[#8892b0] leading-[30px]">—</span>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    )
}

export default Archives