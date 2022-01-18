# Introduction to Qubic mining

Qubic uses mining to back up [computors](/computing) with neccessary provable effort, required to perform computations accepted by Qubic network. It is an anti-sybil measure taken to prevent dishonest computors from rising into power.
Unlike traditional [proof-of-work](https://en.wikipedia.org/wiki/Proof_of_work) blockchains, Qubic uses proof-of-_useful_-work, solutions to difficult puzzles are actual goods with applications beyond securing the network.

## ANN training
Currently Qubic miners compete on training an [artificial neural network](https://en.wikipedia.org/wiki/Artificial_neural_network). While mining method is applicable to problems of any computational complexity class, the chosen task at hand is division of two 9-trit numbers.
Solutions to such problem have application in circuit design. 

Miners aquire energy as they increase their score by finding solutions which reduce the number of errors. A similar task is likely to be chosen after an unimprovable solution is found.

Here is a visualization of a neural network trained by Qubic miners generated with [ANN-visualizer](https://github.com/computor-tools/ann-visualizer) :

![](/docs/Mining/ann.png)

## Pools
Computors will be [mining pool](/protocol/glossary#pool) operators. A pool operator pools computational resources of miners to be one of the 676 computors. The pool periodically splits an amount of [energy](/protocol/glossary#energy) among miners according to their score in a fee-less manner.

## Status of mining
Mining software is distributed to miners by the one and only pool operator for now. Qubic is not ready yet and pool operator will transfer energy to miners later.

## System requirements
Currently Qubic is mined on CPUs with [AVX-2](https://en.wikipedia.org/wiki/Advanced_Vector_Extensions#Advanced_Vector_Extensions_2) at least, AVX-512 provides additional boost. Miner software is released for Windows only.

## Getting started
To start mining, if you are interested, join the #qubic channel on [Syzygy Discord](https://discord.gg/2vDMR8m).