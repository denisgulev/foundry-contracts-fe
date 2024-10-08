import React, { useState, useContext } from 'react';
import Web3 from 'web3';
import contractABI from '../../contracts/SimpleStorage';  // import the contract ABI
import { CurrentUserContext } from '../../App';

// Extend the Window interface to include the ethereum property
declare global {
    interface Window {
        ethereum: any;
    }
}

interface ProjectCardProps {
    title: string;
    description: string;
    rpcUrl: string;
    contractAddress: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, rpcUrl, contractAddress }) => {
    const [favouriteNumber, setFavouriteNumber] = useState<number | null>(null);  // Set to null initially
    const [newNumber, setNewNumber] = useState<number>(0);
    const {
        account
    } = useContext(CurrentUserContext);

    // instantiate a provide and contract object
    const provider = new Web3.providers.HttpProvider(rpcUrl);
    const web3 = new Web3(provider);
    const contract = new web3.eth.Contract(contractABI, contractAddress);

    // Load the favourite number
    const loadFavouriteNumber = async () => {
        try {
            const favNumber = await contract.methods.retrieve().call();
            setFavouriteNumber(Number(favNumber));  // Make sure the number is an integer
        } catch (error) {
            console.error("Failed to load favourite number:", error);
        }
    };

    // Update the favourite number
    const updateFavouriteNumber = async () => {
        try {
            if (!account) {
                alert("Please connect your wallet first!");
                return;
            }

            // Create a Web3 instance connected to MetaMask
            const metamaskWeb3 = new Web3(window.ethereum);
            const metamaskContract = new metamaskWeb3.eth.Contract(contractABI, contractAddress);

            await metamaskContract.methods.store(newNumber).send({ from: account });
            loadFavouriteNumber();  // refresh the number after the update
        } catch (error) {
            console.error("Error updating favourite number:", error);
            alert("There was an error updating the favourite number. Please try again.");
        }
    };

    return (
        <div className="bg-gray-800 text-white rounded-lg p-6 shadow-md">
            <h3 className="text-2xl font-bold mb-2">{title}</h3>
            <p className="text-gray-400 mb-4">{description}</p>
            <p className="mb-4">
                <span className="font-semibold">Current Favourite Number: </span>
                {favouriteNumber ?? 'Loading...'}
            </p>
            <div className="mb-4">
                <label htmlFor="newNumber" className="block text-sm mb-2">
                    New Favourite Number
                </label>
                <input
                    id="newNumber"
                    type="number"
                    value={newNumber}
                    onChange={(e) => setNewNumber(Number(e.target.value))}
                    className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter a new number"
                />
            </div>
            <div className="flex justify-between space-x-4">
                <button
                    className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded"
                    onClick={loadFavouriteNumber}
                >
                    Load Favourite Number
                </button>
                <button
                    className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded"
                    onClick={updateFavouriteNumber}
                >
                    Update Number
                </button>
            </div>
        </div>
    );
};

export default ProjectCard;
