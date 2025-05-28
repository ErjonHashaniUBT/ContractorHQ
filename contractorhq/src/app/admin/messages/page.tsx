// app/admin/messages/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

interface Message {
  name: string;
  email: string;
  message: string;
  timestamp: string;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch("/api/contact/messages");
        const data = await res.json();
        setMessages(data.reverse());
      } catch (err) {
        console.error("Error fetching messages", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-dark">Contact Messages</h1>
        <Button variant="ghost" onClick={() => window.location.reload()}>
          Refresh
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : messages.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No messages found.</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {messages.map((msg, i) => (
            <li
              key={i}
              className="p-6 border border-gray-200 rounded-lg hover:shadow-sm transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-semibold text-dark">
                    {msg.name}
                  </h2>
                  <p className="text-sm text-primary-dark mb-2">{msg.email}</p>
                  <p className="text-gray-800 whitespace-pre-line">
                    {msg.message}
                  </p>
                </div>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {new Date(msg.timestamp).toLocaleString()}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
