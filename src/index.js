const SHA256 = require('crypto-js/sha256')


class Transaction {
    constructor(fromAdress, toAdress, amount) {
        this.fromAdress = fromAdress
        this.toAdress = toAdress
        this.amount = amount
    }
}


class Block {
    constructor(timestamp, transactions, previousHash = '') {
        // this.index = index;
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() {
        return SHA256(this.index+this.previousHash+this.timestamp+JSON.stringify(this.data)+this.nonce).toString();
    }

    mineBlock(dificulty){
        while(this.hash.substring(0, dificulty) !== Array(dificulty + 1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("Block mined: " + this.hash);
    }

}  


class BlockChain {
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
        let block = new Block(Date.now(), this.pendingTransactions);
        block.mineBlock(this.dificulty)
        console.log("Block mined successfully!")
        this.chain.push(block);

        this.pendingTransactions = [
            new Transaction(null, miningRewardAdress, this.miningRewad)
        ]
    }

    createTransaction(transaction) {
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
            console.log(currentBlock.previousHash)
            console.log(previousBlock.hash)

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



// console.log("LinhNVC System is creating new chain of blocks...")

// // Khởi tạo chuỗi block 
// let conglinh_coin = new BlockChain();
// console.log("Mining block 1...")
// conglinh_coin.addBlock(new Block(1, "30/05/2021", { amount: 5 }));
// console.log("Mining block 2...")
// conglinh_coin.addBlock(new Block(2, "30/05/2021", { amount: 10 }));
// conglinh_coin.addBlock(new Block(3, "30/05/2021", { amount: 20 }));
// conglinh_coin.addBlock(new Block(4, "30/05/2021", { amount: 100 }));

// console.log("Is blockchain valid ::: " + conglinh_coin.isChainValid())
// conglinh_coin.showBlockchain()

// Kiểm tra tính ràng buộc khi dữ liệu bị thay đổi 
// conglinh_coin.chain[3].data = { amount: 50 };
// conglinh_coin.chain[3].hash = conglinh_coin.chain[3].calculateHash();
// conglinh_coin.showBlockchain()
// console.log("Is blockchain valid ::: " + conglinh_coin.isChainValid())
// console.log(JSON.stringify(myCoin, null, 4))


let conglinh_coin = new BlockChain();

conglinh_coin.createTransaction(new Transaction('address 1', 'address 2', 100))
conglinh_coin.createTransaction(new Transaction('address 2', 'address 1', 50))

console.log('\nStarting the mine...')
conglinh_coin.minePendingTransactions('linhnvc-address');
console.log('\nBalance of conglinh coin is', conglinh_coin.getBalanceOfAddress('linhnvc-address'))


console.log('\nStarting the mine again...')
conglinh_coin.minePendingTransactions('linhnvc-address');
console.log('\nBalance of conglinh coin is', conglinh_coin.getBalanceOfAddress('linhnvc-address'))






