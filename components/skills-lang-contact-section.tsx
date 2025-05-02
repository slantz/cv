"use client"

import {useState} from "react";
import {SkillBadge} from "@/components/skill-badge";
import {LanguageCard} from "@/components/language-card";
import {ContactDetails} from "@/components/contact-details";
import {motion} from "framer-motion";

export function SkillsLangContactSection() {
  const [skillsData, setSkillsData] = useState({
    JavaScript: [
      ["TypeScript", "CoffeeScript"],
      [
        "React",
        "Next.js",
        "Vue.js",
        "Nuxt",
        "AngularJS",
        "Angular",
        "RxJS",
        "Backbone.js",
        "Marionette JS",
        "Ember.js",
        "Redux",
        "MobX",
        "Cordova",
        "React Native",
      ],
      ["jQuery", "Lodash", "REQUIRE.JS"],
      ["Grunt", "Gulp", "Webpack", "Vite"],
      ["npm", "bower", "yarn", "pnpm"],
    ],
    Solidity: [
      ["ERC Standards", "ERC-20", "ERC-721", "ERC-1155"],
      ["OpenZeppelin", "Hardhat", "Truffle", "Foundry"],
      ["Ethers.js", "Web3.js", "Ganache"],
      ["Gas Optimization", "Security Patterns"],
    ],
    "Smart Contracts": [
      ["DeFi Protocols", "AMMs", "Lending", "Staking"],
      ["NFT Marketplaces", "Royalties", "Metadata"],
      ["DAO Governance", "Voting Systems"],
      ["Multi-sig", "Proxy Patterns", "Diamond Standard"],
    ],
    React: [
      ["Hooks", "Context API", "Custom Hooks"],
      ["Redux", "MobX", "Zustand", "Jotai", "Recoil"],
      ["Styled Components", "Emotion", "Tailwind CSS"],
      ["React Query", "SWR", "Apollo Client"],
      ["Testing Library", "Jest", "Cypress"],
    ],
    TypeScript: [
      ["Advanced Types", "Generics", "Utility Types"],
      ["Type Guards", "Discriminated Unions"],
      ["Decorators", "Metadata Reflection"],
      ["TSX", "Module Augmentation"],
    ],
    "Ethers.js": [
      ["Providers", "Signers", "Contract Interaction"],
      ["Transaction Management", "Gas Estimation"],
      ["ENS Integration", "Event Listening"],
      ["Multicall", "Batching"],
    ],
    DeFi: [
      ["Lending Protocols", "Aave", "Compound"],
      ["DEXs", "Uniswap", "Curve", "Balancer"],
      ["Yield Farming", "Liquidity Mining"],
      ["Stablecoins", "Synthetics", "Derivatives"],
    ],
    NFTs: [
      ["ERC-721", "ERC-1155", "Metadata Standards"],
      ["IPFS", "Arweave", "Filecoin"],
      ["Marketplaces", "Royalties", "Fractionalization"],
      ["Dynamic NFTs", "On-chain SVG"],
    ],
    "The Graph": [
      ["Subgraph Development", "GraphQL Schema"],
      ["Entity Relationships", "Event Handling"],
      ["Mappings", "AssemblyScript"],
      ["Query Optimization", "Pagination"],
    ],
    Hardhat: [
      ["Tasks", "Scripts", "Plugins"],
      ["Testing", "Fixtures", "Mocks"],
      ["Deployment", "Verification"],
      ["Gas Reporting", "Coverage"],
    ],
    Tokenomics: [
      ["Token Distribution", "Vesting", "Lockups"],
      ["Incentive Mechanisms", "Game Theory"],
      ["Governance", "Voting Power"],
      ["Inflation", "Burning Mechanisms"],
    ],
    "Layer 2": [
      ["Optimistic Rollups", "Optimism", "Arbitrum"],
      ["ZK Rollups", "zkSync", "StarkNet"],
      ["Sidechains", "Polygon", "Gnosis Chain"],
      ["Cross-chain Bridges", "LayerZero", "Axelar"],
    ],
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="max-w-5xl mx-auto mb-16"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start mb-12">
        <div className="md:col-span-2">
          <div className="flex flex-col items-stretch justify-stretch">
            <div className="inline-block text-center px-6 py-2 rounded-full bg-gray-800/80 backdrop-blur-sm border border-gray-700 mb-8">
              <h3 className="text-xl font-medium text-gray-300">
                <span className="text-purple-400 font-semibold">{new Date().getFullYear() - new Date('2013').getFullYear()}+</span> Years Experience in{" "}
                <span className="text-cyan-400 font-semibold">Software Development</span>
              </h3>
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-2 relative">
              {Object.keys(skillsData).map((skill) => (
                <SkillBadge
                  key={skill}
                  name={skill}
                  level={
                    skill === "Solidity" ||
                    skill === "Smart Contracts" ||
                    skill === "React" ||
                    skill === "JavaScript"
                      ? 5
                      : skill === "TypeScript" ||
                      skill === "Ethers.js" ||
                      skill === "DeFi" ||
                      skill === "NFTs" ||
                      skill === "Hardhat"
                        ? 4
                        : 3
                  }
                  details={skillsData[skill as keyof typeof skillsData]}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-1">
          <LanguageCard />
        </div>

        <div className="md:col-span-1">
          <ContactDetails />
        </div>
      </div>
    </motion.div>
  );
}
