// Shared types, This represents what comes out of the Database

export interface BaseResource {
  id: string;
  title: string;
  description?: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface SnippetResource extends BaseResource {
  type: "snippet";
  content: {
    code: string;
    language: string;
  };
}

export interface NoteResource extends BaseResource {
  type: "note";
  content: {
    markdown: string;
  };
}

export interface LinkResource extends BaseResource {
  type: "link";
  content: {
    url: string;
    // Optional for now, in case we are sure we will fetch the metadata at declaration
    metadata?: {
      ogTitle?: string;
      ogDescription?: string;
      ogImage?: string;
    };
  };
}

export interface PdfResource extends BaseResource {
  type: "pdf";
  content: {
    fileUrl: string; // The S3 url
    fileSize: number;
    pageCount: number;
  };
}

// Discriminated (tagged) union. Here we say the resource can be one of the listed types
export type Resource =
  | SnippetResource
  | NoteResource
  | LinkResource
  | PdfResource;
