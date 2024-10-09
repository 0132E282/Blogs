import React, { useState, useEffect, useRef } from 'react';

interface EditorProps {
  name: string;
  value: string;
  onChange: (data: string) => void;
}

export default function Editor({ name, value, onChange }: EditorProps) {
  const editorRef = useRef<any>();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    try {
      editorRef.current = {
        CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
        ClassicEditor: require('@ckeditor/ckeditor5-build-classic').ClassicEditor,
      };
      setEditorLoaded(true);
    } catch (error) {
      console.error("Error loading CKEditor:", error);
      setLoadError("Failed to load CKEditor. Please try again later.");
    }
  }, []);

  if (loadError) {
    return <div>{loadError}</div>;
  }

  return (
    <div>
      {/* {editorLoaded ? (
        <CKEditor
          name={name}
          editor={editorRef.current.ClassicEditor}
          data={value}
          onChange={(event: any, editor: any) => {
            const data = editor.getData();
            onChange(data);
          }}
        />
      ) : (
        <div>Editor loading</div>
      )} */}
    </div>
  );
}