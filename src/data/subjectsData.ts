export interface Topic {
  id: string;
  title: string;
  juniorDesc: string;
  seniorDesc: string;
  juniorGreeting: string;
  seniorGreeting: string;
  juniorMarkingGuide: string;
  seniorMarkingGuide: string;
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

export const subjectsData: Record<string, Subject> = {
  math: {
    id: "math",
    name: "Mathematics",
    topics: [
      {
        id: "quadratic",
        title: "Quadratic Equations",
        juniorDesc: "Learn how equations with squares work and find simple integer roots.",
        seniorDesc: "Solve standard forms using factorization, completing the square, and the quadratic formula.",
        juniorGreeting: "Hi Teacher! 👋 I see equations like $x^2 - 5x + 6 = 0$ in my homework. I know $x$ is a number, but why does it have a little 2 on top? How do we find what $x$ is?",
        seniorGreeting: "Hello Teacher! 📐 I am trying to solve quadratic equations of form $ax^2 + bx + c = 0$. Can you show me how factorization works, and how the general quadratic formula is derived and used?",
        juniorMarkingGuide: "1. Define what a quadratic equation is.\n2. Explain that x^2 means x multiplied by itself.\n3. Show how to find factors that add to -5 and multiply to +6.",
        seniorMarkingGuide: "1. State coefficients a, b, and c in ax^2 + bx + c = 0.\n2. State the quadratic formula: $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$.\n3. Calculate the discriminant $D = b^2 - 4ac$ to explain the nature of roots.",
        studyNotes: {
          concept: "A quadratic equation is a polynomial equation of degree 2. The standard form is $ax^2 + bx + c = 0$, where $a \\neq 0$. The solutions are called the roots of the equation.",
          formulas: [
            "Standard Form: $ax^2 + bx + c = 0$",
            "Quadratic Formula: $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$",
            "Discriminant: $D = b^2 - 4ac$ ($D > 0$: 2 real roots, $D = 0$: 1 real root, $D < 0$: no real roots)"
          ],
          steps: [
            "Identify the values of $a$, $b$, and $c$.",
            "Choose a method: Factorization, Completing the Square, or Quadratic Formula.",
            "If using the formula, calculate the discriminant first to verify if real roots exist.",
            "Substitute $a$, $b$, and $c$ into the quadratic formula and simplify for both the positive (+) and negative (-) cases."
          ],
          workedExample: "Solve $x^2 - 5x + 6 = 0$.\nHere $a=1, b=-5, c=6$.\nUsing factorization, find two numbers that multiply to $6$ and add to $-5$. These are $-2$ and $-3$.\nSo, $(x - 2)(x - 3) = 0$.\nTherefore, $x = 2$ or $x = 3$."
        }
      },
      {
        id: "simultaneous",
        title: "Simultaneous Equations",
        juniorDesc: "Learn how to find values for two variables like x and y using simple scales.",
        seniorDesc: "Solve system of linear equations in two variables using substitution and elimination.",
        juniorGreeting: "Good day, Teacher! ⚖️ I have a puzzle: 'A book and a pen cost $15. Two books and a pen cost $25.' How do I write this in math and find the price of each?",
        seniorGreeting: "Hello Teacher! 📊 We are studying simultaneous linear equations. Could you explain when it's best to use substitution versus elimination, and solve a system with fractions?",
        juniorMarkingGuide: "1. Translate the word puzzle into two equations.\n2. Subtract the first equation from the second to find the book's price.\n3. Substitute the book's price to find the pen's price.",
        seniorMarkingGuide: "1. Set up equations: Eq1: x + y = 15, Eq2: 2x + y = 25.\n2. Perform elimination: Eq2 - Eq1 yields x = 10.\n3. Substitute x back into Eq1 to find y = 5.",
        studyNotes: {
          concept: "Simultaneous equations are a set of two or more equations containing multiple variables that must all be satisfied at the same time.",
          formulas: [
            "General Form: $a_1x + b_1y = c_1$ and $a_2x + b_2y = c_2$"
          ],
          steps: [
            "Elimination: Multiply one or both equations by constants to make the coefficients of one variable equal, then add or subtract equations.",
            "Substitution: Express one variable in terms of the other from one equation, then substitute it into the second equation.",
            "Solve the resulting single-variable equation.",
            "Substitute the solved variable value back into one of the original equations to find the second variable."
          ],
          workedExample: "Solve $x + y = 12$ and $2x - y = 3$.\nUsing Elimination, add the two equations together:\n$(x + 2x) + (y - y) = 12 + 3 \\implies 3x = 15 \\implies x = 5$.\nSubstitute $x=5$ into first equation: $5 + y = 12 \\implies y = 7$.\nRoots are $x=5, y=7$."
        }
      },
      {
        id: "trig",
        title: "Trigonometric Ratios",
        juniorDesc: "Solve right-angled triangles using basic Sine, Cosine, and Tangent angles.",
        seniorDesc: "Apply SOH CAH TOA, Pythagoras theorem, and solve angles of elevation/depression.",
        juniorGreeting: "Hi Teacher! 📐 I am trying to figure out why triangles have special buttons on my calculator like 'sin', 'cos', and 'tan'. What do they do?",
        seniorGreeting: "Good day, Teacher! ⛰️ I'm trying to solve a word problem where a boy looks up at the top of a tree. How do I set up the tangent ratio for angles of elevation?",
        juniorMarkingGuide: "1. Define SOH CAH TOA clearly.\n2. Label the hypotenuse, opposite, and adjacent sides relative to a given angle.\n3. Calculate a simple ratio.",
        seniorMarkingGuide: "1. State Pythagoras: $a^2 + b^2 = c^2$.\n2. Apply the tangent ratio: $\\tan(\\theta) = \\frac{\\text{Opposite}}{\\text{Adjacent}}$.\n3. Calculate angle of elevation using inverse trigonometric functions.",
        studyNotes: {
          concept: "Trigonometry deals with the relationship between side lengths and angles of triangles. For right-angled triangles, the ratios are defined relative to an angle $\\theta$.",
          formulas: [
            "Sine: $\\sin(\\theta) = \\frac{\\text{Opposite}}{\\text{Hypotenuse}}$",
            "Cosine: $\\cos(\\theta) = \\frac{\\text{Adjacent}}{\\text{Hypotenuse}}$",
            "Tangent: $\\tan(\\theta) = \\frac{\\text{Opposite}}{\\text{Adjacent}}$",
            "Pythagoras Theorem: $\\text{Opp}^2 + \\text{Adj}^2 = \\text{Hyp}^2$"
          ],
          steps: [
            "Identify the right angle and label the three sides relative to the reference angle $\\theta$.",
            "Determine which ratio (Sin, Cos, or Tan) connects the known sides/angles with the unknown.",
            "Set up the equation and solve for the missing variable."
          ],
          workedExample: "Find the height of a tree if the angle of elevation to the top is $30^\\circ$ from a distance of $10\\text{m}$.\nLet height be $h$ (Opposite) and distance be $10\\text{m}$ (Adjacent).\nUse Tangent: $\\tan(30^\\circ) = \\frac{h}{10}$.\nSince $\\tan(30^\\circ) \\approx 0.577$, then $h = 10 \\times 0.577 = 5.77\\text{m}$."
        }
      },
      {
        id: "indices",
        title: "Indices and Logarithms",
        juniorDesc: "Understand indices as repeated multiplication and simple power rules.",
        seniorDesc: "Solve equations using the laws of indices and indices conversion to logarithms.",
        juniorGreeting: "Hello Teacher! ⚡ I know $2 \\times 3 = 6$, but why is $2^3 = 8$? What are the rules when multiplying numbers with powers like $2^3 \\times 2^2$?",
        seniorGreeting: "Good day, Teacher! 📈 I am stuck on an index equation: $3^{2x-1} = 27$. How do I change base to solve this, and how does it relate to logarithms?",
        juniorMarkingGuide: "1. Explain base and exponent/power.\n2. State the multiplication law: $a^x \\times a^y = a^{x+y}$.\n3. Calculate simple exponents manually.",
        seniorMarkingGuide: "1. Convert 27 to base 3: $27 = 3^3$.\n2. Equate the exponents: $2x - 1 = 3$.\n3. State the logarithm conversion rule: $y = b^x \\iff \\log_b(y) = x$.",
        studyNotes: {
          concept: "Indices represent repeated multiplication of a base number. Logarithms are the inverse operations of indices, representing the power to which a base must be raised to get a number.",
          formulas: [
            "Multiplication Law: $a^m \\times a^n = a^{m+n}$",
            "Division Law: $a^m \\div a^n = a^{m-n}$",
            "Power Law: $(a^m)^n = a^{mn}$",
            "Zero Power: $a^0 = 1$",
            "Logarithm Conversion: $y = b^x \\iff \\log_b(y) = x$"
          ],
          steps: [
            "Simplify index terms by converting all bases to prime factors where possible.",
            "Apply the appropriate multiplication, division, or power laws.",
            "To solve index equations, make bases on both sides identical and equate the exponents.",
            "Convert index equations to logarithms to isolate powers if bases cannot be equated."
          ],
          workedExample: "Solve $2^{x+1} = 16$.\nConvert 16 to base 2: $16 = 2^4$.\nNow write: $2^{x+1} = 2^4$.\nEquate exponents: $x + 1 = 4 \\implies x = 3$."
        }
      },
      {
        id: "coordinate",
        title: "Coordinate Geometry",
        juniorDesc: "Plot points on Cartesian plane (x, y) and find distances visually.",
        seniorDesc: "Calculate distance, midpoint, slope/gradient, and equations of straight lines.",
        juniorGreeting: "Hi Teacher! 📍 I'm looking at a grid with $X$ and $Y$ lines. What does a point like $(3, -2)$ mean, and how do we draw a straight line through it?",
        seniorGreeting: "Hello Teacher! 📏 I have two points $A(2, 3)$ and $B(6, 11)$. Can you teach me the formula to find the distance between them, their midpoint, and the equation of the line passing through them?",
        juniorMarkingGuide: "1. Locate x-coordinate (horizontal) and y-coordinate (vertical) on the Cartesian plane.\n2. Draw lines to mark the intersection point.\n3. Plot a second point and draw a connecting straight line.",
        seniorMarkingGuide: "1. Apply distance formula: $d = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}$.\n2. Calculate gradient/slope: $m = \\frac{y_2-y_1}{x_2-x_1}$.\n3. Write equation of straight line using $y - y_1 = m(x - x_1)$.",
        studyNotes: {
          concept: "Coordinate Geometry is the study of geometry using a coordinate system. Points are mapped on a 2D plane using $(x,y)$ coordinate pairs.",
          formulas: [
            "Distance: $d = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}$",
            "Midpoint: $M = \\left(\\frac{x_1+x_2}{2}, \\frac{y_1+y_2}{2}\\right)$",
            "Slope/Gradient: $m = \\frac{y_2-y_1}{x_2-x_1}$",
            "Line Equation: $y - y_1 = m(x - x_1)$ or $y = mx + c$"
          ],
          steps: [
            "Label coordinates $(x_1, y_1)$ and $(x_2, y_2)$ for the given points.",
            "Substitute into the distance or midpoint formulas as required.",
            "Find the slope first if looking for a line equation, then plug a point into the equation."
          ],
          workedExample: "Find the slope and equation of the line through $(1, 2)$ and $(3, 6)$.\nGradient $m = \\frac{6 - 2}{3 - 1} = \\frac{4}{2} = 2$.\nUse line equation: $y - y_1 = m(x - x_1) \\implies y - 2 = 2(x - 1)$.\n$y - 2 = 2x - 2 \\implies y = 2x$."
        }
      },
      {
        id: "probability",
        title: "Probability",
        juniorDesc: "Simple chance of rolling dice or flipping coins (heads/tails).",
        seniorDesc: "Solve conditional probability, independent events, and tree diagrams.",
        juniorGreeting: "Good day, Teacher! 🎲 If I roll a standard six-sided die, what is the chance that I get an even number? Why is probability always a fraction?",
        seniorGreeting: "Hello Teacher! 🃏 We are studying probability. What is the difference between mutually exclusive and independent events? Can you show me how to draw a tree diagram for picking marbles without replacement?",
        juniorMarkingGuide: "1. State definition: Probability = (number of favorable outcomes) / (total outcomes).\n2. Count total sides of a die (6) and even numbers (2, 4, 6 = 3 sides).\n3. Simplify the fraction 3/6 to 1/2.",
        seniorMarkingGuide: "1. Define independent events: $P(A \\cap B) = P(A) \\times P(B)$.\n2. Define mutually exclusive events: $P(A \\cup B) = P(A) + P(B)$.\n3. Calculate probability of consecutive selections adjusting totals for 'no replacement'.",
        studyNotes: {
          concept: "Probability measures the likelihood of an event occurring. It ranges from 0 (impossible) to 1 (certain). Events can be independent (outcome of one doesn't affect another) or dependent.",
          formulas: [
            "Basic Probability: $P(E) = \\frac{n(E)}{n(S)}$",
            "Complementary Event: $P(E') = 1 - P(E)$",
            "Independent Events: $P(A \\cap B) = P(A) \\times P(B)$",
            "Mutually Exclusive: $P(A \\cup B) = P(A) + P(B)$"
          ],
          steps: [
            "Define the sample space $S$ and count total outcomes $n(S)$.",
            "Define the event $E$ and count successful outcomes $n(E)$.",
            "Divide $n(E)$ by $n(S)$ and simplify.",
            "For multiple events, check if replacement occurs to determine if probabilities change for subsequent events."
          ],
          workedExample: "A bag has 3 red and 2 blue marbles. A marble is picked, not replaced, and a second is picked. Find P(Red then Blue).\nFirst pick: $P(R1) = \\frac{3}{5}$.\nSecond pick (no replacement, 4 marbles left, 2 blue): $P(B2) = \\frac{2}{4} = \\frac{1}{2}$.\nMultiply: $P(R1 \\text{ and } B2) = \\frac{3}{5} \\times \\frac{1}{2} = \\frac{3}{10}$."
        }
      },
      {
        id: "mensuration",
        title: "Mensuration",
        juniorDesc: "Learn simple areas (rectangles, circles) and volumes of cuboids.",
        seniorDesc: "Calculate total surface area and volume of cylinders, cones, and spheres.",
        juniorGreeting: "Hi Teacher! 📦 I have a cylindrical tin of milk. How do I calculate the total amount of metal used to make the tin, and how much milk can it hold?",
        seniorGreeting: "Good day, Teacher! 🍦 I'm studying the mensuration of 3D shapes. How do I derive the curved surface area of a cone, and calculate the volume of a sphere?",
        juniorMarkingGuide: "1. State cylinder surface area formula components (top, bottom, curved side).\n2. Calculate flat circular ends: $2 \\times \\pi r^2$.\n3. Calculate curved side: $2\\pi rh$.",
        seniorMarkingGuide: "1. State Total Surface Area of cylinder: $2\\pi r(r + h)$.\n2. State Cone Volume: $V = \\frac{1}{3}\\pi r^2 h$.\n3. State Sphere Volume: $V = \\frac{4}{3}\\pi r^3$ and calculate using radius.",
        studyNotes: {
          concept: "Mensuration is the branch of mathematics dealing with the measurement of geometric figures, including perimeter, area, and volume.",
          formulas: [
            "Cylinder Volume: $V = \\pi r^2 h$",
            "Cylinder Surface Area: $A = 2\\pi r^2 + 2\\pi rh$",
            "Cone Volume: $V = \\frac{1}{3}\\pi r^2 h$",
            "Sphere Volume: $V = \\frac{4}{3}\\pi r^3$"
          ],
          steps: [
            "Identify the parameters (radius $r$, height $h$, slant height $l$).",
            "Choose the correct formula for volume or surface area.",
            "Substitute constants (like $\\pi \\approx \\frac{22}{7}$ or $3.142$) and simplify."
          ],
          workedExample: "Find the volume of a cylinder with radius $7\\text{cm}$ and height $10\\text{cm}$.\nUse $V = \\pi r^2 h$.\n$V = \\frac{22}{7} \\times 7 \\times 7 \\times 10$.\n$V = 22 \\times 7 \\times 10 = 1540\\text{cm}^3$."
        }
      },
      {
        id: "sequence",
        title: "Sequence and Series",
        juniorDesc: "Find missing numbers in simple arithmetic patterns (e.g. 2, 4, 6...).",
        seniorDesc: "Solve AP and GP nth terms, sums, and infinite geometric series.",
        juniorGreeting: "Hello Teacher! 🔢 If a pattern starts like $3, 7, 11, 15...$, how do I find the 50th number without writing them all down?",
        seniorGreeting: "Good day, Teacher! 📈 I am studying Geometric Progressions. How do I calculate the sum to infinity of a GP where the numbers get smaller and smaller, like $8, 4, 2, 1...$?",
        juniorMarkingGuide: "1. Identify the first term (a) and common difference (d).\n2. Write the formula: $T_n = a + (n-1)d$.\n3. Substitute a=3, d=4, n=50 to get the 50th term.",
        seniorMarkingGuide: "1. State common ratio for GP: $r = \\frac{T_2}{T_1} = 0.5$.\n2. State sum to infinity formula: $S_\\infty = \\frac{a}{1 - r}$ for $|r| < 1$.\n3. Compute sum to infinity using first term a=8 and r=0.5.",
        studyNotes: {
          concept: "An Arithmetic Progression (AP) is a sequence where the difference between consecutive terms is constant. A Geometric Progression (GP) is a sequence where the ratio of consecutive terms is constant.",
          formulas: [
            "AP nth Term: $T_n = a + (n-1)d$",
            "AP Sum: $S_n = \\frac{n}{2}[2a + (n-1)d]$",
            "GP nth Term: $T_n = ar^{n-1}$",
            "GP Sum: $S_n = \\frac{a(r^n - 1)}{r - 1}$ (for $r > 1$)",
            "GP Sum to Infinity: $S_\\infty = \\frac{a}{1-r}$ (for $|r| < 1$)"
          ],
          steps: [
            "Determine if the sequence is an AP (common difference) or GP (common ratio).",
            "Identify the first term $a$, and the difference $d$ or ratio $r$.",
            "Select the correct nth term or sum formula based on the question.",
            "Substitute and evaluate."
          ],
          workedExample: "Find the 10th term of the GP $3, 6, 12...$.\nHere $a=3, r = \\frac{6}{3} = 2$.\nUse $T_n = ar^{n-1} \\implies T_{10} = 3 \\times 2^{10-1}$.\n$T_{10} = 3 \\times 2^9 = 3 \\times 512 = 1536$."
        }
      },
      {
        id: "matrices",
        title: "Matrices",
        juniorDesc: "Organize numbers in rows and columns and add simple tables.",
        seniorDesc: "Perform matrix multiplication, find determinants, and calculate 2x2 inverses.",
        juniorGreeting: "Hi Teacher! 📊 I saw some numbers written inside square brackets like a grid. What is a matrix, and how do we add two of them together?",
        seniorGreeting: "Good day, Teacher! 🧮 I'm trying to solve simultaneous equations using matrices. How do I calculate the determinant and the inverse of a 2x2 matrix?",
        juniorMarkingGuide: "1. Explain rows (horizontal) and columns (vertical).\n2. Explain that only matrices of the same dimension can be added.\n3. Add corresponding elements.",
        seniorMarkingGuide: "1. Calculate determinant of $\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}$ as $ad - bc$.\n2. Write the adjoint matrix swap elements and negate signs.\n3. State inverse formula: $A^{-1} = \\frac{1}{\\det(A)} \\text{adj}(A)$.",
        studyNotes: {
          concept: "A matrix is a rectangular array of numbers arranged in rows and columns. Matrices can be added, subtracted, and multiplied under specific dimensional rules.",
          formulas: [
            "Determinant: $\\det\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} = ad - bc$",
            "Inverse: $\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}^{-1} = \\frac{1}{ad-bc}\\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix}$"
          ],
          steps: [
            "For addition/multiplication, verify that dimensions are compatible.",
            "To multiply matrices, take the dot product of rows of the first with columns of the second.",
            "To find the inverse of a 2x2 matrix, calculate the determinant, swap diagonal elements, negate non-diagonals, and multiply by $\\frac{1}{\\det}$."
          ],
          workedExample: "Find the determinant of $A = \\begin{pmatrix} 3 & 4 \\\\ 1 & 2 \\end{pmatrix}$.\n$\\det(A) = ad - bc = (3 \\times 2) - (4 \\times 1) = 6 - 4 = 2$."
        }
      },
      {
        id: "calculus",
        title: "Calculus (Differentiation)",
        juniorDesc: "Understand curves and gradients as rise-over-run on graphs.",
        seniorDesc: "Find derivatives of polynomials using power rule and first principles.",
        juniorGreeting: "Hello Teacher! 📈 I know how to find the slope of a straight line, but how do we find the slope of a curved line that changes at every point?",
        seniorGreeting: "Good day, Teacher! 📐 We are starting differentiation. Can you explain the power rule $d/dx(x^n) = nx^{n-1}$ and show me how to differentiate from first principles?",
        juniorMarkingGuide: "1. Define gradient as rise / run.\n2. Explain that for curves, the gradient is found by drawing a tangent line at a point.\n3. Estimate tangent slope.",
        seniorMarkingGuide: "1. Define first principles derivative: $f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}$.\n2. Apply the power rule to differentiate $3x^2 + 5x$.\n3. Solve for $dy/dx = 6x + 5$.",
        studyNotes: {
          concept: "Calculus is the mathematical study of continuous change. Differentiation is the process of finding the rate at which a function changes relative to its input (gradient of tangent).",
          formulas: [
            "Power Rule: $\\frac{d}{dx}(x^n) = nx^{n-1}$",
            "First Principles: $f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}$",
            "Constant Rule: $\\frac{d}{dx}(c) = 0$"
          ],
          steps: [
            "Locate variable terms and identify their powers.",
            "Apply the power rule: multiply the term by its current exponent, then reduce the exponent by 1.",
            "Differentiate sum of terms individually."
          ],
          workedExample: "Differentiate $y = 3x^2 - 4x + 5$.\nUsing power rule:\n$\\frac{dy}{dx} = (3 \\times 2)x^{2-1} - 4x^{1-1} + 0$\n$\\frac{dy}{dx} = 6x - 4$."
        }
      }
    ]
  },
  science: {
    id: "science",
    name: "Science (Biology)",
    topics: [
      {
        id: "photosynthesis",
        title: "Photosynthesis",
        juniorDesc: "Learn how green leaves use water and sunlight to make food.",
        seniorDesc: "Study chloroplast structures, light/dark reactions, and balanced equations.",
        juniorGreeting: "Hi Teacher! 🌿 I read that plants 'eat' sunlight. That sounds strange! How do leaves make food, and what ingredients do they need?",
        seniorGreeting: "Good day, Teacher! 🌱 I'm trying to learn the details of photosynthesis. Can you explain the light-dependent and light-independent (Calvin cycle) reactions, and the balanced equation?",
        juniorMarkingGuide: "1. Identify raw materials: carbon dioxide, water.\n2. State conditions: sunlight, chlorophyll.\n3. Mention glucose (food) and oxygen (by-product) produced.",
        seniorMarkingGuide: "1. Write chemical equation: $6CO_2 + 6H_2O \\rightarrow C_6H_{12}O_6 + 6O_2$.\n2. Explain photolysis of water in the light reaction (occurs in grana/thylakoids).\n3. Explain carbon dioxide fixation in the dark reaction (occurs in stroma).",
        studyNotes: {
          concept: "Photosynthesis is the process by which green plants, algae, and some bacteria convert light energy into chemical energy (glucose) using carbon dioxide and water.",
          formulas: [
            "Chemical Equation: $6CO_2 + 6H_2O \\xrightarrow{\\text{Light/Chlorophyll}} C_6H_{12}O_6 + 6O_2$"
          ],
          steps: [
            "Light Reaction: Occurs in the thylakoid membrane. Sunlight splits water molecules (photolysis) releasing oxygen gas, ATP, and NADPH.",
            "Dark Reaction (Calvin Cycle): Occurs in the stroma. ATP and NADPH drive the fixation of carbon dioxide to synthesize glucose."
          ],
          workedExample: "Why is chlorophyll essential for photosynthesis?\nChlorophyll is a green pigment inside chloroplasts. Its main job is to absorb light energy (primarily blue and red wavelengths) and channel it to split water molecules during the light-dependent phase."
        }
      },
      {
        id: "cell_structure",
        title: "Cell Structure & Function",
        juniorDesc: "Discover cell building blocks under a microscope.",
        seniorDesc: "Examine organelle structures and differences between plant and animal cells.",
        juniorGreeting: "Hello Teacher! 🔬 I heard that all living things are made of tiny boxes called cells. What is inside a cell, and how do they stay alive?",
        seniorGreeting: "Good day, Teacher! 🧫 I'm studying cytology. Can you explain the functions of the mitochondria, nucleus, and ribosomes, and outline key differences between plant and animal cells?",
        juniorMarkingGuide: "1. Define a cell as the basic unit of life.\n2. Name the nucleus, cytoplasm, and cell membrane.\n3. Explain that plant cells have cell walls and animal cells do not.",
        seniorMarkingGuide: "1. List functions: Mitochondria (ATP synthesis), Nucleus (genetic storage), Ribosomes (protein synthesis).\n2. Contrast cell wall (cellulose) in plants vs cell membrane only in animals.\n3. State presence of large central vacuole and chloroplasts in plant cells.",
        studyNotes: {
          concept: "The cell is the structural and functional unit of all living organisms. Cells contain organelles suspended in cytoplasm, managed by a nucleus.",
          formulas: [],
          steps: [
            "Plant Cells contain: Cell wall, chloroplasts, large central vacuole.",
            "Animal Cells contain: Centrioles, small temporary vacuoles, no cell wall.",
            "Organelles: Nucleus (control center), Mitochondria (powerhouse), Ribosomes (factories)."
          ],
          workedExample: "State two differences between a cell wall and a cell membrane.\n1. A cell wall is rigid, made of cellulose, and fully permeable (found in plants).\n2. A cell membrane is flexible, made of lipids/proteins, and selectively (semi) permeable."
        }
      },
      {
        id: "respiration",
        title: "Respiration",
        juniorDesc: "Find out how breathing turns food into energy.",
        seniorDesc: "Compare aerobic and anaerobic respiration and explain ATP production.",
        juniorGreeting: "Hi Teacher! 🫁 I know breathing is taking in oxygen, but why does my body need oxygen? How does it help turn food into energy?",
        seniorGreeting: "Good day, Teacher! ⚡ I am studying cellular respiration. Can you explain glycolysis, the Krebs cycle, and differentiate between aerobic and anaerobic pathways?",
        juniorMarkingGuide: "1. Differentiate breathing (mechanical) from respiration (chemical).\n2. State that glucose is broken down to release energy.\n3. Mention carbon dioxide and water vapor as products we breathe out.",
        seniorMarkingGuide: "1. Write aerobic respiration equation: $C_6H_{12}O_6 + 6O_2 \\rightarrow 6CO_2 + 6H_2O + 38\\text{ ATP}$.\n2. Explain anaerobic pathway (lactic acid in muscles, ethanol/CO2 in yeast).\n3. State site of reactions: Glycolysis (cytoplasm), Krebs (mitochondrial matrix).",
        studyNotes: {
          concept: "Respiration is the biochemical process where cells break down glucose to release energy in the form of Adenosine Triphosphate (ATP).",
          formulas: [
            "Aerobic Respiration: $C_6H_{12}O_6 + 6O_2 \\rightarrow 6CO_2 + 6H_2O + \\text{Energy (ATP)}$",
            "Anaerobic (Yeast): $C_6H_{12}O_6 \\rightarrow 2C_2H_5OH + 2CO_2 + \\text{Energy (2 ATP)}$"
          ],
          steps: [
            "Glycolysis: Glucose is split into two pyruvate molecules in the cytoplasm, yielding 2 ATP.",
            "Krebs Cycle: Pyruvate is oxidized in the mitochondria to release carbon dioxide and high-energy electrons.",
            "Electron Transport Chain: Uses oxygen to generate bulk ATP (approx 34-36) and water."
          ],
          workedExample: "Why do our muscles ache during heavy exercise?\nDuring intense exercise, oxygen supply to muscles is insufficient. The cells switch to anaerobic respiration, producing lactic acid. Lactic acid accumulation causes muscle fatigue and cramps."
        }
      },
      {
        id: "circulatory",
        title: "Circulatory System",
        juniorDesc: "Learn how the heart pumps blood through your body.",
        seniorDesc: "Map double circulation, heart chambers, and blood cell functions.",
        juniorGreeting: "Hello Teacher! ❤️ I can feel my heart beating fast when I run. What is the heart actually doing, and how does blood travel to my toes and back?",
        seniorGreeting: "Good day, Teacher! 🩸 I'm studying the human circulatory system. Could you explain the path of blood through the double circulation loop, and explain the roles of arteries, veins, and capillaries?",
        juniorMarkingGuide: "1. Identify the heart as a muscular pump.\n2. State that arteries carry blood away from the heart, veins return it.\n3. Mention red blood cells carry oxygen.",
        seniorMarkingGuide: "1. Map double loop: Pulmonary (lungs) and Systemic (body) circulation.\n2. Contrast arteries (thick wall, high pressure, no valves) vs veins (thin wall, low pressure, valves).\n3. Explain functions of Red cells (hemoglobin/oxygen), White cells (defense), and Platelets (clotting).",
        studyNotes: {
          concept: "The circulatory system is a network of organs and vessels that transport oxygen, nutrients, hormones, and waste products throughout the body.",
          formulas: [],
          steps: [
            "Deoxygenated blood enters the Right Atrium -> Right Ventricle -> Pulmonary Artery -> Lungs.",
            "Oxygenated blood returns via Pulmonary Vein -> Left Atrium -> Left Ventricle -> Aorta -> Body.",
            "Capillaries: Microscopic vessels where oxygen and nutrient exchange takes place."
          ],
          workedExample: "Why are the walls of the left ventricle thicker than the right ventricle?\nThe left ventricle must pump blood to the entire body (systemic circulation), requiring high pressure. The right ventricle only pumps blood to the nearby lungs (pulmonary circulation), requiring less pressure."
        }
      },
      {
        id: "digestive",
        title: "Digestive System",
        juniorDesc: "Follow a bite of food from mouth to stomach.",
        seniorDesc: "Understand mechanical/chemical digestion and digestive enzymes.",
        juniorGreeting: "Hi Teacher! 🍎 I just ate an apple. What happens to it inside my stomach, and how does my body absorb the nutrients from it?",
        seniorGreeting: "Good day, Teacher! 🧪 We are studying digestion. Can you explain where the digestion of carbohydrates, proteins, and fats starts and ends, and name the enzymes responsible?",
        juniorMarkingGuide: "1. List the path of food: mouth, esophagus, stomach, small intestine, large intestine.\n2. Explain teeth chew food (physical) and stomach juices break it down (chemical).\n3. State that nutrients are absorbed in the small intestine.",
        seniorMarkingGuide: "1. Name enzymes: Amylase (saliva/starch), Pepsin (stomach/protein), Lipase (pancreas/fats).\n2. Explain the role of bile (produced in liver, stored in gallbladder) in emulsifying fats.\n3. State that villi in the ileum increase surface area for absorption.",
        studyNotes: {
          concept: "Digestion is the breakdown of large insoluble food molecules into small water-soluble molecules that can be absorbed into the bloodstream.",
          formulas: [],
          steps: [
            "Ingestion: Food is chewed in the mouth; salivary amylase begins starch breakdown.",
            "Stomach: Gastric juice containing hydrochloric acid and pepsin begins protein breakdown.",
            "Duodenum: Bile emulsifies lipids; pancreatic juice finishes chemical digestion.",
            "Absorption: Soluble food is absorbed through villi in the small intestine."
          ],
          workedExample: "What is the function of hydrochloric acid (HCl) in the stomach?\nHCl provides an acidic pH (approx 1.5 - 2.0) necessary for pepsin to actively digest proteins, and it kills bacteria ingested with food."
        }
      },
      {
        id: "genetics",
        title: "Genetics & Heredity",
        juniorDesc: "Learn why children look like their parents (eye and hair color).",
        seniorDesc: "Study DNA, monohybrid crosses, and Mendel's laws of inheritance.",
        juniorGreeting: "Hello Teacher! 🧬 People say I have my mother's eyes and my father's smile. How do these traits pass from parents to children?",
        seniorGreeting: "Good day, Teacher! 🧮 I'm trying to draw a Genetic Cross (Punnett square) for a cross between a heterozygous tall plant (Tt) and a dwarf plant (tt). Can you show me how to calculate the ratio?",
        juniorMarkingGuide: "1. Define genes as instructions for traits.\n2. Explain that half of our genes come from each parent.\n3. Give examples of inherited traits (eye color, blood group).",
        seniorMarkingGuide: "1. Define dominant, recessive, homozygous, and heterozygous alleles.\n2. Set up the Punnett square: Tt x tt.\n3. State the genotypic ratio (1 Tt : 1 tt) and phenotypic ratio (1 Tall : 1 Dwarf).",
        studyNotes: {
          concept: "Genetics is the study of genes, genetic variation, and heredity in living organisms. Dominant alleles mask the expression of recessive alleles.",
          formulas: [
            "Monohybrid Cross Ratios (Heterozygous x Heterozygous): Phenotype = 3:1, Genotype = 1:2:1"
          ],
          steps: [
            "Identify the genotypes of the parents.",
            "Separate parent alleles to form gametes.",
            "Draw a 2x2 grid (Punnett square) and combine alleles.",
            "Count phenotypes and genotypes to calculate ratios."
          ],
          workedExample: "Cross two heterozygous tall plants (Tt).\nGametes: T and t.\nGrid intersections: TT (Homozygous Tall), Tt (Heterozygous Tall), Tt (Heterozygous Tall), tt (Homozygous Dwarf).\nPhenotypic Ratio: 3 Tall : 1 Dwarf."
        }
      },
      {
        id: "nervous",
        title: "Nervous System",
        juniorDesc: "Understand how your brain receives signals and triggers movements.",
        seniorDesc: "Map the reflex arc, neurons, and synapse neurotransmitter roles.",
        juniorGreeting: "Hi Teacher! 🧠 If I touch something hot, I pull my hand away instantly before I even think about it. How does my body react so quickly?",
        seniorGreeting: "Good day, Teacher! ⚡ We are studying coordination. Can you explain the components of the reflex arc, the structure of a neuron, and how signals cross the synapse?",
        juniorMarkingGuide: "1. Identify the brain and spinal cord as the nervous control center.\n2. Explain nerves carry electrical messages.\n3. Differentiate sensory nerves (feeling) from motor nerves (moving).",
        seniorMarkingGuide: "1. Map reflex arc path: Receptor -> Sensory Neuron -> Relay Neuron (Spinal Cord) -> Motor Neuron -> Effector (Muscle).\n2. Explain that a synapse is a microscopic gap between neurons.\n3. Mention chemical neurotransmitters transmit signals across the synapse.",
        studyNotes: {
          concept: "The nervous system coordinates body activities by transmitting electrical impulses and chemical signals between the brain, spinal cord, and organs.",
          formulas: [],
          steps: [
            "Receptors detect a stimulus (e.g. heat).",
            "Sensory neuron sends an electrical impulse to the Central Nervous System (CNS).",
            "Relay neuron in the spinal cord bypasses the brain for instant reaction.",
            "Motor neuron carries the command to the effector muscle, causing contraction."
          ],
          workedExample: "Describe what happens when an impulse reaches a synapse.\nWhen an electrical impulse reaches the axon terminal, it triggers the release of chemical neurotransmitters into the synaptic cleft. These diffuse across the gap and bind to receptors on the next neuron, triggering a new electrical impulse."
        }
      },
      {
        id: "ecology",
        title: "Ecology & Ecosystems",
        juniorDesc: "Learn how plants and animals live together in food chains.",
        seniorDesc: "Study food webs, energy pyramids, and carbon/nitrogen cycles.",
        juniorGreeting: "Hello Teacher! 🌾 I see food chains like 'Grass -> Zebra -> Lion'. What happens if all the grass disappears, and how does energy flow through the chain?",
        seniorGreeting: "Good day, Teacher! 🔄 We are discussing ecology. Can you explain why energy is lost as it moves up trophic levels, and outline the stages of the nitrogen cycle?",
        juniorMarkingGuide: "1. Define producers (plants) and consumers (animals).\n2. Explain that food chains show who eats whom.\n3. Explain that a lack of grass causes zebras to starve, which leaves lions without food.",
        seniorMarkingGuide: "1. Explain the 10% Rule: only 10% of energy is transferred to the next trophic level.\n2. Detail nitrogen fixation (Rhizobium in root nodules), nitrification (Nitrosomonas/Nitrobacter), and denitrification.\n3. Identify decomposers' role in recycling carbon back to the atmosphere.",
        studyNotes: {
          concept: "Ecology is the study of relationships between living organisms and their physical environment. Energy flows directionally through ecosystems, while nutrients cycle.",
          formulas: [
            "Ecological Efficiency: $\\text{Transfer Efficiency} \\approx 10\\%$"
          ],
          steps: [
            "Producers capture sunlight to fix carbon.",
            "Herbivores eat producers, receiving 10% of the energy.",
            "Carnivores eat herbivores, losing 90% of energy at each step as heat and respiration.",
            "Nitrogen Cycle: Nitrogen gas ($N_2$) is fixed into nitrates ($NO_3^-$) for plant absorption."
          ],
          workedExample: "Why do food chains rarely have more than 5 links?\nBecause energy is lost (90%) as heat and metabolic work at each trophic level. By the 5th level, the remaining energy is too small to support a viable population of higher consumers."
        }
      },
      {
        id: "excretory",
        title: "Excretory System",
        juniorDesc: "Learn how the kidneys clean your blood and remove waste.",
        seniorDesc: "Explain kidney nephron structures and homeostatic osmoregulation.",
        juniorGreeting: "Hi Teacher! 💧 I know we drink water and urinate, but how do my kidneys actually separate waste from blood? What happens if they stop working?",
        seniorGreeting: "Good day, Teacher! 🫁 We are studying homeostasis. Can you explain ultrafiltration and selective reabsorption in the nephron, and the role of ADH in osmoregulation?",
        juniorMarkingGuide: "1. Identify the kidneys, bladder, and skin as excretory organs.\n2. Explain that blood carries wastes to the kidneys to be filtered.\n3. State that waste is removed as urine.",
        seniorMarkingGuide: "1. Explain ultrafiltration in the Bowman's capsule (high pressure filters small molecules).\n2. Explain selective reabsorption of glucose and water in the proximal convoluted tubule.\n3. Detail how Antidiuretic Hormone (ADH) increases water reabsorption in the collecting duct during dehydration.",
        studyNotes: {
          concept: "Excretion is the elimination of metabolic waste products from the body. The kidney filters blood, balances electrolytes, and maintains water volume (osmoregulation).",
          formulas: [],
          steps: [
            "Ultrafiltration: Glomerular blood pressure forces water, glucose, salts, and urea into Bowman's capsule.",
            "Reabsorption: Useful substances (glucose, amino acids, water) are pumped back into capillaries.",
            "Excretion: Concentrated waste (urea, excess salts, water) form urine in the collecting duct."
          ],
          workedExample: "Explain the effect of drinking lots of water on ADH secretion.\nDrinking lots of water lowers blood concentration. The pituitary gland decreases ADH secretion. Less ADH makes the kidney collecting ducts less permeable to water, resulting in large volumes of dilute urine."
        }
      },
      {
        id: "reproduction",
        title: "Reproduction",
        juniorDesc: "Find out how seeds grow into plants and how animals have babies.",
        seniorDesc: "Compare mitosis vs meiosis and study plant/human fertilization.",
        juniorGreeting: "Hello Teacher! 🌸 I see bees visiting flowers all the time. How does this help the flower make seeds and grow new plants?",
        seniorGreeting: "Good day, Teacher! 🔬 We are studying cell division. Can you explain the differences in purposes and outcomes between mitosis and meiosis, and describe double fertilization in flowering plants?",
        juniorMarkingGuide: "1. Define pollination as transfer of pollen from anther to stigma.\n2. Explain that pollen fertilizes the ovule to make seeds.\n3. Mention wind or insects as agents of pollination.",
        seniorMarkingGuide: "1. Mitosis: 1 division, 2 diploid identical cells (growth). Meiosis: 2 divisions, 4 haploid gamete cells (reproduction).\n2. Explain double fertilization: one sperm fuses with egg (zygote), second fuses with polar nuclei (endosperm).\n3. State chromosome number changes during meiosis ($2n \\rightarrow n$).",
        studyNotes: {
          concept: "Reproduction is the biological process by which new individual organisms are produced. Cell division occurs via Mitosis (growth) or Meiosis (gamete production).",
          formulas: [
            "Mitosis Output: $2n \\rightarrow 2n$ (2 identical cells)",
            "Meiosis Output: $2n \\rightarrow n$ (4 unique gametes)"
          ],
          steps: [
            "Mitosis stages: Prophase, Metaphase, Anaphase, Telophase.",
            "Meiosis halves the genetic code so that fertilization restores diploidy ($n + n = 2n$).",
            "In plants, pollen lands on the stigma, grows a tube down to the ovary, and releases sperm."
          ],
          workedExample: "Contrast Mitosis and Meiosis in terms of location and genetic outcome.\n1. Mitosis occurs in somatic (body) cells; results in 2 genetically identical diploid ($2n$) cells.\n2. Meiosis occurs in germ (reproductive) cells; results in 4 genetically unique haploid ($n$) gametes."
        }
      }
    ]
  },
  physics: {
    id: "physics",
    name: "Physics",
    topics: [
      {
        id: "kinematics",
        title: "Equations of Motion",
        juniorDesc: "Measure speed, distance, and travel times for moving cars.",
        seniorDesc: "Solve linear acceleration using the three equations of motion.",
        juniorGreeting: "Hi Teacher! 🚗 I'm trying to calculate how long it takes a car traveling at $60\\text{ km/h}$ to travel $120\\text{ km}$. How do I write this formula?",
        seniorGreeting: "Good day, Teacher! ⚡ I have a physics problem: 'A car accelerates uniformly from rest at $2\\text{ m/s}^2$ for $5\\text{ seconds}$.' Which equation of motion do I use to find its final speed and displacement?",
        juniorMarkingGuide: "1. State the speed formula: Speed = Distance / Time.\n2. Re-arrange formula: Time = Distance / Speed.\n3. Divide 120 by 60 to get 2 hours.",
        seniorMarkingGuide: "1. State three equations of motion: $v = u + at$, $s = ut + 0.5at^2$, $v^2 = u^2 + 2as$.\n2. Identify knowns: initial velocity $u = 0$, acceleration $a = 2$, time $t = 5$.\n3. Calculate final velocity: $v = 0 + (2 \\times 5) = 10\\text{ m/s}$ and $s = 0.5 \\times 2 \\times 25 = 25\\text{ m}$.",
        studyNotes: {
          concept: "Equations of motion describe the behavior of a physical system in terms of its motion as a function of time. They apply only under constant linear acceleration.",
          formulas: [
            "First Equation: $v = u + at$",
            "Second Equation: $s = ut + \\frac{1}{2}at^2$",
            "Third Equation: $v^2 = u^2 + 2as$",
            "Average Velocity: $v_{\\text{avg}} = \\frac{u+v}{2}$"
          ],
          steps: [
            "Write down all known variables ($u$, $v$, $a$, $t$, $s$) from the question.",
            "Identify the unknown variable you need to calculate.",
            "Choose the equation that contains the knowns and the single unknown.",
            "Substitute and solve, paying attention to SI units."
          ],
          workedExample: "A stone is dropped from a cliff ($u=0$) and hits the ground after $3\\text{s}$. Find height of cliff ($g = 10\\text{ m/s}^2$).\nUse $s = ut + \\frac{1}{2}gt^2$.\n$s = (0 \\times 3) + \\frac{1}{2}(10)(3^2)$.\n$s = 5 \\times 9 = 45\\text{m}$."
        }
      },
      {
        id: "newton_laws",
        title: "Newton's Laws of Motion",
        juniorDesc: "Learn why items slide when a car brakes (inertia).",
        seniorDesc: "Understand inertia, force calculations using F=ma, and action-reaction.",
        juniorGreeting: "Hello Teacher! 🍎 If I throw a ball in space, will it keep moving forever? Why does a book on a table stay still unless I push it?",
        seniorGreeting: "Good day, Teacher! 🎯 I'm studying Newton's Second Law. How do I solve friction problems using $F_{\\text{net}} = ma$? Can you explain why weight changes in a moving elevator?",
        juniorMarkingGuide: "1. Define inertia as resistance to change in motion.\n2. State that things stay still or keep moving unless pushed (First Law).\n3. Explain that a heavier object requires a bigger push.",
        seniorMarkingGuide: "1. State Second Law formula: $F = ma$ (Force = mass x acceleration).\n2. Contrast mass (constant quantity of matter) vs weight (force of gravity $W=mg$).\n3. Set up net force equation including friction: $F_{\\text{applied}} - F_{\\text{friction}} = ma$.",
        studyNotes: {
          concept: "Newton's laws of motion describe the relationship between a body and the forces acting upon it, and its motion in response to those forces.",
          formulas: [
            "Newton's Second Law: $F_{\\text{net}} = ma$",
            "Weight: $W = mg$",
            "Frictional Force: $F_f = \\mu R$ (where $\\mu$ is friction coefficient and $R$ is normal reaction)"
          ],
          steps: [
            "Draw a free-body diagram showing all forces acting on the object.",
            "Determine the net force along the direction of acceleration ($F_{\\text{net}} = \\sum F$).",
            "Apply $F_{\\text{net}} = ma$ to solve for acceleration or mass."
          ],
          workedExample: "A force of $20\\text{N}$ pulls a $4\\text{kg}$ block along a rough surface with friction force of $4\\text{N}$. Find acceleration.\nNet Force $F_{\\text{net}} = F_{\\text{applied}} - F_{\\text{friction}} = 20 - 4 = 16\\text{N}$.\nUse $F_{\\text{net}} = ma \\implies 16 = 4 \\times a \\implies a = 4\\text{ m/s}^2$."
        }
      },
      {
        id: "work_energy",
        title: "Work, Energy, and Power",
        juniorDesc: "Define simple work (pushing objects) and electrical energy.",
        seniorDesc: "Calculate Kinetic Energy, Potential Energy, and conservation of mechanical energy.",
        juniorGreeting: "Hi Teacher! ⚡ If I hold a heavy box without moving, am I doing work in physics? What is the difference between energy and power?",
        seniorGreeting: "Good day, Teacher! 🎢 I'm trying to solve a roller-coaster problem using the Conservation of Mechanical Energy. How do I equate Potential Energy $mgh$ at the top to Kinetic Energy $0.5mv^2$ at the bottom?",
        juniorMarkingGuide: "1. Define work as force multiplied by distance moved.\n2. Explain that holding a box stationary does zero work because distance is zero.\n3. Define power as the speed of doing work.",
        seniorMarkingGuide: "1. State formulas: $\\text{Work} = Fd$, $\\text{Kinetic Energy} = \\frac{1}{2}mv^2$, $\\text{Potential Energy} = mgh$.\n2. State Law of Conservation of Energy: $E_{\\text{total}} = KE + PE = \\text{constant}$.\n3. Solve: $mgh_{\\text{top}} = \\frac{1}{2}mv^2_{\\text{bottom}} \\implies v = \\sqrt{2gh}$.",
        studyNotes: {
          concept: "Work is done when a force acting on an object causes it to move. Energy is the capacity to do work, and Power is the rate at which work is done.",
          formulas: [
            "Work Done: $W = Fd\\cos(\\theta)$",
            "Kinetic Energy: $KE = \\frac{1}{2}mv^2$",
            "Potential Energy: $PE = mgh$",
            "Power: $P = \\frac{W}{t} = Fv$"
          ],
          steps: [
            "Check if force and displacement are in the same direction.",
            "Determine the type of energy involved (height = potential, motion = kinetic).",
            "Apply Conservation of Energy: Initial Mechanical Energy = Final Mechanical Energy."
          ],
          workedExample: "A $2\\text{kg}$ object falls from a height of $5\\text{m}$. Find its velocity just before hitting the ground ($g=10\\text{ m/s}^2$).\nInitial $PE = mgh = 2 \\times 10 \\times 5 = 100\\text{J}$.\nAt the bottom, all $PE$ converts to $KE$: $\\frac{1}{2}mv^2 = 100$.\n$\\frac{1}{2}(2)v^2 = 100 \\implies v^2 = 100 \\implies v = 10\\text{ m/s}$."
        }
      },
      {
        id: "waves",
        title: "Wave Motion",
        juniorDesc: "Learn about sound waves, water ripples, and pitch.",
        seniorDesc: "Examine transverse and longitudinal waves, and solve using $v=f\\lambda$.",
        juniorGreeting: "Hello Teacher! 🔊 How does sound travel through the air to my ears? Why does sound travel faster in water than in air?",
        seniorGreeting: "Good day, Teacher! 🌊 I'm studying wave equations. Can you explain the difference between transverse and longitudinal waves, and solve a problem using $v = f\\lambda$?",
        juniorMarkingGuide: "1. Define sound as vibrations traveling through a medium.\n2. Explain sound needs particles to travel, so it cannot travel in a vacuum.\n3. Explain that water particles are packed tighter, allowing faster vibration transfer.",
        seniorMarkingGuide: "1. Contrast transverse (particles vibrate perpendicular to wave) vs longitudinal (particles vibrate parallel to wave).\n2. State wave speed formula: $v = f\\lambda$ (velocity = frequency x wavelength).\n3. Calculate wavelength if velocity is $340\\text{ m/s}$ and frequency is $170\\text{ Hz}$ ($340/170 = 2\\text{m}$).",
        studyNotes: {
          concept: "A wave is a disturbance that transfers energy from one point to another without transferring matter. Waves are transverse or longitudinal.",
          formulas: [
            "Wave Equation: $v = f\\lambda$",
            "Frequency: $f = \\frac{1}{T}$ (where $T$ is period)"
          ],
          steps: [
            "Identify wave parameters: speed $v$, frequency $f$, wavelength $\\lambda$, period $T$.",
            "Convert units to standard SI (e.g., cm to meters, kHz to Hz).",
            "Substitute into $v = f\\lambda$ to solve for the missing term."
          ],
          workedExample: "A radio transmitter broadcasts waves at a frequency of $100\\text{ MHz}$ ($10^8\\text{ Hz}$). If wave speed is $3 \\times 10^8\\text{ m/s}$, find wavelength.\nUse $v = f\\lambda \\implies \\lambda = \\frac{v}{f}$.\n$\\lambda = \\frac{3 \\times 10^8}{10^8} = 3\\text{m}$."
        }
      },
      {
        id: "electrostatics",
        title: "Electrostatics",
        juniorDesc: "See how balloons stick to walls using static electricity charges.",
        seniorDesc: "Understand electric charges, Coulomb's Law, and electric field lines.",
        juniorGreeting: "Hi Teacher! 🎈 Why does a plastic comb attract small bits of paper after I rub it on my dry hair? How do positive and negative charges behave?",
        seniorGreeting: "Good day, Teacher! ⚡ I am studying Coulomb's Law. Can you explain the formula $F = k \\frac{q_1 q_2}{r^2}$ and show me how to draw electric field lines for unlike charges?",
        juniorMarkingGuide: "1. Explain that rubbing transfers tiny charges (electrons) between objects.\n2. State the basic rule: Like charges repel, opposite charges attract.\n3. Explain that static means the charges stay in one place instead of flowing.",
        seniorMarkingGuide: "1. State Coulomb's Law: Force is directly proportional to product of charges and inversely proportional to square of distance.\n2. Identify parameters: $q_1, q_2$ (charges in Coulombs), $r$ (distance in meters), $k$ (electrostatic constant).\n3. Explain that electric field lines flow out of positive charges and into negative charges.",
        studyNotes: {
          concept: "Electrostatics is the study of electromagnetic phenomena that occur when electric charges are at rest.",
          formulas: [
            "Coulomb's Law: $F = k\\frac{q_1 q_2}{r^2}$ (where $k \\approx 9 \\times 10^9\\text{ N m}^2/\\text{C}^2$)",
            "Electric Field Strength: $E = \\frac{F}{q} = k\\frac{Q}{r^2}$"
          ],
          steps: [
            "Convert charge values from microcoulombs ($\\mu\\text{C}$) to Coulombs ($\\times 10^{-6}$).",
            "Substitute charge values and distance into Coulomb's equation.",
            "Calculate force and determine direction (attraction if unlike signs, repulsion if identical)."
          ],
          workedExample: "Calculate force between two $2\\text{ }\mu\\text{C}$ charges separated by $0.1\\text{m}$ in a vacuum.\n$q_1 = 2 \\times 10^{-6}\\text{C}, q_2 = 2 \\times 10^{-6}\\text{C}, r = 0.1\\text{m}, k = 9 \\times 10^9$.\n$F = 9 \\times 10^9 \\times \\frac{(2 \\times 10^{-6})(2 \\times 10^{-6})}{(0.1)^2}$.\n$F = 9 \\times 10^9 \\times \\frac{4 \\times 10^{-12}}{0.01} = \\frac{3.6 \\times 10^{-2}}{10^{-2}} = 3.6\\text{N}$ (repulsion)."
        }
      },
      {
        id: "electricity",
        title: "Current Electricity",
        juniorDesc: "Learn how batteries power simple bulb circuits.",
        seniorDesc: "Apply Ohm's Law and solve series and parallel resistor networks.",
        juniorGreeting: "Hello Teacher! 💡 If I build a circuit, why does adding more bulbs in a single line make them all dimmer? What is the difference between voltage and current?",
        seniorGreeting: "Good day, Teacher! 🔌 We are solving resistor networks. Can you teach me the formulas for total resistance in series and parallel, and how to apply Ohm's Law $V=IR$?",
        juniorMarkingGuide: "1. Define current as flow of electricity (amps) and voltage as pressure (volts).\n2. Explain series circuit (bulbs share same path, dividing voltage).\n3. Explain parallel circuit (bulbs have separate paths, keeping full voltage).",
        seniorMarkingGuide: "1. State Ohm's Law: $V = IR$ (Voltage = Current x Resistance).\n2. Series total: $R_T = R_1 + R_2 + R_3$.\n3. Parallel total: $\\frac{1}{R_T} = \\frac{1}{R_1} + \\frac{1}{R_2} + \\frac{1}{R_3}$.",
        studyNotes: {
          concept: "Current electricity is the flow of electric charge through a conductor. Resistance opposes this flow, while voltage drives it.",
          formulas: [
            "Ohm's Law: $V = IR$",
            "Series Resistors: $R_{\\text{eq}} = R_1 + R_2 + \\dots$",
            "Parallel Resistors: $\\frac{1}{R_{\\text{eq}}} = \\frac{1}{R_1} + \\frac{1}{R_2} + \\dots$",
            "Electric Power: $P = VI = I^2R = \\frac{V^2}{R}$"
          ],
          steps: [
            "Determine if the resistors are arranged in series (end-to-end) or parallel (side-by-side).",
            "Calculate the equivalent total resistance ($R_{\\text{eq}}$).",
            "Use Ohm's Law $V = IR$ with total voltage to find the circuit's total current."
          ],
          workedExample: "Find total current from a $12\\text{V}$ battery connected to two $6\\text{ }\Omega$ resistors in parallel.\nTotal resistance: $\\frac{1}{R_p} = \\frac{1}{6} + \\frac{1}{6} = \\frac{2}{6} = \\frac{1}{3} \\implies R_p = 3\\text{ }\Omega$.\nTotal Current: $I = \\frac{V}{R} = \\frac{12}{3} = 4\\text{A}$."
        }
      },
      {
        id: "electromagnetism",
        title: "Electromagnetism",
        juniorDesc: "Make a temporary magnet using wire wrapped around an iron nail.",
        seniorDesc: "Study magnetic fields around currents and Faraday's law of induction.",
        juniorGreeting: "Hi Teacher! 🧲 How does wrapping insulated wire around a steel nail and connecting it to a battery turn the nail into a magnet? Does it work with copper nails?",
        seniorGreeting: "Good day, Teacher! ⚡ We are studying induction. Can you explain Lenz's Law and Faraday's Law, and explain how a transformer steps voltage up or down?",
        juniorMarkingGuide: "1. Explain that electric current creates a magnetic field around the wire.\n2. Explain that wrapping it around iron concentrates and magnetizes the core.\n3. State that steel/iron are magnetic materials, but copper is not.",
        seniorMarkingGuide: "1. State Faraday's Law: Induced electromotive force is proportional to rate of change of magnetic flux.\n2. State Lenz's Law: Induced current direction opposes the change that created it.\n3. State Transformer formula: $\\frac{V_p}{V_s} = \\frac{N_p}{N_s}$ and define terms.",
        studyNotes: {
          concept: "Electromagnetism describes the interaction between electrical currents and magnetic fields. Electromagnetic induction occurs when a changing magnetic field generates an electric current.",
          formulas: [
            "Transformer Equation: $\\frac{V_p}{V_s} = \\frac{N_p}{N_s} = \\frac{I_s}{I_p}$ (where $p$ is primary, $s$ is secondary)"
          ],
          steps: [
            "Identify the number of turns in coils ($N_p, N_s$) and voltages ($V_p, V_s$).",
            "Apply the transformer equation to find the unknown turns or voltage.",
            "Determine if it is a Step-Up ($V_s > V_p$) or Step-Down ($V_s < V_p$) transformer."
          ],
          workedExample: "A transformer has $100$ primary turns and $500$ secondary turns. If primary voltage is $12\\text{V}$, find secondary voltage.\nUse $\\frac{12}{V_s} = \\frac{100}{500} \\implies \\frac{12}{V_s} = \\frac{1}{5}$.\n$V_s = 12 \\times 5 = 60\\text{V}$ (Step-Up)."
        }
      },
      {
        id: "radioactivity",
        title: "Radioactivity",
        juniorDesc: "Understand atoms, radiation, and safety warnings.",
        seniorDesc: "Contrast alpha, beta, gamma decay, and calculate half-life decay equations.",
        juniorGreeting: "Hello Teacher! ☢️ I saw a yellow danger sign with three black triangles. What is radioactivity, and why is it dangerous to humans?",
        seniorGreeting: "Good day, Teacher! ⚛️ I'm solving nuclear decay equations. Can you explain the changes in atomic and mass numbers during Alpha ($\\alpha$) and Beta ($\\beta$) emission, and show me how to calculate half-life decay?",
        juniorMarkingGuide: "1. Define radioactivity as unstable atoms releasing energy to become stable.\n2. State that radiation can damage living human cells.\n3. Explain safety precautions (lead shields, distance).",
        seniorMarkingGuide: "1. Alpha decay: subtracts 4 from mass number, 2 from atomic number ($^4_2\\text{He}$). \n2. Beta decay: mass number unchanged, adds 1 to atomic number ($^0_{-1}\\text{e}$).\n3. Calculate remaining mass using $N(t) = N_0 \\left(\\frac{1}{2}\\right)^{t / T_{1/2}}$ where $t$ is time and $T_{1/2}$ is half-life.",
        studyNotes: {
          concept: "Radioactivity is the spontaneous disintegration of unstable atomic nuclei, accompanied by the emission of ionizing radiation (alpha particles, beta particles, or gamma rays).",
          formulas: [
            "Alpha Decay: $^{M}_{A}\\text{X} \\rightarrow ^{M-4}_{A-2}\\text{Y} + ^4_2\\text{He}$",
            "Beta Decay: $^{M}_{A}\\text{X} \\rightarrow ^{M}_{A+1}\\text{Y} + ^0_{-1}\\text{e}$",
            "Half-Life: $N = N_0 \\left(\\frac{1}{2}\\right)^n$ (where $n = \\frac{\\text{total time}}{\\text{half-life}}$)"
          ],
          steps: [
            "For decay equations, balance the mass numbers (top) and atomic numbers (bottom) on both sides.",
            "For half-life problems, determine the number of half-life cycles ($n$) that fit into the elapsed time.",
            "Halve the original quantity ($N_0$) consecutively $n$ times."
          ],
          workedExample: "A radioactive sample has a half-life of $5\\text{ days}$. If the original mass is $80\\text{g}$, what mass remains after $15\\text{ days}$?\nNumber of cycles $n = \\frac{15}{5} = 3$ cycles.\nMass remaining $N = 80 \\times \\left(\\frac{1}{2}\\right)^3 = 80 \\times \\frac{1}{8} = 10\\text{g}$."
        }
      },
      {
        id: "fluid_pressure",
        title: "Pressure in Fluids",
        juniorDesc: "Learn why heavy boats float while small stones sink.",
        seniorDesc: "Calculate fluid pressure using P=hdg and explain Archimedes' principle.",
        juniorGreeting: "Hi Teacher! 🚢 If a tiny iron nail sinks in water, how does a massive steel cruise ship manage to float on the ocean without sinking?",
        seniorGreeting: "Good day, Teacher! 🌊 We are studying fluid mechanics. Can you explain Archimedes' principle of buoyancy, and show me how to calculate hydrostatic pressure at the bottom of a dam?",
        juniorMarkingGuide: "1. Define density: mass divided by volume.\n2. Explain that a ship is mostly hollow (filled with air), making its overall density lower than water.\n3. Mention the upward pushing force of water (upthrust).",
        seniorMarkingGuide: "1. State Archimedes' Principle: Upthrust equals the weight of fluid displaced.\n2. State hydrostatic pressure formula: $P = h\\rho g$ (height x density x gravity).\n3. Calculate pressure at $10\\text{m}$ depth in fresh water (density $1000\\text{ kg/m}^3$) as $10 \\times 1000 \\times 10 = 100,000\\text{ Pa}$.",
        studyNotes: {
          concept: "Fluid pressure is the pressure exerted by a fluid at any point within it. Archimedes' principle states that any object floating or submerged experiences an upward buoyant force (upthrust) equal to the weight of the displaced fluid.",
          formulas: [
            "Hydrostatic Pressure: $P = h\\rho g$",
            "Buoyancy (Upthrust): $F_b = V\\rho g$ (where $V$ is submerged volume)"
          ],
          steps: [
            "Identify the depth $h$, fluid density $\\rho$, and acceleration due to gravity $g$.\n2. Multiply the values together to find the pressure in Pascals ($Pa$).\n3. For floating objects, equate upthrust force to weight of the object ($W = F_b$)."
          ],
          workedExample: "Calculate pressure at a depth of $5\\text{m}$ in a swimming pool ($\\rho = 1000\\text{ kg/m}^3, g=10\\text{ m/s}^2$).\n$P = h\\rho g = 5 \\times 1000 \\times 10 = 50,000\\text{ Pa}$ ($50\\text{ kPa}$)."
        }
      },
      {
        id: "gravitation",
        title: "Gravitation",
        juniorDesc: "Understand gravity as the force pulling everything down to Earth.",
        seniorDesc: "Apply Newton's law of universal gravitation and solve force fields.",
        juniorGreeting: "Hello Teacher! 🌍 Why do things always fall to the ground when dropped? Does the moon fall towards Earth too?",
        seniorGreeting: "Good day, Teacher! 🌌 We are studying universal gravitation. Can you explain the formula $F = G \\frac{m_1 m_2}{r^2}$ and differentiate between $g$ and $G$?",
        juniorMarkingGuide: "1. Define gravity as an invisible pulling force exerted by the Earth.\n2. Explain that heavier planets have stronger pulls.\n3. State that gravity keeps the moon in orbit around Earth.",
        seniorMarkingGuide: "1. State Universal Gravitation formula: $F = G\\frac{m_1 m_2}{r^2}$.\n2. Contrast $G$ (Universal Gravitational Constant $\\approx 6.67 \\times 10^{-11}$) vs $g$ (local acceleration due to gravity $\\approx 9.8\\text{ m/s}^2$).\n3. State relationship: $g = \\frac{GM}{R^2}$ where $M$ and $R$ are planet mass and radius.",
        studyNotes: {
          concept: "Gravitation is a natural phenomenon by which all things with mass or energy are attracted to one another.",
          formulas: [
            "Gravitational Force: $F = G\\frac{m_1 m_2}{r^2}$ (where $G \\approx 6.67 \\times 10^{-11}\\text{ N m}^2/\\text{kg}^2$)",
            "Gravitational Field: $g = \\frac{GM}{R^2}$"
          ],
          steps: [
            "Identify masses ($m_1, m_2$) and separation distance ($r$).",
            "Square the distance first ($r^2$).",
            "Substitute constants and simplify, paying attention to scientific notation powers."
          ],
          workedExample: "Find the gravitational pull between two $50\\text{kg}$ spheres separated by $2\\text{m}$ in space.\n$F = G\\frac{50 \\times 50}{2^2} = G\\frac{2500}{4} = 625G$.\n$F = 625 \\times (6.67 \\times 10^{-11}) \\approx 4.17 \\times 10^{-8}\\text{N}$."
        }
      }
    ]
  },
  chemistry: {
    id: "chemistry",
    name: "Chemistry",
    topics: [
      {
        id: "bonding",
        title: "Chemical Bonding",
        juniorDesc: "Learn why atoms join together like magnets.",
        seniorDesc: "Contrast ionic, covalent, and metallic bonds, and explain octet rules.",
        juniorGreeting: "Hi Teacher! 🧪 I saw drawings of atoms sharing hands to make water. Why do atoms want to bind together? What holds them in place?",
        seniorGreeting: "Good day, Teacher! ⚛️ I'm studying chemical bonding. Can you explain the octet rule, and contrast how ionic bonds (electron transfer) differ from covalent bonds (sharing)?",
        juniorMarkingGuide: "1. Explain that atoms bind to become stable.\n2. Describe that sharing or transferring links them together.\n3. Give common examples: table salt (ionic), water (covalent).",
        seniorMarkingGuide: "1. Define the Octet Rule (seeking 8 electrons in the outermost valence shell).\n2. Explain ionic bonding (metal transfers electrons to non-metal, creating electrostatic attraction).\n3. Explain covalent bonding (sharing of electrons between non-metals to achieve octet).",
        studyNotes: {
          concept: "Chemical bonding describes the attraction between atoms, ions or molecules that enables the formation of chemical compounds. Atoms bind to achieve a stable octet (8 valence electrons) configuration.",
          formulas: [],
          steps: [
            "Check valence electrons of the atoms.",
            "Determine if bonding is between Metal + Non-metal (Ionic) or Non-metal + Non-metal (Covalent).",
            "Draw Lewis dot structures representing electron transfers or shared pairs."
          ],
          workedExample: "Explain how Sodium Chloride (NaCl) is formed.\nSodium ($Na$, $2,8,1$) has 1 valence electron and transfers it to Chlorine ($Cl$, $2,8,7$), which has 7 valence electrons. This forms $Na^+$ and $Cl^-$ ions. The electrostatic attraction between these oppositely charged ions forms the ionic bond."
        }
      },
      {
        id: "periodic_table",
        title: "Periodic Table Trends",
        juniorDesc: "Explore the elements table and find metals vs gases.",
        seniorDesc: "Analyze trends in atomic radius, electronegativity, and ionization energy.",
        juniorGreeting: "Hello Teacher! 📊 I see this massive colorful table of elements in chemistry. How is it organized, and why are metals grouped together?",
        seniorGreeting: "Good day, Teacher! 🧪 We are studying periodic trends. Can you explain how and why atomic radius, electronegativity, and ionization energy change across a period and down a group?",
        juniorMarkingGuide: "1. Explain that elements are organized by atomic number (protons).\n2. Differentiate metals (left side) and non-metals/gases (right side).\n3. State that columns (groups) share similar chemical properties.",
        seniorMarkingGuide: "1. Atomic Radius: decreases across a period (nuclear pull increases), increases down a group (shells added).\n2. Ionization Energy: increases across a period (stronger nuclear pull holds electrons), decreases down a group.\n3. Electronegativity: increases across a period, decreases down a group.",
        studyNotes: {
          concept: "The Periodic Table arranges chemical elements by atomic number. Periodic trends are patterns in element properties determined by atomic structure and nuclear attraction.",
          formulas: [],
          steps: [
            "Across a Period (left-to-right): Protons increase, nuclear charge pulls shells closer. Radius decreases; electronegativity and ionization energy increase.",
            "Down a Group (top-to-bottom): Principal energy levels (shells) are added. Radius increases; electronegativity and ionization energy decrease."
          ],
          workedExample: "Why does Fluorine have a higher electronegativity than Lithium?\nFluorine is on the far right of Period 2. It has more protons (stronger nuclear charge) and a smaller atomic radius than Lithium, enabling its nucleus to attract bonding electrons much more strongly."
        }
      },
      {
        id: "stoichiometry",
        title: "Stoichiometry & Mole Concept",
        juniorDesc: "Balance basic chemical equations (e.g. hydrogen + oxygen).",
        seniorDesc: "Calculate moles, molar mass, and limiting reactants in balanced equations.",
        juniorGreeting: "Hi Teacher! 🧪 I see chemistry equations like $H_2 + O_2 \\rightarrow H_2O$. Why do we need to balance them by putting numbers in front?",
        seniorGreeting: "Good day, Teacher! 🧮 I'm stuck on mole calculations. Can you explain Avogadro's number, how to calculate mass from moles using $n = m/M$, and how to balance stoichiometry?",
        juniorMarkingGuide: "1. Explain the Law of Conservation of Mass: atoms cannot be created or destroyed.\n2. Show that there are 2 oxygen atoms on the left, so we must have 2 on the right.\n3. Balance: $2H_2 + O_2 \\rightarrow 2H_2O$.",
        seniorMarkingGuide: "1. State the mole formula: $n = \\frac{\\text{mass}}{\\text{molar mass}}$.\n2. Use stoichiometry ratios from a balanced equation to convert moles of reactant to product.\n3. Define Avogadro's constant: $6.02 \\times 10^{23}\\text{ particles/mole}$.",
        studyNotes: {
          concept: "Stoichiometry measures quantitative relationships between reactants and products in a balanced chemical equation. The mole is the SI unit for amount of substance.",
          formulas: [
            "Moles: $n = \\frac{m}{M}$ (where $m$ is mass, $M$ is molar mass)",
            "Gas Volume at STP: $V = n \\times 22.4\\text{ dm}^3$",
            "Avogadro's Number: $N_A = 6.02 \\times 10^{23}\\text{ particles/mol}$"
          ],
          steps: [
            "Write and balance the chemical equation.",
            "Convert given mass or volume to moles.",
            "Use the mole ratio from the balanced equation coefficients to find the moles of the unknown substance.",
            "Convert the resulting moles back to mass or volume as requested."
          ],
          workedExample: "Calculate mass of carbon dioxide ($CO_2$) produced when $12\\text{g}$ of carbon burns completely. ($C=12, O=16$).\nEquation: $C + O_2 \\rightarrow CO_2$.\nMoles of C: $n = \\frac{12}{12} = 1\\text{ mol}$.\nMole ratio C to $CO_2$ is 1:1, so we get 1 mole of $CO_2$.\nMolar mass of $CO_2 = 12 + (16 \\times 2) = 44\\text{ g/mol}$.\nMass of $CO_2 = n \\times M = 1 \\times 44 = 44\\text{g}$."
        }
      },
      {
        id: "acids_bases",
        title: "Acids, Bases, and Salts",
        juniorDesc: "Learn about sour acids (lemon) and bitter bases (soap) and pH.",
        seniorDesc: "Calculate pH, neutralization reactions, and explain acid-base titrations.",
        juniorGreeting: "Hello Teacher! 🍋 Why do lemons taste sour while soap feels slippery and tastes bitter? What is this pH scale they use to measure them?",
        seniorGreeting: "Good day, Teacher! 🧪 We are studying acid-base equilibria. Can you explain Bronsted-Lowry theory, write a neutralization equation, and show me how to calculate pH using $-\\log[H^+]$?",
        juniorMarkingGuide: "1. Define acids (sour, turn blue litmus red) and bases (bitter, feel slippery, turn red litmus blue).\n2. Explain pH scale: 0-6 is acid, 7 is neutral (water), 8-14 is base.\n3. Mention indicator colors (litmus paper).",
        seniorMarkingGuide: "1. Define pH formula: $\\text{pH} = -\\log_{10}[H^+]$.\n2. Write neutralization: $\\text{Acid} + \\text{Base} \\rightarrow \\text{Salt} + \\text{Water}$ (e.g. $HCl + NaOH \\rightarrow NaCl + H_2O$).\n3. Calculate pH of $0.01\\text{ M } HCl$ solution ($-\\log[10^{-2}] = 2$).",
        studyNotes: {
          concept: "Acids release hydrogen ions ($H^+$) in aqueous solution, while bases release hydroxide ions ($OH^-$). Neutralization is the reaction between an acid and base to produce salt and water.",
          formulas: [
            "pH Equation: $\\text{pH} = -\\log_{10}[H^+]$",
            "pOH Equation: $\\text{pOH} = -\\log_{10}[OH^-]$",
            "Relationship: $\\text{pH} + \\text{pOH} = 14$"
          ],
          steps: [
            "Identify if the compound is a strong acid (dissociates completely) or weak acid.",
            "Determine the concentration of hydrogen ions $[H^+]$ in moles/dm$^3$.",
            "Apply the log formula to calculate pH."
          ],
          workedExample: "Calculate pH of a $0.001\\text{ M}$ solution of hydrochloric acid ($HCl$).\nSince $HCl$ is a strong acid, it dissociates completely: $[H^+] = 0.001\\text{ M} = 10^{-3}\\text{ M}$.\n$\\text{pH} = -\\log_{10}(10^{-3}) = 3$."
        }
      },
      {
        id: "gas_laws",
        title: "Gas Laws",
        juniorDesc: "Learn why balloons expand when heated.",
        seniorDesc: "Apply Boyle's, Charles's, and Ideal Gas laws ($PV=nRT$).",
        juniorGreeting: "Hi Teacher! 🎈 Why does a sealed bag of chips puff up when left in a hot car? How do temperature and pressure affect gases?",
        seniorGreeting: "Good day, Teacher! 💨 I'm studying gas laws. Can you explain the equations for Boyle's and Charles's laws, and show me how to solve problems using the ideal gas equation $PV = nRT$?",
        juniorMarkingGuide: "1. Explain that heating gas makes particles move faster and push outwards.\n2. State that cooling gas makes it shrink/contract.\n3. Give real-world examples (tire pressure drops in cold weather).",
        seniorMarkingGuide: "1. State Boyle's Law ($P_1V_1 = P_2V_2$) and Charles's Law ($\\frac{V_1}{T_1} = \\frac{V_2}{T_2}$ using absolute Kelvin temperature).\n2. State Ideal Gas law: $PV = nRT$ and define R ($0.0821\\text{ L atm / mol K}$ or $8.314\\text{ J/mol K}$).\n3. Convert degrees Celsius to Kelvin by adding 273.15.",
        studyNotes: {
          concept: "Gas laws relate pressure, volume, temperature, and moles of a gas. Ideal gases follow these behaviors perfectly under standard conditions.",
          formulas: [
            "Boyle's Law: $P_1 V_1 = P_2 V_2$ (constant $T$)",
            "Charles's Law: $\\frac{V_1}{T_1} = \\frac{V_2}{T_2}$ (constant $P$, $T$ in Kelvin)",
            "General Gas Law: $\\frac{P_1 V_1}{T_1} = \\frac{P_2 V_2}{T_2}$",
            "Ideal Gas Law: $PV = nRT$"
          ],
          steps: [
            "Convert all temperatures from Celsius to Kelvin ($K = ^\\circ\\text{C} + 273$).",
            "Verify units match the gas constant $R$ if using $PV=nRT$ (volume in liters, pressure in atm).",
            "Rearrange the formula to isolate the target variable."
          ],
          workedExample: "A gas occupies $2\\text{L}$ at $300\\text{K}$. Find its volume if temperature increases to $600\\text{K}$ at constant pressure.\nUse Charles's Law: $\\frac{V_1}{T_1} = \\frac{V_2}{T_2} \\implies \\frac{2}{300} = \\frac{V_2}{600}$.\n$V_2 = \\frac{2 \\times 600}{300} = 4\\text{L}$."
        }
      },
      {
        id: "reaction_rates",
        title: "Rates of Chemical Reactions",
        juniorDesc: "Learn why food rots slower in a refrigerator.",
        seniorDesc: "Explain collision theory, catalyst effects, and activation energy.",
        juniorGreeting: "Hello Teacher! ❄️ Why does putting food in a fridge slow down decay? How does changing temperature affect chemical reactions?",
        seniorGreeting: "Good day, Teacher! 🧪 We are studying kinetics. Can you explain collision theory, how catalysts speed up reactions, and draw an energy profile diagram showing activation energy?",
        juniorMarkingGuide: "1. State that chemical reactions need particles to collide.\n2. Explain that cold temperatures slow down particle motion, reducing collisions.\n3. State that slower collisions mean slower decay.",
        seniorMarkingGuide: "1. Explain Collision Theory: reactions occur only when particles collide with sufficient energy (activation energy) and correct orientation.\n2. Define activation energy ($E_a$).\n3. Explain that a catalyst provides an alternative pathway with lower activation energy.",
        studyNotes: {
          concept: "Chemical kinetics is the study of reaction rates. Rate depends on collision frequency and energy, which are altered by concentration, temperature, surface area, and catalysts.",
          formulas: [],
          steps: [
            "Collision frequency is increased by: higher concentration, higher temperature, larger surface area.",
            "Collision energy is increased by: higher temperature (particles move faster).",
            "Catalysts lower the activation energy barrier without being consumed."
          ],
          workedExample: "How does a catalyst increase reaction rate?\nA catalyst offers an alternative reaction mechanism with a lower activation energy ($E_a$). Consequently, a larger fraction of reactant collisions possess energy greater than $E_a$, leading to more successful collisions per second."
        }
      },
      {
        id: "equilibrium",
        title: "Chemical Equilibrium",
        juniorDesc: "Understand reversible reactions like water evaporating and freezing.",
        seniorDesc: "Apply Le Chatelier's principle and calculate equilibrium constants (Kc).",
        juniorGreeting: "Hi Teacher! 🔄 If a reaction is reversible, does it mean it keeps switching back and forth forever? What does equilibrium mean?",
        seniorGreeting: "Good day, Teacher! ⚖️ We are studying equilibrium. Can you explain Le Chatelier's principle, and predict how increasing pressure affects the reaction: $N_2(g) + 3H_2(g) \\rightleftharpoons 2NH_3(g)$?",
        juniorMarkingGuide: "1. Define reversible reaction: a reaction that can go forward and backward.\n2. Explain equilibrium: when forward and backward speeds are equal.\n3. Explain that amounts of substances stop changing at equilibrium.",
        seniorMarkingGuide: "1. State Le Chatelier's Principle: a system at equilibrium adjusts to counteract any external change imposed on it.\n2. Explain pressure effect: increasing pressure shifts equilibrium to the side with fewer gas moles (shifts right for Ammonia synthesis).\n3. State equilibrium expression: $K_c = \\frac{[NH_3]^2}{[N_2][H_2]^3}$.",
        studyNotes: {
          concept: "Dynamic equilibrium is reached in a closed system when the rates of the forward and reverse reactions are equal. Le Chatelier's principle predicts shifts in equilibrium.",
          formulas: [
            "Equilibrium Constant ($aA + bB \\rightleftharpoons cC + dD$): $K_c = \\frac{[C]^c [D]^d}{[A]^a [B]^b}$"
          ],
          steps: [
            "Write the balanced reversible chemical equation.",
            "Write the $K_c$ expression (products on top, reactants on bottom, raised to power of coefficients).",
            "Apply Le Chatelier's rules: shifts away from added chemicals, shifts to fewer gas moles when pressure increases."
          ],
          workedExample: "For the exothermic reaction: $A(g) + B(g) \\rightleftharpoons C(g) + \\text{Heat}$, how does increasing temperature affect equilibrium?\nIncreasing temperature adds heat to the system. According to Le Chatelier's principle, the system shifts to consume heat (endothermic direction), moving left (producing more A and B)."
        }
      },
      {
        id: "organic",
        title: "Organic Chemistry",
        juniorDesc: "Learn about crude oil, fuels, and carbon atoms.",
        seniorDesc: "Study hydrocarbons, functional groups, and IUPAC nomenclature.",
        juniorGreeting: "Hello Teacher! ⛽ I know petrol, plastic, and cooking gas come from crude oil. Why is carbon so special that it makes all these different things?",
        seniorGreeting: "Good day, Teacher! 🧪 I'm learning organic nomenclature. Can you explain how to name alkanes, alkenes, and alcohols using IUPAC rules, and explain structural isomerism?",
        juniorMarkingGuide: "1. Explain carbon is unique because it can bond with up to 4 other atoms.\n2. Explain that carbon forms long chains and rings.\n3. Mention hydrocarbons are compounds made only of hydrogen and carbon.",
        seniorMarkingGuide: "1. State IUPAC rules: find longest carbon chain, number it from side closest to branch/double bond.\n2. Contrast Alkanes (single bonds $C_nH_{2n+2}$) vs Alkenes (double bonds $C_nH_{2n}$) vs Alcohols (-OH group).\n3. Define structural isomers as compounds with same molecular formula but different structural arrangements (e.g. butane and isobutane).",
        studyNotes: {
          concept: "Organic chemistry is the study of carbon compounds. Carbon catenates (forms chains) due to its tetravalency.",
          formulas: [
            "Alkanes General Formula: $C_n H_{2n+2}$",
            "Alkenes General Formula: $C_n H_{2n}$",
            "Alkyne General Formula: $C_n H_{2n-2}$",
            "Alcohols General Formula: $C_n H_{2n+1}OH$"
          ],
          steps: [
            "Identify the longest continuous carbon chain to determine the prefix (meth-, eth-, prop-, but-, pent-...).",
            "Identify functional groups or double/triple bonds to determine the suffix (-ane, -ene, -ol).",
            "Number the chain to give the functional groups the lowest possible position numbers."
          ],
          workedExample: "Name the compound with formula $CH_3-CH_2-CH_2-OH$.\nThe longest chain has 3 carbons (prefix = prop-).\nIt contains single carbon-carbon bonds and has an $-OH$ group (suffix = -anol).\nSince the $-OH$ is on Carbon 1, the name is Propan-1-ol."
        }
      },
      {
        id: "electrochemistry",
        title: "Electrochemistry",
        juniorDesc: "Learn how batteries make electricity and what rust is.",
        seniorDesc: "Understand electrolysis, redox reactions, and Faraday's laws.",
        juniorGreeting: "Hi Teacher! 🔋 Why does a copper key get coated with gold when we run an electric current through a liquid? How does electroplating work?",
        seniorGreeting: "Good day, Teacher! 🧪 We are studying electrolysis. Can you explain the difference between the anode and cathode, detail Faraday's First Law ($m=zIt$), and explain redox (reduction-oxidation)?",
        juniorMarkingGuide: "1. Define electrolysis: using electricity to break down a liquid chemical.\n2. Explain that metal is attracted to the negative key, coating it.\n3. State that the liquid contains metal particles (ions).",
        seniorMarkingGuide: "1. Define anode (positive electrode, oxidation occurs) and cathode (negative electrode, reduction occurs).\n2. Explain Redox: Oxidation is loss of electrons, Reduction is gain of electrons (OIL RIG).\n3. State Faraday's First Law: $m = eIt$ or $m = \\left(\\frac{M}{nF}\\right)It$ where F = 96,500 C.",
        studyNotes: {
          concept: "Electrochemistry relates electrical energy and chemical change. Electrolysis uses electrical current to force a non-spontaneous chemical reaction.",
          formulas: [
            "Faraday's First Law: $m = zIt = \\left(\\frac{M}{nF}\\right)It$ (where $F \\approx 96,500\\text{ C/mol}$, $n$ is charge, $M$ is molar mass)",
            "Charge: $Q = It$"
          ],
          steps: [
            "Identify current $I$ (amperes), time $t$ (seconds), molar mass $M$, and electron change $n$.",
            "Convert time to seconds if given in minutes or hours.",
            "Substitute into Faraday's equation to solve for mass ($m$) deposited at the cathode."
          ],
          workedExample: "Calculate charge passed when $2\\text{A}$ current flows for $5\\text{ minutes}$.\nTime $t = 5 \\times 60 = 300\\text{ seconds}$.\nCharge $Q = It = 2 \\times 300 = 600\\text{ Coulombs}$."
        }
      },
      {
        id: "atomic_structure",
        title: "Atomic Structure",
        juniorDesc: "Learn about protons, neutrons, and electrons inside atoms.",
        seniorDesc: "Study quantum numbers, electron configuration, and s, p, d, f orbitals.",
        juniorGreeting: "Hello Teacher! ⚛️ I know everything is made of atoms. But what is an atom made of, and how do electrons orbit around the center without falling in?",
        seniorGreeting: "Good day, Teacher! 🧪 I'm learning quantum configurations. Can you explain how to write the electron configurations for Calcium (atomic number 20) using s, p, d, f orbitals?",
        juniorMarkingGuide: "1. Name the three subatomic particles: proton (positive), neutron (neutral), electron (negative).\n2. Place protons and neutrons in the center (nucleus) and electrons orbiting outside.\n3. Explain opposite charge attraction holds electrons in orbit.",
        seniorMarkingGuide: "1. Explain Aufbau Principle: fill lowest energy orbitals first ($1s \\rightarrow 2s \\rightarrow 2p \\rightarrow 3s \\rightarrow 3p \\rightarrow 4s$).\n2. Differentiate shell capacities: s (2), p (6), d (10), f (14).\n3. Write configuration for Ca (20): $1s^2 2s^2 2p^6 3s^2 3p^6 4s^2$.",
        studyNotes: {
          concept: "Atoms consist of a dense positive nucleus surrounded by negative electrons in specific probability regions called orbitals (s, p, d, f).",
          formulas: [
            "Max Electrons in Shell: $2n^2$"
          ],
          steps: [
            "Find the atomic number of the element (equals total electrons in neutral atom).",
            "Fill orbitals in order of increasing energy level: $1s, 2s, 2p, 3s, 3p, 4s, 3d...$.",
            "Observe the maximum electron limits for each orbital type."
          ],
          workedExample: "Write the electron configuration of Nitrogen (Atomic number 7).\nNitrogen has 7 electrons.\nFill $1s$ with 2: $1s^2$ (5 left).\nFill $2s$ with 2: $2s^2$ (3 left).\nFill $2p$ with 3: $2p^3$.\nConfiguration: $1s^2 2s^2 2p^3$."
        }
      }
    ]
  },
  civic: {
    id: "civic",
    name: "Civic Education",
    topics: [
      {
        id: "human_rights",
        title: "Fundamental Human Rights",
        juniorDesc: "Learn about your basic rights as a child (education, safety).",
        seniorDesc: "Study the Universal Declaration of Human Rights and legal protections.",
        juniorGreeting: "Hi Teacher! ⚖️ What are human rights? Does every child have a right to go to school, and what happens if someone tries to stop them?",
        seniorGreeting: "Good day, Teacher! 📜 We are studying civic rights. Can you explain the categories of human rights (civil, political, socio-economic), and discuss the history of the UDHR?",
        juniorMarkingGuide: "1. Define human rights as basic freedoms every human deserves.\n2. List major rights: right to life, education, and protection from abuse.\n3. Explain that rights are protected by the law.",
        seniorMarkingGuide: "1. Define UDHR (Universal Declaration of Human Rights, adopted by UN in 1948).\n2. Categorize: Civil/Political (right to vote, fair trial) vs Socio-Economic (education, work).\n3. Explain limitations of rights (e.g. your right to freedom of movement is limited during public health curfews or prison sentences).",
        studyNotes: {
          concept: "Fundamental Human Rights are moral principles or norms that describe standards of human behavior and are protected as natural and legal rights.",
          formulas: [],
          steps: [
            "Human rights are: Universal (apply to all), Inalienable (cannot be taken away), Indivisible (all rights are equally important).",
            "Legal backing is provided by: national constitutions (e.g. Chapter 4 of Nigerian Constitution) and international charters."
          ],
          workedExample: "Give an example of when a citizen's right to freedom of movement can be restricted.\nA citizen's right to movement can be legally restricted: 1) during a declared state of emergency or curfew, 2) if they are convicted of a crime and sentenced to prison, or 3) to prevent the spread of a contagious disease."
        }
      },
      {
        id: "democracy",
        title: "Democracy & Rule of Law",
        juniorDesc: "Understand how voting works and what elections are.",
        seniorDesc: "Study the pillars of democracy, constitutional supremacy, and separation of powers.",
        juniorGreeting: "Hello Teacher! 🗳️ I see adults voting during elections. What does 'democracy' mean, and why is it important that everyone follows the same laws?",
        seniorGreeting: "Good day, Teacher! ⚖️ We are studying governance. Can you explain the concept of 'Rule of Law', discuss the separation of powers (Legislative, Executive, Judicial), and outline their checks and balances?",
        juniorMarkingGuide: "1. Define democracy as government of the people, by the people, and for the people.\n2. Explain that voting allows citizens to choose their leaders.\n3. Explain that laws apply to everyone, including presidents and rich citizens.",
        seniorMarkingGuide: "1. Define Rule of Law (supremacy of law, equality before the law, protection of rights).\n2. Explain Separation of Powers: Legislature (makes laws), Executive (enforces laws), Judiciary (interprets laws).\n3. Give examples of checks and balances (e.g. President vetoing bill, Senate confirming judges).",
        studyNotes: {
          concept: "Democracy is a system of government where power is vested in the people. The Rule of Law ensures that laws rule the land, preventing dictatorship.",
          formulas: [],
          steps: [
            "Supremacy of the Law: The constitution is the highest law; no individual is above it.",
            "Equality Before the Law: Laws apply equally to all citizens regardless of status.",
            "Independence of the Judiciary: Courts must be free from political interference."
          ],
          workedExample: "Explain the role of the Judiciary in a democracy.\nThe Judiciary interprets the law. Its main job is to resolve legal disputes, protect citizen rights against abuse, and ensure that actions taken by the Executive and Legislature comply with the Constitution."
        }
      },
      {
        id: "national_values",
        title: "National Values & Citizenship",
        juniorDesc: "Learn how to be a good citizen and help your community.",
        seniorDesc: "Analyze national integrity, patriotism, and constitutional duties.",
        juniorGreeting: "Hi Teacher! 🇳🇬 What makes someone a good citizen? What are the symbols of my country, and how do I respect them?",
        seniorGreeting: "Good day, Teacher! 🤝 We are studying citizenship. Can you explain the difference between a citizen by birth, registration, and naturalization, and outline our constitutional duties?",
        juniorMarkingGuide: "1. Define a citizen as a legal member of a country.\n2. List positive traits: honesty, respect for elders, community service.\n3. Identify national symbols: flag, anthem, pledge.",
        seniorMarkingGuide: "1. Define forms of citizenship: Birth (parents are citizens), Registration (marriage to a citizen), Naturalization (residency over a long period).\n2. List duties: paying taxes, defending the nation, voting, obeying laws.\n3. Discuss national values: integrity, discipline, patriotism, self-reliance.",
        studyNotes: {
          concept: "Citizenship is the status of being a citizen, carrying rights and duties. National values are core beliefs that bind a society together.",
          formulas: [],
          steps: [
            "Citizenship by Birth: Automatically acquired if parents belong to the nation.",
            "Citizenship by Naturalization: Requires legal residency (usually 15 years in Nigeria), good character, and swearing an oath of allegiance."
          ],
          workedExample: "State three duties of a citizen.\n1. Obedience to the Constitution and laws of the state.\n2. Paying taxes honestly and promptly.\n3. Participating in civic duties such as voting during elections."
        }
      },
      {
        id: "cultism",
        title: "Cultism & Societal Ills",
        juniorDesc: "Learn about peer pressure and avoiding bad groups.",
        seniorDesc: "Examine the origins, consequences, and prevention of secret cults.",
        juniorGreeting: "Hello Teacher! 🏫 My seniors told me to stay away from 'secret societies' or cults. What are these groups, and why are they dangerous to students?",
        seniorGreeting: "Good day, Teacher! ⚠️ We are studying cultism. Can you explain the origin of secret cults in educational institutions (e.g. Pyrate Confraternity) and discuss their negative consequences on individuals and society?",
        juniorMarkingGuide: "1. Define peer pressure (friends forcing you to do bad things).\n2. Explain cults are secret violent groups.\n3. Advise reporting suspicious groups to teachers and parents.",
        seniorMarkingGuide: "1. Explain historical origin (originally formed for positive social change, later degenerated into violent rivalries).\n2. List consequences: violence, academic expulsion, loss of lives, drug addiction.\n3. Discuss prevention: parental supervision, strict school punishments, counseling.",
        studyNotes: {
          concept: "Cultism is membership in a secret cult group characterized by bizarre initiation rituals and secret oaths. It is a major social vice in secondary and tertiary schools.",
          formulas: [],
          steps: [
            "Causes: Peer pressure, search for protection, false sense of power, drug influence.",
            "Effects: Violent clashes, loss of lives, mental illness, prison sentences, rustication."
          ],
          workedExample: "How can cultism be eradicated in schools?\nCultism can be checked by: 1) implementing strict laws and expelling cult members, 2) establishing counseling programs, and 3) organizing sensitisation campaigns for new students."
        }
      },
      {
        id: "trafficking",
        title: "Human Trafficking",
        juniorDesc: "Understand child labor and staying safe from strangers.",
        seniorDesc: "Study human trafficking causes, consequences, and agency roles (NAPTIP).",
        juniorGreeting: "Hi Teacher! 🛑 I heard a warning on the radio about human trafficking. What is it, and how do we protect children from being taken away?",
        seniorGreeting: "Good day, Teacher! ⛓️ We are discussing human trafficking. Can you explain the causes (poverty, greed) and the role of agencies like NAPTIP in combatting it?",
        juniorMarkingGuide: "1. Define trafficking as moving people by force or lies for work.\n2. Advise never accepting gifts or rides from strangers.\n3. Emphasize that children belong in school, not working.",
        seniorMarkingGuide: "1. Define human trafficking: recruitment and transport of persons by threat or force for exploitation.\n2. Name agency: NAPTIP (National Agency for the Prohibition of Trafficking in Persons).\n3. Discuss effects: psychological trauma, loss of dignity, spread of diseases.",
        studyNotes: {
          concept: "Human trafficking is modern-day slavery. It involves commercial exploitation of vulnerable people through force, fraud, or coercion.",
          formulas: [],
          steps: [
            "Types: forced labor, child labor, sexual exploitation, organ harvesting.",
            "NAPTIP functions: rescue victims, prosecute traffickers, rehabilitate survivors, sensitize communities."
          ],
          workedExample: "State two major causes of human trafficking.\n1. Poverty: Vulnerable families are easily tricked by promises of high-paying jobs in cities.\n2. Illiteracy: Lack of awareness makes individuals fall victim to false job scams."
        }
      },
      {
        id: "drug_abuse",
        title: "Drug Abuse & Law Enforcement",
        juniorDesc: "Learn why drugs are only taken when prescribed by doctors.",
        seniorDesc: "Classify drugs, analyze abuse causes, and study NDLEA roles.",
        juniorGreeting: "Hello Teacher! 💊 Why can't we buy any medicine we want without a doctor's note? What is drug abuse, and how does it harm the brain?",
        seniorGreeting: "Good day, Teacher! 🚫 We are studying drug abuse. Can you classify drugs (stimulants, depressants, hallucinogens), outline signs of addiction, and discuss the functions of the NDLEA?",
        juniorMarkingGuide: "1. Explain that medicines are drugs used to cure illness under instructions.\n2. Define drug abuse: taking drugs without prescription or taking illegal substances.\n3. Explain that abuse damages organs and brain cells.",
        seniorMarkingGuide: "1. Classify: Stimulants (speed up brain, e.g. cocaine), Depressants (slow down brain, e.g. alcohol), Hallucinogens (distort reality, e.g. LSD).\n2. Identify agency: NDLEA (National Drug Law Enforcement Agency).\n3. State NDLEA duties: intercept illicit drug shipments, destroy crops, arrest dealers.",
        studyNotes: {
          concept: "Drug abuse is the habitual use of chemical substances in amounts or with methods that are harmful to the individual or others. It leads to physical and mental addiction.",
          formulas: [],
          steps: [
            "Drug Misuse: using prescription medicine incorrectly.",
            "Drug Abuse: using illegal drugs or abusing substances for euphoric feelings.",
            "Treatment: detoxification, behavioral therapy, rehabilitation."
          ],
          workedExample: "Difference between stimulants and depressants.\n1. Stimulants speed up the Central Nervous System, increasing heart rate and alertness.\n2. Depressants slow down the CNS, inducing relaxation and reducing reaction speeds."
        }
      },
      {
        id: "parenthood",
        title: "Responsible Parenthood",
        juniorDesc: "Learn about the roles of parents in a happy family.",
        seniorDesc: "Understand duties of parents, family planning, and child rearing.",
        juniorGreeting: "Hi Teacher! 👨‍👩‍👧‍👦 What is a family? What are the duties of parents to their children, and how do children show respect in return?",
        seniorGreeting: "Good day, Teacher! 🏡 We are studying family structures. Can you explain the duties of responsible parents, and discuss how family planning contributes to societal stability?",
        juniorMarkingGuide: "1. Define family as people related by blood or marriage.\n2. State parents provide food, shelter, clothing, and education.\n3. Explain children show respect by helping with house chores and studying.",
        seniorMarkingGuide: "1. List duties: moral guidance, physical provision, education, safety, emotional support.\n2. Define family planning: spacing child births to match family resources.\n3. Detail effects of poor parenting on society (juvenile delinquency, crime, school dropouts).",
        studyNotes: {
          concept: "Responsible parenthood is the ability of parents to detect and satisfy the needs of their children while guiding them to be useful citizens.",
          formulas: [],
          steps: [
            "Parental Duties: economic provision, education, moral upbringing, emotional security.",
            "Child Duties: obedience, helping in the home, studying, taking care of aging parents."
          ],
          workedExample: "How does family planning affect a nation's economy?\nFamily planning helps manage population growth. When families space births, parents can afford quality education and healthcare, producing a highly skilled labor force that boosts the nation's GDP."
        }
      },
      {
        id: "government",
        title: "Representative Government",
        juniorDesc: "Learn how leaders are chosen by citizens (voting).",
        seniorDesc: "Analyze electoral systems, voting processes, and INEC roles.",
        juniorGreeting: "Hello Teacher! 🗳️ What is a government? How do we vote during elections, and what makes an election fair?",
        seniorGreeting: "Good day, Teacher! 🏛️ We are studying democratic institutions. Can you explain different electoral systems (First-Past-the-Post vs Proportional Representation), and discuss the duties of INEC?",
        juniorMarkingGuide: "1. Define government as the system that rules and organizes a country.\n2. Explain voting steps: register, get card, cast vote.\n3. State that secret voting (ballot) ensures safety and fairness.",
        seniorMarkingGuide: "1. Contrast First-Past-the-Post (candidate with most votes wins) vs Proportional Representation (seats allocated by vote percentage).\n2. Identify agency: INEC (Independent National Electoral Commission).\n3. State INEC roles: register voters, register political parties, organize elections, declare results.",
        studyNotes: {
          concept: "Representative government is an electoral system where citizens vote to elect representatives to make laws and govern on their behalf.",
          formulas: [],
          steps: [
            "Elections must be: free (no intimidation), fair (accurate counting), periodic (regular intervals).",
            "Voter Registration: citizens get a voters card to prevent double voting."
          ],
          workedExample: "Difference between direct and indirect democracy.\n1. In Direct Democracy, citizens vote on laws themselves (e.g. ancient Athens).\n2. In Indirect (Representative) Democracy, citizens elect officials to vote on laws on their behalf (e.g. modern republics)."
        }
      },
      {
        id: "constitution",
        title: "Constitutional Development",
        juniorDesc: "Learn what the constitution is and why we have rules.",
        seniorDesc: "Trace historical constitutions and explain how laws are amended.",
        juniorGreeting: "Hi Teacher! 📖 What is the Constitution? Is it just a book of rules? Why can't a president just make any laws they want?",
        seniorGreeting: "Good day, Teacher! 🏛️ We are studying history. Can you trace the development of constitutions in Nigeria (Clifford, Richards, Macpherson, Lyttelton) and explain the amendment process?",
        juniorMarkingGuide: "1. Define constitution as the supreme book of laws governing a country.\n2. Explain that the constitution limits the power of leaders.\n3. State that rules ensure order and peace.",
        seniorMarkingGuide: "1. Trace colonial milestones: Clifford 1922 (elective principle), Richards 1946 (regionalism), Macpherson 1951 (national assembly), Lyttelton 1954 (federalism).\n2. Explain post-independence: 1963 Republic, 1979 Presidential, 1999 (current).\n3. State amendment process: requires 2/3 majority in National Assembly and approval by 2/3 of State Assemblies.",
        studyNotes: {
          concept: "Constitutional development is the process of writing, revising, and amending the supreme law of a state.",
          formulas: [],
          steps: [
            "Colonial Era: Constitutions were written by British Governors to manage the colony.",
            "Independence: Constitution gave sovereignty and established federal structures.",
            "Amendments: Necessary to update laws to match modern societal changes."
          ],
          workedExample: "Explain the main contribution of the Lyttelton Constitution of 1954.\nThe Lyttelton Constitution established a true federal structure in Nigeria, dividing powers between the central government and the regional governments (North, East, West)."
        }
      },
      {
        id: "nationalism",
        title: "Nationalism & Integration",
        juniorDesc: "Learn about national unity and historical freedom fighters.",
        seniorDesc: "Study national integration, historical nationalist leaders, and building unity.",
        juniorGreeting: "Hello Teacher! 🇳🇬 I see different tribes in my school (Yoruba, Igbo, Hausa). What is nationalism, and how do we stay united as one country?",
        seniorGreeting: "Good day, Teacher! 🤝 We are studying history. Can you discuss the roles of nationalist leaders like Herbert Macaulay, Nnamdi Azikiwe, and Obafemi Awolowo in gaining independence, and explain how the NYSC scheme promotes national integration?",
        juniorMarkingGuide: "1. Define nationalism as love for one's country and fighting for its freedom.\n2. Name major leaders: Azikiwe, Awolowo, Balewa.\n3. Explain that unity means working together despite different languages.",
        seniorMarkingGuide: "1. Detail nationalist strategies: newspapers (West African Pilot), political parties (NCNC, AG), strikes.\n2. Define national integration: bringing diverse ethnic groups into a single national identity.\n3. State NYSC (National Youth Service Corps) goals: posting graduates to different states to learn cultures and build unity.",
        studyNotes: {
          concept: "Nationalism is devotion to one's nation, especially fighting for independence from colonial rule. National integration binds diverse groups into a cohesive unit.",
          formulas: [],
          steps: [
            "Nationalists used: media campaigns, political education, and trade unions to pressure colonial masters.",
            "Integration programs: Federal Character principle, unity schools, and the NYSC scheme."
          ],
          workedExample: "How does the National Youth Service Corps (NYSC) promote unity?\nNYSC posts graduates to states other than their state of origin. This exposes them to new languages, traditions, and friendships, reducing ethnic prejudices and promoting national unity."
        }
      }
    ]
  },
  economics: {
    id: "economics",
    name: "Economics",
    topics: [
      {
        id: "demand_supply",
        title: "Law of Demand & Supply",
        juniorDesc: "Learn why prices go up when items are scarce.",
        seniorDesc: "Understand demand curves, supply curves, equilibrium price, and elasticity.",
        juniorGreeting: "Hi Teacher! 📈 I noticed that during holidays, the price of tomatoes in the market goes up. Why do sellers raise prices when many people want to buy?",
        seniorGreeting: "Good day, Teacher! 📊 I am studying price theory. Can you explain why the demand curve slopes downwards while the supply curve slopes upwards, and show me how to calculate Price Elasticity of Demand?",
        juniorMarkingGuide: "1. Define demand (buying) and supply (selling).\n2. Explain that high demand + low supply makes goods scarce, driving prices up.\n3. State that low demand + high supply drives prices down.",
        seniorMarkingGuide: "1. State Law of Demand: quantity demanded varies inversely with price ($P \\uparrow, Q \\downarrow$).\n2. State Law of Supply: quantity supplied varies directly with price ($P \\uparrow, Q \\uparrow$).\n3. State Elasticity formula: $E_d = \\frac{\\% \\text{ change in } Q_d}{\\% \\text{ change in } P}$.",
        studyNotes: {
          concept: "The law of demand and supply determines market prices. Demand is the willingness and ability to buy, while supply is the willingness and ability to sell.",
          formulas: [
            "Price Elasticity of Demand: $E_d = \\frac{\\Delta Q}{\\Delta P} \\times \\frac{P_1}{Q_1}$",
            "Percentage Change: $\\% \\Delta = \\frac{\\text{New} - \\text{Old}}{\\text{Old}} \\times 100$"
          ],
          steps: [
            "Calculate the percentage change in quantity demanded.",
            "Calculate the percentage change in price.",
            "Divide the quantity change by the price change.",
            "Interpret the result: $E_d > 1$ (elastic), $E_d < 1$ (inelastic), $E_d = 1$ (unitary)."
          ],
          workedExample: "Price of a pen increases from $10$ to $12$ (20% increase), causing demand to drop from $100$ to $90$ (10% decrease). Find $E_d$.\n$E_d = \\frac{\\% \\Delta Q_d}{\\% \\Delta P} = \\frac{-10\\%}{20\\%} = -0.5$.\nTaking the absolute value, $E_d = 0.5$ (inelastic)."
        }
      },
      {
        id: "market_structures",
        title: "Market Structures",
        juniorDesc: "Learn about competition between shops.",
        seniorDesc: "Compare perfect competition, monopoly, and oligopoly structures.",
        juniorGreeting: "Hello Teacher! 🏪 In my neighborhood, there are five provision stores selling the same items. What happens if one store suddenly doubles its prices?",
        seniorGreeting: "Good day, Teacher! 📈 We are studying market structures. Can you contrast the characteristics of Perfect Competition (many buyers/sellers, homogeneous products) with a Monopoly (single seller, barriers to entry)?",
        juniorMarkingGuide: "1. Explain that high competition gives buyers choices.\n2. State that if a store doubles prices, customers will simply buy from other stores.\n3. Explain that stores must keep prices similar to survive.",
        seniorMarkingGuide: "1. Perfect Competition: infinite buyers/sellers, perfect knowledge, free entry/exit, price takers.\n2. Monopoly: single seller, unique product, high barriers, price maker.\n3. Oligopoly: few dominant sellers, mutual interdependence (kinked demand curve).",
        studyNotes: {
          concept: "Market structures describe the competitive environment in which buyers and sellers operate.",
          formulas: [
            "Profit Maximization: $MC = MR$ (Marginal Cost = Marginal Revenue)"
          ],
          steps: [
            "Identify the number of sellers and barriers to entry.",
            "Determine product type (homogeneous vs differentiated).",
            "Determine pricing power (price taker vs price maker)."
          ],
          workedExample: "Why is a perfectly competitive firm a 'price taker'?\nBecause there are many firms producing identical products. If one firm raises its price, it will lose all its customers to competitors. If it lowers its price, it makes less profit. It must accept the market equilibrium price."
        }
      },
      {
        id: "inflation",
        title: "Inflation",
        juniorDesc: "Learn why money buys less over time (price increases).",
        seniorDesc: "Study demand-pull and cost-push inflation, and fiscal/monetary controls.",
        juniorGreeting: "Hi Teacher! 💸 My dad said that five years ago, $100 could buy a full bag of rice, but today it only buys a small portion. Why does money lose value?",
        seniorGreeting: "Good day, Teacher! 📈 I am studying macroeconomics. Can you explain the difference between Demand-Pull and Cost-Push inflation, and how the Central Bank uses interest rates to control it?",
        juniorMarkingGuide: "1. Define inflation as a persistent rise in prices over time.\n2. Explain that printing too much money decreases its value.\n3. Explain that when items are scarce, people compete to buy them, raising prices.",
        seniorMarkingGuide: "1. Demand-Pull: aggregate demand exceeds supply ('too much money chasing too few goods').\n2. Cost-Push: rising production costs (wages, raw materials) push prices up.\n3. Central Bank control (Monetary Policy): raising interest rates increases borrowing costs, reducing spending and cooling inflation.",
        studyNotes: {
          concept: "Inflation is the general increase in prices and fall in the purchasing power of money.",
          formulas: [
            "Inflation Rate: $\\text{Rate} = \\frac{\\text{CPI}_2 - \\text{CPI}_1}{\\text{CPI}_1} \\times 100$"
          ],
          steps: [
            "Identify the cause: excessive demand (Demand-Pull) or rising input costs (Cost-Push).",
            "Monetary policy: increase reserve requirements, sell treasury bills, raise interest rates.",
            "Fiscal policy: increase taxes, cut government expenditure."
          ],
          workedExample: "How does raising interest rates reduce inflation?\nRaising interest rates makes borrowing expensive for consumers and businesses. This reduces loans, cuts consumption and investment spending, lowers aggregate demand, and slows down price growth."
        }
      },
      {
        id: "national_income",
        title: "National Income",
        juniorDesc: "Learn how we measure a country's total wealth.",
        seniorDesc: "Calculate GDP, GNP, and understand the Income, Output, and Expenditure methods.",
        juniorGreeting: "Hello Teacher! 💰 How do we measure if a country is getting richer or poorer? What do terms like GDP mean?",
        seniorGreeting: "Good day, Teacher! 📊 We are studying national income accounting. Can you show me how to calculate GDP using the Expenditure Method ($Y = C + I + G + [X - M]$), and explain the difference between GDP and GNP?",
        juniorMarkingGuide: "1. Explain that countries measure total production to check economic health.\n2. Define GDP (Gross Domestic Product) as the value of all goods made in the country in a year.\n3. Explain that higher GDP means a growing economy with more jobs.",
        seniorMarkingGuide: "1. State Expenditure formula: $\\text{GDP} = C + I + G + (X - M)$ (Consumption + Investment + Government + Net Exports).\n2. Contrast GDP (value produced within boundaries) vs GNP (value produced by citizens worldwide: $\\text{GNP} = \\text{GDP} + \\text{Net Factor Income from Abroad}$).\n3. List calculation difficulties: double counting, non-market transactions, inflation adjustments (Real vs Nominal).",
        studyNotes: {
          concept: "National Income is the total value of all final goods and services produced by a country in a year.",
          formulas: [
            "Expenditure GDP: $Y = C + I + G + (X - M)$",
            "GNP: $\\text{GNP} = \\text{GDP} + \\text{NFIFA}$ (Net Factor Income from Abroad)"
          ],
          steps: [
            "Gather data for consumer spending $C$, business investment $I$, government buying $G$, exports $X$, and imports $M$.",
            "Subtract imports from exports ($X - M$).",
            "Add the components: $C + I + G + (X - M)$."
          ],
          workedExample: "If $C=500, I=150, G=200, X=50, M=70$, calculate GDP.\n$\\text{Net Exports} = X - M = 50 - 70 = -20$.\n$\\text{GDP} = 500 + 150 + 200 + (-20) = 850 - 20 = 830$."
        }
      },
      {
        id: "money_banking",
        title: "Money & Banking",
        juniorDesc: "Learn about the barter system and why we use paper money.",
        seniorDesc: "Analyze functions of money, commercial banks, and Central Bank monetary instruments.",
        juniorGreeting: "Hi Teacher! 💵 Long ago, people traded cows for bags of corn (barter). Why did we switch to paper money, and what makes a paper note valuable?",
        seniorGreeting: "Good day, Teacher! 🏦 We are studying banking. Can you explain the functions of money, how commercial banks create credit, and how the Central Bank acts as the lender of last resort?",
        juniorMarkingGuide: "1. Define Barter System (trading goods directly).\n2. Explain barter problems: Double Coincidence of Wants (you must want what I have).\n3. State functions of money: medium of exchange, store of value, unit of account.",
        seniorMarkingGuide: "1. Explain fractional reserve banking: banks keep a fraction of deposits and lend out the rest, creating credit.\n2. State Central Bank tools: Cash Reserve Ratio (CRR), Liquidity Ratio, Open Market Operations (OMO).\n3. Explain 'Lender of Last Resort': Central Bank lending funds to commercial banks facing liquidity crises.",
        studyNotes: {
          concept: "Money is any item widely accepted as payment. Banks facilitate financial transactions and manage money supply.",
          formulas: [
            "Money Multiplier: $M = \\frac{1}{\\text{Reserve Ratio}}$"
          ],
          steps: [
            "Barter requirements: double coincidence of wants, divisibility, storage.",
            "Money characteristics: portable, durable, divisible, scarce, acceptable.",
            "Central Bank implements monetary policies to maintain price stability."
          ],
          workedExample: "If the cash reserve ratio is 10%, calculate the money multiplier.\n$\\text{Multiplier} = \\frac{1}{0.10} = 10$.\nThis means a new deposit of $100$ can theoretically create up to $1000$ in total bank deposits."
        }
      },
      {
        id: "trade",
        title: "International Trade",
        juniorDesc: "Learn why countries buy and sell goods from each other.",
        seniorDesc: "Compare absolute and comparative advantage, and study balance of payments.",
        juniorGreeting: "Hello Teacher! 🚢 Why can't Nigeria produce everything it needs, like cars and electronics, instead of buying them from other countries?",
        seniorGreeting: "Good day, Teacher! 📊 We are studying international trade. Can you explain David Ricardo's Law of Comparative Advantage using a simple 2-country 2-product table?",
        juniorMarkingGuide: "1. Explain trade allows access to resources not available locally (oil, technology).\n2. State it is cheaper to buy some goods from abroad than to manufacture them.\n3. Define exports (selling) and imports (buying).",
        seniorMarkingGuide: "1. Define Comparative Advantage: a country should specialize in producing goods with the lowest opportunity cost.\n2. Draw table: Country A can produce 10 Cocoa or 5 Cars. Country B can produce 6 Cocoa or 2 Cars.\n3. Calculate opportunity cost ratios: A's cost for 1 Car is 2 Cocoa. B's cost for 1 Car is 3 Cocoa. Country A has comparative advantage in Cars.",
        studyNotes: {
          concept: "International trade is the exchange of goods and services across borders. Countries benefit from trade due to differences in resource endowments.",
          formulas: [
            "Opportunity Cost (Good X): $\\text{OC}_X = \\frac{\\text{Quantity of Good Y sacrificed}}{\\text{Quantity of Good X gained}}$"
          ],
          steps: [
            "Set up a production possibilities table for two countries.",
            "Calculate the opportunity cost of producing one unit of each good in both countries.",
            "Assign specialization: the country with the lower opportunity cost specializes in that good."
          ],
          workedExample: "Country A: $10\\text{ Coffee}$ or $5\\text{ Tea}$. Country B: $8\\text{ Coffee}$ or $2\\text{ Tea}$.\nOpportunity cost of $1\\text{ Tea}$ in A: $\\frac{10}{5} = 2\\text{ Coffee}$.\nOpportunity cost of $1\\text{ Tea}$ in B: $\\frac{8}{2} = 4\\text{ Coffee}$.\nCountry A has a lower opportunity cost for Tea, so it should specialize in Tea and export it."
        }
      },
      {
        id: "public_finance",
        title: "Public Finance",
        juniorDesc: "Learn how the government gets money (taxes) and spends it.",
        seniorDesc: "Analyze direct/indirect taxation, government budgets, and public debt.",
        juniorGreeting: "Hi Teacher! 🏛️ Why does the government charge taxes? Where does the tax money go, and how is it used to build roads and schools?",
        seniorGreeting: "Good day, Teacher! 📈 We are studying public finance. Can you differentiate between direct and indirect taxes, and discuss the economic effects of a budget deficit?",
        juniorMarkingGuide: "1. Define tax as a compulsory payment to the government.\n2. List public services funded by taxes: schools, hospitals, security, roads.\n3. Mention major tax types like VAT (Value Added Tax).",
        seniorMarkingGuide: "1. Direct Taxes: levied on income/wealth (PAYE, Company tax), burden cannot be shifted.\n2. Indirect Taxes: levied on goods/services (VAT, customs duties), burden can be shifted to consumers.\n3. Budget types: Surplus (Revenue > Expenditure), Deficit (Revenue < Expenditure, financed by borrowing/debt).",
        studyNotes: {
          concept: "Public finance deals with government revenue (taxation, royalties) and expenditure (budgets, infrastructure) to achieve social stability.",
          formulas: [
            "Budget Balance: $\\text{Balance} = \\text{Total Revenue} - \\text{Total Expenditure}$"
          ],
          steps: [
            "Tax structures: Progressive (tax rate increases as income increases), Regressive (hits lower income harder), Proportional (flat rate).",
            "Fiscal tools are adjusted to manage inflation or recession."
          ],
          workedExample: "Why is a sales tax considered regressive?\nBecause it is a flat percentage on purchases. A poor person spending $10$ on a taxed item pays the same tax amount as a rich person. However, that tax represents a much larger percentage of the poor person's income."
        }
      },
      {
        id: "economic_systems",
        title: "Economic Systems",
        juniorDesc: "Understand different ways societies organize work and shops.",
        seniorDesc: "Contrast capitalism, socialism, and mixed economies.",
        juniorGreeting: "Hello Teacher! 🌍 What is the difference between a country where the government owns all the businesses, and a country where individuals own them?",
        seniorGreeting: "Good day, Teacher! 📊 We are studying economic systems. Can you outline the main characteristics, advantages, and disadvantages of Capitalism (Free Market) and Socialism (Command)?",
        juniorMarkingGuide: "1. Explain that societies must choose how to allocate resources.\n2. Define capitalism: individuals own businesses to make profit.\n3. Define socialism: government owns businesses to share wealth.",
        seniorMarkingGuide: "1. Capitalism: private ownership, price mechanism (invisible hand), profit motive, consumer sovereignty.\n2. Command (Socialism): state ownership, central planning, social welfare, no competition.\n3. Mixed Economy: combines private enterprise with government regulation (most modern nations).",
        studyNotes: {
          concept: "An economic system is a system of production, resource allocation, and distribution of goods and services within a society.",
          formulas: [],
          steps: [
            "Free Market: Prices determined by demand and supply; minimal government intervention.",
            "Command Economy: Government decides what to produce, how to produce, and for whom.",
            "Mixed: Government regulates monopolies, provides public goods, while allowing private business."
          ],
          workedExample: "State one disadvantage of a command economy.\nLack of incentives: Since the state owns all enterprises and profits are not private, workers and managers have little motivation to innovate or improve efficiency, often leading to shortages and poor quality goods."
        }
      },
      {
        id: "unemployment",
        title: "Unemployment",
        juniorDesc: "Learn what it means to be out of work and how to find a job.",
        seniorDesc: "Classify structural, frictional, and cyclical unemployment, and suggest solutions.",
        juniorGreeting: "Hi Teacher! 💼 Why are some people unable to find jobs even when they have university degrees? What can a country do to create more jobs?",
        seniorGreeting: "Good day, Teacher! 📈 We are discussing labor economics. Can you explain the difference between Frictional, Structural, and Cyclical unemployment, and discuss how to reduce them?",
        juniorMarkingGuide: "1. Define unemployment: being able and willing to work but unable to find a job.\n2. Explain that jobs depend on businesses hiring.\n3. Suggest vocational training (learning practical skills like coding or farming).",
        seniorMarkingGuide: "1. Frictional: temporary transition period (searching for a new job).\n2. Structural: mismatch between worker skills and available jobs (e.g. technology replacing manual labor).\n3. Cyclical: caused by economic recessions (general drop in demand).\n4. Solutions: expansionary policies for cyclical, retraining programs for structural.",
        studyNotes: {
          concept: "Unemployment occurs when people who are active and searching for work are unable to find employment.",
          formulas: [
            "Unemployment Rate: $\\text{Rate} = \\frac{\\text{Number of Unemployed}}{\\text{Total Labor Force}} \\times 100$"
          ],
          steps: [
            "Calculate labor force = employed + unemployed (excluding children, retirees, and discouraged workers).",
            "Divide number of actively searching unemployed by total labor force.",
            "Multiply by 100 to get percentage."
          ],
          workedExample: "In a town of 10,000 people, 6,000 are employed, 400 are unemployed and searching, and the rest are children/retired. Find unemployment rate.\nLabor Force = 6000 + 400 = 6400.\nUnemployment Rate = $\\frac{400}{6400} \\times 100 = 6.25\\%$."
        }
      },
      {
        id: "population",
        title: "Population & Labor Force",
        juniorDesc: "Understand why population census is conducted.",
        seniorDesc: "Study Malthusian theory, optimum population, and labor mobility.",
        juniorGreeting: "Hello Teacher! 👥 Why does the government count all the people in the country every few years (census)? What happens if a country's population grows too fast?",
        seniorGreeting: "Good day, Teacher! 📈 We are studying demography. Can you explain Thomas Malthus's theory of population growth, and discuss the concept of 'Optimum Population'?",
        juniorMarkingGuide: "1. Define census as official counting of a population.\n2. Explain census helps in planning (building enough schools, hospitals, electricity).\n3. Explain that rapid growth can stretch resources (food, water, jobs).",
        seniorMarkingGuide: "1. Malthusian Theory: population grows geometrically (1, 2, 4, 8, 16...), while food supply grows arithmetically (1, 2, 3, 4, 5...).\n2. Malthusian checks: preventive checks (birth control) and positive checks (famine, war, disease).\n3. Optimum Population: population size that yields the highest output per head given the available resources.",
        studyNotes: {
          concept: "Demography is the study of human populations. Optimum population maximizes per capita income; overpopulation or underpopulation reduces it.",
          formulas: [
            "Population Growth Rate: $\\text{PGR} = \\text{Birth Rate} - \\text{Death Rate} + \\text{Net Migration}$"
          ],
          steps: [
            "Calculate Net Migration = Immigration - Emigration.",
            "Apply growth rate calculation: (Births - Deaths) + Net Migration.",
            "Compare growth rate with food and resource growth to identify overpopulation risks."
          ],
          workedExample: "Explain the concept of 'underpopulation'.\nUnderpopulation occurs when a country's population is too small to fully utilize its available resources. Increasing the population would lead to a higher output per capita as resources are managed more efficiently."
        }
      }
    ]
  },
  python: {
    id: "python",
    name: "Python Coding",
    topics: [
      {
        id: "variables",
        title: "Variables & Data Types",
        juniorDesc: "Learn how to store text and numbers in labels/variables.",
        seniorDesc: "Understand dynamic typing, naming rules, and type casting in Python.",
        juniorGreeting: "Hi Teacher! 🐍 I want to write a program that remembers my name. What is a variable, and how do we store text and numbers in it?",
        seniorGreeting: "Good day, Teacher! 💻 I am learning Python. Can you explain how dynamic typing works, discuss the difference between integers, floats, and strings, and show me how to cast variables using `int()` and `str()`?",
        juniorMarkingGuide: "1. Define a variable as a labeled container in memory.\n2. Use the assignment operator `=` to assign a value (e.g. `name = 'Chidi'`).\n3. Print the variable using `print(name)`.",
        seniorMarkingGuide: "1. State that variables are dynamically typed (no explicit declaration needed).\n2. Contrast data types: `int` (whole numbers), `float` (decimals), `str` (text).\n3. Demonstrate casting: `age = int('15')` converting a string to integer.",
        studyNotes: {
          concept: "Variables are reserved memory locations to store values. In Python, variables are created when you assign a value to them and are dynamically typed.",
          formulas: [],
          steps: [
            "Choose a descriptive variable name (must start with letter or underscore, no spaces).",
            "Use the assignment operator `=` to set its value.",
            "Check its type using the `type()` function.",
            "Cast variables using `str()`, `int()`, or `float()` to convert between types."
          ],
          workedExample: "```python\nx = 5          # Integer\ny = '10'       # String\n# Convert string to integer to add them\nresult = x + int(y)\nprint(result)  # Outputs 15\n```"
        }
      },
      {
        id: "control_flow",
        title: "Control Flow (If-Else)",
        juniorDesc: "Make choices in coding (e.g., if it rains, bring umbrella).",
        seniorDesc: "Solve branching logic using if, elif, else, and logical operators.",
        juniorGreeting: "Hello Teacher! 🌦️ How do I make my Python program make decisions? Like: if my score is 50 or more, print 'Pass', otherwise print 'Fail'?",
        seniorGreeting: "Good day, Teacher! 🐍 I'm writing a grading program. Can you explain how to nest `if` statements, and how to combine multiple conditions using logical operators like `and`, `or`, and `not`?",
        juniorMarkingGuide: "1. Explain the `if` keyword for checking conditions.\n2. Explain that indentation (4 spaces) is required to group code blocks.\n3. Use `else` to handle the alternative outcome.",
        seniorMarkingGuide: "1. Write syntax using `elif` for multiple conditions.\n2. Write comparison operators: `==`, `>`, `<`, `>=`, `<=`, `!=`.\n3. Demonstrate logical operator rules: `and` requires both conditions to be true, `or` requires at least one.",
        studyNotes: {
          concept: "Control flow refers to the order in which individual statements are executed. Conditional blocks (`if`, `elif`, `else`) allow branching execution based on boolean checks.",
          formulas: [],
          steps: [
            "Define the condition using comparison operators.",
            "Start the block with `if condition:` (ensure you write a colon at the end).",
            "Indent the code to run if the condition is True.",
            "Add `elif` or `else:` blocks as needed, maintaining correct indentation."
          ],
          workedExample: "```python\nscore = 75\nif score >= 80:\n    print('Grade A')\nelif score >= 50:\n    print('Grade C')\nelse:\n    print('Fail')\n```"
        }
      },
      {
        id: "loops",
        title: "Loops (For and While)",
        juniorDesc: "Repeat tasks in code without writing them multiple times.",
        seniorDesc: "Understand loop iteration, range function, and while conditional loops.",
        juniorGreeting: "Hi Teacher! 🔁 I want to print 'Hello' 10 times. I don't want to write print 10 times! How do loops work in Python?",
        seniorGreeting: "Good day, Teacher! 💻 I am confused about when to use a `for` loop versus a `while` loop. Can you explain iteration, how to use `range()`, and how to prevent infinite loops?",
        juniorMarkingGuide: "1. Explain loops repeat code blocks automatically.\n2. Introduce `for i in range(10):` syntax.\n3. Show how the index variable (i) changes from 0 to 9.",
        seniorMarkingGuide: "1. Contrast `for` (definite loops, known number of runs) vs `while` (indefinite loops, runs until condition is False).\n2. State range syntax: `range(start, stop, step)` (stop is exclusive).\n3. Show how to break loops using the `break` keyword.",
        studyNotes: {
          concept: "Loops are structures that repeat a block of code. Python has `for` loops (iterate over a sequence) and `while` loops (repeat as long as a condition is true).",
          formulas: [],
          steps: [
            "Use `for` to loop through items in a list or a range of numbers.",
            "Use `while` when repeating a task until a specific event or status changes.",
            "Ensure a `while` loop has a step inside that updates the condition variable, avoiding an infinite loop."
          ],
          workedExample: "```python\n# Print numbers 1 to 5 using a for loop\nfor i in range(1, 6):\n    print(i)\n\n# Loop using while\nx = 1\nwhile x <= 5:\n    print(x)\n    x += 1 # Critical step to increment x\n```"
        }
      },
      {
        id: "functions",
        title: "Functions & Parameters",
        juniorDesc: "Build reusable coding blocks/machines (functions).",
        seniorDesc: "Define functions, pass arguments, return values, and understand local scope.",
        juniorGreeting: "Hello Teacher! 📦 If I write a block of code to calculate areas, how do I package it so I can reuse it in other parts of my program?",
        seniorGreeting: "Good day, Teacher! 🐍 I'm learning functions. Can you explain the `def` keyword, the difference between printing inside a function and returning a value, and what local scope means?",
        juniorMarkingGuide: "1. Define a function as a reusable code machine.\n2. Introduce the `def function_name():` syntax.\n3. Show how to call/activate the function by writing `function_name()`.",
        seniorMarkingGuide: "1. Pass parameters: `def calculate_area(length, width):`.\n2. Return value: use `return` keyword to output data back to caller.\n3. Explain that variables created inside a function (local scope) cannot be accessed outside.",
        studyNotes: {
          concept: "A function is a block of organized, reusable code that performs a single action. Functions provide modularity and code reuse.",
          formulas: [],
          steps: [
            "Define the function using `def name(parameters):`.",
            "Write the operations inside, indented.",
            "Use `return` to send a result back to the caller.",
            "Call the function by passing arguments in parentheses: `result = name(args)`."
          ],
          workedExample: "```python\ndef add_numbers(a, b):\n    sum_val = a + b\n    return sum_val\n\n# Call function\nx = add_numbers(10, 20)\nprint(x) # Outputs 30\n```"
        }
      },
      {
        id: "lists",
        title: "Lists & Tuples",
        juniorDesc: "Store shopping lists or lists of names in a single variable.",
        seniorDesc: "Perform slicing, indexing, and understand mutable lists vs immutable tuples.",
        juniorGreeting: "Hi Teacher! 📝 I want to store a list of 5 students in my program. Do I need 5 variables? What is a list, and how do we access items in it?",
        seniorGreeting: "Good day, Teacher! 💻 I am studying sequences. Can you explain list slicing `list[start:stop]`, and detail the difference between a list `[]` and a tuple `()`?",
        juniorMarkingGuide: "1. Define a list as a single variable holding multiple items.\n2. Introduce list brackets: `students = ['Ada', 'Obi', 'Ali']`.\n3. Explain zero-based indexing: `students[0]` returns 'Ada'.",
        seniorMarkingGuide: "1. Explain slicing: `nums[1:4]` returns items from index 1 up to index 3 (index 4 is excluded).\n2. Define mutability: lists are mutable (can append/delete), tuples are immutable (cannot be changed after creation).\n3. Demonstrate methods: `append()`, `insert()`, `pop()`.",
        studyNotes: {
          concept: "Lists are ordered, mutable sequences used to store collections of data. Tuples are ordered, immutable sequences.",
          formulas: [],
          steps: [
            "Create a list using square brackets: `my_list = [1, 2, 3]`.",
            "Create a tuple using parentheses: `my_tuple = (1, 2, 3)`.",
            "Access elements using indices (starts at 0, negative index starts from end `-1`).",
            "Slice sequences using `seq[start:stop:step]`."
          ],
          workedExample: "```python\nfruits = ['apple', 'banana', 'cherry', 'date']\n# Slicing from index 1 up to index 3\nprint(fruits[1:3]) # Outputs ['banana', 'cherry']\n\n# Try changing a tuple (will error)\ntup = (10, 20)\n# tup[0] = 5 # TypeError: 'tuple' object does not support item assignment\n```"
        }
      },
      {
        id: "dictionaries",
        title: "Dictionaries & Sets",
        juniorDesc: "Store key-value pairs like dictionary words and meanings.",
        seniorDesc: "Manage key-value mappings in dictionaries and set union/intersection.",
        juniorGreeting: "Hello Teacher! 📚 How do I map keys to values in Python, like matching a student's name to their exam score? What is a dictionary in coding?",
        seniorGreeting: "Good day, Teacher! 💻 We are studying mappings. Can you explain dictionary syntax `{}`, how to access/update values safely, and contrast dictionaries with sets?",
        juniorMarkingGuide: "1. Define a dictionary as a key-value mapping structure.\n2. Use key lookup: `scores['Chidi']` to retrieve the value.\n3. Add new keys: `scores['Obi'] = 90`.",
        seniorMarkingGuide: "1. Write dictionary: `student = {'name': 'Chidi', 'age': 15}`.\n2. Access keys safely using `.get('key', default)` to prevent crashes.\n3. Define a Set as an unordered collection of unique elements and demonstrate `.union()` and `.intersection()`.",
        studyNotes: {
          concept: "Dictionaries are mutable mappings storing data in key-value pairs. Sets are unordered collections of unique elements.",
          formulas: [],
          steps: [
            "Define a dictionary using curly braces with colons: `d = {'key': 'value'}`.",
            "Access values by key: `d['key']` or `d.get('key')`.",
            "Create a set using curly braces without colons: `s = {1, 2, 3}`.",
            "Use set operations: `s1.intersection(s2)` to find common elements."
          ],
          workedExample: "```python\nscores = {'Math': 85, 'English': 90}\n# Add a subject\nscores['Science'] = 95\n# Access safely\nprint(scores.get('History', 0)) # Outputs 0 because History is not a key\n```"
        }
      },
      {
        id: "file_handling",
        title: "File Handling (Read/Write)",
        juniorDesc: "Learn how to open and read text files using code.",
        seniorDesc: "Open, read, write, and close files using 'with' blocks.",
        juniorGreeting: "Hi Teacher! 📂 How does a program load text from a file saved on my hard drive? How do I write outputs back into a text file?",
        seniorGreeting: "Good day, Teacher! 🐍 I'm trying to read a log file. Can you explain the difference between 'w' and 'a' modes in `open()`, and why it's best to use `with open() as f`?",
        juniorMarkingGuide: "1. Define file handling: loading/saving files in coding.\n2. Explain the `open('file.txt', 'r')` function.\n3. Emphasize that files must be closed to prevent memory leaks.",
        seniorMarkingGuide: "1. Differentiate modes: 'r' (read), 'w' (write - overwrites file), 'a' (append - adds to end).\n2. Explain `with open(...)` automatically closes the file even if errors occur.\n3. Read lines using `f.readlines()` or iterate with a loop.",
        studyNotes: {
          concept: "File handling allows Python to interact with files on the disk. The `with` statement guarantees that resources are closed properly after execution.",
          formulas: [],
          steps: [
            "Use `with open('filename', 'mode') as file_obj:` to start.",
            "If mode is 'r', read content using `.read()` or `.readline()`.",
            "If mode is 'w' or 'a', write content using `.write(text)`.",
            "Indented block end handles closing automatically."
          ],
          workedExample: "```python\n# Write to a file\nwith open('notes.txt', 'w') as f:\n    f.write('PurpleSchool Python Class\\n')\n\n# Read from the file\nwith open('notes.txt', 'r') as f:\n    content = f.read()\n    print(content) # Outputs: PurpleSchool Python Class\n```"
        }
      },
      {
        id: "oop",
        title: "Object-Oriented Programming (OOP)",
        juniorDesc: "Learn about blueprint classes (e.g. Dog) and real objects (individual dogs).",
        seniorDesc: "Create classes, instantiate objects, use constructors (__init__), and understand inheritance.",
        juniorGreeting: "Hello Teacher! 🐕 I heard classes are blueprints to create objects. What is a class in Python, and how do we write attributes and actions inside it?",
        seniorGreeting: "Good day, Teacher! 💻 We are starting Object-Oriented Programming. Can you explain the `class` keyword, the constructor `__init__`, the purpose of `self`, and how inheritance works?",
        juniorMarkingGuide: "1. Define a class as a blueprint (like a mold for toy cars).\n2. Define an object as an instance made from the blueprint.\n3. Show how objects can have variables (color, speed) and actions (drive, brake).",
        seniorMarkingGuide: "1. Define `__init__` constructor: sets initial attributes when object is created.\n2. Explain `self`: represents the specific instance of the object calling the method.\n3. Show inheritance: `class Car(Vehicle):` inherits all methods from `Vehicle` parent class.",
        studyNotes: {
          concept: "Object-Oriented Programming is a programming paradigm based on the concept of 'objects' containing data (attributes) and code (methods).",
          formulas: [],
          steps: [
            "Declare a class using `class Name:`.",
            "Define the constructor `def __init__(self, params):` to set attributes.",
            "Define methods (functions inside class) with `self` as the first parameter.",
            "Instantiate the object: `obj = Name(args)`."
          ],
          workedExample: "```python\nclass Dog:\n    def __init__(self, name):\n        self.name = name\n    \n    def bark(self):\n        return f'{self.name} says Woof!'\n\nmy_dog = Dog('Rex')\nprint(my_dog.bark()) # Outputs 'Rex says Woof!'\n```"
        }
      },
      {
        id: "exceptions",
        title: "Exception Handling",
        juniorDesc: "Prevent program crashes when dividing by zero.",
        seniorDesc: "Understand try, except, finally blocks and custom exception raising.",
        juniorGreeting: "Hi Teacher! 💥 If my program divides by zero or reads a missing file, it crashes completely! How do I catch these errors and print a friendly warning instead?",
        seniorGreeting: "Good day, Teacher! 🐍 I'm learning error control. Can you explain `try`, `except Exception as e`, `else`, and `finally` blocks, and when to use `raise`?",
        juniorMarkingGuide: "1. Explain that errors (exceptions) halt code execution.\n2. Introduce `try:` block where code that might fail is run.\n3. Use `except:` block to catch the failure and print a warning.",
        seniorMarkingGuide: "1. Write exception block: `try ... except ZeroDivisionError: ...`.\n2. Explain `finally:` always runs regardless of whether an exception occurred.\n3. Demonstrate raising exceptions manually: `raise ValueError('Invalid input')`.",
        studyNotes: {
          concept: "Exception handling is the process of responding to occurrences of anomalies (errors) during code execution, preventing program crashes.",
          formulas: [],
          steps: [
            "Wrap risky code inside a `try:` block.",
            "Add one or more `except SpecificError:` blocks to catch errors.",
            "Add a `finally:` block for clean-up operations that must run (like closing files)."
          ],
          workedExample: "```python\ntry:\n    num = int('abc') # Will raise ValueError\nexcept ValueError:\n    print('Please enter numbers only!')\nfinally:\n    print('Execution done.')\n```"
        }
      },
      {
        id: "libraries",
        title: "Libraries and Modules",
        juniorDesc: "Import extra tools like math and random numbers into your code.",
        seniorDesc: "Import and use standard libraries like math, random, and datetime.",
        juniorGreeting: "Hello Teacher! 🎲 How do I generate random numbers in Python? Do I have to write the code myself, or are there pre-made tools I can import?",
        seniorGreeting: "Good day, Teacher! 💻 Can you explain how modules and packages work in Python, and show me how to import and use functions from the `math` and `random` libraries?",
        juniorMarkingGuide: "1. Define a module/library as a file containing pre-written code.\n2. Introduce `import random` statement.\n3. Use `random.randint(1, 10)` to get a random number between 1 and 10.",
        seniorMarkingGuide: "1. State import syntaxes: `import math`, `from math import sqrt`, `import numpy as np`.\n2. Demonstrate `math.sqrt()` and trigonometric functions.\n3. Explain how to create your own module (creating a `.py` file and importing it).",
        studyNotes: {
          concept: "Modules are single Python files containing code. Libraries are collections of modules. Importing them expands Python's capabilities.",
          formulas: [],
          steps: [
            "Use `import module_name` to load a library.",
            "Access functions using dot notation: `module_name.function()`.",
            "Use `from module_name import target` to import functions directly, eliminating dot notation."
          ],
          workedExample: "```python\nimport math\nfrom random import randint\n\n# Square root of 16\nprint(math.sqrt(16)) # Outputs 4.0\n# Random number between 1 and 6\nprint(randint(1, 6))\n```"
        }
      }
    ]
  },
  ai: {
    id: "ai",
    name: "Introductory AI",
    topics: [
      {
        id: "what_is_ai",
        title: "What is AI?",
        juniorDesc: "Learn how computers try to think and behave like smart humans.",
        seniorDesc: "Analyze Turing test, narrow vs general AI, and machine intelligence history.",
        juniorGreeting: "Hi Teacher! 🤖 What is Artificial Intelligence? Is it like a robot that has a brain? Can computers actually think like humans?",
        seniorGreeting: "Good day, Teacher! 🧠 We are starting AI studies. Can you explain the difference between Artificial Narrow Intelligence (ANI) and Artificial General Intelligence (AGI), and discuss the Turing Test?",
        juniorMarkingGuide: "1. Define AI as making computers smart enough to solve puzzles and recognize images.\n2. Explain that AI follows instructions and patterns, not actual human feelings.\n3. Give examples of AI (Siri, Netflix recommendations).",
        seniorMarkingGuide: "1. ANI: AI designed to solve a single specific task (e.g. playing chess, translation).\n2. AGI: AI that matches human cognitive abilities across all domains (theoretical).\n3. Turing Test: proposed by Alan Turing (1950) to evaluate if a machine can mimic human conversation well enough to fool an interrogator.",
        studyNotes: {
          concept: "Artificial Intelligence (AI) is the simulation of human intelligence processes by machines, especially computer systems.",
          formulas: [],
          steps: [
            "Artificial Narrow Intelligence (ANI): Specialist systems (like self-driving cars, voice assistants).",
            "Artificial General Intelligence (AGI): Generalist systems capable of human-level adaptability across any domain (still theoretical).",
            "Turing Test: If a human cannot tell the machine apart from another human in text chat, the machine passes."
          ],
          workedExample: "Is Chidi an AGI?\nNo, Chidi is a conversational model (NLP) representing Artificial Narrow Intelligence. It is specialized for educational Socratic dialogue but cannot do dishes, write code, or understand the physical world like a general human."
        }
      },
      {
        id: "ml_basics",
        title: "Machine Learning Basics",
        juniorDesc: "Learn how computers learn from examples (training data).",
        seniorDesc: "Compare Supervised, Unsupervised, and Reinforcement learning paradigms.",
        juniorGreeting: "Hello Teacher! 🐶 If I want a computer to recognize a dog, do I write rules for ears and tail, or is there another way to teach it?",
        seniorGreeting: "Good day, Teacher! 📊 We are studying machine learning. Can you explain the difference between Supervised (labeled data) and Unsupervised (unlabeled data) learning, and describe Reinforcement learning?",
        juniorMarkingGuide: "1. Explain that instead of writing rules, we feed the computer thousands of dog photos.\n2. Define training data (the photos used for learning).\n3. Explain that the computer identifies common patterns (features) itself.",
        seniorMarkingGuide: "1. Supervised Learning: model learns from labeled pairs: $(x_i, y_i)$ (e.g. house features and house prices).\n2. Unsupervised Learning: model finds hidden patterns in unlabeled data (clustering, e.g. customer segmentation).\n3. Reinforcement Learning: agent learns by trial and error in an environment, maximizing rewards (e.g. game playing).",
        studyNotes: {
          concept: "Machine Learning is a subset of AI that enables systems to automatically learn and improve from experience without being explicitly programmed.",
          formulas: [],
          steps: [
            "Supervised: Input -> Model -> Output compared to label. Adjust weights to minimize error.",
            "Unsupervised: Find clusters or groupings of similar features without labels.",
            "Reinforcement: State -> Action -> Reward. Agent updates policy to maximize cumulative reward."
          ],
          workedExample: "What type of ML is used in email spam filters?\nSupervised learning. The algorithm is trained on a labeled dataset containing emails marked as either 'Spam' or 'Inbox'. It maps email contents (features) to these labels."
        }
      },
      {
        id: "neural_networks",
        title: "Neural Networks",
        juniorDesc: "See how computers mimic brain cells to solve complex tasks.",
        seniorDesc: "Study network layers (input, hidden, output) and backpropagation weight updates.",
        juniorGreeting: "Hi Teacher! 🕸️ I read that AI uses things called 'neural networks' that work like human brain cells. What does a neural network look like, and how does it learn?",
        seniorGreeting: "Good day, Teacher! 🤖 We are studying artificial neural networks (ANN). Can you explain the roles of the input, hidden, and output layers, and explain backpropagation and gradient descent?",
        juniorMarkingGuide: "1. Explain that a neural network is made of layers of connected points (neurons).\n2. State that signals pass from input to output, getting stronger or weaker.\n3. Explain that learning is adjusting these connections (weights) until the correct output is reached.",
        seniorMarkingGuide: "1. Layers: Input (receives features), Hidden (extracts complex representations), Output (yields classification/regression).\n2. Node formula: $y = f(\\sum w_i x_i + b)$ where $f$ is activation function, $w$ is weight, $b$ is bias.\n3. Backpropagation: computing the gradient of the loss function and updating weights backwards using gradient descent to minimize error.",
        studyNotes: {
          concept: "Artificial Neural Networks are computational models inspired by the brain's biological structure. They consist of nodes that process inputs and pass them through activation functions.",
          formulas: [
            "Neuron Output: $a = f\\left(\\sum w_i x_i + b\\right)$ (where $f$ is activation, e.g. ReLU or Sigmoid)",
            "Weight Update: $w \\leftarrow w - \\alpha \\frac{\\partial L}{\\partial w}$ (where $\\alpha$ is learning rate)"
          ],
          steps: [
            "Forward Propagation: Pass input features forward through node layers; calculate prediction.",
            "Loss Calculation: Compare prediction with actual target label using a loss function (e.g. Mean Squared Error).",
            "Backward Propagation: Compute error gradients backward through the layers.",
            "Weight Adjustment: Update weights using gradient descent to reduce loss."
          ],
          workedExample: "Explain the purpose of an activation function (like ReLU).\nActivation functions introduce non-linearity into the network. Without them, a neural network is just a linear regression model, incapable of learning complex patterns like image shapes or language semantics."
        }
      },
      {
        id: "deep_learning",
        title: "Deep Learning & Vision",
        juniorDesc: "Find out how self-driving cars 'see' obstacles on the road.",
        seniorDesc: "Understand Convolutional Neural Networks (CNNs) and pixel feature detection.",
        juniorGreeting: "Hello Teacher! 🚗 How does a self-driving car recognize a stop sign or a pedestrian? How does a computer convert a photo into numbers it can read?",
        seniorGreeting: "Good day, Teacher! 📷 We are studying computer vision. Can you explain how Convolutional Neural Networks (CNNs) extract features using filters, pooling, and fully connected layers?",
        juniorMarkingGuide: "1. Explain that photos are grids of numbers representing color brightness (pixels).\n2. Explain that the computer scans pixels to find edges, lines, and shapes.\n3. State that combining these shapes lets the AI identify complex objects.",
        seniorMarkingGuide: "1. Convolution: sliding a small matrix (filter) across pixels to detect edges and textures.\n2. Pooling (Max Pooling): reducing matrix dimensions by keeping only maximum values, improving computational speed.\n3. Fully Connected Layer: final layers that classify the extracted features into object categories (e.g., 'Stop Sign').",
        studyNotes: {
          concept: "Deep learning is a subfield of ML dealing with neural networks with many layers (deep). Computer vision uses CNNs to identify spatial hierarchies of features in images.",
          formulas: [],
          steps: [
            "Input Image: Represented as a 3D matrix (width, height, RGB channels).",
            "Convolution Layers: Apply filters to extract low-level features (edges) and high-level features (faces).",
            "Max Pooling: Reduce spatial dimensions while retaining critical features.",
            "Fully Connected: Flatten features and feed into standard ANN for classification."
          ],
          workedExample: "Why are CNNs better for images than standard dense networks?\nStandard networks treat images as a flat list of pixels, destroying spatial relationships. CNNs slide filters across pixel groups, preserving spatial features (like eyes and noses always being close on a face)."
        }
      },
      {
        id: "nlp",
        title: "Natural Language Processing (NLP)",
        juniorDesc: "Learn how computers read text and chat with humans.",
        seniorDesc: "Study tokenization, word embeddings (word2vec), and text classification.",
        juniorGreeting: "Hi Teacher! 💬 How does a computer read and understand human language? How does it know that 'happy' and 'joyful' mean similar things?",
        seniorGreeting: "Good day, Teacher! 📝 We are studying Natural Language Processing. Can you explain tokenization, what a word embedding (vector) is, and how computers use coordinates to represent word meanings?",
        juniorMarkingGuide: "1. Define NLP as teaching computers to read and write text.\n2. Explain tokenization: breaking sentences into single words or chunks.\n3. Explain that the computer matches words to coordinates in a mathematical map where similar words sit close together.",
        seniorMarkingGuide: "1. Tokenization: converting string to list of integer IDs representing word sub-units.\n2. Word Embeddings: mapping words to high-dimensional vectors (e.g. 512 dimensions) where cosine similarity represents semantic closeness.\n3. Vector math: show the classic relationship: $\\vec{\\text{King}} - \\vec{\\text{Man}} + \\vec{\\text{Woman}} \\approx \\vec{\\text{Queen}}$.",
        studyNotes: {
          concept: "NLP combines linguistics and computer science to help machines process, understand, and generate human languages.",
          formulas: [
            "Cosine Similarity: $\\cos(\\theta) = \\frac{\\vec{u} \\cdot \\vec{v}}{\\|\\vec{u}\\| \\|\\vec{v}\\|}$"
          ],
          steps: [
            "Tokenization: Split input string into numerical tokens.",
            "Embedding Lookup: Convert tokens into high-dimensional vectors.",
            "Semantic Processing: Run vectors through attention layers (Transformers) to resolve context.",
            "Text Generation: Output token probabilities and decode them back into text."
          ],
          workedExample: "How does a word vector represent similarity?\nWords are mapped to points in a high-dimensional space. Words used in similar contexts (like 'cat' and 'dog') will have vectors pointing in nearly identical directions, yielding a high cosine similarity of close to 1.0."
        }
      },
      {
        id: "decision_trees",
        title: "Decision Trees & Random Forests",
        juniorDesc: "Solve classification problems using simple flowcharts (Yes/No questions).",
        seniorDesc: "Study splitting criteria (Information Gain, Gini Impurity) and Random Forest ensembles.",
        juniorGreeting: "Hello Teacher! 🌳 I want to write a program that plays '20 Questions' using a flowchart. How does an AI build a flowchart from data?",
        seniorGreeting: "Good day, Teacher! 📊 We are studying decision trees. Can you explain how nodes are split using Entropy and Information Gain, and explain how a Random Forest improves accuracy by combining trees?",
        juniorMarkingGuide: "1. Define a decision tree as a flowchart where each box asks a Yes/No question.\n2. Explain that the tree splits data step-by-step until it reaches an answer (leaf node).\n3. State that asking the most helpful question first makes the tree short and fast.",
        seniorMarkingGuide: "1. State Gini Impurity formula: $G = 1 - \\sum p_i^2$ or Entropy: $H(S) = -\\sum p_i \\log_2 p_i$.\n2. Define Information Gain: difference in entropy before and after a split.\n3. Explain Random Forest: an ensemble model that merges predictions from multiple independent decision trees (bootstrap aggregating).",
        studyNotes: {
          concept: "A Decision Tree is a flowchart-like structure where internal nodes represent tests on attributes, branches represent test outcomes, and leaf nodes represent final classes.",
          formulas: [
            "Entropy: $H(S) = -\\sum_{i=1}^{c} p_i \\log_2 p_i$",
            "Gini Impurity: $I_G(p) = 1 - \\sum_{i=1}^{J} p_i^2$"
          ],
          steps: [
            "Calculate initial impurity/entropy of the dataset.",
            "For each attribute, calculate the impurity of the split it produces.",
            "Choose the attribute with the highest Information Gain to split the node.",
            "Repeat recursively until stopping criteria (max depth) are met."
          ],
          workedExample: "Calculate entropy of a dataset with 4 positive and 4 negative items.\nProportion of positive $p_+ = 0.5$, negative $p_- = 0.5$.\n$H(S) = -(0.5 \\log_2 0.5 + 0.5 \\log_2 0.5) = -(-0.5 - 0.5) = 1.0$ (maximum uncertainty)."
        }
      },
      {
        id: "ai_ethics",
        title: "Ethics in AI",
        juniorDesc: "Learn why AI must be fair, safe, and protect privacy.",
        seniorDesc: "Analyze algorithmic bias, data privacy, and societal impacts of automation.",
        juniorGreeting: "Hi Teacher! ⚖️ If an AI makes decisions, can it be biased or treat people unfairly? How does an AI learn bad habits, and who is responsible?",
        seniorGreeting: "Good day, Teacher! 🛡️ We are discussing AI Ethics. Can you explain the sources of algorithmic bias, discuss the privacy challenges of large training datasets, and address automation job displacement?",
        juniorMarkingGuide: "1. Explain that AI learns from human data, so it copies human biases.\n2. State that AI must be tested to ensure fairness for everyone.\n3. Emphasize that programmers must set safety rules for their AI.",
        seniorMarkingGuide: "1. Algorithmic Bias: occurs when training data is unrepresentative or contains historical human prejudices (garbage in, garbage out).\n2. Data Privacy: scrapers collecting personal web data without explicit consent (violating regulations like GDPR).\n3. Solutions: model auditing, transparent datasets, human-in-the-loop validation.",
        studyNotes: {
          concept: "AI ethics is a system of moral principles and techniques intended to guide the development and responsible use of artificial intelligence.",
          formulas: [],
          steps: [
            "Identify bias sources: unrepresentative datasets, flawed labeling, or target variables.",
            "Audit algorithms for fairness across diverse user demographics.",
            "Implement security layers to scrub personal identifiable information (PII) before model training."
          ],
          workedExample: "Give an example of algorithmic bias in recruitment AI.\nIf a hiring AI is trained on historical resumes of a company that mostly hired men in the past, the AI will learn that being male is a feature associated with success. It will then biasedly penalize female resumes, even if their qualifications are identical."
        }
      },
      {
        id: "search_algorithms",
        title: "AI Search Algorithms",
        juniorDesc: "Solve maze paths using step-by-step algorithms.",
        seniorDesc: "Compare Breadth-First, Depth-First, and A* heuristic pathfinding.",
        juniorGreeting: "Hello Teacher! 🧩 How does a GPS calculate the fastest route to a destination? How does a computer find its way out of a maze?",
        seniorGreeting: "Good day, Teacher! 📍 We are studying pathfinding. Can you explain how Depth-First Search (DFS) differs from Breadth-First Search (BFS), and explain how A* uses a heuristic function $f(n) = g(n) + h(n)$?",
        juniorMarkingGuide: "1. Explain that GPS maps are networks of connected points (nodes).\n2. Differentiate explore-wide (checking all adjacent streets) from explore-deep (going down one street to the end).\n3. State that estimating remaining distance helps find the path faster.",
        seniorMarkingGuide: "1. BFS: explores level-by-level using queue (FIFO), guarantees shortest path. DFS: explores deep using stack (LIFO).\n2. A* Search: heuristic pathfinding. Total cost $f(n) = g(n) + h(n)$ where $g(n)$ is actual cost from start, $h(n)$ is estimated cost to goal (heuristic).\n3. Heuristic must be admissible: it must never overestimate the actual cost to reach the goal.",
        studyNotes: {
          concept: "Search algorithms are methods used by AI agents to navigate state spaces and find paths to goal states.",
          formulas: [
            "A* Heuristic Evaluation: $f(n) = g(n) + h(n)$"
          ],
          steps: [
            "BFS: Push start node to queue. Loop: pop node, check if goal, push unvisited neighbors to queue. (Guarantees shortest path).",
            "DFS: Push start node to stack. Loop: pop node, explore depth-first.",
            "A*: Keep nodes in priority queue sorted by $f(n)$. Always expand the node with the lowest $f(n)$ value."
          ],
          workedExample: "Calculate A* cost $f(n)$ for a node where actual travel distance $g(n) = 15\\text{km}$, and straight-line heuristic estimate $h(n) = 20\\text{km}$.\n$f(n) = g(n) + h(n) = 15 + 20 = 35\\text{km}$."
        }
      },
      {
        id: "reinforcement_learning",
        title: "Reinforcement Learning",
        juniorDesc: "Train virtual dogs using rewards and punishments (trial and error).",
        seniorDesc: "Study Q-learning, rewards, environments, and agent action policies.",
        juniorGreeting: "Hi Teacher! 🎮 How does an AI learn to play complex video games from scratch? Does it study game guides, or does it learn by playing?",
        seniorGreeting: "Good day, Teacher! 🤖 We are studying reinforcement learning. Can you explain the roles of the Agent, Environment, State, Action, and Reward, and outline the Bellman Equation?",
        juniorMarkingGuide: "1. Explain that the AI (agent) learns by trial and error in a game (environment).\n2. State that it gets positive points (rewards) for winning, negative (punishment) for losing.\n3. Explain that after millions of runs, it learns the best actions to maximize points.",
        seniorMarkingGuide: "1. Define elements: Agent (learner), Environment (world), State ($s$), Action ($a$), Reward ($r$).\n2. Explain Q-learning: updating value of action-state pairs in a table to learn the optimal policy.\n3. State Bellman Equation: $Q(s, a) = R(s, a) + \\gamma \\max_{a'} Q(s', a')$ where $\\gamma$ is discount factor.",
        studyNotes: {
          concept: "Reinforcement learning is an area of ML concerned with how intelligent agents take actions in an environment to maximize cumulative reward.",
          formulas: [
            "Bellman Equation: $Q(s, a) = R(s, a) + \\gamma \\max_{a'} Q(s', a')$ (where $\\gamma \\in [0,1]$ is discount factor)"
          ],
          steps: [
            "Agent observes current state $s$.",
            "Agent selects action $a$ based on policy (exploitation vs exploration).",
            "Environment transitions to state $s'$ and gives reward $r$.",
            "Agent updates its Q-value index for $(s, a)$ using the Bellman formula."
          ],
          workedExample: "What is the purpose of the discount factor ($\\gamma$) in the Bellman equation?\nThe discount factor determines the importance of future rewards. A value close to 0 makes the agent short-sighted (focuses only on immediate rewards), while a value close to 1 makes it long-sighted (weights future success heavily)."
        }
      },
      {
        id: "generative_ai",
        title: "Generative AI & LLMs",
        juniorDesc: "Learn how chatbots like Chidi write essays and draw images.",
        seniorDesc: "Study the Transformer architecture, self-attention, and token probability decoding.",
        juniorGreeting: "Hello Teacher! ✍️ How do AI chat models write essays that sound so human? Does the AI copy-paste text from the web, or does it write word by word?",
        seniorGreeting: "Good day, Teacher! 🤖 We are studying Large Language Models. Can you explain the Transformer architecture, how the self-attention mechanism weights words in context, and how tokens are predicted?",
        juniorMarkingGuide: "1. Explain that the AI predicts the next word based on patterns it learned from millions of books.\n2. State that the AI does not copy-paste; it generates text dynamically word-by-word.\n3. Mention that it evaluates which words fit best in the context of the conversation.",
        seniorMarkingGuide: "1. State the key innovation: Transformer (Vaswani et al., 2017) using Self-Attention.\n2. Explain Self-Attention: allows the model to calculate relationships between all words in a sentence simultaneously (e.g. linking 'it' to 'dog' in 'The dog didn't cross the street because it was tired').\n3. Explain decoding: predicting probability distributions over the vocabulary for the next token and selecting based on temperature/top-p parameters.",
        studyNotes: {
          concept: "Generative AI creates new content (text, images) by learning statistical distributions from massive datasets. Large Language Models (LLMs) are built on the Transformer architecture.",
          formulas: [
            "Attention Formula: $\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V$"
          ],
          steps: [
            "Input sentence is converted to token IDs and mapped to embeddings.",
            "Positional encodings are added to preserve word order.",
            "Self-attention layers compute weights representing semantic connections between all tokens.",
            "Feed-forward layers output log probabilities, selecting the next token to append to context."
          ],
          workedExample: "Why is self-attention better than previous recurrent networks (RNNs)?\nRNNs process text sequentially, word-by-word, often losing track of long-range dependencies. Self-attention processes all words in parallel, capturing connections between distant words instantly."
        }
      }
    ]
  }
};
