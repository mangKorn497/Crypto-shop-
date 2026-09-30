import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Settings, Save, Info } from "lucide-react";
import { useWallet } from "@/lib/wallet";
import { products } from "@/data/products";
import StoreHeader from "@/components/StoreHeader";
import ProductCard from "@/components/ProductCard";
import PaymentModal from "@/components/PaymentModal";

const RECIPIENT_KEY = "cryptostore_recipient";

export default function Store() {
  const wallet = useWallet();
  const [selected, setSelected] = useState(null);
  const [recipient, setRecipient] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [draft, setDraft] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(RECIPIENT_KEY);
    if (saved) setRecipient(saved);
  }, []);

  // ถ้ายังไม่ได้ตั้งผู้รับ ใช้กระเป๋าที่เชื่อมต่ออยู่ (ทดสอบจ่ายให้ตัวเอง)
  useEffect(() => {
    if (!localStorage.getItem(RECIPIENT_KEY) && wallet.account) {
      setRecipient(wallet.account);
    }
  }, [wallet.account]);

  const saveRecipient = () => {
    setRecipient(draft);
    localStorage.setItem(RECIPIENT_KEY, draft);
    setShowSettings(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* glow background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
      </div>

      <div className="relative">
        <StoreHeader wallet={wallet} />

        {/* Hero */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/60 mb-6">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              ชำระเงินจริงผ่าน MetaMask · บนเครือข่าย Sepolia Testnet
            </span>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
              ร้านค้าที่รับเงิน Ethereum
            </h1>
            <p className="mt-5 max-w-xl mx-auto text-white/50 leading-relaxed">
              เชื่อมต่อกระเป๋า MetaMask แล้วจ่าย ETH เพื่อซื้อสินค้าดิจิทัล
              ธุรกรรมขึ้นบล็อกเชนจริง ตรวจสอบได้ทุกขั้นตอน
            </p>
          </motion.div>
        </section>

        {/* ผู้รับเงิน */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/10">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-indigo-300 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <div className="text-white/80">
                  ที่อยู่ผู้รับเงิน:{" "}
                  <span className="font-mono text-white/60">
                    {recipient || "ยังไม่ได้ตั้ง — กดตั้งค่าเพื่อใส่กระเป๋าของคุณ"}
                  </span>
                </div>
                <div className="text-xs text-white/40 mt-0.5">
                  นำกระเป๋าของใครก็ได้มาใส่ เงินจะถูกส่งไปยังที่อยู่นี้จริง
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                setDraft(recipient);
                setShowSettings((s) => !s);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm hover:bg-white/10 transition flex-shrink-0"
            >
              <Settings className="w-4 h-4" />
              ตั้งค่าผู้รับ
            </button>
          </div>

          {showSettings && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-3 p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-3"
            >
              <label className="text-xs text-white/50">
                ที่อยู่กระเป๋า Ethereum (0x…)
              </label>
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="0x1234…abcd"
                className="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-indigo-400"
              />
              <button
                onClick={saveRecipient}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-medium"
              >
                <Save className="w-4 h-4" />
                บันทึก
              </button>
            </motion.div>
          )}
        </section>

        {/* สินค้า */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onBuy={setSelected}
              />
            ))}
          </div>
        </section>

        <footer className="border-t border-white/10 py-8 text-center text-xs text-white/30">
          CryptoStore · โปรเจกต์เรียนรู้ Blockchain · ใช้เครือข่ายทดสอบ Sepolia
        </footer>
      </div>

      <PaymentModal
        product={selected}
        wallet={wallet}
        recipient={recipient}
        onClose={() => setSelected(null)}
      />
    </div>
  );
}