import "./CafeLogo.scss";
import CafeLogoProps from "@/components/CafeLogo/CafeLogoProps";

const CafeLogo = (props: CafeLogoProps) => {
    return (
        <img className="cafe-logo" src={props.url} />
    )
}

export default CafeLogo;