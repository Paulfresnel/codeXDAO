const hre = require("hardhat");

async function main() {
	const Contract = await hre.ethers.getContractFactory("Web3DAO-Token");
	const contract = await Contract.deploy();

	await contract.deployed();

	console.log("Web3DAO-Token deployed to:", contract.address);
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});