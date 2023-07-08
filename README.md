# Starterkit-typescript

Projet d'examen chez alyra dev web3.

### Install

```sh
git clone https://...
cd <repository>
yarn
```

### Run 

First terminal (sepolia default):

```sh
yarn dapp:dev
```

For Blockchain local (hardhat):

```sh
yarn blockchain
```

For deploy or other:
If you deploy on local, you should change address of contract in `./packages/dapp/config/abis/scansecure.ts`


```sh
yarn sc:test
yarn sc:coverage
yarn sc:deploy:local
yarn sc:deploy:sepolia
```

+ info in ./package.json

###### By [xDrKush](https://github.com/xdrkush)
