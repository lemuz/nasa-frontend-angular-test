import { Item } from "./SearchResponse";

export interface AssetResponse{
    collection: Collection;
}

export interface Collection{
    version: string;
    href: string;
    items: Item[];
}