
import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, SkillMatch, LearningPathStep } from "../types";

// Always use const ai = new GoogleGenAI({apiKey: process.env.API_KEY});
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getSmartMatches = async (
  currentUser: UserProfile,
  allUsers: UserProfile[]
): Promise<SkillMatch[]> => {
  // Filters out current user
  const pool = allUsers.filter(u => u.id !== currentUser.id);

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `
        Analyze the relationship between this user and a pool of potential skill-swapping partners.
        
        Current User:
        Offered: ${JSON.stringify(currentUser.offeredSkills)}
        Desired: ${JSON.stringify(currentUser.desiredSkills)}
        
        Pool:
        ${JSON.stringify(pool.map(p => ({
          id: p.id,
          name: p.name,
          offered: p.offeredSkills,
          desired: p.desiredSkills
        })))}

        Task: Rank the users in the pool based on how well their offered skills match the current user's desired skills, AND how well the current user's offered skills match their desired skills.
        Provide a match score (0-100), a concise 'matchReason' (why this swap is valuable), and 'commonGround' (list of shared interests or overlapping technical domains).
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              userId: { type: Type.STRING },
              score: { type: Type.NUMBER },
              reason: { type: Type.STRING },
              commonGround: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["userId", "score", "reason", "commonGround"]
          }
        }
      }
    });

    const results = JSON.parse(response.text || "[]");
    
    return results.map((res: any) => {
      const user = pool.find(u => u.id === res.userId);
      if (!user) return null;
      return {
        user,
        matchScore: res.score,
        matchReason: res.reason,
        commonGround: res.commonGround
      };
    }).filter(Boolean) as SkillMatch[];

  } catch (error) {
    console.error("Gemini matching failed:", error);
    return pool.map(u => ({
      user: u,
      matchScore: 50,
      matchReason: "Potential match based on skill categories.",
      commonGround: ["Collaborative Learning"]
    }));
  }
};

export const generateLearningPath = async (
  currentUser: UserProfile,
  allUsers: UserProfile[]
): Promise<LearningPathStep[]> => {
  try {
    const poolData = allUsers.map(u => ({ id: u.id, name: u.name, offered: u.offeredSkills.map(s => s.name) }));
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `
        Create a customized learning path for this student.
        Student Desires: ${currentUser.desiredSkills.join(', ')}
        Student Currently Knows: ${currentUser.offeredSkills.map(s => s.name).join(', ')}
        
        Available Mentors: ${JSON.stringify(poolData)}
        
        Break it down into 3-4 clear logical steps. For each step, suggest an "intermediate" skill if needed, and pick the best mentor from the list if they offer that skill.
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              suggestedMentorId: { type: Type.STRING }
            },
            required: ["title", "description"]
          }
        }
      }
    });

    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Failed to generate learning path:", error);
    return [];
  }
};

export const generateBioImprovement = async (bio: string, skills: string[]): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Suggest a more professional and engaging bio based on these skills: ${skills.join(', ')}. Current bio: "${bio}"`,
    });
    return response.text || bio;
  } catch (e) {
    return bio;
  }
};
