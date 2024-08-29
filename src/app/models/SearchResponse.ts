export interface SearchResponse{
    collection: Collection;
}

export interface Collection{
    version: string;
    href: string;
    items: Item[];
    metadata: Metadata;
    links: Link[];
}

export interface Item{
    href: string;
    data: ImageInfo[];
    links: Link[];
    tieneVideo: boolean;
    linkVideo: string;
}

export interface Metadata{
    total_hits: number;
}

export interface Link{
    rel: string;
    href: string;
    //prompt para Links de collection
    prompt: string;
    //render para Links de los items
    render: string;
}

export interface ImageInfo{
    album: string[];
    center: string;
    title: string;
    photographer: string;
    keywords: string[];
    location: string;
    nasa_id: string;
    media_type: string;
    date_created: string;
    description: string;
}