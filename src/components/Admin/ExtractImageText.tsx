import React, {useState} from 'react';
import {FileText, Loader2, Upload, X} from 'lucide-react';
import Tesseract from "tesseract.js";

function ImageTextExtractor() {
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [extractedText, setExtractedText] = useState('');
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState('');

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
            setExtractedText('');
            setError('');
        } else {
            setError('Please upload a valid image file');
        }
    };

    const extractText = async () => {
        if (!image) {
            setError('Please upload an image first');
            return;
        }

        setLoading(true);
        setProgress(0);
        setError('');

        try {
            const worker = await Tesseract.createWorker('eng', 1, {
                logger: (m) => {
                    if (m.status === 'recognizing text') {
                        setProgress(Math.round(m.progress * 100));
                    }
                },
            });

            // Enhanced OCR parameters for better accuracy
            await worker.setParameters({
                tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,?!():-[]{}@ ',
                tessedit_pageseg_mode: Tesseract.PSM.AUTO_OSD, // Better page segmentation
                preserve_interword_spaces: '1',
            });

            const { data: { text } } = await worker.recognize(image);
            await worker.terminate();

            setExtractedText(text);
        } catch (err) {
            setError('Failed to extract text. Please try again.');
            console.error('OCR Error:', err);
        } finally {
            setLoading(false);
            setProgress(0);
        }
    };

    const clearImage = () => {
        setImage(null);
        setImagePreview('');
        setExtractedText('');
        setError('');
        setProgress(0);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(extractedText).then(r => console.log(r));
    };

    return (
        <div className="w-1/2 mt-20 bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">
                        Image Text Extractor
                    </h1>
                    <p className="text-gray-600">
                        Upload an image to extract text using OCR technology
                    </p>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                    {!imagePreview ? (
                        <label
                            className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <Upload className="w-12 h-12 text-gray-400 mb-3"/>
                                <p className="mb-2 text-sm text-gray-500">
                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                </p>
                                <p className="text-xs text-gray-500">PNG, JPG, JPEG, or WEBP</p>
                            </div>
                            <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageUpload}
                            />
                        </label>
                    ) : (
                        <div className="relative">
                            <button
                                onClick={clearImage}
                                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors z-10"
                            >
                                <X className="w-4 h-4"/>
                            </button>
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="w-full max-h-96 object-contain rounded-lg"
                            />
                        </div>
                    )}

                    {error && (
                        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                            {error}
                        </div>
                    )}

                    {imagePreview && !loading && !extractedText && (
                        <button
                            onClick={extractText}
                            className="mt-4 w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors font-medium flex items-center justify-center gap-2"
                        >
                            <FileText className="w-5 h-5"/>
                            Extract Text
                        </button>
                    )}

                    {loading && (
                        <div className="mt-4 space-y-2">
                            <div className="flex items-center justify-center gap-2 text-indigo-600">
                                <Loader2 className="w-5 h-5 animate-spin"/>
                                <span className="font-medium">Extracting text... {progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                                    style={{width: `${progress}%`}}
                                />
                            </div>
                        </div>
                    )}
                </div>

                {extractedText && (
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                                <FileText className="w-5 h-5"/>
                                Extracted Text
                            </h2>
                            <button
                                onClick={copyToClipboard}
                                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                            >
                                Copy to Clipboard
                            </button>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
              <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono">
                {extractedText}
              </pre>
                        </div>
                        <button
                            onClick={clearImage}
                            className="mt-4 w-full bg-gray-600 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors font-medium"
                        >
                            Extract from Another Image
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ImageTextExtractor;