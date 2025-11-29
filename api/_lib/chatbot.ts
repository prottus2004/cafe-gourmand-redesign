interface ChatResponse {
  response: string;
  suggestions?: string[];
}

const businessInfo = {
  name: "Café Gourmand Dubai",
  phone: "+971 52 102 000 8",
  email: "sales@cafegourmandae.com",
  address: "Dubai International Financial Center (DIFC), Liberty House, Level C",
  hours: "Sunday to Thursday: 9:00 AM - 6:00 PM, Friday: 10:00 AM - 4:00 PM, Saturday: Closed",
  paymentMethods: ["Credit/Debit Card (Visa, Mastercard, Amex)", "Apple Pay", "Google Pay", "Samsung Pay", "PayPal", "Bank Transfer", "Cash on Delivery"],
};

const coffeeProducts = [
  { id: "gold-oro", name: "Gold ORO Blend", subtitle: "100% Arabica", price: 89, flavorNotes: ["Chocolate", "Almond", "Caramel"], roast: "Medium", origin: "Colombia & Brazil" },
  { id: "venetian", name: "Venetian Coffee", subtitle: "Blend 70/30", price: 79, flavorNotes: ["Rich", "Full-bodied", "Balanced"], roast: "Medium-Dark", origin: "Colombia, Brazil & India" },
  { id: "colombian", name: "Specialty Coffee - Colombian", subtitle: "100% Specialty Grade Arabica", price: 99, flavorNotes: ["Chocolate", "Lime", "Nutty"], roast: "Light", origin: "Colombia (Bucaramanga)" },
  { id: "ethiopian", name: "Specialty Coffee - Ethiopian", subtitle: "Sidamo Region", price: 109, flavorNotes: ["Floral", "Fruity", "Chocolate", "Caramel"], roast: "Light", origin: "Ethiopia (Sidamo)" },
];

const commercialMachines = [
  { id: "astoria-storm", name: "Astoria Storm", price: 12500, bestFor: "Large cafes and high-volume establishments" },
  { id: "vera", name: "Vera", price: 8900, bestFor: "Medium-sized cafes" },
  { id: "prestige-3-group", name: "Prestige 3-Group Auto", price: 9500, bestFor: "Busy coffee shops and restaurants" },
  { id: "prestige-2-group", name: "Prestige 2-Group Auto", price: 7800, bestFor: "Small to medium cafes" },
];

const homeMachines = [
  { id: "cadorna-prestige", name: "THE CADORNA PRESTIGE", price: 4500, warranty: "3 Years", bestFor: "Coffee enthusiasts who want cafe-quality drinks at home" },
  { id: "magenta-prestige", name: "The Magenta Prestige", price: 3800, warranty: "3 Years", bestFor: "Home baristas seeking premium quality" },
  { id: "anima-class", name: "ANIMA CLASS", price: 2900, warranty: "2 years + 1 year Extended", bestFor: "Families and daily coffee drinkers" },
];

function normalizeText(text: string): string {
  return text.toLowerCase().trim().replace(/[^\w\s]/g, '');
}

function containsWord(message: string, word: string): boolean {
  const normalizedMsg = normalizeText(message);
  const normalizedWord = normalizeText(word);
  const wordRegex = new RegExp(`\\b${normalizedWord}\\b`, 'i');
  return wordRegex.test(normalizedMsg);
}

function formatPrice(price: number): string {
  return `AED ${price.toLocaleString()}`;
}

