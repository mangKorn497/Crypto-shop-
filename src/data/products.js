import {
  Image as ImageIcon,
  Code,
  BookOpen,
  Crown,
  Ticket,
  FileCode,
} from "lucide-react";

// สินค้าดิจิทัล ราคาเป็น ETH (เครือข่ายทดสอบ Sepolia)
export const products = [
  {
    id: 1,
    name: "NFT Digital Art Collection",
    desc: "ชุดงานศิลป์ดิจิทัล 12 ชิ้น พร้อมสิทธิ์ใช้งาน",
    priceEth: 0.005,
    icon: ImageIcon,
    gradient: "from-fuchsia-500 via-purple-500 to-indigo-500",
  },
  {
    id: 2,
    name: "Blockchain Developer Course",
    desc: "คอร์สออนไลน์ 30 ชั่วโมง สอนเขียน Smart Contract ด้วย Solidity",
    priceEth: 0.01,
    icon: Code,
    gradient: "from-cyan-500 via-sky-500 to-blue-600",
  },
  {
    id: 3,
    name: "Crypto Trading Ebook",
    desc: "หนังสืออิเล็กทรอนิกส์ 120 หน้า เทคนิควิเคราะห์ตลาดคริปโต",
    priceEth: 0.003,
    icon: BookOpen,
    gradient: "from-amber-500 via-orange-500 to-rose-500",
  },
  {
    id: 4,
    name: "Premium DAO Membership",
    desc: "สมาชิกระดับพรีเมียม มีสิทธิ์โหวตและเข้าร่วมชุมชน DAO",
    priceEth: 0.02,
    icon: Crown,
    gradient: "from-emerald-500 via-teal-500 to-cyan-600",
  },
  {
    id: 5,
    name: "Web3 Workshop Ticket",
    desc: "ตั๋วเข้าร่วมเวิร์กช็อปออนไลน์สด พร้อมใบรับรอง",
    priceEth: 0.008,
    icon: Ticket,
    gradient: "from-violet-500 via-indigo-500 to-blue-600",
  },
  {
    id: 6,
    name: "Smart Contract Template Pack",
    desc: "เทมเพลตสัญญาอัจฉริยะ 20 แบบ พร้อมตัวอย่างและคู่มือ",
    priceEth: 0.015,
    icon: FileCode,
    gradient: "from-pink-500 via-rose-500 to-red-500",
  },
];