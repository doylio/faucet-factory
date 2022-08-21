import { ethers } from 'ethers';
import { writable } from 'svelte/store';
import toast from './toast';

interface Web3Store {
	address?: string;
	provider?: ethers.providers.Web3Provider;
	signer?: ethers.Signer;
	chainId?: number;
}

function createWeb3Store() {
	const { set, subscribe, update } = writable<Web3Store>({});

	let provider: ethers.providers.Web3Provider;

	const connect = async () => {
		try {
			const metamask = (window as any).ethereum;
			if (!metamask) throw new Error('Metamask not found');

			provider = new ethers.providers.Web3Provider(metamask);
			await provider.send('eth_requestAccounts', []);
			const signer = provider.getSigner();
			const address = await signer.getAddress();
			const network = await provider.getNetwork();
			const chainId = network.chainId;
			set({ provider, signer, address, chainId });

			metamask.on('accountsChanged', handleAccountsChanged);
			metamask.on('chainChanged', handleChainChanged);
		} catch (err) {
			if (err instanceof Error) {
				toast.error(err.message);
			} else {
				toast.error('Failed to connect');
			}
		}
	};

	const disconnect = () => {
		console.log('DISCONNECT');
		const metamask = (window as any).ethereum;
		if (metamask) {
			metamask.removeListener('accountsChanged', handleAccountsChanged);
			metamask.removeListener('chainChanged', handleChainChanged);
		}
		set({});
	};

	// Silently attempt to reconnect to a connected wallet
	const reconnect = async () => {
		const metamask = (window as any).ethereum;
		if (!metamask) return;
		try {
			provider = new ethers.providers.Web3Provider(metamask);
			const signer = provider.getSigner();
			const address = await signer.getAddress();
			const network = await provider.getNetwork();
			const chainId = network.chainId;
			set({ provider, signer, address, chainId });

			metamask.on('accountsChanged', handleAccountsChanged);
			metamask.on('chainChanged', handleChainChanged);
		} catch (err) {}
	};

	const changeAccount = async () => {
		try {
			const metamask = (window as any).ethereum;
			if (!metamask) {
				toast.error('Metamash not found');
				return;
			}
			await metamask.request({
				method: 'wallet_requestPermissions',
				params: [
					{
						eth_accounts: {}
					}
				]
			});
		} catch (err) {}
	};

	const changeNetwork = async (chainId: number) => {
		try {
			const network = await provider.getNetwork();
			if (network.chainId == chainId) return;

			const metamask = (window as any).ethereum;
			if (!metamask) throw new Error('Metamask not found');

			await metamask.request({
				method: 'wallet_switchEthereumChain',
				params: [{ chainId: ethers.utils.hexlify(chainId) }]
			});
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message);
			} else {
				toast.error('Failed to change networks');
			}
		}
	};

	async function handleAccountsChanged() {
		try {
			const signer = provider.getSigner();
			const address = await signer.getAddress();
			update((store) => ({ ...store, signer, address }));
		} catch (err) {
			if (err instanceof Error) {
				toast.error(err.message);
			} else {
				toast.error('An unknown error occured');
				console.log(err);
			}
		}
	}

	async function handleChainChanged() {
		try {
			const metamask = (window as any).ethereum;
			if (!metamask) throw new Error('Metamask not found');

			provider = new ethers.providers.Web3Provider(metamask);
			const network = await provider.getNetwork();
			update((store) => ({ ...store, provider, chainId: network.chainId }));
		} catch (err) {
			if (err instanceof Error) {
				toast.error(err.message);
			} else {
				toast.error('An unknown error occured');
				console.log(err);
			}
		}
	}

	return {
		subscribe,
		connect,
		disconnect,
		reconnect,
		changeAccount,
		changeNetwork
	};
}

export const web3 = createWeb3Store();

export const NETWORKS = [
	{
		name: 'Rinkeby',
		chainId: 123
	},
	{
		name: 'Goerli',
		chainId: 5
	},
	{
		name: 'Polygon Mumbai',
		chainId: 80001
	},
	{
		name: 'Optimism Goerli',
		chainId: 420
	},
	{
		name: 'Arbitrum Goerli',
		chainId: 421613
	}
] as const;
