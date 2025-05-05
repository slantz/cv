"use client"

import { useState, useEffect } from "react"
import {collection, getDocs, query, orderBy} from "firebase/firestore"
import { db } from "@/lib/firebase"

// This type represents the structure of our CV data
export interface CVSection {
  id: string
  title: string
  description: string
  order: number
  details: {
    title: string
    subtitle?: string // Additional data to show after the title
    description: string | { text: string; url: string }[] // Can be either text or array of links
    tags?: string[]
    dateRange?: string
  }[]
}

// Mock data to use as fallback when Firebase is not available
const mockCVData: CVSection[] = [
  {
    id: "smart-contracts",
    title: "Smart Contracts",
    description: "Developing secure and efficient blockchain solutions",
    order: 0,
    details: [
      {
        title: "DeFi Lending Protocol",
        subtitle: "Aave Fork - some additional detail",
        description:
          "Developed a decentralized lending protocol with automated interest rate adjustments based on market conditions.",
        tags: ["Solidity", "OpenZeppelin", "Hardhat", "Ethers.js"],
        dateRange: "06.2023 - 05.2024",
      },
      {
        title: "NFT Marketplace",
        subtitle: "OpenSea Alternative",
        description: [
          { text: "GitHub Repository", url: "https://github.com/johndoe/nft-marketplace" },
          { text: "Live Demo", url: "https://nft-marketplace-demo.com" },
          { text: "Technical Documentation", url: "https://docs.nft-marketplace-demo.com" },
        ],
        tags: ["ERC-721", "ERC-1155", "IPFS", "Solidity"],
        dateRange: "01.2023 - 05.2023",
      },
      {
        title: "DAO Governance",
        subtitle: "Compound-based - some additional detail",
        description:
          "Implemented a decentralized autonomous organization with proposal voting and treasury management.",
        tags: ["Compound Governor", "Snapshot", "Solidity"],
        dateRange: "08.2022 - 12.2022",
      },
    ],
  },
  {
    id: "frontend-magic",
    title: "Frontend Magic",
    description: "Creating intuitive and responsive user interfaces",
    order: 1,
    details: [
      {
        title: "Web3 Wallet Integration",
        subtitle: "Multi-chain Support - some additional detail",
        description: [
          { text: "Integration Guide", url: "https://docs.wallet-integration.com" },
          { text: "Demo Application", url: "https://wallet-demo.com" },
        ],
        tags: ["ethers.js", "web3-react", "React", "TypeScript"],
        dateRange: "03.2023 - 07.2023",
      },
      {
        title: "DApp Dashboard",
        subtitle: "Analytics Platform",
        description: "Built an analytics dashboard for tracking on-chain metrics and user interactions with DApps.",
        tags: ["React", "TailwindCSS", "The Graph", "D3.js"],
        dateRange: "10.2022 - 02.2023",
      },
      {
        title: "Cross-chain Bridge UI",
        subtitle: "LayerZero Integration - some additional detail",
        description: [
          { text: "Bridge Interface", url: "https://bridge-ui.example.com" },
          { text: "Technical Specification", url: "https://docs.bridge-ui.example.com" },
        ],
        tags: ["Next.js", "framer-motion", "Chakra UI"],
        dateRange: "05.2022 - 09.2022",
      },
    ],
  },
  {
    id: "tokenomics",
    title: "Tokenomics",
    description: "Designing sustainable token economies",
    order: 2,
    details: [
      {
        title: "Token Distribution Model",
        subtitle: "Fair Launch Protocol - some additional detail",
        description: "Created a fair launch token distribution model with vesting schedules for team and investors.",
        tags: ["Economic Modeling", "Game Theory"],
        dateRange: "02.2024 - 04.2024",
      },
      {
        title: "Staking Mechanism",
        subtitle: "Dynamic Rewards System",
        description: [
          { text: "Staking Documentation", url: "https://docs.staking-protocol.com" },
          { text: "Economic Paper", url: "https://papers.staking-protocol.com/economics" },
        ],
        tags: ["Tokenomics", "DeFi", "Yield Farming"],
        dateRange: "11.2023 - 01.2024",
      },
      {
        title: "Governance Token",
        subtitle: "Quadratic Voting - some additional detail",
        description: "Implemented a governance token with quadratic voting to prevent whale dominance.",
        tags: ["DAO", "Governance", "Voting Systems"],
        dateRange: "08.2023 - 10.2023",
      },
    ],
  },
  {
    id: "blockchain-infrastructure",
    title: "Blockchain Infrastructure",
    description: "Building the backbone of decentralized applications",
    order: 3,
    details: [
      {
        title: "Layer 2 Integration",
        subtitle: "Optimistic & ZK Rollups - some additional detail",
        description: "Integrated Optimistic Rollups and ZK-Rollups for scalable and cost-effective transactions.",
        tags: ["Optimism", "zkSync", "Arbitrum", "Polygon"],
        dateRange: "12.2023 - 03.2024",
      },
      {
        title: "Node Operation",
        subtitle: "Validator Setup",
        description: [
          { text: "Node Setup Guide", url: "https://docs.node-operation.com" },
          { text: "Monitoring Dashboard", url: "https://monitor.node-operation.com" },
        ],
        tags: ["Ethereum", "Solana", "Avalanche", "Docker"],
        dateRange: "09.2023 - 11.2023",
      },
      {
        title: "Cross-chain Messaging",
        subtitle: "Interoperability Protocol - some additional detail",
        description: "Implemented secure cross-chain messaging protocols for interoperability between blockchains.",
        tags: ["LayerZero", "Axelar", "Wormhole"],
        dateRange: "06.2023 - 08.2023",
      },
    ],
  },
]

