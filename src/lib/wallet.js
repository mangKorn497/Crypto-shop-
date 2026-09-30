import { useState, useEffect, useCallback } from "react";

// Sepolia Testnet (chainId 11155111 = 0xaa36a7) — เครือข่ายทดสอบฟรี ไม่ใช้เงินจริง
export const SEPOLIA_CHAIN_ID = "0xaa36a7";
export const SEPOLIA_EXPLORER = "https://sepolia.etherscan.io";

const SEPOLIA_PARAMS = {
  chainId: SEPOLIA_CHAIN_ID,
  chainName: "Sepolia Testnet",
  nativeCurrency: { name: "Sepolia Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: ["https://rpc.sepolia.org"],
  blockExplorerUrls: ["https://sepolia.etherscan.io"],
};

function getEthereum() {
  if (typeof window === "undefined") return null;
  // รองรับหลายกระเป๋า (EIP-6963) แต่ใช้ window.ethereum เป็นหลัก
  return window.ethereum || null;
}

// แปลง ETH -> Wei (hex string) โดยใช้ BigInt เพื่อความแม่นยำ
export function ethToWeiHex(valueEth) {
  const [whole, frac = ""] = String(valueEth).split(".");
  const fracPadded = (frac + "0".repeat(18)).slice(0, 18);
  const wei = BigInt(whole) * 10n ** 18n + BigInt(fracPadded || "0");
  return "0x" + wei.toString(16);
}

export function useWallet() {
  const [account, setAccount] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);

  const ethereum = getEthereum();

  useEffect(() => {
    if (!ethereum) return;
    // ตรวจบัญชีที่อนุญาตแล้ว (ไม่เด้ง popup)
    ethereum
      .request({ method: "eth_accounts" })
      .then((accs) => {
        if (accs.length > 0) setAccount(accs[0]);
      })
      .catch(() => {});
    ethereum
      .request({ method: "eth_chainId" })
      .then(setChainId)
      .catch(() => {});

    const onAccounts = (accs) => setAccount(accs?.[0] || null);
    const onChain = (id) => setChainId(id);
    ethereum.on?.("accountsChanged", onAccounts);
    ethereum.on?.("chainChanged", onChain);
    return () => {
      ethereum.removeListener?.("accountsChanged", onAccounts);
      ethereum.removeListener?.("chainChanged", onChain);
    };
  }, [ethereum]);

  const connect = useCallback(async () => {
    const eth = getEthereum();
    if (!eth) {
      setError("ไม่พบ MetaMask — กรุณาติดตั้งส่วนขยาย MetaMask ในเบราว์เซอร์ก่อน");
      return false;
    }
    setIsConnecting(true);
    setError(null);
    try {
      const accs = await eth.request({ method: "eth_requestAccounts" });
      setAccount(accs[0]);
      const id = await eth.request({ method: "eth_chainId" });
      setChainId(id);
      return true;
    } catch (e) {
      setError(e.message || "เชื่อมต่อกระเป๋าไม่สำเร็จ");
      return false;
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const switchToSepolia = useCallback(async () => {
    const eth = getEthereum();
    if (!eth) return;
    try {
      await eth.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: SEPOLIA_CHAIN_ID }],
      });
    } catch (e) {
      // 4902 = เครือข่ายยังไม่มีใน MetaMask -> เพิ่มใหม่
      if (e.code === 4902) {
        await eth.request({
          method: "wallet_addEthereumChain",
          params: [SEPOLIA_PARAMS],
        });
      } else {
        throw e;
      }
    }
  }, []);

  // ส่งเงินจริง: eth_sendTransaction ไปยังที่อยู่ผู้รับ มูลค่าใน Wei
  const sendPayment = useCallback(
    async (to, valueEth) => {
      const eth = getEthereum();
      if (!eth) throw new Error("ไม่พบ MetaMask");
      if (!account) throw new Error("กระเป๋ายังไม่ได้เชื่อมต่อ");
      if (!to) throw new Error("ยังไม่ได้ตั้งที่อยู่ผู้รับเงิน");
      const valueWei = ethToWeiHex(valueEth);
      const txHash = await eth.request({
        method: "eth_sendTransaction",
        params: [{ from: account, to, value: valueWei }],
      });
      return txHash;
    },
    [account]
  );

  return {
    account,
    chainId,
    isConnecting,
    error,
    connect,
    switchToSepolia,
    sendPayment,
    isSepolia: chainId === SEPOLIA_CHAIN_ID,
    hasMetaMask: !!ethereum,
  };
}

export function shortAddress(addr) {
  if (!addr) return "";
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}