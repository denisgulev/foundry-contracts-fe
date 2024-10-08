const SimpleStorageABI = [
    {
        "inputs": [],
        "name": "retrieve",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "uint256", "name": "_favouriteNumber", "type": "uint256" }],
        "name": "store",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "string", "name": "_name", "type": "string" },
            { "internalType": "uint256", "name": "_favouriteNumber", "type": "uint256" }
        ],
        "name": "addPerson",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
];

export default SimpleStorageABI;
