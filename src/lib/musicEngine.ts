export type MusicTrackId = 'nguoi-thay' | 'bui-phan';

export interface MusicTrackMeta {
  id: MusicTrackId;
  title: string;
  artist: string;
  youtubeId: string;
}

export const MUSIC_TRACKS: MusicTrackMeta[] = [
  {
    id: 'nguoi-thay',
    title: 'Người Thầy',
    artist: 'Cẩm Ly',
    youtubeId: 't8a8J_tIxpI',
  },
  {
    id: 'bui-phan',
    title: 'Bụi Phấn',
    artist: 'Khánh Chi',
    youtubeId: '9zUO-Scm4z8',
  },
];
