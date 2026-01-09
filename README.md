# Local LLM Node.js Quickstart

A minimal Node.js starter project demonstrating how to call a locally-hosted LLM using Ollama and track token usage. Perfect for learning the basics of integrating AI into JavaScript applications without API costs or cloud dependencies.

## Prerequisites

- Node.js (v18 or higher)
- Ollama installed on your machine

## Setup Instructions

### 1. Install Ollama

**Download and install Ollama:**

1. Go to https://ollama.com/download
2. Download for your operating system (Windows/Mac/Linux)
3. Run the installer
4. Ollama will start automatically on Windows/Mac

**Verify Ollama is installed:**

```bash
ollama --version
```

You should see something like: `ollama version is 0.1.23`

### 2. Verify Ollama is Running

**Check if the Ollama service is active:**

```bash
curl http://localhost:11434
```

You should see: `Ollama is running`

**If Ollama is NOT running:**

- On Windows/Mac: Ollama usually starts automatically. Check Task Manager (Windows) or Activity Monitor (Mac) for an "Ollama" process.
- If not running, start it manually:

```bash
ollama serve
```

Keep this terminal window open.

### 3. Check Installed Models

**List all downloaded models:**

```bash
ollama list
```

**Expected output:**

```
NAME               ID              SIZE      MODIFIED
llama3.2:latest    a80c4f17acd5    2.0 GB    2 days ago
phi4:latest        ac896e5b8b34    9.1 GB    1 week ago
```

**If you have NO models installed, download one:**

**Recommended models:**

```bash
# Lightweight and fast (2GB)
ollama pull llama3.2:latest

# Or larger and more capable (9GB)
ollama pull phi4:latest

# Other options:
ollama pull llama3.2:1b    # Even smaller (1.3GB)
ollama pull gemma2:2b      # Google's model (1.6GB)
ollama pull mistral:latest # Popular alternative (4.1GB)
```

Wait for the download to complete (shows progress bar).

### 4. Test Your Model

**Test Ollama directly before running the app:**

```bash
ollama run llama3.2:latest
```

Type a message and press Enter. If you get a response, everything is working!

Type `/bye` to exit the chat.

### 5. Getting started with the template

Navigate to your project directory:

```bash
cd local-llm-nodejs-template
```

### 6. Configure the Model

**Open `src/llmCall.js` and verify the model name matches what you have installed.**

The model name in the code:

```javascript
model: 'llama3.2:latest',  // Must match output from 'ollama list'
```

**If you want to use a different model**, change this line to match exactly what you see in `ollama list`.

For example, to use phi4:

```javascript
model: 'phi4:latest',
```

## Running the Application

Make sure Ollama is running, then execute:

```bash
node src/index.js
```

Or use the npm script:

```bash
npm start
```

## Example Output

```
🤖 Making a test call to local LLM (Llama 3.2)...

📝 Response: The Andromeda galaxy, our closest galactic neighbor, is approaching us at a speed of approximately 250,000 miles per hour and is expected to collide with the Milky Way in around 4 billion years.

📊 Token Usage (estimated):
   Input tokens:  13
   Output tokens: 43
   Total tokens:  56
```

## What It Does

The application will:

1. Send a test prompt to your local LLM (via Ollama)
2. Receive a response
3. Display the response text
4. Show estimated token usage:
   - Input tokens (tokens in your prompt)
   - Output tokens (tokens in the response)
   - Total tokens used

**Note:** Token counts are estimates based on word count, not exact like cloud APIs provide.

## Customizing the Prompt

To test with different prompts, edit `src/index.js`:

```javascript
const result = await callLLM("Your custom prompt here");
```

## Switching Models

You have multiple models installed. To switch:

1. Check available models: `ollama list`
2. Edit `src/llmCall.js` and change the model name
3. Run the script again

**Model comparison:**

- `llama3.2:latest` (2GB) - Fast, good for most tasks
- `phi4:latest` (9GB) - More capable, slower, better reasoning

## File Structure

```
local-agent-practice/
├── package.json          # Node.js configuration
├── .gitignore           # Files to ignore in git
├── README.md            # This file
└── src/
    ├── index.js         # Main entry point
    └── llmCall.js       # Ollama API call handler
```

## Advantages of Local LLMs

✅ **Completely free** - No API costs  
✅ **Private** - Data never leaves your machine  
✅ **Offline** - Works without internet  
✅ **Fast** - No network latency  
✅ **Full control** - Choose any model you want

