import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Blocks,
  Wallet,
  ArrowLeft,
  Network,
  Send,
  CheckCircle2,
  ShoppingCart,
  Settings2,
  BookOpen,
} from "lucide-react";

const sections = [
  {
    icon: Blocks,
    title: "Blockchain คืออะไร",
    body: "บล็อกเชนคือสมุดบัญชีดิจิทัลที่กระจายไว้กับคอมพิวเตอร์หลายเครื่องทั่วโลก ทุกธุรกรรมถูกรวมเป็น 'บล็อก' และเชื่อมต่อกันเป็น 'ลูกโซ่' ไม่มีคนกลาง แต่ละบล็อกเข้ารหัสและเชื่อมกับบล็อกก่อนหน้า แก้ไขย้อนหลังไม่ได้ ทำให้ข้อมูลโปร่งใสและเชื่อถือได้",
  },
  {
    icon: Wallet,
    title: "MetaMask คืออะไร",
    body: "MetaMask คือกระเป๋าเงินดิจิทัลรูปแบบส่วนขยายเบราว์เซอร์ ทำหน้าที่เก็บกุญแจส่วนตัวและเชื่อมต่อแอปเว็บเข้ากับบล็อกเชน ผู้ใช้เป็นคนยืนยันทุกธุรกรรมเอง แอปไม่สามารถย้ายเงินโดยไม่ได้รับอนุญาต จึงปลอดภัยและเป็นส่วนตัว",
  },
  {
    icon: Network,
    title: "Sepolia Testnet",
    body: "โปรแกรมนี้ใช้เครือข่าย Sepolia ซึ่งเป็น 'เครือข่ายทดสอบ' ของ Ethereum เหรียญ ETH บนเครือข่ายนี้ไม่มีมูลค่าจริง ขอได้ฟรีจาก Faucet ทำให้ฝึกและนำเสนอได้โดยไม่เสียเงิน แต่กระบวนการทำธุรกรรมเหมือนเครือข่ายจริงทุกขั้นตอน",
  },
];

const features = [
  {
    icon: ShoppingCart,
    title: "ร้านค้าสินค้าดิจิทัล",
    desc: "แสดงสินค้า 6 รายการพร้อมราคาเป็น ETH ผู้ซื้อเลือกสินค้าแล้วกดซื้อ",
  },
  {
    icon: Wallet,
    title: "เชื่อมต่อ MetaMask จริง",
    desc: "เรียก eth_requestAccounts เพื่อขอสิทธิ์เข้าถึงกระเป๋า ผู้ใช้เป็นคนอนุมัติเอง นำกระเป๋าของใครก็ได้มาเชื่อมได้",
  },
  {
    icon: Settings2,
    title: "ตั้งค่าผู้รับเงิน",
    desc: "เจ้าของร้านใส่ที่อยู่กระเป๋าของตัวเอง เงินจะถูกส่งไปยังที่อยู่นี้จริง บันทึกไว้ในเครื่อง",
  },
  {
    icon: Network,
    title: "ตรวจสอบเครือข่าย",
    desc: "ตรวจ chainId และเตือนให้สลับไป Sepolia อัตโนมัติ ป้องกันจ่ายผิดเครือข่าย",
  },
  {
    icon: Send,
    title: "ส่งธุรกรรมจริง",
    desc: "เรียก eth_sendTransaction ส่ง ETH จากผู้ซื้อไปผู้รับ MetaMask เด้งให้ยืนยัน บันทึกลงบล็อกเชนจริง",
  },
  {
    icon: CheckCircle2,
    title: "ติดตามและตรวจสอบ",
    desc: "แสดงหมายเลขธุรกรรม (tx hash) พร้อมลิงก์ไป Etherscan ให้ตรวจสอบได้ทันที",
  },
];

const steps = [
  { n: 1, t: "ติดตั้ง MetaMask", d: "ติดตั้งส่วนขยายที่ metamask.io สร้างกระเป๋าและเพิ่มเครือข่าย Sepolia" },
  { n: 2, t: "ขอ ETH ทดสอบ", d: "ไป faucet ขอ Sepolia ETH ฟรี เพื่อใช้จ่ายในการทดลอง" },
  { n: 3, t: "ตั้งค่าผู้รับ", d: "กด 'ตั้งค่าผู้รับ' ใส่ที่อยู่กระเป๋าที่จะรับเงิน" },
  { n: 4, t: "เชื่อมต่อกระเป๋า", d: "กด 'เชื่อมต่อ MetaMask' แล้วอนุมัติในหน้าต่าง MetaMask" },
  { n: 5, t: "เลือกสินค้าและจ่าย", d: "กด 'ซื้อเลย' ยืนยันจำนวนเงินและผู้รับใน MetaMask" },
  { n: 6, t: "ตรวจสอบธุรกรรม", d: "คัดลอก tx hash ไปดูได้ที่ sepolia.etherscan.io" },
];

