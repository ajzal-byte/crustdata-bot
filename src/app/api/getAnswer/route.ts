import { NextResponse } from "next/server";
import stringSimilarity from "string-similarity";
import qa from "@/data/qa.json";

const SIMILARITY_THRESHOLD = 0.7;

const greetings = ["hi", "hello", "hey", "what's up", "howdy", "greetings"];
const greetingResponse =
  "Hi there! I'm here to help with Crustdata API-related queries. How can I assist you today?";

const keyPhrases = {
  "search for people": ["search", "people", "title", "company", "location"],
  "region values": ["region", "values", "standard"],
  "screener/person/search API": [
    "screener",
    "person",
    "search",
    "api",
    "filter",
    "values",
  ],
  "search/enrichment": ["search", "enrichment", "email", "gmail"],
};

export async function POST(request: Request) {
  const { question } = await request.json();

  const lowercaseQuestion = question.toLowerCase();

  // Check for greetings
  if (greetings.some((greeting) => lowercaseQuestion.includes(greeting))) {
    return NextResponse.json({ answer: greetingResponse });
  }

  // Exact matching with key phrases
  for (const [key, phrases] of Object.entries(keyPhrases)) {
    if (phrases.every((phrase) => lowercaseQuestion.includes(phrase))) {
      const matchedQA = qa.find((item) =>
        item.question.toLowerCase().includes(key)
      );
      if (matchedQA) {
        return NextResponse.json({ answer: matchedQA.answer });
      }
    }
  }

  // Similarity matching
  const similarities = qa.map((item) => ({
    question: item.question,
    similarity: stringSimilarity.compareTwoStrings(
      lowercaseQuestion,
      item.question.toLowerCase()
    ),
  }));

  const bestMatch = similarities.reduce((best, current) =>
    current.similarity > best.similarity ? current : best
  );

  if (bestMatch.similarity >= SIMILARITY_THRESHOLD) {
    const matchedQA = qa.find((item) => item.question === bestMatch.question);
    return NextResponse.json({ answer: matchedQA!.answer });
  }

  // Default response
  return NextResponse.json({
    answer:
      "Sorry, I don't understand. Please refer to Crustdata's API documentation or try rephrasing your question.",
  });
}
