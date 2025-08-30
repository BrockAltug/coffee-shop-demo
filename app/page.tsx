"use client"
import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Menu,
  X,
  ShoppingCart,
  Sun,
  Moon,
  Star,
  Coffee,
  ChevronLeft,
  ChevronRight,
  Gift,
  Quote,
  Send,
  MapPin,
  Phone,
  Mail,
  Clock,
  Instagram,
  Twitter,
  Facebook,
  Heart,
  Award,
  Users,
  Sparkles,
  ChevronDown,
} from "lucide-react"
import { MenuItemModal } from "@/components/menu-item-modal"
import { CartSidebar } from "@/components/cart-sidebar"
import { ProductGridSkeleton } from "@/components/loading-skeleton"
import { NewsletterModal } from "@/components/newsletter-modal"
import React from "react"
import { throttle } from "lodash"

const featuredItems = [
  {
    id: "signature-blend",
    name: "Signature House Blend",
    description:
      "Our masterfully crafted signature blend featuring premium Arabica beans from Ethiopia and Colombia, roasted to perfection with notes of chocolate and caramel.",
    basePrice: 4.95,
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop&crop=center",
    rating: 4.9,
    category: "hot",
    type: "drink",
    isPopular: true,
    allergens: ["dairy"],
    nutritionInfo: { calories: 180, caffeine: "150mg" },
    customizations: {
      sizes: [
        { name: "Small", price: 0, volume: "8oz" },
        { name: "Medium", price: 0.75, volume: "12oz" },
        { name: "Large", price: 1.25, volume: "16oz" },
        { name: "Extra Large", price: 1.75, volume: "20oz" },
      ],
      milkOptions: [
        { name: "Whole Milk", price: 0 },
        { name: "Oat Milk", price: 0.65 },
        { name: "Almond Milk", price: 0.55 },
        { name: "Coconut Milk", price: 0.55 },
        { name: "Soy Milk", price: 0.45 },
      ],
      addOns: [
        { name: "Extra Shot", price: 0.75 },
        { name: "Decaf", price: 0 },
        { name: "Vanilla Syrup", price: 0.65 },
        { name: "Caramel Syrup", price: 0.65 },
        { name: "Hazelnut Syrup", price: 0.65 },
        { name: "Extra Hot", price: 0 },
        { name: "Extra Foam", price: 0 },
      ],
    },
  },
  {
    id: "artisan-croissant",
    name: "Artisan Butter Croissant",
    description:
      "Handcrafted daily with premium French butter, our flaky croissants are the perfect complement to your morning coffee.",
    basePrice: 3.25,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop&crop=center",
    rating: 4.8,
    category: "pastries",
    type: "food",
    isPopular: true,
    allergens: ["gluten", "dairy", "eggs"],
    nutritionInfo: { calories: 280, fat: "18g" },
  },
  {
    id: "seasonal-pumpkin",
    name: "Seasonal Pumpkin Spice Latte",
    description:
      "Limited-time seasonal favorite with real pumpkin, warm spices, and our signature espresso blend topped with whipped cream.",
    basePrice: 5.45,
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=300&fit=crop&crop=center",
    rating: 4.7,
    category: "seasonal",
    type: "drink",
    isPopular: true,
    allergens: ["dairy"],
    nutritionInfo: { calories: 320, caffeine: "150mg" },
    customizations: {
      sizes: [
        { name: "Small", price: 0, volume: "8oz" },
        { name: "Medium", price: 0.75, volume: "12oz" },
        { name: "Large", price: 1.25, volume: "16oz" },
        { name: "Extra Large", price: 1.75, volume: "20oz" },
      ],
      milkOptions: [
        { name: "Whole Milk", price: 0 },
        { name: "Oat Milk", price: 0.65 },
        { name: "Almond Milk", price: 0.55 },
        { name: "Coconut Milk", price: 0.55 },
        { name: "Soy Milk", price: 0.45 },
      ],
      addOns: [
        { name: "Extra Shot", price: 0.75 },
        { name: "Pumpkin Spice Extra", price: 0.5 },
        { name: "Whipped Cream", price: 0.5 },
        { name: "Cinnamon", price: 0 },
      ],
    },
  },
]

const categories = [
  { id: "all", name: "All Items", icon: Coffee },
  { id: "hot", name: "Hot Coffee", icon: Coffee },
  { id: "cold", name: "Cold Brew", icon: Coffee },
  { id: "seasonal", name: "Seasonal", icon: Sparkles },
  { id: "pastries", name: "Pastries", icon: Award },
]

