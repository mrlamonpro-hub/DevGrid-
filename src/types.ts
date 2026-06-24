export interface ServiceItem {
  id: string;
  name: string;
  price: number;
  description: string;
  features?: string[];
  duration?: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  iconName: string;
  description: string;
  emoji: string;
  items: ServiceItem[];
}

export interface DiscordMember {
  id: string;
  username: string;
  discriminator: string;
  avatar?: string;
  avatar_url?: string;
  status: 'online' | 'idle' | 'dnd' | 'offline';
  game?: {
    name: string;
  };
}

export interface DiscordWidgetData {
  id: string;
  name: string;
  instant_invite: string | null;
  channels: Array<{
    id: string;
    name: string;
    position: number;
  }>;
  members: DiscordMember[];
  presence_count: number;
}

export interface CartItem {
  service: ServiceItem;
  categoryName: string;
  quantity: number;
}
