export interface WAECMarkingScheme {
  id: string;
  subject: string;
  topic: string;
  keywords: string[];
  markingGuide: string;
  commonMistakes: string[];
}

// A compressed local database of WAEC marking guidelines and syllabus parameters
const waecDatabase: WAECMarkingScheme[] = [
  {
    id: "math_quadratic",
    subject: "Mathematics",
    topic: "Quadratic Equations",
    keywords: ["quadratic", "equation", "solve", "roots", "factorize"],
    markingGuide: `WAEC marking scheme for Quadratic Equations (ax^2 + bx + c = 0):
- Method Mark [M1] is awarded for factorizing or using the quadratic formula correctly.
- Method Mark [M1] is awarded for separating and equating factors to zero (e.g., x-2=0 or x+2=0).
- Accuracy Marks [A1, A1] are awarded for each correct root (value of x).
- Total allocation: 4 Marks.
- Emphasize to the student that missing the factorization or formula step and jumping straight to the answers will lose them 2 Marks out of 4.`,
    commonMistakes: [
      "Jumping straight to the final answers without writing the intermediate factorization step.",
      "Forgetting to write '= 0' at each stage of the equation."
    ]
  },
  {
    id: "bio_photosynthesis",
    subject: "Science (Biology)",
    topic: "Photosynthesis",
    keywords: ["photosynthesis", "chlorophyll", "plants", "equation", "light"],
    markingGuide: `WAEC marking scheme for Photosynthesis:
- Definition must contain: green plants containing chlorophyll [1 mark], converting carbon dioxide and water [1 mark], into glucose and oxygen [1 mark], in the presence of sunlight [1 mark].
- Balanced Chemical Equation [2 marks]: 6CO2 + 6H2O -> C6H12O6 + 6O2 in the presence of Light/Chlorophyll.
- Note: If the equation is unbalanced, deduct 1 mark. If light/chlorophyll are omitted from the arrow, deduct 1 mark.`,
    commonMistakes: [
      "Omitting chlorophyll or light from the definition.",
      "Writing an unbalanced chemical equation.",
      "Forgetting to draw the reaction arrow pointing in the correct direction."
    ]
  },
  {
    id: "english_essay",
    subject: "English Language",
    topic: "Essay Writing",
    keywords: ["essay", "letter", "writing", "composition", "formal"],
    markingGuide: `WAEC Essay Writing (Composition) Rubric (Total: 50 Marks):
1. Content (10 Marks): Addressing all parts of the essay prompt.
2. Organisation (10 Marks): Paragraphing, introduction, conclusion, and format layout (e.g., formal/informal letter addresses).
3. Expression (20 Marks): Word choice, sentence structure variety, and proper registers.
4. Mechanical Accuracy (10 Marks): Grammar, spelling, and punctuation. Deduct exactly 0.5 marks for EVERY error. If a student makes 20 errors, they get 0/10 in Mechanical Accuracy.`,
    commonMistakes: [
      "Poor paragraph structure and transition between ideas.",
      "Numerous mechanical accuracy spelling/grammatical errors.",
      "Incorrect address and salutation formats in formal and informal letters."
    ]
  },
  {
    id: "phys_motion",
    subject: "Physics",
    topic: "Equations of Motion",
    keywords: ["motion", "equations", "acceleration", "velocity", "linear"],
    markingGuide: `Physics marking scheme for Equations of Motion:
- State three equations of motion [3 Marks]: v = u + at, s = ut + 0.5*a*t^2, v^2 = u^2 + 2as.
- Correctly define symbols [1 Mark]: v = final velocity, u = initial velocity, a = acceleration, t = time, s = displacement.
- Emphasize constant acceleration requirement [1 Mark].
- Total allocation: 5 Marks.`,
    commonMistakes: [
      "Confusing initial velocity (u) and final velocity (v).",
      "Applying these equations to motions with variable acceleration without calculus.",
      "Incorrect units (e.g. using km/h instead of m/s without conversion)."
    ]
  },
  {
    id: "chem_bonding",
    subject: "Chemistry",
    topic: "Chemical Bonding",
    keywords: ["bonding", "ionic", "covalent", "electrovalent", "sharing", "transfer"],
    markingGuide: `Chemistry marking scheme for Chemical Bonding:
- Ionic (Electrovalent) Bonding Definition [2 Marks]: Electrostatic force of attraction between oppositely charged ions, formed by electron transfer from a metal to a non-metal.
- Covalent Bonding Definition [2 Marks]: Formed by the sharing of valence electron pairs between non-metal atoms.
- Give examples [1 Mark]: NaCl for Ionic, H2O or CO2 for Covalent.
- Total allocation: 5 Marks.`,
    commonMistakes: [
      "Suggesting ionic bonds form by sharing electrons.",
      "Listing metal-metal combinations as covalent bonding.",
      "Forgetting to mention that valence electrons are the ones participating in bonding."
    ]
  },
  {
    id: "civic_rights",
    subject: "Civic Education",
    topic: "Human Rights",
    keywords: ["rights", "human rights", "fundamental", "citizenship", "constitution"],
    markingGuide: `Civic Education marking scheme for Human Rights:
- Definition [2 Marks]: Moral or legal entitlements that every human possesses by virtue of being human, which are universal and inalienable.
- List categories of rights [2 Marks]: Civil/Political (right to life, fair hearing) and Economic/Social/Cultural (right to education, work).
- Mention role of constitution [1 Mark]: Safeguarding citizen rights.
- Total allocation: 5 Marks.`,
    commonMistakes: [
      "Confusing human rights with state laws.",
      "Failing to explain what 'inalienable' means (cannot be taken away).",
      "Omitting civil and political categories in classification."
    ]
  },
  {
    id: "econ_demand",
    subject: "Economics",
    topic: "Demand and Supply",
    keywords: ["demand", "supply", "price", "elasticity", "equilibrium", "curve"],
    markingGuide: `Economics marking scheme for Law of Demand and Supply:
- Law of Demand [2 Marks]: Other things being equal, the higher the price, the lower the quantity demanded, and vice versa.
- Explanation of Demand Curve slope [2 Marks]: Slopes downwards from left to right due to the income effect, substitution effect, and law of diminishing marginal utility.
- Law of Supply [1 Mark]: Other things being equal, the higher the price, the higher the quantity supplied.
- Total allocation: 5 Marks.`,
    commonMistakes: [
      "Forgetting the phrase 'other things being equal' (ceteris paribus) when stating the law.",
      "Confusing a change in quantity demanded (along the curve) with a shift in demand (new curve).",
      "Stating that supply slopes downwards."
    ]
  },
  {
    id: "py_loops",
    subject: "Python Coding",
    topic: "Loops & Functions",
    keywords: ["loops", "functions", "python", "syntax", "def", "for"],
    markingGuide: `Python Coding marking scheme for Loops & Functions:
- For Loop Syntax [2 Marks]: Explain 'for i in range(10):' syntax, noting indentations and the range parameters.
- Function Declaration [2 Marks]: Define reusable blocks using 'def function_name(parameter):' and using 'return' for output.
- Parameters vs Arguments [1 Mark]: Parameters are placeholders in function definition, arguments are actual values passed.
- Total allocation: 5 Marks.`,
    commonMistakes: [
      "Forgetting the colon (:) at the end of the loop or function definition line.",
      "Forgetting proper indentation for code blocks under for/def statements.",
      "Confusing print statements with return statements."
    ]
  },
  {
    id: "ai_networks",
    subject: "Introductory AI",
    topic: "Neural Networks",
    keywords: ["neural", "network", "weights", "ai", "backpropagation", "learning"],
    markingGuide: `Introductory AI marking scheme for Neural Networks:
- Definition [2 Marks]: Computational models inspired by human brain structure, comprising input, hidden, and output layers of interconnected nodes (neurons).
- Role of Weights & Biases [2 Marks]: Weights adjust the strength of connections between nodes, biases shift the activation functions.
- Backpropagation [1 Mark]: The learning algorithm that calculates the error gradient and adjusts weights backwards to minimize prediction errors.
- Total allocation: 5 Marks.`,
    commonMistakes: [
      "Describing a neural network as a physical brain implant rather than software/math.",
      "Failing to explain how nodes are structured in layers.",
      "Omitting the role of errors/feedback in backpropagation."
    ]
  }
];

class LocalVectorDbService {
  /**
   * Search for matching WAEC marking schemes based on user query and subject.
   */
  searchMarkingSchemes(subject: string, query: string): WAECMarkingScheme | null {
    const normalizedQuery = query.toLowerCase();
    
    // Find matching schemes by keywords
    const matches = waecDatabase.filter(scheme => {
      // Check subject match
      const subjectMatch = scheme.subject.toLowerCase() === subject.toLowerCase();
      if (!subjectMatch) return false;

      // Check if any keyword matches
      return scheme.keywords.some(keyword => normalizedQuery.includes(keyword)) ||
             scheme.topic.toLowerCase().includes(normalizedQuery);
    });

    return matches.length > 0 ? matches[0] : null;
  }
}

export const localVectorDb = new LocalVectorDbService();