## Limitations

❌ **Less capable** than largest cloud models (GPT-4, Claude Opus)  
❌ **Hardware dependent** - Performance varies by CPU/GPU  
❌ **Disk space** - Models are 1-10GB each  
❌ **Estimated tokens** - Not as precise as cloud API counts

## Deployment Options

Running this application in production requires hosting both your Node.js application AND Ollama on a server.

### Option 1: Development Only (Current Setup)

**What you have now:**

- Ollama runs on your laptop
- Node.js script runs locally
- Perfect for learning and testing

**Cost:** Free  
**Use case:** Personal development, learning, testing

---

### Option 2: Single Server Deployment

**Architecture:**

```
VPS Server
├── Ollama (running as service)
└── Node.js app (calls local Ollama)
```

**Best for:**

- Personal projects
- Internal tools
- Low-traffic applications

**Hosting providers:**

**CPU-based servers (cheaper, slower inference):**

- **DigitalOcean Droplets** - $12/month (4GB RAM)
- **Linode** - $12/month (4GB RAM)
- **Vultr** - $12/month (4GB RAM)
- **Hetzner** - €9/month (4GB RAM, Europe)

**GPU-based servers (expensive, fast inference):**

- **Paperspace** - $8+/month
- **AWS EC2 with GPU** - $0.50-3/hour
- **DigitalOcean GPU Droplets** - $30+/month
- **RunPod** - $0.20-1/hour (pay as you go)

**Setup on VPS:**

1. Rent a server (minimum 4GB RAM, 20GB disk)
2. SSH into your server
3. Install Ollama: `curl -fsSL https://ollama.com/install.sh | sh`
4. Download model: `ollama pull llama3.2:latest`
5. Install Node.js
6. Clone your repository
7. Run your app: `node src/index.js`

**To keep it running 24/7:**

```bash
# Install PM2 process manager
npm install -g pm2

# Start your app with PM2
pm2 start src/index.js --name "llm-app"

# Make it restart on server reboot
pm2 startup
pm2 save
```

**Cost:** $12-50+/month depending on specs

**Pros:**

- Full control
- Predictable costs
- Data stays on your server
- Can run 24/7

**Cons:**

- You manage everything
- Need server administration skills
- Must handle updates and security

---

### Option 3: PaaS with Ollama

**Architecture:**

```
Cloud Platform (Railway/Render/Fly.io)
├── Ollama (in container)
└── Node.js app
```

**Platforms that support Docker (needed for Ollama):**

- **Railway** - $5/month minimum, usage-based
- **Render** - $7+/month
- **Fly.io** - Free tier, then usage-based
- **Google Cloud Run** - Pay per use
- **AWS ECS** - Pay per use

**Setup on Railway (example):**

1. Create a `Dockerfile` in your project root:

```dockerfile
FROM ollama/ollama:latest

# Install Node.js
RUN apt-get update && apt-get install -y nodejs npm curl

# Copy your app
WORKDIR /app
COPY package*.json ./
COPY src ./src

# Install dependencies
RUN npm install

# Download model (this happens at build time)
RUN ollama serve & \
    sleep 5 && \
    ollama pull llama3.2:latest

# Start both Ollama and your app
CMD ollama serve & \
    sleep 5 && \
    node src/index.js
```

2. Push to GitHub
3. Connect Railway to your repository
4. Deploy automatically

**Cost:** $7-25/month typically

**Pros:**

- Easier than managing VPS
- Auto-deployment from Git
- Automatic HTTPS
- Better developer experience

**Cons:**

- More expensive than raw VPS at scale
- Less control than VPS
- Container size limits may apply

---

### Option 4: Split Architecture (API + Frontend)

**Architecture:**

```
User → Frontend (Netlify/Vercel) → Your API (VPS with Ollama) → Local LLM
```

**Best for:**

- Web applications
- Multiple clients accessing same LLM
- When you want a separate frontend

**Setup:**

1. Deploy frontend (React/Vue/etc) to Netlify/Vercel (free)
2. Build an Express.js API that wraps your Ollama calls
3. Deploy API to VPS or Railway
4. Frontend makes requests to your API

**Example Express.js wrapper:**

