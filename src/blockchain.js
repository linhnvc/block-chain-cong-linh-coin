const SHA256 = require('crypto-js/sha256')
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');


class Transaction {
    constructor(fromAdress, toAdress, amount){
        this.fromAdress = fromAdress
        this.toAdress = toAdress
        this.amount = amount
    }

    calculateHash(){
        return SHA256(this.fromAdress+this.toAdress+this.amount).toString();
    }

    signTransaction(signingKey){

        if (signingKey.getPublic('hex') !== this.fromAdress){
            throw new Error('Linh is sorry... You cannot sign transaction huhuhuhuhu...')
        }

        const hashTx = this.calculateHash();
        const sig = signingKey.sign(hashTx, 'base64')
        this.signature = sig.toDER('hex')
    }

    isValid(){
        if (this.fromAdress === null) return true;
        if (!this.signature || this.signature.length === 0){
            throw new Error('Have no signature huhuhuhuhu...')
        }
        const publicKey = ec.keyFromPublic(this.fromAdress, 'hex');

        return publicKey.verify(this.calculateHash(), this.signature);
    }

}


class Block {
    constructor(timestamp, transactions, previousHash = '') {
        // this.index = index;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.nonce = 0;
        this.hash = this.calculateHash();
        
    }

    calculateHash() {
        return SHA256(this.previousHash+this.timestamp+JSON.stringify(this.transactions)+this.nonce).toString();
    }

    mineBlock(dificulty){
        while(this.hash.substring(0, dificulty) !== Array(dificulty + 1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("Block mined: " + this.hash);
    }

    hasValidTransactions(){
        for (const tx of this.transactions){
            if (!tx.isValid()){
                return false;
            }
        }
        return true
    }


}  


class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.dificulty = 2;
        this.pendingTransactions = [];
        this.miningRewad = 100;
    }
    createGenesisBlock() {
        return new Block("30/05/2021", "LinhNVC data", "0");
    }
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }
    // addBlock(newBlock) {
    //     newBlock.previousHash = this.getLatestBlock().hash;
    //     // newBlock.hash = newBlock.calculateHash();
    //     newBlock.mineBlock(this.dificulty);
    //     this.chain.push(newBlock);
    // } 
    minePendingTransactions(miningRewardAdress) {

        const rewardTx = new Transaction(null, miningRewardAdress, this.miningRewad);
        this.pendingTransactions.push(rewardTx);

        let block = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock().hash);
        block.mineBlock(this.dificulty)
        console.log("Block mined successfully!")
        this.chain.push(block);

        this.pendingTransactions = [
            // new Transaction(null, miningRewardAdress, this.miningRewad)
        ]
    }

    addTransaction(transaction) {

        if (!transaction.fromAdress || !transaction.toAdress){
            throw new Error('Transaction must include from address and to address...')
        }

        if (!transaction.isValid()){
            throw new Error('Cannot add new invalid transacton...')
        }

        this.pendingTransactions.push(transaction)
    }

    getBalanceOfAddress(address) {
        let balance = 0;
        for (const block of this.chain){
            for (const trans of block.transactions) {
                if (trans.fromAdress === address) {
                    balance -= trans.amount
                }
                if (trans.toAdress === address) {
                    balance += trans.amount
                }
            }
        }
        return balance;
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];
            // console.log(i, "====================")
            // console.log(currentBlock.hash)
            // console.log(currentBlock.calculateHash())
            // console.log(currentBlock.previousHash)
            // console.log(previousBlock.hash)

            if (!currentBlock.hasValidTransactions()){
                return false
            }

            if (currentBlock.hash !== currentBlock.calculateHash()){
                console.log(i, "A");
                return false;
            }
            if (currentBlock.previousHash !== previousBlock.hash){
                console.log(i, "B");
                return false;
            }
        }
        return true;
    }






    showBlockchain(){
        console.log(this.chain)
    }
}


module.exports.Blockchain = Blockchain;
module.exports.Transaction = Transaction;

 