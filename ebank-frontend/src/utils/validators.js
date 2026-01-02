export const validators = {
    email: (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    },

    montant: (montant) => {
        const value = parseFloat(montant);
        return !isNaN(value) && value > 0;
    },

    required: (value) => {
        return value !== null && value !== undefined && value.toString().trim() !== '';
    },

    minLength: (value, min) => {
        return value.length >= min;
    },

    phoneNumber: (phone) => {
        const regex = /^(06|07)[0-9]{8}$/;
        return regex.test(phone);
    }
};