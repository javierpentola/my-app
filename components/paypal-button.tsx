"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"

export function PayPalButton() {
  return (
    <Button
      variant="outline"
      className="h-8 gap-2 px-3"
      onClick={() => window.open('https://paypal.com', '_blank')}
    >
      <Image
        src="/paypal-logo.svg"
        alt="PayPal"
        width={16}
        height={16}
        className="h-4 w-auto"
      />
      <span className="text-sm">Support Us</span>
    </Button>
  )
}

