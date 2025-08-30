"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, Gift } from "lucide-react"

interface NewsletterModalProps {
  isOpen: boolean
  onClose: () => void
  onSubscribe: (email: string) => void
}

export function NewsletterModal({ isOpen, onClose, onSubscribe }: NewsletterModalProps) {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      onSubscribe(email)
      setEmail("")
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-heading font-bold text-primary">
            Stay in the Loop!
          </DialogTitle>
        </DialogHeader>

        <div className="text-center py-6">
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
            <Mail className="h-10 w-10 text-primary" />
          </div>
          <p className="text-muted-foreground mb-6">
            Get exclusive offers, new blend announcements, and brewing tips delivered to your inbox.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="newsletter-email" className="sr-only">
                Email Address
              </Label>
              <Input
                id="newsletter-email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            <div className="flex space-x-2">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
                Maybe Later
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white"
              >
                <Gift className="h-4 w-4 mr-2" />
                Subscribe
              </Button>
            </div>
          </form>

          <p className="text-xs text-muted-foreground mt-4">We respect your privacy. Unsubscribe at any time.</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
