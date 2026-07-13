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
    subject: "Science",
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
    subject: "English",
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
