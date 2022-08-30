export const NETWORKS = [
	{
		name: 'Göerli',
		chainId: 5,
		contractAddress: '0x9f0C3E8b67364d9DD606E50f819784778CE7F7eE',
		rpcUrl: 'https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
		graphUrl: "https://api.thegraph.com/subgraphs/name/doylio/faucet-hound-goerli",
	},
	{
		name: "Arbitrum Rinkeby",
		chainId: 421611,
		contractAddress: '0xe67B008D3bdE7a4c707b0DCDd51802741D83205A',
		rpcUrl: 'https://rinkeby.arbitrum.io/rpc',
		graphUrl: "https://api.thegraph.com/subgraphs/name/doylio/faucet-hound-arbitrum-rinkeby",
	},
	{
		name: "Rinkeby",
		chainId: 4,
		contractAddress: '0x3a4E744b8E6231b2a36354c56fa548C7b27eA353',
		rpcUrl: 'https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
		graphUrl: "https://api.thegraph.com/subgraphs/name/doylio/faucet-hound-rinkeby",
	},
	{
		name: "Mumbai",
		chainId: 80001,
		contractAddress: '0x0A144236fEB8E6E16863F9e10C8d8442772dfb57',
		rpcUrl: 'https://polygon-testnet.public.blastapi.io',
		graphUrl: "https://api.thegraph.com/subgraphs/name/doylio/faucet-hound-mumbai",
	},
	{
		name: "Fuji",
		chainId: 43113,
		contractAddress: '0x0A144236fEB8E6E16863F9e10C8d8442772dfb57',
		rpcUrl: 'https://rpc.ankr.com/avalanche_fuji',
		graphUrl: "https://api.thegraph.com/subgraphs/name/doylio/faucet-hound-fuji",
	},
	{
		name: "Optimism Goerli",
		chainId: 420,
		contractAddress: '0x0A144236fEB8E6E16863F9e10C8d8442772dfb57',
		rpcUrl: 'https://goerli.optimism.io/',
		graphUrl: "https://api.thegraph.com/subgraphs/name/doylio/faucet-hound-optimism-goerli",
	},
] as const;
