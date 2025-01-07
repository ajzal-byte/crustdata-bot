import { NextResponse } from "next/server";
import qa from "@/data/qa.json";

export async function POST(request: Request) {
  const { question } = await request.json();

  const lowercaseQuestion = question.toLowerCase();
  const matchedQA = qa.find((item) =>
    item.question.toLowerCase().includes(lowercaseQuestion)
  );

  const answer = matchedQA
    ? matchedQA.answer
    : "Sorry, I don't understand. Please refer to Crustdata's API documentation.";

  return NextResponse.json({ answer });
}
