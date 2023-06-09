import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { NoEthereumProviderError } from "@web3-react/injected-connector";
import BigNumber from "bignumber.js";
import { useCallback } from "react";
import web3 from "web3";
import { provider } from "web3-core";
import { ABI } from "./abi";

/**
 * Represents for handling error.
 * @getErrorMessage
 * @param {error} error - The error is bundle of error.
 */
const getErrorMessage = (error: Error) => {
	if (error instanceof NoEthereumProviderError) {
		return "No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.";
	} else if (error instanceof UnsupportedChainIdError) {
		return "You're connected to an unsupported network.";
	} else {
		console.error(error);
		return "An unknown error occurred. Check the console for more details.";
	}
};

/**
 * Represents for get library.
 * @getLibrary
 * @param {provider} provider - we have to submit provider in this section.
 */
export default function getLibrary(provider: provider) {
	const library = new web3(provider);
	return library;
}

/**
 * Represents login and logout hook.
 * @useAuth
 */
export const useAuth = () => {
	const { activate, deactivate } = useWeb3React();

	const login = useCallback(
		(connectorID: any) => {
			activate(connectorID, async (error) => {
				getErrorMessage(error);
			});
		},
		[activate]
	);
	const logout = useCallback(() => {
		deactivate();
	}, [deactivate]);

	return { login, logout };
};

/**
 * Represents get short address.
 * @getAddress
 * @param {string} address - Adress is the wallet address.
 */
export const getAddress = (address: string) => {
	const add1 = address.substring(0, 6);
	const add2 = address.substring(address.length - 6);
	const finalAdd = `${add1}....${add2}`;
	return finalAdd;
};

/**
 * Represents for instance get.
 * @getInstance
 */
export const getInstance = () => {
	//Create provider in web3
	const Provider = getLibrary(
		"wss://goerli.infura.io/ws/v3/afe0cddc2e284b01b93aaba83b94044d"
	);
	//Created a contract instance
	const contract = new Provider.eth.Contract(ABI.DEMO.abi, ABI.DEMO.address);
	return contract;
};

export const convertWeiEth = (data: string, variant: string) => {
	if (variant === "eth") {
		const weiToEth = new BigNumber(data).dividedBy(10 ** 18);
		return weiToEth;
	} else {
		const ethToWei = new BigNumber(data).multipliedBy(10 ** 18);
		return ethToWei;
	}
};

export const arithmaticEquation = (a: number, b: number) => {
	const result = new BigNumber(a)
		.plus(b)
		.pow(2)
		.dividedBy(b)
		.pow(2)
		.plus(a)
		.minus(b);
	return result;
};
