import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2, AlertTriangle, ExternalLink, Wallet } from "lucide-react";
import { SEPOLIA_EXPLORER } from "@/lib/wallet";

export default function PaymentModal({ product, wallet, recipient, onClose }) {
  const { account, isSepolia, connect, switchToSepolia, sendPayment, hasMetaMask } = wallet;
  const [status, setStatus] = useState("idle"); // idle | pending | success | error
  const [txHash, setTxHash] = useState(null);
  const [errMsg, setErrMsg] = useState(null);

  if (!product) return null;

  const handlePay = async () => {
    setStatus("pending");
    setErrMsg(null);
    try {
      const hash = await sendPayment(recipient, product.priceEth);
      setTxHash(hash);
      setStatus("success");
    } catch (e) {
      setErrMsg(e.message || "ทำธุรกรรมไม่สำเร็จ");
      setStatus("error");
    }
  };

  return (
    <Dialog open={!!product} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="bg-slate-900 border-white/10 text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle>ชำระเงินด้วย Ethereum</DialogTitle>
          <DialogDescription className="text-white/50">
            ทำธุรกรรมจริงบนเครือข่าย Sepolia Testnet
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* สรุปสินค้า */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="flex-1">
              <div className="font-medium">{product.name}</div>
              <div className="text-sm text-white/50">สินค้าดิจิทัล</div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold font-mono">{product.priceEth} ETH</div>
            </div>
          </div>

          {/* ที่อยู่ผู้รับ */}
          <div className="text-xs space-y-1">
            <div className="text-white/40">ผู้รับเงิน (ร้านค้า)</div>
            <div className="font-mono text-white/70 break-all">{recipient}</div>
          </div>

          {/* สถานะต่างๆ */}
          {status === "success" ? (
            <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-4 space-y-2">
              <div className="flex items-center gap-2 text-emerald-300 font-medium">
                <CheckCircle2 className="w-5 h-5" />
                ชำระเงินสำเร็จ!
              </div>
              <p className="text-sm text-white/60">
                ธุรกรรมของคุณถูกบันทึกบนบล็อกเชนแล้ว
              </p>
              {txHash && (
                <a
                  href={`${SEPOLIA_EXPLORER}/tx/${txHash}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-indigo-300 hover:text-indigo-200 font-mono break-all"
                >
                  <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
                  {txHash}
                </a>
              )}
              <Button onClick={onClose} className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-900">
                เสร็จสิ้น
              </Button>
            </div>
          ) : status === "error" ? (
            <div className="rounded-xl bg-rose-500/10 border border-rose-500/30 p-4 space-y-3">
              <div className="flex items-center gap-2 text-rose-300 font-medium">
                <AlertTriangle className="w-5 h-5" />
                ทำธุรกรรมไม่สำเร็จ
              </div>
              <p className="text-sm text-white/60 break-words">{errMsg}</p>
              <Button onClick={() => setStatus("idle")} variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                ลองอีกครั้ง
              </Button>
            </div>
          ) : !hasMetaMask ? (
            <div className="rounded-xl bg-amber-500/10 border border-amber-500/30 p-4 text-sm text-amber-200">
              ไม่พบ MetaMask กรุณาติดตั้งส่วนขยาย MetaMask ในเบราว์เซอร์ก่อน
            </div>
          ) : !account ? (
            <Button
              onClick={connect}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 text-white"
            >
              <Wallet className="w-4 h-4 mr-2" />
              เชื่อมต่อ MetaMask ก่อนชำระ
            </Button>
          ) : !isSepolia ? (
            <Button
              onClick={switchToSepolia}
              className="w-full bg-amber-500 hover:bg-amber-400 text-slate-900"
            >
              สลับไปเครือข่าย Sepolia
            </Button>
          ) : (
            <Button
              onClick={handlePay}
              disabled={status === "pending"}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 text-white"
            >
              {status === "pending" ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  รอยืนยันใน MetaMask…
                </>
              ) : (
                <>จ่าย {product.priceEth} ETH</>
              )}
            </Button>
          )}

          <p className="text-[11px] text-white/30 leading-relaxed">
            * กดปุ่มจ่ายแล้ว MetaMask จะเด้งขึ้นมาให้ยืนยัน คุณสามารถตรวจสอบ
            ผู้รับและจำนวนเงินได้ก่อนกดยืนยัน ไม่มีค่าธรรมเนียมแอบซ่อน
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}