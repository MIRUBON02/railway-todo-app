export const formatLimit= (limit) => {
    if (!limit) return "期限なし";
    const date = new Date(limit);
    return date.toLocaleString('ja-JP', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    });
};

// 残り時間の計算 (例: "2時間30分 残り")
export const calcRemaining = (limit) => {
    if (!limit) return "";
    const now = new Date();
    const target = new Date(limit);
    const diffMs = target - now;

    if (diffMs < 0) return "期限切れ";

    const diffMin = Math.floor(diffMs / 60000);
    const days = Math.floor(diffMin / 1440);
    const hours = Math.floor((diffMin % 1440) / 60);
    const minutes = diffMin % 60;

    if (days > 0) return `${days}日${hours}時間${minutes}分 残り`;
    if (hours > 0) return `${hours}時間${minutes}分 残り`;
    return `${minutes}分 残り`;
};

// UTCフォーマットに変換（入力値をAPI送信用に整形）
export const toUTCString = (datetimeLocal) => {
  if (!datetimeLocal) return null;
  return new Date(datetimeLocal).toISOString().slice(0, 19) + "Z";
};