export default function Presentation() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 right-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -left-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
      </div>

      <div className="relative">
        <header className="sticky top-0 z-40 backdrop-blur-xl bg-slate-950/70 border-b border-white/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white">
              <ArrowLeft className="w-4 h-4" />
              กลับหน้าร้านค้า
            </Link>
            <div className="flex items-center gap-2 text-sm font-medium">
              <BookOpen className="w-4 h-4 text-indigo-300" />
              หน้านำเสนอ
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-16">
          {/* ภาพรวม */}
          <section>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <span className="text-xs uppercase tracking-widest text-indigo-300">ภาพรวมโปรแกรม</span>
              <h1 className="mt-2 text-3xl sm:text-4xl font-bold">
                CryptoStore — ร้านค้าจ่าย Ethereum ผ่าน MetaMask
              </h1>
              <p className="mt-4 text-white/60 leading-relaxed">
                โปรแกรมนี้เป็นเว็บแอปพลิเคชันที่จำลองร้านขายสินค้าดิจิทัล
                โดยผู้ซื้อสามารถเชื่อมต่อกระเป๋า MetaMask ของตัวเองแล้วจ่ายเงิน
                ในรูปแบบสกุล Ethereum (ETH) เพื่อซื้อสินค้า
                การทำธุรกรรมเป็นแบบจริงทั้งหมด — ไม่ใช่การจำลอง
                เงินจะถูกส่งจากกระเป๋าผู้ซื้อไปยังที่อยู่ผู้รับที่ตั้งไว้
                และบันทึกลงบนบล็อกเชน ตรวจสอบได้ผ่าน Etherscan
              </p>
            </motion.div>
          </section>

          {/* แนวคิดพื้นฐาน */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">แนวคิดพื้นฐาน</h2>
            <div className="grid gap-4">
              {sections.map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.title} className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{s.title}</h3>
                        <p className="mt-1.5 text-white/60 leading-relaxed text-sm">{s.body}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ฟีเจอร์ */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">ฟีเจอร์ของโปรแกรม</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((f) => {
                const Icon = f.icon;
                return (
                  <div key={f.title} className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
                    <Icon className="w-6 h-6 text-indigo-300 mb-3" />
                    <h3 className="font-semibold">{f.title}</h3>
                    <p className="mt-1 text-sm text-white/55 leading-relaxed">{f.desc}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ขั้นตอนการใช้งาน */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">ขั้นตอนการใช้งาน (นำเสนอ)</h2>
            <ol className="space-y-3">
              {steps.map((s) => (
                <li key={s.n} className="flex gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/10">
                  <span className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-400/40 text-indigo-300 flex items-center justify-center font-semibold text-sm flex-shrink-0">
                    {s.n}
                  </span>
                  <div>
                    <div className="font-medium">{s.t}</div>
                    <div className="text-sm text-white/55 mt-0.5">{s.d}</div>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* ขั้นตอนทำธุรกรรมเชิงเทคนิค */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">สิ่งที่เกิดขึ้นเมื่อกดจ่าย</h2>
            <div className="rounded-2xl bg-slate-900/60 border border-white/10 p-6 font-mono text-sm space-y-3 text-white/70">
              <div><span className="text-emerald-400">1.</span> แอปเรียก <span className="text-indigo-300">eth_requestAccounts</span> → ขอสิทธิ์กระเป๋า</div>
              <div><span className="text-emerald-400">2.</span> ตรวจ <span className="text-indigo-300">eth_chainId</span> → ต้องเป็น Sepolia (0xaa36a7)</div>
              <div><span className="text-emerald-400">3.</span> แปลง ETH → Wei ด้วย BigInt (1 ETH = 10¹⁸ Wei)</div>
              <div><span className="text-emerald-400">4.</span> เรียก <span className="text-indigo-300">eth_sendTransaction</span> {`{ from, to, value }`}</div>
              <div><span className="text-emerald-400">5.</span> MetaMask ขึ้นหน้าต่างให้ผู้ใช้ยืนยัน (ลายเซ็นดิจิทัล)</div>
              <div><span className="text-emerald-400">6.</span> ธุรกรรมเข้าสู่เครือข่าย → ถูกขุดเป็นบล็อก → สำเร็จ</div>
              <div><span className="text-emerald-400">7.</span> ได้รับ <span className="text-indigo-300">tx hash</span> → ดูได้ที่ Etherscan</div>
            </div>
          </section>

          {/* ข้อควรระวัง */}
          <section className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/20">
            <h2 className="text-xl font-semibold mb-3 text-amber-200">ข้อควรระวัง</h2>
            <ul className="space-y-2 text-sm text-white/60 list-disc list-inside">
              <li>ใช้เฉพาะเครือข่ายทดสอบ Sepolia อย่าสลับไปเครือข่ายจริง (Mainnet)</li>
              <li>อย่าใส่กุญแจส่วนตัว (Private Key) ในเว็บ ใช้เฉพาะการเชื่อมต่อผ่าน MetaMask</li>
              <li>ตรวจที่อยู่ผู้รับและจำนวนเงินทุกครั้งก่อนกดยืนยันใน MetaMask</li>
              <li>ธุรกรรมบนบล็อกเชนไม่สามารถยกเลิกได้หลังยืนยันแล้ว</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}