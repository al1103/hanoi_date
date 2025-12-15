// ============================================
// TELEGRAM BOT CONFIGURATION
// ============================================
// Tạo file .env.local ở thư mục gốc và thêm:
// VITE_TELEGRAM_BOT_TOKEN=your_bot_token_here
// VITE_TELEGRAM_CHAT_ID=your_chat_id_here
//
// Cách lấy thông tin:
// 1. Tạo bot qua @BotFather trên Telegram để lấy Bot Token
// 2. Chat với bot rồi truy cập: https://api.telegram.org/bot<TOKEN>/getUpdates để lấy Chat ID

export const TELEGRAM_CONFIG = {
  BOT_TOKEN: import.meta.env.VITE_TELEGRAM_BOT_TOKEN || "",
  CHAT_ID: import.meta.env.VITE_TELEGRAM_CHAT_ID || "",
};

// Hàm gửi tin nhắn qua Telegram
export const sendTelegramMessage = async (
  message: string
): Promise<boolean> => {
  const { BOT_TOKEN, CHAT_ID } = TELEGRAM_CONFIG;

  // Check if credentials are configured
  if (!BOT_TOKEN || !CHAT_ID) {
    console.warn(
      "⚠️ Telegram chưa được cấu hình! Hãy tạo file .env.local với VITE_TELEGRAM_BOT_TOKEN và VITE_TELEGRAM_CHAT_ID"
    );
    return false;
  }

  try {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: "HTML",
      }),
    });

    if (!response.ok) {
      console.error("Telegram API error:", await response.text());
      return false;
    }

    console.log("✅ Đã gửi thông báo Telegram thành công!");
    return true;
  } catch (error) {
    console.error("❌ Lỗi gửi Telegram:", error);
    return false;
  }
};
