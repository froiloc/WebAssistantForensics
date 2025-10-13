// Auto-generated TypeScript definitions for Glossary
// Generated from glossary.schema.json

export interface GlossaryMedia {
    path: string;
    alt: string;
    caption?: string;
}

export interface GlossaryTerm {
    term: string;
    shortDefinition: string;
    extendedExplanation?: string;
    whitePatterns: string[];
    blackPatterns?: string[];
    media?: GlossaryMedia;
    relatedTerms?: string[];
    categories?: ('technical' | 'legal' | 'process' | 'tool-specific')[];
}

export type Glossary = GlossaryTerm[];

export interface SearchIndex {
    terms: Record<string, {
        term: string;
        shortDefinition: string;
        hasExtended: boolean;
        hasMedia: boolean;
        categories: string[];
    }>;
    patterns: Array<{
        type: 'white' | 'black';
        pattern: string;
        term_id: string;
        original: string;
    }>;
    lookup: Record<string, number>;
    metadata: {
        version: string;
        term_count: number;
        build_time: string | null;
        hash: string;
    };
}
