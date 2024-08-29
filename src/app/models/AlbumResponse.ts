export interface AlbumResponse{
    collection: Collection;
}

export interface Collection{
    href: string;
    items: Item[];
    links: Link[];
    metadata: Metadata;
    version: string;
}

export interface Item{
    data: ImageInfo[];
    href: string;
    links: Link[];
}

export interface Link{
    href: string;
    rel: string;
    //render para Links de los items
    render: string;
    //prompt para Links de collection
    prompt: string;
}

export interface Metadata{
    total_hits: number;
}

export interface ImageInfo{
    nasa_id: string;
    album: string[];
    keywords: string[];
    title: string;
    media_type: string;
    date_created: string;
    center: string;
    description: string;
}

