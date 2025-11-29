// Knowledge-based AI Chatbot for Café Gourmand Dubai
// Uses pattern matching and keyword detection - no external API dependencies

interface ChatResponse {
  response: string;
  suggestions?: string[];
}

interface PatternMatch {
  patterns: string[];
  keywords: string[];
  response: string | (() => string);
  suggestions?: string[];
  priority?: number;
}

// Business Information
const businessInfo = {
  name: "Café Gourmand Dubai",
  phone: "+971 52 102 000 8",
  email: "sales@cafegourmandae.com",
  address: "Dubai International Financial Center (DIFC), Liberty House, Level C",
  hours: "Sunday to Thursday: 9:00 AM - 6:00 PM, Friday: 10:00 AM - 4:00 PM, Saturday: Closed",
  paymentMethods: ["Credit/Debit Card (Visa, Mastercard, Amex)", "Apple Pay", "Google Pay", "Samsung Pay", "PayPal", "Bank Transfer", "Cash on Delivery"],
  returnPolicy: "We offer a 14-day return policy for unopened products in original packaging. For espresso machines, we provide warranty coverage instead of returns. Please contact us within 24 hours if you receive a damaged product.",
  warranty: "Home machines come with 2-3 years warranty. Commercial machines include installation and 1-year warranty with optional extended coverage.",
};

// Coffee Products
const coffeeProducts = [
  {
    id: "gold-oro",
    name: "Gold ORO Blend",
    subtitle: "100% Arabica",
    description: "Produced by mixing 2 Arabica coffees (Colombia & Brazil). Features hints of Chocolate, Almond, and Caramel with a delicate taste, good body, and balanced acidity.",
    price: 89,
    origin: "Colombia & Brazil",
    roast: "Medium",
    flavorNotes: ["Chocolate", "Almond", "Caramel"],
  },
  {
    id: "venetian",
    name: "Venetian Coffee",
    subtitle: "Blend 70/30",
    description: "Mixing 2 Arabica coffees (Colombia & Brazil) with Indian Cherry AA Robusta for its body. Perfect coffee balance with unique taste.",
    price: 79,
    origin: "Colombia, Brazil & India",
    roast: "Medium-Dark",
    flavorNotes: ["Rich", "Full-bodied", "Balanced"],
  },
  {
    id: "colombian",
    name: "Specialty Coffee - Colombian",
    subtitle: "100% Specialty Grade Arabica",
    description: "Light roast grown in Bucaramanga, north-central Colombia. Rich, flavorful with bright, crisp finish. Notes of chocolate, lime, and nutty flavor.",
    price: 99,
    origin: "Colombia (Bucaramanga)",
    roast: "Light",
    flavorNotes: ["Chocolate", "Lime", "Nutty"],
  },
  {
    id: "ethiopian",
    name: "Specialty Coffee - Ethiopian",
    subtitle: "Sidamo Region",
    description: "Grown in the Sidamo region of Ethiopia. Bright acidity, floral aroma, fruity flavor with subtle hints of chocolate and caramel. Lightly roasted for excellent taste.",
    price: 109,
    origin: "Ethiopia (Sidamo)",
    roast: "Light",
    flavorNotes: ["Floral", "Fruity", "Chocolate", "Caramel"],
  },
];

// Commercial Machines
const commercialMachines = [
  {
    id: "astoria-storm",
    name: "Astoria Storm",
    description: "3-Group Espresso machine with limited edition brass finish. Features analog interface, 2 Barista Attitude steam wands, and Steam Boost system.",
    price: 12500,
    features: ["3-Group", "Brass finish", "Analog interface", "LED lighting", "105 Kg", "Made in Italy"],
    bestFor: "Large cafes and high-volume establishments",
  },
  {
    id: "vera",
    name: "Vera",
    description: "2-Group Espresso machine with dual 0.9L stainless steel boilers and E61 group head.",
    price: 8900,
    features: ["2-Group", "Pre-Infusion System", "E61 group", "Copper boiler 10L", "Stainless steel body"],
    bestFor: "Medium-sized cafes",
  },
  {
    id: "prestige-3-group",
    name: "Prestige 3-Group Auto",
    description: "Professional 3-group machine with 20.5L copper boiler and programmable dosage panel.",
    price: 9500,
    features: ["3-Group", "20.5L Boiler", "Pre-Infusion", "Programmable panel", "78 kg"],
    bestFor: "Busy coffee shops and restaurants",
  },
  {
    id: "prestige-2-group",
    name: "Prestige 2-Group Auto",
    description: "Professional 2-group machine with 13.5L copper boiler and programmable coffee dosage.",
    price: 7800,
    features: ["2-Group", "13.5L Boiler", "Pre-Infusion", "Programmable", "60 kg"],
    bestFor: "Small to medium cafes",
  },
  {
    id: "mazzer-robur",
    name: "Mazzer - Robur S",
    description: "Professional grinder with 71mm conical burrs and stepless micrometric adjustment.",
    price: 3200,
    features: ["Electronic", "800W power", "Conical burrs 71mm", "28 kg"],
    bestFor: "High-volume grinding needs",
  },
  {
    id: "sab-mito",
    name: "SAB - MITO",
    description: "Professional heavy-duty grinder with 64mm blades and 1kg hopper capacity.",
    price: 1800,
    features: ["64mm blades", "1kg hopper", "1400 RPM", "Electronic version"],
    bestFor: "Standard cafe grinding",
  },
];

