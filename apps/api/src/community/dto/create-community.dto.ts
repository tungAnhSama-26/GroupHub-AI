export class CreateCommunityDto {
  name: string;
  description?: string;
  platform: string;
  url: string;
  logoUrl?: string;
  tags?: string[];
}