const menuItems = [
  ...featuredItems,
  // Hot Drinks
  {
    id: "cappuccino",
    name: "Classic Cappuccino",
    description: "Traditional Italian cappuccino with perfectly steamed milk and rich espresso.",
    basePrice: 4.15,
    image: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=400&h=300&fit=crop&crop=center",
    rating: 4.8,
    category: "hot",
    type: "drink",
    isPopular: true,
    allergens: ["dairy"],
    nutritionInfo: { calories: 120, caffeine: "150mg" },
    customizations: {
      sizes: [
        { name: "Small", price: 0, volume: "6oz" },
        { name: "Medium", price: 0.5, volume: "8oz" },
        { name: "Large", price: 1.0, volume: "12oz" },
      ],
      milkOptions: [
        { name: "Whole Milk", price: 0 },
        { name: "Oat Milk", price: 0.65 },
        { name: "Almond Milk", price: 0.55 },
        { name: "Coconut Milk", price: 0.55 },
        { name: "Soy Milk", price: 0.45 },
      ],
      addOns: [
        { name: "Extra Shot", price: 0.75 },
        { name: "Decaf", price: 0 },
        { name: "Cinnamon", price: 0 },
        { name: "Cocoa Powder", price: 0 },
      ],
    },
  },
  {
    id: "latte",
    name: "Vanilla Latte",
    description: "Smooth espresso with steamed milk and a touch of vanilla sweetness.",
    basePrice: 4.75,
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop&crop=center",
    rating: 4.6,
    category: "hot",
    type: "drink",
    allergens: ["dairy"],
    nutritionInfo: { calories: 190, caffeine: "150mg" },
    customizations: {
      sizes: [
        { name: "Small", price: 0, volume: "8oz" },
        { name: "Medium", price: 0.75, volume: "12oz" },
        { name: "Large", price: 1.25, volume: "16oz" },
      ],
      milkOptions: [
        { name: "Whole Milk", price: 0 },
        { name: "Oat Milk", price: 0.65 },
        { name: "Almond Milk", price: 0.55 },
        { name: "Coconut Milk", price: 0.55 },
        { name: "Soy Milk", price: 0.45 },
      ],
      addOns: [
        { name: "Extra Shot", price: 0.75 },
        { name: "Extra Vanilla", price: 0.5 },
        { name: "Caramel Drizzle", price: 0.5 },
        { name: "Whipped Cream", price: 0.5 },
      ],
    },
  },
  {
    id: "americano",
    name: "Americano",
    description: "Bold espresso shots with hot water for a clean, strong coffee experience.",
    basePrice: 3.45,
    image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=400&h=300&fit=crop&crop=center",
    rating: 4.4,
    category: "hot",
    type: "drink",
    allergens: [],
    nutritionInfo: { calories: 10, caffeine: "225mg" },
    customizations: {
      sizes: [
        { name: "Small", price: 0, volume: "8oz" },
        { name: "Medium", price: 0.5, volume: "12oz" },
        { name: "Large", price: 1.0, volume: "16oz" },
      ],
      milkOptions: [
        { name: "Black", price: 0 },
        { name: "Splash of Milk", price: 0.25 },
        { name: "Oat Milk", price: 0.65 },
        { name: "Almond Milk", price: 0.55 },
      ],
      addOns: [
        { name: "Extra Shot", price: 0.75 },
        { name: "Decaf", price: 0 },
        { name: "Sugar", price: 0 },
        { name: "Honey", price: 0.25 },
      ],
    },
  },
  // Cold Drinks
  {
    id: "cold-brew",
    name: "Premium Cold Brew",
    description: "Smooth, rich cold brew coffee steeped for 24 hours with a hint of vanilla.",
    basePrice: 4.25,
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400&h=300&fit=crop&crop=center",
    rating: 4.6,
    category: "cold",
    type: "drink",
    allergens: [],
    nutritionInfo: { calories: 5, caffeine: "200mg" },
    customizations: {
      sizes: [
        { name: "Small", price: 0, volume: "12oz" },
        { name: "Medium", price: 0.75, volume: "16oz" },
        { name: "Large", price: 1.25, volume: "20oz" },
      ],
      milkOptions: [
        { name: "Black", price: 0 },
        { name: "Oat Milk", price: 0.65 },
        { name: "Almond Milk", price: 0.55 },
        { name: "Coconut Milk", price: 0.55 },
        { name: "Heavy Cream", price: 0.75 },
      ],
      addOns: [
        { name: "Vanilla Syrup", price: 0.65 },
        { name: "Caramel Syrup", price: 0.65 },
        { name: "Simple Syrup", price: 0.5 },
        { name: "Extra Ice", price: 0 },
      ],
    },
  },
  {
    id: "iced-latte",
    name: "Iced Caramel Latte",
    description: "Refreshing iced latte with rich caramel flavor and smooth espresso.",
    basePrice: 5.25,
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop&crop=center",
    rating: 4.7,
    category: "cold",
    type: "drink",
    allergens: ["dairy"],
    nutritionInfo: { calories: 250, caffeine: "150mg" },
    customizations: {
      sizes: [
        { name: "Small", price: 0, volume: "12oz" },
        { name: "Medium", price: 0.75, volume: "16oz" },
        { name: "Large", price: 1.25, volume: "20oz" },
      ],
      milkOptions: [
        { name: "Whole Milk", price: 0 },
        { name: "Oat Milk", price: 0.65 },
        { name: "Almond Milk", price: 0.55 },
        { name: "Coconut Milk", price: 0.55 },
      ],
      addOns: [
        { name: "Extra Shot", price: 0.75 },
        { name: "Extra Caramel", price: 0.5 },
        { name: "Whipped Cream", price: 0.5 },
        { name: "Sea Salt", price: 0.25 },
      ],
    },
  },
  {
    id: "frappuccino",
    name: "Mocha Frappuccino",
    description: "Blended coffee drink with chocolate, milk, and ice, topped with whipped cream.",
    basePrice: 5.95,
    image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=300&fit=crop&crop=center",
    rating: 4.5,
    category: "cold",
    type: "drink",
    allergens: ["dairy"],
    nutritionInfo: { calories: 380, caffeine: "95mg" },
    customizations: {
      sizes: [
        { name: "Small", price: 0, volume: "12oz" },
        { name: "Medium", price: 0.75, volume: "16oz" },
        { name: "Large", price: 1.25, volume: "20oz" },
      ],
      milkOptions: [
        { name: "Whole Milk", price: 0 },
        { name: "Oat Milk", price: 0.65 },
        { name: "Almond Milk", price: 0.55 },
        { name: "Coconut Milk", price: 0.55 },
      ],
      addOns: [
        { name: "Extra Shot", price: 0.75 },
        { name: "Extra Chocolate", price: 0.5 },
        { name: "Whipped Cream", price: 0.5 },
        { name: "Chocolate Chips", price: 0.5 },
      ],
    },
  },
  // Food Items
  {
    id: "chocolate-muffin",
    name: "Double Chocolate Muffin",
    description: "Decadent chocolate muffin with chocolate chips, baked fresh daily.",
    basePrice: 2.95,
    image: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400&h=300&fit=crop&crop=center",
    rating: 4.5,
    category: "pastries",
    type: "food",
    allergens: ["gluten", "dairy", "eggs"],
    nutritionInfo: { calories: 420, sugar: "32g" },
  },
  {
    id: "blueberry-scone",
    name: "Blueberry Scone",
    description: "Buttery scone loaded with fresh blueberries and a light glaze.",
    basePrice: 3.45,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop&crop=center",
    rating: 4.6,
    category: "pastries",
    type: "food",
    allergens: ["gluten", "dairy", "eggs"],
    nutritionInfo: { calories: 350, sugar: "18g" },
  },
  {
    id: "avocado-toast",
    name: "Avocado Toast",
    description: "Fresh avocado on artisan sourdough with sea salt, pepper, and lemon.",
    basePrice: 7.95,
    image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&h=300&fit=crop&crop=center",
    rating: 4.7,
    category: "pastries",
    type: "food",
    allergens: ["gluten"],
    nutritionInfo: { calories: 320, fat: "18g" },
  },
  {
    id: "bagel-cream-cheese",
    name: "Everything Bagel with Cream Cheese",
    description: "Toasted everything bagel with premium cream cheese spread.",
    basePrice: 4.25,
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop&crop=center",
    rating: 4.4,
    category: "pastries",
    type: "food",
    allergens: ["gluten", "dairy"],
    nutritionInfo: { calories: 380, protein: "12g" },
  },
  {
    id: "danish-pastry",
    name: "Almond Danish",
    description: "Flaky pastry filled with sweet almond cream and topped with sliced almonds.",
    basePrice: 3.75,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop&crop=center",
    rating: 4.8,
    category: "pastries",
    type: "food",
    allergens: ["gluten", "dairy", "eggs", "nuts"],
    nutritionInfo: { calories: 290, fat: "16g" },
  },
]

