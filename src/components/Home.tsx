import React from 'react';

const Home: React.FC = () => {
    return (
        <div className="container mx-auto mt-12 px-4">
            <h1 className="text-5xl font-bold text-black mb-4">Welcome to the ZKSync Contracts Demo</h1>
            <p className="text-xl text-gray-400">
                This is a demonstration of interacting with smart contracts on the ZKSync-testnet network.
            </p>
        </div>
    );
};

export default Home;