"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Minus, Plus, Star } from "lucide-react"

interface MenuItem {
  id: string
  name: string
  description: string
  basePrice: number
  image: string
  category: string
  type: string
  rating: number
  isPopular?: boolean
  customizations?: {
    sizes?: Array<{ name: string; price: number; volume?: string }>
    milkOptions?: Array<{ name: string; price: number }>
    addOns?: Array<{ name: string; price: number }>
  }
}

interface MenuItemModalProps {
  item: MenuItem | null
  isOpen: boolean
  onClose: () => void
  onAddToCart: (item: MenuItem, customizations: any) => void
}

export function MenuItemModal({ item, isOpen, onClose, onAddToCart }: MenuItemModalProps) {
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedMilk, setSelectedMilk] = useState("")
  const [addOns, setAddOns] = useState<string[]>([])
  const [quantity, setQuantity] = useState(1)

  if (!item) return null

  const isDrink = item.type === "drink"
  const hasCustomizations = isDrink && item.customizations

  // Set default values when modal opens
  if (hasCustomizations && !selectedSize && item.customizations?.sizes) {
    setSelectedSize(item.customizations.sizes[0]?.name || "")
  }
  if (hasCustomizations && !selectedMilk && item.customizations?.milkOptions) {
    setSelectedMilk(item.customizations.milkOptions[0]?.name || "")
  }

  const calculatePrice = () => {
    let totalPrice = item.basePrice

    if (hasCustomizations) {
      // Size price
      if (selectedSize && item.customizations?.sizes) {
        const sizeOption = item.customizations.sizes.find((s) => s.name === selectedSize)
        totalPrice += sizeOption?.price || 0
      }

      // Milk price
      if (selectedMilk && item.customizations?.milkOptions) {
        const milkOption = item.customizations.milkOptions.find((m) => m.name === selectedMilk)
        totalPrice += milkOption?.price || 0
      }

      // Add-ons price
      if (item.customizations?.addOns) {
        addOns.forEach((addOnName) => {
          const addOn = item.customizations.addOns.find((a) => a.name === addOnName)
          totalPrice += addOn?.price || 0
        })
      }
    }

    return totalPrice * quantity
  }

  const handleAddOnChange = (addOnName: string, checked: boolean) => {
    if (checked) {
      setAddOns([...addOns, addOnName])
    } else {
      setAddOns(addOns.filter((name) => name !== addOnName))
    }
  }

  const handleAddToCart = () => {
    const customizations = hasCustomizations
      ? {
          size: selectedSize,
          milk: selectedMilk,
          addOns: addOns,
        }
      : null

    onAddToCart(item, customizations)
    onClose()
    // Reset form
    setSelectedSize("")
    setSelectedMilk("")
    setAddOns([])
    setQuantity(1)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading font-bold text-primary">
            {isDrink ? `Customize Your ${item.name}` : item.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Item Image and Info */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/2">
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
            <div className="md:w-1/2 space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-heading font-semibold">{item.name}</h3>
                  {item.isPopular && <Badge className="bg-accent text-accent-foreground">Popular</Badge>}
                </div>
                <p className="text-muted-foreground">{item.description}</p>
                <div className="flex items-center gap-1 mt-2">
                  <Star className="h-4 w-4 fill-accent text-accent" />
                  <span className="text-sm font-medium">{item.rating}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Customizations - Only for drinks */}
          {hasCustomizations && (
            <>
              {/* Size Selection */}
              {item.customizations?.sizes && (
                <div className="space-y-3">
                  <h4 className="font-heading font-semibold text-lg">Size</h4>
                  <RadioGroup value={selectedSize} onValueChange={setSelectedSize}>
                    <div className="grid grid-cols-1 gap-3">
                      {item.customizations.sizes.map((size) => (
                        <div key={size.name} className="flex items-center space-x-2">
                          <RadioGroupItem value={size.name} id={size.name} />
                          <Label htmlFor={size.name} className="flex-1 cursor-pointer">
                            <div className="flex justify-between">
                              <span>
                                {size.name} {size.volume && `(${size.volume})`}
                              </span>
                              <span className="text-muted-foreground">
                                {size.price > 0 ? `+$${size.price.toFixed(2)}` : ""}
                              </span>
                            </div>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
              )}

              {/* Milk Selection */}
              {item.customizations?.milkOptions && (
                <div className="space-y-3">
                  <h4 className="font-heading font-semibold text-lg">Milk</h4>
                  <Select value={selectedMilk} onValueChange={setSelectedMilk}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {item.customizations.milkOptions.map((milk) => (
                        <SelectItem key={milk.name} value={milk.name}>
                          <div className="flex justify-between w-full">
                            <span>{milk.name}</span>
                            <span className="text-muted-foreground ml-4">
                              {milk.price > 0 ? `+$${milk.price.toFixed(2)}` : ""}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Add-ons */}
              {item.customizations?.addOns && (
                <div className="space-y-3">
                  <h4 className="font-heading font-semibold text-lg">Add-ons</h4>
                  <div className="grid grid-cols-1 gap-3">
                    {item.customizations.addOns.map((addOn) => (
                      <div key={addOn.name} className="flex items-center space-x-2">
                        <Checkbox
                          id={addOn.name}
                          checked={addOns.includes(addOn.name)}
                          onCheckedChange={(checked) => handleAddOnChange(addOn.name, checked as boolean)}
                        />
                        <Label htmlFor={addOn.name} className="flex-1 cursor-pointer">
                          <div className="flex justify-between">
                            <span>{addOn.name}</span>
                            <span className="text-muted-foreground">
                              {addOn.price > 0 ? `+$${addOn.price.toFixed(2)}` : ""}
                            </span>
                          </div>
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Quantity and Price */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center space-x-4">
              <span className="font-heading font-semibold">Quantity:</span>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center font-semibold">{quantity}</span>
                <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-heading font-bold text-primary">${calculatePrice().toFixed(2)}</div>
            </div>
          </div>

          {/* Add to Cart Button */}
          <Button
            onClick={handleAddToCart}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 text-lg font-semibold transition-all duration-300 hover:scale-105"
          >
            Add to Cart - ${calculatePrice().toFixed(2)}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