// Home Machines
const homeMachines = [
  {
    id: "cadorna-prestige",
    name: "THE CADORNA PRESTIGE",
    description: "Super Automatic Bean To Cup machine by Gaggia with integrated milk carafe. Features 4 user profiles, ceramic grinders, and 12 beverages.",
    price: 4500,
    warranty: "3 Years",
    features: ["Integrated Milk Carafe", "4 User Profiles", "100% Ceramic Grinders", "Optiaroma", "Pre-Brewing", "12 Beverages"],
    beverages: ["Ristretto", "Espresso", "Espresso Lungo", "Coffee", "Americano", "Cafe Curtado", "Cappuccino", "Cafe Au Lait", "Frothed Milk", "Flat White", "Latte Macchiato", "Hot Water"],
    bestFor: "Coffee enthusiasts who want cafe-quality drinks at home",
  },
  {
    id: "magenta-prestige",
    name: "The Magenta Prestige",
    description: "Premium automatic espresso machine with stainless steel espresso tray and ceramic grinders.",
    price: 3800,
    warranty: "3 Years",
    features: ["Stainless Steel Espresso Tray", "100% Ceramic Grinders", "10 grinding options"],
    bestFor: "Home baristas seeking premium quality",
  },
  {
    id: "anima-class",
    name: "ANIMA CLASS",
    description: "5 beverages at touch of a button with carafe milk frothing system. LED display and temperature control.",
    price: 2900,
    warranty: "2 years + 1 year Extended",
    features: ["5 Beverages", "Carafe milk frothing", "LED Display", "Temperature control", "Hot water dispenser"],
    beverages: ["Espresso", "Espresso Lungo", "Cappuccino", "Latte Macchiato", "Americano"],
    bestFor: "Families and daily coffee drinkers",
  },
];

// Shipping Information
const shippingInfo = {
  uae: {
    time: "2 working days",
    cost: "Free shipping on all orders",
  },
  ksa: {
    time: "5-8 working days",
    cost: "Free shipping on all orders",
  },
  international: {
    info: "We ship to GCC countries. For international orders outside GCC, please contact us directly for shipping arrangements.",
  },
};

// Maintenance Services
const maintenanceInfo = {
  description: "We offer comprehensive coffee machine maintenance and repair services to keep your equipment running perfectly.",
  services: [
    "Regular maintenance and servicing",
    "Emergency repairs",
    "Descaling and cleaning",
    "Parts replacement",
    "Performance optimization",
    "Installation and setup for commercial machines",
  ],
  coverage: "We service all Gaggia, Astoria, and major Italian espresso machine brands.",
  contact: "To schedule a maintenance appointment, call us at +971 52 102 000 8 or email sales@cafegourmandae.com",
};

// Helper function to normalize text for matching
function normalizeText(text: string): string {
  return text.toLowerCase().trim().replace(/[^\w\s]/g, '');
}

// Check if a word appears as a complete word in the message (word boundary matching)
function containsWord(message: string, word: string): boolean {
  const normalizedMsg = normalizeText(message);
  const normalizedWord = normalizeText(word);
  
  // Create regex with word boundaries
  const wordRegex = new RegExp(`\\b${normalizedWord}\\b`, 'i');
  return wordRegex.test(normalizedMsg);
}

