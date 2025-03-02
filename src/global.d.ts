interface Team {
  id: number;
  name: string;
  logo: string;
  coach: string;
  starters: string[];
  bench: string[];
}

interface MockData {
  teams: Team[];
}

declare module "*.json" {
  const value: MockData;
  export default value;
}