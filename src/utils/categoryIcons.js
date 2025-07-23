import { Clapperboard, ShoppingCart, Car, Stethoscope, Home, Lightbulb, Shirt, Dog, Book, Wallet, Laptop, TrendingUp, Building, Gift, TabletSmartphone, Wifi, Banknote, CreditCard, WalletCards, Bomb } from "lucide-react";


export const categoryIcons = {
    // Expenses
    'comida': ShoppingCart,
    'entretenimiento': Clapperboard,
    'transporte': Car,
    'ocio': Bomb,
    'salud': Stethoscope,
    'hogar': Home,
    'servicios': Lightbulb,
    'renta': Lightbulb,
    'agua': Lightbulb,
    'luz': Lightbulb,
    'ropa': Shirt,
    'mascotas': Dog,
    'educacion': Book,
    'viajes': Wallet,
    'regalos': Gift,
    'internet': Wifi,
    'pagos': Banknote,

    // Income
    'fondo inicial': Wallet,
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
    { id: 'comida', icon: ShoppingCart, type: 'gasto' },
    { id: 'entretenimiento', icon: Clapperboard, type: 'gasto' },
    { id: 'transporte', icon: Car, type: 'gasto' },
    { id: 'ocio', icon: Bomb, type: 'gasto' },
    { id: 'salud', icon: Stethoscope, type: 'gasto' },
    { id: 'hogar', icon: Home, type: 'gasto' },
    { id: 'renta', icon: Lightbulb, type: 'gasto' },
    { id: 'agua', icon: Lightbulb, type: 'gasto' },
    { id: 'luz', icon: Lightbulb, type: 'gasto' },
    { id: 'ropa', icon: Shirt, type: 'gasto' },
    { id: 'internet', icon: Wifi, type: 'gasto' },
    { id: 'mascotas', icon: Dog, type: 'gasto' },
    { id: 'educacion', icon: Book, type: 'gasto' },
    { id: 'viajes', icon: Wallet, type: 'gasto' },
    { id: 'regalos', icon: Gift, type: 'gasto' },
    { id: 'pagos', icon: Banknote, type: 'gasto' },
    { id: 'fondo inicial', icon: Wallet, type: 'ingreso' },
    { id: 'salario', icon: Wallet, type: 'ingreso' },
    { id: 'freelance', icon: Laptop, type: 'ingreso' },
    { id: 'inversiones', icon: TrendingUp, type: 'ingreso' },
    { id: 'alquiler', icon: Building, type: 'ingreso' },
    { id: 'bonos', icon: Gift, type: 'ingreso' },
    { id: 'reparaciones', icon: TabletSmartphone, type: 'ingreso' }
];
