"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useCategory } from "@/hook"
import { Category } from "@/models"
import { DialogClose } from "@radix-ui/react-dialog"
import { } from "@radix-ui/react-toast"
import { ChevronRight } from "lucide-react"
import { useEffect, useRef, useState, forwardRef, LegacyRef } from "react"


type CategoryMultiLevelProp = {
  name: string,
  onChange?: (value: string | undefined) => void,
  disabled: boolean,
  value?: string | undefined
}

const CategoryMultiLevel = function ({ name, disabled = false, value, onChange, ...props }: CategoryMultiLevelProp) {
  const { data } = useCategory({ params: { limit: 100, get: 'detail' } });
  const [categoryWrapper, setCategoryWrapper] = useState<[Category[] | []]>([[]]);
  const [categoryValue, setCategoryValue] = useState<Category[]>([]);
  const [dispatchSave, setDispatchSave] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    setCategoryWrapper([(data ?? [])])
  }, [data]);
  const handleClickItemCategory = function (category: Category, index: number) {
    categoryWrapper.splice(index + 1, categoryWrapper.length - (index + 1));
    categoryValue?.splice(index, categoryValue.length - index);
    categoryValue.push(category);
    if (category?.children?.length) {
      categoryWrapper.push(category?.children?.length ? category?.children : []);
      setDispatchSave(true);
    } else {
      setDispatchSave(false);
      if (inputRef.current) {
        inputRef.current.value = !categoryValue[categoryValue.length - 1]?.children?.length
          ? categoryValue[categoryValue.length - 1]?.name || ""
          : "";
        onChange?.(String(categoryValue[categoryValue.length - 1]?.id) ?? '')
      }
    };
    setCategoryValue(categoryValue)
    setCategoryWrapper([...categoryWrapper]);
  }
  return (
    <Dialog>
      <DialogTrigger asChild disabled={disabled} >
        <Input ref={inputRef} type="text" className="flex flex-start" name={name} readOnly disabled={disabled}  />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1200px]">
        <DialogHeader>
          <DialogTitle>Chọn danh mục</DialogTitle>
          <DialogDescription>sdfsdf</DialogDescription>
        </DialogHeader>
        <div className="bg-slate-100 p-4 h-[400px] flex flex-col">
          <Input />
          <div className="bg-white w-full flex mt-4 py-2 rounded-sm flex-1">
            {categoryWrapper.map((categoryList: Category[], index: number) => <div className="border-r w-1/4 pr-2 max-h-full scroll-m-1 overflow-scroll-y" key={index}>
              {categoryList.map((category: Category) =>
                <Button key={category.id} className={`rounded-sm w-full justify-start ${categoryValue.some((value: Category) => value.id === category.id) && 'bg-slate-100'}`} variant={'ghost'}
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleClickItemCategory(category, index)}>
                  {category?.name}
                  {category?.children?.length && <ChevronRight className="ml-auto" />}
                </Button>)}
            </div>)}
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button disabled={dispatchSave}>Chọn Danh mục</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
export default forwardRef(CategoryMultiLevel);