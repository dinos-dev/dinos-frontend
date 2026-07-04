export interface Place {
  id: string;
  name: string;
  address: string;
  imageUrl?: string;
  isNew: boolean;
  savedBy: {
    id: string;
    name: string;
    avatarUrl: string;
  };
}

export interface Friend {
  id: string;
  name: string;
  avatarUrl: string;
  savedPlaceName: string;
  friendCount?: number;
}

export interface SelectionOption {
  label: string;
  value: string;
}
