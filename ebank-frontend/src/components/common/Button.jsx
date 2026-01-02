import React from 'react';

const Button = ({
                    children,
                    variant = 'primary',
                    className = '',
                    icon: Icon,
                    ...props
                }) => {
    const variants = {
        primary: 'bg-primary-600 hover:bg-primary-700 text-white shadow-md',
        secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
        danger: 'bg-red-600 hover:bg-red-700 text-white shadow-md',
        outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50',
    };

    return (
        <button
            className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
            {...props}
        >
            {Icon && <Icon size={18} />}
            {children}
        </button>
    );
};

export default Button;