```javascript
import express from "express";
import { callLLM } from "./llmCall.js";

const app = express();
app.use(express.json());

app.post("/api/generate", async (req, res) => {
  try {
    const result = await callLLM(req.body.prompt);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000);
```

**Cost:**

- Frontend: Free (Netlify/Vercel)
- Backend API: $12-50/month (VPS) or $7-25/month (PaaS)

---

### Option 5: Hybrid Cloud + Local

**Architecture:**

```
User → Your App → Routes to either:
                  ├── Ollama (for simple queries)
                  └── Claude/GPT API (for complex queries)
```

**Best for:**

- Cost optimization
- Balancing quality and price
- High-volume applications

**Implementation:**
Add routing logic to choose which LLM based on query complexity:

```javascript
async function smartLLMCall(prompt, complexity = "simple") {
  if (complexity === "simple") {
    return await callOllama(prompt); // Free, local
  } else {
    return await callClaudeAPI(prompt); // Paid, better quality
  }
}
```

**Cost:** Variable, optimized based on usage

---

## Deployment Decision Tree

**Choose your deployment based on:**

1. **Just learning or personal use?**
   → Keep running locally (what you have now)
2. **Need 24/7 availability?**
   → Deploy to VPS ($12+/month)
3. **Want easy deployment?**
   → Use Railway/Render ($7-25/month)
4. **Building a web app?**
   → Split architecture (Frontend free, Backend $12+/month)
5. **Need fast inference?**
   → Get GPU server ($30+/month) or use cloud APIs instead
6. **High volume + budget conscious?**
   → Hybrid approach (local + API)

## Cost Comparison

**For a service running 24/7:**

| Option              | Monthly Cost | Setup Complexity | Performance |
| ------------------- | ------------ | ---------------- | ----------- |
| Local (your laptop) | $0           | Easy             | Medium      |
| CPU VPS             | $12          | Medium           | Medium      |
| GPU VPS             | $30-100      | Medium           | Fast        |
| Railway/Render      | $15-40       | Easy             | Medium      |
| AWS/GCP Serverless  | $10-50       | Hard             | Variable    |

**For comparison:**

- **Claude API** (if you used it instead): ~$3-10/month for light usage
- **Self-hosting makes sense when:** You exceed $12/month in API costs OR need privacy

## Important Notes

### About Model Files

- **DO NOT** commit Ollama models to Git
- Models stay on whatever machine runs Ollama
- Your repository only contains code, not models
- Each server needs to download models separately

### GitHub Best Practices

- Commit your code (`src/`, `package.json`, `README.md`)
- Don't commit `node_modules/` (it's in `.gitignore`)
- Document which Ollama models are required

### Performance Tips

- Llama3.2 is fast enough for most uses on modern CPUs
- GPU greatly speeds up larger models like phi4
- For production, monitor response times and adjust model accordingly

## Troubleshooting

### "HTTP error! status: 404"

- Ollama is running but model name is wrong
- Run `ollama list` and verify exact model name
- Update `src/llmCall.js` with correct model name

### "Cannot connect to Ollama"

- Ollama service isn't running
- Run `curl http://localhost:11434` to test
- Start Ollama with `ollama serve` if needed
- Check Task Manager (Windows) or Activity Monitor (Mac) for Ollama process

### "Model not found"

- Model isn't downloaded
- Run `ollama pull llama3.2:latest`
- Wait for download to complete

### Slow responses

- Model too large for your hardware
- Try smaller model: `ollama pull llama3.2:1b`
- Consider GPU server for production

### Out of memory

- Model requires more RAM than available
- Use smaller model or upgrade RAM
- Close other applications

## Next Steps

**Beginner projects:**

- Modify prompts and observe different responses
- Compare llama3.2 vs phi4 outputs
- Build a simple question-answering system
- Create a CLI chatbot with conversation history

**Intermediate projects:**

- Add Express.js to create a REST API
- Build a web interface (React/Vue + your API)
- Implement conversation memory/context
- Create a document Q&A system

**Advanced projects:**

- Deploy to production VPS
- Implement streaming responses
- Build a multi-agent system
- Create a RAG (Retrieval Augmented Generation) app

## Resources

- [Ollama Documentation](https://github.com/ollama/ollama)
- [Ollama Model Library](https://ollama.com/library)
- [Ollama API Reference](https://github.com/ollama/ollama/blob/main/docs/api.md)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [Awesome Ollama](https://github.com/jmorganca/awesome-ollama) - Community projects
