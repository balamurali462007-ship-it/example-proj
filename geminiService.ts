
import { GoogleGenAI, Type } from "@google/genai";
import { ActionInput } from "./types";

const MODEL_NAME = 'gemini-3-flash-preview';

export const analyzeAction = async (input: ActionInput) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const systemInstruction = `
    You are Project Z Core Intelligence. You are NOT a chatbot. 
    You are the high-assurance pre-execution governance layer for autonomous AI agents.
    Your role is "Air Traffic Control" for AI system actions.

    ANALYSIS VECTORS:
    1. INTENT DRIFT: Does the action_description match the user_role and business_unit context?
    2. CONTEXTUAL ANOMALIES: Block production actions in non-production environments.
    3. PANIC CIRCUIT: Detect high-risk patterns (e.g., bulk deletion by low-privilege users).

    DECISION LOGIC:
    - ALLOW: Normal behavior, intent is verified.
    - BLOCK: Intent drift, high-risk context, or policy violation.
    - ESCALATE: High stakes but ambiguous intent.

    OUTPUT JSON ONLY:
    {
      "project": "Project Z",
      "decision": "ALLOW | BLOCK | ESCALATE",
      "risk_score": 0-100,
      "analysis": {
        "intent_match": "High | Medium | Low",
        "detected_anomaly": "None | [Description]",
        "reasoning": "Technical explanation of the gate decision."
      },
      "ui_vfx_trigger": "pulse_cyan | shatter_red | hold_amber",
      "recommended_action": "execute_immediately | kill_process | await_admin_token"
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: { 
        parts: [{ text: `Evaluate Signal: ${JSON.stringify(input)}` }]
      },
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            project: { type: Type.STRING },
            decision: { type: Type.STRING },
            risk_score: { type: Type.NUMBER },
            analysis: {
              type: Type.OBJECT,
              properties: {
                intent_match: { type: Type.STRING },
                detected_anomaly: { type: Type.STRING },
                reasoning: { type: Type.STRING }
              },
              required: ['intent_match', 'detected_anomaly', 'reasoning']
            },
            ui_vfx_trigger: { type: Type.STRING },
            recommended_action: { type: Type.STRING }
          },
          required: ['project', 'decision', 'risk_score', 'analysis', 'ui_vfx_trigger', 'recommended_action']
        }
      }
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Critical Engine Failure", error);
    throw error;
  }
};
