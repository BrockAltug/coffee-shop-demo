"use client"

import { useState } from "react"
import { X, CheckCircle, AlertCircle, Info } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Toast {
  id: string
  type: "success" | "error" | "info"
  title: string
  description?: string
}

interface ToastProps {
  toasts: Toast[]
  removeToast: (id: string) => void
}

export function ToastContainer({ toasts, removeToast }: ToastProps) {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="bg-card border border-border rounded-lg shadow-lg p-4 min-w-80 animate-fade-in-up"
        >
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              {toast.type === "success" && <CheckCircle className="h-5 w-5 text-green-500" />}
              {toast.type === "error" && <AlertCircle className="h-5 w-5 text-red-500" />}
              {toast.type === "info" && <Info className="h-5 w-5 text-blue-500" />}
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-sm">{toast.title}</h4>
              {toast.description && <p className="text-sm text-muted-foreground mt-1">{toast.description}</p>}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 hover:bg-muted"
              onClick={() => removeToast(toast.id)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = (toast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substr(2, 9)
    setToasts((prev) => [...prev, { ...toast, id }])

    // Auto remove after 5 seconds
    setTimeout(() => {
      removeToast(id)
    }, 5000)
  }

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  return { toasts, addToast, removeToast }
}
