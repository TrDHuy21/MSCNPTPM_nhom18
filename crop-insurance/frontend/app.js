const contractAddress = "0x1Af5a055dDEF959011fed0AEB948c3Ea8F8Bfb7e";  // Địa chỉ hợp đồng từ quá trình migrate
// const contractJson = JSON.parse(fs.readFileSync('./build/contracts/CropInsurance.json', 'utf8'));
// const abi = contractJson.abi;
const abi = [
    // ABI của hợp đồng
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "authorized",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [],
        "name": "contractDuration",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "policies",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "premium",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "isActive",
                "type": "bool"
            },
            {
                "internalType": "uint256",
                "name": "claimAmount",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "policyStartTime",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_address",
                "type": "address"
            }
        ],
        "name": "grantAccess",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_address",
                "type": "address"
            }
        ],
        "name": "revokeAccess",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "buyInsurance",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function",
        "payable": true
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_claimAmount",
                "type": "uint256"
            }
        ],
        "name": "fileClaim",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_policyHolder",
                "type": "address"
            }
        ],
        "name": "approveClaim",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "cancelPolicy",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "contractBalance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }
];

window.addEventListener('load', async () => {
    if (window.ethereum) {
        const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
        const contract = new web3.eth.Contract(abi, contractAddress);
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];

        // Mua bảo hiểm
        document.getElementById('buyInsurance').onclick = async () => {
            const premium = document.getElementById('premiumAmount').value;
            if (!premium || premium <= 0) {
                alert("Please enter a valid premium amount.");
                return;
            }
            const premiumWei = web3.utils.toWei(premium, "ether");
            await contract.methods.buyInsurance().send({ from: account, value: premiumWei });
            alert("Insurance purchased successfully!");
        };

        // Nộp yêu cầu bồi thường
        document.getElementById('fileClaim').onclick = async () => {
            const claimAmount = document.getElementById('claimAmount').value;
            if (!claimAmount || claimAmount <= 0) {
                alert("Please enter a valid claim amount.");
                return;
            }
            const claimAmountWei = web3.utils.toWei(claimAmount, "ether");
            await contract.methods.fileClaim(claimAmountWei).send({ from: account, value:claimAmountWei });
            alert("Claim filed successfully!");
        };

        // Phê duyệt yêu cầu bồi thường
        document.getElementById('approveClaim').onclick = async () => {
            const approveAddress = document.getElementById('approveAddress').value;
            if (!approveAddress) {
                alert("Please enter a valid address.");
                return;
            }
            await contract.methods.approveClaim(approveAddress).send({ from: account });
            alert("Claim approved successfully!");
        };

        // Hủy hợp đồng
        document.getElementById('cancelPolicy').onclick = async () => {
            await contract.methods.cancelPolicy().send({ from: account });
            alert("Policy canceled and premium refunded!");
        };

        // Cấp quyền truy cập
        document.getElementById('grantAccess').onclick = async () => {
            const grantAddress = document.getElementById('grantAddress').value;
            if (!grantAddress) {
                alert("Please enter a valid address.");
                return;
            }
            await contract.methods.grantAccess(grantAddress).send({ from: account });
            alert("Access granted successfully!");
        };

        // Thu hồi quyền truy cập
        document.getElementById('revokeAccess').onclick = async () => {
            const revokeAddress = document.getElementById('revokeAddress').value;
            if (!revokeAddress) {
                alert("Please enter a valid address.");
                return;
            }
            await contract.methods.revokeAccess(revokeAddress).send({ from: account });
            alert("Access revoked successfully!");
        };

        // Kiểm tra số dư hợp đồng
        document.getElementById('checkBalance').onclick = async () => {
            const balance = await contract.methods.contractBalance().call();
            document.getElementById('contractBalance').innerText = web3.utils.fromWei(balance, "ether");
        };

        // Kiểm tra thông tin hợp đồng
        document.getElementById('checkPolicy').onclick = async () => {
            const checkAddress = document.getElementById('checkAddress').value;
            if (!checkAddress) {
                alert("Please enter a valid address.");
                return;
            }
            const policy = await contract.methods.policies(checkAddress).call();
            if (policy.premium === '0') {
                document.getElementById('policyDetails').innerText = "No insurance policy found for this address.";
            } else {
                const details = `Premium: ${web3.utils.fromWei(policy.premium, "ether")} ETH, Active: ${policy.isActive}, Claim Amount: ${web3.utils.fromWei(policy.claimAmount, "ether")} ETH`;
                document.getElementById('policyDetails').innerText = details;
            }
        };
    } else {
        alert("Please install MetaMask to use this DApp!");
    }
});
