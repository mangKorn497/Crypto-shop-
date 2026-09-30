import React from "react";
import { Wallet, Loader2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { shortAddress, SEPOLIA_EXPLORER } from "@/lib/wallet";

export default function WalletButton({ wallet }) {
  const { account, isConnecting, connect, isSepolia, hasMetaMask, error } = wallet;

  if (!account) {
    return (
      <Button
        onClick={connect}
        disabled={isConnecting}
        className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 text-white shadow-lg shadow-indigo-500/20"
      >
        {isConnecting ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <Wallet className="w-4 h-4 mr-2" />
        )}
        {isConnecting ? "กำลังเชื่อมต่อ…" : "เชื่อมต่อ MetaMask"}
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span
        className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
          isSepolia
            ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
            : "bg-amber-500/15 text-amber-300 border border-amber-500/30"
        }`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
        {isSepolia ? "Sepolia" : "เครือข่ายอื่น"}
      </span>
      <a
        href={`${SEPOLIA_EXPLORER}/address/${account}`}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white hover:bg-white/10 transition"
      >
        <Wallet className="w-4 h-4 text-indigo-300" />
        <span className="font-mono">{shortAddress(account)}</span>
        <ExternalLink className="w-3 h-3 text-white/40" />
      </a>
    </div>
  );
}