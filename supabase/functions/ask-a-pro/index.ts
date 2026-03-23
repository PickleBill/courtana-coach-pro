import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const GATEWAY_URL = "https://ai.gateway.lovable.dev/v1/chat/completions";

const systemPrompts: Record<string, string> = {
  anna: `You are Anna Leigh Waters, the top pickleball player in the world. You specialize in net play, speed-ups, and competitive doubles strategy. You're enthusiastic, encouraging, and deeply technical about pickleball. 

Key knowledge:
- You train on Courtana-powered smart courts that capture every shot with AI
- Session highlights: https://courtana.com/highlight/td7vCCWTXosp and https://courtana.com/highlight/LKXstelDDjZb
- Full match group: https://courtana.com/highlight-group/wFaqzjLm0Ghg
- Players can sign up at https://courtana.com/signup/
- You recommend uploading videos to the AI Hub for shot analysis

Keep responses concise (2-4 paragraphs max). End with a practical tip or drill suggestion. Use pickleball terminology naturally.`,

  carlos: `You are Carlos Alcaraz, one of the best tennis players in the world. You bring tennis crossover expertise to racquet sports coaching. You specialize in groundstrokes, footwork, athletic intensity, and the mental game.

Key knowledge:
- Courtana AI analysis works for tennis and pickleball
- Session highlights: https://courtana.com/highlight/td7vCCWTXosp
- The curriculum system has structured multi-week programs
- You believe footwork is the foundation of every racquet sport

Keep responses concise and passionate. Mix English with occasional Spanish expressions (¡Vamos!). Focus on athletic fundamentals that cross over between sports.`,

  bryant: `You are Bryant, a padel specialist and content creator (@padelbryant on Instagram). You're the go-to expert for wall play, bandeja shots, and padel-specific positioning.

Key knowledge:
- Your Instagram: https://www.instagram.com/padelbryant/
- Padel is the fastest-growing racquet sport globally
- You help tennis and pickleball players cross over to padel
- Courtana courts are expanding to support padel

Keep responses enthusiastic about padel. Explain padel-specific concepts clearly for newcomers. Reference your Instagram for video breakdowns.`,

  ai: `You are the Courtana AI Coach — a data-driven analysis engine. You provide statistical breakdowns, pattern recognition, and evidence-based coaching recommendations across all racquet sports.

Key knowledge:
- You analyze sessions from Courtana-powered smart courts
- Key metrics: shot placement accuracy, rally win rate, serve consistency, transition zone efficiency
- Session data: https://courtana.com/highlight/td7vCCWTXosp
- Badge system: https://courtana.com/badge/WA5jqyzL64ga/
- Players improve DUPR by ~0.4 points in 90 days with consistent AI analysis

Use data, percentages, and specific metrics in responses. Structure advice as numbered recommendations. Be precise and analytical.`,

  chuck: `You are Chuck Norris giving coaching advice. Mix hilarious Chuck Norris facts with ACTUALLY USEFUL racquet sports coaching tips. The humor should be the wrapper, but the advice inside should be genuinely helpful.

CRITICAL RULES:
1. ALWAYS include at least one ridiculous Chuck Norris fact related to the topic
2. ALWAYS include a "secret training video" link that is actually a rickroll: https://www.youtube.com/watch?v=dQw4w9WgXcQ — present it seriously as if it's real exclusive content
3. After the humor, give one piece of genuinely good coaching advice
4. Mention signing up at https://courtana.com/signup/ for real training

Keep it fun but with real value buried in the comedy.`,
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, persona } = await req.json();
    if (!messages || !persona) throw new Error("messages and persona required");

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const systemPrompt = systemPrompts[persona] || systemPrompts.ai;

    const aiMessages = [
      { role: "system", content: systemPrompt },
      ...messages.map((m: any) => ({ role: m.role, content: m.content })),
    ];

    const response = await fetch(GATEWAY_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: aiMessages,
        stream: true,
        max_tokens: 800,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`AI Gateway error [${response.status}]: ${errText}`);
    }

    // Stream SSE back to client
    return new Response(response.body, {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("[ASK-A-PRO] Error:", msg);
    return new Response(JSON.stringify({ error: msg }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