export function getChatResponse(message: string): ChatResponse {
  const normalizedMessage = normalizeText(message);

  // Greetings
  if (containsWord(message, 'hi') || containsWord(message, 'hello') || containsWord(message, 'hey')) {
    return {
      response: `Hello! Welcome to Café Gourmand Dubai!\n\nI'm here to help you discover our premium Italian coffee blends and espresso machines. How can I assist you today?`,
      suggestions: ["Show me your coffee", "What machines do you sell?", "How can I contact you?"],
    };
  }

  // Coffee products
  if (containsWord(message, 'coffee') || containsWord(message, 'blend') || containsWord(message, 'beans')) {
    const coffeeList = coffeeProducts.map(c => `• **${c.name}** (${c.subtitle}) - ${formatPrice(c.price)}\n  ${c.flavorNotes.join(', ')} notes | ${c.roast} roast`).join('\n\n');
    return {
      response: `We offer four premium coffee blends:\n\n${coffeeList}\n\nAll our coffee is freshly roasted in Italy and shipped directly to Dubai.`,
      suggestions: ["Tell me about Gold ORO", "Which coffee is strongest?", "Ethiopian coffee details"],
    };
  }

  // Commercial machines
  if (containsWord(message, 'commercial') || containsWord(message, 'professional') || containsWord(message, 'cafe')) {
    const list = commercialMachines.map(m => `• **${m.name}** - ${formatPrice(m.price)}\n  Best for: ${m.bestFor}`).join('\n\n');
    return {
      response: `Our commercial espresso machines:\n\n${list}\n\nAll commercial machines include professional installation and warranty.`,
      suggestions: ["Astoria Storm details", "Need a grinder?", "Installation included?"],
    };
  }

  // Home machines
  if (containsWord(message, 'home') || containsWord(message, 'personal') || containsWord(message, 'gaggia')) {
    const list = homeMachines.map(m => `• **${m.name}** - ${formatPrice(m.price)}\n  Warranty: ${m.warranty} | Best for: ${m.bestFor}`).join('\n\n');
    return {
      response: `Our home espresso machines (all by Gaggia, made in Italy):\n\n${list}\n\nFree shipping within UAE and Saudi Arabia!`,
      suggestions: ["Cadorna Prestige details", "Which is best for beginners?", "Warranty info"],
    };
  }

  // Machines in general
  if (containsWord(message, 'machine') || containsWord(message, 'espresso')) {
    return {
      response: `We offer both commercial and home espresso machines:\n\n**Commercial Machines** (for cafes & businesses):\n${commercialMachines.map(m => `• ${m.name} - ${formatPrice(m.price)}`).join('\n')}\n\n**Home Machines** (Gaggia, made in Italy):\n${homeMachines.map(m => `• ${m.name} - ${formatPrice(m.price)}`).join('\n')}\n\nWhich type interests you?`,
      suggestions: ["Show commercial machines", "Show home machines", "What's the difference?"],
    };
  }

  // Pricing
  if (containsWord(message, 'price') || containsWord(message, 'cost') || containsWord(message, 'how much')) {
    return {
      response: `**Pricing Overview:**\n\n**Coffee Blends:** AED 79 - AED 109\n**Home Machines:** AED 2,900 - AED 4,500\n**Commercial Machines:** AED 1,800 - AED 12,500\n\nFree shipping within UAE and Saudi Arabia!`,
      suggestions: ["Best value coffee?", "Cheapest home machine?", "Payment options"],
    };
  }

  // Contact info
  if (containsWord(message, 'contact') || containsWord(message, 'phone') || containsWord(message, 'email') || containsWord(message, 'address')) {
    return {
      response: `**Contact Café Gourmand Dubai:**\n\n📞 **Phone:** ${businessInfo.phone}\n📧 **Email:** ${businessInfo.email}\n📍 **Location:** ${businessInfo.address}\n\n🕐 **Business Hours:**\n${businessInfo.hours}`,
      suggestions: ["Send a message", "Business hours?", "Get directions"],
    };
  }

  // Shipping
  if (containsWord(message, 'shipping') || containsWord(message, 'delivery') || containsWord(message, 'deliver')) {
    return {
      response: `**Shipping Information:**\n\n🇦🇪 **UAE Delivery:** 2 working days - FREE!\n🇸🇦 **Saudi Arabia:** 5-8 working days - FREE!\n🌍 **International (GCC):** Contact us for arrangements\n\n📍 Order tracking provided for all shipments.`,
      suggestions: ["Contact for international", "What's your address?", "Order now"],
    };
  }

  // Payment
  if (containsWord(message, 'payment') || containsWord(message, 'pay') || containsWord(message, 'card')) {
    return {
      response: `**Accepted Payment Methods:**\n\n${businessInfo.paymentMethods.map(m => `• ${m}`).join('\n')}\n\nAll payments are secure and encrypted.`,
      suggestions: ["Place an order", "Contact for bulk pricing", "Shipping info"],
    };
  }

  // Maintenance
  if (containsWord(message, 'maintenance') || containsWord(message, 'repair') || containsWord(message, 'service')) {
    return {
      response: `**Coffee Machine Maintenance Services:**\n\nWe offer comprehensive maintenance and repair services:\n• Regular maintenance and servicing\n• Emergency repairs\n• Descaling and cleaning\n• Parts replacement\n• Performance optimization\n• Installation and setup\n\n📞 Book a service: ${businessInfo.phone}`,
      suggestions: ["Book maintenance", "Emergency repair", "Contact us"],
    };
  }

  // Products overview
  if (containsWord(message, 'product') || containsWord(message, 'sell') || containsWord(message, 'offer')) {
    return {
      response: `At Café Gourmand Dubai, we offer:\n\n**☕ Premium Coffee Blends** (AED 79 - AED 109)\n• 4 unique blends from Colombia, Brazil, Ethiopia & more\n\n**🏢 Commercial Espresso Machines** (AED 1,800 - AED 12,500)\n• Professional machines for cafes and restaurants\n\n**🏠 Home Espresso Machines** (AED 2,900 - AED 4,500)\n• Gaggia automatic machines for home baristas\n\n**🔧 Maintenance Services**\n• Professional servicing and repairs\n\nWhat would you like to know more about?`,
      suggestions: ["Tell me about coffee blends", "Show commercial machines", "Home machine options"],
    };
  }

  // Default response
  return {
    response: `Thank you for your message! I can help you with:\n\n• Our premium coffee blends\n• Commercial espresso machines\n• Home espresso machines by Gaggia\n• Shipping and delivery information\n• Maintenance services\n• Contact information\n\nWhat would you like to know more about?`,
    suggestions: ["Show me coffee", "Machine options", "Contact info"],
  };
}
