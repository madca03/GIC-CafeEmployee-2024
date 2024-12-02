import "./CafeLogo.scss";
import CafeLogoProps from "@/components/CafeLogo/CafeLogoProps";

const CafeLogo = (props: CafeLogoProps) => {
    const src = `data:image/png;base64,${props.url}`;

    return (
        <img className="cafe-logo" src={src} />
    )
}

export default CafeLogo;