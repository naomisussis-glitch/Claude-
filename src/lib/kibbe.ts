export type KibbeType =
  | "Dramatic"
  | "Soft Dramatic"
  | "Natural"
  | "Flamboyant Natural"
  | "Soft Natural"
  | "Classic"
  | "Soft Classic"
  | "Dramatic Classic"
  | "Gamine"
  | "Flamboyant Gamine"
  | "Soft Gamine"
  | "Romantic"
  | "Theatrical Romantic";

export interface PricePoint {
  tier: "Budget" | "Mid-Range" | "Luxury";
  priceRange: string;
  brands: string[];
}

export interface KibbeProfile {
  type: KibbeType;
  description: string;
  bodyCharacteristics: string[];
  doWear: string[];
  avoid: string[];
  keyPieces: string[];
  silhouettes: string[];
  fabricRecommendations: string[];
  colorGuidance: string;
  pricePoints: PricePoint[];
  celebrities: string[];
}

export const KIBBE_PROFILES: Record<KibbeType, KibbeProfile> = {
  Dramatic: {
    type: "Dramatic",
    description:
      "Sharp, angular, bold features with a tall, narrow, elongated frame. Yang-dominant with striking presence.",
    bodyCharacteristics: [
      "Tall (usually 5'7\" and above)",
      "Narrow, angular shoulders",
      "Long limbs and neck",
      "Flat, angular body lines",
      "Sharp facial features",
    ],
    doWear: [
      "Sleek, tailored silhouettes",
      "Bold, geometric cuts",
      "Minimalist, structured pieces",
      "Monochromatic looks",
      "Power shoulders",
      "Long, column-like dresses",
      "Sharp lapels and crisp collars",
    ],
    avoid: [
      "Fussy details and ruffles",
      "Soft, flowing fabrics that overwhelm",
      "Overly feminine or delicate prints",
      "Boxy, shapeless cuts",
      "Excessive layering that interrupts the line",
    ],
    keyPieces: [
      "Structured blazers",
      "Sleek trousers",
      "Column maxi dresses",
      "Sharp-shouldered jackets",
      "Minimal jewelry in bold, geometric shapes",
    ],
    silhouettes: [
      "Column",
      "Sheath",
      "Structured A-line",
      "Tailored wrap",
    ],
    fabricRecommendations: [
      "Crisp cotton",
      "Structured wool",
      "Sleek silk",
      "Matte jersey",
      "Architectural synthetics",
    ],
    colorGuidance:
      "Monochromatic power dressing excels. Deep, bold colors (black, navy, burgundy) or sharp contrast. Avoid busy prints.",
    pricePoints: [
      {
        tier: "Budget",
        priceRange: "$20–$80",
        brands: ["Zara", "H&M Studio", "ASOS", "Shein (structured lines)", "Mango"],
      },
      {
        tier: "Mid-Range",
        priceRange: "$80–$400",
        brands: ["Theory", "Banana Republic", "COS", "Club Monaco", "Massimo Dutti", "Reiss"],
      },
      {
        tier: "Luxury",
        priceRange: "$400+",
        brands: ["The Row", "Saint Laurent", "Jil Sander", "Helmut Lang", "Bottega Veneta", "Celine"],
      },
    ],
    celebrities: ["Tilda Swinton", "Cate Blanchett", "Naomi Campbell"],
  },

  "Soft Dramatic": {
    type: "Soft Dramatic",
    description:
      "Bold Yang frame softened with lush Yin curves. Tall with dramatic presence plus voluptuous softness.",
    bodyCharacteristics: [
      "Tall, commanding frame",
      "Angular shoulders with visible curves",
      "Defined waist with full hips/bust",
      "Long limbs",
      "Strong but sensual overall impression",
    ],
    doWear: [
      "Draped, flowing fabrics over structured bases",
      "Deep V-necklines that showcase curves",
      "Wrap dresses and tops",
      "Luxurious, opulent fabrics",
      "Statement accessories",
      "Bold, exotic prints",
      "Elongated silhouettes with movement",
    ],
    avoid: [
      "Boxy, stiff tailoring",
      "Overly sporty or casual looks",
      "Busy, small-scale prints",
      "Anything that hides the waist entirely",
      "Miniature, delicate details",
    ],
    keyPieces: [
      "Draped maxi dresses",
      "Wrap blouses",
      "Wide-leg trousers in luxe fabrics",
      "Statement jewelry",
      "Dramatic coats",
    ],
    silhouettes: ["Wrap", "Draped column", "Hourglass", "Dramatic A-line"],
    fabricRecommendations: [
      "Chiffon",
      "Silk",
      "Velvet",
      "Jersey",
      "Satin",
      "Luxurious knits",
    ],
    colorGuidance:
      "Rich, opulent colors work beautifully. Jewel tones, animal prints, bold florals. Monochromatic drama also stunning.",
    pricePoints: [
      {
        tier: "Budget",
        priceRange: "$20–$80",
        brands: ["Zara", "ASOS Curve", "Shein", "PrettyLittleThing", "Boohoo"],
      },
      {
        tier: "Mid-Range",
        priceRange: "$80–$400",
        brands: ["Reformation", "Free People", "Anthropologie", "Vince", "Eloquii"],
      },
      {
        tier: "Luxury",
        priceRange: "$400+",
        brands: ["Diane von Furstenberg", "Versace", "Alexis", "Altuzarra", "Johanna Ortiz"],
      },
    ],
    celebrities: ["Sofia Loren", "Beyoncé", "Salma Hayek"],
  },

  Natural: {
    type: "Natural",
    description:
      "Blended Yang energy with a broad, straight frame. Athletic, relaxed, and effortlessly put-together.",
    bodyCharacteristics: [
      "Broad shoulders",
      "Straight or slightly curved body lines",
      "Medium to tall height",
      "Athletic or sturdy build",
      "Slightly blunt facial features",
    ],
    doWear: [
      "Relaxed, unconstructed silhouettes",
      "Natural fabrics with texture",
      "Casual layering",
      "Slightly oversized pieces",
      "Earthy, organic tones",
      "Simple, unstructured blazers",
      "Comfortable but polished looks",
    ],
    avoid: [
      "Stiff, overly tailored pieces",
      "Fussy or ornate details",
      "Ultra-fitted silhouettes",
      "Delicate, fragile fabrics",
      "Excessive embellishment",
    ],
    keyPieces: [
      "Relaxed blazers",
      "Wide-leg jeans",
      "Oversized sweaters",
      "Button-down shirts",
      "Leather jackets",
    ],
    silhouettes: ["Relaxed straight", "Slightly A-line", "Unconstructed"],
    fabricRecommendations: [
      "Linen",
      "Cotton",
      "Denim",
      "Suede",
      "Textured knits",
      "Leather",
    ],
    colorGuidance:
      "Earthy naturals, warm neutrals, muted tones. Avoid overly bright or sterile color palettes. Texture over pattern.",
    pricePoints: [
      {
        tier: "Budget",
        priceRange: "$20–$80",
        brands: ["Uniqlo", "Gap", "Old Navy", "Target (A New Day)", "Mango"],
      },
      {
        tier: "Mid-Range",
        priceRange: "$80–$400",
        brands: ["Madewell", "J.Crew", "Banana Republic", "Everlane", "Faherty"],
      },
      {
        tier: "Luxury",
        priceRange: "$400+",
        brands: ["Ralph Lauren", "Loro Piana", "Brunello Cucinelli", "Vince", "Eileen Fisher"],
      },
    ],
    celebrities: ["Jennifer Aniston", "Julia Roberts", "Cameron Diaz"],
  },

  "Flamboyant Natural": {
    type: "Flamboyant Natural",
    description:
      "The most Yang of the Naturals — tall, broad, and athletic with a striking, free-spirited energy.",
    bodyCharacteristics: [
      "Tall (often 5'7\"+)",
      "Very broad shoulders",
      "Straight, athletic frame",
      "Long limbs",
      "Bold, striking presence",
    ],
    doWear: [
      "Oversized, relaxed silhouettes",
      "Loose, flowing pieces with movement",
      "Wide-leg trousers",
      "Bold, graphic prints",
      "Layered, effortless looks",
      "Statement outerwear",
    ],
    avoid: [
      "Fitted, structured tailoring",
      "Fussy feminine details",
      "Constricting silhouettes",
      "Overly polished looks",
      "Small-scale patterns",
    ],
    keyPieces: [
      "Oversized blazers",
      "Wide-leg trousers",
      "Flowy maxi skirts",
      "Chunky knitwear",
      "Duster coats",
    ],
    silhouettes: ["Oversized", "Relaxed wide-leg", "Flowing maxi"],
    fabricRecommendations: [
      "Linen",
      "Gauze",
      "Soft denim",
      "Jersey",
      "Textured knits",
    ],
    colorGuidance:
      "Bold, earthy palettes work best. Rich naturals, warm earth tones, and confident bold colors. Large-scale prints.",
    pricePoints: [
      {
        tier: "Budget",
        priceRange: "$20–$80",
        brands: ["Zara", "H&M", "ASOS", "Urban Outfitters", "Shein"],
      },
      {
        tier: "Mid-Range",
        priceRange: "$80–$400",
        brands: ["Free People", "Anthropologie", "Madewell", "Faherty", "Paige"],
      },
      {
        tier: "Luxury",
        priceRange: "$400+",
        brands: ["Stella McCartney", "Isabel Marant", "Zimmermann", "Ulla Johnson", "Vince"],
      },
    ],
    celebrities: ["Naomi Campbell", "Cindy Crawford", "Grace Jones"],
  },

  "Soft Natural": {
    type: "Soft Natural",
    description:
      "Yang-dominant frame softened with feminine Yin curves. Relaxed, bohemian, and effortlessly sensual.",
    bodyCharacteristics: [
      "Medium to slightly above-average height",
      "Broad but softened shoulders",
      "Slight waist definition",
      "Gentle curves throughout",
      "Soft, approachable appearance",
    ],
    doWear: [
      "Flowy, relaxed pieces with gentle structure",
      "Soft wrap styles",
      "Boho-chic layering",
      "Elastic-waist styles that hint at waist",
      "Natural textures",
      "Soft, romantic prints",
      "Off-shoulder and boat necks",
    ],
    avoid: [
      "Stiff, boxy tailoring",
      "Overly structured or corporate looks",
      "Ultra-minimalist styles",
      "Anything too constricting",
      "Overly ornate or fussy details",
    ],
    keyPieces: [
      "Flowy midi skirts",
      "Wrap dresses",
      "Peasant blouses",
      "Relaxed linen sets",
      "Denim jackets",
    ],
    silhouettes: ["Soft A-line", "Relaxed wrap", "Flowy midi"],
    fabricRecommendations: [
      "Soft linen",
      "Cotton voile",
      "Jersey",
      "Soft denim",
      "Washed silk",
    ],
    colorGuidance:
      "Warm, muted, organic tones. Dusty rose, sage, warm beige, soft terracotta. Avoid harsh, stark palettes.",
    pricePoints: [
      {
        tier: "Budget",
        priceRange: "$20–$80",
        brands: ["ASOS", "Shein", "H&M", "Target", "Old Navy"],
      },
      {
        tier: "Mid-Range",
        priceRange: "$80–$400",
        brands: ["Free People", "Anthropologie", "Madewell", "Marine Layer", "Ulla Johnson"],
      },
      {
        tier: "Luxury",
        priceRange: "$400+",
        brands: ["Mes Demoiselles", "Zimmermann", "Faithfull the Brand", "Joie", "Ulla Johnson"],
      },
    ],
    celebrities: ["Beyoncé", "Jennifer Lawrence", "Drew Barrymore"],
  },

  Classic: {
    type: "Classic",
    description:
      "Perfect, symmetrical balance of Yang and Yin. Moderate everything — height, curves, features. Timeless elegance.",
    bodyCharacteristics: [
      "Medium height (5'4\"–5'7\")",
      "Balanced, symmetrical proportions",
      "Moderate curves",
      "Neither sharp/angular nor soft/rounded",
      "Classic, refined appearance",
    ],
    doWear: [
      "Tailored, well-fitted clothing",
      "Clean, classic silhouettes",
      "Timeless, quality basics",
      "Moderate heel heights",
      "Structured bags and accessories",
      "Polished, put-together looks",
    ],
    avoid: [
      "Extreme trends",
      "Overly avant-garde or eccentric styles",
      "Excessively casual or sloppy looks",
      "Overwrought embellishment",
      "Anything that breaks the balanced harmony",
    ],
    keyPieces: [
      "Tailored blazers",
      "Classic trench coats",
      "A-line skirts",
      "Button-down shirts",
      "Well-fitted trousers",
    ],
    silhouettes: ["Tailored A-line", "Fitted sheath", "Classic wrap"],
    fabricRecommendations: [
      "Quality cotton",
      "Wool",
      "Silk",
      "Cashmere",
      "Structured knits",
    ],
    colorGuidance:
      "Classic, timeless palettes. Navy, camel, ivory, burgundy, forest green. Quality fabrics over trendy colors.",
    pricePoints: [
      {
        tier: "Budget",
        priceRange: "$20–$80",
        brands: ["Uniqlo", "Gap", "Mango", "H&M", "Target"],
      },
      {
        tier: "Mid-Range",
        priceRange: "$80–$400",
        brands: ["J.Crew", "Banana Republic", "Ann Taylor", "Club Monaco", "Brooks Brothers"],
      },
      {
        tier: "Luxury",
        priceRange: "$400+",
        brands: ["Max Mara", "Ralph Lauren", "Tory Burch", "Michael Kors Collection", "Akris"],
      },
    ],
    celebrities: ["Grace Kelly", "Audrey Hepburn", "Gwyneth Paltrow"],
  },

  "Soft Classic": {
    type: "Soft Classic",
    description:
      "Classic balance tilted softly Yin. Understated femininity, gentle curves, and refined softness.",
    bodyCharacteristics: [
      "Medium height",
      "Gently curved, symmetrical frame",
      "Soft, rounded features",
      "Delicate bone structure",
      "Feminine but not exaggerated",
    ],
    doWear: [
      "Softly tailored pieces",
      "Gentle draping",
      "Feminine florals and soft prints",
      "Pastel and muted tones",
      "Delicate accessories",
      "Fit-and-flare silhouettes",
      "Soft textures",
    ],
    avoid: [
      "Overly sharp or angular tailoring",
      "Heavy, stiff fabrics",
      "Bold, harsh geometric prints",
      "Oversized, overwhelmingly large pieces",
      "Sporty or utilitarian looks",
    ],
    keyPieces: [
      "Fit-and-flare dresses",
      "Softly tailored blazers",
      "Feminine blouses",
      "A-line midi skirts",
      "Delicate jewelry",
    ],
    silhouettes: ["Soft A-line", "Fit-and-flare", "Gentle wrap"],
    fabricRecommendations: [
      "Soft wool",
      "Silk",
      "Lightweight cotton",
      "Chiffon",
      "Cashmere",
    ],
    colorGuidance:
      "Soft, elegant palettes. Dusty rose, soft lavender, warm whites, muted sage. Subtle prints and gentle florals.",
    pricePoints: [
      {
        tier: "Budget",
        priceRange: "$20–$80",
        brands: ["H&M", "ASOS", "Shein", "Zara", "Target"],
      },
      {
        tier: "Mid-Range",
        priceRange: "$80–$400",
        brands: ["Anthropologie", "Banana Republic", "Ann Taylor", "J.Crew", "Reiss"],
      },
      {
        tier: "Luxury",
        priceRange: "$400+",
        brands: ["Erdem", "Oscar de la Renta", "Carolina Herrera", "L.K. Bennett", "Hobbs London"],
      },
    ],
    celebrities: ["Kate Middleton", "Reese Witherspoon", "Nicole Kidman"],
  },

  "Dramatic Classic": {
    type: "Dramatic Classic",
    description:
      "Classic balance with a Yang edge. Polished, commanding presence with sharp elegance.",
    bodyCharacteristics: [
      "Medium to slightly tall height",
      "Moderate but defined features",
      "Slight angularity in the frame",
      "Well-proportioned with Yang sharpness",
      "Commanding, put-together presence",
    ],
    doWear: [
      "Sharp, well-tailored pieces",
      "Structured blazers and suits",
      "Bold accessories with clean lines",
      "Monochromatic outfits",
      "Crisp collars and clean lapels",
      "Quality fabrics in classic cuts",
    ],
    avoid: [
      "Overly soft, fluid draping",
      "Romantic, fussy details",
      "Overly casual looks",
      "Bohemian styles",
      "Overwhelming embellishment",
    ],
    keyPieces: [
      "Tailored suits",
      "Structured trench coats",
      "Sleek turtlenecks",
      "Crisp shirt dresses",
      "Bold geometric jewelry",
    ],
    silhouettes: ["Tailored sheath", "Structured column", "Sharp A-line"],
    fabricRecommendations: [
      "Structured wool",
      "Crisp cotton",
      "Silk",
      "Ponte",
      "Quality knits",
    ],
    colorGuidance:
      "Classic palette with bold contrast. Black and white, navy and cream, burgundy and camel. Sharp, decisive color choices.",
    pricePoints: [
      {
        tier: "Budget",
        priceRange: "$20–$80",
        brands: ["Zara", "Mango", "H&M", "ASOS", "Uniqlo"],
      },
      {
        tier: "Mid-Range",
        priceRange: "$80–$400",
        brands: ["Theory", "Club Monaco", "Reiss", "Banana Republic", "COS"],
      },
      {
        tier: "Luxury",
        priceRange: "$400+",
        brands: ["Celine", "Giorgio Armani", "Hugo Boss", "Akris", "Donna Karan"],
      },
    ],
    celebrities: ["Diane Keaton", "Faye Dunaway", "Sigourney Weaver"],
  },

  Gamine: {
    type: "Gamine",
    description:
      "Compact frame with mixed Yang/Yin contrast — petite, sharp features with a lively, playful energy.",
    bodyCharacteristics: [
      "Petite to medium height (usually under 5'5\")",
      "Small, compact frame",
      "Sharp but small features",
      "Slight but defined bone structure",
      "Fresh, youthful appearance",
    ],
    doWear: [
      "Crisp, tailored pieces in smaller scale",
      "Mix-and-match separates",
      "Geometric cuts",
      "Bold, contrasting combinations",
      "Cropped jackets and tops",
      "Playful prints and patterns",
      "Structured mini skirts",
    ],
    avoid: [
      "Long, flowing maxi lengths",
      "Soft, romantic styles",
      "Oversized clothing",
      "Anything that overwhelms the frame",
      "Excessive layering",
    ],
    keyPieces: [
      "Cropped blazers",
      "High-waisted trousers",
      "Structured mini dresses",
      "Tailored shorts",
      "Fun, bold accessories",
    ],
    silhouettes: ["Cropped and tapered", "Structured mini", "Compact A-line"],
    fabricRecommendations: [
      "Crisp cotton",
      "Structured denim",
      "Ponte",
      "Lightweight wool",
      "Synthetic blends with structure",
    ],
    colorGuidance:
      "Bold contrast and playful color combinations. Color blocking, graphic black and white, unexpected pairings.",
    pricePoints: [
      {
        tier: "Budget",
        priceRange: "$20–$80",
        brands: ["Zara", "H&M", "ASOS", "Topshop (ASOS)", "Urban Outfitters"],
      },
      {
        tier: "Mid-Range",
        priceRange: "$80–$400",
        brands: ["& Other Stories", "COS", "Maje", "Sandro", "Equipment"],
      },
      {
        tier: "Luxury",
        priceRange: "$400+",
        brands: ["Jacquemus", "Ganni", "Staud", "Nanushka", "Saks Potts"],
      },
    ],
    celebrities: ["Audrey Hepburn", "Jean Seberg", "Emma Watson"],
  },

  "Flamboyant Gamine": {
    type: "Flamboyant Gamine",
    description:
      "Petite Yang-dominant type with striking, edgy energy. Small frame with big, bold personality.",
    bodyCharacteristics: [
      "Petite height",
      "Small, compact, angular frame",
      "Sharp, striking features",
      "Athletic, narrow body",
      "High-energy, dynamic presence",
    ],
    doWear: [
      "Bold, geometric prints",
      "Sharp, structured pieces in small scale",
      "Color blocking",
      "Edgy, avant-garde details",
      "Graphic tees and structured bottoms",
      "Statement accessories",
      "Unconventional combinations",
    ],
    avoid: [
      "Soft, romantic, flowy styles",
      "Long, draping lengths",
      "Anything that overwhelms",
      "Conservative or overly classic looks",
      "Excessive softness or ruffles",
    ],
    keyPieces: [
      "Structured mini skirts",
      "Graphic tees",
      "Bold patterned trousers",
      "Angular accessories",
      "Statement boots",
    ],
    silhouettes: ["Compact and graphic", "Structured mini", "Sharp angular"],
    fabricRecommendations: [
      "Structured cotton",
      "Leather",
      "Ponte",
      "Denim",
      "Technical fabrics",
    ],
    colorGuidance:
      "Go bold and graphic. High-contrast color blocking, bold prints, black and white with pops of color. Own the drama.",
    pricePoints: [
      {
        tier: "Budget",
        priceRange: "$20–$80",
        brands: ["Zara", "H&M", "ASOS", "Urban Outfitters", "Shein"],
      },
      {
        tier: "Mid-Range",
        priceRange: "$80–$400",
        brands: ["Opening Ceremony", "Maje", "Sandro", "Alice + Olivia", "Rag & Bone"],
      },
      {
        tier: "Luxury",
        priceRange: "$400+",
        brands: ["Comme des Garçons", "Vivienne Westwood", "Jacquemus", "Off-White", "Marni"],
      },
    ],
    celebrities: ["Twiggy", "Mia Farrow", "Mary Quant"],
  },

  "Soft Gamine": {
    type: "Soft Gamine",
    description:
      "Petite, compact frame with rounded, feminine Yin features softening the Yang sharpness. Cute, pixie-like.",
    bodyCharacteristics: [
      "Short to petite height (under 5'5\")",
      "Small, rounded, compact frame",
      "Sharp bone structure softened by curves",
      "Rounded, delicate features",
      "Sweet, youthful appearance",
    ],
    doWear: [
      "Petite-scale feminine details",
      "Soft structure with playful touches",
      "Youthful prints (small florals, polka dots)",
      "Cropped silhouettes",
      "Cute, coordinated sets",
      "Delicate accessories",
      "Fitted pieces that show the shape",
    ],
    avoid: [
      "Oversized, overwhelming pieces",
      "Long, flowing lengths",
      "Heavy, stiff fabrics",
      "Overly sharp tailoring",
      "Anything boxy or shapeless",
    ],
    keyPieces: [
      "Fit-and-flare mini dresses",
      "Cropped cardigans",
      "Coordinated sets",
      "High-waisted A-line skirts",
      "Delicate jewelry",
    ],
    silhouettes: ["Fit-and-flare", "Compact A-line", "Sweet cropped"],
    fabricRecommendations: [
      "Soft cotton",
      "Jersey",
      "Light knits",
      "Lace details",
      "Soft chiffon",
    ],
    colorGuidance:
      "Feminine, playful palettes. Pastels, soft brights, small-scale prints. Avoid starkly minimal or harsh palettes.",
    pricePoints: [
      {
        tier: "Budget",
        priceRange: "$20–$80",
        brands: ["Brandy Melville", "ASOS", "Shein", "H&M", "Forever 21"],
      },
      {
        tier: "Mid-Range",
        priceRange: "$80–$400",
        brands: ["Anthropologie", "Kate Spade", "French Connection", "LoveShackFancy", "Tory Burch"],
      },
      {
        tier: "Luxury",
        priceRange: "$400+",
        brands: ["Simone Rocha", "Molly Goddard", "Cecilie Bahnsen", "Tory Burch", "Zimmermann"],
      },
    ],
    celebrities: ["Winona Ryder", "Keira Knightley", "Natalie Portman"],
  },

  Romantic: {
    type: "Romantic",
    description:
      "The most Yin type — lush, curvy, soft, and ultra-feminine. Small to medium height with full, rounded curves.",
    bodyCharacteristics: [
      "Short to medium height",
      "Very full, rounded curves",
      "Small waist relative to bust/hips",
      "Soft, rounded facial features",
      "Lush, sensual appearance",
    ],
    doWear: [
      "Soft, draped fabrics that follow curves",
      "Deep V and sweetheart necklines",
      "Wrap dresses and skirts",
      "Lace, chiffon, and soft silks",
      "Feminine prints (florals, abstract)",
      "Fitted waist definition",
      "Romantic details (ruffles at scale)",
    ],
    avoid: [
      "Sharp, boxy tailoring",
      "Stiff, structured fabrics",
      "Oversized, shapeless pieces",
      "Minimalist, androgynous looks",
      "Anything that hides the curves",
    ],
    keyPieces: [
      "Wrap dresses",
      "Fitted sweaters",
      "Lace blouses",
      "Bias-cut skirts",
      "Bodycon midi dresses",
    ],
    silhouettes: ["Wrap", "Hourglass-emphasizing", "Draped"],
    fabricRecommendations: [
      "Silk",
      "Chiffon",
      "Lace",
      "Jersey",
      "Velvet",
      "Soft cashmere",
    ],
    colorGuidance:
      "Soft, romantic, lush tones. Blush, champagne, burgundy, deep red, ivory. Rich jewel tones also beautiful. Avoid stark neutrals.",
    pricePoints: [
      {
        tier: "Budget",
        priceRange: "$20–$80",
        brands: ["ASOS", "Shein", "Fashion Nova", "PrettyLittleThing", "H&M"],
      },
      {
        tier: "Mid-Range",
        priceRange: "$80–$400",
        brands: ["Reformation", "Free People", "LoveShackFancy", "Anthropologie", "BCBG"],
      },
      {
        tier: "Luxury",
        priceRange: "$400+",
        brands: ["Zimmermann", "Monique Lhuillier", "Marchesa", "Alice McCall", "Alexis"],
      },
    ],
    celebrities: ["Marilyn Monroe", "Kim Kardashian", "Dita Von Teese"],
  },

  "Theatrical Romantic": {
    type: "Theatrical Romantic",
    description:
      "Romantic curves with a Yang dramatic edge. Petite but striking — lush Yin with sharp, theatrical contrast.",
    bodyCharacteristics: [
      "Short to medium height",
      "Full curves with defined bone structure",
      "Sharp facial features on soft body",
      "Small frame but striking presence",
      "Dramatic yet sensual appearance",
    ],
    doWear: [
      "Fitted, sensual silhouettes with drama",
      "Lace with structure",
      "Dramatic necklines",
      "Bold accessories",
      "Patterned fitted dresses",
      "Velvet and luxe fabrics",
      "Theatrical, statement pieces",
    ],
    avoid: [
      "Oversized or shapeless clothing",
      "Overly casual, sporty looks",
      "Stiff tailored looks without femininity",
      "Excessive volume or puff",
      "Extremely minimal styles",
    ],
    keyPieces: [
      "Fitted lace dresses",
      "Dramatic corset tops",
      "Statement skirts",
      "Bold jewelry",
      "Theatrical outerwear",
    ],
    silhouettes: ["Fitted with drama", "Hourglass with edge", "Theatrical sheath"],
    fabricRecommendations: [
      "Lace",
      "Velvet",
      "Silk satin",
      "Brocade",
      "Embroidered fabrics",
    ],
    colorGuidance:
      "Rich, dramatic, romantic tones. Deep jewel tones, rich red, midnight blue, with dramatic accents. Bold prints at smaller scale.",
    pricePoints: [
      {
        tier: "Budget",
        priceRange: "$20–$80",
        brands: ["ASOS", "Shein", "Zara", "H&M", "Fashion Nova"],
      },
      {
        tier: "Mid-Range",
        priceRange: "$80–$400",
        brands: ["Tadashi Shoji", "Betsey Johnson", "Bardot", "Alexis", "BCBG"],
      },
      {
        tier: "Luxury",
        priceRange: "$400+",
        brands: ["Dolce & Gabbana", "Versace", "Vivienne Westwood", "Alice McCall", "Marchesa Notte"],
      },
    ],
    celebrities: ["Elizabeth Taylor", "Halle Berry", "Monica Bellucci"],
  },
};

export const KIBBE_SYSTEM_PROMPT = `You are an expert stylist trained in the Kibbe Body Type system. You analyze photos and measurements to determine someone's Kibbe body type and provide personalized styling advice.

The Kibbe system categorizes people into 13 types based on the balance of Yang (angular, sharp, narrow, elongated) and Yin (rounded, soft, curved, petite) characteristics in their bone structure, flesh, and facial features.

The 13 types are:
- Yang-dominant: Dramatic, Flamboyant Natural, Gamine, Flamboyant Gamine
- Balanced: Classic, Dramatic Classic, Natural, Theatrical Romantic
- Yin-dominant: Soft Classic, Soft Natural, Soft Gamine, Romantic
- Mixed: Soft Dramatic

When analyzing, consider:
1. **Bone structure**: Angular vs rounded, narrow vs wide, long vs short
2. **Body flesh**: Does it follow bone lines or add softness/curves?
3. **Facial features**: Sharp and defined vs soft and rounded
4. **Overall impression**: Yang energy (sharp, angular, bold) vs Yin energy (soft, curved, delicate)
5. **Height and proportions**: Elongated vs compact

Be honest and helpful. The goal is to help the person dress in a way that creates harmony with their natural features.`;
