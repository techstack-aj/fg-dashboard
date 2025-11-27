import React from 'react';

export const MyButton = ({ label, onClick } : { label: string, onClick: () => void }) => {
 
    return (
        <button
            onClick={onClick}
            style={{
                padding: '10px 20px',
                background: 'blue',
                color: 'white',
                borderRadius: '5px'
            }}
        >
            {label}
        </button>
    );
};

