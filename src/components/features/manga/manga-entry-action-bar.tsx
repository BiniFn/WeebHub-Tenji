import { HibikeManga_ChapterDetails, Manga_Entry } from "@/api/generated/types"
import { DownloadMangaChaptersModal } from "@/components/features/manga/download-chapters-modal"
import { useMangaLastReadPosition } from "@/components/features/manga/reader/manga-reader-state"
import { formatMangaReaderHref, getPreferredStartChapter } from "@/components/features/manga/reader/manga-reader-utils"
import { Button } from "@/components/ui/button"
import { useAllDownloadedMangaChapters, useCompletedMangaChapters, useMangaDownloadQueueLength } from "@/lib/downloads/use-manga-downloads"
import { useIsServerConnected } from "@/lib/offline"
import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import React, { useMemo, useState } from "react"
import { Platform, Text, View } from "react-native"

type MangaEntryActionBarProps = {
    entry: Manga_Entry
    provider: string | null
    chapters: HibikeManga_ChapterDetails[]
}

export function MangaEntryActionBar({
    entry,
    provider,
    chapters,
}: MangaEntryActionBarProps) {
    const router = useRouter()
    const [downloadModalOpen, setDownloadModalOpen] = useState(false)
    const downloadedChapters = useCompletedMangaChapters(entry.mediaId, provider)
    const allDownloadedChapters = useAllDownloadedMangaChapters(entry.mediaId)
    const queueLength = useMangaDownloadQueueLength()
    const isConnected = useIsServerConnected()

    const progress = entry.listData?.progress ?? 0

    const lastRead = useMangaLastReadPosition(entry.mediaId, provider ?? undefined)
    const currentChapter = useMemo(() => {
        if (!lastRead) return undefined
        return chapters.find(ch => ch.id === lastRead.chapterId)
    }, [chapters, lastRead])

    const nextChapter = useMemo(() => {
        return getPreferredStartChapter(
            entry.mediaId,
            progress,
            chapters,
            allDownloadedChapters,
        )
    }, [allDownloadedChapters, chapters, entry.mediaId, progress])

    const hasCurrent = !!(currentChapter && lastRead && lastRead.pageIndex > 0)
    const hasNext = !!nextChapter
    const showNextButton = hasCurrent && hasNext && currentChapter?.id !== nextChapter?.chapterId

    const hasDownloads = !Platform.isTV && downloadedChapters.length > 0
    const hasChapters = !Platform.isTV && chapters.length > 0 && isConnected

    return (
        <>
            <View className="flex-row items-center gap-2.5 px-4 pb-4 pt-1">
                {hasCurrent && (
                    <Button
                        className="flex-1 rounded-xl h-11"
                        onPress={() => {
                            router.push(formatMangaReaderHref({
                                mediaId: entry.mediaId,
                                provider: currentChapter.provider || provider || "",
                                chapterId: currentChapter.id,
                                chapterNumber: currentChapter.chapter,
                            }))
                        }}
                    >
                        <View className="flex-row items-center gap-2">
                            <Ionicons name="book" size={15} color="black" />
                            <Text className="text-sm font-semibold text-primary-foreground" numberOfLines={1}>
                                Resume Ch. {currentChapter.chapter} (p. {lastRead.pageIndex + 1})
                            </Text>
                        </View>
                    </Button>
                )}

                {showNextButton && (
                    <Button
                        variant="secondary"
                        className="rounded-xl h-11 px-3.5"
                        onPress={() => {
                            router.push(formatMangaReaderHref({
                                mediaId: nextChapter.mediaId,
                                provider: nextChapter.provider,
                                chapterId: nextChapter.chapterId,
                                chapterNumber: nextChapter.chapterNumber,
                            }))
                        }}
                    >
                        <View className="flex-row items-center gap-1.5">
                            <Ionicons name="arrow-forward" size={14} color="white" />
                            <Text className="text-sm font-medium text-secondary-foreground" numberOfLines={1}>
                                Next: Ch. {nextChapter.chapterNumber}
                            </Text>
                        </View>
                    </Button>
                )}

                {!hasCurrent && hasNext && (
                    <Button
                        className="flex-1 rounded-xl h-11"
                        onPress={() => {
                            router.push(formatMangaReaderHref({
                                mediaId: nextChapter.mediaId,
                                provider: nextChapter.provider,
                                chapterId: nextChapter.chapterId,
                                chapterNumber: nextChapter.chapterNumber,
                            }))
                        }}
                    >
                        <View className="flex-row items-center gap-2">
                            <Ionicons name="book" size={15} color="black" />
                            <Text className="text-sm font-semibold text-primary-foreground" numberOfLines={1}>
                                {progress > 0 ? `Read Next: Ch. ${nextChapter.chapterNumber}` : "Start Reading"}
                            </Text>
                        </View>
                    </Button>
                )}

                {hasChapters && (
                    <Button
                        variant="secondary"
                        className="rounded-xl h-11"
                        style={nextChapter ? { paddingHorizontal: 14 } : { flex: 1 }}
                        onPress={() => setDownloadModalOpen(true)}
                    >
                        <View className="flex-row items-center gap-2">
                            <Ionicons name="download-outline" size={17} color="white" />
                            {hasDownloads ? (
                                <Text className="text-sm font-medium text-secondary-foreground">
                                    {downloadedChapters.length}
                                </Text>
                            ) : !nextChapter ? (
                                <Text className="text-sm font-medium text-secondary-foreground">
                                    Download
                                </Text>
                            ) : null}
                            {queueLength > 0 && (
                                <View className="bg-brand-300/20 rounded-full px-1.5 py-0.5">
                                    <Text className="text-xs font-bold text-brand-300">{queueLength}</Text>
                                </View>
                            )}
                        </View>
                    </Button>
                )}
            </View>

            {!Platform.isTV && (
                <DownloadMangaChaptersModal
                    entry={entry}
                    provider={provider}
                    chapters={chapters}
                    open={downloadModalOpen}
                    onOpenChange={setDownloadModalOpen}
                />
            )}
        </>
    )
}
