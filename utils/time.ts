export function toHms(secs?: number, simple: boolean = false) {
  if (!secs) return `0${simple ? "0:00" : "s"}`;
  const seconds = Math.floor(secs % 60);
  const minutes = Math.floor((secs / 60) % 60);
  const hours = Math.floor(secs / 3600);
  let ret = "";
  if (hours) ret += `${hours.toString()}${simple ? ":" : "h "}`;
  if (minutes || hours)
    ret += `${minutes.toString().padStart(2, "0")}${simple ? ":" : "m "}`;
  ret += `${seconds.toString().padStart(2, "0")}${simple ? "" : "s"}`;

  if (!simple && ret[0] === "0") ret = ret.slice(1);

  return ret.trim();
}
