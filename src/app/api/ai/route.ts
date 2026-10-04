import { NextResponse, type NextRequest } from "next/server";
import { answerQuestion, AI_SUGGESTED_QUESTIONS } from "@/lib/ai";
import { isValidLocale } from "@/i18n/server";
import { defaultLocale } from "@/i18n/config";

export async function POST(request: NextRequest) {
  let body: { question?: string; locale?: string };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request", message: "Expected a JSON body with a \"question\" field." },
      { status: 400 },
    );
  }

  const question = (body.question ?? "").trim();
  if (question.length < 2) {
    return NextResponse.json(
      { error: "Question too short", message: "Please ask a question of at least two characters." },
      { status: 400 },
    );
  }

  const locale = isValidLocale(body.locale) ? body.locale : defaultLocale;
  const result = answerQuestion(question, locale);

  return NextResponse.json({
    question,
    locale,
    ...result,
    suggested: AI_SUGGESTED_QUESTIONS[locale] ?? AI_SUGGESTED_QUESTIONS[defaultLocale],
  });
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const rawLocale = searchParams.get("locale");
  const locale = isValidLocale(rawLocale) ? rawLocale : defaultLocale;
  return NextResponse.json({
    questions: AI_SUGGESTED_QUESTIONS[locale] ?? AI_SUGGESTED_QUESTIONS[defaultLocale],
  });
}
