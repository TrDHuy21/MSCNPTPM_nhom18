// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CropInsurance {
    address public owner;
    mapping(address => Policy) public policies;

    struct Policy {
        uint256 premium; // Phí bảo hiểm
        bool isActive;   // Trạng thái hợp đồng
        uint256 claimAmount; // Số tiền yêu cầu bồi thường
    }

    // Quản lý quyền truy cập
    mapping(address => bool) public authorized;

    // Thời gian hợp đồng có hiệu lực (ví dụ 30 ngày)
    uint256 public contractDuration = 30 days;
    mapping(address => uint256) public policyStartTime;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    modifier onlyAuthorized() {
        require(authorized[msg.sender], "You are not authorized to perform this action");
        _;
    }

    constructor() {
        owner = msg.sender; // Chủ sở hữu hợp đồng
    }

    // Cấp quyền truy cập
    function grantAccess(address _address) external onlyOwner {
        authorized[_address] = true;
    }

    // Thu hồi quyền truy cập
    function revokeAccess(address _address) external onlyOwner {
        authorized[_address] = false;
    }

    // Mua hợp đồng bảo hiểm
    function buyInsurance() external payable {
        require(msg.value > 0, "Insurance premium must be greater than zero");

        policies[msg.sender] = Policy({
            premium: msg.value,
            isActive: true,
            claimAmount: 0
        });

        policyStartTime[msg.sender] = block.timestamp;
    }

    // Nộp yêu cầu bồi thường
    function fileClaim(uint256 _claimAmount) external {
        require(policies[msg.sender].isActive, "Policy is not active");
        require(_claimAmount > 0, "Claim amount must be greater than zero");

        policies[msg.sender].claimAmount = _claimAmount;
    }

    // Phê duyệt yêu cầu bồi thường
    function approveClaim(address _policyHolder) external onlyAuthorized {
        require(policies[_policyHolder].claimAmount > 0, "No claim filed");

        uint256 claimAmount = policies[_policyHolder].claimAmount;
        payable(_policyHolder).transfer(claimAmount);

        // Reset claim sau khi phê duyệt
        policies[_policyHolder].claimAmount = 0;
    }

    // Hủy hợp đồng bảo hiểm
    function cancelPolicy() external {
        require(policies[msg.sender].isActive, "No active policy");
        require(policies[msg.sender].claimAmount == 0, "Cannot cancel while claim is pending");
        require(block.timestamp - policyStartTime[msg.sender] <= contractDuration, "Cannot cancel after contract period");

        uint256 premiumAmount = policies[msg.sender].premium;
        payable(msg.sender).transfer(premiumAmount);

        policies[msg.sender].isActive = false;
    }

    // Kiểm tra số dư hợp đồng
    function contractBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
