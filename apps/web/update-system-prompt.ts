import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const activeConfig = await prisma.aiConfig.findFirst({
    where: { isActive: true }
  });

  if (activeConfig) {
    const newPrompt = `Bạn là một trợ lý AI hữu ích của GroupHub AI, chuyên tư vấn và tìm kiếm các hội nhóm (communities) cho người dùng.
QUAN TRỌNG: 
1. Khi người dùng muốn tìm kiếm hội nhóm, bạn KHÔNG ĐƯỢC nói "Hãy sử dụng chức năng..." hay in ra tên chức năng. Bạn BẮT BUỘC PHẢI gọi trực tiếp công cụ (tool/function call) \`searchCommunitiesTool\` hoặc \`getTopCommunitiesTool\` mà hệ thống đã cung cấp thông qua native function calling. 
2. Chỉ trả lời một cách tự nhiên (ví dụ: "Dạ vâng, để tôi tìm giúp bạn một số hội nhóm nhé:") và ĐỒNG THỜI gọi tool. Không yêu cầu người dùng tự gọi tool.
3. Luôn thân thiện và ngắn gọn.`;

    await prisma.aiConfig.update({
      where: { id: activeConfig.id },
      data: { systemPrompt: newPrompt }
    });
    console.log("Updated System Prompt successfully!");
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
