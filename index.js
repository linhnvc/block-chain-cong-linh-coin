const SHA256 = require('crypto-js/sha256')

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return SHA256(this.index+this.previousHash+this.timestamp+JSON.stringify(this.data)).toString();
    }

}  


class BlockChain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }
    createGenesisBlock() {
        return new Block(0, "30/05/2021", "LinhNVC data", "0");
    }
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }
    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
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



console.log("LinhNVC System is creating new chain of blocks...")

// Khởi tạo chuỗi block 
let conglinh_coin = new BlockChain();
conglinh_coin.addBlock(new Block(1, "30/05/2021", { amount: 5 }));
conglinh_coin.addBlock(new Block(2, "30/05/2021", { amount: 10 }));
conglinh_coin.addBlock(new Block(3, "30/05/2021", { amount: 20 }));
conglinh_coin.addBlock(new Block(4, "30/05/2021", { amount: 100 }));

console.log("Is blockchain valid ::: " + conglinh_coin.isChainValid())
// conglinh_coin.showBlockchain()

// Kiểm tra tính ràng buộc khi dữ liệu bị thay đổi 
// conglinh_coin.chain[3].data = { amount: 50 };
// conglinh_coin.chain[3].hash = conglinh_coin.chain[3].calculateHash();
// conglinh_coin.showBlockchain()
// console.log("Is blockchain valid ::: " + conglinh_coin.isChainValid())
// console.log(JSON.stringify(myCoin, null, 4))




