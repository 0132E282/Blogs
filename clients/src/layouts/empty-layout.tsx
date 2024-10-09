import { PropsLayouts } from "@/models/common"
import React from "react";

export type PropsEmptyLayout = PropsLayouts;

const EmptyLayout = function({children}:PropsEmptyLayout){
    return <>{children}</>
}
export default EmptyLayout;