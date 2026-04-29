import { useEffect, useState, useCallback } from "react";

const DISMISS_KEY = "install-banner-dismissed";
const DISMISS_DAYS = 7;

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

function isStandalone() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (navigator as any).standalone === true
  );
}

function isDismissed() {
  const ts = localStorage.getItem(DISMISS_KEY);
  if (!ts) return false;
  return Date.now() - Number(ts) < DISMISS_DAYS * 86400000;
}

function isIOS() {
  return /iPhone|iPad|iPod/.test(navigator.userAgent);
}

export default function InstallBanner() {
  const [visible, setVisible] = useState(false);
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  useEffect(() => {
    if (isStandalone() || isDismissed()) return;

    if (isIOS()) {
      setShowIOSGuide(true);
      setVisible(true);
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setVisible(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const dismiss = useCallback(() => {
    localStorage.setItem(DISMISS_KEY, String(Date.now()));
    setVisible(false);
  }, []);

  const install = useCallback(async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") setVisible(false);
    setDeferredPrompt(null);
  }, [deferredPrompt]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 16,
        left: 16,
        right: 16,
        zIndex: 9999,
        background: "linear-gradient(135deg, #064e3b 0%, #000000 100%)",
        border: "1px solid #10b981",
        borderRadius: 12,
        padding: "14px 16px",
        display: "flex",
        alignItems: "center",
        gap: 12,
        boxShadow: "0 4px 24px rgba(16,185,129,0.25)",
        fontFamily: "system-ui, sans-serif",
        color: "#ffffff",
      }}
    >
      {/* App icon */}
      <div
        style={{
          width: 40,
          height: 40,
          minWidth: 40,
          borderRadius: 10,
          background: "#000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid #10b981",
        }}
      >
        <svg width="28" height="28" viewBox="0 0 192 192">
          <circle cx="96" cy="96" r="70" fill="#10b981" />
          <text
            x="96"
            y="110"
            fontSize="60"
            fontWeight="bold"
            fill="white"
            textAnchor="middle"
            fontFamily="Arial"
          >
            DM
          </text>
        </svg>
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 600, fontSize: 14 }}>
          DM Compassをホーム画面に追加
        </div>
        {showIOSGuide ? (
          <div style={{ fontSize: 12, opacity: 0.8, marginTop: 2 }}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ verticalAlign: "middle", marginRight: 4 }}
            >
              <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" />
              <polyline points="16 6 12 2 8 6" />
              <line x1="12" y1="2" x2="12" y2="15" />
            </svg>
            共有ボタン →「ホーム画面に追加」
          </div>
        ) : (
          <div style={{ fontSize: 12, opacity: 0.8, marginTop: 2 }}>
            アプリとして素早くアクセス
          </div>
        )}
      </div>

      {!showIOSGuide && (
        <button
          onClick={install}
          style={{
            background: "#10b981",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "8px 14px",
            fontWeight: 600,
            fontSize: 13,
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          追加
        </button>
      )}

      <button
        onClick={dismiss}
        aria-label="閉じる"
        style={{
          background: "none",
          border: "none",
          color: "#9ca3af",
          cursor: "pointer",
          padding: 4,
          fontSize: 18,
          lineHeight: 1,
        }}
      >
        ✕
      </button>
    </div>
  );
}
