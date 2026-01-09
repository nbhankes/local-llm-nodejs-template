export async function callLLM(prompt) {
  try {
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3.2:latest',  // ← Changed from 'llama3.2:3b'
        prompt: prompt,
        stream: false
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Check if response exists
    if (!data.response) {
      throw new Error('No response field in API result. Full data: ' + JSON.stringify(data));
    }

    // Estimate token usage
    const inputTokens = Math.ceil(prompt.split(' ').length * 1.3);
    const outputTokens = Math.ceil(data.response.split(' ').length * 1.3);

    return {
      response: data.response,
      usage: {
        input_tokens: inputTokens,
        output_tokens: outputTokens
      }
    };
  } catch (error) {
    console.error('Fetch error:', error.message);
    throw error;
  }
}