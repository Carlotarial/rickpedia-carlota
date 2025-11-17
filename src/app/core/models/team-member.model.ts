export interface TeamMember {
  id?: number;
  characterId: number;
  characterName: string;
  alias: string;
  note: string;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
}
