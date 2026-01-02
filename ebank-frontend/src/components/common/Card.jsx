import React from 'react';

const Card = ({ children, className = '', title, action }) => {
    return (
        <div className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden ${className}`}>
            {title && (
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
                    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                    {action}
                </div>
            )}
            {children}
        </div>
    );
};

export default Card;