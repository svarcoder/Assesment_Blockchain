import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import getLibrary, {
	arithmaticEquation,
	getAddress,
	getInstance,
	useAuth,
} from "../../logic/blockchain/blockchain";
import {
	Button,
	Logo,
	MetaMask,
	MetamaskImage,
	ModailMain,
	ModalWrap,
	Wrap,
} from "./Style";
import { injected } from "../../logic/blockchain/connector";
import BigNumber from "bignumber.js";
import Web3 from "web3";

const Header = () => {
	/** This is we declaire all state and import web3 hooks and useAuth hooks. */
	const [data, setData] = useState<boolean>(false);
	const [details, setDetails] = useState<any>({
		address: "",
		chainId: "",
	});
	const { account, chainId, library } = useWeb3React();
	const { login, logout } = useAuth();

	// /**
	//  * Represents a book.
	//  * @constructor
	//  * @param {string} title - The title of the book.
	//  * @param {string} author - The author of the book.
	//  */
	// const bustContract = getInstance();
	// console.log(bustContract, "FFFFFFFFFFFFFFF");
	// bustContract.methods
	// 	.owner()
	// 	.call()
	// 	.then((data: any) => {
	// 		console.log(data, "HJDVHHJVHJV");
	// 	})
	// 	.catch((error: any) => {
	// 		console.log("error", error);
	// 	});
	// const tokenBalance: any = new BigNumber(data).dividedBy(10 ** 18);
	// console.log(tokenBalance.toFixed(2));

	useEffect(() => {
		/**
		 * Represents set wallet details in local storage.
		 * @setWalletDetails
		 */
		const setWalletDetails = async () => {
			if (account) {
				localStorage.setItem("address", JSON.stringify(account));
				localStorage.setItem("chain", JSON.stringify(chainId));
				setDetails({
					address: account,
					chainId: chainId,
				});
			} else {
				setDetails({
					address: "",
					chainId: "",
				});
			}
		};

		setWalletDetails();
	}, [account, chainId]);

	useEffect(() => {
		/**
		 * Represents get wallet details from local storage.
		 * @getWalletDetails
		 */
		const getWalletDetails = () => {
			let address = JSON.parse(localStorage.getItem("address") || "{}");
			let chain = JSON.parse(localStorage.getItem("chain") || "{}");

			if (
				address &&
				Object.keys(address).length !== 0 &&
				Object.getPrototypeOf(address) !== Object.prototype
			) {
				setDetails({
					address: address,
					chainId: chain,
				});
			}
		};
		getWalletDetails();
	}, []);

	/**
	 * Represents connect wallet function.
	 * @connectWallet
	 */
	const connectWallet = () => {
		if (account) {
			try {
				logout();
				localStorage.clear();
			} catch (error) {
				console.log("error", error);
			}
		} else {
			try {
				login(injected);
			} catch (error) {
				console.log("error", error);
			}
		}
	};

	const fetchDataMethod = async () => {
		try {
			const Contract = await getInstance();
			const res = await Contract.methods.name().call();
			console.log(res);
		} catch (err) {
			console.error(err);
		}
	};

	const allowanceMethod = async () => {
		try {
			const Contract = await getInstance();
			const result = await Contract.methods
				.allowance(
					"0x333514A42b7d8934F648Bae000aF819B2A6f5DB7",
					"0x397Bd6CFD17752565aefe248e4a5eA9b91980Ee2"
				)
				.call();
			alert("Allowance Successfull : " + result);
		} catch (error) {
			console.log("error", Error);
		}
	};

	const approveMethod = async () => {
		try {
			const Provider = await getLibrary(
				"wss://goerli.infura.io/ws/v3/afe0cddc2e284b01b93aaba83b94044d"
			);
			const Contract = await getInstance();

			const amount = await Provider.utils.toWei("50", "ether");
			console.log(Contract, amount);
			await Contract.methods
				.approve("0x397Bd6CFD17752565aefe248e4a5eA9b91980Ee2", amount)
				.send({
					from: "0x397Bd6CFD17752565aefe248e4a5eA9b91980Ee2",
					gas: "2000000",
				})
				.on("transactionHash", (hash: any) => {
					alert(hash);
				})
				.on("receipt", (receipt: any) => {
					alert("liquidity removed successfully");
				})
				.on("error", (error: any, receipt: any) => {
					alert("transaction failed");
				});

			// alert("Approve Successfull : " + result);
		} catch (error) {
			console.log("error", error);
		}
	};

	const singRequest = async () => {
		try {
			const Provider = await getLibrary(
				"wss://goerli.infura.io/ws/v3/afe0cddc2e284b01b93aaba83b94044d"
			);
			const signatureHash = await Provider.eth.personal.sign(
				"Testing",
				"0x397Bd6CFD17752565aefe248e4a5eA9b91980Ee2",
				"Testing"
			);
			alert("SignatureHash Successfull : " + signatureHash);
		} catch (error) {
			console.log("error", error);
		}
	};

	const estimateGas = async () => {
		try {
			const Provider = await getLibrary(
				"wss://goerli.infura.io/ws/v3/afe0cddc2e284b01b93aaba83b94044d"
			);
			const result = await Provider.eth.estimateGas({
				from: "0x397Bd6CFD17752565aefe248e4a5eA9b91980Ee2",
				data: "AAAA",
				to: "0xBEDa4Ea077766b43092397B0AE7D53bC999561eB",
			});
			alert("EstimateGas Successfull : " + result);
		} catch (error) {
			console.log("error", error);
		}
	};

	const res = arithmaticEquation(2, 4);
	console.log(res);

	const getTransactionRecipt = async () => {
		try {
			const Provider = await getLibrary(
				"wss://goerli.infura.io/ws/v3/afe0cddc2e284b01b93aaba83b94044d"
			);
			const result = await Provider.eth.getTransactionReceipt(
				"0xfe7d7bee72f1a99ef57f02e9c95f2f8b3e6b0ca08f93a8cc70b8c823b3b8ffff"
			);
			console.log("result", result);
		} catch (error) {
			console.log("error", error);
		}
	};

	const transferMethod = async () => {
		try {
			const Contract = await getInstance();
			const amount = new BigNumber(50).multipliedBy(10 ** 18);

			console.log(Contract, amount);
			await await Contract.methods
				.transfer("0x397Bd6CFD17752565aefe248e4a5eA9b91980Ee2", amount)
				.send({
					from: "0x397Bd6CFD17752565aefe248e4a5eA9b91980Ee2",
				})
				.on("transactionHash", (hash: any) => {
					alert(hash);
				})
				.on("receipt", (receipt: any) => {
					alert("liquidity removed successfully");
				})
				.on("error", (error: any, receipt: any) => {
					alert("transaction failed");
				});

			// alert("Approve Successfull : " + result);
		} catch (error) {
			console.log("error", error);
		}
	};

	return (
		<Wrap>
			<Logo src='https://media.istockphoto.com/id/495878092/photo/red-apple.jpg?s=1024x1024&w=is&k=20&c=B6fzd8JgZY8Fr2CBCiph2rWCUEeHhVqBll_xM5038rU=' />
			{details?.address ? (
				<Button onClick={() => setData(true)}>
					{getAddress(details?.address)}
				</Button>
			) : (
				<Button onClick={() => setData(true)}>Connect Wallet</Button>
			)}
			<Button onClick={() => allowanceMethod()}>Allowance</Button>
			<Button onClick={() => transferMethod()}>Approved</Button>
			{data && (
				<ModalWrap>
					<ModailMain>
						<MetamaskImage
							src={require("../../logic/image/CrossIcon.svg").default}
							onClick={() => setData(false)}
						/>
						{details?.address ? (
							<MetaMask onClick={() => connectWallet()}>
								<h2>Address: {getAddress(details?.address)}</h2>
								<h2>ChainId: {details?.chainId}</h2>
							</MetaMask>
						) : (
							<MetaMask onClick={() => connectWallet()}>
								<MetamaskImage
									src={require("../../logic/image/MetaMask.svg").default}
								/>
								<h2>MetaMask</h2>
							</MetaMask>
						)}
					</ModailMain>
				</ModalWrap>
			)}
		</Wrap>
	);
};

export default Header;
