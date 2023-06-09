import styled from "styled-components";

export const Wrap = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 20px;
`;
export const Logo = styled.img`
	height: 50px;
	width: 50px;
`;
export const Button = styled.button`
	background: #f266ad;
	border-radius: 80px;
	padding: 10px 18px;
	border: 1px solid #f266ad;
	cursor: pointer;
`;
export const ModalWrap = styled.div`
	position: fixed;
	z-index: 100;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	overflow: hidden;
	background: rgba(26, 39, 50, 0.7);
	backdrop-filter: blur(5px);
`;
export const ModailMain = styled.div`
	height: 600px;
	width: 600px;
	background: #000000;
	display: inline-block;

	margin: 0 auto;
	border: none;
	overflow: hidden;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	max-height: 100%;

	overflow: -moz-scrollbars-none;
	-ms-overflow-style: none;
	text-align: right;
	border-radius: 24px;
	padding: 40px;
`;
export const MetamaskImage = styled.img`
	height: 50px;
	width: 50px;
	cursor: pointer;
`;
export const MetaMask = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 40px;
	margin: 40px;
	color: #ffffff;
	border: 2px solid rgb(255, 255, 255, 0.5);
	border-radius: 12px;
	background: rgb(255, 255, 255, 0.5);
	cursor: pointer;
`;
