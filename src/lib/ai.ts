import { GoogleGenerativeAI } from "@google/generative-ai";
import { GenerateIdeasInput } from "./validation";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export interface GeneratedIdea {
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  timeWeeks: string;
  stack: string[];
  roadmap: string[];
  domain: string;
  companies: {
    name: string;
    emoji: string;
    description: string;
  }[];
}

function buildPrompt(
  skillLevel: string,
  language: string,
  interests: string[]
): string {
  return `You are a senior developer and startup mentor with deep knowledge of the current venture-funded startup ecosystem.

Generate exactly 8 unique project ideas for a ${skillLevel}-level developer.

Developer profile:
- Skill level: ${skillLevel}
- Preferred language: ${language}
- Interests: ${interests.join(", ")}

Requirements for each idea:
1. Must be inspired by a real funded startup or real-world problem
2. Must be achievable by a solo developer within the stated time
3. Must be genuinely impressive as a portfolio piece
4. The roadmap must be concrete and actionable steps
5. Tech stack must use ${language} where possible
6. Difficulty must match the ${skillLevel} level

Return ONLY a valid JSON array. No markdown. No explanation. No backticks. Just raw JSON.

JSON structure:
[
  {
    "title": "Clear specific project name",
    "description": "2 sentences: what it does and why it matters",
    "difficulty": "${skillLevel}",
    "timeWeeks": "X-Y",
    "stack": ["Tech1", "Tech2", "Tech3", "Tech4"],
    "roadmap": [
      "Phase 1: description",
      "Phase 2: description",
      "Phase 3: description",
      "Phase 4: description",
      "Phase 5: description"
    ],
    "domain": "One of: AI/ML, Developer Tools, SaaS, E-commerce, Productivity, Social, FinTech, Health Tech, Games, Education",
    "companies": [
      {
        "name": "Real company name",
        "emoji": "relevant emoji",
        "description": "What they built and funding info"
      }
    ]
  }
]`;
}

function parseIdeas(text: string): GeneratedIdea[] {
  const cleaned = text
    .replace(/```json\n?/g, "")
    .replace(/```\n?/g, "")
    .trim();

  const parsed = JSON.parse(cleaned);

  if (!Array.isArray(parsed)) {
    throw new Error("AI response was not an array");
  }

  return parsed.map((idea: GeneratedIdea, index: number) => {
    if (!idea.title || !idea.description || !idea.stack || !idea.roadmap) {
      throw new Error(`Idea at index ${index} is missing required fields`);
    }
    return idea;
  });
}

export async function generateProjectIdeas(
  input: GenerateIdeasInput
): Promise<GeneratedIdea[]> {
  const { skillLevel, language, interests } = input;

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
      temperature: 0.8,
      maxOutputTokens: 4096,
    },
  });

  const prompt = buildPrompt(skillLevel, language, interests);

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  return parseIdeas(text);
}