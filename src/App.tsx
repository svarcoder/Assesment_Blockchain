import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./module/Header/Header";
import { Web3ReactProvider } from "@web3-react/core";
import getLibrary from "./logic/blockchain/blockchain";

function App() {
	return (
		<>
			<Web3ReactProvider getLibrary={getLibrary}>
				<Header />
			</Web3ReactProvider>
		</>
	);
}

export default App;
