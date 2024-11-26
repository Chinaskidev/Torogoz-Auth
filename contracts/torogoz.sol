// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract Torogoz is AccessControl, ERC721Enumerable {
    // Roles para la gestión de permisos
    bytes32 public constant ISSUER_ROLE = keccak256("ISSUER_ROLE");

    // Estructura de la credencial
    struct Credential {
        string courseName;
        string institutionName;
        uint256 issueDate; //timestamps en lugar de strings para que no haya errores en las fechas
        address recipient;
        bool valid;
    }

    // Mapeo para almacenar credenciales por su hash único
    mapping(bytes32 => Credential) public credentials;

    // Mapeo para rastrear las credenciales emitidas a cada dirección
    mapping(address => bytes32[]) private userCredentials;

    // Eventos
    event CredentialIssued(
        address indexed recipient,
        bytes32 indexed credentialHash,
        string courseName,
        string institutionName,
        uint256 issueDate
    );
    event IssuerAdded(address indexed account);
    event IssuerRevoked(address indexed account);
    event CredentialRevoked(bytes32 indexed credentialHash);

    // Constructor
    constructor() ERC721("TorogozCredential", "TORC") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ISSUER_ROLE, msg.sender);
    }

    // Función para agregar un emisor
    function addIssuer(address account) public {
        require(
            hasRole(DEFAULT_ADMIN_ROLE, msg.sender),
            "Solo el administrador puede asignar emisores."
        );
        grantRole(ISSUER_ROLE, account);
        emit IssuerAdded(account);
    }

    // Función para revocar el rol de emisor
    function revokeIssuer(address account) public {
        require(
            hasRole(DEFAULT_ADMIN_ROLE, msg.sender),
            "Solo el administrador puede revocar emisores."
        );
        revokeRole(ISSUER_ROLE, account);
        emit IssuerRevoked(account);
    }

    // Función para emitir una credencial
    function issueCredential(
        string memory _courseName,
        string memory _institutionName,
        address _recipient
    ) public onlyRole(ISSUER_ROLE) returns (bytes32) {
        uint256 _issueDate = block.timestamp;

        // Generar un hash único para la credencial
        bytes32 credentialHash = keccak256(
            abi.encodePacked(_courseName, _institutionName, _issueDate, _recipient)
        );

        // Almacenar la credencial
        credentials[credentialHash] = Credential(
            _courseName,
            _institutionName,
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
            _courseName,
            _institutionName,
            _issueDate
        );

        return credentialHash;
    }

    // Función para verificar si una credencial es válida
    function verifyCredential(bytes32 _credentialHash) public view returns (bool) {
        return credentials[_credentialHash].valid;
    }

    // Función para revocar una credencial
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

    // Función para obtener todas las credenciales emitidas a un usuario
    function getCredentialsByUser(address user)
        public
        view
        returns (bytes32[] memory)
    {
        return userCredentials[user];
    }

    // Función para obtener detalles de una credencial
    function getCredentialDetails(bytes32 _credentialHash)
        public
        view
        returns (
            string memory,
            string memory,
            uint256,
            address,
            bool
        )
    {
        Credential memory cred = credentials[_credentialHash];
        return (
            cred.courseName,
            cred.institutionName,
            cred.issueDate,
            cred.recipient,
            cred.valid
        );
    }

    // Sobrescribir funciones para cumplir con ERC721Enumerable
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal virtual{

    
    }

    // ERC-165 para admitir interfaces ERC-721 y ERC-721Enumerable
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(AccessControl, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}