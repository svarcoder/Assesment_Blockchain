import { InjectedConnector } from "@web3-react/injected-connector";

/** This is the metamsk injected connector. */
export const injected = new InjectedConnector({
	supportedChainIds: [1, 3, 4, 5, 97],
});
