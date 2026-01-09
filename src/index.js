import { callLLM } from './llmCall.js';

async function main() {
  console.log('🤖 Making a test call to local LLM (Llama 3.2)...\n');

  try {
    const result = await callLLM('Tell me a fun fact about space in one sentence.');
    
    console.log('📝 Response:', result.response);
    console.log('\n📊 Token Usage (estimated):');
    console.log(`   Input tokens:  ${result.usage.input_tokens}`);
    console.log(`   Output tokens: ${result.usage.output_tokens}`);
    console.log(`   Total tokens:  ${result.usage.input_tokens + result.usage.output_tokens}`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('\nMake sure Ollama is running! Start it with: ollama serve');
    process.exit(1);
  }
}

main();