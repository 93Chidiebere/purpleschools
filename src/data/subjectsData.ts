// PurpleSchool Dual-Stream Curriculum Database (JSS & SSS)

export interface Topic {
  id: string;
  title: string;
  juniorDesc?: string;
  seniorDesc?: string;
  juniorGreeting?: string;
  seniorGreeting?: string;
  juniorMarkingGuide?: string;
  seniorMarkingGuide?: string;
  studyNotes: {
    concept: string;
    formulas: string[];
    steps: string[];
    workedExample: string;
  };
}

export interface Subject {
  id: string;
  name: string;
  topics: Topic[];
}

// ----------------------------------------------------
// 1. JUNIOR SECONDARY SCHOOL (JSS) SUBJECTS DATABASE
// ----------------------------------------------------
export const jssSubjectsData: Record<string, Subject> = {
  math: {
    id: "math",
    name: "Mathematics (JSS)",
    topics: [
      {
        id: "fractions",
        title: "Fractions & Decimals",
        juniorDesc: "Learn how to add, subtract, multiply, and divide fractions and decimals.",
        juniorGreeting: "Hi Teacher! 👋 I am trying to add 1/2 and 1/3, but my friend says I should just add the tops to get 2/5. Is that correct? How do I find a common denominator?",
        juniorMarkingGuide: "JSS Math Fractions: Find the Lowest Common Multiple (LCM) of denominators [2 Marks]. Convert numerators correctly [1 Mark]. Add numerators and simplify [1 Mark].",
        studyNotes: {
          concept: "To add or subtract fractions with different denominators, you must first convert them to equivalent fractions with the same denominator using the Lowest Common Multiple (LCM).",
          formulas: [
            "\\text{Equivalent Fraction: } \\frac{a}{b} = \\frac{a \\times k}{b \\times k}",
            "\\frac{a}{b} + \\frac{c}{d} = \\frac{(a \\times d) + (b \\times c)}{b \\times d}"
          ],
          steps: [
            "Find the Least Common Denominator (LCM of the denominators).",
            "Rewrite each fraction with the common denominator.",
            "Add or subtract the numerators while keeping the denominator the same.",
            "Simplify the resulting fraction if possible."
          ],
          workedExample: "Problem: Calculate 1/2 + 1/3.\n\nSolution:\n1. The denominators are 2 and 3. The LCM of 2 and 3 is 6.\n2. Convert 1/2: Multiply top and bottom by 3 -> 3/6.\n3. Convert 1/3: Multiply top and bottom by 2 -> 2/6.\n4. Add: 3/6 + 2/6 = (3 + 2)/6 = 5/6.\nAnswer: 5/6"
        }
      },
      {
        id: "lcm_hcf",
        title: "LCM & HCF",
        juniorDesc: "Find the Lowest Common Multiple and Highest Common Factor of numbers.",
        juniorGreeting: "Good day, Teacher! I have the numbers 12 and 18. What is the difference between HCF and LCM, and how do I find them using prime factors?",
        juniorMarkingGuide: "JSS Math LCM & HCF: List prime factors of both numbers [2 Marks]. Find HCF by multiplying common factors [1 Mark]. Find LCM by multiplying all factors with highest powers [1 Mark].",
        studyNotes: {
          concept: "The Highest Common Factor (HCF) is the largest number that divides two or more numbers exactly. The Lowest Common Multiple (LCM) is the smallest positive integer that is divisible by all numbers.",
          formulas: [
            "\\text{HCF} = \\text{product of common prime factors with lowest powers}",
            "\\text{LCM} = \\text{product of all prime factors with highest powers}"
          ],
          steps: [
            "Express each number as a product of prime factors.",
            "For HCF, identify factors common to all numbers and multiply their lowest powers.",
            "For LCM, multiply the highest powers of all prime factors present."
          ],
          workedExample: "Problem: Find HCF and LCM of 12 and 18.\n\nSolution:\n1. Prime factors:\n   12 = 2^2 * 3\n   18 = 2 * 3^2\n2. HCF: Common factors with lowest power -> 2^1 * 3^1 = 6.\n3. LCM: All factors with highest power -> 2^2 * 3^2 = 4 * 9 = 36.\nAnswer: HCF = 6, LCM = 36"
        }
      },
      {
        id: "simple_interest",
        title: "Simple Interest",
        juniorDesc: "Calculate Simple Interest, Principal, Rate, and Time.",
        juniorGreeting: "Hello Teacher! 💰 If I borrow ₦10,000 at a 5% interest rate for 2 years, how do I calculate the interest I have to pay? What does Principal mean?",
        juniorMarkingGuide: "JSS Math Simple Interest: State formula I = PRT/100 [1 Mark]. Substitute Principal, Rate, and Time [2 Marks]. Calculate correct interest [1 Mark].",
        studyNotes: {
          concept: "Simple Interest is the money paid or earned for borrowing or lending money, calculated as a percentage of the original principal amount over time.",
          formulas: [
            "I = \\frac{P \\times R \\times T}{100}",
            "A = P + I"
          ],
          steps: [
            "Identify P (Principal), R (Rate in percentage), and T (Time in years).",
            "Substitute these values into the simple interest formula.",
            "Solve for Interest (I).",
            "Add Interest to Principal to find the Total Amount (A) if required."
          ],
          workedExample: "Problem: Find the simple interest on ₦5,000 for 3 years at 4% per annum.\n\nSolution:\n1. Identify: P = 5000, R = 4, T = 3.\n2. Formula: I = (P * R * T) / 100\n3. Calculate: I = (5000 * 4 * 3) / 100 = 60000 / 100 = 600.\nAnswer: Simple Interest = ₦600"
        }
      },
      {
        id: "angles",
        title: "Angles & Triangles",
        juniorDesc: "Understand angles on a straight line, parallel lines, and sum of angles in a triangle.",
        juniorGreeting: "Hi Teacher! I am looking at a triangle. Why do the three inside angles always add up to 180 degrees? Can you prove it or show me?",
        juniorMarkingGuide: "JSS Math Angles: State sum of angles in a triangle is 180 degrees [2 Marks]. Use equation to solve for unknown angle [2 Marks].",
        studyNotes: {
          concept: "An angle is formed when two lines meet. Angles on a straight line add up to 180°, and the interior angles of any triangle always sum to 180°.",
          formulas: [
            "\\angle A + \\angle B + \\angle C = 180^\\circ \\quad \\text{(Sum in Triangle)}",
            "x + y = 180^\\circ \\quad \\text{(Angles on a straight line)}"
          ],
          steps: [
            "Identify known angles in the triangle or on the line.",
            "Write an equation summing angles to 180°.",
            "Subtract the sum of known angles from 180° to find the unknown angle."
          ],
          workedExample: "Problem: In triangle ABC, angle A = 50° and angle B = 70°. Find angle C.\n\nSolution:\n1. Equation: A + B + C = 180\n2. Substitute: 50 + 70 + C = 180\n3. Solve: 120 + C = 180 -> C = 180 - 120 = 60.\nAnswer: Angle C = 60°"
        }
      },
      {
        id: "perimeter_area",
        title: "Area & Perimeter of Shapes",
        juniorDesc: "Calculate the perimeter and area of basic shapes: squares, rectangles, and triangles.",
        juniorGreeting: "Hello Teacher! I have a rectangle with length 8cm and width 5cm. How do I find its perimeter and area? Are the units different?",
        juniorMarkingGuide: "JSS Math Area & Perimeter: State correct formulas for rectangle [2 Marks]. Compute perimeter with cm unit [1 Mark]. Compute area with cm² unit [1 Mark].",
        studyNotes: {
          concept: "Perimeter is the total boundary length of a shape (measured in linear units like cm). Area is the total surface space inside the shape (measured in square units like cm²).",
          formulas: [
            "\\text{Rectangle Perimeter} = 2(L + W)",
            "\\text{Rectangle Area} = L \\times W",
            "\\text{Triangle Area} = \\frac{1}{2} \\times B \\times H"
          ],
          steps: [
            "Identify lengths of the base, height, length, or width from the shape.",
            "Apply the correct perimeter formula (add all side lengths).",
            "Apply the correct area formula (multiply appropriate sides).",
            "Ensure units are in cm for perimeter and cm² for area."
          ],
          workedExample: "Problem: A rectangle is 6cm long and 4cm wide. Find its perimeter and area.\n\nSolution:\n1. Perimeter = 2 * (L + W) = 2 * (6 + 4) = 2 * 10 = 20cm.\n2. Area = L * W = 6 * 4 = 24cm².\nAnswer: Perimeter = 20cm, Area = 24cm²"
        }
      },
      {
        id: "statistics",
        title: "Statistics (Mean, Median, Mode)",
        juniorDesc: "Calculate average values: mean, median, and mode for a set of simple data.",
        juniorGreeting: "Good day, Teacher! 📊 I have this list of test marks: 5, 8, 5, 6, 10. How do I calculate the Mean, Median, and Mode? When is one better than the other?",
        juniorMarkingGuide: "JSS Math Statistics: Calculate Mean by dividing sum by count [2 Marks]. Arrange data and locate Median [1 Mark]. Identify highest frequency Mode [1 Mark].",
        studyNotes: {
          concept: "Mean is the numerical average. Median is the middle number when data is arranged in ascending order. Mode is the number that appears most frequently.",
          formulas: [
            "\\text{Mean } (\\bar{x}) = \\frac{\\sum x}{n}",
            "\\text{Median} = \\text{middle value of sorted list}"
          ],
          steps: [
            "For Mean: Add all values together and divide by total number of values.",
            "For Median: Sort data from lowest to highest. If odd count, take the center. If even, average the two middle values.",
            "For Mode: Find the value that occurs most often."
          ],
          workedExample: "Problem: Find mean, median, and mode of: 3, 7, 3, 5, 2.\n\nSolution:\n1. Sorted list: 2, 3, 3, 5, 7. Count (n) = 5.\n2. Mean = (2 + 3 + 3 + 5 + 7) / 5 = 20 / 5 = 4.\n3. Median = middle value (3rd item) = 3.\n4. Mode = most frequent number = 3.\nAnswer: Mean=4, Median=3, Mode=3"
        }
      },
      {
        id: "algebra",
        title: "Basic Algebra",
        juniorDesc: "Learn how to simplify expressions using letters like x and y.",
        juniorGreeting: "Hi Teacher! I see expressions like 3x + 2y + x - y. Why can't I just add everything together to get 5xy? What are like terms?",
        juniorMarkingGuide: "JSS Math Algebra: Group like terms correctly [2 Marks]. Add/subtract coefficients of like terms [2 Marks].",
        studyNotes: {
          concept: "Algebra uses symbols/letters to represent numbers. In algebraic expressions, you can only combine 'like terms' (terms that have identical variables).",
          formulas: [
            "a \\cdot x + b \\cdot x = (a + b)x",
            "x + x = 2x \\quad \\text{but} \\quad x + y \\text{ cannot be simplified}"
          ],
          steps: [
            "Group terms containing the same variables together.",
            "Group constant numbers together.",
            "Add or subtract the coefficients of the grouped like terms.",
            "Write down the simplified final expression."
          ],
          workedExample: "Problem: Simplify: 4a + 5b - 2a + b.\n\nSolution:\n1. Group 'a' terms: 4a - 2a = 2a.\n2. Group 'b' terms: 5b + b = 6b.\n3. Combine: 2a + 6b.\nAnswer: 2a + 6b"
        }
      },
      {
        id: "linear_equations",
        title: "Linear Equations",
        juniorDesc: "Solve simple equations where x is to be found, e.g., 2x + 5 = 15.",
        juniorGreeting: "Good day, Teacher! 🔑 I'm trying to solve 3x - 4 = 11. My textbook says I should add 4 to both sides. Why do we do the opposite operations to solve for x?",
        juniorMarkingGuide: "JSS Math Linear Equations: Add/subtract constant from both sides [2 Marks]. Divide both sides by coefficient of x [2 Marks].",
        studyNotes: {
          concept: "Solving an equation means finding the value of the variable that makes the equation true. We isolate the variable by performing inverse operations on both sides of the equal sign.",
          formulas: [
            "ax + b = c \\implies ax = c - b \\implies x = \\frac{c - b}{a}"
          ],
          steps: [
            "Isolate the variable term by adding/subtracting constants on both sides.",
            "Isolate the variable itself by multiplying/dividing coefficients on both sides.",
            "Verify your answer by substituting it back into the original equation."
          ],
          workedExample: "Problem: Solve 3x - 5 = 10.\n\nSolution:\n1. Add 5 to both sides: 3x = 10 + 5 -> 3x = 15.\n2. Divide both sides by 3: x = 15 / 3 -> x = 5.\nAnswer: x = 5"
        }
      },
      {
        id: "probability_intro",
        title: "Intro to Probability",
        juniorDesc: "Learn the chance of an event happening using fractions from 0 to 1.",
        juniorGreeting: "Hello Teacher! 🎲 If I roll a normal 6-sided die, what is the probability of rolling an even number? How do I calculate this as a fraction?",
        juniorMarkingGuide: "JSS Math Probability: Count successful outcomes [1 Mark]. Count total possible outcomes [1 Mark]. Write fraction and simplify [2 Marks].",
        studyNotes: {
          concept: "Probability is the measure of the likelihood that an event will occur, calculated as the ratio of favorable outcomes to the total number of possible outcomes.",
          formulas: [
            "P(\\text{Event}) = \\frac{\\text{Number of Favorable Outcomes}}{\\text{Total Number of Possible Outcomes}}"
          ],
          steps: [
            "List all possible outcomes (sample space) and count them.",
            "Identify the outcomes that meet your event criteria (favorable outcomes) and count them.",
            "Create a fraction with favorable outcomes on top and total outcomes on the bottom.",
            "Simplify the fraction to its lowest terms."
          ],
          workedExample: "Problem: A bag contains 3 red balls and 5 blue balls. If a ball is picked at random, what is the probability it is red?\n\nSolution:\n1. Favorable outcomes (red balls) = 3.\n2. Total outcomes (total balls) = 3 + 5 = 8.\n3. Probability = 3 / 8.\nAnswer: P(Red) = 3/8"
        }
      },
      {
        id: "binary_numbers",
        title: "Binary Number System",
        juniorDesc: "Understand base-2 numbers using 0 and 1 and convert base-10 to binary.",
        juniorGreeting: "Hi Teacher! 💻 We are learning computer binary codes. How do I convert the normal number 13 into binary? Why do computers use base 2?",
        juniorMarkingGuide: "JSS Math Binary: Divide repeatedly by 2 [2 Marks]. Record remainders [1 Mark]. Read remainders from bottom to top [1 Mark].",
        studyNotes: {
          concept: "The binary number system is a base-2 system that uses only two digits: 0 and 1. Computers use it because transistors can be in two states: off (0) or on (1).",
          formulas: [
            "\\text{Base 10 representation: } d_n \\cdot 2^n + \\dots + d_0 \\cdot 2^0"
          ],
          steps: [
            "Divide the decimal number by 2.",
            "Write down the remainder (which will be 0 or 1).",
            "Divide the quotient by 2 again and record the remainder.",
            "Repeat until the quotient is 0.",
            "Write the remainders in reverse order (bottom to top) to get the binary number."
          ],
          workedExample: "Problem: Convert 9 (base 10) to binary.\n\nSolution:\n1. 9 / 2 = 4 remainder 1\n2. 4 / 2 = 2 remainder 0\n3. 2 / 2 = 1 remainder 0\n4. 1 / 2 = 0 remainder 1\n5. Read remainders bottom to top: 1, 0, 0, 1.\nAnswer: 1001 in binary (base 2)"
        }
      }
    ]
  },
  science: {
    id: "science",
    name: "Basic Science (JSS)",
    topics: [
      {
        id: "living_things",
        title: "Living & Non-Living Things",
        juniorDesc: "Learn characteristics of living things: MR NIGER D (Movement, Respiration, Nutrition, etc.).",
        juniorGreeting: "Hello Teacher! 🌱 I'm learning about characteristics of living things. My book says there is a mnemonic 'MR NIGER D'. What does each letter stand for, and how does a plant show movement?",
        juniorMarkingGuide: "JSS Science Living Things: Define living vs non-living [1 Mark]. Explain MR NIGER D letters [2 Marks]. Give example of plant movement (phototropism/sleep movements) [1 Mark].",
        studyNotes: {
          concept: "Living things possess life, exhibit cellular organization, and carry out life processes. Non-living things do not perform these life processes.",
          formulas: [],
          steps: [
            "Lorem Ipsum placeholders removed. Memorize MR NIGER D: Movement, Respiration, Nutrition, Irritability (Sensitivity), Growth, Excretion, Reproduction, Death.",
            "Provide evidence of these processes in plants (e.g. roots grow towards water, leaves grow towards light)."
          ],
          workedExample: "Question: List 4 characteristics of living things and give one example of irritability in plants.\n\nAnswer:\n1. Characteristics: Nutrition, Growth, Reproduction, Movement.\n2. Irritability in plants: The Mimosa pudica plant folds its leaves immediately when touched. Another example is phototropism, where plants bend towards sunlight."
        }
      },
      {
        id: "cells_basic",
        title: "Plant & Animal Cells (Basic)",
        juniorDesc: "Identify basic cell components: cell wall, cell membrane, nucleus, and cytoplasm.",
        juniorGreeting: "Good day, Teacher! 🔬 I am studying basic cells. What is the difference between a plant cell and an animal cell? Why do only plant cells have a cell wall?",
        juniorMarkingGuide: "JSS Science Cells: State cell is basic unit of life [1 Mark]. List 3 differences (cell wall, chloroplast, shape) [2 Marks]. Name nucleus function [1 Mark].",
        studyNotes: {
          concept: "A cell is the basic structural and functional unit of all living organisms. Plant cells have rigid cell walls and chloroplasts for photosynthesis, while animal cells have flexible cell membranes.",
          formulas: [],
          steps: [
            "Identify the nucleus (brain of the cell, contains DNA).",
            "Identify the cytoplasm (jelly-like fluid where reactions occur).",
            "State differences: Plant cells have a cell wall, chloroplasts, and a large central vacuole; animal cells do not."
          ],
          workedExample: "Question: Draw comparison table between plant and animal cells.\n\nAnswer:\nFeature | Plant Cell | Animal Cell\nCell Wall | Present | Absent\nChloroplast | Present | Absent\nVacuole | Large, Central | Small, Scattered\nShape | Fixed, Rectangular | Irregular, Circular"
        }
      },
      {
        id: "digestive_system",
        title: "Human Digestive System",
        juniorDesc: "Learn how food is broken down in the mouth, stomach, and intestines.",
        juniorGreeting: "Hi Teacher! 🍎 When I eat bread, how does my body digest it? What is the role of saliva in the mouth, and where is the food absorbed into my blood?",
        juniorMarkingGuide: "JSS Science Digestion: Trace food path (mouth, esophagus, stomach, small intestine, large intestine) [2 Marks]. Explain salivary amylase function [1 Mark]. State small intestine role [1 Mark].",
        studyNotes: {
          concept: "Digestion is the breakdown of large insoluble food molecules into small water-soluble food molecules that can be absorbed into the blood plasma.",
          formulas: [],
          steps: [
            "Mouth: Mechanical chewing and chemical breakdown of starch by saliva enzymes.",
            "Stomach: Mixing food with hydrochloric acid and enzymes to digest protein.",
            "Small Intestine: Complete digestion and absorption of nutrients into the bloodstream.",
            "Large Intestine: Absorption of water and elimination of waste."
          ],
          workedExample: "Question: What happens to a piece of yam (carbohydrate) in the mouth and small intestine during digestion?\n\nAnswer:\n1. In the mouth, teeth chew the yam (mechanical digestion) and saliva (salivary amylase) breaks down complex starch into simpler sugar (chemical digestion).\n2. In the small intestine, pancreatic enzymes complete the breakdown of carbohydrate into glucose, which is then absorbed through the villi walls into the blood."
        }
      },
      {
        id: "light_energy",
        title: "Light Energy & Reflection",
        juniorDesc: "Learn about light travels in straight lines and the laws of reflection.",
        juniorGreeting: "Hello, Teacher! 💡 How does light travel? When I look into a mirror, why does my left hand appear as the right hand? What is the law of reflection?",
        juniorMarkingGuide: "JSS Science Light: State light travels in straight lines [1 Mark]. State Law of Reflection (angle of incidence = angle of reflection) [2 Marks]. Define lateral inversion [1 Mark].",
        studyNotes: {
          concept: "Light is a form of energy that travels in straight lines (rectilinear propagation). When light hits a smooth surface, it bounces off according to the laws of reflection.",
          formulas: [
            "i = r \\quad \\text{(Angle of Incidence = Angle of Reflection)}"
          ],
          steps: [
            "Draw a normal line perpendicular to the reflecting surface.",
            "Measure the angle of incidence (between incoming ray and normal).",
            "Ensure the angle of reflection equals this angle.",
            "Note that mirrors produce laterally inverted images (left appears right)."
          ],
          workedExample: "Problem: A ray of light strikes a flat mirror at an angle of 30° to the normal. What is the angle of reflection?\n\nSolution:\n1. According to the Law of Reflection, the angle of incidence (i) equals the angle of reflection (r).\n2. Given: i = 30°.\n3. Therefore, r = 30°.\nAnswer: Angle of reflection = 30°"
        }
      },
      {
        id: "forces_gravity",
        title: "Forces & Gravity",
        juniorDesc: "Understand push/pull forces, friction, and gravity pull on objects.",
        juniorGreeting: "Good day, Teacher! 🍎 Why does an apple fall down to the ground instead of floating up? What is the difference between contact and non-contact forces?",
        juniorMarkingGuide: "JSS Science Force: Define force as push or pull [1 Mark]. Define gravity as pull towards center of Earth [1 Mark]. Differentiate contact vs non-contact force [2 Marks].",
        studyNotes: {
          concept: "A force is a push or pull on an object. Gravity is a non-contact force that pulls objects towards the center of the Earth.",
          formulas: [
            "W = m \\cdot g \\quad \\text{(Weight = Mass } \\times \\text{ Gravity)}"
          ],
          steps: [
            "Identify contact forces (e.g. friction, pushing a cart, tension).",
            "Identify non-contact forces (e.g. gravity, magnetism, electrostatic force).",
            "Understand that mass remains constant, but weight changes depending on gravity."
          ],
          workedExample: "Question: A stone has a mass of 5kg. If the acceleration due to gravity is 10 m/s², what is its weight on Earth?\n\nSolution:\n1. Formula: Weight = mass * gravity (W = m * g)\n2. Substitute: W = 5 * 10 = 50 Newtons.\nAnswer: Weight = 50 N"
        }
      },
      {
        id: "states_of_matter",
        title: "States of Matter",
        juniorDesc: "Learn about solids, liquids, and gases and how heating changes them.",
        juniorGreeting: "Hi Teacher! 🧊 I put ice on a hot pan and it turns to liquid, then disappears as steam. What is happening to the particles during melting and evaporation?",
        juniorMarkingGuide: "JSS Science Matter: List 3 states of matter [1 Mark]. Explain particle arrangement in each state [2 Marks]. Define melting and boiling [1 Mark].",
        studyNotes: {
          concept: "Matter is anything that has mass and takes up space. It exists in three primary states: Solid (tightly packed particles), Liquid (loosely packed, flowing particles), and Gas (freely moving particles).",
          formulas: [],
          steps: [
            "Heating adds energy, making particles move faster and break bonds (melting, boiling).",
            "Cooling removes energy, slowing down particles (condensation, freezing)."
          ],
          workedExample: "Question: Compare the shape and volume of solids, liquids, and gases.\n\nAnswer:\nState | Shape | Volume\nSolid | Fixed | Fixed\nLiquid | Takes container shape | Fixed\nGas | Takes container shape | Fills container volume"
        }
      },
      {
        id: "elements_intro",
        title: "Intro to Elements & Compounds",
        juniorDesc: "Learn what elements, mixtures, and compounds are and simple examples.",
        juniorGreeting: "Good day, Teacher! 🧪 My textbook says water is a compound made of hydrogen and oxygen, but air is a mixture. What is the difference between a mixture and a compound?",
        juniorMarkingGuide: "JSS Science Chemistry: Define element [1 Mark]. Differentiate compound (chemically joined) vs mixture (physically combined) [2 Marks]. Give examples [1 Mark].",
        studyNotes: {
          concept: "An element is a pure substance made of only one type of atom. A compound consists of atoms of different elements chemically bonded together. A mixture consists of substances physically combined without chemical bonding.",
          formulas: [
            "\\text{Water (Compound): } H_2O",
            "\\text{Air (Mixture): } N_2 + O_2 + CO_2 + \\dots"
          ],
          steps: [
            "Determine if components can be separated physically (mixture) or require chemical reactions (compound).",
            "Identify if properties change (compounds have new properties; mixture components retain original properties)."
          ],
          workedExample: "Question: State three differences between a mixture of iron filings and sulfur, and the compound Iron(II) Sulfide (FeS).\n\nAnswer:\n1. Separation: Iron filings can be separated from sulfur physically using a magnet. FeS cannot be separated using a magnet.\n2. Energy change: Creating FeS produces heat/light (chemical reaction). Mixing iron and sulfur physically produces no heat change.\n3. Properties: Iron filings in the mixture still look dark and magnetic. FeS is a completely new yellow-gray solid with different properties."
        }
      },
      {
        id: "pollution",
        title: "Environmental Pollution",
        juniorDesc: "Learn about air, water, and land pollution, causes, and how to stop them.",
        juniorGreeting: "Hello Teacher! 🏭 There is a lot of plastic trash in our local stream and smoke in the air. What are the main types of pollution, and how do they affect human health?",
        juniorMarkingGuide: "JSS Science Pollution: Define pollution [1 Mark]. List 3 types (Air, Water, Land/Noise) [2 Marks]. Suggest prevention methods (recycling, waste management) [1 Mark].",
        studyNotes: {
          concept: "Pollution is the introduction of harmful materials (pollutants) into the natural environment, causing damage to ecosystems and human health.",
          formulas: [],
          steps: [
            "Air Pollution: Caused by exhaust fumes, factory smoke. Leads to breathing diseases.",
            "Water Pollution: Caused by sewage, industrial chemicals, plastic dumping. Leads to typhoid/cholera.",
            "Land Pollution: Caused by solid waste, pesticides, mining."
          ],
          workedExample: "Question: List three human activities that cause water pollution and suggest two ways to control it.\n\nAnswer:\nCauses:\n1. Discharging untreated industrial chemicals into rivers.\n2. Dumping plastic bags and household garbage into gutters/streams.\n3. Oil spills from pipelines.\nControl methods:\n1. Enforcing strict laws against dumping waste in water bodies.\n2. Treating industrial sewage before discharge."
        }
      },
      {
        id: "sti_awareness",
        title: "STI & HIV Awareness",
        juniorDesc: "Learn about Sexually Transmitted Infections, transmission routes, and prevention.",
        juniorGreeting: "Hi Teacher! In Basic Science, we are discussing health and hygiene. What does STI stand for? How is HIV transmitted, and what are the main prevention methods?",
        juniorMarkingGuide: "JSS Science STI: Define STI [1 Mark]. List transmission routes (unprotected contact, blood transfusion, sharing sharp objects) [2 Marks]. List prevention methods [1 Mark].",
        studyNotes: {
          concept: "Sexually Transmitted Infections (STIs) are infections passed from one person to another through sexual contact, blood sharing, or mother-to-child transmission.",
          formulas: [],
          steps: [
            "Understand transmission: Unprotected sexual activity, sharing unsterilized needles/razor blades, infected mother to child during birth.",
            "Understand prevention: Abstinence (most effective), faithful partner, sterilizing sharp tools, screening blood before transfusion."
          ],
          workedExample: "Question: List three ways HIV can be transmitted and state two ways it CANNOT be transmitted.\n\nAnswer:\nTransmission routes:\n1. Sharing unsterilized clippers, needles, or razor blades.\n2. Transfusion of unscreened infected blood.\n3. Unprotected sexual contact with an infected person.\nCannot be transmitted by:\n1. Shaking hands, hugging, or sharing food.\n2. Mosquito bites."
        }
      },
      {
        id: "basic_circuits",
        title: "Basic Electrical Circuits",
        juniorDesc: "Understand path of current, open/closed switches, and simple bulb connections.",
        juniorGreeting: "Hello Teacher! 🔌 I have a battery, wire, and a bulb. How do I connect them to make the bulb light up? What is the difference between an open and closed circuit?",
        juniorMarkingGuide: "JSS Science Circuits: Draw simple circuit diagram [2 Marks]. Explain open switch stops current [1 Mark]. Define conductors vs insulators [1 Mark].",
        studyNotes: {
          concept: "An electrical circuit is a complete closed loop path through which electrical current can flow. Conductors allow current to pass, while insulators block it.",
          formulas: [
            "V = I \\cdot R \\quad \\text{(Ohm's Law Intro)}"
          ],
          steps: [
            "Closed Circuit: Current flows because the path is unbroken (switch is closed).",
            "Open Circuit: Current cannot flow because there is a break in the path (switch is open).",
            "Conductors: Metals (copper, iron). Insulators: Plastic, wood, rubber."
          ],
          workedExample: "Question: Draw a schematic diagram of a basic circuit containing a battery, a closed switch, and a light bulb. Explain what happens if you add a rubber band in the path.\n\nAnswer:\n1. The diagram should show a battery connected via wires through a switch to a bulb in a closed loop.\n2. If you cut the wire and add a rubber band, the bulb will turn off. This is because rubber is an insulator and does not allow electric current to pass, turning the circuit into an open circuit."
        }
      }
    ]
  },
  tech: {
    id: "tech",
    name: "Basic Technology (JSS)",
    topics: [
      {
        id: "woodwork_tools",
        title: "Woodwork Hand Tools",
        juniorDesc: "Learn about measuring, marking, cutting, and driving tools in woodwork.",
        juniorGreeting: "Good day, Teacher! 🔨 We are entering the woodwork workshop. What tools do we use for cutting wood? What is the difference between a ripsaw and a crosscut saw?",
        juniorMarkingGuide: "JSS Tech Woodwork: List 4 tool categories (measuring, marking, cutting, holding) [2 Marks]. State difference between ripsaw (along grain) and crosscut saw (across grain) [2 Marks].",
        studyNotes: {
          concept: "Woodwork hand tools are manual tools used in preparing wood joints and structures. They are classified by function.",
          formulas: [],
          steps: [
            "Measuring: Tape measure, steel rule.",
            "Marking: Try-square, marking gauge.",
            "Cutting: Ripsaw (cuts along grain), Crosscut saw (cuts across grain), chisels.",
            "Holding: G-clamp, bench vice."
          ],
          workedExample: "Question: Classify the following tools: Try-square, Jack plane, G-clamp, Claw hammer.\n\nAnswer:\n1. Try-square: Marking tool (used to test squareness).\n2. Jack plane: Planning/Cutting tool (used to make wood surfaces smooth).\n3. G-clamp: Holding tool (used to clamp pieces together).\n4. Claw hammer: Driving tool (used to drive or pull out nails)."
        }
      },
      {
        id: "metalwork_tools",
        title: "Metalwork Hand Tools",
        juniorDesc: "Understand cutting and marking tools used for metal: files, hacksaws, and scribers.",
        juniorGreeting: "Hi Teacher! ⚙️ How do we cut metal bars? Can we use a woodwork saw, or do we need a hacksaw? How do we mark lines on metal?",
        juniorMarkingGuide: "JSS Tech Metalwork: Name hacksaw as metal cutting tool [1 Mark]. Name scriber for marking [1 Mark]. List 2 file types (flat, round) [2 Marks].",
        studyNotes: {
          concept: "Metalwork hand tools are designed to mark, cut, and shape metals. Since metal is harder than wood, these tools are made of high-grade steel.",
          formulas: [],
          steps: [
            "Marking: Scriber (metal pencil), center punch, dividers.",
            "Cutting: Hacksaw, cold chisel, snips (for sheet metal).",
            "Shaping: Files (flat, half-round, triangular) to smooth edges."
          ],
          workedExample: "Question: Why do we use a scriber instead of a pencil to mark lines on a steel plate, and what tool is used to make a starter dimple for drilling?\n\nAnswer:\n1. A pencil mark can be easily rubbed off or obscured by oil and rust. A scriber has a hardened steel tip that scratches a permanent line into the metal surface.\n2. A center punch struck by a hammer is used to make a small dimple (indentation) in metal to prevent the drill bit from slipping."
        }
      },
      {
        id: "drawing_instruments",
        title: "Drawing Instruments",
        juniorDesc: "Identify technical drawing tools: T-square, set-square, compasses, and board.",
        juniorGreeting: "Hello Teacher! 📐 I want to start technical drawing. Why do we need a T-square and set-squares? How do we draw horizontal and vertical lines?",
        juniorMarkingGuide: "JSS Tech Drawing: Name T-square function (horizontal lines) [2 Marks]. Name set-square function (vertical/angle lines) [2 Marks].",
        studyNotes: {
          concept: "Technical drawing instruments are precision tools used to produce accurate engineering and architectural diagrams.",
          formulas: [],
          steps: [
            "T-Square: Glides along the drawing board edge to draw horizontal lines.",
            "Set-Squares (30°/60° and 45°): Rest on the T-square to draw vertical lines and specific angles.",
            "Compass: Used to draw circles and arcs."
          ],
          workedExample: "Question: List four drawing instruments and state the use of each.\n\nAnswer:\n1. Drawing Board: Provides a flat, smooth surface to mount the paper.\n2. T-Square: Used as a guide to draw horizontal lines.\n3. Set-Squares: Used to draw vertical lines at 90° and angled lines at 30°, 45°, and 60°.\n4. Compass: Used to draw circles and arcs."
        }
      },
      {
        id: "scale_drawing",
        title: "Scale Drawing",
        juniorDesc: "Learn how to reduce or enlarge real-world dimensions on paper.",
        juniorGreeting: "Good day, Teacher! 📏 I want to draw a real school building that is 50 meters wide on my standard drawing paper. How do I use scale drawing (like 1:100) to fit it?",
        juniorMarkingGuide: "JSS Tech Scale: Explain scale notation (ratio) [1 Mark]. Perform reduction calculation correctly [2 Marks]. State unit conversion [1 Mark].",
        studyNotes: {
          concept: "Scale drawing allows us to represent large objects on paper by reducing their size proportionally, or small objects by enlarging them.",
          formulas: [
            "\\text{Drawing Length} = \\text{Real Length} \\times \\text{Scale Factor}",
            "\\text{Scale Ratio} = 1 : K \\quad (1\\text{ unit on drawing} = K\\text{ units in reality})"
          ],
          steps: [
            "Convert real-world measurements to centimeters (e.g. 1m = 100cm).",
            "Divide by the scale denominator (for reduction).",
            "Draw the computed length on paper."
          ],
          workedExample: "Problem: A room is 6m long. Calculate its length on paper using a scale of 1:50.\n\nSolution:\n1. Convert real length to cm: 6m = 6 * 100 = 600cm.\n2. Apply scale 1:50: Divide 600cm by 50.\n3. Calculation: 600 / 50 = 12cm.\nAnswer: The line drawn on paper should be 12cm."
        }
      },
      {
        id: "energy_intro",
        title: "Kinetic & Potential Energy",
        juniorDesc: "Learn about energy of motion and stored energy with simple examples.",
        juniorGreeting: "Hello Teacher! ⚡ If I hold a heavy stone at the top of a roof, what kind of energy does it have? What happens to this energy when I drop it?",
        juniorMarkingGuide: "JSS Tech Energy: Define Potential Energy (stored/position) [1 Mark]. Define Kinetic Energy (motion) [1 Mark]. Explain conservation transition [2 Marks].",
        studyNotes: {
          concept: "Potential Energy (PE) is stored energy due to an object's position or state. Kinetic Energy (KE) is energy possessed by an object due to its motion. Energy cannot be created or destroyed, only transformed.",
          formulas: [
            "P.E. = m \\cdot g \\cdot h \\quad \\text{(Potential Energy)}",
            "K.E. = \\frac{1}{2} m \\cdot v^2 \\quad \\text{(Kinetic Energy)}"
          ],
          steps: [
            "At the highest point, velocity is zero, so KE = 0 and PE is maximum.",
            "As it falls, height decreases (PE decreases) and speed increases (KE increases).",
            "Just before hitting the ground, height is zero (PE = 0) and KE is maximum."
          ],
          workedExample: "Question: A ball of mass 2kg is held at a height of 5m. Calculate its Potential Energy (g = 10 m/s²). What happens to this energy when it is released?\n\nSolution:\n1. PE = m * g * h = 2 * 10 * 5 = 100 Joules.\n2. When released, this stored Potential Energy transforms into Kinetic Energy as the speed increases during the fall.\nAnswer: P.E. = 100 J"
        }
      },
      {
        id: "gears_belts",
        title: "Transmission of Force (Gears)",
        juniorDesc: "Understand how gears, belts, and chains transmit motion and speed.",
        juniorGreeting: "Hi Teacher! 🚲 When I pedal my bicycle, how does the chain transmit force from my pedals to the back wheel? What happens to speed if a big gear turns a small gear?",
        juniorMarkingGuide: "JSS Tech Gears: Explain driver vs driven gear [2 Marks]. State that big gear turning small gear increases speed [2 Marks].",
        studyNotes: {
          concept: "Force and motion are transmitted from one part of a machine to another using mechanical systems: gears (meshing teeth), belt drives (pulleys), and chain drives.",
          formulas: [
            "\\text{Gear Ratio} = \\frac{\\text{Teeth of Driven Gear}}{\\text{Teeth of Driver Gear}}",
            "N_1 \\cdot T_1 = N_2 \\cdot T_2 \\quad (\\text{Speed } \\times \\text{ Teeth = Constant})"
          ],
          steps: [
            "Driver Gear: The gear connected to the input force (e.g. pedals).",
            "Driven Gear: The gear receiving the motion (e.g. back wheel).",
            "Speed Multiplication: Small driven gear rotates faster than a large driver gear."
          ],
          workedExample: "Question: A driver gear has 40 teeth and turns a driven gear with 10 teeth. If the driver rotates at 100 rpm, how fast does the driven gear rotate?\n\nSolution:\n1. Formula: N1 * T1 = N2 * T2\n2. Substitute: 100 * 40 = N2 * 10\n3. Calculate: N2 = 4000 / 10 = 400 rpm.\nAnswer: Driven gear rotates at 400 rpm (speed quadrupled)."
        }
      },
      {
        id: "concrete_materials",
        title: "Building Materials (Concrete)",
        juniorDesc: "Learn the ingredients of concrete (cement, sand, gravel, water) and mixing ratios.",
        juniorGreeting: "Hello Teacher! 🧱 Why do builders mix cement, sand, water, and stones together? What happens if they add too much water, and how does concrete set?",
        juniorMarkingGuide: "JSS Tech Materials: List 4 concrete ingredients [2 Marks]. Explain hydration setting [1 Mark]. State role of reinforcement steel [1 Mark].",
        studyNotes: {
          concept: "Concrete is a composite building material that hardens over time. It is highly resistant to compression (crushing forces) but weak in tension (stretching forces).",
          formulas: [
            "\\text{Concrete} = \\text{Cement} + \\text{Fine Aggregate (Sand)} + \\text{Coarse Aggregate (Gravel)} + \\text{Water}"
          ],
          steps: [
            "Standard mixing ratio: e.g., 1 part cement, 2 parts sand, 4 parts gravel (1:2:4 ratio).",
            "Water triggers a chemical reaction called hydration that binds the elements.",
            "Adding steel bars creates 'reinforced concrete' which handles tension loads."
          ],
          workedExample: "Question: What is reinforced concrete, and why is steel placed inside concrete beams?\n\nAnswer:\n1. Reinforced concrete is concrete that has steel reinforcing bars (rebars) embedded inside it before it cures.\n2. Concrete is very strong under compression (pushing) but weak in tension (pulling/bending). Steel is highly resistant to tension. By combining them, the steel handles the stretching forces under loads, preventing the beam from snapping."
        }
      },
      {
        id: "workshop_safety",
        title: "Safety Rules in Workshop",
        juniorDesc: "Learn how to prevent accidents in the wood and metal workshops.",
        juniorGreeting: "Hi Teacher! 🥽 What safety precautions must I take before using any workshop tools? What is PPE?",
        juniorMarkingGuide: "JSS Tech Safety: Define PPE (Personal Protective Equipment) [1 Mark]. List 3 safety rules (goggles, boots, tidy workspace) [2 Marks]. State fire safety [1 Mark].",
        studyNotes: {
          concept: "Workshop safety rules are guidelines designed to prevent accidents, injuries, and tool damage during workshop operations.",
          formulas: [],
          steps: [
            "Wear appropriate Personal Protective Equipment (PPE): safety goggles, boots, gloves.",
            "Do not run or play in the workshop.",
            "Keep the workshop floor clean of oil spills and sawdust.",
            "Always use the correct tool for the job."
          ],
          workedExample: "Question: State four safety rules that must be obeyed in a basic technology workshop.\n\nAnswer:\n1. Wear safety boots with steel toe caps to protect feet from falling heavy metals.\n2. Wear safety goggles when cutting, grinding, or hammering to protect eyes from flying chips.\n3. Never operate a machine without the teacher's permission and supervision.\n4. Keep floors clean of oil, water, and scrap pieces to prevent slipping accidents."
        }
      },
      {
        id: "electronics_resistors",
        title: "Basic Electronics (Resistors)",
        juniorDesc: "Introduction to resistors, color codes, and simple current control.",
        juniorGreeting: "Good day, Teacher! ⚡ In Basic Tech, we are studying circuits. What does a resistor do, and how do we read the colorful stripes on it?",
        juniorMarkingGuide: "JSS Tech Resistors: Define resistor (opposes current flow) [1 Mark]. Explain Ohm's Law formula V=IR [2 Marks]. State unit is Ohm [1 Mark].",
        studyNotes: {
          concept: "A resistor is an electronic component that limits or regulates the flow of electrical current in a circuit.",
          formulas: [
            "R = \\frac{V}{I} \\quad \\text{(Resistance = Voltage / Current)}",
            "V = I \\cdot R"
          ],
          steps: [
            "Resistance is measured in Ohms (Ω).",
            "Read color code bands: Band 1 (first digit), Band 2 (second digit), Band 3 (multiplier), Band 4 (tolerance)."
          ],
          workedExample: "Question: A resistor limits current to 0.5 Amperes when connected to a 10 Volt battery. Find its resistance.\n\nSolution:\n1. Formula: R = V / I\n2. Substitute: R = 10 / 0.5 = 20 Ohms.\nAnswer: Resistance = 20 Ω"
        }
      },
      {
        id: "machine_maintenance",
        title: "Maintenance of Machines",
        juniorDesc: "Learn how to take care of machines: lubrication, cleaning, and painting.",
        juniorGreeting: "Hello Teacher! ⚙️ Why do mechanical machines squeak or heat up when running? What is friction, and how does lubrication help?",
        juniorMarkingGuide: "JSS Tech Maintenance: Define lubrication [2 Marks]. List 2 other maintenance methods (cleaning, tightening bolts, painting) [2 Marks].",
        studyNotes: {
          concept: "Maintenance is the action taken to keep machines, tools, and equipment in good working order to extend their lifespan and prevent breakdowns.",
          formulas: [],
          steps: [
            "Lubrication: Applying oil or grease to reduce friction and wear between moving parts.",
            "Cleaning: Removing dust, dirt, and scraps.",
            "Prevention of Rust: Painting or oiling metal parts to prevent oxidation."
          ],
          workedExample: "Question: Explain the difference between preventive maintenance and corrective maintenance, giving an example of each.\n\nAnswer:\n1. Preventive Maintenance: Actions taken before a machine breaks down to prevent failure. Example: Regularly oiling a sewing machine or check engine oil.\n2. Corrective Maintenance: Actions taken to fix or replace parts after a machine breaks down. Example: Replacing a snapped drive belt or broken gear teeth."
        }
      }
    ]
  },
  english: {
    id: "english",
    name: "English Language (JSS)",
    topics: [
      {
        id: "parts_speech",
        title: "Parts of Speech",
        juniorDesc: "Learn the 8 basic parts of speech: nouns, verbs, adjectives, etc.",
        juniorGreeting: "Hi Teacher! 📝 I'm confused about the parts of speech. How do I tell the difference between an adjective and an adverb in a sentence?",
        juniorMarkingGuide: "JSS English Grammar: List at least 5 parts of speech [2 Marks]. Differentiate adjective (modifies noun) vs adverb (modifies verb/adjective) [2 Marks].",
        studyNotes: {
          concept: "Parts of speech are categories of words divided by their function in a sentence. There are eight basic parts of speech.",
          formulas: [],
          steps: [
            "Noun (name of person/place/thing), Pronoun (replaces noun).",
            "Verb (action/state), Adjective (describes a noun).",
            "Adverb (describes a verb, adjective, or other adverb).",
            "Preposition (shows position/time), Conjunction (joins words/clauses), Interjection (expresses emotion)."
          ],
          workedExample: "Question: Identify the parts of speech for the capitalized words in: 'The QUICK brown fox jumped Swiftly over the lazy dog.'\n\nAnswer:\n1. QUICK: Adjective (describes the noun 'fox').\n2. SWIFTLY: Adverb (describes how the fox 'jumped')."
        }
      },
      {
        id: "nouns_pronouns",
        title: "Nouns & Pronouns",
        juniorDesc: "Understand different types of nouns and replacing them with subject/object pronouns.",
        juniorGreeting: "Good day, Teacher! What is the difference between a proper noun and a common noun? Why do we use pronouns like 'he', 'she', or 'them'?",
        juniorMarkingGuide: "JSS English Grammar: Define Proper Noun (needs capitalization) vs Common Noun [2 Marks]. Give examples [2 Marks].",
        studyNotes: {
          concept: "A noun is a naming word. A pronoun is a word used in place of a noun to avoid repetition.",
          formulas: [],
          steps: [
            "Proper Noun: Specific name, always capitalized (e.g. Nigeria, Chidi).",
            "Common Noun: General name (e.g. country, student).",
            "Pronouns: Subject pronouns (I, you, he, she, it, we, they) vs Object pronouns (me, you, him, her, it, us, them)."
          ],
          workedExample: "Question: Rewrite the sentence to replace repeated nouns with pronouns: 'Chidi saw the dog, and Chidi threw the ball to the dog.'\n\nAnswer:\n'Chidi saw the dog, and HE threw the ball to IT.' (He replaces 'Chidi', It replaces 'the dog')"
        }
      },
      {
        id: "verbs_tenses",
        title: "Verbs & Tenses",
        juniorDesc: "Learn Present, Past, and Future tenses and regular/irregular verbs.",
        juniorGreeting: "Hello Teacher! I am writing a story. What is the difference between Present Continuous ('is playing') and Past Simple ('played')? How do irregular verbs change?",
        juniorMarkingGuide: "JSS English Grammar: Differentiate present, past, and future tense [2 Marks]. Give example of regular verb (adds -ed) and irregular verb (changes form, e.g., write-wrote) [2 Marks].",
        studyNotes: {
          concept: "Verbs express action or state of being. Tenses indicate the time of the action (past, present, or future).",
          formulas: [],
          steps: [
            "Present Tense: Action happening now (e.g. He walks).",
            "Past Tense: Action already completed (e.g. He walked).",
            "Future Tense: Action that will happen (e.g. He will walk).",
            "Continuous Tense: Ongoing actions, uses verb + -ing (e.g. He is walking)."
          ],
          workedExample: "Question: Convert the sentence 'They write an exam' into past continuous and future simple tenses.\n\nAnswer:\n1. Past Continuous: 'They WERE WRITING an exam.'\n2. Future Simple: 'They WILL WRITE an exam.'"
        }
      },
      {
        id: "punctuation",
        title: "Punctuation Marks",
        juniorDesc: "Learn how to use full stops, commas, question marks, and apostrophes correctly.",
        juniorGreeting: "Hi Teacher! ✍️ My teacher marked me down for missing commas and apostrophes. When do I use an apostrophe for contraction versus possession?",
        juniorMarkingGuide: "JSS English Grammar: Define comma rules (lists, pauses) [2 Marks]. Differentiate apostrophe for contraction (it's = it is) vs possession (Chidi's book) [2 Marks].",
        studyNotes: {
          concept: "Punctuation marks are symbols used to structure and organize written sentences, making them clear and readable.",
          formulas: [],
          steps: [
            "Full Stop (.): Ends a statement sentence.",
            "Comma (,): Indicates a pause or separates list items.",
            "Apostrophe ('): Used for contraction (e.g., don't, it's) or showing possession (e.g., the boy's bag)."
          ],
          workedExample: "Question: Correct the punctuation in this sentence: 'dont touch chidis book its not yours'\n\nAnswer:\n'Don't touch Chidi's book; it's not yours.' (Added capital D, contraction apostrophe for Don't, possessive apostrophe for Chidi's, semicolon, contraction apostrophe for it's, and full stop)"
        }
      },
      {
        id: "active_passive",
        title: "Active & Passive Voice",
        juniorDesc: "Understand who is performing the action: 'Chidi ate bread' vs 'Bread was eaten by Chidi'.",
        juniorGreeting: "Good day, Teacher! What is the difference between active and passive voice? Why does the object move to the front in passive voice?",
        juniorMarkingGuide: "JSS English Grammar: Define active voice (Subject performs action) [1 Mark]. Define passive voice (Subject receives action) [1 Mark]. Convert active to passive correctly [2 Marks].",
        studyNotes: {
          concept: "Active voice emphasizes the performer of the action (Subject + Verb + Object). Passive voice emphasizes the receiver or the action itself (Object + Auxiliary Verb + Past Participle + by Subject).",
          formulas: [
            "\\text{Active: Subject} + \\text{Verb} + \\text{Object}",
            "\\text{Passive: Object} + \\text{was/is} + \\text{Past Participle} + \\text{by Subject}"
          ],
          steps: [
            "Identify the subject, verb, and object in the active sentence.",
            "Move the object to the subject position.",
            "Change the verb to the appropriate form of 'to be' + past participle.",
            "Place the active subject at the end, introduced by the preposition 'by'."
          ],
          workedExample: "Problem: Convert 'The boy kicked the football' into the passive voice.\n\nSolution:\n1. Performer (Subject) = The boy. Action (Verb) = kicked (past tense). Receiver (Object) = the football.\n2. Passive structure: Football + was + kicked + by + the boy.\nAnswer: 'The football was kicked by the boy.'"
        }
      },
      {
        id: "comprehension",
        title: "Reading Comprehension",
        juniorDesc: "Learn strategies to read passages and extract answers accurately.",
        juniorGreeting: "Hello Teacher! 📖 When reading a comprehension passage, how do I find answers to questions quickly? Should I read the questions first?",
        juniorMarkingGuide: "JSS English Reading: List skimming and scanning techniques [2 Marks]. Explain how to formulate answers in full sentences in own words [2 Marks].",
        studyNotes: {
          concept: "Reading comprehension is the ability to read text, process it, and understand its meaning. Skimming and scanning help locate details efficiently.",
          formulas: [],
          steps: [
            "Skimming: Reading quickly to get the main idea or gist.",
            "Scanning: Looking for specific keywords, numbers, or names in the passage.",
            "Avoid copying sentences directly; paraphrase in your own words."
          ],
          workedExample: "Question: Explain the difference between skimming and scanning.\n\nAnswer:\n1. Skimming is reading a passage rapidly to understand the general theme or main topic.\n2. Scanning is casting one's eyes quickly over the text to search for a specific piece of information, such as a date, a name, or a number."
        }
      },
      {
        id: "informal_letter",
        title: "Informal Letter Writing",
        juniorDesc: "Learn the structure of a letter to a friend: address, date, body, sign-off.",
        juniorGreeting: "Hi Teacher! ✉️ I want to write a letter to my cousin telling him about my school. How many addresses do I need, and how should I start and sign off?",
        juniorMarkingGuide: "JSS English Writing: Include sender's address and date at top right [1 Mark]. Use friendly greeting (Dear...) [1 Mark]. Use casual register in body [1 Mark]. Sign off with Yours affectionately/sincerely + first name [1 Mark].",
        studyNotes: {
          concept: "An informal letter is a personal letter written to friends, relatives, or acquaintances. It has a relaxed, friendly tone.",
          formulas: [],
          steps: [
            "Write the writer's address and date at the top right-hand corner.",
            "Write the salutation (e.g., Dear Bola,) on the left.",
            "Write the body paragraphs (opening, main points, closing).",
            "Sign-off on the right side using: Yours affectionately, or Yours sincerely, followed by your first name."
          ],
          workedExample: "Question: Outline the structure of an informal letter.\n\nAnswer:\n1. Writer's Address & Date (Top right)\n2. Salutation (e.g. Dear Bola,) (Left margin)\n3. Opening (Asking about their health/family)\n4. Body (Main news/messages)\n5. Closing (Expressing desire to hear back)\n6. Subscription (e.g. Yours affectionately,) + First Name"
        }
      },
      {
        id: "narrative_essay",
        title: "Narrative Essay",
        juniorDesc: "Learn how to write a story about an event or experience.",
        juniorGreeting: "Hello Teacher! 📝 I am writing a story on 'My First Day in Secondary School'. How do I structure my story? Should I write in the past tense?",
        juniorMarkingGuide: "JSS English Writing: Structure into Introduction, Body paragraphs, and Conclusion [1 Mark]. Write consistently in the past tense [2 Marks]. Use transition words [1 Mark].",
        studyNotes: {
          concept: "A narrative essay is a story-based essay that describes a sequence of events. It is usually written in the first-person ('I') and past tense.",
          formulas: [],
          steps: [
            "Introduction: Introduce the setting, time, and main characters/hook.",
            "Body Paragraphs: Build up the plot chronologically (what happened first, next, then).",
            "Climax: Describe the most exciting point of the story.",
            "Conclusion: Resolve the event and state what you learned."
          ],
          workedExample: "Question: State three key features of a narrative essay.\n\nAnswer:\n1. Plot/Setting: It tells a chronological story with a clear beginning, middle, and end.\n2. Tense: It is primarily written in the past tense since it recounts completed events.\n3. Theme/Moral: It often concludes with a lesson or reflection on the experience."
        }
      },
      {
        id: "descriptive_essay",
        title: "Descriptive Essay",
        juniorDesc: "Use sensory adjectives to describe a person, place, or object vividly.",
        juniorGreeting: "Good day, Teacher! 🎨 I want to describe my favorite teacher or my village. How do I paint a picture in the reader's mind? What are sensory details?",
        juniorMarkingGuide: "JSS English Writing: Use descriptive adjectives [2 Marks]. Incorporate sensory details (sight, sound, smell, feel) [2 Marks].",
        studyNotes: {
          concept: "A descriptive essay paints a picture in words of a person, place, thing, or idea using vivid details and sensory words.",
          formulas: [],
          steps: [
            "Use sensory adjectives: Describe colors, shapes, sounds, smells, and textures.",
            "Use figurative language: Similes and metaphors (e.g., 'as bright as the sun').",
            "Organize spatially (e.g., describe from top to bottom, or near to far)."
          ],
          workedExample: "Question: Write a short descriptive paragraph describing a busy market scene using at least three sensory details.\n\nAnswer:\n'The bustling market was filled with the pungent smell of dried fish and fresh pepper. Vendors shouted their prices in loud, rhythmic chants that echoed off the metal roofs. Under the hot afternoon sun, baskets of bright red tomatoes and green vegetables glowed vividly, while sweat dripped down the faces of shoppers carrying heavy bags.'"
        }
      },
      {
        id: "synonyms_antonyms",
        title: "Synonyms & Antonyms",
        juniorDesc: "Learn words that mean the same (synonyms) and opposite (antonyms).",
        juniorGreeting: "Hi Teacher! In English, we are studying vocabulary. What is the difference between a synonym and an antonym? Can you give me examples of 'diligent' and 'huge'?",
        juniorMarkingGuide: "JSS English Vocabulary: Define synonym (same meaning) and antonym (opposite meaning) [2 Marks]. Give correct examples [2 Marks].",
        studyNotes: {
          concept: "Synonyms are words with similar meanings. Antonyms are words with opposite meanings. Building this vocabulary improves writing register.",
          formulas: [],
          steps: [
            "Synonyms: e.g. Beautiful = Gorgeous, Happy = Joyful.",
            "Antonyms: e.g. Tall = Short, Hot = Cold.",
            "Pay attention to parts of speech: the synonym of a noun must be a noun."
          ],
          workedExample: "Question: Provide a synonym and an antonym for the words: 'diligent' and 'ancient'.\n\nAnswer:\n1. DILIGENT:\n   - Synonym: Hardworking / Industrious\n   - Antonym: Lazy / Indolent\n2. ANCIENT:\n   - Synonym: Old / Antique\n   - Antonym: Modern / New"
        }
      }
    ]
  },
  social: {
    id: "social",
    name: "Social Studies (JSS)",
    topics: [
      {
        id: "family",
        title: "Family & Marriage",
        juniorDesc: "Learn about Nuclear and Extended families, functions of family, and types of marriage.",
        juniorGreeting: "Hi Teacher! 👋 We are learning about the family unit in Social Studies. What is the difference between a nuclear family and an extended family? What are the main functions of a family in society?",
        juniorMarkingGuide: "JSS Social Studies Family: Define nuclear vs extended family [2 Marks]. List 3 functions of the family (procreation, socialization, protection, economic support) [2 Marks].",
        studyNotes: {
          concept: "The family is the primary social group and the basic unit of society. Marriage is the socially approved union between partners that forms the foundation of a family.",
          formulas: [],
          steps: [
            "Nuclear Family: Consists of father, mother, and children.",
            "Extended Family: Consists of nuclear family plus uncles, aunts, grandparents, and cousins.",
            "Functions: Biological (procreation), Educational (socialization of children), Economic (providing food/shelter)."
          ],
          workedExample: "Question: Compare nuclear and extended families, and list three functions of the family unit.\n\nAnswer:\n1. Comparison: A nuclear family consists only of parents and their children living together. An extended family is larger and includes other relatives such as grandparents, uncles, aunts, and cousins.\n2. Functions: Procreation (bearing children), Socialization (teaching moral values), and Provision of basic needs (food, clothing, shelter)."
        }
      },
      {
        id: "culture_values",
        title: "Culture & Social Values",
        juniorDesc: "Understand material and non-material culture, and core values like honesty and cooperation.",
        juniorGreeting: "Good day, Teacher! What does 'Culture' mean? What is the difference between material culture (food/clothes) and non-material culture (languages/beliefs)?",
        juniorMarkingGuide: "JSS Social Studies Culture: Define culture as a way of life [1 Mark]. Differentiate material (tangible) vs non-material (intangible) culture [2 Marks]. Give examples [1 Mark].",
        studyNotes: {
          concept: "Culture is the total way of life of a group of people, shared and transmitted from one generation to another.",
          formulas: [],
          steps: [
            "Material Culture: Physical, tangible objects (e.g., Nigerian traditional attire like Agbada, local foods like pounded yam, tools).",
            "Non-Material Culture: Intangible elements (e.g., languages, greeting customs, religious beliefs, folk tales).",
            "Social Values: Core beliefs that guide behavior in a community (honesty, respect for elders, tolerance)."
          ],
          workedExample: "Question: Define culture and classify the following into material and non-material culture: Ankara fabric, Yoruba language, respect for elders, clay pots.\n\nAnswer:\n1. Culture is the total way of life of a group of people including their beliefs, values, customs, and tools.\n2. Classifications:\n   - Material culture: Ankara fabric, clay pots.\n   - Non-material culture: Yoruba language, respect for elders."
        }
      },
      {
        id: "citizenship_rights",
        title: "Citizenship & Rights",
        juniorDesc: "Learn how one becomes a citizen (birth, naturalization) and basic human rights.",
        juniorGreeting: "Hello Teacher! ⚖️ What does it mean to be a citizen of a country? How can someone who was not born in Nigeria become a Nigerian citizen?",
        juniorMarkingGuide: "JSS Social Studies Citizenship: Define citizenship [1 Mark]. List 3 ways to acquire citizenship (birth, registration, naturalization) [2 Marks]. State one duty of a citizen [1 Mark].",
        studyNotes: {
          concept: "A citizen is a legal member of a country who enjoys constitutional rights and owes duties and loyalty to the state.",
          formulas: [],
          steps: [
            "Acquisition by Birth: Parents are citizens.",
            "Acquisition by Registration: E.g., foreign woman marrying a citizen.",
            "Acquisition by Naturalization: Applying after meeting residency and character requirements.",
            "Duties: Paying taxes, obeying laws, defending the nation."
          ],
          workedExample: "Question: List three ways to become a citizen of Nigeria and state two duties of a good citizen.\n\nAnswer:\nWays to acquire citizenship:\n1. Citizenship by Birth\n2. Citizenship by Registration\n3. Citizenship by Naturalization\nDuties of a citizen:\n1. Obedience to the laws of the country.\n2. Prompt payment of taxes."
        }
      },
      {
        id: "national_unity",
        title: "National Unity & Symbols",
        juniorDesc: "Understand the national flag, coat of arms, pledge, and anthem and why unity is important.",
        juniorGreeting: "Hi Teacher! 🇳🇬 We are studying national symbols. What do the colors of the Nigerian flag represent? What do the black shield and white horses on the coat of arms stand for?",
        juniorMarkingGuide: "JSS Social Studies Symbols: Explain flag colors (green = agriculture, white = peace) [2 Marks]. Explain coat of arms elements (horses = dignity, Y-shape = rivers Niger and Benue) [2 Marks].",
        studyNotes: {
          concept: "National symbols are signs or images that represent a country's values, history, and unity, serving to inspire patriotism.",
          formulas: [],
          steps: [
            "National Flag: Green (agricultural wealth), White (peace and unity).",
            "Coat of Arms: Black shield (fertile soil), White horses (dignity and strength), Y-shape (Rivers Niger and Benue meeting), Eagle (strength), Red flower (national beauty).",
            "National Pledge & Anthem: Express commitment to national service and unity."
          ],
          workedExample: "Question: Explain the meaning of the colors of the Nigerian flag, and identify the rivers represented on the coat of arms.\n\nAnswer:\n1. National Flag: The two green stripes represent Nigeria's rich agricultural wealth, and the white center stripe represents peace and national unity.\n2. Rivers: The white wavy 'Y' shape on the black shield represents the confluence of the two major rivers in Nigeria: River Niger and River Benue."
        }
      },
      {
        id: "social_problems",
        title: "Social Problems (Drug Abuse)",
        juniorDesc: "Learn about drug abuse, its causes, effects on youth, and prevention.",
        juniorGreeting: "Good day, Teacher! What is drug abuse? Why do some youths get addicted to drugs, and what agency in Nigeria fights drug abuse?",
        juniorMarkingGuide: "JSS Social Studies Problems: Define drug abuse [1 Mark]. Name NDLEA as the anti-drug agency in Nigeria [1 Mark]. List 2 health/social effects [2 Marks].",
        studyNotes: {
          concept: "A social problem is a condition that disrupts or damages society. Drug abuse is the misuse or self-administration of chemical substances without medical prescription.",
          formulas: [],
          steps: [
            "Causes: Peer pressure, depression, curiosity, lack of parental supervision.",
            "Effects: Brain damage, mental illness, crime, school dropout.",
            "Control Agencies: NDLEA (National Drug Law Enforcement Agency), NAFDAC."
          ],
          workedExample: "Question: Define drug abuse, name the agency responsible for fighting it in Nigeria, and state three consequences of drug abuse among teenagers.\n\nAnswer:\n1. Drug abuse is the taking of drugs without a doctor's prescription, or the excessive use of legal/illegal substances.\n2. Enforcement Agency: NDLEA (National Drug Law Enforcement Agency).\n3. Consequences: Brain damage and mental illness, high tendency to commit crimes, and poor academic performance leading to school dropout."
        }
      },
      {
        id: "road_safety",
        title: "Road Safety & Signs",
        juniorDesc: "Identify traffic lights, road signs (regulatory, warning), and safety tips for pedestrians.",
        juniorGreeting: "Hello Teacher! 🚦 When crossing the road, what rules must I follow? What do the colors of the traffic lights mean? What does FRSC do?",
        juniorMarkingGuide: "JSS Social Studies Safety: State meaning of traffic lights (red = stop, yellow = get ready, green = go) [2 Marks]. Name FRSC as safety agency [1 Mark]. State pedestrian crossing rule (zebra crossing) [1 Mark].",
        studyNotes: {
          concept: "Road safety refers to methods and measures used to prevent road users from being killed or seriously injured. The Federal Road Safety Corps (FRSC) manages this in Nigeria.",
          formulas: [],
          steps: [
            "Traffic Lights: Red (Stop), Yellow/Amber (Ready), Green (Go).",
            "Pedestrians: Use zebra crossings, pedestrian bridges, look left, right, and left again before crossing.",
            "Road Signs: Regulatory (circles - e.g. Speed limit), Warning (triangles - e.g. sharp bend ahead), Informative (rectangles - e.g. Hospital ahead)."
          ],
          workedExample: "Question: Explain the three traffic light colors, name the agency responsible for road safety in Nigeria, and state where pedestrians should cross busy roads.\n\nAnswer:\n1. Traffic Lights: Red means stop, Yellow/Amber means prepare/get ready, and Green means go.\n2. Agency: FRSC (Federal Road Safety Corps).\n3. Crossing: Pedestrians should use zebra crossings or pedestrian footbridges where available."
        }
      },
      {
        id: "leadership",
        title: "Leadership & Followership",
        juniorDesc: "Learn qualities of a good leader and duties of constructive followers.",
        juniorGreeting: "Good day, Teacher! What is the difference between a leader and a follower? What qualities make a leader successful, and why is cooperation important?",
        juniorMarkingGuide: "JSS Social Studies Leadership: Define leadership and followership [2 Marks]. List 2 qualities of a good leader (honesty, accountability, vision) [2 Marks].",
        studyNotes: {
          concept: "Leadership is the ability to guide, direct, and influence people towards achieving a common goal. Followership is the willingness to support and cooperate with a leader to achieve goals.",
          formulas: [],
          steps: [
            "Leader Qualities: Integrity, transparency, vision, courage, empathy.",
            "Follower Duties: Cooperation, constructive feedback, obedience to laws, hard work."
          ],
          workedExample: "Question: State three qualities of a good leader and outline two roles of a good follower.\n\nAnswer:\nLeader qualities:\n1. Honesty and Integrity (being truthful and moral).\n2. Empathy (caring for the needs of the followers).\n3. Vision (having a clear plan for the future).\nFollower roles:\n1. Obeying group decisions and national laws.\n2. Offering constructive feedback instead of blind opposition."
        }
      },
      {
        id: "money_banking",
        title: "Money & Banking Basics",
        juniorDesc: "Learn functions of money and the difference between commercial and central banks.",
        juniorGreeting: "Hi Teacher! 💵 Why do we use paper money instead of trading goods like our ancestors did (barter)? What is the role of the Central Bank of Nigeria (CBN)?",
        juniorMarkingGuide: "JSS Social Studies Money: Explain barter system problem (coincidence of wants) [2 Marks]. State 2 functions of money (medium of exchange, store of value) [1 Mark]. Name Central Bank function (issues currency) [1 Mark].",
        studyNotes: {
          concept: "Money is any generally accepted medium of exchange. Before money, the Barter System (exchange of goods for goods) was used, which suffered from inefficiencies.",
          formulas: [],
          steps: [
            "Barter Problem: Double coincidence of wants (you must want what I have, and I must want what you have).",
            "Money Functions: Medium of exchange, measure of value, store of value, standard of deferred payment.",
            "Banks: Central Bank (CBN - prints currency, regulates banks) vs Commercial Banks (First Bank, GTBank - takes deposits, gives loans)."
          ],
          workedExample: "Question: Why did the barter system fail, and what are the main differences between the Central Bank and Commercial Banks?\n\nAnswer:\n1. Barter Failure: It failed due to the difficulty of finding a 'double coincidence of wants' (e.g. a farmer with yams finding a tailor who wants yams and has clothes) and the lack of a common measure of value.\n2. Banks: The Central Bank (CBN) is a government agency that regulates the financial system, prints currency, and does not open accounts for individuals. Commercial Banks are business enterprises that take deposits, open accounts for the public, and lend money to make profit."
        }
      },
      {
        id: "trade_barter",
        title: "Trade & Barter System",
        juniorDesc: "Understand wholesale, retail, and international trade in simple terms.",
        juniorGreeting: "Hello Teacher! In Social Studies, we are learning about buying and selling. What is the difference between wholesale trade and retail trade? What is international trade?",
        juniorMarkingGuide: "JSS Social Studies Trade: Differentiate wholesale (bulk buying) vs retail (unit selling) [2 Marks]. Define international trade (buying/selling between countries) [2 Marks].",
        studyNotes: {
          concept: "Trade is the buying and selling of goods and services. It can be domestic (within a country) or international (between countries).",
          formulas: [],
          steps: [
            "Wholesaler: Buys in bulk directly from manufacturers and sells in smaller quantities to retailers.",
            "Retailer: Buys from wholesalers and sells in single units to final consumers.",
            "International Trade: Exporting (selling out of the country) and Importing (buying into the country)."
          ],
          workedExample: "Question: Outline the chain of distribution from factory to consumer, and define import and export.\n\nAnswer:\n1. Chain of Distribution: Manufacturer -> Wholesaler -> Retailer -> Consumer.\n2. Definitions:\n   - Export: Selling locally produced goods/services to other countries (e.g. Nigeria selling crude oil to China).\n   - Import: Buying foreign-made goods/services into the local country (e.g. Nigeria buying electronics from Japan)."
        }
      },
      {
        id: "rights_jss",
        title: "Human Rights (Basic)",
        juniorDesc: "Learn about fundamental human rights and the right to education and life.",
        juniorGreeting: "Good day, Teacher! ⚖️ What are human rights? Why is the right to education so important for a child like me? How do we protect our rights?",
        juniorMarkingGuide: "JSS Social Studies Rights: Define human rights as basic entitlements [1 Mark]. List 3 examples (life, speech, education, assembly) [2 Marks]. Mention courts role [1 Mark].",
        studyNotes: {
          concept: "Human rights are basic rights and freedoms that belong to every person in the world, from birth until death, regardless of their nationality or background.",
          formulas: [],
          steps: [
            "Characteristics: Universal (belongs to all), Inalienable (cannot be taken away).",
            "Basic Examples: Right to life, right to education, right to freedom of movement, right to expression.",
            "Protection: Human rights are defended in courts of law and written in the national Constitution."
          ],
          workedExample: "Question: Define human rights and list four examples of rights guaranteed to a child under the Nigerian Constitution.\n\nAnswer:\n1. Human rights are basic entitlements and freedoms that belong to every human being from birth to protect their dignity.\n2. Child Rights: Right to life, Right to free and compulsory basic education, Right to parental care, and Right to freedom of expression."
        }
      }
    ]
  },
  civic: {
    id: "civic",
    name: "Civic Education (JSS)",
    topics: [
      {
        id: "national_values",
        title: "National Values",
        juniorDesc: "Learn about honesty, discipline, self-reliance, and cooperation.",
        juniorGreeting: "Hello Teacher! 🤝 In Civic Education, we are discussing values. What is the difference between honesty and discipline, and why are values important for our country's growth?",
        juniorMarkingGuide: "JSS Civic Values: Define values [1 Mark]. Explain honesty (truthfulness) and discipline (following rules) [2 Marks]. State importance [1 Mark].",
        studyNotes: {
          concept: "Values are the beliefs, principles, and standards that guide human behavior and define what is acceptable in a society.",
          formulas: [],
          steps: [
            "Honesty: Truthfulness, transparency, and refusal to cheat or lie.",
            "Discipline: Self-control and obedience to rules and regulations.",
            "Cooperation: Working together with others to achieve a shared goal.",
            "Importance: Promotes peace, reduces crime, and encourages national development."
          ],
          workedExample: "Question: Define values, and list three positive values that can help reduce corruption in Nigeria.\n\nAnswer:\n1. Values are core principles and moral standards that guide how people behave in a society.\n2. Core values to fight corruption: Integrity (acting morally at all times), Discipline (refusing shortcuts and respecting processes), and Patriotism (putting the country's interest first)."
        }
      },
      {
        id: "cooperation",
        title: "Honesty & Cooperation",
        juniorDesc: "Learn the benefits of working together and being truthful in public life.",
        juniorGreeting: "Good day, Teacher! Why is cooperation important in school and at home? What happens when citizens refuse to cooperate with the government?",
        juniorMarkingGuide: "JSS Civic Cooperation: Define cooperation [2 Marks]. List 2 benefits of cooperation (faster goal achievement, peace, progress) [2 Marks].",
        studyNotes: {
          concept: "Cooperation is the process of working together to achieve a common goal. Honesty is the quality of being truthful, sincere, and trustworthy.",
          formulas: [],
          steps: [
            "Benefits of Cooperation: Leads to faster achievement of goals, fosters unity and love, maintains peace, and prevents conflicts.",
            "Attributes of Honesty: Integrity, transparency, fairness."
          ],
          workedExample: "Question: State three benefits of cooperation in a classroom setting and list two attributes of an honest student.\n\nAnswer:\nBenefits of cooperation:\n1. It makes learning easier through study groups.\n2. It builds friendships and reduces bullying.\n3. It helps complete classroom projects quickly.\nAttributes of honesty:\n1. Telling the truth even when in trouble.\n2. Returning lost items to the owner or teacher."
        }
      },
      {
        id: "traffic_rules",
        title: "Traffic Regulations",
        juniorDesc: "Learn rules for road users and the role of traffic lights and wardens.",
        juniorGreeting: "Hi Teacher! 🚦 Why do we have traffic regulations? What are the duties of the Federal Road Safety Corps (FRSC) on our highways?",
        juniorMarkingGuide: "JSS Civic Traffic: Define traffic regulations [1 Mark]. List 3 rules (wear seatbelt, do not speed, obey traffic lights) [2 Marks]. State FRSC role [1 Mark].",
        studyNotes: {
          concept: "Traffic regulations are rules and laws that direct the behavior of road users (drivers, pedestrians, cyclists) to ensure safety on the road.",
          formulas: [],
          steps: [
            "Regulatory Signs: Speed limits, No U-Turn (circular shapes).",
            "Safety Rules: Wear seatbelts, do not make phone calls while driving, do not drive under the influence, obey traffic lights.",
            "Agencies: FRSC, VIO, traffic wardens."
          ],
          workedExample: "Question: State three traffic regulations that drivers in Nigeria must obey and name the primary agency that enforces highway safety.\n\nAnswer:\n1. Regulations: Drivers must always wear their seatbelts, must not exceed the specified speed limit, and must stop at a red traffic light.\n2. Enforcing Agency: FRSC (Federal Road Safety Corps)."
        }
      },
      {
        id: "community_service",
        title: "Community Service",
        juniorDesc: "Understand volunteer work, cleaning public spaces, and community development.",
        juniorGreeting: "Hello Teacher! 🧹 What is community service? Why should we volunteer to clean our streets or plant trees for free? How does it benefit us?",
        juniorMarkingGuide: "JSS Civic Service: Define community service as voluntary work [2 Marks]. List 2 examples (cleaning drainage, planting trees, directing traffic) [2 Marks].",
        studyNotes: {
          concept: "Community service is unpaid, voluntary work performed by an individual or group for the benefit and development of their local community.",
          formulas: [],
          steps: [
            "Examples: Clearing gutters, maintaining public parks, painting community centers, teaching free lessons to younger children.",
            "Benefits: Fosters patriotism, keeps environment healthy, reduces government spending, builds team spirit."
          ],
          workedExample: "Question: Define community service, and suggest three volunteer projects JSS students can start in their school compound.\n\nAnswer:\n1. Community service is voluntary, unpaid labor done to support and improve the local community.\n2. Student projects: Organizing a weekly litter-picking campaign, planting flowers along school pathways, and volunteering to keep the library neat."
        }
      },
      {
        id: "constitution_jss",
        title: "Constitution & Laws",
        juniorDesc: "Learn what a constitution is, types of constitutions, and why laws are made.",
        juniorGreeting: "Good day, Teacher! 📖 What is a Constitution? Why is it called the supreme law of the land, and what is the difference between written and unwritten constitutions?",
        juniorMarkingGuide: "JSS Civic Constitution: Define constitution [2 Marks]. Differentiate written (codified in single document) vs unwritten constitution [2 Marks].",
        studyNotes: {
          concept: "A Constitution is the body of fundamental principles, rules, and laws according to which a state or country is governed.",
          formulas: [],
          steps: [
            "Supreme Law: All other laws must agree with the constitution; if they contradict it, they are invalid.",
            "Written Constitution: Codified in a single document (e.g. Nigeria, USA).",
            "Unwritten Constitution: Not in a single document, made of various laws, customs, and court judgments (e.g. United Kingdom)."
          ],
          workedExample: "Question: Define a constitution, and state two reasons why a country needs a constitution to survive.\n\nAnswer:\n1. A constitution is the fundamental book of laws that defines how a country is governed and outlines the powers of the rulers.\n2. Importance:\n   - It protects the rights and freedoms of the citizens from abuse of power.\n   - It defines the duties, rights, and limits of the executive, legislative, and judicial arms of government."
        }
      },
      {
        id: "democratic_values",
        title: "Democratic Values",
        juniorDesc: "Understand voting, majority rule, tolerance, and respect for minority rights.",
        juniorGreeting: "Hello Teacher! 🗳️ What is democracy? What are the core values of democracy, and why must the majority respect the opinions of the minority?",
        juniorMarkingGuide: "JSS Civic Democracy: Define democracy (government of the people) [1 Mark]. List 3 democratic values (voting/elections, tolerance, rule of law, equality) [3 Marks].",
        studyNotes: {
          concept: "Democracy is a system of government where power is vested in the people, who rule either directly or through elected representatives.",
          formulas: [],
          steps: [
            "Rule of Law: The law applies equally to everyone, including leaders.",
            "Tolerance: Accepting different political views, religions, and ethnic groups.",
            "Equality: Every citizen has equal rights and opportunities under the law."
          ],
          workedExample: "Question: Define democracy and state three values that support a democratic society.\n\nAnswer:\n1. Democracy is a system of government where the citizens elect their leaders in free and fair elections.\n2. Democratic values: Rule of law (nobody is above the law), Political tolerance (respecting opposing opinions), and Citizen participation (voting in elections)."
        }
      },
      {
        id: "national_symbols_jss",
        title: "National Symbols",
        juniorDesc: "Identify national symbols and how to show respect for the flag and anthem.",
        juniorGreeting: "Hi Teacher! How do we show respect for the national flag and the national anthem? What happens if someone treats them with disrespect?",
        juniorMarkingGuide: "JSS Civic Symbols: List 3 national symbols [2 Marks]. Explain how to show respect (standing at attention, flying flag properly) [2 Marks].",
        studyNotes: {
          concept: "National symbols represent the sovereignty, heritage, and values of a nation. Respecting them is a key duty of citizenship.",
          formulas: [],
          steps: [
            "Respecting Anthem: Stand at attention when it is played, face the flag, and do not make noise.",
            "Respecting Flag: Do not allow it to touch the ground, do not fly a torn flag, lower it at sunset."
          ],
          workedExample: "Question: State three national symbols of Nigeria and explain how citizens should behave when the national anthem is being sung.\n\nAnswer:\n1. Symbols: The National Flag, the Coat of Arms, and the National Passport.\n2. Behavior: Citizens must stand at attention (upright, hands at their sides), face the flag if visible, remain silent, and sing along with dignity."
        }
      },
      {
        id: "self_reliance",
        title: "Self-Reliance",
        juniorDesc: "Learn how starting skills and small businesses makes a person independent.",
        juniorGreeting: "Good day, Teacher! What does it mean to be self-reliant? Why is acquiring hand skills (like carpentry or tailoring) better than waiting for government jobs?",
        juniorMarkingGuide: "JSS Civic Self-Reliance: Define self-reliance [2 Marks]. List 2 benefits (financial independence, job creation, poverty reduction) [2 Marks].",
        studyNotes: {
          concept: "Self-reliance is the ability to depend on oneself, using personal skills and resources to earn a living without relying solely on employment from others or the government.",
          formulas: [],
          steps: [
            "Skills: Entrepreneurship, handcrafts, technical skills, agriculture.",
            "Benefits: Promotes financial independence, creates employment, boosts local economy, reduces poverty."
          ],
          workedExample: "Question: Define self-reliance and list three vocational skills that can make secondary school graduates independent.\n\nAnswer:\n1. Self-reliance is the ability to rely on one's own efforts, skills, and resources to solve problems and make a living.\n2. Vocational skills: Computer programming/coding, tailoring/fashion design, and catering/bakery."
        }
      },
      {
        id: "cultural_diversity",
        title: "Cultural Diversity",
        juniorDesc: "Understand different ethnic groups in Nigeria and how to live in peace.",
        juniorGreeting: "Hello Teacher! Nigeria has over 250 ethnic groups. Why is cultural diversity a strength, and how can we prevent tribal conflicts in our schools?",
        juniorMarkingGuide: "JSS Civic Diversity: State Nigeria is multi-ethnic [1 Mark]. List 3 major ethnic groups (Hausa, Igbo, Yoruba) [1 Mark]. List 2 ways to promote unity (tolerance, inter-tribal marriage) [2 Marks].",
        studyNotes: {
          concept: "Cultural diversity refers to the existence of a variety of cultural or ethnic groups within a single society.",
          formulas: [],
          steps: [
            "Major Groups in Nigeria: Hausa, Igbo, Yoruba, Ijaw, Tiv, Fulani, Kanuri, etc.",
            "Unity Strategies: Mutual respect, celebrating other cultures, inter-marriage, national festivals (NYSC)."
          ],
          workedExample: "Question: Why does Nigeria have diverse cultures, and suggest two ways to promote peace among different ethnic groups in a boarding school.\n\nAnswer:\n1. Diversity: Nigeria has over 250 ethnic groups with unique history, languages, and locations before amalgamation.\n2. School Peace: Organizing cultural days where students dress in other tribes' attire and eat their foods, and enforcing zero-tolerance rules against tribal slurs or bullying."
        }
      },
      {
        id: "public_property",
        title: "Community Service & Public Property",
        juniorDesc: "Learn how to take care of public properties like schools, parks, and roads.",
        juniorGreeting: "Hi Teacher! Who owns public properties like our school desks, street lights, and tap water? Why do some people vandalize them, and how do we protect them?",
        juniorMarkingGuide: "JSS Civic Property: Define public property (owned by government/community) [1 Mark]. Give 3 examples [1 Mark]. List 2 ways to protect them [2 Marks].",
        studyNotes: {
          concept: "Public property is property owned by the government or the community for collective use, rather than by private individuals.",
          formulas: [],
          steps: [
            "Examples: Public schools, hospitals, roads, street lights, government buses, public water systems.",
            "Protection: Avoid vandalism, report damage immediately, keep them clean, build civic responsibility."
          ],
          workedExample: "Question: Define public property, list three examples, and suggest two ways to prevent the vandalism of public properties in local communities.\n\nAnswer:\n1. Public property is property funded by taxpayers and owned by the government for the benefit and use of the general public.\n2. Examples: Public schools, federal roads, and community tap water systems.\n3. Prevention: Forming community vigilante groups to watch over public assets, and reporting any suspicious activity or vandalism to the police."
        }
      }
    ]
  },
  python: {
    id: "python",
    name: "Computer Studies (JSS)",
    topics: [
      {
        id: "what_computer",
        title: "Introduction to Computers",
        juniorDesc: "Learn what a computer is, data input, processing, output, and storage.",
        juniorGreeting: "Hi Teacher! 👋 We are starting Computer Studies. What is the definition of a computer? What are the four main jobs a computer does?",
        juniorMarkingGuide: "JSS Computer Intro: Define computer as electronic machine [1 Mark]. List 4 basic functions (Input, Processing, Output, Storage - IPOS) [3 Marks].",
        studyNotes: {
          concept: "A computer is an electronic device that accepts raw data as input, processes it, stores it, and produces output information.",
          formulas: [],
          steps: [
            "Input: Entering data into the computer (e.g. typing).",
            "Processing: Working on the data (performed by the CPU).",
            "Output: Displaying the results (e.g. showing on monitor).",
            "Storage: Saving data for later (performed by hard drive)."
          ],
          workedExample: "Question: Define a computer and outline the four stages of the IPOS cycle.\n\nAnswer:\n1. A computer is an electronic machine that processes data to produce meaningful information.\n2. IPOS Cycle:\n   - Input: Typing numbers using a keyboard.\n   - Processing: The CPU adding those numbers together.\n   - Output: Showing the sum on the monitor.\n   - Storage: Saving the calculation on a USB drive."
        }
      },
      {
        id: "input_output",
        title: "Input & Output Devices",
        juniorDesc: "Learn the difference between input devices (keyboard) and output devices (monitor).",
        juniorGreeting: "Good day, Teacher! ⌨️ I'm setting up a desktop computer. What is the difference between an input device and an output device? Is a printer input or output?",
        juniorMarkingGuide: "JSS Computer Devices: Differentiate input (data in) vs output (info out) [2 Marks]. Give 2 correct examples of each [2 Marks].",
        studyNotes: {
          concept: "Input devices feed data into the computer. Output devices convert electronic signals from the computer into a form that humans can understand.",
          formulas: [],
          steps: [
            "Input Examples: Keyboard, mouse, scanner, microphone, barcode reader.",
            "Output Examples: Monitor, printer, speaker, projector.",
            "Dual Devices: Touchscreen (both input and output)."
          ],
          workedExample: "Question: Classify the following devices: Keyboard, Monitor, Printer, Mouse, Speakers, Scanner.\n\nAnswer:\n1. Input Devices: Keyboard (types text), Mouse (moves cursor), Scanner (digitizes photos).\n2. Output Devices: Monitor (displays screen), Printer (prints paper), Speakers (produces sound)."
        }
      },
      {
        id: "software_intro",
        title: "Computer Software",
        juniorDesc: "Understand System Software (operating systems) and Application Software.",
        juniorGreeting: "Hello Teacher! My laptop runs Windows, and I use Microsoft Word for assignments. What is the difference between System Software and Application Software?",
        juniorMarkingGuide: "JSS Computer Software: Define software [1 Mark]. Differentiate System Software (runs hardware, e.g. OS) vs Application Software (tasks, e.g. Word/Games) [3 Marks].",
        studyNotes: {
          concept: "Software is the set of instructions or programs that tell the computer hardware what to do.",
          formulas: [],
          steps: [
            "System Software: Controls and manages the computer hardware (e.g., Operating Systems like Windows, macOS, Android).",
            "Application Software: Allows users to perform specific tasks (e.g., web browsers, word processors, games)."
          ],
          workedExample: "Question: Define software, and classify Windows 11, MS Excel, WhatsApp, and Google Chrome into system or application software.\n\nAnswer:\n1. Software is the intangible set of programs that runs the computer.\n2. Classifications:\n   - System Software: Windows 11 (operating system).\n   - Application Software: MS Excel (spreadsheet), WhatsApp (chat app), Google Chrome (browser)."
        }
      },
      {
        id: "variables_print",
        title: "Variables & Print in Python",
        juniorDesc: "Learn how to store values in variables and display them using print().",
        juniorGreeting: "Hi Teacher! 🐍 I want to write my first Python code. What is a variable in programming? How do I write a code that prints 'Hello Teacher' on the screen?",
        juniorMarkingGuide: "JSS Computer Python: Define variable as memory container [1 Mark]. Write valid print() command syntax [2 Marks]. Declare a variable [1 Mark].",
        studyNotes: {
          concept: "A variable is a labeled container in memory used to store data values. The print() function displays text or variables on the screen.",
          formulas: [
            "\\text{Syntax: } \\text{print}(\\text{\"text\"})"
          ],
          steps: [
            "Declare a variable by giving it a name and assigning a value with '=' (e.g. age = 13).",
            "Use print() to display variables or literal strings.",
            "Strings must be wrapped in quotation marks."
          ],
          workedExample: "Problem: Write Python code that creates a variable called name, stores your name in it, and prints it with a greeting.\n\nCode:\nname = \"Chidi\"\nprint(\"Hello \", name)\n\nOutput:\nHello Chidi"
        }
      },
      {
        id: "python_math",
        title: "Simple Calculations in Python",
        juniorDesc: "Use Python to add, subtract, multiply, and divide numbers.",
        juniorGreeting: "Good day, Teacher! 🐍 Can I use Python as a calculator? How do I write a program that adds two numbers together and prints the sum?",
        juniorMarkingGuide: "JSS Computer Python: Declare 2 number variables [1 Mark]. Use correct arithmetic operator (+, -, *, /) [2 Marks]. Print result [1 Mark].",
        studyNotes: {
          concept: "Python uses standard operators for arithmetic calculations: + (addition), - (subtraction), * (multiplication), and / (division).",
          formulas: [
            "x = a + b \\quad \\text{(Addition)}",
            "y = a \\times b \\implies \\text{code: } y = a * b"
          ],
          steps: [
            "Assign values to variables.",
            "Perform the arithmetic operation and store it in a result variable.",
            "Print the result variable."
          ],
          workedExample: "Problem: Write Python code to multiply 5 and 6 and print the product.\n\nCode:\na = 5\nb = 6\nproduct = a * b\nprint(\"The product is:\", product)\n\nOutput:\nThe product is: 30"
        }
      },
      {
        id: "python_strings",
        title: "Strings in Python",
        juniorDesc: "Learn what strings are and how to join two strings together (concatenation).",
        juniorGreeting: "Hello Teacher! I see text inside quotation marks in Python code, like \"apple\". What is a string? How do I join two strings together?",
        juniorMarkingGuide: "JSS Computer Python: Define string as text [1 Mark]. Explain string concatenation using '+' operator [2 Marks]. Write code example [1 Mark].",
        studyNotes: {
          concept: "A string is a sequence of characters wrapped in single or double quotes. Joining strings together is called concatenation, performed using the '+' operator.",
          formulas: [
            "\\text{Concatenation: } c = a + \\text{\" \"} + b"
          ],
          steps: [
            "Wrap text variables in quotes: e.g., first = \"Purple\".",
            "Use '+' to link text together: e.g., full = first + \"School\".",
            "Print the concatenated variable."
          ],
          workedExample: "Problem: Concatenate first name 'Goodness' and last name 'Chidi' with a space in between.\n\nCode:\nfirst = \"Goodness\"\nlast = \"Chidi\"\nfull_name = first + \" \" + last\nprint(full_name)\n\nOutput:\nGoodness Chidi"
        }
      },
      {
        id: "if_conditions",
        title: "Simple if conditions",
        juniorDesc: "Write code that makes decisions: 'if age > 18: print(Adult)'.",
        juniorGreeting: "Hi Teacher! 🐍 How do I make my program make decisions? Like, if my score is 50 or more, print 'Pass', otherwise print 'Fail'?",
        juniorMarkingGuide: "JSS Computer Python: Write valid 'if' statement syntax with colon [2 Marks]. Use 'else' block correctly [1 Mark]. Indent code block [1 Mark].",
        studyNotes: {
          concept: "Conditional statements control the flow of code execution based on comparison checks (if conditions). Indentation (spaces at start of line) is mandatory in Python.",
          formulas: [
            "\\text{Syntax: if condition: } \\implies \\text{ indent code}"
          ],
          steps: [
            "Write the 'if' keyword followed by a comparison condition (e.g. score >= 50).",
            "End the 'if' line with a colon (:).",
            "Indent the code that runs if the condition is true.",
            "Write 'else:' (aligned with if) to handle the alternative case."
          ],
          workedExample: "Problem: Write Python code that checks if a score is 50 or above, and prints 'Pass', else prints 'Fail'.\n\nCode:\nscore = 65\nif score >= 50:\n    print(\"Pass\")\nelse:\n    print(\"Fail\")\n\nOutput:\nPass"
        }
      },
      {
        id: "python_lists",
        title: "Lists in Python (Basic)",
        juniorDesc: "Learn how to store multiple items in a single variable using square brackets.",
        juniorGreeting: "Good day, Teacher! If I want to save a list of my favorite fruits, like apple, banana, orange. Do I have to create 3 variables, or is there a list variable in Python?",
        juniorMarkingGuide: "JSS Computer Python: Declare a list using square brackets [2 Marks]. Access list item by index [2 Marks].",
        studyNotes: {
          concept: "A list is a data structure in Python that stores multiple items in a single variable, enclosed in square brackets [] and separated by commas.",
          formulas: [
            "\\text{List declaration: } \\text{items} = [a, b, c]"
          ],
          steps: [
            "Declare a list: e.g. fruits = [\"apple\", \"banana\", \"mango\"].",
            "Access elements using indices, starting from 0 (e.g. fruits[0] is \"apple\")."
          ],
          workedExample: "Problem: Declare a list of 3 subjects and print the first subject.\n\nCode:\nsubjects = [\"Math\", \"Basic Science\", \"English\"]\nprint(subjects[0])\n\nOutput:\nMath"
        }
      },
      {
        id: "python_loops_jss",
        title: "Writing a Loop (Basic)",
        juniorDesc: "Learn how to repeat a print statement 5 times using 'for i in range(5)'.",
        juniorGreeting: "Hello Teacher! I want my program to print 'I love coding' 10 times. Do I have to write the print line 10 times, or is there a loop I can write?",
        juniorMarkingGuide: "JSS Computer Python: Write valid 'for i in range(...):' loop syntax [2 Marks]. Use colon and indent the loop body [2 Marks].",
        studyNotes: {
          concept: "Loops are used to repeat a block of code multiple times. A 'for' loop combined with range() is the simplest way to repeat an action in Python.",
          formulas: [
            "\\text{for i in range(N):}"
          ],
          steps: [
            "Write the loop header: for i in range(10):",
            "Put a colon at the end of the header.",
            "Indent the code lines inside the loop.",
            "Python will run the indented code block N times."
          ],
          workedExample: "Problem: Write Python code that prints the numbers 0 to 4 using a loop.\n\nCode:\nfor i in range(5):\n    print(i)\n\nOutput:\n0\n1\n2\n3\n4"
        }
      },
      {
        id: "digital_safety",
        title: "Digital Safety",
        juniorDesc: "Understand password security, virus protection, and avoiding strangers online.",
        juniorGreeting: "Hi Teacher! 💻 When browsing the internet, how do I stay safe? What makes a password strong, and why shouldn't I share my real name and address with strangers?",
        juniorMarkingGuide: "JSS Computer Safety: Define password safety rules (symbols, length) [2 Marks]. Explain dangers of sharing personal information online [2 Marks].",
        studyNotes: {
          concept: "Digital safety (cybersecurity) is the practice of protecting personal information, devices, and online identity from cyber threats and online predators.",
          formulas: [],
          steps: [
            "Create strong passwords: Minimum 8 characters, mix of capital letters, numbers, and symbols (e.g., $tr0ngP@ss!).",
            "Do not share personal details: Address, phone number, school name.",
            "Never download attachments from unknown emails (prevent virus infection)."
          ],
          workedExample: "Question: List three rules for creating a secure online password and state one rule about online strangers.\n\nAnswer:\nPassword rules:\n1. It should be at least 8 characters long.\n2. It should not contain personal names or birth dates.\n3. It must contain a mix of uppercase, lowercase, numbers, and symbols.\nStranger rule:\n1. Never share personal information, photos, or agree to meet someone in person that you only met online."
        }
      }
    ]
  },
  ai: {
    id: "ai",
    name: "Introductory AI (JSS)",
    topics: [
      {
        id: "what_is_ai",
        title: "What is Artificial Intelligence?",
        juniorDesc: "Understand what AI is and how it makes machines perform smart tasks.",
        juniorGreeting: "Hi Teacher! 🤖 What is Artificial Intelligence (AI)? How does a computer code act like a smart human, and can a machine actually think like us?",
        juniorMarkingGuide: "JSS AI Intro: Define AI as machines performing tasks that usually require human intelligence [2 Marks]. List 2 daily examples [2 Marks].",
        studyNotes: {
          concept: "Artificial Intelligence (AI) is the science of training computers and machines to perform tasks that typically require human intelligence, such as reasoning and problem-solving.",
          formulas: [],
          steps: [
            "Human intelligence: learning, adapting, recognizing speech.",
            "AI: mimicking these functions using software code.",
            "Examples: Siri, Netflix recommendations, automatic face filters."
          ],
          workedExample: "Question: Define Artificial Intelligence in your own words and list three devices in your home or school that use AI.\n\nAnswer:\n1. Artificial Intelligence is the capability of a computer program or machine to learn, make decisions, and solve problems like a human.\n2. Examples: Voice assistants on smartphones (Siri/Google Assistant), email spam filters, and video recommendation algorithms on YouTube."
        }
      },
      {
        id: "voice_assistants",
        title: "Smart Assistants (Siri/Google)",
        juniorDesc: "Learn how phone assistants understand our voice commands.",
        juniorGreeting: "Good day, Teacher! 🎤 When I talk to my phone and say 'Hey Siri, set an alarm', how does it understand my voice? How does it translate my sound into words?",
        juniorMarkingGuide: "JSS AI Voice: Explain Natural Language Processing (NLP) / Speech Recognition [2 Marks]. Identify conversion from sound wave to text code [2 Marks].",
        studyNotes: {
          concept: "Smart assistants use Speech Recognition and Natural Language Processing (NLP) to convert human vocal sounds into digital text, analyze the intent, and execute the command.",
          formulas: [],
          steps: [
            "Microphone captures sound waves.",
            "Speech recognition AI converts sound frequencies into words (text).",
            "NLP AI processes what the words mean.",
            "The assistant performs the action and replies using synthetic voice."
          ],
          workedExample: "Question: Outline the step-by-step process of how Google Assistant responds when a user says 'What is the weather today?'\n\nAnswer:\n1. Speech to Text: The assistant's microphone records the user's sound wave and converts it into text: 'What is the weather today?'\n2. Intent Analysis (NLP): The AI processes the text to identify the intent ('weather forecast') and location ('user's current location').\n3. Data Retrieval & Response: The system checks weather data online and reads the temperature back to the user."
        }
      },
      {
        id: "robots_sensors",
        title: "Robots & Sensors",
        juniorDesc: "Learn how robots use sensors (eyes/ears) to move and avoid walls.",
        juniorGreeting: "Hello, Teacher! 🤖 What is the difference between a normal factory machine and a robot? How do smart vacuum cleaners avoid bumping into chairs?",
        juniorMarkingGuide: "JSS AI Robots: Define robot [1 Mark]. Explain how sensors act like human senses [2 Marks]. Give example of sensor (ultrasonic/infrared) [1 Mark].",
        studyNotes: {
          concept: "A robot is a programmable machine that can carry out actions automatically. Sensors act as the robot's eyes, ears, and touch to interact with the environment.",
          formulas: [],
          steps: [
            "Sensors capture data (input): Ultrasonic (distance/avoid walls), Infrared (light/obstacles), Camera (eyes).",
            "Microprocessor processes data (decisions).",
            "Actuators perform action (output): motors turning wheels, robotic arms moving."
          ],
          workedExample: "Question: Explain how sensors help a self-driving robotic toy car avoid hitting a wall.\n\nAnswer:\n1. The toy car has an ultrasonic sensor on its bumper that emits high-frequency sound waves.\n2. The waves bounce off the wall and return to the sensor.\n3. The processor calculates the distance based on the echo time. If the distance is less than 10cm, the processor sends a command to the wheel motors to stop and turn around."
        }
      },
      {
        id: "computer_vision_intro",
        title: "Computer Vision (How AI sees)",
        juniorDesc: "Understand how AI recognizes faces in photos by looking at pixels.",
        juniorGreeting: "Hi Teacher! 📸 When I upload a photo to social media, how does the AI automatically know where my face is to tag me? How does a computer 'see' an image?",
        juniorMarkingGuide: "JSS AI Vision: Explain computers see images as grids of pixels (numbers) [2 Marks]. Explain pattern recognition for facial features [2 Marks].",
        studyNotes: {
          concept: "Computer Vision is a field of AI that trains computers to interpret and understand the visual world. Computers see images as large grids of numerical pixels (color values).",
          formulas: [],
          steps: [
            "Image is loaded as a 2D grid of numbers (R, G, B values for each pixel).",
            "AI scans for contrast patterns: dark lines for eyebrows, lighter circles for eyes.",
            "Matches these patterns against database features to recognize faces."
          ],
          workedExample: "Question: How does a computer represent a digital image, and how does this enable face detection?\n\nAnswer:\n1. A computer represents an image as a matrix of pixels. Each pixel has numbers representing color intensity (e.g. RGB values between 0 and 255).\n2. Face detection AI scans this grid looking for specific contrast boundaries (such as the shadows of the nose bridge and eye sockets) to outline a face."
        }
      },
      {
        id: "chatbots_intro",
        title: "Chatbots (Text Generation)",
        juniorDesc: "Learn how chatbots like ChatGPT write letters and answers by predicting the next word.",
        juniorGreeting: "Good day, Teacher! 💬 When I chat with an AI chatbot, how does it write such long, smart essays? Does it copy from Wikipedia, or does it write it word-by-word?",
        juniorMarkingGuide: "JSS AI Chatbots: State AI predicts the next word based on patterns in training data [2 Marks]. Explain that it does not copy directly but generates new sentences [2 Marks].",
        studyNotes: {
          concept: "AI Chatbots use language models trained on massive libraries of text to predict the most likely next word in a sentence based on the user's prompt.",
          formulas: [],
          steps: [
            "AI analyzes the prompt typed by the user.",
            "It searches its neural connections for patterns related to the topic.",
            "It generates responses word-by-word, predicting the next word sequentially rather than copy-pasting."
          ],
          workedExample: "Question: Does ChatGPT copy its answers from a secret database? Explain how it writes replies.\n\nAnswer:\nNo, ChatGPT does not copy answers directly from a database. Instead, it is a language predictor. During training, it analyzed billions of sentences to learn word associations. When you ask a question, it computes the most logical next word to output, writing the answer dynamically word-by-word based on probability."
        }
      },
      {
        id: "self_driving_intro",
        title: "Self-Driving Cars",
        juniorDesc: "Learn how autonomous cars use cameras and AI to stay in lanes and stop at stop signs.",
        juniorGreeting: "Hello Teacher! 🚗 I saw a video of a Tesla driving itself. How does a car know when to turn, when to brake, and how does it spot traffic signs?",
        juniorMarkingGuide: "JSS AI Driving: Name sensors (cameras, LiDAR) [2 Marks]. Explain AI object detection (identifying pedestrians, signs) and decision logic [2 Marks].",
        studyNotes: {
          concept: "Self-driving (autonomous) cars use a combination of cameras, sensors, and machine learning algorithms to map their surroundings and navigate safely.",
          formulas: [],
          steps: [
            "Perception: Cameras and LiDAR map lane markers, traffic lights, and objects.",
            "Classification: AI labels detected items (e.g. 'pedestrian', 'stop sign').",
            "Planning: Decision algorithms choose speed, steering, and braking."
          ],
          workedExample: "Question: List three sensors used by a self-driving car and explain what happens when the car's AI detects a red octagon shape.\n\nAnswer:\n1. Sensors: Cameras, LiDAR (laser scanner), and Radar.\n2. Red octagon detection: The camera captures the shape. The image processing AI classifies it as a 'Stop Sign'. The driving controller immediately sends a command to apply the brakes and halt the car."
        }
      },
      {
        id: "pattern_recognition",
        title: "Pattern Recognition",
        juniorDesc: "Understand how AI classifies objects (like cat vs dog) based on shared patterns.",
        juniorGreeting: "Hi Teacher! How does a computer learn to separate photos of cats from photos of dogs? What features does it look at to classify them?",
        juniorMarkingGuide: "JSS AI Patterns: Explain feature extraction (ears shape, nose shape) [2 Marks]. Define classification as grouping based on similarities [2 Marks].",
        studyNotes: {
          concept: "Pattern recognition is the automated labeling of data patterns by AI models. Models extract specific features (shapes, edges) to classify objects.",
          formulas: [],
          steps: [
            "Feature extraction: AI measures length, shapes, textures (e.g. pointy ears vs floppy ears).",
            "Comparison: AI compares these measurements to historical trained data.",
            "Classification: It outputs a probability label (e.g. 95% Cat)."
          ],
          workedExample: "Question: If you want to train an AI to recognize mangoes from oranges, what features should the AI look at?\n\nAnswer:\n1. Color: Oranges are orange, while ripe mangoes are yellow/green.\n2. Shape: Oranges are spherical (round), while mangoes are oval/oblong.\n3. Texture: Oranges have dimpled skin, while mangoes have smooth skin."
        }
      },
      {
        id: "gaming_ai",
        title: "AI in Gaming",
        juniorDesc: "Learn how computer opponents play chess or Ludo using search trees.",
        juniorGreeting: "Good day, Teacher! 🎮 When I play chess or FIFA against the computer, how does the computer decide its next move? Does it cheat, or is it calculating possible moves?",
        juniorMarkingGuide: "JSS AI Games: Explain the search tree concept (calculating future moves) [2 Marks]. State that AI evaluates scores for board positions [2 Marks].",
        studyNotes: {
          concept: "Game AI calculates possible future moves and scores them. It chooses the move that maximizes its chance of winning and minimizes the player's chances.",
          formulas: [],
          steps: [
            "Generate all valid moves for the current turn.",
            "For each move, simulate the opponent's best possible responses (search tree).",
            "Score each resulting board position (e.g., +10 for capturing a pawn, -100 for losing the queen).",
            "Choose the move with the highest score."
          ],
          workedExample: "Question: How does a computer opponent in a game of Tic-Tac-Toe decide where to place its mark?\n\nAnswer:\n1. The AI looks at all empty slots on the board.\n2. It simulates what happens if it marks each slot, checking if it can win immediately or block the player.\n3. It scores the slots (e.g. Win = +100, Block Player = +50, Neutral = 0).\n4. It places its mark on the slot with the highest score."
        }
      },
      {
        id: "ai_privacy",
        title: "AI Safety & Privacy",
        juniorDesc: "Understand the importance of data privacy and why AI needs safe rules.",
        juniorGreeting: "Hello Teacher! Why does AI need so much of my data to work? Is it safe to let apps track my location or read my chat messages? What is data privacy?",
        juniorMarkingGuide: "JSS AI Safety: Define data privacy [2 Marks]. Explain risk of data tracking and leaks [2 Marks].",
        studyNotes: {
          concept: "AI safety and privacy involve safeguarding user data from misuse by algorithms. Since AI learns from data, apps collect vast amounts of personal info.",
          formulas: [],
          steps: [
            "Data Collection: Location, search history, text chats are recorded to train models.",
            "Privacy Risk: Hackers leaking databases, companies selling profile details to advertisers.",
            "Protection: Read permissions, use strong passwords, do not share private photos or secrets with AI."
          ],
          workedExample: "Question: State two reasons why you should be careful when sharing personal information with online AI chatbots.\n\nAnswer:\n1. Chatbot conversations are often stored on server databases and reviewed by human trainers, meaning your private info is no longer secret.\n2. If the company's database is hacked, your conversations and details could be leaked to the public."
        }
      },
      {
        id: "machine_learning_intro",
        title: "Machine Learning Intro",
        juniorDesc: "Learn how computers learn from examples (data) instead of being programmed.",
        juniorGreeting: "Hi Teacher! What is the difference between writing traditional code rules and 'Machine Learning'? How does a computer learn from experience?",
        juniorMarkingGuide: "JSS AI Learning: Define machine learning as learning from data/examples [2 Marks]. Explain training process [2 Marks].",
        studyNotes: {
          concept: "Machine Learning (ML) is a branch of AI where computers learn rules automatically from datasets of examples, rather than having programmers write explicit instructions.",
          formulas: [],
          steps: [
            "Traditional Programming: Input Data + Rules = Output Answer.",
            "Machine Learning: Input Data + Output Answers = Trained Rules."
          ],
          workedExample: "Question: If you want a computer to detect spam emails, how is the Machine Learning approach different from traditional programming?\n\nAnswer:\n1. Traditional approach: A programmer writes rules manually like: 'If email contains the word BUY, mark as spam.'\n2. ML approach: You feed the computer 10,000 example emails already labeled as 'Spam' or 'Inbox'. The ML algorithm analyzes common word patterns and creates its own rules to identify spam."
        }
      }
    ]
  }
};


