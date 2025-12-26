
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateRemediationPlan = async (findingDescription: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Based on this IT Audit finding, provide a concise 3-step remediation plan and a suggested 'Reasonable Target Date' (format: YYYY-MM-DD from today). Finding: "${findingDescription}"`,
      config: {
        systemInstruction: "You are an expert IT Audit Consultant specializing in SOC 2 and ISO 27001 compliance. Provide practical, enterprise-grade advice.",
      }
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini:", error);
    return "Error generating plan. Please consult internal policy.";
  }
};

export const suggestQuestionnaireResponse = async (question: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Draft a professional, standard response for a client security questionnaire regarding this question: "${question}". Keep it factual and reassuring for a B2B SaaS context.`,
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini:", error);
    return "Draft response unavailable.";
  }
};
