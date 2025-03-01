# TorogozAuth

![Solidity](https://img.shields.io/badge/Solidity-%23363636.svg?style=for-the-badge&logo=solidity&logoColor=white)  ![TypeScript](https://img.shields.io/badge/TypeScript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-%23F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=black)![Ethereum](https://img.shields.io/badge/Ethereum-%23454A75.svg?style=for-the-badge&logo=ethereum&logoColor=white) ![Blockchain](https://img.shields.io/badge/Blockchain-%230E76A8.svg?style=for-the-badge&logo=blockchain-dot-com&logoColor=white) ![Web3](https://img.shields.io/badge/Web3-%230E6CC4.svg?style=for-the-badge&logo=web3.js&logoColor=white) ![Piñata Cloud](https://img.shields.io/badge/Piñata%20Cloud-%2300BFFF.svg?style=for-the-badge&logo=pinata&logoColor=white) ![Next.js](https://img.shields.io/badge/Next.js-%23000000.svg?style=for-the-badge&logo=nextdotjs&logoColor=white)



  ![TorogozAuth Logo](./torogozauthlogo20.png)




# Torogoz-Auth

A secure, scalable, and modern authentication system designed for blockchain and Web3-based projects.

## Key Features

- Secure authentication implementation.
- Integration with blockchain technologies.
- Compatible with traditional systems and dApps.

---

## Table of Contents

1. [Description](#description)  
2. [Installation](#installation)  
3. [Usage](#usage)  
4. [Project Structure](#project-structure)  
5. [Contributions](#contributions)  
6. [License](#license)  
7. [Contact](#contact)  

---

## Description

TorogozAuth is a decentralised identity DApp (DID) that enables institutions and professionals to issue, manage, and verify academic and professional credentials securely and transparently using blockchain technology. With a modern and intuitive interface, TorogozAuth connects users via their Web3 wallets and records certifications directly on the blockchain, ensuring authenticity and immutability. This solution builds trust, streamlines credential validation, and empowers users with complete control over their professional digital identity.

---

## Installation

### Prerequisites

- Node.js (v16 or higher)  
- npm or yarn  
- A developer account on supported services  

### Installation Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/Chinaskidev/Torogoz-Auth.git  
   cd Torogoz-Auth
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   - Rename the `.env.example` file to `.env`.
   - Fill in the required values in the `.env` file.

4. Start the server:

   ```bash
   npm start
   ```

---

## Usage

### 1. Traditional Authentication:

Register a user with:

```bash
curl -X POST http://localhost:3000/register -d '{"username":"user","password":"pass"}'
```

### 2. Blockchain Authentication:

Set up your compatible wallet and authenticate.

---

## Project Structure

```plaintext
Torogoz-Auth/  
├── src/  
│   ├── app/              # Authentication logic  
│   ├── (landingpages)/   # Implements the main pages of the application  
│   ├── dashboard/        # Manages the configuration of variables, services and customized display  
│   └── utils/            # Shared utilities  
├── tests/                # Unit and integration tests  
├── .env.example          # Example environment variables  
├── package.json          # Dependencies and scripts  
└── README.md             # Project documentation  
```

---

## Contributions

Contributions are welcome!

1. Fork the repository.

2. Create a branch for your feature:

   ```bash
   git checkout -b feature/new-feature
   ```

3. Make your changes and submit a Pull Request.

Please review our contribution guidelines before getting started.

---
## Ckeck the Contract



[TorogozAuth Contract](https://sepolia.arbiscan.io/address/0x2148caA89bA15a41310077Bd11aC82859Ee56a27)

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

---

## Contact

**Author:** Chinaskidev  
**Email:** torogozauth@gmail.com
**Discord:** (https://discord.com/channels/@me/1314024278835990558)

