import { createAtomStorage } from "@/atoms/storage"
import { atomWithStorage } from "jotai/utils"

export const torrentSearchAcrossProvidersAtom = atomWithStorage<boolean>(
    "weeb-torrent-search-across-providers",
    false,
    createAtomStorage<boolean>(),
    { getOnInit: true },
)

export const torrentSearchExtraProviderIdsAtom = atomWithStorage<string[]>(
    "weeb-torrent-search-extra-provider-ids",
    [],
    createAtomStorage<string[]>(),
    { getOnInit: true },
)
