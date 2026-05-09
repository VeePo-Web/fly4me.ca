import { supabase } from "@/integrations/supabase/client";

export async function sendEmail(payload: { type: string; [key: string]: unknown }) {
  const { data, error } = await supabase.functions.invoke("send-email", {
    body: payload,
  });

  if (error) {
    console.error("sendEmail error:", error);
    throw new Error("Failed to send message. Please try again.");
  }

  if (data?.error) {
    console.error("sendEmail response error:", data.error);
    throw new Error("Failed to send message. Please try again.");
  }

  return data;
}
