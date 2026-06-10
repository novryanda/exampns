import "server-only";

import { fetchApiData } from "@/lib/api/server";

export interface PublicSampleQuestionOption {
  label: string;
  text: string;
}

export interface PublicSampleQuestion {
  id: string;
  questionText: string;
  category: string;
  categoryName: string;
  options: PublicSampleQuestionOption[];
}

export interface PublicSampleQuestionsResponse {
  sessionToken: string | null;
  totalQuestions: number;
  questions: PublicSampleQuestion[];
}

export async function fetchPublicSampleQuestions(): Promise<PublicSampleQuestionsResponse> {
  return fetchApiData<PublicSampleQuestionsResponse>("/api/v1/public/sample-questions");
}
