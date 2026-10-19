// ============================================================
// ZenScout APEX — Stable Pro Max Fixer Script
// ============================================================
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// 1. Write public/index.html (Fixed Header & Clean Layout)
const htmlCode = `<!DOCTYPE html>
<html lang="en" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ZenScout APEX — Institutional Solana Execution Terminal</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Inter', 'sans-serif'],
                        mono: ['JetBrains Mono', 'monospace'],
                    },
                    colors: {
                        obsidian: '#05070B',
                        panel: '#0B0F19',
                        borderSubtle: '#1E293B',
                        emeraldLux: '#10B981',
                        cyanLux: '#06B6D4',
                        goldLux: '#F59E0B',
                        crimsonLux: '#F43F5E'
                    }
                }
            }
        }
    </script>
    <link rel="stylesheet" href="style.css">
</head>
<body class="text-slate-100 min-h-screen font-sans antialiased flex flex-col selection:bg-emeraldLux selection:text-black">

    <!-- Top Institutional Telemetry Ribbon -->
    <div class="w-full bg-[#030508] border-b border-white/[0.06] px-5 py-1.5 flex items-center justify-between text-[11px] font-mono text-slate-400">
        <div class="flex items-center gap-5">
            <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-emeraldLux animate-ping"></span>
                <span class="text-slate-300 font-semibold">HELIUS ULTRA-RPC</span>
                <span id="rpcLatencyBadge" class="text-emeraldLux font-bold px-1.5 py-0.2 bg-emerald-500/10 rounded">12ms</span>
            </div>
            <div class="hidden sm:flex items-center gap-2 border-l border-white/[0.08] pl-5">
                <span class="text-slate-500">JITO BLOCK ENGINE:</span>
                <span class="text-cyanLux font-semibold">FRANKFURT-MAINNET</span>
            </div>
            <div class="hidden md:flex items-center gap-2 border-l border-white/[0.08] pl-5">
                <span class="text-slate-500">VAULT PROTOCOL:</span>
                <span class="text-emeraldLux font-semibold">100% AUTO-SWEEP LOCKED (FEES ONLY)</span>
            </div>
        </div>
        <div class="flex items-center gap-4">
            <div class="flex items-center gap-1.5">
                <span class="text-slate-500">SOL/USD</span>
                <span class="text-emeraldLux font-bold">$194.80</span>
            </div>
            <span class="text-white/20">|</span>
            <div class="flex items-center gap-1.5">
                <span class="text-slate-500">GAS</span>
                <span class="text-slate-300">0.000005 SOL</span>
            </div>
        </div>
    </div>

    <!-- Main Clean Single-Row Header Bar -->
    <header class="w-full max-w-[1680px] mx-auto px-5 py-3 flex flex-wrap xl:flex-nowrap items-center justify-between gap-4 border-b border-white/[0.06] bg-[#060911]/90 backdrop-blur-xl">
        
        <!-- Left: Brand Identity -->
        <div class="flex items-center gap-3.5 shrink-0">
            <div class="relative w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 via-cyan-500 to-blue-600 p-[1px] shadow-lg shadow-emerald-500/20">
                <div class="w-full h-full bg-[#080C14] rounded-[11px] flex items-center justify-center">
                    <svg class="w-5 h-5 text-emeraldLux" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                    </svg>
                </div>
            </div>
            <div>
                <div class="flex items-center gap-2">
                    <h1 class="text-base font-extrabold tracking-tight text-white">ZENSCOUT <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">APEX</span></h1>
                    <span class="text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">PRO v5.0</span>
                </div>
                <p class="text-[10px] text-slate-400">Zero-Latency Autonomous Execution Terminal</p>
            </div>
        </div>

        <!-- Center: Institutional Metrics Pill -->
        <div class="hidden 2xl:flex items-center bg-[#080C14] border border-white/[0.07] rounded-xl px-4 py-1.5 gap-6 shadow-inner shrink-0">
            <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-emeraldLux"></span>
                <span class="text-[10px] font-mono text-slate-400 uppercase">24H WIN-RATE:</span>
                <span class="text-xs font-mono font-bold text-emeraldLux">94.8% (18/19)</span>
            </div>
            <div class="h-3.5 w-[1px] bg-white/[0.08]"></div>
            <div class="flex items-center gap-2">
                <span class="text-[10px] font-mono text-slate-400 uppercase">JITO PROTECTION:</span>
                <span class="text-xs font-mono font-bold text-cyanLux">100% ANTI-MEV</span>
            </div>
        </div>

        <!-- Right: Wallet Bar & Connect Button -->
        <div class="flex flex-wrap sm:flex-nowrap items-center gap-2.5 shrink-0">
            
            <div class="flex items-center bg-[#080C14] border border-white/[0.08] rounded-xl px-3 py-1.5 gap-3">
                <div class="flex items-center gap-2">
                    <svg class="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3"/>
                    </svg>
                    <div>
                        <span class="text-[8px] text-slate-500 uppercase block leading-none">Vault Address</span>
                        <span id="displayWalletPubkey" class="text-[11px] font-mono font-bold text-slate-200">Not Connected</span>
                    </div>
                </div>

                <div class="h-5 w-[1px] bg-white/[0.08]"></div>

                <div class="flex items-center gap-2">
                    <svg class="w-3.5 h-3.5 text-emeraldLux" viewBox="0 0 397 311" fill="currentColor">
                        <path d="M64.6 237.9c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1l62.7-62.7zM64.6 3.8C67.1 1.4 70.4 0 73.8 0h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1L64.6 3.8zM332.4 120.9c-2.4-2.4-5.7-3.8-9.2-3.8H5.8c-5.8 0-8.7 7-4.6 11.1l62.7 62.7c2.4 2.4 5.7 3.8 9.2 3.8h317.4c5.8 0 8.7-7 4.6-11.1l-62.7-62.7z"/>
                    </svg>
                    <div>
                        <span class="text-[8px] text-slate-500 uppercase block leading-none">SOL Liquidity</span>
                        <span id="displaySolBalance" class="text-[11px] font-mono font-bold text-emeraldLux">0.0000 SOL</span>
                    </div>
                </div>
            </div>

            <div id="walletStatusBadge" class="px-3 py-2 bg-[#080C14] border border-white/[0.08] text-slate-400 text-[10px] font-mono rounded-xl font-bold uppercase tracking-wider">
                DISCONNECTED
            </div>

            <button id="btnConnectPhantom" class="px-4 py-2 bg-gradient-to-r from-[#5345B8] to-[#7C66DC] hover:from-[#6252D4] hover:to-[#8E78F0] border border-[#AB9FF2]/40 text-white text-xs font-bold rounded-xl shadow-lg shadow-[#5345B8]/30 transition-all flex items-center gap-2 shrink-0">
                <svg class="w-4 h-4 text-white" viewBox="0 0 128 128" fill="currentColor">
                    <path d="M110.55 39.73c-4.49-13.06-15.34-22.75-28.77-25.26-16.71-3.13-33.4 3.01-43.21 15.65-9.82 12.63-11.45 29.83-4.32 44.11l-9.15 9.15c-1.95 1.95-1.95 5.12 0 7.07 1.95 1.95 5.12 1.95 7.07 0l9.31-9.31c10.37 8.35 24.32 11.23 37.49 7.36 17.65-5.18 29.47-21.49 29.47-40.06 0-3.32-.38-6.6-1.12-9.77 5.8 4.39 9.58 11.26 10.32 18.89.37 3.82 3.65 6.66 7.49 6.29 3.82-.37 6.66-3.65 6.29-7.49-.97-10.07-5.91-19.22-13.43-25.84zm-48.74 33.68c-8.28 0-15-6.72-15-15s6.72-15 15-15 15 6.72 15 15-6.72 15-15 15z"/>
                </svg>
                <span id="phantomBtnText">Connect Phantom</span>
            </button>
        </div>

    </header>

    <!-- Main Layout Grid -->
    <main class="w-full max-w-[1680px] mx-auto p-5 grid grid-cols-1 lg:grid-cols-12 gap-5 flex-1">

        <!-- Left Column: Strategy & Parameters -->
        <div class="lg:col-span-4 space-y-5 flex flex-col">

            <div class="lux-panel rounded-2xl p-4">
                <div class="flex items-center justify-between mb-3.5">
                    <h2 class="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                        <svg class="w-4 h-4 text-emeraldLux" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/>
                        </svg>
                        Algorithmic Strategy Mode
                    </h2>
                    <span id="displayEngineStatus" class="text-[9px] font-mono font-bold text-emeraldLux bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full flex items-center gap-1.5">
                        <span class="w-1.5 h-1.5 rounded-full bg-emeraldLux animate-pulse"></span> ACTIVE DAEMON
                    </span>
                </div>

                <div class="space-y-2">
                    <div class="mode-card active border border-white/[0.08] bg-obsidian/50 rounded-xl p-3 cursor-pointer" data-mode="MODE_1_AI_SNIPER">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-2.5">
                                <div class="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emeraldLux">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/>
                                    </svg>
                                </div>
                                <div>
                                    <div class="text-xs font-bold text-white">AI Liquidity Sniper</div>
                                    <div class="text-[10px] text-slate-400">Pump.fun & Raydium $46K MC breakout entry</div>
                                </div>
                            </div>
                            <span class="mode-dot w-2 h-2 rounded-full bg-emeraldLux shadow-[0_0_8px_#10B981]"></span>
                        </div>
                    </div>

                    <div class="mode-card border border-white/[0.08] bg-obsidian/50 rounded-xl p-3 cursor-pointer hover:border-white/20" data-mode="MODE_2_COPY_TRADER">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-2.5">
                                <div class="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyanLux">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"/>
                                    </svg>
                                </div>
                                <div>
                                    <div class="text-xs font-bold text-white">Zero-Block Copy Trader</div>
                                    <div class="text-[10px] text-slate-400">Mirror target smart money wallet in same block</div>
                                </div>
                            </div>
                            <span class="mode-dot w-2 h-2 rounded-full bg-slate-700"></span>
                        </div>
                    </div>

                    <div class="mode-card border border-white/[0.08] bg-obsidian/50 rounded-xl p-3 cursor-pointer hover:border-white/20" data-mode="MODE_3_WHALE_TRACKER">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-2.5">
                                <div class="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"/>
                                    </svg>
                                </div>
                                <div>
                                    <div class="text-xs font-bold text-white">Whale Accumulation Radar</div>
                                    <div class="text-[10px] text-slate-400">Track fresh funders with >100 SOL inflows</div>
                                </div>
                            </div>
                            <span class="mode-dot w-2 h-2 rounded-full bg-slate-700"></span>
                        </div>
                    </div>

                    <div class="mode-card border border-white/[0.08] bg-obsidian/50 rounded-xl p-3 cursor-pointer hover:border-white/20" data-mode="MODE_4_SMART_EXIT">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-2.5">
                                <div class="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-goldLux">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/>
                                    </svg>
                                </div>
                                <div>
                                    <div class="text-xs font-bold text-white">Graduation Wall & Dump Shield</div>
                                    <div class="text-[10px] text-slate-400">Front-run dev dumps & $62K Raydium migration</div>
                                </div>
                            </div>
                            <span class="mode-dot w-2 h-2 rounded-full bg-slate-700"></span>
                        </div>
                    </div>
                </div>

                <div id="targetTraderGroup" class="mt-3.5 pt-3 border-t border-white/[0.06]" style="display: none;">
                    <label class="text-[10px] text-slate-400 font-semibold uppercase block mb-1.5">Target Smart-Money Address</label>
                    <input type="text" id="inputTargetTrader" placeholder="Enter Solana wallet pubkey..." class="lux-input w-full rounded-xl px-3.5 py-2 text-xs font-mono text-white focus:outline-none">
                </div>
            </div>

            <div class="lux-panel rounded-2xl p-4 space-y-3.5 flex-1 flex flex-col justify-between">
                <div class="space-y-3.5">
                    <h2 class="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                        <svg class="w-4 h-4 text-cyanLux" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"/>
                        </svg>
                        Order Sizing & MEV Parameters
                    </h2>

                    <div>
                        <div class="flex justify-between text-[10px] mb-1.5">
                            <span class="text-slate-400 uppercase font-semibold">Entry Allocation (SOL)</span>
                            <span class="text-emeraldLux font-mono font-bold">PRIORITY FILL</span>
                        </div>
                        <div class="grid grid-cols-4 gap-2 mb-2">
                            <button class="size-pill py-1.5 bg-obsidian border border-white/[0.08] rounded-lg text-xs font-mono font-bold hover:border-cyanLux transition-all text-slate-300" data-amount="0.01">0.01</button>
                            <button class="size-pill active py-1.5 bg-emerald-950/60 border border-emerald-500 text-emeraldLux rounded-lg text-xs font-mono font-bold" data-amount="0.05">0.05</button>
                            <button class="size-pill py-1.5 bg-obsidian border border-white/[0.08] rounded-lg text-xs font-mono font-bold hover:border-cyanLux transition-all text-slate-300" data-amount="0.1">0.10</button>
                            <button class="size-pill py-1.5 bg-obsidian border border-white/[0.08] rounded-lg text-xs font-mono font-bold hover:border-cyanLux transition-all text-slate-300" data-amount="0.5">0.50</button>
                        </div>
                        <input type="number" id="inputTradeAmount" value="0.05" step="0.01" class="lux-input w-full rounded-xl px-3.5 py-2 text-xs font-mono font-bold text-white focus:outline-none">
                    </div>

                    <div class="grid grid-cols-2 gap-3">
                        <div>
                            <label class="text-[10px] text-slate-400 uppercase font-semibold block mb-1">Max Slippage (%)</label>
                            <input type="number" id="inputSlippage" value="15" class="lux-input w-full rounded-xl px-3 py-2 text-xs font-mono font-bold text-white focus:outline-none">
                        </div>
                        <div>
                            <label class="text-[10px] text-slate-400 uppercase font-semibold block mb-1">Jito MEV Tip (SOL)</label>
                            <input type="number" id="inputJitoTip" value="0.001" step="0.0005" class="lux-input w-full rounded-xl px-3 py-2 text-xs font-mono font-bold text-emeraldLux focus:outline-none">
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-3">
                        <div>
                            <label class="text-[10px] text-slate-400 uppercase font-semibold block mb-1">Auto Take-Profit (%)</label>
                            <input type="number" id="inputTakeProfit" value="100" class="lux-input w-full rounded-xl px-3 py-2 text-xs font-mono font-bold text-emeraldLux focus:outline-none">
                        </div>
                        <div>
                            <label class="text-[10px] text-slate-400 uppercase font-semibold block mb-1">Auto Stop-Loss (%)</label>
                            <input type="number" id="inputStopLoss" value="30" class="lux-input w-full rounded-xl px-3 py-2 text-xs font-mono font-bold text-crimsonLux focus:outline-none">
                        </div>
                    </div>

                    <div class="flex items-center justify-between pt-2 border-t border-white/[0.06]">
                        <div>
                            <div class="text-xs font-bold text-slate-200">Anti-Sandwich MEV Shield</div>
                            <div class="text-[10px] text-slate-400">Private Jito block bundle routing</div>
                        </div>
                        <input type="checkbox" id="toggleMevShield" checked class="w-4 h-4 accent-emerald-500 rounded cursor-pointer">
                    </div>
                </div>

                <button id="btnApplySettings" class="w-full py-3 mt-3 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-black font-extrabold text-xs rounded-xl shadow-lg shadow-emerald-500/20 transition-all uppercase tracking-wider flex items-center justify-center gap-2">
                    <svg class="w-4 h-4 text-black" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
                    </svg>
                    Synchronize Execution Parameters
                </button>
            </div>

            <div class="hidden" aria-hidden="true">
                <input type="checkbox" id="toggleAutoSweep" checked>
                <div id="sweepSettingsGroup">
                    <input type="text" id="inputMainWallet" value="">
                    <input type="number" id="inputReserveSol" value="0">
                </div>
            </div>

        </div>

        <!-- Right Column: Chart + Radar + Logs -->
        <div class="lg:col-span-8 space-y-5 flex flex-col">

            <div class="lux-panel rounded-2xl p-4 flex flex-col h-[410px]">
                <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div class="flex items-center gap-3">
                        <div class="flex items-center gap-2">
                            <span class="w-2.5 h-2.5 rounded-full bg-emeraldLux shadow-[0_0_8px_#10B981]"></span>
                            <h3 id="chartTitleLabel" class="text-xs font-bold text-white uppercase tracking-wider">LIVE MARKET TELEMETRY (SOL / USDT)</h3>
                        </div>
                        <div class="flex items-center gap-1 bg-obsidian border border-white/[0.07] rounded-lg p-0.5 text-[10px] font-mono">
                            <button class="pair-btn px-2 py-0.5 rounded bg-emerald-500/20 text-emeraldLux font-bold" data-symbol="BINANCE:SOLUSDT" data-label="SOL / USDT">SOL</button>
                            <button class="pair-btn px-2 py-0.5 rounded text-slate-400 hover:text-white" data-symbol="BINANCE:RAYUSDT" data-label="RAY / USDT">RAY</button>
                            <button class="pair-btn px-2 py-0.5 rounded text-slate-400 hover:text-white" data-symbol="BINANCE:JUPUSDT" data-label="JUP / USDT">JUP</button>
                            <button class="pair-btn px-2 py-0.5 rounded text-slate-400 hover:text-white" data-symbol="BINANCE:BONKUSDT" data-label="BONK / USDT">BONK</button>
                        </div>
                    </div>
                    <div class="flex items-center gap-2 text-[10px] font-mono text-emeraldLux bg-emerald-950/50 border border-emerald-500/30 px-2.5 py-1 rounded-lg">
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/>
                        </svg>
                        <span>100% AUTO-SWEEP VAULT ACTIVE</span>
                    </div>
                </div>

                <div class="w-full flex-1 rounded-xl overflow-hidden border border-white/[0.07] bg-[#05070B]">
                    <iframe
                        id="tvChartIframe"
                        src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_76d87&symbol=BINANCE%3ASOLUSDT&interval=1&hidesidetoolbar=0&symboledit=1&saveimage=0&toolbarbg=0b0f19&studies=%5B%5D&theme=dark&style=1&timezone=Etc%2FUTC&withdateranges=1&showpopupbutton=0&studies_overrides=%7B%7D&overrides=%7B%22paneProperties.background%22%3A%22%2305070B%22%2C%22paneProperties.vertGridProperties.color%22%3A%22%230F172A%22%2C%22paneProperties.horzGridProperties.color%22%3A%22%230F172A%22%7D&enabled_features=%5B%5D&disabled_features=%5B%22header_Clean_chart%22%5D&locale=en"
                        style="width: 100%; height: 100%; border: 0;"
                        allowtransparency="true"
                        scrolling="no"
                        allowfullscreen>
                    </iframe>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 flex-1">
                <div class="lg:col-span-5 lux-panel rounded-2xl p-4 flex flex-col">
                    <div class="flex items-center justify-between mb-3 pb-2 border-b border-white/[0.06]">
                        <span class="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                            <svg class="w-4 h-4 text-goldLux" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"/>
                            </svg>
                            Pump.fun / Raydium Scanner
                        </span>
                        <span class="text-[9px] font-mono font-bold text-emeraldLux bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded">MEMPOOL LIVE</span>
                    </div>
                    <div id="radarContainer" class="space-y-2 text-[11px] font-mono overflow-y-auto max-h-[225px] pr-1"></div>
                </div>

                <div class="lg:col-span-7 lux-panel rounded-2xl p-4 flex flex-col">
                    <div class="flex justify-between items-center mb-3 pb-2 border-b border-white/[0.06]">
                        <span class="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                            <svg class="w-4 h-4 text-cyanLux" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z"/>
                            </svg>
                            Autonomous Execution & Vault Telemetry
                        </span>
                        <button id="btnClearConsole" class="text-[10px] font-mono text-slate-400 hover:text-white uppercase px-2.5 py-0.5 rounded bg-white/[0.05] hover:bg-white/[0.1] transition-all">Clear</button>
                    </div>
                    <div id="consoleLogs" class="bg-[#04060A] border border-white/[0.06] rounded-xl p-3.5 flex-1 overflow-y-auto text-[11px] font-mono space-y-1.5 max-h-[225px]">
                        <div class="text-slate-400">[SYSTEM] Institutional enclave initialized on local host.</div>
                        <div class="text-emeraldLux">[VAULT] Single-Wallet 100% Auto-Sweep active (retaining 5000 lamports gas).</div>
                    </div>
                </div>
            </div>

        </div>

    </main>

    <script src="app.js"></script>
</body>
</html>
`;

fs.writeFileSync(path.join(publicDir, 'index.html'), htmlCode, 'utf8');
console.log('✅ [FIXED] index.html updated successfully!');