// Check if message contains any of the patterns (using word boundaries)
function matchesPatterns(message: string, patterns: string[]): boolean {
  return patterns.some(pattern => {
    // For multi-word patterns, check if the phrase exists
    if (pattern.includes(' ')) {
      const normalizedMsg = normalizeText(message);
      const normalizedPattern = normalizeText(pattern);
      return normalizedMsg.includes(normalizedPattern);
    }
    // For single words, use word boundary matching
    return containsWord(message, pattern);
  });
}

// Check keyword matches and return score (using word boundaries)
function getKeywordScore(message: string, keywords: string[]): number {
  let score = 0;
  for (const keyword of keywords) {
    if (containsWord(message, keyword)) {
      score++;
    }
  }
  return score;
}

// Format price in AED
function formatPrice(price: number): string {
  return `AED ${price.toLocaleString()}`;
}

// Get coffee product info
function getCoffeeInfo(): string {
  const coffeeList = coffeeProducts.map(c => 
    `• **${c.name}** (${c.subtitle}) - ${formatPrice(c.price)}\n  ${c.flavorNotes.join(', ')} notes | ${c.roast} roast`
  ).join('\n\n');
  
  return `We offer four premium coffee blends:\n\n${coffeeList}\n\nAll our coffee is freshly roasted in Italy and shipped directly to Dubai.`;
}

// Get specific coffee details
function getCoffeeDetails(productName: string): string | null {
  const normalizedName = normalizeText(productName);
  const coffee = coffeeProducts.find(c => 
    normalizeText(c.name).includes(normalizedName) || 
    normalizedName.includes(normalizeText(c.name.split(' ')[0])) ||
    normalizeText(c.id).includes(normalizedName)
  );
  
  if (coffee) {
    return `**${coffee.name}** (${coffee.subtitle})\n\n` +
      `Price: ${formatPrice(coffee.price)}\n` +
      `Origin: ${coffee.origin}\n` +
      `Roast: ${coffee.roast}\n` +
      `Flavor Notes: ${coffee.flavorNotes.join(', ')}\n\n` +
      `${coffee.description}`;
  }
  return null;
}

// Get machine info by type
function getMachineInfo(type: 'commercial' | 'home'): string {
  if (type === 'commercial') {
    const list = commercialMachines.map(m => 
      `• **${m.name}** - ${formatPrice(m.price)}\n  Best for: ${m.bestFor}`
    ).join('\n\n');
    return `Our commercial espresso machines:\n\n${list}\n\nAll commercial machines include professional installation and warranty.`;
  } else {
    const list = homeMachines.map(m => 
      `• **${m.name}** - ${formatPrice(m.price)}\n  Warranty: ${m.warranty} | Best for: ${m.bestFor}`
    ).join('\n\n');
    return `Our home espresso machines (all by Gaggia, made in Italy):\n\n${list}\n\nFree shipping within UAE and Saudi Arabia!`;
  }
}

// Get specific machine details
function getMachineDetails(machineName: string): string | null {
  const normalizedName = normalizeText(machineName);
  
  // Check commercial machines
  const commercial = commercialMachines.find(m => 
    normalizeText(m.name).includes(normalizedName) || 
    normalizedName.includes(normalizeText(m.name.split(' ')[0])) ||
    normalizeText(m.id).includes(normalizedName)
  );
  
  if (commercial) {
    return `**${commercial.name}** (Commercial)\n\n` +
      `Price: ${formatPrice(commercial.price)}\n` +
      `Features: ${commercial.features.join(', ')}\n` +
      `Best for: ${commercial.bestFor}\n\n` +
      `${commercial.description}`;
  }
  
  // Check home machines
  const home = homeMachines.find(m => 
    normalizeText(m.name).includes(normalizedName) || 
    normalizedName.includes(normalizeText(m.name.split(' ')[0])) ||
    normalizeText(m.id).includes(normalizedName)
  );
  
  if (home) {
    let details = `**${home.name}** (Home Machine)\n\n` +
      `Price: ${formatPrice(home.price)}\n` +
      `Warranty: ${home.warranty}\n` +
      `Features: ${home.features.join(', ')}\n` +
      `Best for: ${home.bestFor}\n\n` +
      `${home.description}`;
    
    if (home.beverages) {
      details += `\n\nBeverages: ${home.beverages.join(', ')}`;
    }
    return details;
  }
  
  return null;
}

