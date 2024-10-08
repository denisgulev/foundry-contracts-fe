import React, { useState, useContext } from 'react';
import Web3 from 'web3';
import { CurrentUserContext } from '../../App';  // Import the user context
import fundMeABI from '../../contracts/FundMe';  // ABI for the FundMe contract

interface FundMeCardProps {
    title: string;
    description: string;
    rpcUrl: string;
    contractAddress: string;
}

const FundMeCard: React.FC<FundMeCardProps> = ({ title, description, rpcUrl, contractAddress }) => {
    const [totalFunds, setTotalFunds] = useState<number | null>(null);
    const [contribution, setContribution] = useState<number>(0);
    const [fundedAmount, setFundedAmount] = useState<number | null>(null);
    const { account } = useContext(CurrentUserContext);

    // Initialize web3 provider and contract
    const provider = new Web3.providers.HttpProvider(rpcUrl);
    const web3 = new Web3(provider);
    const contract = new web3.eth.Contract(fundMeABI, contractAddress);

    // Load the total funds raised
    const loadTotalFunds = async () => {
        try {
            const funds: string = await contract.methods.getTotalAmountFunded().call();
            const fundsInEth = web3.utils.fromWei(funds, "ether");
            setTotalFunds(Number(fundsInEth));
        } catch (error) {
            console.error("Error loading total funds:", error);
        }
    };

    // Load the amount an address has funded
    const loadFundedAmount = async () => {
        try {
            if (!account) {
                alert("Please connect your wallet first!");
                return;
            }
            const funded: string = await contract.methods.getAmountFunded(account).call();
            // Convert from Wei to Ether
            const fundedInEth = web3.utils.fromWei(funded, "ether");
            setFundedAmount(Number(fundedInEth));
        } catch (error) {
            console.error("Error loading funded amount:", error);
        }
    };

    // Fund the contract
    const fund = async () => {
        try {
            if (!account) {
                alert("Please connect your wallet first!");
                return;
            }

            const metamaskWeb3 = new Web3(window.ethereum);
            const metamaskContract = new metamaskWeb3.eth.Contract(fundMeABI, contractAddress);

            await metamaskContract.methods.fund().send({ from: account, value: web3.utils.toWei(String(contribution), "ether") });
            loadTotalFunds();  // refresh total funds after funding
        } catch (error) {
            console.error("Error funding the contract:", error);
            alert("There was an error with the funding transaction. Please try again.");
        }
    };

    // Withdraw funds (restricted to contract owner)
    const withdraw = async () => {
        try {
            if (!account) {
                alert("Please connect your wallet first!");
                return;
            }

            const metamaskWeb3 = new Web3(window.ethereum);
            const metamaskContract = new metamaskWeb3.eth.Contract(fundMeABI, contractAddress);

            await metamaskContract.methods.widthdraw().send({ from: account });
            loadTotalFunds();  // refresh total funds after withdrawal
        } catch (error) {
            console.error("Error withdrawing funds:", error);
            alert("You are not authorized to withdraw funds.");
        }
    };

    return (
        <div className="bg-gray-800 text-white rounded-lg p-6 shadow-md">
            <h3 className="text-2xl font-bold mb-2">{title}</h3>
            <p className="text-gray-400 mb-4">{description}</p>
            <p className="mb-4">
                <span className="font-semibold">Total Funds: </span>
                {totalFunds ?? 'Loading...'} ETH
            </p>
            <p className="mb-4">
                <span className="font-semibold">You Have Funded: </span>
                {fundedAmount ?? 'Loading...'} ETH
            </p>
            <div className="mb-4">
                <label htmlFor="contribution" className="block text-sm mb-2">
                    Contribution (ETH)
                </label>
                <input
                    id="contribution"
                    type="number"
                    value={contribution}
                    onChange={(e) => setContribution(Number(e.target.value))}
                    step="0.01"
                    className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter amount in ETH"
                />
            </div>
            <div className="flex justify-between space-x-4">
                <button
                    className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded"
                    onClick={loadTotalFunds}
                >
                    Load Total Funds
                </button>
                <button
                    className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded"
                    onClick={loadFundedAmount}
                >
                    Load Your Funds
                </button>
            </div>
            <div className="flex justify-between space-x-4 mt-4">
                <button
                    className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded"
                    onClick={fund}
                >
                    Fund
                </button>
                <button
                    className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
                    onClick={withdraw}
                >
                    Withdraw (Owner)
                </button>
            </div>
        </div>
    );
};

export default FundMeCard;
