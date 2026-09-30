import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Blocks } from "lucide-react";
import WalletButton from "./WalletButton";

export default function StoreHeader({ wallet }) {
  const location = useLocation();
  const nav = [
    { to: "/", label: "ร้านค้า" },
    { to: "/presentation", label: "นำเสนอ" },
  ];

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-slate-950/70 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <motion.div
            initial={{ rotate: -10, scale: 0.8 }}
            animate={{ rotate: 0, scale: 1 }}
            className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30"
          >
            <Blocks className="w-5 h-5 text-white" />
          </motion.div>
          <div className="leading-tight">
            <div className="font-semibold text-white">CryptoStore</div>
            <div className="text-[10px] text-white/40 tracking-wider uppercase">
              Pay with Ethereum
            </div>
          </div>
        </Link>

        <nav className="flex items-center gap-1">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={`px-3 py-1.5 rounded-lg text-sm transition ${
                location.pathname === n.to
                  ? "text-white bg-white/10"
                  : "text-white/50 hover:text-white"
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <WalletButton wallet={wallet} />
      </div>
    </header>
  );
}