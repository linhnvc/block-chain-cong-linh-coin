const { Blockchain, Transaction } = require('./blockchain')
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('ab2a0bd41526fdd78a10c0a650b475db15bce97154e89074d1833c326222a9da')
const myWalletAddress = myKey.getPublic('hex')


let cong_linh_coin = new Blockchain();
const tx1 = new Transaction(myWalletAddress, 'public key goes here', 10);
tx1.signTransaction(myKey);
cong_linh_coin.addTransaction(tx1);


console.log('\nStarting the miner...')
cong_linh_coin.minePendingTransactions(myWalletAddress);
console.log('\nBalance of conglinh coin is', cong_linh_coin.getBalanceOfAddress(myWalletAddress))

console.log('Is chain valid?', cong_linh_coin.isChainValid())

cong_linh_coin.chain[1].transactions[0].amount = 1;
console.log('Is chain valid?', cong_linh_coin.isChainValid())


// console.log(cong_linh_coin.showBlockchain())



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


// let conglinh_coin = new Blockchain();

// conglinh_coin.createTransaction(new Transaction('address 1', 'address 2', 100))
// conglinh_coin.createTransaction(new Transaction('address 2', 'address 1', 50))

// console.log('\nStarting the mine...')
// conglinh_coin.minePendingTransactions('linhnvc-address');
// console.log('\nBalance of conglinh coin is', conglinh_coin.getBalanceOfAddress('linhnvc-address'))


// console.log('\nStarting the mine again...')
// conglinh_coin.minePendingTransactions('linhnvc-address');
// console.log('\nBalance of conglinh coin is', conglinh_coin.getBalanceOfAddress('linhnvc-address'))






