import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function generateMockEmbedding(): number[] {
  return Array.from({ length: 1536 }, () => Math.random() * 2 - 1);
}

function chunkText(text: string, size: number = 1000): string[] {
  const chunks: string[] = [];
  for (let i = 0; i < text.length; i += size) {
    chunks.push(text.slice(i, i + size));
  }
  return chunks;
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    
    if (!body.text || typeof body.text !== 'string') {
      return NextResponse.json({ error: 'Bad Request: "text" field is required and must be a string' }, { status: 400 });
    }

    const chunks = chunkText(body.text, 1000);
    let chunksVectorized = 0;

    // Sequential insert to prevent database connection saturation on large documents
    for (const chunk of chunks) {
      const vector = generateMockEmbedding();
      const id = crypto.randomUUID();
      const type = 'document_chunk';
      const now = new Date();
      // Use $executeRawUnsafe as requested and assume PostgreSQL with pgvector extension enabled.
      await prisma.$executeRawUnsafe(
        'INSERT INTO "KnowledgeItem" (id, type, content, embedding, updated_at) VALUES ($1, $2, $3, $4::vector, $5)',
        id,
        type,
        chunk,
        JSON.stringify(vector),
        now
      );
      chunksVectorized++;
    }

    return NextResponse.json({
      success: true,
      message: 'Document successfully ingested and vectorized',
      chunksVectorized
    }, { status: 200 });

  } catch (error: any) {
    console.error('[API_INGEST_ERROR]', error);
    return NextResponse.json({
      error: 'Internal Server Error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
