"use client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { X, Plus, Minus, ShoppingBag } from "lucide-react"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  customizations?: any
}

interface CartSidebarProps {
  isOpen: boolean
  onClose: () => void
  items: CartItem[]
  onUpdateQuantity: (id: string, quantity: number) => void
  onRemoveItem: (id: string) => void
}

export function CartSidebar({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem }: CartSidebarProps) {
  const total = items.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0)
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 h-full w-96 bg-background border-l border-border z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-heading font-semibold">Your Order</h2>
              <Badge variant="secondary">{itemCount}</Badge>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Your cart is empty</p>
                <p className="text-sm text-muted-foreground mt-2">Add some delicious items to get started!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <Card key={item.id} className="bg-card/50">
                    <CardContent className="p-4">
                      <div className="flex space-x-4">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm">{item.name}</h3>
                          {item.customizations && (
                            <div className="mt-1 space-y-1">
                              {item.customizations.size && (
                                <p className="text-xs text-muted-foreground">Size: {item.customizations.size}</p>
                              )}
                              {item.customizations.milk && (
                                <p className="text-xs text-muted-foreground">Milk: {item.customizations.milk}</p>
                              )}
                              {item.customizations.addOns && item.customizations.addOns.length > 0 && (
                                <p className="text-xs text-muted-foreground">
                                  Add-ons: {item.customizations.addOns.join(", ")}
                                </p>
                              )}
                            </div>
                          )}
                          <p className="text-sm text-muted-foreground mt-1">${(item.price || 0).toFixed(2)} each</p>

                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 bg-transparent"
                                onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 bg-transparent"
                                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-sm">${((item.price || 0) * item.quantity).toFixed(2)}</p>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-xs text-muted-foreground hover:text-destructive"
                                onClick={() => onRemoveItem(item.id)}
                              >
                                Remove
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-border p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-heading font-semibold">Total</span>
                <span className="text-2xl font-heading font-bold text-primary">${total.toFixed(2)}</span>
              </div>
              <Button className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white py-3 text-lg font-semibold transition-all duration-300 hover:scale-105">
                Checkout
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
