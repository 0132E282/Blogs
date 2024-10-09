
import { Upload } from "lucide-react";
import { useCallback, useState } from "react";
import Dropzone from 'react-dropzone';
import Image from 'next/image';
import { Button } from "../ui";
type TypeInputImageProps<T> = {
    className?: string;
    label?: string;
    name?:string;
    maxFiles: number;
    onDropImage: (acceptedFiles: File[]) => void;
    disabled?: boolean;
}
const InputImage = <T extends File>({ className, maxFiles = 1,name, disabled = false, onDropImage}: TypeInputImageProps<T>) => {
const [images,setImages] = useState<string[]>([]);
const HandleDropImage = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
       const render = new FileReader()
       render.onload = () => {
            if(maxFiles > 1){
                setImages((pre) => [...pre, (render.result as string)]);
            }else{
                setImages([(render.result as string)]);
            }
       }
       acceptedFiles.forEach((file) => render.readAsDataURL(file));
       
    }
    onDropImage(acceptedFiles);
}, [maxFiles, onDropImage]);
return <Dropzone onDrop={HandleDropImage} maxFiles={maxFiles} disabled={disabled}>
            {({getRootProps, getInputProps}) => (
                <section>
                    <div {...getRootProps()} className="cursor-pointer" >
                        <input {...getInputProps()} accept="image/*" multiple={maxFiles > 1} name={name ?? ''} />
                        {!(images.length > 0) ? <div className={`group  block w-full border-dashed border-4 hover:border-indigo-600 ${className}`}> 
                                <div className="flex flex-col justify-center items-center  group-hover:text-indigo-600 p-4">
                                    <Upload size={40} /> 
                                    <p className="mt-2">  300 x 300 </p>
                                </div>
                        </div> : 
                        <div className={!(maxFiles > 1 )? 'columns-1' : 'columns-4 col-span-2'}>
                            {images.map((image, index)=> <Image key={index} className="border-2" src={image} alt="thumb category" width={1200} height={800}  layout="responsive"/>)}
                        </div>}
                        <Button className="mt-4 w-full" type="button">Nhâp file</Button>
                   </div>
                </section>
            )}
    </Dropzone>
}

export default InputImage;