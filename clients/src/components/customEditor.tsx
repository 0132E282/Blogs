import { PropsComponents } from '@/models';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export type Editer = PropsComponents & {

}
const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image'
];
const modules = {
  toolbar: [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline','strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image'],
    ['clean']
  ],
}
const CustomEditor:React.FC<Editer> = function ({className}) {
  const [value, setValue] = useState('');
  return <ReactQuill className={className} theme="snow" value={value} modules={modules} onChange={setValue} formats={formats}/>;
}

export default CustomEditor;