export const formatters = {
    currency: (amount) => {
        return new Intl.NumberFormat('fr-MA', {
            style: 'currency',
            currency: 'MAD'
        }).format(amount);
    },

    date: (date) => {
        return new Intl.DateTimeFormat('fr-MA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(new Date(date));
    },

    shortDate: (date) => {
        return new Intl.DateTimeFormat('fr-MA').format(new Date(date));
    },

    number: (number) => {
        return new Intl.NumberFormat('fr-MA').format(number);
    },

    accountNumber: (numero) => {
        return `****${numero?.slice(-4) || '0000'}`;
    }
};