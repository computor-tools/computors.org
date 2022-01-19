# Qubic mining guide

This page will guide you on how to start Qubic mining.

## Prerequisites

To get started please ensure that you pass this checklist:
1. You have a **Windows OS**. Linux and OSX are not supported.
2. You have a CPU with **AVX-2**.
3. You have a minimum of 4GB RAM.
4. You have standard internet connection (ipv4 or ipv6).
3. You are a member of `#qubic` channel on [Syzygy Discord](https://discord.gg/2vDMR8m), where copies of mining software are disseminated.
4. You have downloaded latest [Qiner.exe](https://discord.com/channels/768887649540243497/768890555564163092/932907473642348584) and [Identity generator](https://discord.com/channels/768887649540243497/768890555564163092/928755561883914300) from pinned messages in #qubic channel.

## Generate an identity

Before launching the miner you need to create an [identity](/protocol/glossary#identity).
Identity will be used as a command line argument passed to Qiner.exe.

Open [identity generator](https://discord.com/channels/768887649540243497/768890555564163092/928755561883914300) in your browser and enter a <u>_secret_</u> seed of _55 lowercase latin_ characters.
Make sure to save your seed and keep it somewhere safe. All your [energy](/protocol/glossary#energy) will be gone if you lose it. After clicking "login" you should see your 70 uppercase characters long identity. Copy it and use it for the next step.

## Launch Qiner.exe

Assuming you have downloaded [Qiner.exe](https://discord.com/channels/768887649540243497/768890555564163092/932907473642348584) in your Downloads folder, open command prompt and run:
```
cd Downloads
Qiner.exe <Identity> <NumberOfThreads>
```

Replace `<Identity>` with your identity and `<NumberOfThreads>` with number of threads you would like to mine with. Hit enter and miner will launch.