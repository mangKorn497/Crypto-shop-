import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function ProductCard({ product, onBuy, disabled }) {
  const Icon = product.icon;
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm"
    >
      <div
        className={`relative h-40 bg-gradient-to-br ${product.gradient} flex items-center justify-center`}
      >
        <div className="absolute inset-0 bg-black/20" />
        <Icon className="relative w-16 h-16 text-white drop-shadow-lg" />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-white">{product.name}</h3>
        <p className="mt-1 text-sm text-white/60 leading-relaxed">{product.desc}</p>
        <div className="mt-5 flex items-center justify-between">
          <div>
            <span className="text-xs text-white/40">ราคา</span>
            <div className="text-xl font-bold text-white font-mono">
              {product.priceEth} ETH
            </div>
          </div>
          <button
            onClick={() => onBuy(product)}
            disabled={disabled}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-medium shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            ซื้อเลย
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}