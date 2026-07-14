"use client";

import { useState } from "react";
import { Link2, Send, MessageCircle, Check } from "lucide-react";
import { FaFacebook, FaLinkedin, FaXTwitter } from "react-icons/fa6";

type ShareButtonsProps = {
  url: string;
  title: string;
};

export default function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareItems = [
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: FaFacebook,
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: FaLinkedin,
    },
    {
      label: "Telegram",
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      icon: Send,
    },
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      icon: MessageCircle,
    },
    {
      label: "X",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      icon: FaXTwitter,
    },
  ];

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <aside className="sticky top-28 hidden xl:block">
      <div className="flex flex-col gap-3">
        {/* Copy Link Button */}
        <button
          onClick={copyLink}
          className="flex h-11 w-11 items-center justify-center rounded-md border border-border bg-card text-foreground transition hover:border-accent hover:text-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          title="Linki kopyala"
        >
          {copied ? <Check className="h-5 w-5 text-accent" /> : <Link2 className="h-5 w-5" />}
        </button>

        {/* Social Share Buttons */}
        {shareItems.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              title={item.label}
              className="flex h-11 w-11 items-center justify-center rounded-md border border-border bg-card text-foreground transition hover:border-accent hover:text-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              <Icon className="h-5 w-5" />
            </a>
          );
        })}
      </div>
    </aside>
  );
}