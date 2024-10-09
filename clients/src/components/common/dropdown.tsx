import { ReactElement, ReactNode, useEffect, useRef, useState } from "react";


export  type PropsTypeDropdown = {
  children : ReactNode,
  render? : (props: any) => ReactElement,
  data? : string | number | Array<Object>,
  onChange? : (value: string | number | object) => void,
  className?: string,
  style?: React.CSSProperties,
  locations?: string,
}

const Dropdown:React.FC<PropsTypeDropdown> = function({children, render, data , locations}){
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [openDropdown, setDropdown] = useState<boolean>(false);
    let locationsType  = 'right-0  mt-2';
    useEffect(() => {
          const handleClickOutside = (event: MouseEvent) => {
              if (dropdownRef.current && !dropdownRef.current?.contains(event.target as Node)) {
                  setDropdown(false);
              }
          };

          window.addEventListener('click', handleClickOutside);

          return () => {
              window.removeEventListener('click', handleClickOutside);
          };
    }, []);
    if(locations === 'button-left'){
      locationsType = 'left-0  mt-2';
    }else if(locations === 'top-left'){
      locationsType = 'left-0 mb-2 bottom-full';
    }
    const toggleDropdown = () => {
        setDropdown(!openDropdown);
    }
    return <div ref={dropdownRef} className="relative inline-block text-left">
     <div onClick={toggleDropdown}>
        {children}
    </div>
  {openDropdown && <div className={`${locationsType} absolute z-10 transform translate-y-0 opacity-100 w-56 origin-top-right rounded-md  transition-opacity duration-300 bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}  role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
      {render && render({data : data})}
    </div>}
</div>
}
export default Dropdown;