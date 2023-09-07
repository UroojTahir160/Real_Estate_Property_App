export type Property = {
    id: string;
    imageUrl: string | undefined;
    title: string;
    address: string;
    beds: number;
    bath: number;
    coveredAreaSQFT: number;
    propertyType: string;
    isCommercial: boolean;
    price: number;
    description: string;
    garage: boolean;
    agentName: string;
    agentContact: string;
    lotSizeACRES: number;
    yearBuilt: number;
  };