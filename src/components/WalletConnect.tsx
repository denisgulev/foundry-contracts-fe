import React, { useContext, useEffect } from 'react';
import { CurrentUserContext } from '../App';

const WalletConnect: React.FC = () => {
    const {
        account,
        setAccount
    } = useContext(CurrentUserContext);

    // Request accounts using MetaMask (or window.ethereum)
    const connectWallet = async () => {
        try {
            // Check if MetaMask or Ethereum provider is available
            if (window.ethereum) {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setAccount(accounts[0]);  // Get the first account
            } else {
                alert("MetaMask is not installed. Please install MetaMask and try again.");
            }
        } catch (error) {
            console.error("Error connecting wallet:", error);
        }
    };

    // Disconnecting the wallet
    const disconnectWallet = () => {
        setAccount(''); // Clear the account state
    };

    // Effect to handle account changes
    useEffect(() => {
        const handleAccountsChanged = (accounts: string[]) => {
            if (accounts.length > 0) {
                setAccount(accounts[0]); // Update account state with the new account
            } else {
                disconnectWallet(); // If there are no accounts, disconnect
            }
        };

        // Listen for account changes
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', handleAccountsChanged);
        } else {
            console.log('MetaMask not detected');
        }

        // Cleanup listener on component unmount
        return () => {
            if (window.ethereum) {
                window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
            }
        };
    }, [account]);

    return (
        <div className="flex justify-center items-center h-full">
            <button
                onClick={account ? disconnectWallet : connectWallet}
                className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-md shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75 transition duration-300"
            >
                {account ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}` : "Connect Wallet"}
            </button>
        </div>
    );
}

export default WalletConnect;