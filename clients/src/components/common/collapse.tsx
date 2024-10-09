import { PropsComponents } from "@/models"

export type CollapseProps = PropsComponents  & {
    open?:boolean;
}

const Collapse:React.FC<CollapseProps>= function({open = false , children , className}){
    return <div className={`w-full h-auto block relative ${className}`}>
        { open && children}
    </div>
}
export default Collapse