export function useCvData(initialData: CVSection[] | null = null) {
  const [cvData, setCVData] = useState<CVSection[]>(initialData || [])
  const [isLoading, setIsLoading] = useState(!initialData)
  const [error, setError] = useState<string | null>(null)
  const [usingMockData, setUsingMockData] = useState(false)

  useEffect(() => {
    // If we already have data from the server, don't fetch again
    if (initialData) {
      setCVData(initialData)
      setIsLoading(false)
      return
    }

    const fetchData = async () => {
      setIsLoading(true)
      setError(null)
      setUsingMockData(false)

      try {
        // Check if Firebase and Firestore are available
        if (typeof window === "undefined" || !db) {
          console.log("Firestore not available, using mock data")
          setUsingMockData(true)
          setCVData(mockCVData)
          setIsLoading(false)
          return
        }

        try {
          const snapshot = await getDocs(collection(db, "cv-data"));

          if (snapshot.empty) {
            console.log("No CV data found in Firestore, using mock data")
            setUsingMockData(true)
            setCVData(mockCVData)
            return
          }

          const sections: CVSection[] = []

          // Process each section document
          for (const sectionDoc of snapshot.docs) {
            console.log(sectionDoc.data())
            const sectionData = sectionDoc.data() as Omit<CVSection, "id" | "details">

            // Query the details subcollection for this section
            const detailsQuery = query(collection(db, `cv-sections/${sectionDoc.id}/details`), orderBy("order", "asc"))

            const detailsSnapshot = await getDocs(detailsQuery)

            const details = detailsSnapshot.docs.map((detailDoc) => {
              return detailDoc.data() as CVSection["details"][0]
            })

            // Add the section with its details to our array
            sections.push({
              id: sectionDoc.id,
              title: sectionData.title,
              description: sectionData.description,
              order: sectionData.order,
              details: details,
            })
          }

          setCVData(sections)
        } catch (firestoreError) {
          console.error("Error fetching from Firestore:", firestoreError)
          console.log("Falling back to mock data")
          setUsingMockData(true)
          setCVData(mockCVData)
        }
      } catch (err) {
        console.error("Error in data fetching:", err)
        setError("Failed to load CV data. Using mock data instead.")
        setUsingMockData(true)
        setCVData(mockCVData)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [initialData])

  return { cvData, isLoading, error, usingMockData }
}