const OptimizedMenuCard = React.memo(({ item, onSelect }: { item: any; onSelect: (item: any) => void }) => {
  const handleClick = useCallback(() => onSelect(item), [item, onSelect])

  return (
    <Card
      className="group bg-card hover:shadow-xl transition-all duration-300 cursor-pointer hover-lift"
      onClick={handleClick}
    >
      <CardContent className="p-0">
        <div className="relative overflow-hidden">
          <img
            src={
              item.image ||
              "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop&crop=center" ||
              "/placeholder.svg" ||
              "/placeholder.svg"
            }
            alt={item.name}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
          />
          {item.isPopular && (
            <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground animate-pulse">Popular</Badge>
          )}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
        </div>
        <div className="p-4 sm:p-6">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg sm:text-xl font-heading font-semibold group-hover:text-primary transition-colors duration-300 line-clamp-2">
              {item.name}
            </h3>
            <div className="text-lg font-heading font-bold text-primary ml-2">${item.basePrice.toFixed(2)}</div>
          </div>
          <p className="text-muted-foreground mb-4 line-clamp-2 text-sm sm:text-base">{item.description}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-accent text-accent" />
              <span className="text-sm font-medium">{item.rating}</span>
            </div>
            <Button
              size="sm"
              className="bg-primary hover:bg-primary/90 text-primary-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 hover:shadow-lg focus-ring"
              onClick={(e) => {
                e.stopPropagation()
                onSelect(item)
              }}
            >
              <Sparkles className="h-4 w-4 mr-1" />
              Customize
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
})

const rewardsTiers = [
  {
    name: "Bronze",
    icon: "☕",
    minPoints: 0,
    maxPoints: 99,
    benefits: ["Free Birthday Drink", "Mobile Order"],
    color: "from-amber-700 to-amber-900",
  },
  {
    name: "Silver",
    icon: "🥈",
    minPoints: 100,
    maxPoints: 299,
    benefits: ["5% Off All Drinks", "Free Size Upgrade", "Double Points Tuesdays"],
    color: "from-gray-400 to-gray-600",
  },
  {
    name: "Gold",
    icon: "🥇",
    minPoints: 300,
    maxPoints: 599,
    benefits: ["10% Off All Items", "Free Drink Every 10 Visits", "Skip the Line"],
    color: "from-yellow-400 to-yellow-600",
  },
  {
    name: "Platinum",
    icon: "💎",
    minPoints: 600,
    maxPoints: Number.POSITIVE_INFINITY,
    benefits: ["15% Off Everything", "Free Monthly Drink", "Exclusive Seasonal Items", "VIP Events"],
    color: "from-purple-400 to-purple-600",
  },
]

const timelineEvents = [
  {
    year: "2018",
    title: "The Beginning",
    description: "Founded with a vision to create the world's most luxurious coffee experience.",
  },
  {
    year: "2019",
    title: "First Flagship Store",
    description: "Opened our first location in downtown Manhattan, setting new standards for coffee shop design.",
  },
  {
    year: "2020",
    title: "Digital Innovation",
    description: "Launched our award-winning mobile app and contactless ordering system.",
  },
  {
    year: "2021",
    title: "Sustainable Sourcing",
    description: "Achieved 100% ethically sourced beans and carbon-neutral operations.",
  },
  {
    year: "2022",
    title: "National Expansion",
    description: "Expanded to 25 locations across major metropolitan areas.",
  },
  {
    year: "2023",
    title: "Premium Roastery",
    description: "Opened our state-of-the-art roastery and coffee education center.",
  },
  {
    year: "2024",
    title: "Global Recognition",
    description: "Named 'Coffee Shop of the Year' by International Coffee Association.",
  },
  {
    year: "2025",
    title: "Future Forward",
    description: "Continuing to innovate with AI-powered personalization and sustainable practices.",
  },
]

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Coffee Enthusiast",
    content:
      "Best Brew has completely transformed my morning routine. The attention to detail in every cup is extraordinary, and the atmosphere makes me feel like I'm in a luxury hotel rather than a coffee shop.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face",
  },
  {
    name: "Michael Chen",
    role: "Business Executive",
    content:
      "As someone who travels frequently, I can confidently say Best Brew offers the finest coffee experience I've encountered. The consistency across locations is remarkable.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
  },
  {
    name: "Emily Rodriguez",
    role: "Food Blogger",
    content:
      "The artisanal approach to coffee at Best Brew is unmatched. From bean selection to brewing technique, every element is crafted to perfection. It's not just coffee, it's an art form.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
  },
  {
    name: "David Thompson",
    role: "Local Resident",
    content:
      "Best Brew has become my second home. The staff knows my order by heart, and the quality never wavers. It's the perfect blend of luxury and comfort.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
  },
]

