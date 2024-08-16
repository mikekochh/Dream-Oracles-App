import React from 'react';

const AudioModal = ({ showModal, setShowModal }) => {
    return (
        <>
            {showModal ? (
                <div className="fixed inset-0 z-50 flex items-end justify-center">
                    <div 
                        className="bg-white w-full p-4 rounded-t-lg shadow-lg"
                        style={{ transition: 'transform 0.3s ease-out' }}
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">Sleep Meditation</h2>
                            <button 
                                className="text-gray-400 hover:text-gray-600"
                                onClick={() => setShowModal(false)}
                            >
                                X
                            </button>
                        </div>
                        <div className="flex justify-center">
                            <button 
                                className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
                                onClick={() => {/* Add play functionality here */}}
                            >
                                Play
                            </button>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default AudioModal;
