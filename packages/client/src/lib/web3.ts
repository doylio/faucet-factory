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
		const metamask = (window as any).ethereum;
		if (!metamask) {
			toast.error('Metamask not found');
			return;
		}
		try {
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
			toast.error('Failed to connect');
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

	async function handleAccountsChanged() {
		const signer = provider.getSigner();
		const address = await signer.getAddress();
		update((store) => ({ ...store, signer, address }));
	}

	async function handleChainChanged() {
		console.log('CHAIN CHANGE');
		const metamask = (window as any).ethereum;
		if (!metamask) {
			toast.error('Metamask not found');
			return;
		}
		provider = new ethers.providers.Web3Provider(metamask);
		const network = await provider.getNetwork();
		update((store) => ({ ...store, provider, chainId: network.chainId }));
	}

	return {
		subscribe,
		connect,
		disconnect,
		reconnect
	};
}

export const web3 = createWeb3Store();
