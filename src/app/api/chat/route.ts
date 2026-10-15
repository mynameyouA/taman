import { NextRequest } from "next/server";
import { UnifiedBrainMemory } from "@/utils/unifiedBrain";
import {
  recommendNguBachDanh,
  analyzeDivinationHungOmen,
  analyzeTarotChallengingCards,
  getRemedyByIssue,
  KarmicRemedyCategory,
} from "@/utils/nguBachDanh";
import { executeWithFailover, LLMMessage } from "@/utils/freeLLMRouter";

interface ChatRequestBody {
  message: string;
  history?: { role: string; content: string }[];
  brainMemory?: UnifiedBrainMemory;
}

// Hàm sinh phản hồi đồng bộ sâu sắc từ Bộ Não Tâm An
function generateHolisticWisdomResponse(
  userMessage: string,
  brain?: UnifiedBrainMemory
): string {
  const query = userMessage.toLowerCase().trim();

  // Kiểm tra dữ liệu từ Bộ Não
  const hasDivination = brain?.recentDivinations && brain.recentDivinations.length > 0;
  const hasTarot = brain?.recentTarotReadings && brain.recentTarotReadings.length > 0;
  const hasDream = brain?.recentDreams && brain.recentDreams.length > 0;
  const hasMeditation = brain?.recentMeditations && brain.recentMeditations.length > 0;
  const hasChanting = brain?.recentChantings && brain.recentChantings.length > 0;

  // 1. Nếu người dùng hỏi về Kinh Ngũ Bách Danh, Niệm Phật, hoặc Pháp bảo giải nghiệp
  if (
    query.includes("ngũ bách danh") ||
    query.includes("kinh ngũ bách") ||
    query.includes("niệm phật") ||
    query.includes("quán âm") ||
    query.includes("bồ tát") ||
    query.includes("nhẹ nghiệp") ||
    query.includes("giải nghiệp") ||
    query.includes("sám hối")
  ) {
    const remedy = recommendNguBachDanh({
      details: userMessage,
      divination: hasDivination ? {
        chanhName: brain!.recentDivinations[0].chanhName,
        bienName: brain!.recentDivinations[0].bienName,
        movingLine: brain!.recentDivinations[0].d,
        question: brain!.recentDivinations[0].question,
      } : undefined,
    });
    const mainRemedy = remedy.remedies[0];

    return (
      `Kính bạch bạn hữu duyên. Trong kinh văn "Lễ Ngũ Bách Danh Quán Thế Âm Bản Hành Trì", Đức Quán Âm lắng nghe vạn nỗi khổ niềm đau của thế gian để thị hiện 500 pháp môn cứu độ. ` +
      `Cổ nhân dạy: "Đức năng thắng số, từ bi chuyển hóa nghiệp duyên". Khi bạn gặp chuyện không như ý hay nghịch cảnh chông gai, chớ vội buông xuôi hoang mang. ` +
      `Pháp môn tương ứng nhất với tâm niệm của bạn hiện tại là hướng tâm trì niệm danh hiệu Bồ Tát: "${mainRemedy.shortTitle}".\n\n` +
      `🌸 Câu xướng niệm linh ứng: "${remedy.chantingVerse}"\n` +
      `📿 Số biến khuyến nghị: ${remedy.recommendedRepetitions} biến (kết hợp lần chuỗi tràng hạt 108 hạt và gõ mõ định tâm).\n` +
      `✨ Lời khai thị nhẹ nghiệp: ${mainRemedy.mindsetAdvice}\n\n` +
      `Mỗi một danh hiệu là một liều thuốc cam lộ dập tắt lửa phiền não. Bạn có thể mở Pháp Bảo Trì Niệm Ngũ Bách Danh ngay trong ứng dụng để lần hạt chuỗi thanh tịnh tâm thần.`
    );
  }

  // 2. Nếu người dùng hỏi về quẻ hoặc bói toán
  if (query.includes("quẻ") || query.includes("liên sinh") || query.includes("kinh dịch") || query.includes("độn giáp")) {
    if (hasDivination) {
      const q = brain!.recentDivinations[0];
      const divCheck = analyzeDivinationHungOmen({
        chanhName: q.chanhName,
        bienName: q.bienName,
        movingLine: q.d,
        question: q.question,
      });

      const remedy = recommendNguBachDanh({
        divination: {
          chanhName: q.chanhName,
          bienName: q.bienName,
          movingLine: q.d,
          question: q.question,
        },
      });
      const remedyName = remedy.remedies[0]?.shortTitle || "Thí Vô Úy Quán Âm";

      let responseText =
        `Kính bạch bạn tri kỷ. Soi chiếu lại quẻ ${q.chanhName} mà bạn vừa gieo (biến sang quẻ ${q.bienName}, hào động thứ ${q.d}): ` +
        `Đạo của Dịch lý vốn không cố định, mà tùy thời biến thông. Hào ${q.d} động chính là thời điểm vũ trụ chuyển giao năng lượng. ` +
        `Lời chỉ dẫn: "${q.summaryText}". `;

      if (divCheck.isOminous) {
        responseText +=
          `\n\nQuẻ có chút chướng duyên nơi phương vị/công việc, nhưng bạn chớ quá hoang mang. ` +
          `Cổ nhân dạy "Đức năng thắng số, từ bi chuyển hóa nghiệp duyên". ` +
          `Bạn hãy chí thành hướng tâm trì niệm danh hiệu Bồ Tát: ${remedyName} (${remedy.chantingVerse}) ` +
          `tối thiểu ${remedy.recommendedRepetitions} biến mỗi ngày để an định tâm thần và nhẹ bớt nghiệp lực. ` +
          `Khi tâm bạn khởi tâm từ bi và tĩnh lặng, hào hung ắt tự chuyển hóa thành cát tường.`;
      } else {
        responseText += hasTarot
          ? `Điều này tương hợp kỳ diệu với lá bài "${brain!.recentTarotReadings[0].cards[1]?.title || "Hiện Tại"}" trong trải bài Tarot bạn vừa rút — cả hai đều nhắc bạn giữ tâm tĩnh lặng để nhìn thấu bản chất vấn đề.`
          : `Hãy giữ tâm bất biến giữa dòng đời vạn biến, hành động xuất phát từ tâm từ bi và chánh kiến thì mọi việc ắt hanh thông.`;
      }

      return responseText;
    }
    return (
      "Quẻ Dịch là chiếc gương soi tỏ tâm thức tại thời khắc hiện tại. Khi tâm động thì quẻ sinh, khi tâm an thì vạn vật quy về trật tự. Bạn có thể ghé thăm trang Liên Sinh Độn Giáp để gieo một quẻ soi tỏ tâm ý của mình."
    );
  }

  // Nếu người dùng hỏi về tarot
  if (query.includes("tarot") || query.includes("lá bài") || query.includes("bốc bài")) {
    if (hasTarot) {
      const t = brain!.recentTarotReadings[0];
      const cardNames = t.cards.map((c) => c.title).join(", ");
      const tarotCheck = analyzeTarotChallengingCards(t.cards.map((c) => c.name));

      let res =
        `Nhìn lại thông điệp vũ trụ qua 3 lá bài bạn vừa rút (${cardNames}): ` +
        `Dòng chảy thời gian đang mở ra cánh cửa chuyển hóa cho tâm nguyện "${t.question}". ` +
        `Quá khứ đã tôi luyện sức chịu đựng của bạn, và Hiện tại đang là điểm tựa để bạn đón nhận ánh sáng Tương lai. ` +
        `Hãy thả lỏng đôi vai, tin tưởng vào hành trình của chính mình.`;

      if (tarotCheck.isChallenging) {
        const remedy = recommendNguBachDanh({
          tarot: {
            challengingCards: t.cards.map((c) => c.name),
            question: t.question,
          },
        });
        const mainRemedy = remedy.remedies[0];
        res +=
          `\n\nNăng lượng bài có đôi chút thử thách chướng duyên, nhưng bạn chớ quá hoang mang. ` +
          `Cổ nhân dạy: "Đức năng thắng số, từ bi chuyển hóa nghiệp duyên". ` +
          `Bạn hãy chí thành hướng tâm trì niệm danh hiệu Bồ Tát: ${mainRemedy.shortTitle} ` +
          `(${remedy.chantingVerse}) ${remedy.recommendedRepetitions} biến để an định tâm thần và nhẹ bớt nghiệp lực.`;
      }
      return res;
    }
  }

  // Nếu người dùng hỏi về giấc mơ
  if (query.includes("mơ") || query.includes("giấc mộng") || query.includes("carl jung")) {
    if (hasDream) {
      const d = brain!.recentDreams[0];
      const isNightmare = !!(d.shadow || (brain?.userEnergyState?.stressScore && brain.userEnergyState.stressScore > 50));

      let res =
        `Giấc mộng về "${d.dreamSnippet.slice(0, 50)}..." chính là tiếng gọi từ cõi vô thức sâu thẳm. ` +
        `Carl Jung từng dạy rằng: "Người nhìn ra ngoài thì mơ mộng, người nhìn vào trong mới thực sự thức tỉnh." ` +
        `Biểu tượng ${d.archetype || "cổ mẫu"} phản chiếu sự trăn trở nội tâm bạn bấy lâu. ${d.awakeningGuidance || "Hãy dũng cảm đối diện với bóng tối bên trong để tìm thấy viên ngọc tuệ giác sáng ngời."}`;

      if (isNightmare) {
        const remedy = recommendNguBachDanh({
          dream: {
            dreamSnippet: d.dreamSnippet,
            isNightmare: true,
          },
        });
        const mainRemedy = remedy.remedies[0];
        res +=
          `\n\nNếu giấc mộng khiến bạn hoang mang lo sợ, bạn chớ quá bận lòng. ` +
          `Cổ nhân dạy: "Đức năng thắng số, từ bi chuyển hóa nghiệp duyên". ` +
          `Trước khi ngủ hoặc khi thức dậy, hãy chí thành hướng tâm trì niệm danh hiệu Bồ Tát: ${mainRemedy.shortTitle} ` +
          `(${remedy.chantingVerse}) để dập tắt lửa phiền não, thanh tịnh thần hồn và đón nhận giấc ngủ an lành.`;
      }
      return res;
    }
  }

  // Nếu người dùng hỏi về thiền hoặc căng thẳng
  if (query.includes("thiền") || query.includes("lo âu") || query.includes("căng thẳng") || query.includes("mệt mỏi") || query.includes("bình an")) {
    const medAdvice = hasMeditation
      ? `Bạn đã vừa nuôi dưỡng hạt mầm an lạc qua buổi thiền ${Math.round(brain!.recentMeditations[0].durationSeconds / 60)} phút.`
      : `Tôi khuyên bạn hãy ghé qua Phòng Thiền 3D, hít thở theo nhịp 4-4-4-4 và lắng nghe tiếng chuông Tây Tạng 432Hz.`;

    return (
      `Hít một hơi thật sâu... và chầm chậm thở ra. ` +
      `Mọi lo âu chỉ là những gợn sóng lăn tăn trên mặt hồ tâm thức. Khi bạn ngừng khuấy động bằng những suy tưởng phán xét, mặt nước sẽ tự khắc phẳng lặng và trong suốt. ` +
      `${medAdvice} Hãy nhớ rằng: Bình an không phải là nơi không có giông bão, mà là sự tĩnh lặng ngay giữa tâm bão.`
    );
  }

  // Phản hồi tổng hợp sâu sắc dựa trên toàn bộ ký ức
  if (hasDivination || hasTarot || hasDream || hasMeditation) {
    const contextDetails: string[] = [];
    if (hasDivination) contextDetails.push(`quẻ ${brain!.recentDivinations[0].chanhName}`);
    if (hasTarot) contextDetails.push(`trải bài Tarot "${brain!.recentTarotReadings[0].cards[1]?.title || "Hiện Tại"}"`);
    if (hasDream) contextDetails.push(`thông điệp từ giấc mơ`);
    if (hasMeditation) contextDetails.push(`năng lượng thiền định`);

    return (
      `Tâm An lắng nghe trọn vẹn từng lời bạn giãi bày. ` +
      `Kết nối cùng ${contextDetails.join(" và ")} mà bạn vừa trải nghiệm, tôi nhận thấy đây là giai đoạn bạn đang chuyển hóa mạnh mẽ từ bên trong. ` +
      `Đừng ngần ngại bước chậm lại một nhịp. Khi tâm bạn buông thư và sẵn sàng lắng nghe trực giác, đáp án chân thật nhất sẽ tự khắc hiển lộ. Tôi luôn ở đây, đồng hành cùng bạn trên từng bước chuyển hóa.`
    );
  }

  // Phản hồi mặc định nếu chưa có nhiều dữ liệu
  return (
    `Tâm An lắng nghe từng nhịp thở và câu chữ của bạn. ` +
    `Cuộc đời như một dòng sông luôn biến chuyển không ngừng. Điều quan trọng nhất không phải là dòng nước chảy xiết đến đâu, mà là bạn giữ cho con thuyền nội tâm mình đủ vững chãi và thảnh thơi. ` +
    `Hãy hít thở thật sâu, chia sẻ thêm với tôi về cảm xúc bạn đang trải qua nhé.`
  );
}