// Pattern definitions for intent matching
const patterns: PatternMatch[] = [
  // Greetings
  {
    patterns: ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening', 'howdy', 'greetings'],
    keywords: ['hi', 'hello', 'hey', 'morning', 'afternoon', 'evening'],
    response: `Hello! Welcome to Café Gourmand Dubai! ☕\n\nI'm here to help you discover our premium Italian coffee blends and espresso machines. How can I assist you today?`,
    suggestions: ["Show me your coffee", "What machines do you sell?", "How can I contact you?"],
    priority: 10,
  },
  
  // Thanks/Goodbye
  {
    patterns: ['thank', 'thanks', 'bye', 'goodbye', 'see you', 'later'],
    keywords: ['thank', 'bye', 'goodbye', 'later'],
    response: `You're welcome! Thank you for visiting Café Gourmand Dubai. If you have any more questions, feel free to ask. Have a wonderful day! ☕`,
    priority: 10,
  },
  
  // All Products Overview
  {
    patterns: ['what do you sell', 'what products', 'show me everything', 'your products', 'what do you have', 'menu', 'catalog'],
    keywords: ['sell', 'products', 'everything', 'menu', 'catalog', 'offer'],
    response: `At Café Gourmand Dubai, we offer:\n\n**☕ Premium Coffee Blends** (AED 79 - AED 109)\n• 4 unique blends from Colombia, Brazil, Ethiopia & more\n\n**🏢 Commercial Espresso Machines** (AED 1,800 - AED 12,500)\n• Professional machines for cafes and restaurants\n• Including Astoria, Gaggia, and premium grinders\n\n**🏠 Home Espresso Machines** (AED 2,900 - AED 4,500)\n• Gaggia automatic machines for home baristas\n• 2-3 year warranty included\n\n**🔧 Maintenance Services**\n• Professional servicing and repairs\n\nWhat would you like to know more about?`,
    suggestions: ["Tell me about coffee blends", "Show commercial machines", "Home machine options"],
    priority: 8,
  },
  
  // Coffee Products
  {
    patterns: ['coffee', 'blend', 'beans', 'roast', 'arabica'],
    keywords: ['coffee', 'blend', 'beans', 'roast', 'arabica', 'robusta'],
    response: getCoffeeInfo,
    suggestions: ["Tell me about Gold ORO", "Which coffee is strongest?", "Ethiopian coffee details"],
    priority: 7,
  },
  
  // Specific Coffee - Gold ORO
  {
    patterns: ['gold', 'oro', 'gold oro'],
    keywords: ['gold', 'oro'],
    response: () => getCoffeeDetails('gold oro') || getCoffeeInfo(),
    suggestions: ["Add to cart", "Compare with other blends", "Shipping info"],
    priority: 9,
  },
  
  // Specific Coffee - Venetian
  {
    patterns: ['venetian', 'venetia'],
    keywords: ['venetian'],
    response: () => getCoffeeDetails('venetian') || getCoffeeInfo(),
    suggestions: ["Add to cart", "Compare with other blends", "Shipping info"],
    priority: 9,
  },
  
  // Specific Coffee - Colombian
  {
    patterns: ['colombian', 'colombia', 'bucaramanga'],
    keywords: ['colombian', 'colombia'],
    response: () => getCoffeeDetails('colombian') || getCoffeeInfo(),
    suggestions: ["Add to cart", "Compare with other blends", "Shipping info"],
    priority: 9,
  },
  
  // Specific Coffee - Ethiopian
  {
    patterns: ['ethiopian', 'ethiopia', 'sidamo'],
    keywords: ['ethiopian', 'ethiopia', 'sidamo'],
    response: () => getCoffeeDetails('ethiopian') || getCoffeeInfo(),
    suggestions: ["Add to cart", "Compare with other blends", "Shipping info"],
    priority: 9,
  },
  
  // Commercial Machines
  {
    patterns: ['commercial', 'professional', 'cafe machine', 'restaurant', 'business'],
    keywords: ['commercial', 'professional', 'cafe', 'restaurant', 'business'],
    response: () => getMachineInfo('commercial'),
    suggestions: ["Astoria Storm details", "Need a grinder?", "Installation included?"],
    priority: 7,
  },
  
  // Home Machines
  {
    patterns: ['home machine', 'home espresso', 'for home', 'personal', 'household', 'domestic'],
    keywords: ['home', 'personal', 'household', 'domestic'],
    response: () => getMachineInfo('home'),
    suggestions: ["Cadorna Prestige details", "Which is best for beginners?", "Warranty info"],
    priority: 7,
  },
  
  // All Machines
  {
    patterns: ['machines', 'espresso machine', 'equipment'],
    keywords: ['machine', 'equipment', 'espresso machine'],
    response: `We offer both commercial and home espresso machines:\n\n**Commercial Machines** (for cafes & businesses):\n${commercialMachines.slice(0, 4).map(m => `• ${m.name} - ${formatPrice(m.price)}`).join('\n')}\n\n**Home Machines** (Gaggia, made in Italy):\n${homeMachines.map(m => `• ${m.name} - ${formatPrice(m.price)}`).join('\n')}\n\nAll include professional support and warranty. Which type interests you?`,
    suggestions: ["Show commercial machines", "Show home machines", "What's the difference?"],
    priority: 6,
  },
  
  // Specific Machines
  {
    patterns: ['astoria', 'storm'],
    keywords: ['astoria', 'storm'],
    response: () => getMachineDetails('astoria') || getMachineInfo('commercial'),
    priority: 9,
  },
  {
    patterns: ['cadorna', 'prestige'],
    keywords: ['cadorna', 'prestige'],
    response: () => getMachineDetails('cadorna') || getMachineInfo('home'),
    priority: 9,
  },
  {
    patterns: ['magenta'],
    keywords: ['magenta'],
    response: () => getMachineDetails('magenta') || getMachineInfo('home'),
    priority: 9,
  },
  {
    patterns: ['anima', 'class'],
    keywords: ['anima', 'class'],
    response: () => getMachineDetails('anima') || getMachineInfo('home'),
    priority: 9,
  },
  {
    patterns: ['mazzer', 'robur', 'grinder'],
    keywords: ['mazzer', 'robur', 'grinder', 'grinding'],
    response: () => getMachineDetails('mazzer') || `We offer professional coffee grinders:\n\n• **Mazzer Robur S** - ${formatPrice(3200)}\n  71mm conical burrs, electronic, 800W\n\n• **SAB MITO** - ${formatPrice(1800)}\n  64mm blades, 1kg hopper, electronic\n\nBoth are perfect companions for commercial espresso machines.`,
    priority: 9,
  },
  
  // Pricing Questions
  {
    patterns: ['price', 'prices', 'cost', 'how much', 'pricing', 'expensive', 'cheap', 'affordable', 'budget'],
    keywords: ['price', 'prices', 'cost', 'much', 'pricing', 'expensive', 'cheap', 'affordable', 'budget'],
    response: `Here's our pricing overview:\n\n**Coffee Blends:**\n• Venetian Blend - AED 79 (most affordable)\n• Gold ORO - AED 89\n• Colombian Specialty - AED 99\n• Ethiopian Specialty - AED 109 (premium)\n\n**Home Machines:**\n• ANIMA CLASS - AED 2,900 (entry-level)\n• Magenta Prestige - AED 3,800\n• Cadorna Prestige - AED 4,500 (full-featured)\n\n**Commercial Machines:**\nRange from AED 1,800 (grinders) to AED 12,500 (Astoria Storm)\n\nFree shipping within UAE and Saudi Arabia on all orders!`,
    suggestions: ["Best value coffee?", "Cheapest home machine?", "Payment options"],
    priority: 7,
  },
  
  // Shipping
  {
    patterns: ['shipping', 'delivery', 'ship', 'deliver', 'how long', 'when arrive'],
    keywords: ['shipping', 'delivery', 'ship', 'deliver', 'arrive', 'days'],
    response: `**Shipping Information:**\n\n🇦🇪 **UAE Delivery:**\n• Time: 2 working days\n• Cost: FREE on all orders!\n\n🇸🇦 **Saudi Arabia:**\n• Time: 5-8 working days\n• Cost: FREE on all orders!\n\n🌍 **International (GCC):**\nWe ship to all GCC countries. For orders outside GCC, please contact us for arrangements.\n\n📍 Order tracking provided for all shipments.`,
    suggestions: ["Contact for international", "What's your address?", "Order now"],
    priority: 8,
  },
  
  // Contact Information
  {
    patterns: ['contact', 'phone', 'email', 'call', 'reach', 'address', 'location', 'where', 'visit'],
    keywords: ['contact', 'phone', 'email', 'call', 'reach', 'address', 'location', 'where', 'visit'],
    response: `**Contact Café Gourmand Dubai:**\n\n📞 **Phone:** ${businessInfo.phone}\n📧 **Email:** ${businessInfo.email}\n📍 **Location:** ${businessInfo.address}\n\n🕐 **Business Hours:**\n${businessInfo.hours}\n\nFeel free to visit our showroom to experience our machines firsthand!`,
    suggestions: ["Send a message", "Business hours?", "Get directions"],
    priority: 8,
  },
  
  // Business Hours
  {
    patterns: ['hours', 'open', 'close', 'when open', 'working hours', 'timings'],
    keywords: ['hours', 'open', 'close', 'timing', 'time'],
    response: `**Business Hours:**\n\n${businessInfo.hours}\n\nFeel free to call us at ${businessInfo.phone} during business hours or email us anytime at ${businessInfo.email}.`,
    suggestions: ["Contact us", "Visit showroom", "Book appointment"],
    priority: 8,
  },
  
  // Payment Methods
  {
    patterns: ['payment', 'pay', 'credit card', 'cash', 'apple pay', 'paypal'],
    keywords: ['payment', 'pay', 'card', 'cash', 'paypal', 'apple'],
    response: `**Accepted Payment Methods:**\n\n${businessInfo.paymentMethods.map(m => `• ${m}`).join('\n')}\n\nAll payments are secure and encrypted. For large commercial orders, we can arrange custom payment terms.`,
    suggestions: ["Place an order", "Contact for bulk pricing", "Shipping info"],
    priority: 7,
  },
  
  // Returns & Refunds
  {
    patterns: ['return', 'refund', 'exchange', 'warranty', 'guarantee', 'damaged'],
    keywords: ['return', 'refund', 'exchange', 'warranty', 'guarantee', 'damage'],
    response: `**Returns & Warranty Policy:**\n\n📦 **Coffee Products:**\n${businessInfo.returnPolicy}\n\n🔧 **Machine Warranty:**\n${businessInfo.warranty}\n\n💡 **Quality Guarantee:**\nWe stand behind all our products. If you're not satisfied, contact us within 24 hours of delivery.\n\nFor warranty claims, email ${businessInfo.email}`,
    suggestions: ["Contact support", "Machine maintenance", "Order with confidence"],
    priority: 7,
  },
  
  // Maintenance Services
  {
    patterns: ['maintenance', 'service', 'repair', 'fix', 'broken', 'clean', 'descale', 'servicing'],
    keywords: ['maintenance', 'service', 'repair', 'fix', 'broken', 'clean', 'descale'],
    response: `**Coffee Machine Maintenance Services:**\n\n${maintenanceInfo.description}\n\n**Our Services Include:**\n${maintenanceInfo.services.map(s => `• ${s}`).join('\n')}\n\n**Coverage:** ${maintenanceInfo.coverage}\n\n📞 **Book a Service:** ${maintenanceInfo.contact}`,
    suggestions: ["Book maintenance", "Emergency repair", "Contact us"],
    priority: 8,
  },
  
  // Recommendations
  {
    patterns: ['recommend', 'suggest', 'best', 'which should', 'what should', 'help choose', 'beginner'],
    keywords: ['recommend', 'suggest', 'best', 'should', 'choose', 'beginner', 'starter'],
    response: `**Our Recommendations:**\n\n☕ **For Coffee Lovers Starting Out:**\n• Venetian Blend (AED 79) - Smooth, balanced, crowd-pleaser\n\n☕ **For Coffee Connoisseurs:**\n• Ethiopian Specialty (AED 109) - Complex, fruity, aromatic\n\n🏠 **Best Home Machine for Beginners:**\n• ANIMA CLASS (AED 2,900) - Simple, 5 beverages, great value\n\n🏠 **Best Home Machine Overall:**\n• Cadorna Prestige (AED 4,500) - 12 beverages, 4 user profiles\n\n🏢 **Best Commercial Machine:**\n• Prestige 2-Group (AED 7,800) - Perfect for small cafes\n\nNeed help choosing? Tell me more about your needs!`,
    suggestions: ["I'm a beginner", "Opening a cafe", "Home espresso setup"],
    priority: 8,
  },
  
  // Beginner Setup
  {
    patterns: ['beginner', 'starter', 'first time', 'new to coffee', 'just starting'],
    keywords: ['beginner', 'starter', 'first', 'new', 'starting', 'learn'],
    response: `**Perfect Starter Setup for Coffee Beginners:**\n\n**Recommended Coffee:**\n☕ Venetian Blend (AED 79)\n• 70% Arabica, 30% Robusta\n• Smooth and forgiving for new baristas\n• Works great with milk drinks\n\n**Recommended Machine:**\n🏠 ANIMA CLASS (AED 2,900)\n• One-touch beverages (Espresso, Cappuccino, Latte)\n• Built-in milk carafe - no manual frothing needed\n• Easy LED display\n• 2+1 years warranty\n\n**Total Investment:** AED 2,979\n\nFree shipping included! Would you like to know more about either product?`,
    suggestions: ["Tell me more about ANIMA", "Other machine options", "How to order"],
    priority: 9,
  },
  
  // Opening a Cafe
  {
    patterns: ['opening cafe', 'start cafe', 'new cafe', 'open coffee shop', 'restaurant setup', 'commercial setup', 'starting a cafe', 'open a cafe', 'starting cafe', 'want to open', 'opening a coffee'],
    keywords: ['opening cafe', 'start cafe', 'starting cafe', 'new cafe', 'open cafe', 'coffee shop', 'restaurant', 'business setup'],
    response: `**Starting a Café? Here's What You Need:**\n\n**Espresso Machine Options:**\n• Prestige 2-Group (AED 7,800) - Small to medium cafes\n• Prestige 3-Group (AED 9,500) - Busy locations\n• Astoria Storm (AED 12,500) - Premium/high-volume\n\n**Coffee Grinder:**\n• Mazzer Robur S (AED 3,200) - High-volume\n• SAB MITO (AED 1,800) - Standard needs\n\n**Coffee Beans:**\nWe offer wholesale pricing for cafes. Contact us for bulk orders.\n\n**Included Services:**\n✓ Professional installation\n✓ Staff training\n✓ 1-year warranty\n✓ Ongoing maintenance support\n\nCall us at ${businessInfo.phone} to discuss your café setup!`,
    suggestions: ["Get a quote", "Bulk coffee pricing", "Installation info"],
    priority: 10,
  },
  
  // Coffee Knowledge
  {
    patterns: ['arabica', 'robusta', 'difference between', 'what is', 'types of coffee'],
    keywords: ['arabica', 'robusta', 'difference', 'type', 'variety'],
    response: `**Coffee Knowledge:**\n\n**Arabica Coffee (60% of world production)**\n• Sweeter, softer taste\n• Higher acidity, more complex flavors\n• Grown at higher altitudes\n• Lower caffeine (1.2-1.5%)\n\n**Robusta Coffee (40% of world production)**\n• Stronger, more bitter taste\n• Full body, earthy flavors\n• More caffeine (2.2-2.7%)\n• Often used in espresso blends for crema\n\n**Our Blends:**\n• Gold ORO: 100% Arabica\n• Venetian: 70% Arabica, 30% Robusta (best balance)\n• Colombian & Ethiopian: 100% Specialty Arabica`,
    suggestions: ["Which blend to try?", "Roast levels explained", "Best for espresso?"],
    priority: 7,
  },
  
  // Espresso vs Coffee
  {
    patterns: ['espresso vs', 'difference espresso', 'what is espresso', 'cappuccino', 'latte', 'americano'],
    keywords: ['espresso', 'cappuccino', 'latte', 'americano', 'macchiato'],
    response: `**Coffee Drink Guide:**\n\n☕ **Espresso:** Concentrated coffee (30ml)\n\n☕ **Americano:** Espresso + hot water\n\n☕ **Cappuccino:** 1/3 espresso, 1/3 steamed milk, 1/3 foam\n\n☕ **Latte:** Espresso + lots of steamed milk, thin foam\n\n☕ **Flat White:** Like latte but stronger, microfoam\n\n☕ **Macchiato:** Espresso "stained" with milk\n\nOur Cadorna Prestige machine can make all of these at the touch of a button!`,
    suggestions: ["Cadorna Prestige details", "Machine comparison", "Coffee recommendations"],
    priority: 7,
  },
  
  // Gaggia Brand
  {
    patterns: ['gaggia', 'italian', 'made in italy', 'brand'],
    keywords: ['gaggia', 'italian', 'italy', 'brand', 'manufacturer'],
    response: `**About Gaggia:**\n\nGaggia is a prestigious Italian espresso machine manufacturer founded in 1948. They invented the modern espresso machine and are pioneers of home espresso.\n\n**Why Choose Gaggia:**\n• 75+ years of Italian craftsmanship\n• Invented the modern espresso machine\n• Premium build quality\n• Industry-leading warranty\n\n**Our Gaggia Home Machines:**\n• Cadorna Prestige - AED 4,500 (3yr warranty)\n• Magenta Prestige - AED 3,800 (3yr warranty)\n• ANIMA CLASS - AED 2,900 (2+1yr warranty)\n\nAll proudly designed and made in Italy.`,
    suggestions: ["Compare Gaggia models", "See all home machines", "Warranty details"],
    priority: 7,
  },
  
  // Order/Buy
  {
    patterns: ['order', 'buy', 'purchase', 'add to cart', 'checkout', 'want to buy'],
    keywords: ['order', 'buy', 'purchase', 'cart', 'checkout'],
    response: `**Ready to Order?**\n\nYou can browse our products and add them to your cart directly on our website. Here's how:\n\n1. Browse our Coffee, Commercial Machines, or Home Machines sections\n2. Click "Add to Cart" on any product\n3. Open your cart to review items\n4. Proceed to checkout\n\n**Benefits:**\n✓ Free shipping (UAE & KSA)\n✓ Secure payment options\n✓ Full warranty on machines\n✓ Quality guarantee\n\nNeed help choosing? Just ask me for recommendations!`,
    suggestions: ["Recommend a coffee", "Best home machine?", "Payment options"],
    priority: 7,
  },
  
  // Help/Support
  {
    patterns: ['help', 'support', 'problem', 'issue', 'not working', 'trouble'],
    keywords: ['help', 'support', 'problem', 'issue', 'trouble'],
    response: `**How Can We Help?**\n\nI'm here to assist you with:\n\n🛒 **Shopping:**\n• Product recommendations\n• Pricing information\n• Comparing machines\n\n📦 **Orders:**\n• Shipping information\n• Payment methods\n• Return policy\n\n🔧 **Support:**\n• Machine maintenance\n• Warranty questions\n• Technical issues\n\n**Direct Contact:**\n📞 ${businessInfo.phone}\n📧 ${businessInfo.email}\n\nWhat can I help you with?`,
    suggestions: ["Product question", "Order issue", "Technical support"],
    priority: 6,
  },
];