export default function BestBrewPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [scrollY, setScrollY] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedItem, setSelectedItem] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [featuredIndex, setFeaturedIndex] = useState(0)
  const [rewardsPoints, setRewardsPoints] = useState(75)
  const [testimonialIndex, setTestimonialIndex] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" })
  const [newsletterEmail, setNewsletterEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [logoClickCount, setLogoClickCount] = useState(0)
  const [showNewsletterModal, setShowNewsletterModal] = useState(false)
  const [typingText, setTypingText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [isIntersecting, setIsIntersecting] = useState({})

  const heroTextRef = useRef(null)
  const observerRef = useRef(null)

  const typingPhrases = [
    "Experience the finest coffee craftsmanship",
    "Where luxury meets exceptional taste",
    "Elevating your daily coffee ritual",
    "Artisanal blends, premium experience",
  ]

  const handleScroll = useCallback(
    throttle(() => {
      if (typeof window === "undefined") return

      const currentScrollY = window.scrollY
      setScrollY(currentScrollY)

      // Update active section based on scroll position
      const sections = ["home", "menu", "rewards", "about", "contact"]
      const sectionElements = sections.map((id) => {
        if (typeof document !== "undefined") {
          return document.getElementById(id)
        }
        return null
      })

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = sectionElements[i]
        if (element && element.offsetTop <= currentScrollY + 100) {
          setActiveSection(sections[i])
          break
        }
      }
    }, 16),
    [],
  )

  const handleParallax = useCallback(
    throttle(() => {
      if (typeof window === "undefined" || typeof document === "undefined") return

      const scrolled = window.scrollY
      const rate = scrolled * -0.5
      const heroElement = document.querySelector(".hero-parallax")
      if (heroElement) {
        ;(heroElement as HTMLElement).style.transform = `translate3d(0, ${rate}px, 0)`
      }
    }, 16), // 60fps
    [],
  )

  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in")
          }
        })
      },
      { threshold: 0.1, rootMargin: "-50px" },
    )

    const elements = document.querySelectorAll("[data-animate]")
    elements.forEach((el) => observerRef.current?.observe(el))

    return () => observerRef.current?.disconnect()
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return

    let ticking = false

    const scrollHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          handleParallax()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", scrollHandler, { passive: true })
    return () => window.removeEventListener("scroll", scrollHandler)
  }, [handleScroll, handleParallax])

  useEffect(() => {
    let currentPhraseIndex = 0
    let currentCharIndex = 0
    let isDeleting = false
    let timeoutId

    const typeText = () => {
      const currentPhrase = typingPhrases[currentPhraseIndex]

      if (isDeleting) {
        setTypingText(currentPhrase.substring(0, currentCharIndex - 1))
        currentCharIndex--

        if (currentCharIndex === 0) {
          isDeleting = false
          currentPhraseIndex = (currentPhraseIndex + 1) % typingPhrases.length
          timeoutId = setTimeout(typeText, 500)
        } else {
          timeoutId = setTimeout(typeText, 50)
        }
      } else {
        setTypingText(currentPhrase.substring(0, currentCharIndex + 1))
        currentCharIndex++

        if (currentCharIndex === currentPhrase.length) {
          timeoutId = setTimeout(() => {
            isDeleting = true
            typeText()
          }, 2000)
        } else {
          timeoutId = setTimeout(typeText, 100)
        }
      }
    }

    timeoutId = setTimeout(typeText, 1000)
    return () => clearTimeout(timeoutId)
  }, [])

  useEffect(() => {
    const featuredInterval = setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % featuredItems.length)
    }, 5000)

    const testimonialInterval = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length)
    }, 6000)

    return () => {
      clearInterval(featuredInterval)
      clearInterval(testimonialInterval)
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!localStorage.getItem("newsletter-shown")) {
        setShowNewsletterModal(true)
        localStorage.setItem("newsletter-shown", "true")
      }
    }, 30000)

    return () => clearTimeout(timer)
  }, [])

  const toggleTheme = useCallback(() => {
    if (typeof document === "undefined" || typeof localStorage === "undefined") return

    const newTheme = !isDark
    setIsDark(newTheme)
    document.documentElement.classList.toggle("dark", newTheme)
    localStorage.setItem("theme", newTheme ? "dark" : "light")
  }, [isDark])

  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined" || typeof localStorage === "undefined") return

    const savedTheme = localStorage.getItem("theme")
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const shouldBeDark = savedTheme ? savedTheme === "dark" : systemPrefersDark

    setIsDark(shouldBeDark)
    document.documentElement.classList.toggle("dark", shouldBeDark)
  }, [])

  const filteredItems = useMemo(() => {
    return selectedCategory === "all" ? menuItems : menuItems.filter((item) => item.category === selectedCategory)
  }, [selectedCategory])

  const handleCategoryChange = useCallback((categoryId) => {
    setSelectedCategory(categoryId)
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 300) // Simulate loading
  }, [])

  const handleItemClick = useCallback((item) => {
    setSelectedItem(item)
    setIsModalOpen(true)
  }, [])

  const handleAddToCart = useCallback((item, customizations) => {
    let customizationPrice = 0

    // Only calculate customization prices for drinks
    if (item.type === "drink" && customizations) {
      // Size price
      if (customizations.size && item.customizations?.sizes) {
        const sizeOption = item.customizations.sizes.find(
          (s) => s.name.toLowerCase() === customizations.size.toLowerCase(),
        )
        customizationPrice += sizeOption?.price || 0
      }

      // Milk price
      if (customizations.milk && item.customizations?.milkOptions) {
        const milkOption = item.customizations.milkOptions.find(
          (m) => m.name.toLowerCase() === customizations.milk.toLowerCase(),
        )
        customizationPrice += milkOption?.price || 0
      }

      // Add-ons price
      if (customizations.addOns && Array.isArray(customizations.addOns) && item.customizations?.addOns) {
        customizations.addOns.forEach((addOnName) => {
          const addOn = item.customizations.addOns.find((a) => a.name.toLowerCase() === addOnName.toLowerCase())
          customizationPrice += addOn?.price || 0
        })
      }
    }

    const finalPrice = item.basePrice + customizationPrice
    const cartItem = {
      id: `${item.id}-${Date.now()}`,
      name: item.name,
      price: finalPrice,
      image: item.image,
      customizations: item.type === "drink" ? customizations : null,
      quantity: 1,
    }

    setCartItems((prev) => {
      const existingItem = prev.find(
        (existing) =>
          existing.name === item.name && JSON.stringify(existing.customizations) === JSON.stringify(customizations),
      )

      if (existingItem) {
        return prev.map((existing) =>
          existing.id === existingItem.id ? { ...existing, quantity: existing.quantity + 1 } : existing,
        )
      }

      return [...prev, cartItem]
    })

    setCartCount((prev) => prev + 1)
    setIsModalOpen(false)
  }, [])

  const handleUpdateCartQuantity = useCallback((itemId, newQuantity) => {
    if (newQuantity === 0) {
      handleRemoveFromCart(itemId)
      return
    }

    setCartItems((prev) => prev.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item)))
  }, [])

  const handleRemoveFromCart = useCallback(
    (itemId) => {
      const removedItem = cartItems.find((item) => item.id === itemId)
      setCartItems((prev) => prev.filter((item) => item.id !== itemId))
      setCartCount((prev) => Math.max(0, prev - (removedItem?.quantity || 1)))
    },
    [cartItems],
  )

  const handleLogoClick = useCallback(() => {
    const newCount = logoClickCount + 1
    setLogoClickCount(newCount)

    if (newCount === 5) {
      setShowConfetti(true)
      setTimeout(() => {
        setShowConfetti(false)
        setLogoClickCount(0)
      }, 3000)
    }
  }, [logoClickCount])

  const handleJoinRewards = useCallback(() => {
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 2000)
  }, [])

  const handleContactSubmit = useCallback(async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setContactForm({ name: "", email: "", message: "" })
    setIsSubmitting(false)
  }, [])

  const handleNewsletterSubmit = useCallback(async (e) => {
    e.preventDefault()

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setNewsletterEmail("")
  }, [])

  const handleNewsletterModalSubmit = useCallback(async (email) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setShowNewsletterModal(false)
  }, [])

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  const nextFeatured = useCallback(() => {
    setFeaturedIndex((prev) => (prev + 1) % featuredItems.length)
  }, [])

  const prevFeatured = useCallback(() => {
    setFeaturedIndex((prev) => (prev - 1 + featuredItems.length) % featuredItems.length)
  }, [])

  const getCurrentTier = useCallback(() => {
    return (
      rewardsTiers.find((tier) => rewardsPoints >= tier.minPoints && rewardsPoints <= tier.maxPoints) || rewardsTiers[0]
    )
  }, [rewardsPoints])

  const getNextTier = useCallback(() => {
    const currentTier = getCurrentTier()
    const currentIndex = rewardsTiers.indexOf(currentTier)
    return currentIndex < rewardsTiers.length - 1 ? rewardsTiers[currentIndex + 1] : null
  }, [getCurrentTier])

  const getProgressToNextTier = useCallback(() => {
    const nextTier = getNextTier()
    if (!nextTier) return 100

    const currentTier = getCurrentTier()
    const progress = ((rewardsPoints - currentTier.minPoints) / (nextTier.minPoints - currentTier.minPoints)) * 100
    return Math.min(progress, 100)
  }, [getCurrentTier, getNextTier, rewardsPoints])

  return (
    <div className="min-h-screen bg-background">
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-primary via-accent to-primary z-50 transition-all duration-300"
        style={{
          width:
            typeof window !== "undefined" && typeof document !== "undefined"
              ? `${Math.min((scrollY / (document.body.scrollHeight - window.innerHeight)) * 100, 100)}%`
              : "0%",
        }}
      />

      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-md border-b border-border z-40 transition-all duration-300">
        <div className="max-w-7xl mx-auto mobile-padding">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div
                className="text-2xl font-heading font-bold text-primary cursor-pointer hover:text-accent transition-colors duration-300 logo-easter-egg flex items-center gap-2"
                onClick={handleLogoClick}
              >
                <Coffee className="h-8 w-8" />
                <span className="hidden sm:inline">Best Brew</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {[
                { name: "Home", href: "#home" },
                { name: "Menu", href: "#menu" },
                { name: "Rewards", href: "#rewards" },
                { name: "About", href: "#about" },
                { name: "Contact", href: "#contact" },
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-foreground hover:text-primary transition-colors duration-300 relative ${
                    activeSection === link.href.slice(1) ? "text-primary" : ""
                  }`}
                >
                  {link.name}
                  {activeSection === link.href.slice(1) && (
                    <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full" />
                  )}
                </a>
              ))}
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="hover:bg-primary/10 focus-ring"
                aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-primary/10 focus-ring"
                onClick={() => setIsCartOpen(true)}
                aria-label={`Shopping cart with ${cartCount} items`}
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-accent text-accent-foreground text-xs animate-bounce-in">
                    {cartCount}
                  </Badge>
                )}
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden hover:bg-primary/10 focus-ring"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle mobile menu"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        <div
          className={`md:hidden transition-all duration-300 ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden bg-background border-t border-border`}
        >
          <div className="mobile-padding py-4 space-y-4">
            {[
              { name: "Home", href: "#home" },
              { name: "Menu", href: "#menu" },
              { name: "Rewards", href: "#rewards" },
              { name: "About", href: "#about" },
              { name: "Contact", href: "#contact" },
            ].map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                className="block text-foreground hover:text-primary transition-colors duration-300 py-2 animate-fade-in-left"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1920&h=1080&fit=crop&crop=center')",
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/60 to-background/80" />

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-bold text-primary mb-6 leading-tight">
              Best Brew
            </h1>
            <div className="h-16 flex items-center justify-center">
              <p
                ref={heroTextRef}
                className="text-xl sm:text-2xl md:text-3xl text-muted-foreground font-medium"
                aria-live="polite"
              >
                {typingText}
                {isTyping && <span className="animate-pulse">|</span>}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg w-full sm:w-auto"
            >
              <Coffee className="h-5 w-5 mr-2" />
              Order Now
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 w-full sm:w-auto bg-transparent"
            >
              <MapPin className="h-5 w-5 mr-2" />
              Find Locations
            </Button>
          </div>

          {/* Floating Coffee Bean Animation */}
          <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-accent rounded-full animate-float opacity-60" />
          <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-primary rounded-full animate-float-delayed opacity-40" />
          <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-accent rounded-full animate-float opacity-50" />
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-8 w-8 text-primary" />
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-card" data-animate>
        <div className="max-w-7xl mx-auto mobile-padding">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
            {[
              { number: "50+", label: "Premium Blends", icon: Coffee },
              { number: "100k+", label: "Happy Customers", icon: Users },
              { number: "25", label: "Locations", icon: MapPin },
              { number: "4.9", label: "Rating", icon: Star, special: true },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="space-y-3 animate-fade-in-up hover-lift"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex justify-center mb-2">
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="text-2xl sm:text-3xl font-heading font-bold text-primary">{stat.number}</div>
                <div className="text-sm sm:text-base text-muted-foreground flex items-center justify-center gap-1">
                  {stat.special && <Star className="h-4 w-4 fill-accent text-accent" />}
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Preview Section */}
      <section id="menu" className="py-12 bg-background relative overflow-hidden">
        <div className="max-w-7xl mx-auto mobile-padding">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-primary mb-4">
              Our Premium Menu
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover our carefully curated selection of premium coffee blends and artisan pastries
            </p>
          </div>

          {/* Featured Carousel - Enhanced for mobile */}
          <div className="mb-12 sm:mb-16">
            <h3 className="text-xl sm:text-2xl font-heading font-semibold text-center mb-6 sm:mb-8">Featured Items</h3>
            <div className="relative max-w-4xl mx-auto">
              <div className="overflow-hidden rounded-2xl">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${featuredIndex * 100}%)` }}
                >
                  {featuredItems.map((item) => (
                    <div key={item.id} className="w-full flex-shrink-0">
                      <Card
                        className="bg-card hover:shadow-xl transition-all duration-300 cursor-pointer hover-lift"
                        onClick={() => handleItemClick(item)}
                      >
                        <CardContent className="p-0">
                          <div className="flex flex-col lg:flex-row">
                            <div className="lg:w-1/2">
                              <img
                                src={
                                  item.image ||
                                  "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop&crop=center" ||
                                  "/placeholder.svg" ||
                                  "/placeholder.svg"
                                }
                                alt={item.name}
                                className="w-full h-48 sm:h-64 lg:h-80 object-cover"
                              />
                            </div>
                            <div className="lg:w-1/2 p-6 sm:p-8 flex flex-col justify-center">
                              <Badge className="w-fit mb-4 bg-accent text-accent-foreground">Featured</Badge>
                              <h4 className="text-xl sm:text-2xl font-heading font-bold mb-4">{item.name}</h4>
                              <p className="text-muted-foreground mb-6 text-sm sm:text-base">{item.description}</p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Star className="h-5 w-5 fill-accent text-accent" />
                                  <span className="font-semibold">{item.rating}</span>
                                </div>
                                <div className="text-xl sm:text-2xl font-heading font-bold text-primary">
                                  ${item.basePrice.toFixed(2)}
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>

              {/* Carousel Controls - Better mobile positioning */}
              <Button
                variant="outline"
                size="icon"
                className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm hover-scale focus-ring"
                onClick={prevFeatured}
                aria-label="Previous featured item"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm hover-scale focus-ring"
                onClick={nextFeatured}
                aria-label="Next featured item"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>

              {/* Carousel Indicators */}
              <div className="flex justify-center mt-6 space-x-2">
                {featuredItems.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 focus-ring ${
                      index === featuredIndex ? "bg-primary" : "bg-muted"
                    }`}
                    onClick={() => setFeaturedIndex(index)}
                    aria-label={`Go to featured item ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Category Filter - Enhanced mobile layout */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => handleCategoryChange(category.id)}
                className={`transition-all duration-300 hover:shadow-lg text-sm sm:text-base px-3 sm:px-4 py-2 focus-ring ${
                  selectedCategory === category.id ? "bg-primary text-primary-foreground" : "hover:bg-primary/10"
                }`}
              >
                <category.icon className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">{category.name}</span>
                <span className="sm:hidden">{category.name.split(" ")[0]}</span>
              </Button>
            ))}
          </div>

          {/* Menu Grid - Enhanced mobile responsiveness */}
          {isLoading ? (
            <ProductGridSkeleton count={6} />
          ) : (
            // optimized menu grid with better responsive breakpoints
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {filteredItems.map((item) => (
                <OptimizedMenuCard key={item.id} item={item} onSelect={setSelectedItem} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Rewards Section */}
      <section id="rewards" className="py-12 bg-gradient-to-br from-primary/5 to-accent/5 relative overflow-hidden">
        {/* Confetti Animation */}
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none z-10">
            <div className="animate-pulse">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-accent rounded-full animate-bounce"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${1 + Math.random()}s`,
                  }}
                />
              ))}
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">Best Brew Rewards</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Earn points with every purchase and unlock exclusive benefits
            </p>
          </div>

          {/* Current Status Card */}
          <div className="max-w-2xl mx-auto mb-12">
            <Card className="bg-card/80 backdrop-blur-sm border-2 border-primary/20 shadow-xl">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="text-4xl mb-3">{getCurrentTier().icon}</div>
                  <h3 className="text-xl font-heading font-bold text-primary mb-2">{getCurrentTier().name} Member</h3>
                  <div className="text-2xl font-heading font-bold text-accent mb-3">{rewardsPoints} Points</div>
                </div>

                {getNextTier() && (
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Progress to {getNextTier().name}</span>
                      <span>{getNextTier().minPoints - rewardsPoints} points needed</span>
                    </div>
                    <Progress value={getProgressToNextTier()} className="h-2" />
                  </div>
                )}

                <div className="mt-4">
                  <h4 className="font-heading font-semibold mb-2 text-sm">Your Benefits:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {getCurrentTier().benefits.map((benefit, index) => (
                      <Badge key={index} variant="secondary" className="justify-center py-1 text-xs">
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tier Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {rewardsTiers.map((tier, index) => (
              <Card
                key={tier.name}
                className={`group relative overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-xl ${
                  getCurrentTier().name === tier.name ? "ring-2 ring-primary shadow-lg" : ""
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${tier.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}
                />
                <CardContent className="p-4 relative z-10">
                  <div className="text-center">
                    <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                      {tier.icon}
                    </div>
                    <h3 className="text-lg font-heading font-bold mb-2">{tier.name}</h3>
                    <p className="text-xs text-muted-foreground mb-3">
                      {tier.minPoints === 0 ? "0" : tier.minPoints} -{" "}
                      {tier.maxPoints === Number.POSITIVE_INFINITY ? "∞" : tier.maxPoints} points
                    </p>
                    <div className="space-y-1">
                      {tier.benefits.map((benefit, benefitIndex) => (
                        <div key={benefitIndex} className="text-xs bg-background/50 rounded-full px-2 py-1">
                          {benefit}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Join CTA */}
          <div className="text-center">
            <Button
              size="lg"
              onClick={handleJoinRewards}
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white px-8 py-3 text-base font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <Gift className="h-4 w-4 mr-2" />
              Join Rewards Program
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 bg-gradient-to-br from-accent/5 to-primary/5 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=200&h=200&fit=crop&crop=center')] bg-repeat" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">Our Story</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From humble beginnings to luxury coffee excellence, discover the journey that made Best Brew the premium
              destination for coffee connoisseurs worldwide.
            </p>
          </div>

          {/* Hero Quote */}
          <div className="max-w-4xl mx-auto mb-12">
            <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-none shadow-xl">
              <CardContent className="p-8 text-center">
                <Quote className="h-10 w-10 text-accent mx-auto mb-4" />
                <blockquote className="text-xl md:text-2xl font-heading font-medium text-foreground mb-4 leading-relaxed">
                  "We believe that every cup of coffee should be an experience that elevates your day, crafted with
                  passion and served with the elegance you deserve."
                </blockquote>
                <div className="flex items-center justify-center space-x-4">
                  <img
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=50&h=50&fit=crop&crop=face"
                    alt="Founder"
                    className="w-12 h-12 rounded-full border-2 border-accent"
                  />
                  <div className="text-left">
                    <div className="font-heading font-semibold text-lg">Alexandra Martinez</div>
                    <div className="text-muted-foreground">Founder & Master Roaster</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Timeline */}
          <div className="mb-12">
            <h3 className="text-3xl font-heading font-bold text-center mb-8">Our Journey</h3>
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary to-accent rounded-full" />

              <div className="space-y-8">
                {timelineEvents.map((event, index) => (
                  <div
                    key={event.year}
                    className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"} animate-fade-in-up`}
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <div className={`w-5/12 ${index % 2 === 0 ? "text-right pr-6" : "text-left pl-6"}`}>
                      <Card className="bg-card hover:shadow-lg transition-all duration-300">
                        <CardContent className="p-4">
                          <div className="text-xl font-heading font-bold text-accent mb-2">{event.year}</div>
                          <h4 className="text-lg font-heading font-semibold mb-3">{event.title}</h4>
                          <p className="text-muted-foreground">{event.description}</p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Timeline Node */}
                    <div className="w-2/12 flex justify-center">
                      <div className="w-5 h-5 bg-gradient-to-r from-primary to-accent rounded-full border-4 border-background shadow-lg" />
                    </div>

                    <div className="w-5/12" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-12">
            <h3 className="text-3xl font-heading font-bold text-center mb-8">Meet Our Team</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  name: "Alexandra Martinez",
                  role: "Founder & Master Roaster",
                  image: "/placeholder.svg?height=250&width=250&text=AM",
                },
                { name: "James Wilson", role: "Head Barista", image: "/placeholder.svg?height=250&width=250&text=JW" },
                {
                  name: "Sofia Chen",
                  role: "Operations Director",
                  image: "/placeholder.svg?height=250&width=250&text=SC",
                },
              ].map((member, index) => (
                <Card key={member.name} className="group overflow-hidden hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden">
                      <img
                        src={
                          member.name === "Alexandra Martinez"
                            ? "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=250&h=250&fit=crop&crop=face"
                            : member.name === "James Wilson"
                              ? "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=250&h=250&fit=crop&crop=face"
                              : "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=250&h=250&fit=crop&crop=face"
                        }
                        alt={member.name}
                        className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="p-4 text-center">
                      <h4 className="text-xl font-heading font-semibold mb-2">{member.name}</h4>
                      <p className="text-muted-foreground">{member.role}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Testimonials */}
          <div>
            <h3 className="text-3xl font-heading font-bold text-center mb-8">What Our Customers Say</h3>
            <div className="max-w-4xl mx-auto">
              <div className="relative overflow-hidden rounded-2xl">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${testimonialIndex * 100}%)` }}
                >
                  {testimonials.map((testimonial) => (
                    <div key={testimonial.name} className="w-full flex-shrink-0">
                      <Card className="bg-card/80 backdrop-blur-sm border-2 border-primary/10 shadow-xl">
                        <CardContent className="p-8 text-center">
                          <div className="flex justify-center mb-4">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                            ))}
                          </div>
                          <blockquote className="text-xl md:text-xl font-medium text-foreground mb-6 leading-relaxed">
                            "{testimonial.content}"
                          </blockquote>
                          <div className="flex items-center justify-center space-x-4">
                            <img
                              src={
                                testimonial.avatar ||
                                "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face" ||
                                "/placeholder.svg" ||
                                "/placeholder.svg"
                              }
                              alt={testimonial.name}
                              className="w-14 h-14 rounded-full border-2 border-accent"
                            />
                            <div className="text-left">
                              <div className="font-heading font-semibold text-lg">{testimonial.name}</div>
                              <div className="text-muted-foreground">{testimonial.role}</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>

              {/* Testimonial Indicators */}
              <div className="flex justify-center mt-6 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === testimonialIndex ? "bg-primary" : "bg-muted"
                    }`}
                    onClick={() => setTestimonialIndex(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">Get In Touch</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have a question, suggestion, or just want to say hello? We'd love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-heading font-bold text-primary mb-6">Visit Our Flagship Store</h3>

                {/* Map Placeholder */}
                <div className="relative mb-6 rounded-2xl overflow-hidden shadow-xl">
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-14 w-14 text-primary mx-auto mb-4" />
                      <p className="text-lg font-heading font-semibold text-primary">Interactive Map Coming Soon</p>
                      <p className="text-muted-foreground">123 Coffee Street, Downtown District</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card className="bg-card/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-heading font-semibold mb-1 text-sm">Address</h4>
                        <p className="text-xs text-muted-foreground">
                          123 Coffee Street
                          <br />
                          Downtown District
                          <br />
                          New York, NY 10001
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Phone className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-heading font-semibold mb-1 text-sm">Phone</h4>
                        <p className="text-xs text-muted-foreground">
                          (555) 123-BREW
                          <br />
                          (555) 123-2739
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-heading font-semibold mb-1 text-sm">Email</h4>
                        <p className="text-xs text-muted-foreground">
                          hello@bestbrew.com
                          <br />
                          support@bestbrew.com
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-heading font-semibold mb-1 text-sm">Hours</h4>
                        <p className="text-xs text-muted-foreground">
                          Mon-Fri: 6:00 AM - 9:00 PM
                          <br />
                          Sat-Sun: 7:00 AM - 10:00 PM
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <Card className="bg-card/80 backdrop-blur-sm border-2 border-primary/10 shadow-xl">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-heading font-bold text-primary mb-4">Send Us a Message</h3>

                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="space-y-1">
                      <Label htmlFor="name" className="text-sm font-medium">
                        Your Name
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={contactForm.name}
                        onChange={(e) => setContactForm((prev) => ({ ...prev, name: e.target.value }))}
                        required
                        className="transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="email" className="text-sm font-medium">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email address"
                        value={contactForm.email}
                        onChange={(e) => setContactForm((prev) => ({ ...prev, email: e.target.value }))}
                        required
                        className="transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="message" className="text-sm font-medium">
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us what's on your mind..."
                        rows={5}
                        value={contactForm.message}
                        onChange={(e) => setContactForm((prev) => ({ ...prev, message: e.target.value }))}
                        required
                        className="transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white py-2 text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center space-x-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                          <span>Sending...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <Send className="h-5 w-5" />
                          <span>Send Message</span>
                        </div>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Footer Content */}
          <div className="py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Brand Section */}
              <div className="lg:col-span-2">
                <div className="flex items-center space-x-2 mb-4">
                  <Coffee className="h-7 w-7 text-primary" />
                  <span className="text-2xl font-heading font-bold text-primary">Best Brew</span>
                </div>
                <p className="text-muted-foreground mb-4 max-w-md leading-relaxed">
                  Crafting exceptional coffee experiences since 2018. From our premium blends to our luxury atmosphere,
                  every detail is designed to elevate your day.
                </p>

                {/* Newsletter Signup */}
                <div className="space-y-3">
                  <h4 className="font-heading font-semibold text-lg">Stay Updated</h4>
                  <form onSubmit={handleNewsletterSubmit} className="flex space-x-2">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      required
                      className="flex-1 transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                    <Button
                      type="submit"
                      className="bg-primary hover:bg-primary/90 text-primary-foreground px-5 transition-all duration-300 hover:scale-105"
                    >
                      Subscribe
                    </Button>
                  </form>
                  <p className="text-xs text-muted-foreground">
                    Get the latest updates on new blends, exclusive offers, and events.
                  </p>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-heading font-semibold text-lg mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  {[
                    { name: "Our Menu", href: "#menu" },
                    { name: "Rewards Program", href: "#rewards" },
                    { name: "Our Story", href: "#about" },
                    { name: "Locations", href: "#contact" },
                    { name: "Careers", href: "#" },
                    { name: "Wholesale", href: "#" },
                  ].map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:underline text-sm"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Support */}
              <div>
                <h4 className="font-heading font-semibold text-lg mb-4">Support</h4>
                <ul className="space-y-2">
                  {[
                    { name: "Contact Us", href: "#contact" },
                    { name: "FAQ", href: "#" },
                    { name: "Privacy Policy", href: "#" },
                    { name: "Terms of Service", href: "#" },
                    { name: "Accessibility", href: "#" },
                    { name: "Gift Cards", href: "#" },
                  ].map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:underline text-sm"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-border py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
              {/* Copyright */}
              <div className="flex items-center space-x-2 text-muted-foreground text-sm">
                <span>© 2025 Best Brew. Brewed with</span>
                <Heart className="h-4 w-4 text-accent fill-accent" />
                <span>in New York.</span>
              </div>

              {/* Social Links */}
              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground font-medium">Follow Us:</span>
                <div className="flex space-x-3">
                  {[
                    { icon: Instagram, href: "#", label: "Instagram" },
                    { icon: Twitter, href: "#", label: "Twitter" },
                    { icon: Facebook, href: "#", label: "Facebook" },
                  ].map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110"
                    >
                      <social.icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals and Sidebars */}
      <MenuItemModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddToCart={handleAddToCart}
      />

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
      />

      <NewsletterModal
        isOpen={showNewsletterModal}
        onClose={() => setShowNewsletterModal(false)}
        onSubscribe={handleNewsletterModalSubmit}
      />
    </div>
  )
}
