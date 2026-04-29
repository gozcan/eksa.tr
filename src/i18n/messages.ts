import en from "../../messages/en.json";
import tr from "../../messages/tr.json";

import type { Locale } from "./config";

const messages = {
  en,
  tr,
} as const;

export type Messages = (typeof messages)[Locale];

export function getMessages(locale: Locale): Messages {
  return messages[locale];
}
