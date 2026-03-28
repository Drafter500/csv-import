export interface TClient {
  clientId: string;
  metaData: {
    clientIp: string;
  };
}

export interface TNode {
  name: string;
  state: "RUNNING" | "ERROR" | string;
  metrics: {
    msgSec: string;
    uptime: number;
    connectedClients: number;
  };
  clients: TClient[];
}
