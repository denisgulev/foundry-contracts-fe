import React from 'react';
import ProjectCard from './cards/ProjectCard';
import FundMeCard from './cards/FundMeCard';

const Projects: React.FC = () => {
    const rpcUrl = process.env.REACT_APP_RPC_URL
    const simpleStorageAddress = process.env.REACT_APP_SIMPLE_STORAGE_ADDRESS
    const fundMeAddress = process.env.REACT_APP_FUND_ME_ADDRESS

    if (rpcUrl === undefined || simpleStorageAddress === undefined || fundMeAddress === undefined) {
        alert("Unknown variables!");
        return null
    }

    return (
        <div className="container mx-auto mt-8 px-4">
            <h1 className="text-4xl font-bold text-black mb-8">Projects</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ProjectCard
                    title="SimpleStorage Contract"
                    description="Interact with the SimpleStorage contract"
                    rpcUrl={rpcUrl}
                    contractAddress={simpleStorageAddress}
                />
                <FundMeCard
                    title="FundMe Contract"
                    description="Interact with the FundMe contract."
                    rpcUrl={rpcUrl}
                    contractAddress={fundMeAddress}
                />
                {/* Add more project cards as needed */}
            </div>
        </div>
    );
};

export default Projects;
