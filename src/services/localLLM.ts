import { CreateMLCEngine } from "@mlc-ai/web-llm";

export type ProgressCallback = (progressText: string, percent: number) => void;

class LocalLLMService {
  private engine: any = null;
  private currentModelId = "Qwen2.5-1.5B-Instruct-q4f16_1"; // 950MB model, perfect for browser deployment

  /**
   * Check if the user's browser supports WebGPU.
   */
  async isWebGPUSupported(): Promise<boolean> {
    const nav = navigator as any;
    if (!nav.gpu) {
      return false;
    }
    try {
      const adapter = await nav.gpu.requestAdapter();
      return adapter !== null;
    } catch (e) {
      return false;
    }
  }

  /**
   * Loads the model weights. Downloads on first use and caches locally in IndexedDB.
   */
  async loadModel(onProgress: ProgressCallback): Promise<void> {
    if (this.engine) {
      return; // Already initialized
    }

    try {
      this.engine = await CreateMLCEngine(
        this.currentModelId,
        {
          initProgressCallback: (report: any) => {
            const percent = Math.round((report.progress || 0) * 100);
            onProgress(report.text, percent);
          }
        }
      );
    } catch (error) {
      console.error("Failed to load local model:", error);
      this.engine = null;
      throw error;
    }
  }

  /**
   * Streams a chat completion response from the local model.
   */
  async chat(
    messages: Array<{ role: "system" | "user" | "assistant"; content: string }>,
    onToken: (token: string) => void
  ): Promise<string> {
    if (!this.engine) {
      throw new Error("AI engine is not loaded. Call loadModel() first.");
    }

    let fullText = "";
    try {
      const chunks = await this.engine.chat.completions.create({
        messages,
        stream: true,
      });

      for await (const chunk of chunks) {
        const token = chunk.choices[0]?.delta?.content || "";
        fullText += token;
        onToken(token);
      }
    } catch (error) {
      console.error("Local inference error:", error);
      throw error;
    }

    return fullText;
  }

  /**
   * Unload the model to free GPU memory.
   */
  async unloadModel(): Promise<void> {
    if (this.engine) {
      await this.engine.unload();
      this.engine = null;
    }
  }
}

export const localLLM = new LocalLLMService();
