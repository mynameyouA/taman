import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";
import fs from "fs";
import path from "path";
import os from "os";

// API Endpoint sinh âm thanh giọng đọc Tiên Ông Thầy Sinh (Microsoft NamMinh Neural - Giọng Nam Bộ chuẩn 100%)
// Sử dụng SSML tinh chỉnh nhịp thở, độ trầm (-5Hz) và tốc độ khoan thai (-10%)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { text } = body;

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Missing text parameter" }, { status: 400 });
    }

    // Làm sạch ký tự lạ, emoji, markdown
    const cleanText = text
      .replace(/[#*_~`>[\]()]/g, " ")
      .replace(/[\u{1F300}-\u{1F9FF}]/gu, "")
      .replace(/\s+/g, " ")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;")
      .trim();

    if (!cleanText) {
      return NextResponse.json({ error: "Text is empty after sanitization" }, { status: 400 });
    }

    const tempDir = os.tmpdir();
    const uniqueId = `thay_sinh_nam_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    const textFile = path.join(tempDir, `${uniqueId}.txt`);
    const audioFile = path.join(tempDir, `${uniqueId}.mp3`);
    const scriptFile = path.join(tempDir, `${uniqueId}.py`);

    fs.writeFileSync(textFile, cleanText, "utf8");

    // Script Python sinh âm thanh giọng Nam Bộ thuần túy (vi-VN-NamMinhNeural)
    const pythonScript = `
import asyncio, edge_tts

async def run():
    with open(r'''${textFile}''', 'r', encoding='utf-8') as f:
        content = f.read()
    
    c = edge_tts.Communicate(content, 'vi-VN-NamMinhNeural', rate='-8%', pitch='-4Hz')
    await c.save(r'''${audioFile}''')

asyncio.run(run())
`;

    fs.writeFileSync(scriptFile, pythonScript, "utf8");

    // Thực thi Python với python 3.11 của hệ thống
    const pythonBin = `C:\\Users\\DS\\AppData\\Roaming\\uv\\python\\cpython-3.11-windows-x86_64-none\\python.exe`;

    await new Promise<void>((resolve, reject) => {
      exec(`"${pythonBin}" "${scriptFile}"`, { timeout: 35000 }, (error, stdout, stderr) => {
        if (error) {
          console.error("Python NamMinh error:", stderr || error.message);
          reject(error);
        } else {
          resolve();
        }
      });
    });

    if (!fs.existsSync(audioFile) || fs.statSync(audioFile).size === 0) {
      throw new Error("NamMinh audio generation returned empty");
    }

    const audioBuffer = fs.readFileSync(audioFile);

    // Dọn dẹp file tạm
    try {
      fs.unlinkSync(textFile);
      fs.unlinkSync(scriptFile);
      fs.unlinkSync(audioFile);
    } catch {}

    return new NextResponse(audioBuffer, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Length": audioBuffer.length.toString(),
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=43200",
      },
    });
  } catch (error: any) {
    console.error("TTS API error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
