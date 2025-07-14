import { useEffect, useState } from 'react';
import type { LanguageObj } from "../messages";

function useMessages(locale: string): LanguageObj | null {
  const [messages, setMessages] = useState<LanguageObj | null>(null);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        let loadedMessages: LanguageObj;
        if (locale === 'de') {
          loadedMessages = (await import('../messages')).de;
        } else {
          loadedMessages = (await import('../messages')).en;
        }
        setMessages(loadedMessages);
      } catch (error) {
        console.error("Failed to load messages:", error);
        setMessages({});
      }
    };
    loadMessages();
  }, [locale]);

  return messages;
}

export default useMessages;