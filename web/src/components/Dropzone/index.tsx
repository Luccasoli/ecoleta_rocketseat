import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload } from 'react-icons/fi';
import './styles.css';

function Dropzone({ onFileUploaded }: { onFileUploaded: (file: File) => void }): React.ReactElement {
    const [selectedFileUrl, setSelectedFileUrl] = useState('');
    const onDrop = useCallback(
        (acceptedFiles) => {
            const [file] = acceptedFiles;

            const fileUrl = URL.createObjectURL(file);

            setSelectedFileUrl(fileUrl);
            onFileUploaded(file);
        },
        [onFileUploaded],
    );
    const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*' });

    return (
        <div className="dropzone" {...getRootProps()}>
            <input accept="image/*" {...getInputProps()} />
            {selectedFileUrl ? (
                <img src={selectedFileUrl} alt="thumbnail" />
            ) : (
                <p>
                    <FiUpload />
                    Imagem do estabelecimento
                </p>
            )}
        </div>
    );
}

export default Dropzone;
