import { Database } from "./database";

type Table = Database["public"]["Tables"]["users"];

export type User = Table["Row"];
