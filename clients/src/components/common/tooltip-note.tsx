

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip"
import { PropsComponents } from "@/models"

type Props = PropsComponents &{
  note: string,
}

const TooltipNote = ({children,note}: Props) => {
  return <TooltipProvider>
  <Tooltip>
    <TooltipTrigger>{children}</TooltipTrigger>
    <TooltipContent>
      <p>{note}</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
}

export default TooltipNote