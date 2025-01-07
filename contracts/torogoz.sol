// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract Torogoz is AccessControl, ERC721Enumerable {
    bytes32 public constant ISSUER_ROLE = keccak256("ISSUER_ROLE");

    struct Credential {                
        string institutionName;
        string courseName;
        string firstName;       
        string lastName;
        uint256 issueDate;
        address recipient;
        bool valid;
    }

    mapping(bytes32 => Credential) public credentials;
    mapping(address => bytes32[]) private userCredentials;

    event CredentialIssued(
        address indexed recipient,
        bytes32 indexed credentialHash,        
        string institutionName,
        string courseName,
        string firstName,
        string lastName,
        uint256 issueDate
    );
    event IssuerAdded(address indexed account);
    event IssuerRevoked(address indexed account);
    event CredentialRevoked(bytes32 indexed credentialHash);

    constructor() ERC721("TorogozCredential", "TORC") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ISSUER_ROLE, msg.sender);
    }

    function addIssuer(address account) public {
        require(
            hasRole(DEFAULT_ADMIN_ROLE, msg.sender),
            "Solo el administrador puede asignar emisores."
        );
        grantRole(ISSUER_ROLE, account);
        emit IssuerAdded(account);
    }

    function revokeIssuer(address account) public {
        require(
            hasRole(DEFAULT_ADMIN_ROLE, msg.sender),
            "Solo el administrador puede revocar emisores."
        );
        revokeRole(ISSUER_ROLE, account);
        emit IssuerRevoked(account);
    }

    function issueCredential(        
        string memory _institutionName,
        string memory _courseName,
        string memory _firstName,
        string memory _lastName,
        address _recipient
    ) public onlyRole(ISSUER_ROLE) returns (bytes32) {
        uint256 _issueDate = block.timestamp;

        // Generar un hash único para la credencial
        bytes32 credentialHash = keccak256(
            abi.encodePacked(                
                _institutionName,
                _courseName,
                _firstName,
                _lastName,
                _issueDate,
                _recipient
            )
        );

        // Almacenar la credencial
        credentials[credentialHash] = Credential(            
            _institutionName,
            _courseName,
            _firstName,
            _lastName,
            _issueDate,
            _recipient,
            true
        );

        // Asociar la credencial al destinatario
        userCredentials[_recipient].push(credentialHash);

        // Emitir un token ERC-721 asociado a la credencial
        uint256 tokenId = uint256(credentialHash);
        _mint(_recipient, tokenId);

        // Emitir un evento
        emit CredentialIssued(
            _recipient,
            credentialHash,
            _institutionName,
            _courseName,
            _firstName,
            _lastName,
            _issueDate
        );

        return credentialHash;
    }

    function verifyCredential(bytes32 _credentialHash) public view returns (bool) {
        return credentials[_credentialHash].valid;
    }

    function revokeCredential(bytes32 _credentialHash) public {
        require(
            hasRole(DEFAULT_ADMIN_ROLE, msg.sender),
            "Solo el administrador puede revocar credenciales."
        );
        require(credentials[_credentialHash].valid, "La credencial ya esta invalida.");

        credentials[_credentialHash].valid = false;
        emit CredentialRevoked(_credentialHash);

        // Quemar el token ERC-721 asociado
        uint256 tokenId = uint256(_credentialHash);
        _burn(tokenId);
    }

    function getCredentialsByUser(address user)
        public
        view
        returns (bytes32[] memory)
    {
        return userCredentials[user];
    }

    function getCredentialDetails(bytes32 _credentialHash)
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            string memory,
            uint256,
            address,
            bool
        )
    {
        Credential memory cred = credentials[_credentialHash];
        return (            
            cred.institutionName,
            cred.courseName,
            cred.firstName,
            cred.lastName,
            cred.issueDate,
            cred.recipient,
            cred.valid
        );
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal virtual {}

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(AccessControl, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
