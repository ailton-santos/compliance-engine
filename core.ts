import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { RetrievalQAChain } from "langchain/chains";
import { PromptTemplate } from "@langchain/core/prompts";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * LABORGUARD ENGINE - CORE LOGIC
 * Purpose: Analyzes labor contract clauses against the CLT (Brazilian Labor Law).
 * Author: Tom
 */

interface ComplianceReport {
  riskScore: number; // 0 to 100
  analysis: string;
  legalReference: string;
}

class LaborGuardEngine {
  private model: ChatOpenAI;
  private embeddings: OpenAIEmbeddings;
  private vectorStore?: MemoryVectorStore;

  constructor() {
    // Initialize LLM with high temperature for reasoning but low for fact-checking
    this.model = new ChatOpenAI({
      modelName: "gpt-4o",
      temperature: 0.2,
    });

    this.embeddings = new OpenAIEmbeddings();
  }

  /**
   * PHASE 1: Knowledge Ingestion
   * Processes raw legal text (e.g., CLT articles) into a Vector Database.
   */
  async ingestLegalDatabase(rawText: string): Promise<void> {
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const docs = await splitter.createDocuments([rawText]);
    
    // Using MemoryVectorStore for demonstration. 
    // For production, use Pinecone or Milvus.
    this.vectorStore = await MemoryVectorStore.fromDocuments(
      docs,
      this.embeddings
    );
    
    console.log("Legal Database Indexed: CLT data is ready for retrieval.");
  }

  /**
   * PHASE 2: Predictive Compliance Analysis
   * Compares input clause against retrieved legal articles.
   */
  async analyzeClause(clauseText: string): Promise<ComplianceReport> {
    if (!this.vectorStore) {
      throw new Error("Vector Store not initialized. Please ingest law data first.");
    }

    // Define a custom prompt to force 'Predictive' reasoning
    const promptTemplate = `
      You are an expert Brazilian Labor Lawyer. 
      Analyze the following CONTRACT CLAUSE against the retrieved LEGAL CONTEXT (CLT).
      
      CONTRACT CLAUSE: {question}
      LEGAL CONTEXT (CLT): {context}
      
      Respond only in JSON format with:
      1. "riskScore": A number from 0 (Safe) to 100 (High Risk/Illegal).
      2. "analysis": Detailed reasoning explaining why the clause is risky.
      3. "legalReference": The specific Article of the CLT cited.
    `;

    const chain = RetrievalQAChain.fromLLM(
      this.model,
      this.vectorStore.asRetriever(),
      {
        prompt: PromptTemplate.fromTemplate(promptTemplate),
      }
    );

    const result = await chain.call({
      query: clauseText,
    });

    // Parse the AI's JSON response
    return JSON.parse(result.text) as ComplianceReport;
  }
}

/**
 * CHECKPOINT: Execution Mock
 */
async function runLaborGuardDemo() {
  const engine = new LaborGuardEngine();

  // Mocking the CLT Data (Rights and Duties of Employer/Employee)
  const cltReference = `
    Art. 59. A duração diária do trabalho poderá ser acrescida de horas extras, 
    em número não excedente de duas, por acordo individual, convenção coletiva ou acordo coletivo de trabalho.
    Art. 59-A. Em exceção ao disposto no art. 59, é facultado às partes estabelecer a jornada de 12x36.
  `;

  await engine.ingestLegalDatabase(cltReference);

  // Testing a "Risky" Clause regarding Overtime
  const testClause = "The employee agrees to work up to 5 hours of overtime per day if requested.";

  console.log("Analyzing Clause: ", testClause);
  const report = await engine.analyzeClause(testClause);

  console.log("--- COMPLIANCE REPORT ---");
  console.log(`Risk Score: ${report.riskScore}%`);
  console.log(`Analysis: ${report.analysis}`);
  console.log(`Reference: ${report.legalReference}`);
}

runLaborGuardDemo();