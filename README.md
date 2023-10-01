# AES Encryption Library

The AES (Advanced Encryption Standard) class is a JavaScript library that simplifies AES encryption and decryption operations using the Web Crypto API. This library allows you to easily generate encryption keys, perform encryption and decryption, and export keys in various formats.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)

## Features

- Simplified AES encryption and decryption operations.
- Easy key generation and export.

## Installation

You can install this library using git:

```
git clone https://github.com/mandarin-dev/aes-js.git
```

## Usage
```
import { AES } from 'aes-encryption-library';

// Create an instance of the AES class
const aes = new AES();

// Generate an encryption key
const key = await aes.generateKey();

// Set the encryption key
aes.key = key;

// Encrypt and decrypt data
const dataToEncrypt = 'Hello, AES!';
const encryptedData = await aes.encrypt(dataToEncrypt);
const decryptedData = await aes.decrypt(encryptedData);

console.log('Decrypted Data:', decryptedData);

```

## Contributing

Contributions to this project are welcome! To contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push your changes to your fork.
5. Create a pull request.