// ----------------------------------------------------
// 2. SENIOR SECONDARY SCHOOL (SSS) SUBJECTS DATABASE
// ----------------------------------------------------
export const sssSubjectsData: Record<string, Subject> = {
  math: {
    id: "math",
    name: "Mathematics (SSS)",
    topics: [
      {
        id: "quadratic",
        title: "Quadratic Equations",
        seniorDesc: "Solve quadratic equations using factorization, formula, and completing the square.",
        seniorGreeting: "Good day, Teacher! ⚡ I am studying advanced quadratic equations ax² + bx + c = 0. I saw this formula x = (-b ± √(b²-4ac))/2a. But what does the part under the square root do? What is the discriminant, and how does it tell us if roots are real or imaginary?",
        seniorMarkingGuide: "SS2 Math Quadratic Equations: State full quadratic formula [1 Mark]. Substitute coefficients correctly [1 Mark]. Explain discriminant b²-4ac [2 Marks]. Calculate correct real/imaginary roots [1 Mark].",
        studyNotes: {
          concept: "A quadratic equation is a polynomial equation of the second degree. The roots are calculated using the general formula, and the nature of roots is determined by the discriminant.",
          formulas: [
            "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}",
            "D = b^2 - 4ac \\quad \\text{(Discriminant)}"
          ],
          steps: [
            "Identify standard coefficients a, b, and c.",
            "Compute the discriminant D = b² - 4ac.",
            "Determine nature of roots: If D > 0 (two real roots), if D = 0 (one repeated root), if D < 0 (complex roots).",
            "Substitute into the quadratic formula to solve for x."
          ],
          workedExample: "Problem: Solve 2x² - 5x + 3 = 0.\n\nSolution:\n1. Identify: a = 2, b = -5, c = 3.\n2. Discriminant: D = (-5)² - 4(2)(3) = 25 - 24 = 1.\n3. Since D = 1 > 0, roots are real and distinct.\n4. Formula: x = [ -(-5) ± √1 ] / (2 * 2) = (5 ± 1) / 4.\n5. Solutions: x1 = 6/4 = 1.5, x2 = 4/4 = 1.\nAnswer: x = 1 or 1.5"
        }
      },
      {
        id: "simultaneous",
        title: "Simultaneous Equations",
        seniorDesc: "Solve two linear/quadratic variables using elimination, substitution, and graphical methods.",
        seniorGreeting: "Good day, Teacher! I have this set of equations: 2x + 3y = 12 and x - y = 1. How do I solve them simultaneously? Which method is faster: elimination or substitution?",
        seniorMarkingGuide: "SSS Math Simultaneous: Eliminate one variable by multiplication/substitition [2 Marks]. Solve for first variable [1 Mark]. Substitute back to find second variable [1 Mark].",
        studyNotes: {
          concept: "Simultaneous equations are a set of two or more equations containing multiple variables. Solving them means finding a common set of values that satisfies all equations.",
          formulas: [
            "a_1 x + b_1 y = c_1",
            "a_2 x + b_2 y = c_2"
          ],
          steps: [
            "Substitution Method: Express one variable in terms of the other from one equation, then substitute it into the second equation.",
            "Elimination Method: Multiply the equations by constants to make the coefficients of one variable equal, then add/subtract the equations to eliminate that variable."
          ],
          workedExample: "Problem: Solve simultaneously: x + y = 5 and 2x - y = 4.\n\nSolution:\n1. Add the two equations directly to eliminate 'y':\n   (x + y) + (2x - y) = 5 + 4\n   3x = 9\n   x = 3.\n2. Substitute x=3 into the first equation:\n   3 + y = 5\n   y = 2.\nAnswer: x = 3, y = 2"
        }
      },
      {
        id: "logarithms",
        title: "Indices & Logarithms",
        seniorDesc: "Apply the laws of indices and logarithms to simplify equations.",
        seniorGreeting: "Hello Teacher! I am working on indices and logs. If 2^x = 16, I know x = 4. But how do I write that using logarithms? What are the base properties of logs?",
        seniorMarkingGuide: "SSS Math Indices & Logs: Convert index form to log form [1 Mark]. State addition and subtraction laws [2 Marks]. Solve log equation [1 Mark].",
        studyNotes: {
          concept: "Indices represent power or exponents. Logarithms are the inverse of indices, answering the question: 'to what power must we raise a base to get this number?'",
          formulas: [
            "b^y = x \\iff \\log_b(x) = y",
            "\\log(A \\cdot B) = \\log(A) + \\log(B)",
            "\\log(\\frac{A}{B}) = \\log(A) - \\log(B)",
            "\\log(A^p) = p \\log(A)"
          ],
          steps: [
            "Simplify index equations by expressing bases as identical powers.",
            "Use log rules to contract sums/differences into single terms.",
            "Verify base bounds (base must be positive and not equal to 1)."
          ],
          workedExample: "Problem: Solve for x: log_2(x) + log_2(x - 2) = 3.\n\nSolution:\n1. Combine logs: log_2[ x(x - 2) ] = 3.\n2. Convert to index form: x(x - 2) = 2^3\n3. Simplify: x² - 2x = 8 -> x² - 2x - 8 = 0.\n4. Factorize: (x - 4)(x + 2) = 0.\n5. Solutions: x = 4 or x = -2. (Reject -2 since log of negative numbers is undefined).\nAnswer: x = 4"
        }
      },
      {
        id: "trigonometry",
        title: "Trigonometric Functions",
        seniorDesc: "Understand sine, cosine, tangent curves, right-angle triangles, and the sine/cosine rules.",
        seniorGreeting: "Good day, Teacher! 📐 I am studying trigonometry. How do we derive the Sine and Cosine rules, and when do we use the Cosine rule instead of Sine rule in solving triangles?",
        seniorMarkingGuide: "SSS Math Trig: State Sine rule (a/sinA = b/sinB) [1 Mark]. State Cosine rule (a² = b²+c²-2bc cosA) [1 Mark]. Perform correct triangle side calculation [3 Marks].",
        studyNotes: {
          concept: "Trigonometric functions map angles to side ratios. The Sine and Cosine rules allow us to solve for side lengths and angles in non-right-angled triangles.",
          formulas: [
            "\\frac{a}{\\sin(A)} = \\frac{b}{\\sin(B)} = \\frac{c}{\\sin(C)} \\quad \\text{(Sine Rule)}",
            "a^2 = b^2 + c^2 - 2bc \\cos(A) \\quad \\text{(Cosine Rule)}"
          ],
          steps: [
            "Use Sine Rule when: two angles and one side are known, or two sides and a non-included angle are known.",
            "Use Cosine Rule when: all three sides are known, or two sides and the included angle are known."
          ],
          workedExample: "Problem: In triangle ABC, b = 5cm, c = 8cm, and angle A = 60°. Find side a.\n\nSolution:\n1. Use Cosine Rule: a² = b² + c² - 2bc * cos(A)\n2. Substitute: a² = 5² + 8² - 2(5)(8) * cos(60°)\n3. Calculate: a² = 25 + 64 - 80 * (0.5) = 89 - 40 = 49.\n4. Solve: a = √49 = 7cm.\nAnswer: a = 7cm"
        }
      },
      {
        id: "coordinate_geometry",
        title: "Coordinate Geometry",
        seniorDesc: "Find slope, distance, midpoints, and linear equations of straight lines.",
        seniorGreeting: "Hello, Teacher! 📈 Given two points A(2, 3) and B(6, 11), how do I find the distance between them, their midpoint, and the gradient of the line connecting them?",
        seniorMarkingGuide: "SSS Math Coordinate: Calculate distance using Pythagoras [2 Marks]. Find slope (dy/dx) [1 Mark]. Write standard line equation y = mx + c [2 Marks].",
        studyNotes: {
          concept: "Coordinate geometry maps geometric shapes and lines onto a 2D Cartesian plane using numerical points (x, y).",
          formulas: [
            "d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2} \\quad \\text{(Distance)}",
            "m = \\frac{y_2 - y_1}{x_2 - x_1} \\quad \\text{(Gradient/Slope)}",
            "y - y_1 = m(x - x_1) \\quad \\text{(Line Equation)}"
          ],
          steps: [
            "Identify point coordinates (x1, y1) and (x2, y2).",
            "Substitute into the slope formula to find gradient m.",
            "Use the slope and one point to write the linear equation."
          ],
          workedExample: "Problem: Find the equation of the line passing through (2, 3) with gradient m = 2.\n\nSolution:\n1. Use formula: y - y1 = m(x - x1)\n2. Substitute: y - 3 = 2(x - 2)\n3. Expand: y - 3 = 2x - 4\n4. Rearrange: y = 2x - 1.\nAnswer: y = 2x - 1"
        }
      },
      {
        id: "advanced_prob",
        title: "Advanced Probability",
        seniorDesc: "Calculate dependent and independent events, mutually exclusive events, and conditional checks.",
        seniorGreeting: "Good day, Teacher! 🎲 What is the difference between independent events and mutually exclusive events? How do we use addition and multiplication laws?",
        seniorMarkingGuide: "SSS Math Probability: Define independent vs mutually exclusive [2 Marks]. Apply multiplication law (P(A∩B)=P(A)*P(B)) [1.5 Marks]. Apply addition law [1.5 Marks].",
        studyNotes: {
          concept: "Advanced probability handles compound events. Mutually exclusive events cannot happen at the same time. Independent events do not affect each other's outcomes.",
          formulas: [
            "P(A \\cup B) = P(A) + P(B) \\quad \\text{(Mutually Exclusive Addition)}",
            "P(A \\cap B) = P(A) \\times P(B) \\quad \\text{(Independent Multiplication)}"
          ],
          steps: [
            "Check if events can occur together: if yes, P(A∪B) = P(A) + P(B) - P(A∩B).",
            "Check if occurrence of A changes probability of B: if yes, conditional rules apply."
          ],
          workedExample: "Problem: If the probability of passing Math is 0.7 and passing English is 0.8, what is the probability of passing both if they are independent?\n\nSolution:\n1. Since they are independent: P(Math ∩ English) = P(Math) * P(English).\n2. Calculate: 0.7 * 0.8 = 0.56.\nAnswer: Probability = 0.56"
        }
      },
      {
        id: "sequence_series",
        title: "Sequence & Series (AP/GP)",
        seniorDesc: "Find terms and sum of Arithmetic Progressions (AP) and Geometric Progressions (GP).",
        seniorGreeting: "Hello Teacher! 📈 I have this sequence: 3, 7, 11, 15... I see it adds 4 every time. How do I find the 50th term? What if it is a geometric progression where it multiplies?",
        seniorMarkingGuide: "SSS Math Sequence: State nth term formula of AP [1 Mark]. Calculate common difference/ratio [1 Mark]. Solve for nth term or sum [3 Marks].",
        studyNotes: {
          concept: "An Arithmetic Progression (AP) changes by adding a constant difference (d). A Geometric Progression (GP) changes by multiplying a constant ratio (r).",
          formulas: [
            "U_n = a + (n - 1)d \\quad \\text{(AP nth term)}",
            "S_n = \\frac{n}{2}[2a + (n - 1)d] \\quad \\text{(AP Sum)}",
            "U_n = a \\cdot r^{n-1} \\quad \\text{(GP nth term)}"
          ],
          steps: [
            "Identify the first term (a) and common difference (d) or ratio (r).",
            "Choose the appropriate formula for the requested term or sum.",
            "Substitute and solve."
          ],
          workedExample: "Problem: Find the 10th term of the AP: 2, 5, 8, 11...\n\nSolution:\n1. Identify: a = 2, d = 5 - 2 = 3.\n2. Formula: Un = a + (n - 1)d\n3. Calculate: U10 = 2 + (10 - 1)3 = 2 + 9(3) = 2 + 27 = 29.\nAnswer: 10th term = 29"
        }
      },
      {
        id: "matrices",
        title: "Matrices & Determinants",
        seniorDesc: "Perform matrix addition, multiplication, determinants, and inverses of 2x2 matrices.",
        seniorGreeting: "Good day, Teacher! What is a matrix? How do I multiply two 2x2 matrices together, and why does matrix multiplication AB not equal BA?",
        seniorMarkingGuide: "SSS Math Matrices: Perform row-by-column multiplication correctly [2 Marks]. Calculate determinant (ad-bc) [1 Mark]. Find inverse [2 Marks].",
        studyNotes: {
          concept: "A matrix is a rectangular array of numbers arranged in rows and columns. Matrix multiplication is non-commutative (AB ≠ BA).",
          formulas: [
            "\\text{Det}(A) = ad - bc \\quad \\text{for } A = \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}",
            "A^{-1} = \\frac{1}{ad - bc} \\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix}"
          ],
          steps: [
            "Multiply row elements of first matrix by column elements of second matrix and sum.",
            "Calculate determinant. If det = 0, the matrix has no inverse (singular matrix).",
            "Swap main diagonal elements, negate opposite diagonal, and divide by determinant."
          ],
          workedExample: "Problem: Find determinant and inverse of A = [[2, 1], [4, 3]].\n\nSolution:\n1. Det = (2 * 3) - (1 * 4) = 6 - 4 = 2.\n2. Inverse = 1/2 * [[3, -1], [-4, 2]] = [[1.5, -0.5], [-2, 1]].\nAnswer: Det = 2, Inverse = [[1.5, -0.5], [-2, 1]]"
        }
      },
      {
        id: "differentiation",
        title: "Differentiation Calculus",
        seniorDesc: "Find derivatives of polynomials using power rule, product rule, and chain rule.",
        seniorGreeting: "Hello Teacher! ⚡ We are starting calculus. What does differentiation actually measure? How do we differentiate y = 3x^2 + 5x from first principles?",
        seniorMarkingGuide: "SSS Math Differentiation: Define derivative as rate of change [1 Mark]. Apply Power Rule (d/dx x^n = n*x^(n-1)) [2 Marks]. Apply Chain/Product rule [2 Marks].",
        studyNotes: {
          concept: "Differentiation is the mathematical process of finding the rate of change or gradient of a function at any given point.",
          formulas: [
            "\\frac{d}{dx}(x^n) = n \\cdot x^{-1} \\quad \\text{(Power Rule)}",
            "\\frac{d}{dx}(u \\cdot v) = u \\frac{dv}{dx} + v \\frac{du}{dx} \\quad \\text{(Product Rule)}",
            "\\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx} \\quad \\text{(Chain Rule)}"
          ],
          steps: [
            "For polynomials: multiply the term by its exponent and reduce the exponent by 1.",
            "Constant numbers differentiate to 0."
          ],
          workedExample: "Problem: Differentiate y = 4x^3 - 5x + 7.\n\nSolution:\n1. Differentiate 4x^3 -> 4 * 3x^2 = 12x^2.\n2. Differentiate -5x -> -5.\n3. Differentiate 7 -> 0.\n4. Combined: dy/dx = 12x^2 - 5.\nAnswer: dy/dx = 12x^2 - 5"
        }
      },
      {
        id: "integration",
        title: "Integration Calculus",
        seniorDesc: "Understand indefinite and definite integration as reverse differentiation.",
        seniorGreeting: "Good day, Teacher! What is integration? Why is it described as finding the area under a curve, and why do we always add '+ C' at the end of indefinite integrals?",
        seniorMarkingGuide: "SSS Math Integration: State Integration is reverse of differentiation [1 Mark]. Apply power rule of integration [2 Marks]. Compute definite boundaries [2 Marks].",
        studyNotes: {
          concept: "Integration is the inverse process of differentiation. It is used to find the area under curves and solve accumulation problems.",
          formulas: [
            "\\int x^n dx = \\frac{x^{n+1}}{n+1} + C \\quad (n \\neq -1)",
            "\\int_a^b f(x) dx = F(b) - F(a)"
          ],
          steps: [
            "To integrate a term, add 1 to the exponent and divide by the new exponent.",
            "Add the constant of integration (C) for indefinite integrals."
          ],
          workedExample: "Problem: Evaluate the indefinite integral of y = 3x^2.\n\nSolution:\n1. Apply rule: ∫ 3x^2 dx = 3 * (x^(2+1)) / (2+1) + C\n2. Simplify: 3 * (x^3) / 3 + C = x^3 + C.\nAnswer: x^3 + C"
        }
      }
    ]
  },
  biology: {
    id: "biology",
    name: "Biology (SSS)",
    topics: [
      {
        id: "cytology",
        title: "Cytology (Cell Organelles)",
        seniorDesc: "Detail structure and function of mitochondria, nucleus, ribosomes, and compare plant/animal cell walls.",
        seniorGreeting: "Good day, Teacher! 🔬 I'm studying cytology. Can you explain the functions of the mitochondria, nucleus, and ribosomes, and outline key differences between plant and animal cells?",
        seniorMarkingGuide: "SS2 Biology Cells: List functions of mitochondria (ATP energy), nucleus (DNA/control), ribosomes (proteins) [2 Marks]. Outline differences: plant cell wall, chloroplast, large vacuole [3 Marks].",
        studyNotes: {
          concept: "Cells contain membrane-bound organelles that perform specific biochemical tasks. Plant cells are reinforced by cellulose cell walls, whereas animal cells lack walls.",
          formulas: [],
          steps: [
            "Nucleus: Contains genetic material (chromosomes), controls cell division and protein synthesis.",
            "Mitochondria: Double-membrane organelle, site of cellular respiration to generate ATP (adenosine triphosphate).",
            "Ribosomes: Tiny complexes of RNA and protein, site of translation/protein synthesis."
          ],
          workedExample: "Question: Draw comparison table between plant and animal cells.\n\nAnswer:\nFeature | Plant Cell | Animal Cell\nCell Wall | Present (cellulose) | Absent\nChloroplast | Present (photosynthesis) | Absent\nVacuole | Single, large central | Small, multiple scattered\nLysosome | Rare | Common"
        }
      },
      {
        id: "photosynthesis",
        title: "Photosynthesis (Light & Dark)",
        seniorDesc: "Understand Light and Dark reactions, chloroplast structure, and the balanced molecular equation.",
        seniorGreeting: "Hello, Teacher! 🌿 I am preparing for my biology exam on photosynthesis. I understand that plants convert carbon dioxide and water into glucose. But I'm confused about the Light-dependent and Light-independent (Dark) reactions. Can you explain the chemical process and write out the balanced molecular equation?",
        seniorMarkingGuide: "SS2 Biology Photosynthesis: Write balanced chemical equation 6CO2 + 6H2O -> C6H12O6 + 6O2 [2 Marks]. Explain light reaction (photolysis of water) [2 Marks]. Explain dark reaction (carbon fixation) [1 Mark].",
        studyNotes: {
          concept: "Photosynthesis is the process by which green plants utilize light energy to convert carbon dioxide and water into chemical glucose, taking place in two distinct chemical phases within the chloroplast.",
          formulas: [
            "6CO_2 + 6H_2O \\xrightarrow{\\text{Light/Chlorophyll}} C_6H_{12}O_6 + 6O_2"
          ],
          steps: [
            "Light Reaction (Thylakoids): Absorption of light splits water (photolysis), releasing oxygen and producing ATP and NADPH.",
            "Dark Reaction / Calvin Cycle (Stroma): ATP and NADPH are used to fix carbon dioxide into glucose molecules."
          ],
          workedExample: "Question: Explain photolysis of water in the light stage of photosynthesis.\n\nAnswer:\nPhotolysis is the splitting of water molecules (H2O) using solar energy absorbed by chlorophyll. The water molecule is split into hydrogen ions (H+), electrons (e-), and oxygen gas (O2). The oxygen is released as a byproduct, while the hydrogen ions and electrons are used to form NADPH, which moves to the dark stage."
        }
      },
      {
        id: "cellular_respiration",
        title: "Respiration (Glycolysis & Krebs)",
        seniorDesc: "Compare aerobic and anaerobic respiration and explain Glycolysis and Krebs cycle.",
        seniorGreeting: "Good day, Teacher! ⚡ In cellular respiration, how does our body convert glucose into ATP? What is the difference between Glycolysis in the cytoplasm and the Krebs cycle in the mitochondria?",
        seniorMarkingGuide: "SSS Biology Respiration: Define aerobic vs anaerobic [1 Mark]. Explain Glycolysis steps (anaerobic, breaks glucose to pyruvate, yields 2 ATP) [2 Marks]. Explain Krebs Cycle (aerobic, yields CO2, NADH, FADH2) [2 Marks].",
        studyNotes: {
          concept: "Cellular respiration is the biochemical pathway that extracts energy from organic nutrients (glucose) to produce ATP.",
          formulas: [
            "C_6H_{12}O_6 + 6O_2 \\implies 6CO_2 + 6H_2O + 36/38\\text{ ATP}"
          ],
          steps: [
            "Glycolysis (Cytoplasm): Anaerobic breakdown of one glucose molecule into two pyruvate molecules, yielding 2 net ATP.",
            "Link Reaction: Converts pyruvate to Acetyl-CoA.",
            "Krebs Cycle (Mitochondrial Matrix): Completes oxidation of acetyl-CoA, producing carbon dioxide, ATP, and reduced coenzymes (NADH, FADH2).",
            "Electron Transport Chain: Uses oxygen as final electron acceptor to generate the bulk of ATP (approx 32-34 ATP)."
          ],
          workedExample: "Question: Outline the three major stages of aerobic respiration and state where each occurs in the cell.\n\nAnswer:\n1. Glycolysis: Occurs in the cytoplasm (cytosol). It does not require oxygen.\n2. Krebs Cycle (Citric Acid Cycle): Occurs in the matrix of the mitochondria. Requires oxygen.\n3. Electron Transport Chain / Oxidative Phosphorylation: Occurs in the inner membrane (cristae) of the mitochondria. Requires oxygen."
        }
      },
      {
        id: "genetics",
        title: "Genetics & Heredity",
        seniorDesc: "Apply Mendel's laws of inheritance and draw Monohbrid Punnett squares.",
        seniorGreeting: "Hello Teacher! 🧬 We are studying genetics. If a tall pea plant (Tt) crosses with a short pea plant (tt), how do we calculate the probability of getting tall offspring? What is a Punnett square?",
        seniorMarkingGuide: "SSS Biology Genetics: Define genotype vs phenotype [1 Mark]. Set up alleles on Punnett square [2 Marks]. Compute correct phenotypic ratio (e.g. 3:1 or 1:1) [2 Marks].",
        studyNotes: {
          concept: "Genetics is the study of heredity and variation. Monohybrid inheritance tracks the transfer of a single gene trait governed by dominant and recessive alleles.",
          formulas: [
            "\\text{Genotypic ratio (Monohybrid heterozygote cross): } 1:2:1 \\quad (TT:Tt:tt)",
            "\\text{Phenotypic ratio: } 3:1 \\quad (\\text{Tall:Short})"
          ],
          steps: [
            "Identify parent genotypes (e.g. Tall = Tt, Short = tt).",
            "Separate alleles to represent gametes (T and t, t and t).",
            "Construct a 2x2 Punnett square grid.",
            "Cross alleles to find offspring genotypes and compute phenotypic percentages."
          ],
          workedExample: "Problem: Draw a Punnett square crossing a heterozygous tall plant (Tt) and a homozygous recessive short plant (tt). Find the percentage of short offspring.\n\nSolution:\n1. Gametes: Parent 1 (T, t), Parent 2 (t, t).\n2. Cross grid:\n      |  T  |  t  |\n   ---|-----|-----|\n    t |  Tt |  tt |\n   ---|-----|-----|\n    t |  Tt |  tt |\n3. Offspring genotypes: 2 Tt (Tall), 2 tt (Short).\n4. Percentage of short = (2 / 4) * 100 = 50%.\nAnswer: 50% short offspring."
        }
      },
      {
        id: "osmosis_diffusion",
        title: "Osmosis & Diffusion",
        seniorDesc: "Understand active transport, passive diffusion, and osmotic pressure in cells.",
        seniorGreeting: "Hello Teacher! What is the difference between diffusion and osmosis? Why does a red blood cell burst when put in pure water, but a plant cell doesn't?",
        seniorMarkingGuide: "SSS Biology Transport: Define diffusion (particles move down gradient) [1 Mark]. Define osmosis (water moves through semi-permeable membrane) [2 Marks]. Explain turgor pressure vs hemolysis [2 Marks].",
        studyNotes: {
          concept: "Diffusion is the passive movement of particles from a region of higher concentration to lower concentration. Osmosis is the movement of water molecules through a semi-permeable membrane from a region of low solute (high water) concentration to high solute (low water) concentration.",
          formulas: [],
          steps: [
            "Hypertonic solution: Higher concentration outside, cell shrinks (plasmolysis).",
            "Hypotonic solution: Lower concentration outside, water enters. Animal cell bursts (hemolysis), plant cell becomes turgid.",
            "Isotonic solution: Concentration is equal, no net water movement."
          ],
          workedExample: "Question: Why does a slice of yam become soft when placed in a concentrated salt solution?\n\nAnswer:\n1. The concentrated salt solution is hypertonic to the cell sap of the yam cells.\n2. Water moves out of the yam cells by osmosis, passing through the semi-permeable cell membranes into the salt solution.\n3. The yam cells lose turgidity (become flaccid/plasmolyzed), causing the yam slice to lose structure and become soft."
        }
      },
      {
        id: "nervous_system",
        title: "Nervous System & Synapse",
        seniorDesc: "Understand reflex arcs, neuron anatomy, and chemical transmission at the synapse.",
        seniorGreeting: "Good day Teacher! 🧠 If I touch a hot cup of tea, I pull my hand back instantly without thinking. What is the path of this reflex arc, and how do chemical signals cross the gap between neurons?",
        seniorMarkingGuide: "SSS Biology Nervous: Trace reflex path (Receptor -> Sensory Neuron -> Relay/Spinal cord -> Motor Neuron -> Effector) [3 Marks]. Explain synapse chemical transfer (neurotransmitters) [2 Marks].",
        studyNotes: {
          concept: "The nervous system coordinates body actions via electrical impulses. Synapses are microscopic gaps between neurons where signals are transmitted chemically using neurotransmitters.",
          formulas: [],
          steps: [
            "Sensory Neuron: Carries impulse from receptor (skin) to Central Nervous System (spinal cord).",
            "Relay Neuron: Coordinates response in spinal cord.",
            "Motor Neuron: Carries command impulse to the effector muscle.",
            "Synaptic transmission: Impulse triggers release of neurotransmitters (e.g. acetylcholine) which diffuse across the gap."
          ],
          workedExample: "Question: Outline the steps of a reflex action when a person steps on a sharp nail.\n\nAnswer:\n1. Detection: Pain receptors in the foot detect the stimulus (sharp nail).\n2. Transmission: An electrical impulse travels along the sensory neuron to the spinal cord.\n3. Relay: In the grey matter of the spinal cord, the impulse crosses a synapse to the relay neuron.\n4. Output: The relay neuron passes the impulse across another synapse to the motor neuron.\n5. Action: The motor neuron carries the impulse to the leg muscles (effectors), which contract to lift the foot."
        }
      },
      {
        id: "circulatory_system",
        title: "Circulatory System",
        seniorDesc: "Trace double circulation of blood in mammals and describe blood components.",
        seniorGreeting: "Hi Teacher! 🩸 How does the heart pump blood to all parts of the body? What is double circulation, and why is the left ventricle wall thicker than the right ventricle wall?",
        seniorMarkingGuide: "SSS Biology Circulatory: Define double circulation (pulmonary and systemic) [2 Marks]. Explain ventricles thickness difference [1 Mark]. List 4 blood components (plasma, RBC, WBC, platelets) [2 Marks].",
        studyNotes: {
          concept: "Mammals have a closed, double circulatory system. Blood passes through the heart twice during one complete cycle through the body.",
          formulas: [],
          steps: [
            "Pulmonary Circulation: Deoxygenated blood moves from right ventricle to lungs for oxygen, returns to left atrium.",
            "Systemic Circulation: Oxygenated blood moves from left ventricle to the rest of the body, returns to right atrium.",
            "Ventricular walls: Left ventricle is thicker because it must pump blood at high pressure throughout the entire body, whereas the right ventricle only pumps to the nearby lungs."
          ],
          workedExample: "Question: List the four components of blood and state the primary function of each.\n\nAnswer:\n1. Red Blood Cells (Erythrocytes): Transport oxygen using hemoglobin.\n2. White Blood Cells (Leukocytes): Fight infections and defend the immune system.\n3. Platelets (Thrombocytes): Aid in blood clotting to stop bleeding.\n4. Blood Plasma: Liquid medium that transports nutrients, carbon dioxide, hormones, and waste products."
        }
      },
      {
        id: "ecology",
        title: "Ecology & Biomes",
        seniorDesc: "Analyze food chains, trophic levels, energy loss, and local African savanna biomes.",
        seniorGreeting: "Hello Teacher! 🌾 In ecology, why are food chains limited to only 4 or 5 levels? What is the 10% rule of energy transfer between trophic levels?",
        seniorMarkingGuide: "SSS Biology Ecology: Define trophic levels [1 Mark]. Explain 10% energy transfer rule (90% lost as heat/metabolism) [2 Marks]. Give example of savanna biome characteristics [2 Marks].",
        studyNotes: {
          concept: "Ecology is the study of interactions between organisms and their environment. Energy enters ecosystems via plants (producers) and flows through trophic levels with significant energy loss at each step.",
          formulas: [
            "\\text{Energy Transferred} = \\text{Energy at lower level} \\times 0.10"
          ],
          steps: [
            "Producers: Capture solar energy (Trophic Level 1).",
            "Primary Consumers (Herbivores): Feed on producers (Trophic Level 2).",
            "Secondary/Tertiary Consumers (Carnivores): Feed on lower levels.",
            "10% Rule: Only about 10% of the energy stored as biomass in one trophic level is passed to the next."
          ],
          workedExample: "Question: If plants in a grassland ecosystem capture 10,000 Joules of light energy, how much energy is available to snake (tertiary consumer) in the food chain: Plant -> Grasshopper -> Frog -> Snake?\n\nSolution:\n1. Trophic Level 1 (Plant): 10,000 J\n2. Trophic Level 2 (Grasshopper): 10,000 * 0.10 = 1,000 J\n3. Trophic Level 3 (Frog): 1,000 * 0.10 = 100 J\n4. Trophic Level 4 (Snake): 100 * 0.10 = 10 J.\nAnswer: 10 Joules"
        }
      },
      {
        id: "excretory_system",
        title: "Excretory System (Kidney)",
        seniorDesc: "Understand nephron structure, ultrafiltration, selective reabsorption, and urine formation.",
        seniorGreeting: "Good day, Teacher! ⚖️ What is excretion? How does the human kidney filter urea from the blood? What is the role of the nephron in ultrafiltration and reabsorption?",
        seniorMarkingGuide: "SSS Biology Excretion: Define excretion [1 Mark]. Describe ultrafiltration in Bowman's capsule [2 Marks]. Explain selective reabsorption in proximal tubule [2 Marks].",
        studyNotes: {
          concept: "Excretion is the elimination of metabolic waste products from the body of an organism. The nephron is the functional unit of the kidney, creating urine by filtration and reabsorption.",
          formulas: [],
          steps: [
            "Ultrafiltration (Bowman's Capsule): High blood pressure forces small molecules (urea, glucose, water, salts) out of the glomerulus. Large proteins and red blood cells remain.",
            "Selective Reabsorption (Proximal Convoluted Tubule): All glucose, amino acids, and essential salts/water are reabsorbed back into the capillaries.",
            "Excretion: Concentrated waste (urine containing urea, excess salts, and water) flows down the collecting duct to the bladder."
          ],
          workedExample: "Question: Why is glucose normally found in the glomerular filtrate but absent in the urine of a healthy person?\n\nAnswer:\n1. Glomerular filtrate is formed during ultrafiltration in the Bowman's capsule. Because glucose molecules are small, they easily pass through the glomerulus filter.\n2. As the filtrate passes down the proximal convoluted tubule of the nephron, all glucose is actively reabsorbed back into the surrounding blood capillaries. Therefore, no glucose is left in the final urine of a healthy individual."
        }
      },
      {
        id: "reproduction",
        title: "Plant & Animal Reproduction",
        seniorDesc: "Compare sexual and asexual pathways, flower structure, and mammalian fertilization.",
        seniorGreeting: "Hello Teacher! What are the advantages of sexual reproduction over asexual reproduction? How does double fertilization occur in flowering plants?",
        seniorMarkingGuide: "SSS Biology Reproduction: List 2 differences between sexual and asexual [2 Marks]. Explain double fertilization (one sperm fuses with egg, other with polar nuclei) [3 Marks].",
        studyNotes: {
          concept: "Reproduction ensures the continuity of life. Sexual reproduction combines gametes to create genetic variation. Double fertilization is unique to angiosperms (flowering plants).",
          formulas: [],
          steps: [
            "Asexual: Single parent, offspring are genetically identical clones.",
            "Sexual: Two parents, gametes fuse, offspring exhibit genetic variation.",
            "Double Fertilization in plants: One male nucleus fuses with the egg nucleus to form a diploid zygote (2n). The other male nucleus fuses with two polar nuclei to form a triploid endosperm (3n) which acts as a food store."
          ],
          workedExample: "Question: Explain the process and significance of double fertilization in angiosperms.\n\nAnswer:\n1. Process: The pollen tube releases two male gametes into the embryo sac of the ovule. One male gamete fuses with the egg cell to form the zygote (which becomes the embryo). The second male gamete fuses with the two polar nuclei in the center to form the primary endosperm nucleus.\n2. Significance: It coordinates the development of the food-storing endosperm only when fertilization is successful, preventing waste of plant resources."
        }
      }
    ]
  },
  physics: {
    id: "physics",
    name: "Physics (SSS)",
    topics: [
      {
        id: "motion",
        title: "Equations of Motion",
        seniorDesc: "Learn the three linear equations of motion and uniform acceleration calculations.",
        seniorGreeting: "Good day, Teacher! ⚡ I'm trying to learn the equations of motion for Physics, like v = u + at and s = ut + 1/2at^2. What do these letters represent, how are they derived, and when are they valid?",
        seniorMarkingGuide: "SS2 Physics Motion: State all three linear motion equations [3 Marks]. Explain the requirement of constant/uniform acceleration [1 Mark]. Define all symbols with standard units [1 Mark].",
        studyNotes: {
          concept: "Linear equations of motion describe the behavior of a physical system in terms of its motion as a function of time under constant acceleration.",
          formulas: [
            "v = u + at",
            "s = ut + \\frac{1}{2}at^2",
            "v^2 = u^2 + 2as"
          ],
          steps: [
            "Identify the given parameters: u (initial velocity), v (final velocity), a (acceleration), t (time), s (displacement).",
            "Check if acceleration is constant. If not, these formulas cannot be used.",
            "Choose the formula that contains the known variables and the single unknown target variable, then solve."
          ],
          workedExample: "Problem: A car accelerates uniformly from rest at 2 m/s² for 5 seconds. Find the distance traveled.\n\nSolution:\n1. Identify: u = 0 (from rest), a = 2, t = 5, s = ?\n2. Choose formula: s = ut + 0.5 * a * t²\n3. Substitute: s = 0(5) + 0.5 * 2 * 5² = 0 + 1 * 25 = 25 meters.\nAnswer: Distance = 25m"
        }
      },
      {
        id: "newtons_laws",
        title: "Newton's Laws of Motion",
        seniorDesc: "Apply Newton's three laws of motion to inertia, momentum, and recoil calculations.",
        seniorGreeting: "Hello Teacher! ⚙️ What are Newton's three laws of motion? How do we calculate force using F = ma, and how does the Third Law explain rocket propulsion?",
        seniorMarkingGuide: "SSS Physics Laws: State all three laws of motion [3 Marks]. Write F = ma formula [1 Mark]. Explain action-reaction rocket principle [1 Mark].",
        studyNotes: {
          concept: "Newton's laws of motion form the foundation of classical mechanics, describing the relationship between a body and the forces acting upon it.",
          formulas: [
            "F = m \\cdot a \\quad \\text{(Force = Mass } \\times \\text{ Acceleration)}",
            "P = m \\cdot v \\quad \\text{(Momentum = Mass } \\times \\text{ Velocity)}"
          ],
          steps: [
            "First Law (Inertia): A body remains at rest or in uniform motion unless acted on by an external force.",
            "Second Law (Force): The rate of change of momentum is proportional to the applied force (F = ma).",
            "Third Law (Action/Reaction): For every action, there is an equal and opposite reaction."
          ],
          workedExample: "Problem: Calculate the force required to accelerate a 5kg mass at 3 m/s².\n\nSolution:\n1. Formula: F = m * a\n2. Substitute: F = 5 * 3 = 15 Newtons.\nAnswer: Force = 15 N"
        }
      },
      {
        id: "work_energy",
        title: "Work, Energy & Power",
        seniorDesc: "Calculate mechanical work, potential and kinetic energy conservation, and efficiency.",
        seniorGreeting: "Good day, Teacher! How do we define Work, Energy, and Power in Physics? If a crane lifts a 100kg crate to a height of 10m in 5 seconds, how much power does it produce?",
        seniorMarkingGuide: "SSS Physics Work: State work formula (W=F*d) [1 Mark]. State Power formula (P=W/t) [1 Mark]. Compute correct work in Joules and Power in Watts [3 Marks].",
        studyNotes: {
          concept: "Work is done when a force moves an object. Energy is the capacity to do work. Power is the rate at which work is done.",
          formulas: [
            "W = F \\cdot d \\cos(\\theta) \\quad \\text{(Work)}",
            "P = \\frac{W}{t} \\quad \\text{(Power)}",
            "\\text{Efficiency} = \\frac{\\text{Useful Work Output}}{\\text{Work Input}} \\times 100\\%"
          ],
          steps: [
            "Find force applied (if lifting, F = m * g).",
            "Multiply force by distance moved in the direction of the force to get Work (J).",
            "Divide Work by time taken to get Power (W)."
          ],
          workedExample: "Problem: A crane lifts a 200kg mass vertically through a height of 10m in 4 seconds. Calculate the power (g = 10 m/s²).\n\nSolution:\n1. Force: F = m * g = 200 * 10 = 2000 N.\n2. Work done: W = F * d = 2000 * 10 = 20,000 J.\n3. Power: P = W / t = 20,000 / 4 = 5,000 Watts.\nAnswer: Power = 5 kW"
        }
      },
      {
        id: "wave_motion",
        title: "Wave Motion & Sound",
        seniorDesc: "Understand transverse/longitudinal waves, wave equations, and reflection/refraction.",
        seniorGreeting: "Hello, Teacher! 🌊 What is the difference between a transverse wave and a longitudinal wave? How do we use the wave equation v = fλ to calculate frequency and wavelength?",
        seniorMarkingGuide: "SSS Physics Waves: Differentiate transverse (perpendicular) vs longitudinal (parallel) [2 Marks]. State wave equation v = f*λ [1 Mark]. Solve frequency/wavelength calculation [2 Marks].",
        studyNotes: {
          concept: "A wave is a disturbance that transfers energy through a medium without transferring matter. Waves are classified as mechanical (need medium) or electromagnetic (no medium).",
          formulas: [
            "v = f \\cdot \\lambda \\quad \\text{(Velocity = Frequency } \\times \\text{ Wavelength)}",
            "T = \\frac{1}{f} \\quad \\text{(Period = 1 / Frequency)}"
          ],
          steps: [
            "Transverse: Medium vibrates perpendicular to wave direction (e.g. water, light).",
            "Longitudinal: Medium vibrates parallel to wave direction (e.g. sound).",
            "Identify given values (v in m/s, f in Hz, λ in meters) and solve."
          ],
          workedExample: "Problem: A radio wave has a frequency of 300 kHz (300,000 Hz) and travels at the speed of light (3 * 10^8 m/s). Find its wavelength.\n\nSolution:\n1. Formula: v = f * λ -> λ = v / f\n2. Substitute: λ = (3 * 10^8) / (300,000) = (3 * 10^8) / (3 * 10^5) = 10^3 = 1000 meters.\nAnswer: Wavelength = 1000m"
        }
      },
      {
        id: "electrostatics",
        title: "Electrostatics & Fields",
        seniorDesc: "Apply Coulomb's law to force between point charges and define electric field intensity.",
        seniorGreeting: "Good day, Teacher! ⚡ How do we calculate the electrostatic force between two charged particles? What is Coulomb's Law, and what does the constant k represent?",
        seniorMarkingGuide: "SSS Physics Electrostatics: State Coulomb's Law formula F = k*q1*q2/r² [2 Marks]. Define terms and constant k [1 Mark]. Solve force calculation [2 Marks].",
        studyNotes: {
          concept: "Coulomb's Law states that the electrostatic force of attraction or repulsion between two point charges is directly proportional to the product of the charges and inversely proportional to the square of the distance between them.",
          formulas: [
            "F = \\frac{k \\cdot q_1 \\cdot q_2}{r^2}",
            "E = \\frac{F}{q} = \\frac{k \\cdot q}{r^2} \\quad \\text{(Electric Field Intensity)}"
          ],
          steps: [
            "Identify values: q1 and q2 (charges in Coulombs), r (distance in meters), k (constant = 9 * 10^9 N m²/C²).",
            "Substitute into Coulomb's equation.",
            "Verify directions: Like charges repel, opposite charges attract."
          ],
          workedExample: "Problem: Two charges of +2μC (2 * 10^-6 C) and +3μC are separated by a distance of 0.3m. Find the repulsive force.\n\nSolution:\n1. Formula: F = (k * q1 * q2) / r²\n2. Substitute: F = (9 * 10^9 * 2 * 10^-6 * 3 * 10^-6) / (0.3)²\n3. Calculate: F = (0.054) / 0.09 = 0.6 Newtons.\nAnswer: Force = 0.6 N"
        }
      },
      {
        id: "current_electricity",
        title: "Current Electricity (Ohm's/Kirchhoff's)",
        seniorDesc: "Apply Ohm's law and Kirchhoff's circuit rules to series and parallel resistor networks.",
        seniorGreeting: "Hello Teacher! 🔌 I am analyzing a circuit. How do I calculate total resistance when resistors are connected in series versus parallel? What are Kirchhoff's current and voltage laws?",
        seniorMarkingGuide: "SSS Physics Circuits: State series resistance formula (R=R1+R2) [1 Mark]. State parallel resistance formula (1/R=1/R1+1/R2) [1 Mark]. Apply Ohm's Law (V=IR) [2 Marks]. Explain Kirchhoff's junction law [1 Mark].",
        studyNotes: {
          concept: "Current electricity deals with the flow of charge. Resistors limit current, and their combined effect depends on the network configuration.",
          formulas: [
            "R_{series} = R_1 + R_2 + R_3 + \\dots",
            "\\frac{1}{R_{parallel}} = \\frac{1}{R_1} + \\frac{1}{R_2} + \\frac{1}{R_3} + \\dots",
            "I_{in} = I_{out} \\quad \\text{(Kirchhoff's Current Law)}"
          ],
          steps: [
            "For Series: Add all resistances directly.",
            "For Parallel: Compute the sum of the reciprocals, then take the reciprocal of that sum.",
            "Apply V = I * R to find total current or individual voltages."
          ],
          workedExample: "Problem: Two resistors, 4Ω and 6Ω, are connected in parallel to a 12V battery. Find the total resistance and total current.\n\nSolution:\n1. Parallel Resistance: 1/Rp = 1/4 + 1/6 = (3 + 2)/12 = 5/12 -> Rp = 12/5 = 2.4Ω.\n2. Total Current: I = V / Rp = 12 / 2.4 = 5 Amperes.\nAnswer: Rp = 2.4Ω, I = 5A"
        }
      },
      {
        id: "electromagnetism",
        title: "Electromagnetism",
        seniorDesc: "Understand magnetic fields from currents, Faraday's law of induction, and transformer turn ratios.",
        seniorGreeting: "Good day, Teacher! 🧲 How does electric current generate a magnetic field? What is electromagnetic induction, and how do step-up and step-down transformers work?",
        seniorMarkingGuide: "SSS Physics Electromagnetism: State Faraday's law of induction [1.5 Marks]. State transformer turn ratio equation (Vp/Vs = Np/Ns) [1.5 Marks]. Solve transformer voltage problem [2 Marks].",
        studyNotes: {
          concept: "Electromagnetism is the interaction of electric currents and magnetic fields. Electromagnetic induction occurs when a changing magnetic field induces an electromotive force (emf) in a conductor.",
          formulas: [
            "\\frac{V_p}{V_s} = \\frac{N_p}{N_s} = \\frac{I_s}{I_p} \\quad \\text{(Transformer Equation)}"
          ],
          steps: [
            "Identify: Vp (primary voltage), Vs (secondary voltage), Np (primary turns), Ns (secondary turns).",
            "A step-up transformer has Ns > Np (increases voltage).",
            "A step-down transformer has Ns < Np (decreases voltage)."
          ],
          workedExample: "Problem: A transformer has 500 turns in the primary coil and 100 turns in the secondary coil. If the primary voltage is 240V, find the secondary voltage.\n\nSolution:\n1. Formula: Vp / Vs = Np / Ns -> Vs = Vp * (Ns / Np)\n2. Substitute: Vs = 240 * (100 / 500) = 240 * 0.2 = 48 Volts.\nAnswer: Secondary voltage = 48V (Step-down)"
        }
      },
      {
        id: "radioactivity",
        title: "Radioactivity & Decay",
        seniorDesc: "Understand Alpha, Beta, Gamma emissions, write decay equations, and solve half-life problems.",
        seniorGreeting: "Hello, Teacher! ☢️ We are studying nuclear physics. What is the difference between Alpha, Beta, and Gamma rays? How do we calculate the remaining mass of a radioactive sample using its half-life?",
        seniorMarkingGuide: "SSS Physics Radioactivity: Describe alpha, beta, gamma differences [1.5 Marks]. Define half-life [1.5 Marks]. Solve radioactive decay half-life equation [2 Marks].",
        studyNotes: {
          concept: "Radioactivity is the spontaneous disintegration of unstable atomic nuclei, releasing ionizing radiation. Half-life is the time taken for half the nuclei in a radioactive sample to decay.",
          formulas: [
            "N_t = N_0 \\left(\\frac{1}{2}\\right)^n \\quad \\text{where } n = \\frac{t}{T_{1/2}}"
          ],
          steps: [
            "Identify: N0 (initial mass/count), Nt (remaining mass), t (total time elapsed), T1/2 (half-life).",
            "Calculate the number of half-lives elapsed (n = t / T1/2).",
            "Divide the initial mass by 2, repeated n times."
          ],
          workedExample: "Problem: A radioactive substance has a half-life of 4 days. If the initial mass is 80g, how much remains after 12 days?\n\nSolution:\n1. Number of half-lives elapsed (n) = 12 / 4 = 3 half-lives.\n2. Apply formula: N_t = 80 * (1/2)^3 = 80 * (1/8) = 10 grams.\nAnswer: Remaining mass = 10g"
        }
      },
      {
        id: "fluid_mechanics",
        title: "Fluid Mechanics",
        seniorDesc: "Apply Archimedes' principle, law of floatation, and calculate fluid pressure.",
        seniorGreeting: "Good day, Teacher! 🚢 Why do heavy steel ships float on water while a small steel nail sinks? What is Archimedes' Principle, and how do we calculate upthrust force?",
        seniorMarkingGuide: "SSS Physics Fluids: State Archimedes' Principle [1.5 Marks]. State Law of Floatation [1.5 Marks]. Solve fluid pressure (P=ρgh) or upthrust problem [2 Marks].",
        studyNotes: {
          concept: "Archimedes' Principle states that when a body is completely or partially immersed in a fluid, it experiences an upward force (upthrust) equal to the weight of the fluid displaced.",
          formulas: [
            "U = \\rho \\cdot V \\cdot g \\quad \\text{(Upthrust force)}",
            "P = \\rho \\cdot g \\cdot h \\quad \\text{(Fluid Pressure)}"
          ],
          steps: [
            "Upthrust (U) depends on fluid density (ρ), volume of submerged body (V), and gravity (g).",
            "A body floats if its weight equals the upthrust of the displaced fluid."
          ],
          workedExample: "Problem: Calculate the pressure at a depth of 5m in water (density of water = 1000 kg/m³, g = 10 m/s²).\n\nSolution:\n1. Formula: P = ρ * g * h\n2. Substitute: P = 1000 * 10 * 5 = 50,000 Pascals (or 50 kPa).\nAnswer: Fluid Pressure = 50 kPa"
        }
      },
      {
        id: "gravitation",
        title: "Gravitational Fields",
        seniorDesc: "Apply Newton's law of universal gravitation and solve satellite orbit speed.",
        seniorGreeting: "Hello Teacher! 🌌 How do we calculate the gravitational pull between two planets? What is Newton's Law of Universal Gravitation, and how does it differ from local gravity acceleration g?",
        seniorMarkingGuide: "SSS Physics Gravity: State Newton's Law of Universal Gravitation F = G*m1*m2/r² [2 Marks]. Explain G vs g [2 Marks]. Solve force calculation [1 Mark].",
        studyNotes: {
          concept: "Newton's Law of Universal Gravitation states that every point mass attracts every other point mass by a force acting along the line intersecting both points.",
          formulas: [
            "F = \\frac{G \\cdot m_1 \\cdot m_2}{r^2}",
            "g = \\frac{G \\cdot M}{R^2} \\quad \\text{(Acceleration due to gravity)}"
          ],
          steps: [
            "Identify: m1 and m2 (masses in kg), r (separation distance in meters), G (gravitational constant = 6.67 * 10^-11 N m²/kg²).",
            "Substitute into Newton's universal gravity equation to find attractive force."
          ],
          workedExample: "Question: Explain the difference between 'G' and 'g' in physics.\n\nAnswer:\n1. G is the Universal Gravitational Constant. It is a scalar constant value (6.67 * 10^-11 N m²/kg²) that is the same everywhere in the universe.\n2. g is the local Acceleration Due to Gravity. It is a vector variable that changes depending on the mass and radius of the planet (e.g. g = 9.8 m/s² on Earth, but 1.6 m/s² on the Moon)."
        }
      }
    ]
  },
  chemistry: {
    id: "chemistry",
    name: "Chemistry (SSS)",
    topics: [
      {
        id: "bonding",
        title: "Atomic Structure & Bonding",
        seniorDesc: "Understand valence electron shells, ionic electron transfer, and covalent electron sharing.",
        seniorGreeting: "Hello, Teacher! 🧪 We are studying chemical bonding in Chemistry class. I don't understand the difference between ionic and covalent bonds. How do atoms decide to share or transfer valence electrons, and what are examples of each?",
        seniorMarkingGuide: "SS2 Chemistry Bonding: Define ionic bonding as electrostatic force from electron transfer [2 Marks]. Define covalent bonding as valence electron sharing between non-metals [2 Marks]. List NaCl and H2O examples [1 Mark].",
        studyNotes: {
          concept: "Chemical bonding describes the electrostatic attractions that hold atoms together. Atoms transfer or share valence electrons to achieve a stable noble-gas electron configuration (octet rule).",
          formulas: [],
          steps: [
            "Ionic Bond: Formed when a metal transfers valence electrons to a non-metal, creating oppositely charged ions that attract (e.g. NaCl).",
            "Covalent Bond: Formed when two non-metals share pairs of valence electrons to complete their outer shells (e.g. H2O)."
          ],
          workedExample: "Question: State three physical differences between ionic compounds and covalent compounds.\n\nAnswer:\nProperty | Ionic Compounds | Covalent Compounds\nMelting Point | High (strong electrostatic lattice) | Low (weak intermolecular forces)\nConductivity | Conducts when molten/aqueous | Does not conduct in any state\nState | Hard crystalline solids | Often liquids or gases"
        }
      },
      {
        id: "periodic_trends",
        title: "Periodic Table Trends",
        seniorDesc: "Analyze periodic properties: atomic radius, ionization energy, electronegativity across periods/groups.",
        seniorGreeting: "Good day, Teacher! 🧪 In chemistry, how do properties change as we move across the periodic table? Why does ionization energy increase across a period, but atomic radius decreases?",
        seniorMarkingGuide: "SSS Chemistry Trends: Explain shielding effect and nuclear charge increase [2 Marks]. Define ionization energy trend [1.5 Marks]. Define atomic radius trend [1.5 Marks].",
        studyNotes: {
          concept: "Periodic trends are specific patterns in the properties of chemical elements in the periodic table, governed by nuclear charge and electron shielding.",
          formulas: [],
          steps: [
            "Atomic Radius: Decreases across a period (increasing nuclear charge pulls shells closer) and increases down a group (adding new electron shells).",
            "Ionization Energy: Increases across a period (electrons held tighter) and decreases down a group (electrons further from nucleus)."
          ],
          workedExample: "Question: Why does Fluorine have a higher electronegativity than Lithium?\n\nAnswer:\n1. Across Period 2 (from Lithium to Fluorine), the atomic number (nuclear charge) increases while the inner-shell electron shielding remains constant.\n2. This increases the effective nuclear charge pulling on the valence electrons.\n3. Fluorine, having a smaller atomic radius and higher nuclear pull, attracts bonding electron pairs much more strongly than Lithium, giving it a higher electronegativity."
        }
      },
      {
        id: "stoichiometry",
        title: "Stoichiometry & Chemical Equations",
        seniorDesc: "Balance chemical equations and solve mole-to-mass and Avogadro calculations.",
        seniorGreeting: "Hello Teacher! 🧪 I'm stuck on mole calculations. Can you explain Avogadro's number, how to calculate mass from moles using n = m/M, and how to balance stoichiometry?",
        seniorMarkingGuide: "SSS Chemistry Stoichiometry: State mole equation n = m/M [1 Mark]. Balance a simple reaction equation [2 Marks]. Perform mole-to-mass conversion correctly [2 Marks].",
        studyNotes: {
          concept: "Stoichiometry is the quantitative study of reactants and products in a chemical reaction. A mole represents 6.02 * 10^23 elementary particles (Avogadro's constant).",
          formulas: [
            "n = \\frac{m}{M} \\quad \\text{where } n = \\text{moles}, m = \\text{mass (g)}, M = \\text{molar mass (g/mol)}",
            "n = \\frac{V}{22.4} \\quad \\text{(Volume of gas at s.t.p. in dm³)}"
          ],
          steps: [
            "Write down the balanced chemical equation.",
            "Convert the given mass/volume of reactant to moles.",
            "Use the stoichiometric coefficients (mole ratio) to find the moles of product.",
            "Convert the moles of product back to mass or volume."
          ],
          workedExample: "Problem: Calculate the mass of carbon dioxide (CO2) produced when 12g of Carbon is burned completely in oxygen. (C = 12, O = 16).\n\nSolution:\n1. Balanced reaction: C + O2 -> CO2.\n2. Moles of Carbon: n(C) = mass / molar mass = 12g / 12 g/mol = 1.0 mole.\n3. Mole ratio: 1 mole C produces 1 mole CO2. So n(CO2) = 1.0 mole.\n4. Mass of CO2: m = n * M = 1.0 * (12 + 16*2) = 1.0 * 44 = 44 grams.\nAnswer: Mass of CO2 = 44g"
        }
      },
      {
        id: "acids_bases",
        title: "Acids, Bases & Salts (pH)",
        seniorDesc: "Define Arrhenius/Bronsted acids, analyze neutralization, and calculate pH from H+ concentrations.",
        seniorGreeting: "Good day, Teacher! 🧪 What makes a substance an acid versus a base? How do we calculate the pH of a solution if we know the hydrogen ion concentration [H+]?",
        seniorMarkingGuide: "SSS Chemistry Acids: Define Bronsted-Lowry acid (proton donor) and base (proton acceptor) [2 Marks]. State pH formula pH = -log[H+] [1 Mark]. Solve pH calculation [2 Marks].",
        studyNotes: {
          concept: "Acids are proton (H+) donors. Bases are proton acceptors. The pH scale measures the acidity or alkalinity of a solution logarithmically.",
          formulas: [
            "\\text{pH} = -\\log_{10}[H^+]",
            "[H^+] \\cdot [OH^-] = 10^{-14} \\quad \\text{at } 25^\\circ\\text{C}"
          ],
          steps: [
            "Identify [H+] concentration in moles/dm³.",
            "Apply the negative logarithm formula.",
            "If pH < 7 (acidic), if pH = 7 (neutral), if pH > 7 (alkaline/basic)."
          ],
          workedExample: "Problem: Calculate the pH of a 0.01 M (1 * 10^-2 M) hydrochloric acid (HCl) solution.\n\nSolution:\n1. Since HCl is a strong acid, it dissociates completely: [H+] = 0.01 M = 10^-2 M.\n2. pH = -log_10(10^-2)\n3. pH = -(-2) = 2.\nAnswer: pH = 2"
        }
      },
      {
        id: "gas_laws",
        title: "Gas Laws",
        seniorDesc: "Apply Boyle's, Charles's, and the Ideal Gas Equation (PV = nRT) to gas behavior.",
        seniorGreeting: "Hello, Teacher! What are Boyle's and Charles's laws? How do we combine them into the Ideal Gas Law PV = nRT, and what units must we use for temperature and pressure?",
        seniorMarkingGuide: "SSS Chemistry Gas Laws: State Boyle's Law (P1V1=P2V2) [1 Mark]. State Charles's Law (V1/T1=V2/T2) [1 Mark]. State Ideal Gas Equation PV = nRT [1 Mark]. Convert Celsius to Kelvin (+273) [1 Mark]. Solve gas equation problem [1 Mark].",
        studyNotes: {
          concept: "Gas laws describe how the physical properties of gas (pressure, volume, temperature, and moles) interact. Absolute temperature in Kelvin must always be used.",
          formulas: [
            "P_1 V_1 = P_2 V_2 \\quad \\text{(Boyle's Law)}",
            "\\frac{V_1}{T_1} = \\frac{V_2}{T_2} \\quad \\text{(Charles's Law)}",
            "P V = n R T \\quad \\text{(Ideal Gas Equation)}"
          ],
          steps: [
            "Convert temperature: T(Kelvin) = T(Celsius) + 273.",
            "Identify the constant variable to select the law.",
            "Substitute and solve for the unknown parameter."
          ],
          workedExample: "Problem: A gas occupies 2.0 dm³ at 27°C. Find its volume at 127°C if pressure is kept constant.\n\nSolution:\n1. Convert temperatures: T1 = 27 + 273 = 300 K, T2 = 127 + 273 = 400 K.\n2. Use Charles's Law: V1 / T1 = V2 / T2 -> V2 = V1 * (T2 / T1)\n3. Substitute: V2 = 2.0 * (400 / 300) = 2.0 * 1.33 = 2.67 dm³.\nAnswer: Volume = 2.67 dm³"
        }
      },
      {
        id: "kinetics",
        title: "Chemical Kinetics (Rates)",
        seniorDesc: "Analyze collision theory, factors affecting reaction rates, and activation energy profiles.",
        seniorGreeting: "Good day, Teacher! 🧪 Why do chemical reactions happen faster at higher temperatures or when we use a catalyst? What is collision theory and activation energy?",
        seniorMarkingGuide: "SSS Chemistry Kinetics: Explain Collision Theory (minimum energy, correct orientation) [2 Marks]. List 3 factors affecting rate (temp, conc, catalyst, surface area) [2 Marks]. Define activation energy [1 Mark].",
        studyNotes: {
          concept: "Chemical kinetics is the study of reaction rates. According to Collision Theory, for a reaction to occur, particles must collide with sufficient energy (activation energy) and correct orientation.",
          formulas: [],
          steps: [
            "Temperature: Increases kinetic energy, leading to more frequent and energetic collisions.",
            "Catalyst: Provides an alternative reaction pathway with lower activation energy.",
            "Surface Area: Increases exposed particles, increasing collision frequency."
          ],
          workedExample: "Question: Draw an energy profile diagram for an exothermic reaction showing the effect of a catalyst. Explain the role of activation energy.\n\nAnswer:\n1. The diagram should show reactants at a higher energy level than products. The curve rises to a peak (transition state) and drops. The difference between reactant energy and the peak is the Activation Energy (Ea).\n2. With a catalyst, the peak of the curve is lower, meaning the activation energy is reduced. More reactant particles now have enough energy to clear this lower barrier, increasing the reaction rate."
        }
      },
      {
        id: "equilibrium",
        title: "Chemical Equilibrium",
        seniorDesc: "Understand reversible reactions, write Kc expressions, and apply Le Chatelier's principle.",
        seniorGreeting: "Hello Teacher! What is dynamic equilibrium? How does Le Chatelier's Principle explain how a system responds to changes in temperature, pressure, and concentration?",
        seniorMarkingGuide: "SSS Chemistry Equilibrium: Define dynamic equilibrium [1.5 Marks]. State Le Chatelier's Principle [1.5 Marks]. Write Kc expression [2 Marks].",
        studyNotes: {
          concept: "Dynamic equilibrium occurs in reversible reactions when the forward and backward reactions proceed at the same rate. Le Chatelier's Principle predicts how a system shifts to counteract disturbances.",
          formulas: [
            "K_c = \\frac{[C]^c [D]^d}{[A]^a [B]^b} \\quad \\text{for } aA + bB \\rightleftharpoons cC + dD"
          ],
          steps: [
            "Increasing concentration shifts equilibrium to the opposite side.",
            "Increasing pressure shifts equilibrium to the side with fewer gas moles.",
            "Increasing temperature shifts equilibrium in the direction of the endothermic reaction."
          ],
          workedExample: "Problem: For the Haber process: N2(g) + 3H2(g) ⇌ 2NH3(g) (Exothermic), write the Kc expression and predict the effect of increasing pressure.\n\nSolution:\n1. Kc Expression: Kc = [NH3]² / ( [N2] * [H2]³ ).\n2. Pressure check: Reactant side has 1 + 3 = 4 gas moles. Product side has 2 gas moles.\n3. According to Le Chatelier's Principle, increasing pressure shifts equilibrium to the side with fewer moles to reduce pressure. Therefore, the system shifts right, increasing the yield of Ammonia (NH3).\nAnswer: Shifts right."
        }
      },
      {
        id: "organic_chemistry",
        title: "Organic Chemistry Nomenclature",
        seniorDesc: "Name alkanes, alkenes, alkynes, and functional groups using IUPAC nomenclature.",
        seniorGreeting: "Good day, Teacher! 🧪 Organic chemistry is confusing. How do I name carbon structures using the IUPAC rules? What are functional groups, and how do I name an alcohol versus an ester?",
        seniorMarkingGuide: "SSS Chemistry Organic: State IUPAC prefix naming rules (meth-, eth-, prop-, but-) [2 Marks]. Identify functional groups (alkene, alcohol, carboxylic acid) [2 Marks]. Name a given organic compound [1 Mark].",
        studyNotes: {
          concept: "Organic chemistry nomenclature is the systematic naming of carbon-based compounds based on the IUPAC rules, determined by carbon chain length and functional groups.",
          formulas: [
            "C_n H_{2n+2} \\quad \\text{(Alkanes general formula)}",
            "C_n H_{2n} \\quad \\text{(Alkenes general formula)}",
            "R-OH \\quad \\text{(Alcohol Functional Group)}"
          ],
          steps: [
            "Identify the longest continuous carbon chain to establish the root name (1=meth, 2=eth, 3=prop, 4=but, 5=pent, 6=hex).",
            "Identify the functional group and numbering priority (lowest number for double bonds/functional groups).",
            "Identify and name side chains (e.g. methyl, ethyl, chloro) alphabetically."
          ],
          workedExample: "Question: Draw and name the IUPAC structure of the organic compound: CH3-CH2-CH(OH)-CH3.\n\nSolution:\n1. Longest chain has 4 carbons. Root name is 'butane'.\n2. Functional group is an alcohol (-OH), suffix is '-ol'.\n3. Number the chain from the side closest to -OH: Carbon 3 has the -OH if numbered left-to-right, but Carbon 2 has it if numbered right-to-left. We choose right-to-left (lowest number = 2).\n4. Combined name: Butan-2-ol.\nAnswer: Butan-2-ol"
        }
      },
      {
        id: "electrolysis",
        title: "Electrolysis & Faraday's Laws",
        seniorDesc: "Understand galvanic/electrolytic cells, discharge priority, and solve Faraday's mass calculations.",
        seniorGreeting: "Hello Teacher! 🧪 How does electrolysis work? What is the difference between the anode and the cathode? How do we calculate the mass of copper deposited using Faraday's Law m = Qz?",
        seniorMarkingGuide: "SSS Chemistry Electrolysis: State Faraday's First Law (m is proportional to Q) [1.5 Marks]. State charge equation Q = I*t [1.5 Marks]. Solve electrolysis mass deposition calculation [2 Marks].",
        studyNotes: {
          concept: "Electrolysis is the decomposition of an electrolyte by passing an electric current through it. Faraday's First Law states that the mass of substance liberated at an electrode is proportional to the quantity of electricity passed.",
          formulas: [
            "Q = I \\cdot t \\quad \\text{(Charge = Current } \\times \\text{ Time)}",
            "m = \\frac{M \\cdot Q}{n \\cdot F} \\quad \\text{where } F = 96500\\text{ C/mol}"
          ],
          steps: [
            "Anode (Positive Electrode): Oxidation occurs (loss of electrons). Cations move here.",
            "Cathode (Negative Electrode): Reduction occurs (gain of electrons). Anions move here.",
            "Calculate charge Q = I * t. Calculate moles of electrons. Use stoichiometry to find mass."
          ],
          workedExample: "Problem: Calculate the mass of Copper deposited at the cathode when a current of 2.0A is passed through a CuSO4 solution for 965 seconds. (Cu = 64, F = 96500 C).\n\nSolution:\n1. Charge passed: Q = I * t = 2.0 * 965 = 1930 Coulombs.\n2. Cathode reaction: Cu²⁺ + 2e⁻ -> Cu. (Requires 2 moles of electrons per mole of Cu).\n3. Moles of electrons: n(e) = Q / F = 1930 / 96500 = 0.02 moles.\n4. Moles of Cu: n(Cu) = n(e) / 2 = 0.02 / 2 = 0.01 moles.\n5. Mass of Cu: m = n * M = 0.01 * 64 = 0.64 grams.\nAnswer: Mass of Cu = 0.64g"
        }
      },
      {
        id: "hybridization",
        title: "Hybridization & Geometry",
        seniorDesc: "Understand sp, sp2, sp3 orbital mixing and molecular geometries of methane, ethene, and water.",
        seniorGreeting: "Good day, Teacher! 🧪 What is orbital hybridization? How do carbon s and p orbitals mix to form sp, sp2, and sp3 configurations, and how does this affect bond angles?",
        seniorMarkingGuide: "SSS Chemistry Orbitals: Define hybridization [1.5 Marks]. Differentiate sp (linear, 180°), sp² (trigonal planar, 120°), and sp³ (tetrahedral, 109.5°) [2 Marks]. State methane (sp³) example [1.5 Marks].",
        studyNotes: {
          concept: "Hybridization is the concept of mixing atomic orbitals to form new hybrid orbitals suitable for qualitative pairing properties, determining molecular shapes.",
          formulas: [],
          steps: [
            "sp³ Hybridization: 1 s-orbital and 3 p-orbitals mix. Forms tetrahedral shape with 109.5° bond angles (e.g. CH4).",
            "sp² Hybridization: 1 s-orbital and 2 p-orbitals mix. Forms trigonal planar shape with 120° bond angles (e.g. C2H4).",
            "sp Hybridization: 1 s-orbital and 1 p-orbital mix. Forms linear shape with 180° bond angles (e.g. C2H2)."
          ],
          workedExample: "Question: Explain the hybridization and shape of the methane (CH4) molecule.\n\nAnswer:\n1. Carbon has ground state configuration 1s² 2s² 2p². During bonding, one 2s electron is excited to the vacant 2pz orbital.\n2. The one 2s orbital and three 2p orbitals (px, py, pz) mix to form four identical sp³ hybrid orbitals.\n3. These four orbitals repel each other equally, pointing to the corners of a regular tetrahedron with bond angles of 109.5°, creating a symmetrical tetrahedral molecule."
        }
      }
    ]
  },
  english: {
    id: "english",
    name: "English Language (SSS)",
    topics: [
      {
        id: "formal_letter",
        title: "Formal Letter Layout",
        seniorDesc: "Format formal letters with two addresses, subject line, formal salutation, and high register body.",
        seniorGreeting: "Good day, ma/sir! ✍️ I'm writing a letter of complaint to a company manager. Where do I place the two addresses, how do I write the subject line, and how should I sign off?",
        seniorMarkingGuide: "SSS English Formal Letter: Include writer's address + date (top right) and recipient's address (left) [1.5 Marks]. Include a capitalised subject line [1 Mark]. Formal salutation (Dear Sir/Madam) [1 Mark]. Formal sign-off (Yours faithfully + signature + full name) [1.5 Marks].",
        studyNotes: {
          concept: "A formal letter is an official business letter written to authorities, employers, or organizations. It requires a precise layout and professional tone.",
          formulas: [],
          steps: [
            "Write the writer's address and date in the top right corner.",
            "Write the recipient's designation and address on the left margin, below the date level.",
            "Write the salutation: Dear Sir, or Dear Madam, or Dear Sir/Madam,.",
            "Write a clear, capitalized Subject Line (underlined or bolded).",
            "Write the body using formal register, dividing it into clear paragraphs.",
            "Sign-off on the left side: Yours faithfully, followed by your signature and full name."
          ],
          workedExample: "Question: Outline the layout of a formal letter.\n\nAnswer:\n1. Writer's Address & Date (Top right)\n2. Recipient's Address (Left side)\n3. Salutation (Dear Sir/Madam,)\n4. Subject Line (e.g. APPLICATION FOR EMPLOYMENT)\n5. Body (Formal paragraphs)\n6. Subscription (Yours faithfully,)\n7. Signature\n8. Full Name"
        }
      },
      {
        id: "argumentative",
        title: "Argumentative Essay",
        seniorDesc: "Structure debates and arguments, establish balance, and use rhetorical devices.",
        seniorGreeting: "Good day, Teacher! I am preparing a debate topic 'Should mobile phones be banned in schools?'. How do I present my arguments in a balanced way, and how do I write a strong counter-argument?",
        seniorMarkingGuide: "SSS English Essay: State a clear stance in the introduction [1 Mark]. Provide at least three logical, well-developed arguments [2 Marks]. Address and refute counter-arguments [1 Mark]. Write a strong conclusion [1 Mark].",
        studyNotes: {
          concept: "An argumentative essay requires the writer to investigate a topic, collect and evaluate evidence, and establish a clear position on the topic.",
          formulas: [],
          steps: [
            "Stance: Define your position in the thesis statement (intro).",
            "Arguments: Use evidence and statistics (PEEL method: Point, Evidence, Explanation, Link).",
            "Refutation: State the opponent's view and immediately explain why it is weak or incorrect."
          ],
          workedExample: "Question: State three key structural requirements of an argumentative essay.\n\nAnswer:\n1. Clear Thesis/Stance: The introduction must state which side of the debate the essay is supporting.\n2. Balanced Arguments: The body must present structured points backed by facts and logical reasoning.\n3. Counter-Argument/Refutation: The writer must mention the opposing view and systematically explain why it is flawed, reinforcing their own stance."
        }
      },
      {
        id: "concord",
        title: "Concord & Agreement",
        seniorDesc: "Master subject-verb agreement rules, collective nouns, and correlative conjunctions.",
        seniorGreeting: "Hi Teacher! I get confused about concord rules. Why is it 'Every boy and girl IS present' instead of 'are present'? How do rules for 'either/or' and 'neither/nor' work?",
        seniorMarkingGuide: "SSS English Concord: State rule of singular subject with singular verb [1.5 Marks]. State proximity rule for 'either/or' [1.5 Marks]. State collective noun rules [2 Marks].",
        studyNotes: {
          concept: "Concord is the grammatical agreement between words in a sentence, primarily between the subject and the verb in number and person.",
          formulas: [
            "\\text{Subject (Singular)} \\implies \\text{Verb (Singular)}",
            "\\text{Either A or B (Singular/Plural)} \\implies \\text{Verb agrees with B (Proximity Rule)}"
          ],
          steps: [
            "Identify the true subject (ignore parenthetical phrases like 'as well as' or 'together with').",
            "Proximity Rule: With 'either/or' or 'neither/nor', the verb agrees with the subject closest to it.",
            "Indefinite pronouns (each, everyone, someone) always take singular verbs."
          ],
          workedExample: "Problem: Choose the correct verb form in: 'Neither the teacher nor the students (is/are) going to the hall.'\n\nSolution:\n1. The subjects are connected by 'neither/nor'.\n2. The closest subject to the verb is 'the students' (plural).\n3. Applying the proximity rule, the verb must be plural ('are').\nAnswer: 'Neither the teacher nor the students ARE going to the hall.'"
        }
      },
      {
        id: "indirect_speech",
        title: "Direct & Indirect Speech",
        seniorDesc: "Convert direct quotes into reported speech, shifting tenses, pronouns, and time markers.",
        seniorGreeting: "Good day, Teacher! 🗣️ How do I convert direct speech like: Chidi said, 'I am studying today' into reported speech? What happens to the tenses and time words?",
        seniorMarkingGuide: "SSS English Grammar: Shift tenses back (present -> past, past -> past perfect) [2 Marks]. Change pronouns correctly [1.5 Marks]. Shift time markers (today -> that day) [1.5 Marks].",
        studyNotes: {
          concept: "Direct speech quotes the exact words spoken. Indirect (reported) speech reports the statement, requiring backshifting of tenses, pronouns, and time/place markers.",
          formulas: [
            "\\text{\"I am\"} \\implies \\text{he/she was}",
            "\\text{\"tomorrow\"} \\implies \\text{the following day}"
          ],
          steps: [
            "Remove quotation marks and add the conjunction 'that'.",
            "Shift pronouns (e.g. 'I' -> 'he/she').",
            "Backshift tenses: Present Simple -> Past Simple; Past Simple -> Past Perfect.",
            "Shift time markers: 'now' -> 'then', 'yesterday' -> 'the previous day'."
          ],
          workedExample: "Problem: Convert to indirect speech: She said, 'I finished my homework yesterday.'\n\nSolution:\n1. Pronoun: 'I' -> 'she', 'my' -> 'her'.\n2. Tense: 'finished' (Past Simple) -> 'had finished' (Past Perfect).\n3. Time marker: 'yesterday' -> 'the previous day'.\nAnswer: 'She said that she had finished her homework the previous day.'"
        }
      },
      {
        id: "phrasal_verbs",
        title: "Idioms & Phrasal Verbs",
        seniorDesc: "Analyze idiomatic expressions and phrasal verbs in comprehension passages.",
        seniorGreeting: "Hello Teacher! I see expressions like 'put up with' or 'kick the bucket' in essays. What is a phrasal verb? How do I understand idioms in exam questions?",
        seniorMarkingGuide: "SSS English Idioms: Define idiom as non-literal phrase [1 Mark]. Define phrasal verb as verb + preposition [1 Mark]. Explain context clues to identify meanings [2 Marks].",
        studyNotes: {
          concept: "An idiom is a phrase where the meaning is not deducible from the individual words (e.g., 'raining cats and dogs'). A phrasal verb is a combination of a verb and a preposition or adverb (e.g., 'look after', 'give up').",
          formulas: [],
          steps: [
            "Identify the phrase structure.",
            "Analyze context clues to deduce the figurative meaning.",
            "Replace the phrase with its literal single-word equivalent in your mind to check structure."
          ],
          workedExample: "Question: State the meaning of the capitalized phrasal verbs/idioms: 'The meeting was PUT OFF because the manager decided to CALL IT A DAY.'\n\nAnswer:\n1. PUT OFF: Postponed (delayed to a later time).\n2. CALL IT A DAY: Stop working (end the activity for the day)."
        }
      },
      {
        id: "clause_analysis",
        title: "Clause & Phrase Analysis",
        seniorDesc: "Identify noun clauses, adjectival clauses, adverbial clauses, and their grammatical functions.",
        seniorGreeting: "Good day, Teacher! 📖 In the English exam, they ask us to identify grammatical names and functions, like 'The man WHO STOLE THE BAG ran away'. What is the difference between a clause and a phrase, and how do I identify their functions?",
        seniorMarkingGuide: "SSS English Grammar: Differentiate phrase (no verb) vs clause (has finite verb) [2 Marks]. Identify adjectival clause and its function (modifies noun) [2 Marks]. Identify noun/adverbial clause [1 Mark].",
        studyNotes: {
          concept: "A phrase is a group of words without a finite verb. A clause is a group of words containing a subject and a finite verb. Clauses can be main (independent) or subordinate (dependent).",
          formulas: [],
          steps: [
            "Look for a verb: if present, it's a clause. If absent, it's a phrase.",
            "Noun Clause: Answers 'what?' (Function: Subject or Object of a verb).",
            "Adjectival (Relative) Clause: Starts with who/which/that and describes a noun (Function: Modifies the noun).",
            "Adverbial Clause: Shows time/place/reason, starts with when/because/if (Function: Modifies the verb)."
          ],
          workedExample: "Question: Identify the grammatical name and function of the capitalized group of words: 'The driver stopped the bus WHERE the road was blocked.'\n\nAnswer:\n1. Grammatical Name: Adverbial clause of place (contains subject 'the road' and verb 'was').\n2. Grammatical Function: It modifies the verb 'stopped'."
        }
      },
      {
        id: "register",
        title: "Register of Professions",
        seniorDesc: "Build vocabulary registers for Science, Law, Medicine, Agriculture, and Commerce.",
        seniorGreeting: "Hello Teacher! What does 'register' mean, and how do I know the correct terminology for Law, Medicine, or Business?",
        seniorMarkingGuide: "SSS English Register: Define register as situation-specific language [2 Marks]. Give examples of legal, medical, or commerce terms [3 Marks].",
        studyNotes: {
          concept: "Register refers to the specific vocabulary and style of language associated with a particular trade, profession, or subject area.",
          formulas: [],
          steps: [
            "Law Register: Plaintiff, defendant, bail, prosecution, verdict, litigation.",
            "Medicine Register: Diagnosis, therapy, surgery, prescription, chronic, symptoms.",
            "Commerce Register: Debenture, collateral, inflation, dividend, retail, bankruptcy."
          ],
          workedExample: "Question: Match the terms to their correct professional register: Plaintiff, Stethoscope, Collateral, Irrigation.\n\nAnswer:\n1. Plaintiff: Law (Legal register)\n2. Stethoscope: Medicine (Medical register)\n3. Collateral: Commerce/Banking register\n4. Irrigation: Agriculture register"
        }
      },
      {
        id: "comprehension_sss",
        title: "Advanced Comprehension",
        seniorDesc: "Deconstruct complex passages, identify literary devices, and write precise context synonyms.",
        seniorGreeting: "Good day, Teacher! In advanced reading passages, how do I identify figures of speech (like metaphors or personification) and choose the correct contextual replacement word?",
        seniorMarkingGuide: "SSS English Reading: Identify literary devices (metaphor, simile, personification) [2 Marks]. Replace words with exact contextual synonyms (same part of speech/tense) [3 Marks].",
        studyNotes: {
          concept: "Advanced reading comprehension tests a student's ability to interpret structural tone, figures of speech, and substitute words exactly as used in the passage.",
          formulas: [],
          steps: [
            "Figures of speech: Metaphor (direct comparison), Simile (comparison using 'like' or 'as'), Personification (giving human traits to objects).",
            "Word substitution: The replacement word must match the tense, number, and part of speech of the original word exactly."
          ],
          workedExample: "Question: Replace the word 'TERMINATED' in the sentence: 'The contract was terminated due to a breach.' with a contextual synonym.\n\nAnswer:\n'ended' or 'cancelled' or 'annulled'. (Must be past tense verb to match 'terminated')"
        }
      },
      {
        id: "summary_writing",
        title: "Summary Writing Skills",
        seniorDesc: "Extract core arguments, eliminate illustrative noise, and write concise summary sentences.",
        seniorGreeting: "Hello Teacher! 📝 Summary writing is where I lose the most marks. How do I condense a long 3-page passage into exactly 3 sentences without losing the key points?",
        seniorMarkingGuide: "SSS English Summary: Eliminate illustrative examples and repetitions [2 Marks]. Write answers in distinct, grammatically complete sentences [3 Marks].",
        studyNotes: {
          concept: "Summary writing is the extraction of the main points of a text, excluding details, examples, and redundant expressions. Answers must be written in complete sentences.",
          formulas: [],
          steps: [
            "Read the questions carefully to know what specific points to extract.",
            "Draft key points, cutting out adjectives, examples, and explanations.",
            "Write the final summary points as single, independent, grammatically correct sentences. Do not use phrases."
          ],
          workedExample: "Question: Outline the three golden rules of summary writing for secondary exams.\n\nAnswer:\n1. Relevance: Extract only information that directly answers the summary question.\n2. Conciseness: Eliminate illustrative statistics, stories, and redundant adjectives.\n3. Grammatical Completeness: Every summary point must be written as a complete sentence (starting with a capital letter and ending with a full stop)."
        }
      },
      {
        id: "mechanical_accuracy",
        title: "Mechanical Accuracy rules",
        seniorDesc: "Avoid run-on sentences, comma splices, spelling mistakes, and grammatical slips (-0.5 mark deductions).",
        seniorGreeting: "Good day, Teacher! ✍️ My essays always get penalized for 'Mechanical Accuracy'. What is a comma splice? How do I write cleanly to avoid losing half a mark for every spelling error?",
        seniorMarkingGuide: "SSS English Writing: Define comma splice and run-on sentence [2 Marks]. Outline punctuation correction methods [2 Marks]. Explain the WAEC -0.5 deduction rule [1 Mark].",
        studyNotes: {
          concept: "Mechanical Accuracy measures correctness in spelling, grammar, and punctuation. In major exams, every mechanical error leads to a strict deduction of 0.5 marks.",
          formulas: [
            "\\text{Total Mark} = \\text{Content/Organization} - 0.5 \\times \\text{Errors}"
          ],
          steps: [
            "Comma Splice: Joining two independent clauses with only a comma. Correct it by adding a conjunction, using a semicolon, or writing two sentences.",
            "Subject-Verb Agreement: Ensure singular subjects have singular verbs."
          ],
          workedExample: "Problem: Identify and correct the mechanical error in: 'Chidi studied hard, he passed the exam.'\n\nSolution:\n1. Error: This is a Comma Splice. 'Chidi studied hard' and 'he passed the exam' are both independent clauses. They cannot be linked by only a comma.\n2. Correction options:\n   - Option A (Conjunction): 'Chidi studied hard, and he passed the exam.'\n   - Option B (Semicolon): 'Chidi studied hard; he passed the exam.'\n   - Option C (Full Stop): 'Chidi studied hard. He passed the exam.'\nAnswer: 'Chidi studied hard, and he passed the exam.'"
        }
      }
    ]
  },
  civic: {
    id: "civic",
    name: "Civic Education (SSS)",
    topics: [
      {
        id: "udhr",
        title: "Universal Declaration of Human Rights",
        seniorDesc: "Understand the historical origin, the 30 articles of UDHR, and the role of the UN.",
        seniorGreeting: "Good day, Teacher! ⚖️ What is the Universal Declaration of Human Rights (UDHR)? When was it adopted by the United Nations, and what are the main classifications of these rights?",
        seniorMarkingGuide: "SSS Civic UDHR: State adoption date (December 10, 1948) [1 Mark]. Explain historical background (post-WWII) [2 Marks]. Classify civil/political and economic/social rights [2 Marks].",
        studyNotes: {
          concept: "The Universal Declaration of Human Rights (UDHR) is a milestone document adopted by the United Nations General Assembly in Paris, containing 30 articles that outline basic rights for all humans.",
          formulas: [],
          steps: [
            "Adopted: December 10, 1948, following the atrocities of World War II.",
            "Classifications: Civil and Political Rights (Articles 1-21: e.g., right to life, freedom from torture or slavery); Economic, Social, and Cultural Rights (Articles 22-30: e.g., right to work, education)."
          ],
          workedExample: "Question: When was UDHR adopted, and name three rights classified under its civil and political category.\n\nAnswer:\n1. Adoption: UDHR was adopted on December 10, 1948.\n2. Civil/Political Rights: Right to life, freedom from torture or slavery, and the right to a fair trial."
        }
      },
      {
        id: "constitutionalism",
        title: "Constitutionalism & Rule of Law",
        seniorDesc: "Explain the supremacy of the constitution, limitations of power, and judicial independence.",
        seniorGreeting: "Hello Teacher! What is constitutionalism? How does the 'Rule of Law' protect citizens from dictatorship, and what does the separation of powers mean?",
        seniorMarkingGuide: "SSS Civic Law: Define constitutionalism [1.5 Marks]. State three pillars of Rule of Law (equality, supremacy of law, protection of rights) [2 Marks]. Explain separation of powers [1.5 Marks].",
        studyNotes: {
          concept: "Constitutionalism is the principle that government authority is derived from and limited by a body of fundamental law (the Constitution). The Rule of Law states that the law is supreme over all citizens and rulers.",
          formulas: [],
          steps: [
            "Pillars of Rule of Law (AV Dicey): Supremacy of Law, Equality before the Law, and Dominance of Judicial Rights.",
            "Separation of Powers: Dividing government into Executive (enforces laws), Legislature (makes laws), and Judiciary (interprets laws) to prevent tyranny."
          ],
          workedExample: "Question: Define constitutionalism and outline the three arms of government under the separation of powers.\n\nAnswer:\n1. Constitutionalism is the belief that a government must act within the limits and rules set by a supreme constitution.\n2. Three Arms:\n   - The Legislature: Responsible for making and modifying laws.\n   - The Executive: Responsible for implementing and enforcing laws.\n   - The Judiciary: Responsible for interpreting laws and settling disputes."
        }
      },
      {
        id: "democracy",
        title: "Democratic Values & Practice",
        seniorDesc: "Analyze multi-party systems, voter registration, independent electoral bodies, and civil duties.",
        seniorGreeting: "Good day, ma/sir! 🗳️ How do we build a strong democracy in Nigeria? What are the duties of the Independent National Electoral Commission (INEC), and why is voter apathy a threat?",
        seniorMarkingGuide: "SSS Civic Democracy: List 3 features of democracy (free elections, multi-party system, rule of law) [2 Marks]. Define INEC roles [1.5 Marks]. Explain voter apathy threat [1.5 Marks].",
        studyNotes: {
          concept: "Democratic practices involve the active participation of citizens in governance through elections, public debates, and accountability systems.",
          formulas: [],
          steps: [
            "INEC: Registers political parties, conducts voter registration, organizes national and state elections.",
            "Voter Apathy: The lack of interest among citizens to vote. Threatens democracy because it leads to poor leaders being elected by a tiny minority."
          ],
          workedExample: "Question: State three functions of the Independent National Electoral Commission (INEC) in Nigeria.\n\nAnswer:\n1. Organizing and conducting free, fair, and credible elections.\n2. Registering eligible voters and issuing Permanent Voter Cards (PVCs).\n3. Registering, monitoring, and auditing political parties."
        }
      },
      {
        id: "youth_empowerment",
        title: "Youth Empowerment schemes",
        seniorDesc: "Analyze vocational training, national youth service (NYSC), and entrepreneurship funding.",
        seniorGreeting: "Hello Teacher! 🧑‍🎓 What is youth empowerment? How does the National Youth Service Corps (NYSC) promote national unity, and what skills are needed for self-employment?",
        seniorMarkingGuide: "SSS Civic Empowerment: Define youth empowerment [1 Mark]. List 3 empowerment schemes in Nigeria (NYSC, N-Power, SMEDAN) [2 Marks]. Explain NYSC unity role [2 Marks].",
        studyNotes: {
          concept: "Youth empowerment is a structural process where young people are equipped with skills, authority, and resources to build careers and contribute to national growth.",
          formulas: [],
          steps: [
            "NYSC: Established in 1973 to rebuild the nation and foster unity by deploying graduates to different states.",
            "Vocational Skills: Technical skills (web design, metal fabrication, agriculture).",
            "Support Agencies: SMEDAN (small business development), Bank of Industry."
          ],
          workedExample: "Question: Define youth empowerment, and explain two objectives of the National Youth Service Corps (NYSC).\n\nAnswer:\n1. Youth empowerment is the provision of educational, vocational, and financial support to enable young people to take control of their lives and create wealth.\n2. NYSC Objectives:\n   - To foster national unity and integration by sending graduates to work in states different from their place of birth.\n   - To develop national patriotism and community development through public service."
        }
      },
      {
        id: "civil_society",
        title: "Civil Society Organizations",
        seniorDesc: "Understand NGOs, pressure groups, and how they protect citizens' rights.",
        seniorGreeting: "Good day, Teacher! What are Civil Society Organizations (CSOs) or NGOs? How do pressure groups influence government policies, and what are examples in Nigeria?",
        seniorMarkingGuide: "SSS Civic CSOs: Define Civil Society Organizations [2 Marks]. List 2 pressure groups/CSOs (NLC, ASUU, CDHR) [1 Mark]. Explain their role in defending democracy [2 Marks].",
        studyNotes: {
          concept: "Civil Society Organizations (CSOs) are non-governmental, non-profit organizations that represent the interests and values of citizens in public life, holding the government accountable.",
          formulas: [],
          steps: [
            "NGOs: Non-Governmental Organizations (e.g. Red Cross, Amnesty International).",
            "Pressure Groups: Groups that seek to influence government decisions without seeking to hold power (e.g., NLC - Nigeria Labour Congress, ASUU).",
            "Role: Protecting human rights, monitoring elections, pushing for better laws."
          ],
          workedExample: "Question: Define Civil Society Organizations and list three roles they play in defending democracy.\n\nAnswer:\n1. CSOs are non-profit, independent organizations formed by citizens to advocate for public interests, human rights, and social welfare.\n2. Roles:\n   - Monitoring elections to prevent rigging and fraud.\n   - Educating citizens on their constitutional rights and voting duties.\n   - Pushing the government to change policies through peaceful protests or lobbying."
        }
      },
      {
        id: "relationships",
        title: "Interpersonal Relationships",
        seniorDesc: "Understand cooperation, compromise, and resolving communal conflicts peacefully.",
        seniorGreeting: "Hello Teacher! In Civic Education, we are discussing communal peace. What are the attributes of positive interpersonal relationships, and how do we resolve conflicts without violence?",
        seniorMarkingGuide: "SSS Civic Relations: Define interpersonal relationship [1 Mark]. List 3 attributes (trust, respect, communication, compromise) [2 Marks]. Suggest 2 conflict resolution steps [2 Marks].",
        studyNotes: {
          concept: "Interpersonal relationships are social associations and connections between two or more people. Healthy relationships build social stability and prevent communal crises.",
          formulas: [],
          steps: [
            "Attributes: Mutual respect, effective communication, trust, compromise.",
            "Conflict Resolution: Dialogue, mediation (third party help), arbitration (court/judges), and compromise."
          ],
          workedExample: "Question: State three qualities of a healthy interpersonal relationship and outline two methods of peaceful conflict resolution.\n\nAnswer:\nQualities:\n1. Mutual respect (valuing each other's opinions and boundaries).\n2. Trust and Honesty (being transparent and dependable).\n3. Effective Communication (active listening and speaking calmly).\nResolution methods:\n1. Mediation: Bringing in an impartial third party to guide the disputing sides to an agreement.\n2. Dialogue: Meeting face-to-face to discuss issues and find a common compromise."
        }
      },
      {
        id: "national_integrity",
        title: "National Values (Integrity)",
        seniorDesc: "Detail self-control, patriotism, and how integrity acts as a barrier to corruption.",
        seniorGreeting: "Good day, Teacher! What does 'Integrity' mean? How does individual integrity act as a weapon to fight corruption and financial crimes in public offices?",
        seniorMarkingGuide: "SSS Civic Values: Define integrity [2 Marks]. Explain how integrity fights corruption (refusal to take bribes, transparency) [2 Marks]. State benefits to nation [1 Mark].",
        studyNotes: {
          concept: "Integrity is the quality of being honest and having strong moral principles that you refuse to compromise under pressure.",
          formulas: [],
          steps: [
            "Public Integrity: Standing against bribery, nepotism (favoritism), and embezzlement.",
            "Attributes: Accountability, consistency, transparency, moral courage.",
            "National Benefit: Creates a clean system, attracts foreign business, improves international reputation."
          ],
          workedExample: "Question: Define integrity, state three characteristics of a person of integrity, and explain its importance to national development.\n\nAnswer:\n1. Integrity is the firm adherence to high moral values and complete honesty, regardless of circumstances.\n2. Characteristics: Truthfulness, accountability (taking responsibility), and consistency in moral actions.\n3. National Development: When leaders and citizens have integrity, public funds are spent properly on infrastructure, corruption is reduced, and standard processes are respected, boosting development."
        }
      },
      {
        id: "emergency_services",
        title: "Emergency & Security Services",
        seniorDesc: "Understand the roles of police, civil defense (NSCDC), NEMA, and road safety.",
        seniorGreeting: "Hi Teacher! 🚨 What is the difference between the Nigerian Police Force and the Civil Defense (NSCDC)? What is the role of NEMA in managing national disasters?",
        seniorMarkingGuide: "SSS Civic Emergency: State Police role (internal security, law enforcement) [1.5 Marks]. State NSCDC role (protecting critical infrastructure) [1.5 Marks]. State NEMA role (disaster management) [2 Marks].",
        studyNotes: {
          concept: "Emergency and security services are government agencies set up to maintain internal security, protect lives and property, and manage natural or human-made disasters.",
          formulas: [],
          steps: [
            "Nigerian Police Force: Maintenance of law and order, detection and prevention of crime, arresting offenders.",
            "NSCDC (Nigeria Security and Civil Defense Corps): Protecting national critical infrastructure (oil pipelines, electrical grids) and assisting NEMA.",
            "NEMA (National Emergency Management Agency): Responding to fires, floods, building collapses, and coordinating relief materials."
          ],
          workedExample: "Question: Identify the primary functions of the Nigerian Police Force, the NSCDC, and NEMA.\n\nAnswer:\n1. Nigerian Police Force: Internal security, crime prevention, and enforcing laws.\n2. NSCDC: Safeguarding critical public infrastructure (like power grids and pipelines) and disaster emergency response.\n3. NEMA: Disaster management, coordinating rescue operations during crises, and providing relief supplies."
        }
      },
      {
        id: "traffic_management",
        title: "Traffic Regulations Management",
        seniorDesc: "Analyze the causes of highway accidents and traffic control strategies of FRSC.",
        seniorGreeting: "Good day, Teacher! 🚦 Why do we have so many accidents on our federal highways? What are the main causes of road crashes, and how do traffic laws save lives?",
        seniorMarkingGuide: "SSS Civic Traffic: List 3 human causes of road crashes (speeding, phone use, drunk driving) [2 Marks]. List 2 mechanical causes (brake failure, bad tires) [1 Mark]. Explain speed limiters role [2 Marks].",
        studyNotes: {
          concept: "Traffic regulation management involves enforcing road laws and engineering safe highways to reduce accidents and manage gridlocks.",
          formulas: [],
          steps: [
            "Human factors: Over-speeding (causes 50%+ of crashes), driving under the influence, using phones, fatigue (falling asleep).",
            "Mechanical factors: Brake failure, worn-out tires, engine breakdowns.",
            "Control measures: Deploying speed limiters, enforcing seatbelt laws, conducting regular vehicle inspections (VIO)."
          ],
          workedExample: "Question: Identify three human errors that cause highway accidents and state two safety measures enforced by the FRSC.\n\nAnswer:\n1. Human errors: Over-speeding, driving under the influence of alcohol, and distracted driving (using phones while driving).\n2. Safety measures: Enforcing the use of speed-limiting devices in commercial vehicles, and conducting random breathalyzer tests to detect drivers under the influence."
        }
      },
      {
        id: "citizenship_education",
        title: "Citizenship Education",
        seniorDesc: "Understand national consciousness, civic duties, and how to protect the environment.",
        seniorGreeting: "Hello Teacher! What is citizenship education? How does it teach us national consciousness, and what are the rights and duties of a citizen under the constitution?",
        seniorMarkingGuide: "SSS Civic Education: Define citizenship education [2 Marks]. State 2 civic duties (voting, tax payment, law obedience) [2 Marks]. Explain national consciousness [1 Mark].",
        studyNotes: {
          concept: "Citizenship education equips citizens with knowledge about their government, rights, and duties, preparing them to participate actively in democratic life.",
          formulas: [],
          steps: [
            "National Consciousness: Developing a strong sense of pride, patriotism, and love for one's country above tribal divisions.",
            "Civic Duties: Actions citizens *must* perform (obeying laws, paying taxes, voting, testifying in court)."
          ],
          workedExample: "Question: Define citizenship education and list three civic duties a citizen owes to their country.\n\nAnswer:\n1. Citizenship education is the training of individuals to become responsible, patriotic, and active members of their country.\n2. Civic duties:\n   - Obeying all laws of the land.\n   - Prompt and honest payment of taxes.\n   - Defending the country and assisting security agencies by reporting crimes."
        }
      }
    ]
  },
  economics: {
    id: "economics",
    name: "Economics (SSS)",
    topics: [
      {
        id: "elasticity",
        title: "Elasticity of Demand & Supply",
        seniorDesc: "Calculate price, income, and cross elasticity of demand and interpret curves.",
        seniorGreeting: "Hello Teacher! 📈 I am studying the Law of Demand and Supply for Economics. I see that the demand curve slopes downwards, but I don't understand the income effect, substitution effect, and what ceteris paribus means. Can you explain?",
        seniorMarkingGuide: "SS2 Economics Demand: State law of demand with 'ceteris paribus' clause [2 Marks]. Explain slope using income and substitution effects [2 Marks]. State law of supply [1 Mark].",
        studyNotes: {
          concept: "Elasticity measures the responsiveness of quantity demanded or supplied to a change in price, income, or related goods.",
          formulas: [
            "E_d = \\frac{\\% \\Delta Q_d}{\\% \\Delta P} = \\frac{Q_2 - Q_1}{Q_1} \\div \\frac{P_2 - P_1}{P_1}",
            "E_d > 1 \\implies \\text{Elastic}, \\quad E_d < 1 \\implies \\text{Inelastic}"
          ],
          steps: [
            "Calculate percentage change in quantity: %ΔQ = (Change in Q / Original Q) * 100.",
            "Calculate percentage change in price: %ΔP = (Change in P / Original P) * 100.",
            "Divide %ΔQ by %ΔP. Take the absolute value (ignore negative sign)."
          ],
          workedExample: "Problem: The price of bread rises from ₦500 to ₦600, causing demand to fall from 100 loaves to 90 loaves. Calculate the price elasticity of demand.\n\nSolution:\n1. %ΔQ = (90 - 100) / 100 = -10/100 = -10%.\n2. %ΔP = (600 - 500) / 500 = 100/500 = +20%.\n3. Ed = |-10% / 20%| = 0.5.\n4. Since Ed = 0.5 < 1, demand is inelastic.\nAnswer: Price Elasticity of Demand = 0.5"
        }
      },
      {
        id: "production_cost",
        title: "Production & Cost Theories",
        seniorDesc: "Understand Fixed, Variable, Marginal, and Average costs and the law of diminishing returns.",
        seniorGreeting: "Good day, Teacher! In economics, what is the difference between fixed costs and variable costs? How do we calculate Marginal Cost (MC), and what is the law of diminishing returns?",
        seniorMarkingGuide: "SSS Economics Production: Define Fixed Cost (independent of output) and Variable Cost [2 Marks]. State formulas: TC = FC + VC, and MC = dTC/dQ [1.5 Marks]. Explain diminishing returns [1.5 Marks].",
        studyNotes: {
          concept: "Production cost is the total money spent to produce goods. The Law of Diminishing Returns states that adding more variable inputs to fixed inputs eventually leads to smaller increases in output.",
          formulas: [
            "TC = TFC + TVC \\quad \\text{(Total Cost)}",
            "AC = \\frac{TC}{Q} \\quad \\text{(Average Cost)}",
            "MC = \\frac{\\Delta TC}{\\Delta Q} \\quad \\text{(Marginal Cost)}"
          ],
          steps: [
            "Fixed Costs (TFC): Constants like rent, machine purchases.",
            "Variable Costs (TVC): Change with output (raw materials, wages).",
            "Compute Total Cost (TC), then divide by quantity (Q) for Average Cost (AC)."
          ],
          workedExample: "Problem: A bakery has a fixed cost of ₦1,000. It produces 10 cakes at a variable cost of ₦1,500. Find the Total Cost and Average Cost per cake.\n\nSolution:\n1. Total Cost: TC = TFC + TVC = 1000 + 1500 = ₦2,500.\n2. Average Cost: AC = TC / Q = 2500 / 10 = ₦250 per cake.\nAnswer: TC = ₦2,500, AC = ₦250"
        }
      },
      {
        id: "market_structures",
        title: "Market Structures (Monopoly/Competition)",
        seniorDesc: "Compare perfect competition, monopoly, oligopoly, and monopolistic markets.",
        seniorGreeting: "Hello Teacher! What is the difference between a perfect competition market and a monopoly? Why can monopolies set their own prices, while perfect competitors are price takers?",
        seniorMarkingGuide: "SSS Economics Market: List features of perfect competition (many buyers/sellers, homogeneous product, free entry) [2 Marks]. List features of monopoly (single seller, barriers to entry) [2 Marks].",
        studyNotes: {
          concept: "Market structure describes the competitive environment of a market. It ranges from highly competitive (perfect competition) to non-competitive (monopoly).",
          formulas: [
            "\\text{Profit Max: } MC = MR \\quad \\text{(Marginal Cost = Marginal Revenue)}"
          ],
          steps: [
            "Perfect Competition: Many buyers/sellers, identical products, perfect information, price takers.",
            "Monopoly: Single seller, unique product with no close substitutes, high barriers to entry, price maker."
          ],
          workedExample: "Question: Compare perfect competition and monopoly based on number of sellers, product type, and control over price.\n\nAnswer:\nFeature | Perfect Competition | Monopoly\nSellers | Very many | Single seller\nProduct Type | Homogeneous (identical) | Unique (no substitute)\nPrice Control | Price taker (no control) | Price maker (high control)"
        }
      },
      {
        id: "inflation",
        title: "Inflation & Price Index",
        seniorDesc: "Calculate inflation rate using Consumer Price Index (CPI) and identify types.",
        seniorGreeting: "Good day, Teacher! 📈 What is inflation? What is the difference between demand-pull inflation and cost-push inflation, and how do we calculate CPI?",
        seniorMarkingGuide: "SSS Economics Inflation: Define inflation as persistent rise in prices [1 Mark]. Differentiate demand-pull (high demand) vs cost-push (high production cost) [2 Marks]. State CPI formula [2 Marks].",
        studyNotes: {
          concept: "Inflation is a persistent, general rise in the price level of goods and services over time. The Consumer Price Index (CPI) measures this change using a basket of goods relative to a base year.",
          formulas: [
            "\\text{CPI} = \\frac{\\text{Cost of Basket in Current Year}}{\\text{Cost of Basket in Base Year}} \\times 100",
            "\\text{Inflation Rate} = \\frac{\\text{CPI}_2 - \\text{CPI}_1}{\\text{CPI}_1} \\times 100\\%"
          ],
          steps: [
            "Compute cost of goods in base year and current year.",
            "Calculate CPI for both periods.",
            "Substitute into the inflation rate formula."
          ],
          workedExample: "Problem: The cost of a consumer basket was ₦2,000 in the base year (2020) and rose to ₦2,500 in 2021. Find the CPI for 2021 and the inflation rate.\n\nSolution:\n1. CPI (2021) = (2500 / 2000) * 100 = 1.25 * 100 = 125.\n2. Since base year CPI is always 100, Inflation Rate = (125 - 100) / 100 * 100% = 25%.\nAnswer: CPI = 125, Inflation Rate = 25%"
        }
      },
      {
        id: "national_income",
        title: "National Income Accounting",
        seniorDesc: "Calculate GDP, GNP, NNP, and explain the output, income, and expenditure methods.",
        seniorGreeting: "Hello Teacher! 📊 What is the difference between Gross Domestic Product (GDP) and Gross National Product (GNP)? How do we calculate national income using the expenditure method?",
        seniorMarkingGuide: "SSS Economics Income: Define GDP (inside borders) and GNP (by citizens) [2 Marks]. State expenditure method formula Y = C + I + G + (X - M) [2 Marks]. Define terms [1 Mark].",
        studyNotes: {
          concept: "National income measures the total economic activity of a country in a year. GDP counts all production inside a country's borders, while GNP counts all production by a country's citizens globally.",
          formulas: [
            "Y = C + I + G + (X - M) \\quad \\text{(Expenditure Method)}",
            "\\text{GNP} = \\text{GDP} + \\text{Net Income from Abroad}",
            "\\text{NNP} = \\text{GNP} - \\text{Depreciation}"
          ],
          steps: [
            "C: Personal consumption by households.",
            "I: Private investment by businesses.",
            "G: Government spending.",
            "X - M: Net Exports (Exports minus Imports)."
          ],
          workedExample: "Problem: Calculate GDP using the expenditure method: Consumption (C) = ₦5,000, Investment (I) = ₦2,000, Government Spending (G) = ₦1,500, Exports (X) = ₦800, Imports (M) = ₦1,000.\n\nSolution:\n1. Formula: Y = C + I + G + (X - M)\n2. Substitute: Y = 5000 + 2000 + 1500 + (800 - 1000)\n3. Calculate: Y = 8500 + (-200) = ₦8,300.\nAnswer: GDP = ₦8,300"
        }
      },
      {
        id: "international_trade",
        title: "International Trade & Balance",
        seniorDesc: "Explain absolute/comparative advantage, balance of trade, and trade protectionism.",
        seniorGreeting: "Good day, Teacher! What is the difference between Balance of Trade and Balance of Payments? How does a country gain from comparative advantage in international trade?",
        seniorMarkingGuide: "SSS Economics Trade: Define Balance of Trade (visible imports/exports) [1.5 Marks]. Define Balance of Payments (all transactions) [1.5 Marks]. Explain comparative advantage (lower opportunity cost) [2 Marks].",
        studyNotes: {
          concept: "International trade is the exchange of goods and services across international borders. The Law of Comparative Advantage states that trade is beneficial if countries specialize in producing goods with a lower opportunity cost.",
          formulas: [],
          steps: [
            "Balance of Trade: Visible exports value minus visible imports value.",
            "Balance of Payments: A complete record of all financial transactions between a country and the rest of the world (current + capital accounts)."
          ],
          workedExample: "Question: Explain the difference between absolute advantage and comparative advantage.\n\nAnswer:\n1. Absolute Advantage: A country can produce more of a good than another country using the same amount of resources (e.g. Saudi Arabia producing more oil per worker than Japan).\n2. Comparative Advantage: A country can produce a good at a lower opportunity cost (giving up less of other goods) than another country, making specialization mutually beneficial."
        }
      },
      {
        id: "public_finance",
        title: "Public Finance & Taxation",
        seniorDesc: "Understand direct/indirect taxes, progressive/proportional rates, and deficit budgets.",
        seniorGreeting: "Hello, Teacher! What is public finance? What is the difference between direct taxes and indirect taxes? How do progressive, regressive, and proportional tax systems work?",
        seniorMarkingGuide: "SSS Economics Finance: Differentiate direct tax (on income) vs indirect tax (on goods) [2 Marks]. Define progressive tax (rate rises with income) and regressive tax [2 Marks]. State budget types [1 Mark].",
        studyNotes: {
          concept: "Public finance deals with government revenue (taxes, borrowing) and government expenditure. A tax is a compulsory levy imposed by the government.",
          formulas: [
            "\\text{Direct Tax: paid directly (e.g. PAYE, Company Tax)}",
            "\\text{Indirect Tax: paid via purchase (e.g. VAT, Excise Duty)}"
          ],
          steps: [
            "Progressive Tax: Tax rate increases as income increases (burden on wealthy).",
            "Proportional Tax: Tax rate remains constant for all income levels.",
            "Regressive Tax: Tax rate decreases as income increases (burden on poor)."
          ],
          workedExample: "Question: State three differences between direct taxes and indirect taxes.\n\nAnswer:\nFeature | Direct Taxes | Indirect Taxes\nIncidence | Cannot be shifted to others | Can be shifted to consumers\nLevied on | Income, wealth, profit | Goods, services, customs\nExample | Personal Income Tax (PAYE) | Value Added Tax (VAT)"
        }
      },
      {
        id: "economic_planning",
        title: "Economic Planning & Systems",
        seniorDesc: "Compare Capitalism, Socialism, Mixed Economies, and state planning frameworks.",
        seniorGreeting: "Good day, Teacher! What is the difference between a capitalist (free market) economy and a socialist (planned) economy? How does a mixed economy combine both?",
        seniorMarkingGuide: "SSS Economics Systems: List features of Capitalism (private ownership, price mechanism) [2 Marks]. List features of Socialism (state ownership, planning) [2 Marks]. Define Mixed Economy [1 Mark].",
        studyNotes: {
          concept: "An economic system is a framework that a country uses to allocate resources and distribute goods and services. It answers: What to produce? How to produce? For whom to produce?",
          formulas: [],
          steps: [
            "Capitalism (Free Market): Resources owned privately, price mechanism (demand/supply) coordinates decisions.",
            "Socialism (Command): Resources owned by the government, central planning board decides production.",
            "Mixed Economy: Public and private sectors operate together (e.g., Nigeria, UK)."
          ],
          workedExample: "Question: Contrast capitalism and socialism based on ownership of production, motivation, and price determination.\n\nAnswer:\nFeature | Capitalism | Socialism\nOwnership | Private individuals/firms | Government (State)\nMotivation | Profit maximization | Social welfare/equality\nPrice | Set by market forces | Set by government planning"
        }
      },
      {
        id: "money_capital_markets",
        title: "Money & Capital Markets",
        seniorDesc: "Analyze treasury bills, stocks, shares, and central bank monetary tools.",
        seniorGreeting: "Hello Teacher! What is the difference between the money market and the capital market? What are shares and debentures, and how does the stock exchange work?",
        seniorMarkingGuide: "SSS Economics Markets: Define money market (short term loans, treasury bills) [2 Marks]. Define capital market (long term loans, stocks/shares) [2 Marks].",
        studyNotes: {
          concept: "Financial markets mobilize savings for investment. The money market deals with short-term funds (maturity under 1 year). The capital market deals with long-term funds.",
          formulas: [],
          steps: [
            "Money Market: Controlled by Central Bank, trades Treasury Bills, Commercial Papers.",
            "Capital Market: Controlled by Securities & Exchange Commission, trades Shares, Stocks, Debentures.",
            "Shares: Equity ownership in a firm. Debentures: Long-term debt/loans raised by a firm."
          ],
          workedExample: "Question: State three differences between the Money Market and the Capital Market.\n\nAnswer:\nFeature | Money Market | Capital Market\nLoan Term | Short-term (under 1 year) | Long-term (over 1 year)\nInstruments | Treasury bills, call money | Stocks, shares, debentures\nRegulator | Central Bank (CBN) | Securities & Exchange Commission"
        }
      },
      {
        id: "development_indicators",
        title: "Economic Development Indicators",
        seniorDesc: "Compare economic growth versus development, and explain HDI, per capita income, and Gini coefficient.",
        seniorGreeting: "Good day, Teacher! What is the difference between economic growth and economic development? What is the Human Development Index (HDI), and how does the Gini coefficient measure inequality?",
        seniorMarkingGuide: "SSS Economics Indicators: Define economic growth (increase in GDP) and development (welfare increase) [2 Marks]. Explain HDI indicators (life expectancy, education, income) [1.5 Marks]. Explain Gini coefficient (inequality measure) [1.5 Marks].",
        studyNotes: {
          concept: "Economic growth is a quantitative measure of output increase. Economic development is a qualitative measure of structural change and citizen welfare improvement.",
          formulas: [
            "\\text{Per Capita Income} = \\frac{\\text{Gross National Product (GNP)}}{\\text{Total Population}}",
            "\\text{Gini Coefficient: } 0 \\text{ (perfect equality) to } 1 \\text{ (perfect inequality)}"
          ],
          steps: [
            "Human Development Index (HDI) evaluates: Life expectancy (health), Mean years of schooling (education), and GNI per capita (living standards).",
            "Gini Coefficient: Lower values indicate a more equal distribution of wealth."
          ],
          workedExample: "Question: Explain the difference between economic growth and economic development, and calculate per capita income if GNP is ₦5,000,000 and population is 10,000.\n\nAnswer:\n1. Growth vs Development: Economic growth is simply the increase in a country's real GDP over time. Economic development goes further, measuring improvements in literacy, health, infrastructure, and overall quality of life.\n2. Calculation: Per Capita Income = 5,000,000 / 10,000 = ₦500.\nAnswer: Per Capita Income = ₦500"
        }
      }
    ]
  },
  programming: {
    id: "programming",
    name: "Python & AI Programming (SSS)",
    topics: [
      {
        id: "functions_parameters",
        title: "Functions & Parameters",
        seniorDesc: "Declare reusable functions with parameters, arguments, default values, and return statements.",
        seniorGreeting: "Hi Teacher! 🐍 I am learning Python coding. I want to repeat code using for loops instead of copy-pasting, and declare reusable functions. How do I write 'for i in range(10):', and how do parameters differ from arguments?",
        seniorMarkingGuide: "SS2 Python Loops: Write valid 'for i in range(...):' syntax with indentation [2 Marks]. Declare function using 'def' and 'return' [2 Marks]. Explain parameters vs arguments [1 Mark].",
        studyNotes: {
          concept: "Functions are blocks of organized, reusable code. Parameters are variables defined in the function signature. Arguments are values passed during execution.",
          formulas: [
            "\\text{def name}(p_1, p_2): \\implies \\text{return result}"
          ],
          steps: [
            "Use the 'def' keyword to start the function block.",
            "Declare parameters inside the parentheses.",
            "Use the 'return' keyword to send a result back to the caller."
          ],
          workedExample: "Problem: Write a Python function that takes a base and exponent, calculates the power, and returns the value.\n\nCode:\ndef calculate_power(base, exponent=2):\n    result = base ** exponent\n    return result\n\nprint(calculate_power(5, 3)) # prints 125\nprint(calculate_power(4))    # prints 16 (uses default 2)\n\nAnswer: return result"
        }
      },
      {
        id: "oop_concepts",
        title: "Object-Oriented Programming (OOP)",
        seniorDesc: "Understand Classes, Objects, constructor init, and inheritance in Python.",
        seniorGreeting: "Good day, Teacher! 🐍 In Python, what is Object-Oriented Programming (OOP)? What are classes, objects, and the constructor '__init__' method?",
        seniorMarkingGuide: "SSS Python OOP: Define Class (blueprint) vs Object (instance) [2 Marks]. Write constructor class syntax using '__init__' and 'self' [2 Marks]. Explain inheritance [1 Mark].",
        studyNotes: {
          concept: "OOP is a programming paradigm based on the concept of 'objects', which contain data (attributes) and code (methods). A class is a blueprint; an object is an instance.",
          formulas: [
            "\\text{class Name: def __init__(self, args):}"
          ],
          steps: [
            "Declare a class: class Student:",
            "Define the constructor method __init__ with 'self' as the first parameter to initialize object variables.",
            "Create an instance: s = Student('Chidi')."
          ],
          workedExample: "Problem: Create a Class named Car with an attribute model, and a method start that prints 'Car started'.\n\nCode:\nclass Car:\n    def __init__(self, model):\n        self.model = model\n        \n    def start(self):\n        print(self.model + \" started!\")\n\nmy_car = Car(\"Toyota\")\nmy_car.start() # Prints: Toyota started!\n\nAnswer: class Car"
        }
      },
      {
        id: "advanced_data_structures",
        title: "Advanced Data Structures",
        seniorDesc: "Understand differences between lists, tuples, dictionaries, and sets in Python.",
        seniorGreeting: "Hello Teacher! I know how lists work. But what is the difference between a List, a Tuple, a Dictionary, and a Set? When should I use a dictionary?",
        seniorMarkingGuide: "SSS Python Data: Differentiate list (mutable) vs tuple (immutable) [2 Marks]. Define dictionary key-value store [2 Marks]. Give example [1 Mark].",
        studyNotes: {
          concept: "Python has four built-in collection data structures. Choosing the correct structure is essential for speed and integrity.",
          formulas: [
            "\\text{Dictionary: } d = \\{k_1: v_1, k_2: v_2\\}"
          ],
          steps: [
            "List []: Ordered, mutable (changeable), allows duplicate items.",
            "Tuple (): Ordered, immutable (cannot be changed), allows duplicates.",
            "Dictionary {}: Unordered, mutable, key-value pairs, keys must be unique.",
            "Set {}: Unordered, mutable, unique elements only."
          ],
          workedExample: "Problem: Declare a dictionary representing a student with keys 'name' and 'level', and print the level value.\n\nCode:\nstudent = {\n    \"name\": \"Chidi\",\n    \"level\": \"SSS2\"\n}\nprint(student[\"level\"]) # Prints: SSS2\n\nAnswer: student['level']"
        }
      },
      {
        id: "file_io",
        title: "File I/O & Error Handling",
        seniorDesc: "Read/write files in Python using 'with open()' and catch errors using try/except.",
        seniorGreeting: "Good day, Teacher! 📁 How do I read from a text file and write data to it in Python? How does 'try' and 'except' prevent my app from crashing during errors?",
        seniorMarkingGuide: "SSS Python File: Write valid open() code with read/write mode [2 Marks]. Write valid try-except block [2 Marks].",
        studyNotes: {
          concept: "File I/O allows programs to persist data on disk. Error handling (exceptions) catches runtime errors (e.g. File Not Found) gracefully.",
          formulas: [
            "\\text{with open(file, 'w') as f: f.write()}"
          ],
          steps: [
            "Use 'with open(filename, mode) as file:' (automatically closes the file).",
            "Modes: 'r' (read), 'w' (write/overwrite), 'a' (append).",
            "Wrap risky code in a 'try:' block, and handle errors in 'except Exception as e:'."
          ],
          workedExample: "Problem: Write code to safely write 'Hello' to a file, handling potential file errors.\n\nCode:\ntry:\n    with open(\"greeting.txt\", \"w\") as file:\n        file.write(\"Hello World\")\nexcept IOError as e:\n    print(\"Error writing to file:\", e)\n\nAnswer: try-except open"
        }
      },
      {
        id: "networks",
        title: "Neural Network Architecture",
        seniorDesc: "Understand feedforward layers, weights/biases, activation functions, and backpropagation optimization.",
        seniorGreeting: "Hello Teacher! 🤖 I am reading about Introductory Artificial Intelligence. I saw terms like 'Neural Network', 'Weights and Biases', and 'Backpropagation'. What are the layers of a neural network, and how do weights adjust using error values?",
        seniorMarkingGuide: "SS2 AI Neural Networks: Explain layer structure (input, hidden, output) [2 Marks]. Define weights and biases role [2 Marks]. Explain backpropagation error adjustments [1 Mark].",
        studyNotes: {
          concept: "Artificial Neural Networks (ANNs) are computing systems inspired by biological brain networks. Data flows forward, and errors propagate backward to optimize weights.",
          formulas: [
            "y = f(\\sum_{i} w_i x_i + b) \\quad \\text{(Neuron activation)}",
            "\\text{Sigmoid: } \\sigma(z) = \\frac{1}{1 + e^{-z}}"
          ],
          steps: [
            "Input Layer: Receives raw feature numbers.",
            "Hidden Layers: Mix features using weights (w) and biases (b), applying non-linear activation functions (ReLU, Sigmoid).",
            "Output Layer: Produces final prediction probability."
          ],
          workedExample: "Question: Explain the mathematical role of weights and biases in a single neuron.\n\nAnswer:\n1. Weights (w) represent the strength/importance of each input signal. The inputs (x) are multiplied by their weights: w * x.\n2. The Bias (b) is an offset value added to the sum (w*x + b). It shifts the activation function left or right, allowing the neuron to fire (activate) even if inputs are zero."
        }
      },
      {
        id: "weights_biases",
        title: "Weights, Biases & Activations",
        seniorDesc: "Calculate neuron outputs mathematically and explain ReLU, Sigmoid, and Softmax.",
        seniorGreeting: "Good day, Teacher! 🤖 In a neural network node, why do we need activation functions like ReLU or Sigmoid? What happens to the math if we remove them?",
        seniorMarkingGuide: "SSS AI Math: Calculate linear sum (w*x + b) [1.5 Marks]. State Sigmoid formula [1.5 Marks]. Explain activation role (adds non-linearity to learn complex patterns) [2 Marks].",
        studyNotes: {
          concept: "Activation functions introduce non-linearity into network nodes. Without them, a neural network is just a linear regression model, unable to learn complex patterns like curves or image features.",
          formulas: [
            "\\text{ReLU}(z) = \\max(0, z)",
            "\\text{Sigmoid}(z) = \\frac{1}{1 + e^{-z}}",
            "z = w_1 x_1 + w_2 x_2 + b"
          ],
          steps: [
            "Calculate weighted sum of inputs plus bias: z = Σ(w*x) + b.",
            "Apply activation function to z to get the final output y."
          ],
          workedExample: "Problem: A neuron has inputs x1=1, x2=2, with weights w1=0.5, w2=-0.5, and bias b=0.2. Find the output using ReLU activation.\n\nSolution:\n1. Calculate weighted sum: z = (x1 * w1) + (x2 * w2) + b\n2. z = (1 * 0.5) + (2 * -0.5) + 0.2 = 0.5 - 1.0 + 0.2 = -0.3.\n3. Apply ReLU: f(z) = max(0, z) = max(0, -0.3) = 0.\nAnswer: Neuron output = 0"
        }
      },
      {
        id: "backpropagation",
        title: "Backpropagation Optimization",
        seniorDesc: "Understand gradient descent, loss functions, chain rule derivatives, and weight updates.",
        seniorGreeting: "Hello Teacher! 🤖 How does a neural network train? What is backpropagation, and how does the mathematical chain rule derivative adjust weights to reduce loss?",
        seniorMarkingGuide: "SSS AI Backpropagation: Define loss function [1 Mark]. Explain gradient descent optimization [2 Marks]. State weight update equation using learning rate [2 Marks].",
        studyNotes: {
          concept: "Backpropagation is the core algorithm used to train neural networks. It calculates the gradient of the loss function with respect to the weights using the mathematical chain rule of calculus, adjusting weights to minimize error.",
          formulas: [
            "E = \\frac{1}{2}(y_{target} - y_{pred})^2 \\quad \\text{(Mean Squared Error Loss)}",
            "w_{new} = w_{old} - \\eta \\frac{\\partial E}{\\partial w_{old}} \\quad \\text{(\\eta = Learning Rate)}"
          ],
          steps: [
            "Forward Pass: Compute prediction and calculate loss (error).",
            "Backward Pass: Differentiate loss with respect to weights using the chain rule.",
            "Update: Subtract the gradient multiplied by the learning rate (η) from the old weights."
          ],
          workedExample: "Question: Outline the weight update equation in backpropagation and explain the role of the learning rate.\n\nAnswer:\n1. Weight Update Equation: w_new = w_old - (learning_rate * dLoss/dWeight).\n2. Learning Rate (η): A scaling factor (usually a small number like 0.01) that determines the size of the step the optimization algorithm takes towards the minimum loss. If too large, training will diverge; if too small, training will take too long."
        }
      },
      {
        id: "nlp_concepts",
        title: "Natural Language Processing (NLP)",
        seniorDesc: "Understand tokenization, word embeddings, vector space, and attention transformers.",
        seniorGreeting: "Good day, Teacher! 💬 How does a computer process human languages? What is tokenization, and how do word embeddings represent meanings using numerical vectors in multidimensional space?",
        seniorMarkingGuide: "SSS AI NLP: Define tokenization (splitting text to words/subwords) [2 Marks]. Define word embedding as mapping words to vectors [2 Marks]. Explain semantic vector distance [1 Mark].",
        studyNotes: {
          concept: "NLP combines linguistics and computer science to process human languages. Modern NLP maps words to numerical vectors (embeddings) in a high-dimensional vector space.",
          formulas: [
            "\\text{Cosine Similarity} = \\frac{\\mathbf{A} \\cdot \\mathbf{B}}{\\|\\mathbf{A}\\| \\|\\mathbf{B}\\|}"
          ],
          steps: [
            "Tokenization: Splitting input strings into sub-word tokens.",
            "Embedding: Mapping token IDs to vectors of numbers (e.g. size 768).",
            "Semantic closeness: Similar words (e.g. 'king' and 'queen') lie close to each other in the vector space."
          ],
          workedExample: "Question: Explain tokenization and the concept of word embeddings in NLP.\n\nAnswer:\n1. Tokenization: The process of splitting text sentences into smaller units called tokens (words, parts of words, or symbols) so the computer can index them.\n2. Word Embedding: A technique where words are represented as vectors of real numbers in a high-dimensional space (e.g., a list of 512 numbers). Words with similar meanings or contexts end up having similar mathematical vectors, allowing the AI to calculate semantic relationships (e.g. King - Man + Woman = Queen)."
        }
      },
      {
        id: "cnn_intro",
        title: "Convolutional Neural Networks (CNN)",
        seniorDesc: "Understand image kernels, convolution layers, max pooling, and image classification.",
        seniorGreeting: "Hello Teacher! 📸 We are studying computer vision. What is a Convolutional Neural Network (CNN)? What is a kernel/filter, and how does pooling reduce image size?",
        seniorMarkingGuide: "SSS AI Vision: Explain convolution (multiplying image pixels by kernel matrix) [2 Marks]. Explain Max Pooling (reducing matrix size by taking maximum) [2 Marks]. State target is feature extraction [1 Mark].",
        studyNotes: {
          concept: "CNNs are deep learning architectures designed for processing grid-structured data like images. They use kernels to extract local features.",
          formulas: [
            "(I * K)(i,j) = \\sum_{m} \\sum_{n} I(i-m, j-n) K(m,n)"
          ],
          steps: [
            "Convolution: Slid a small matrix (kernel) across the image pixel matrix, multiplying values and summing to create a feature map.",
            "Activation: Apply ReLU.",
            "Pooling: Reduce dimensions (e.g. Max Pooling takes the largest number in a 2x2 grid), reducing computational load."
          ],
          workedExample: "Question: Explain the difference between convolution and pooling in image processing.\n\nAnswer:\n1. Convolution: The process of applying a filter (kernel matrix) to the input image grid to detect features like edges, lines, and curves.\n2. Pooling: The process of down-sampling the feature map to reduce its dimensions and calculation requirements, typically by taking the maximum value in a small window (Max Pooling)."
        }
      },
      {
        id: "ai_ethics",
        title: "AI Ethics & Algorithmic Bias",
        seniorDesc: "Understand dataset bias, deepfakes, copyright, and ethical deployment of LLMs.",
        seniorGreeting: "Good day, Teacher! ⚖️ As AI is deployed globally, what is algorithmic bias? How does a model learn prejudices from its training dataset, and how do we build fair AI systems?",
        seniorMarkingGuide: "SSS AI Ethics: Define algorithmic bias [2 Marks]. Explain how biased datasets lead to biased outputs [2 Marks]. Suggest one mitigation strategy [1 Mark].",
        studyNotes: {
          concept: "AI ethics involves the moral principles governing AI deployment. Algorithmic bias occurs when a model produces systematically prejudiced outputs due to skewed training data.",
          formulas: [],
          steps: [
            "Data skew: If training data contains mostly men, facial recognition will fail on women.",
            "Social impact: Biased hiring tools, false criminal profiling.",
            "Mitigation: Diverse training datasets, algorithmic auditing, transparent guidelines."
          ],
          workedExample: "Question: Explain how algorithmic bias is introduced into a machine learning model, and state one way to prevent it.\n\nAnswer:\n1. Introduction: Bias is introduced when the training dataset is not representative of the real-world population (e.g. using a dataset of mostly white faces to train an officer's suspect-detection AI).\n2. Prevention: Auditing the training dataset for diversity before training, and testing the model on diverse demographic groups to measure and correct error rate differences."
        }
      }
    ]
  }
};

// ----------------------------------------------------
// 3. EXPORT COMBINED CURRICULA
// ----------------------------------------------------
export const subjectsData = {
  jss: jssSubjectsData,
  sss: sssSubjectsData
};
