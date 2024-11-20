// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract Torogoz is AccessControl {
    bytes32 public constant ISSUER_ROLE = keccak256("ISSUER_ROLE");

    struct Credential {
        string courseName;
        string institutionName;
        string issueDate;
        address recipient;
        bool valid;
    }

    mapping(bytes32 => Credential) public credentials;

    event CredentialIssued(address indexed recipient, string courseName, string institutionName, string issueDate);
    event IssuerAdded(address indexed account);
    event IssuerRevoked(address indexed account);
    event CredentialRevoked(bytes32 indexed credentialHash);

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ISSUER_ROLE, msg.sender);
    }

    function addIssuer(address account) public {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Solo el administrador puede asignar emisores.");
        grantRole(ISSUER_ROLE, account);
        emit IssuerAdded(account);
    }

    function revokeIssuer(address account) public {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Solo el administrador puede revocar emisores.");
        revokeRole(ISSUER_ROLE, account);
        emit IssuerRevoked(account);
    }

    function issueCredential(
        string memory _courseName,
        string memory _institutionName,
        string memory _issueDate,
        address _recipient

        //Esta función solo puede ser llamada por cuentas que tienen el rol ISSUER_ROLE. 
        //Esto asegura que solo emisores autorizados puedan emitir credenciales.
    ) public onlyRole(ISSUER_ROLE) returns (bytes32) {

        // keccak256 es una función hash que devuelve un identificador único para los parámetros de entrada.
        bytes32 credentialHash = keccak256(abi.encodePacked(_courseName, _institutionName, _issueDate, _recipient));

        // credentialHash almacena el mapeo de la credencial.
        credentials[credentialHash] = Credential(_courseName, _institutionName, _issueDate, _recipient, true);

        // emit se usa para notificar una nueva credencial que ha sido emmitida.
        emit CredentialIssued(_recipient, _courseName, _institutionName, _issueDate);
        return credentialHash;
    }

    function verifyCredential(bytes32 _credentialHash) public view returns (bool) {
        return credentials[_credentialHash].valid;
    }

    function revokeCredential(bytes32 _credentialHash) public {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Solo el administrador puede revocar credenciales.");
        require(credentials[_credentialHash].valid, "La credencial ya esta invalida.");
        credentials[_credentialHash].valid = false;
        emit CredentialRevoked(_credentialHash);
    }
}


