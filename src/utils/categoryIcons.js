import { Clapperboard, ShoppingCart, Car, Stethoscope, Home, Lightbulb, Shirt, Dog, Book, Wallet, Laptop, TrendingUp, Building, Gift, TabletSmartphone, Wifi, Banknote, CreditCard, WalletCards } from "lucide-react";


export const categoryIcons = {
    // Expenses
    'comida': ShoppingCart,
    'entretenimiento': Clapperboard,
    'transporte': Car,
    'salud': Stethoscope,
    'hogar': Home,
    'servicios': Lightbulb,
    'ropa': Shirt,
    'mascotas': Dog,
    'educacion': Book,
    'viajes': Wallet,
    'regalos': Gift,
    'internet': Wifi,

    'salario': Wallet,
    'freelance': Laptop,
    'inversiones': TrendingUp,
    'alquiler': Building,
    'bonos': Gift,
    'reparaciones': TabletSmartphone
}

export const paymentMethods = {
    'efectivo': Banknote,
    'tarjeta': CreditCard,
    'transferencia': WalletCards
}


// Array of expense categories
export const expenseCategories = [
    { id: 'comida', icon: ShoppingCart },
    { id: 'entretenimiento', icon: Clapperboard },
    { id: 'transporte', icon: Car },
    { id: 'salud', icon: Stethoscope },
    { id: 'hogar', icon: Home },
    { id: 'servicios', icon: Lightbulb },
    { id: 'ropa', icon: Shirt },
    { id: 'mascotas', icon: Dog },
    { id: 'educacion', icon: Book },
    { id: 'viajes', icon: Wallet },
    { id: 'regalos', icon: Gift },
    { id: 'internet', icon: Wifi },
    { id: 'salario', icon: Wallet },
    { id: 'freelance', icon: Laptop },
    { id: 'inversiones', icon: TrendingUp },
    { id: 'alquiler', icon: Building },
    { id: 'bonos', icon: Gift },
    { id: 'reparaciones', icon: TabletSmartphone }
];