// Default/fallback responses
const fallbackResponses = [
  `I'm not quite sure I understood that. I can help you with:\n\n• Coffee blends and pricing\n• Espresso machines (home & commercial)\n• Shipping and delivery\n• Maintenance services\n• Contact information\n\nCould you rephrase your question or pick one of these topics?`,
  
  `I'd love to help! Here are things I know about:\n\n☕ Our premium coffee blends\n🏠 Home espresso machines\n🏢 Commercial equipment\n📦 Shipping info\n🔧 Maintenance services\n\nWhat would you like to know more about?`,
  
  `I'm the Café Gourmand assistant and I'm best at answering questions about our products and services. Try asking about:\n\n• "What coffee do you have?"\n• "Show me home machines"\n• "How much is shipping?"\n• "What are your business hours?"\n\nOr contact us directly at ${businessInfo.phone}`,
];

// Main chatbot function
export function getChatResponse(userMessage: string): ChatResponse {
  const message = userMessage.trim();
  
  if (!message) {
    return {
      response: "Hello! How can I help you today? Ask me about our coffee, espresso machines, or services!",
      suggestions: ["Show me coffee blends", "Home machines", "Contact info"],
    };
  }
  
  // Score each pattern match
  let bestMatch: PatternMatch | null = null;
  let bestScore = 0;
  
  for (const pattern of patterns) {
    let score = 0;
    const priority = pattern.priority || 5;
    
    // Check for exact pattern matches (high score)
    if (matchesPatterns(message, pattern.patterns)) {
      score += 10;
    }
    
    // Add keyword scores
    score += getKeywordScore(message, pattern.keywords) * 2;
    
    // Apply priority multiplier
    score = score * (priority / 10);
    
    if (score > bestScore) {
      bestScore = score;
      bestMatch = pattern;
    }
  }
  
  // If we found a good match
  if (bestMatch && bestScore >= 2) {
    const response = typeof bestMatch.response === 'function' 
      ? bestMatch.response() 
      : bestMatch.response;
      
    return {
      response,
      suggestions: bestMatch.suggestions,
    };
  }
  
  // Return fallback response
  const fallbackIndex = Math.floor(Math.random() * fallbackResponses.length);
  return {
    response: fallbackResponses[fallbackIndex],
    suggestions: ["View coffee", "View machines", "Contact us"],
  };
}

export type { ChatResponse };
