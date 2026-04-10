import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // API Routes
  app.post("/api/leads", async (req, res) => {
    try {
      const leadData = req.body;

      // Enviar para o Manus Database
      const manusDatabaseUrl = process.env.VITE_FRONTEND_FORGE_API_URL || "https://api.manus.im";
      const apiKey = process.env.VITE_FRONTEND_FORGE_API_KEY;

      // Usando fetch nativo do Node.js 18+
      const response = await (global.fetch || require('node-fetch'))(
        `${manusDatabaseUrl}/api/v1/records/IOavnRo2a1k5CDH1gyDxbH`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            data: {
              nome: leadData.nome,
              telefone: leadData.telefone,
              pais: leadData.pais,
              tipoDeBeM: leadData.tipoDeBeM,
              creditoInicial: leadData.creditoInicial,
              prazoMeses: leadData.prazoMeses,
              parcelaMeia: leadData.parcelaMeia,
              parcelaInteira: leadData.parcelaInteira,
              dataSimulacao: leadData.dataSimulacao,
            },
          }),
        }
      );

      if (!response.ok) {
        console.error("Erro ao enviar lead para Manus:", await response.text());
        return res.status(500).json({ error: "Erro ao salvar lead" });
      }

      res.json({ success: true, message: "Lead salvo com sucesso" });
    } catch (error) {
      console.error("Erro ao processar lead:", error);
      res.status(500).json({ error: "Erro ao processar lead" });
    }
  });

  // Handle client-side routing - serve index.html for all routes (deve ser a última rota)
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
