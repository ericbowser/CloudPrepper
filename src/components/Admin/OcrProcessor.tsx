import React, {useState} from 'react';

declare const Tesseract: any;

const OcrProcessor: React.FC = () => {
    const [image, setImage] = useState<string | null>(null);
    const [text, setText] = useState<string>('');
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState('idle');

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
        }
    };

    const handleExtractText = () => {
        if (image) {
            setStatus('working');
            setText('');
            setProgress(0);
            Tesseract.recognize(
                image,
                'eng',
                {
                    logger: (m: any) => {
                        if (m.status === 'recognizing text') {
                            setProgress(Math.floor(m.progress * 100));
                        }
                    }
                }
            ).then(({ data: { text } }: any) => {
                setText(text);
                setStatus('done');
            });
        }
    };

    return (
        <div className="container p-6 max-w-2xl mx-auto bg-pastel-mintlight dark:bg-dark-700 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">OCR Processor</h2>
            <div className="mb-4">
                <label htmlFor="image-upload" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Upload an image
                </label>
                <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
            </div>
            {image && (
                <div className="mb-4">
                    <img src={image} alt="Selected" className="max-w-full h-auto rounded-lg"/>
                </div>
            )}
            <button
                onClick={handleExtractText}
                disabled={!image || status === 'working'}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
            >
                {status === 'working' ? `Processing... (${progress}%)` : 'Extract Text'}
            </button>
            {status === 'done' && (
                <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-2">Extracted Text:</h3>
                    <textarea
                        rows={10}
                        cols={20}
                        readOnly
                        value={text}
                        className="w-full h-64 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-pastel-bluelight dark:bg-dark-800"
                    />
                </div>
            )}
        </div>
    );
};

export default OcrProcessor;
