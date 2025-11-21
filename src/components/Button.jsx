const Button = ({value, fontSize = "14px", lineHeight = "14px", paddingX = "28px", paddingY = "20px", handleClick}) => {
    return (
        <button
            className="text-[#64ffda] border border-[#64ffda] rounded-[3px] hover:bg-[#64ffda12] cursor-pointer font-mono"
            style={{
                fontSize: fontSize,
                padding: `${paddingY} ${paddingX}`,
                lineHeight: lineHeight,
                transition: "0.25s cubic-bezier(0.645, 0.045, 0.355, 1)"
            }}
            onClick={handleClick}
        >
            {value}
        </button>
    )
}

export default Button