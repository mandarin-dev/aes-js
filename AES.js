export class AES {

    /**
     * Constructor for the AES class.
     *
     * @param {Object} algorithm - The encryption algorithm to use, with optional properties (default: AES-GCM with an IV of 12 bytes).
     * @param {Object} algorithmForKey - The algorithm configuration for key generation, with optional properties (default: AES-GCM with a key length of 256 bits).
     */
    constructor(algorithm, algorithmForKey) {
        this._algorithm = algorithm || {name: 'AES-GCM', iv: new Uint8Array(12)};
        this._algorithmForKey = algorithmForKey || {name: 'AES-GCM', length: 256};
    }

    /**
     * Setter for the encryption key.
     *
     * @param {CryptoKey} key - The encryption key.
     */
    set key(key) {
        this._key = key;
    }

    /**
     * Getter for the encryption key.
     *
     * @returns {CryptoKey} - The encryption key.
     */
    get key() {
        return this._key;
    }

    /**
     * Generate an encryption key asynchronously.
     *
     * @param {Object} generationAlgorithm - The algorithm configuration for key generation (default: this._algorithmForKey).
     * @param {boolean} isExtractable - Indicates whether the key can be extracted (default: true).
     * @param {string[]} keyUsages - An array of key usages (default: ['encrypt', 'decrypt']).
     * @returns {Promise<CryptoKey>} - A promise that resolves to the generated encryption key.
     */
    async generateKey(generationAlgorithm = this._algorithmForKey, isExtractable = true, keyUsages = ['encrypt', 'decrypt']) {
        try{
            return await window.crypto.subtle.generateKey(
                generationAlgorithm,
                isExtractable,
                keyUsages
            );
        }
        catch(e){
            console.error('Error generating key:', e);
            throw e;
        }
            
    }

    /**
     * Export the encryption key in a specified format asynchronously.
     *
     * @param {string} format - The format in which to export the key (default: 'raw').
     * @returns {Promise<ArrayBuffer>} - A promise that resolves to the exported key data.
     */
    async exportKey(format = 'raw') {
        if(!this._key) throw new Error("Encryption key empty!");

        return await crypto.subtle.exportKey(format, this._key);
    }

    /**
     * Encrypt data using the encryption key.
     *
     * @param {string} data - The data to be encrypted.
     * @returns {Promise<ArrayBuffer>} - A promise that resolves to the encrypted data as an ArrayBuffer.
     */
    async encrypt(data) {
        if(!this._key) throw new Error("Encryption key empty!");
        
        const encoder = new TextEncoder();
        const encodedData = encoder.encode(data);
        try{
            return await window.crypto.subtle.encrypt(
                this._algorithm,
                this._key,
                encodedData
            );
        }
        catch(e){
            console.error('Error encrypting data:', e);
            throw e;
        }
    }

    /**
     * Decrypt encrypted data using the encryption key.
     *
     * @param {ArrayBuffer} data - The encrypted data to be decrypted.
     * @returns {Promise<string>} - A promise that resolves to the decrypted data as a string.
     */
    async decrypt(data) {
        if(!this._key) throw new Error("Encryption key empty!");
        
        try{
            const decryptedData = await window.crypto.subtle.decrypt(
                this._algorithm,
                this._key,
                data
            );
            
            const decoder = new TextDecoder();
            return decoder.decode(decryptedData);
        }
        catch(e){
            console.error('Error decrypting data:', e);
            throw e;
        }
            
    }

    /**
     * Convert an array with data to a base64-encoded string.
     *
     * @param {ArrayBuffer} arrayWithData - The array containing data to be encoded.
     * @returns {string} - The base64-encoded string.
     */
    fromArrayToString(arrayWithData) {
        return btoa(String.fromCharCode.apply(null, new Uint8Array(arrayWithData)));
    }

}