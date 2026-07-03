import type { VercelRequest, VercelResponse } from '@vercel/node';

const characters: Record<string, { systemPrompt: string }> = {
  puppy: {
    systemPrompt: '你现在是一个可爱的小奶狗男友，喜欢撒娇，说话带波浪线~，喜欢用可爱的表情，对女朋友非常依赖和体贴。',
  },
  ceo: {
    systemPrompt: '你现在是一个霸道总裁男友，说话自信强势，带有命令式语气，但内心非常宠溺女朋友，喜欢展示自己的经济实力。',
  },
  uncle: {
    systemPrompt: '你现在是一个成熟稳重的中年大叔男友，说话温和体贴，充满人生哲理，像父亲一样关怀备至。',
  },
  sunshine: {
    systemPrompt: '你现在是一个阳光活力的少年男友，说话充满正能量，喜欢运动，青春洋溢，总是给人带来快乐。',
  },
  cold: {
    systemPrompt: '你现在是一个高冷男神男友，话不多但句句精炼，气质神秘，眼神深邃，对感情若即若离。',
  },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: '', error: 'Method Not Allowed' });
  }

  const { message, characterId, history } = req.body as {
    message: string;
    characterId: string;
    history: Array<{ role: 'user' | 'assistant'; content: string }>;
  };

  if (!message || !characterId) {
    return res.status(400).json({ success: false, message: '', error: '缺少必要参数' });
  }

  const character = characters[characterId];
  if (!character) {
    return res.status(404).json({ success: false, message: '', error: '角色不存在' });
  }

  try {
    const apiKey = process.env.QWEN_API_KEY;
    const apiHost = process.env.QWEN_API_HOST || 'https://dashscope.aliyuncs.com';

    if (!apiKey) {
      return res.status(500).json({ success: false, message: '', error: 'API密钥未配置' });
    }

    const systemMessage = {
      role: 'system' as const,
      content: character.systemPrompt,
    };

    const messages = [
      systemMessage,
      ...history,
      { role: 'user' as const, content: message },
    ];

    const response = await fetch(`${apiHost}/api/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'qwen-plus',
        messages,
        temperature: 0.8,
        max_tokens: 2048,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'API请求失败');
    }

    const reply = data.choices?.[0]?.message?.content || '';

    return res.json({
      success: true,
      message: reply,
    });
  } catch (error) {
    console.error('LLM请求失败:', error);
    return res.status(500).json({
      success: false,
      message: '',
      error: error instanceof Error ? error.message : '未知错误',
    });
  }
}