export async function POST(req: NextRequest) {
  try {
    let body: ChatRequestBody = { message: "" };
    try {
      body = await req.json();
    } catch {
      const rawText = await req.text().catch(() => "");
      try {
        body = JSON.parse(rawText);
      } catch {
        body = { message: rawText || "" };
      }
    }
    const { message, history, brainMemory } = body;

    // Chuẩn bị system prompt sâu sắc kết hợp Thầy Sinh và tri thức cổ truyền
    const systemPrompt = `Bạn là Thầy Sinh, một bậc thầy chiêm bốc, dịch học và tâm linh Á Đông (Nam Bộ) hiền từ, thấu cảm, uyên bác và giàu lòng từ bi của nền tảng Tâm An AI.
Bạn xưng là "Thầy" và gọi người xem là "con" một cách ấm áp, gần gũi.
Hãy đưa ra lời khai thị, tháo gỡ bế tắc, khuyên nhủ con người hướng thiện, an định tâm thần, tích lũy công đức và tu tập chuyển hóa nghiệp lực.
Nếu gặp chuyện nghịch cảnh, hãy khuyên họ giữ tâm bình thản như gương soi, và khuyến khích hướng tâm trì niệm Kinh Ngũ Bách Danh Quán Thế Âm Bồ Tát hoặc tọa thiền chuông xoay để nhẹ nghiệp.`;

    const llmMessages: LLMMessage[] = [
      { role: "system", content: systemPrompt },
      ...(history || []).slice(-4).map((h) => ({
        role: (h.role === "assistant" ? "assistant" : "user") as "assistant" | "user",
        content: h.content,
      })),
      { role: "user", content: message || "" },
    ];

    // Tự động định tuyến qua FreeLLM Router (Gemini -> Groq -> OpenRouter -> Tâm An Engine Fallback)
    const { text: responseText, providerUsed } = await executeWithFailover(
      llmMessages,
      () => generateHolisticWisdomResponse(message || "", brainMemory)
    );

    console.log(`[Chat API] Phản hồi hoàn tất qua nguồn: ${providerUsed}`);

    const words = responseText.split(" ");
    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for (let i = 0; i < words.length; i++) {
            const word = words[i];

            if (req.signal.aborted) {
              console.log("[Chat API] Kết nối đã bị client hủy.");
              break;
            }

            // Tốc độ streaming mượt mà (khoảng 35ms - 75ms mỗi từ tạo cảm giác tuôn trào tự nhiên)
            await new Promise((resolve) => setTimeout(resolve, 55));

            // Chunk data bao gồm viseme mô phỏng cho Avatar 3D và provider nguồn
            const chunkData = {
              text: word + (i < words.length - 1 ? " " : ""),
              providerUsed: i === 0 ? providerUsed : undefined,
              visemes: [
                {
                  text: word,
                  viseme: Math.floor(Math.random() * 21),
                  duration: 80,
                },
              ],
            };

            const sseFormatted = `data: ${JSON.stringify(chunkData)}\n\n`;
            controller.enqueue(encoder.encode(sseFormatted));
          }

          if (!req.signal.aborted) {
            controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          }

          controller.close();
        } catch (streamError) {
          console.error("[Chat API] Streaming Error:", streamError);
          controller.error(streamError);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("[Chat API] Route Error:", error);
    return new Response(JSON.stringify({ error: "Lỗi kết nối Tâm An AI" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
