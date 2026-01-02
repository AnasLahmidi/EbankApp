import React from 'react';
import { AlertCircle } from 'lucide-react';

const Input = ({ label, error, icon: Icon, className = '', ...props }) => {
    return (
        <div className={`mb-4 ${className}`}>
            {label && (
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {label}
                </label>
            )}
            <div className="relative">
                {Icon && (
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <Icon size={18} />
                    </div>
                )}
                <input
                    className={`w-full ${Icon ? 'pl-10' : ''} px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${
                        error ? 'border-red-500' : 'border-gray-300'
                    }`}
                    {...props}
                />
            </div>
            {error && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {error}
                </p>
            )}
        </div>
    );
};

export default Input;
