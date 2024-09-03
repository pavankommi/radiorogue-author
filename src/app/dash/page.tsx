import React from 'react';

const Dash: React.FC = () => {
    const getGreeting = (): string => {
        const currentHour = new Date().getHours();

        if (currentHour < 12) {
            return 'Good Morning!';
        } else if (currentHour < 18) {
            return 'Good Afternoon!';
        } else {
            return 'Good Evening!';
        }
    };

    return (
        <div className="min-h-screen p-4">
            <h1 className="text-base font-bold text-black">{getGreeting()}</h1>
        </div>
    );
};

export default Dash;
