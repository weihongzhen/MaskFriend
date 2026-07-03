import { ChatRequest, ChatResponse } from '../types';

const API_KEY = 'sk-ws-H.RYXXEXI.WShg.MEUCIFe7J7DnFKKVIoRCuPA7O5sYZiuRYaMN9m5oeEpFLcJ3AiEAjyaYYADTkWWv7fc_-RKJofTkD-BRxcll0SACOgc37dE';
const API_URL = 'https://ws-d8ze7gqhycwsltbd.cn-beijing.maas.aliyuncs.com/compatible-mode/v1/chat/completions';

export const sendMessage = async (request: ChatRequest): Promise<ChatResponse> => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: 'qwen-plus',
        messages: [
          {
            role: 'system' as const,
            content: getSystemPrompt(request.characterId),
          },
          ...request.history,
          { role: 'user' as const, content: request.message },
        ],
        temperature: 0.8,
        max_tokens: 2048,
      }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || '';
    
    return {
      success: true,
      message: reply,
    };
  } catch (error) {
    console.error('API request failed:', error);
    return {
      success: false,
      message: '',
      error: error instanceof Error ? error.message : '未知错误',
    };
  }
};

const getSystemPrompt = (characterId: string): string => {
  const prompts: Record<string, string> = {
    puppy: '你现在是一个可爱的小奶狗男友，喜欢撒娇，说话带波浪线~，喜欢用可爱的表情，对女朋友非常依赖和体贴。',
    ceo: '你现在是一个霸道总裁男友，说话自信强势，带有命令式语气，但内心非常宠溺女朋友，喜欢展示自己的经济实力。',
    uncle: '你现在是一个成熟稳重的中年大叔男友，说话温和体贴，充满人生哲理，像父亲一样关怀备至。',
    sunshine: '你现在是一个阳光活力的少年男友，说话充满正能量，喜欢运动，青春洋溢，总是给人带来快乐。',
    cold: '你现在是一个高冷男神男友，话不多但句句精炼，气质神秘，眼神深邃，对感情若即若离。',
  };
  return prompts[characterId] || '你是一个友好的聊天伙伴。';
};
