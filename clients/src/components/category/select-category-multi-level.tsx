import * as React from "react";
import { Category } from "@/models";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui";
type PropsRenderCategory = {
  categories: Category[];
  level?: number;
  stringLevel?: string;
  pathname?: string;
};

type PropsSelectCategoryMultiLevel = {
  categories: Category[];
  onValueChange: (value: string) => void;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
};

const RenderCategory: React.FC<PropsRenderCategory> = ({ categories, level = 1, pathname = ""}) => {
  
  return (<>
      {categories.map((category: Category) => (
        <React.Fragment key={category.id}>
          <SelectItem value={String(category.id)}>
            {(pathname && pathname + ' > ' )+ category.name}
          </SelectItem>
          {category.children && (
            <RenderCategory
              categories={category.children}
              level={level + 1}
              pathname={(pathname && pathname + ' > ' ) + category.name}
            />
          )}
        </React.Fragment>
      ))}
    </>);};

const SelectCategoryMultiLevel: React.FC<PropsSelectCategoryMultiLevel> = ({disabled,value, placeholder, categories, onValueChange, ...field }) => {
  return (
    <Select onValueChange={onValueChange} value={value} disabled={disabled} {...field}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder}/>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={"null"}>{placeholder}</SelectItem>
        <RenderCategory categories={categories} />
      </SelectContent>
    </Select>
  );
};

export default React.memo(SelectCategoryMultiLevel);
