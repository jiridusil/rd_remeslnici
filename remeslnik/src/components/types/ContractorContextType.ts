export type ContractorFields = {
    id: string
    firstName: string;
    lastName: string;
    fields: string[];
    weekends: boolean;
    city: string;
    zip: string;
    range: number;
}

export type ContractorContextType = {
    id: string;
    firstName: string;
    setFirstName: (firstName: string) => void;
    lastName: string;
    setLastName: (lastName: string) => void;
    fields: string[];
    setField: (field: string[]) => void;
    weekends: boolean;
    setWeekends: (weekends: boolean) => void;
    city: string;
    setCity: (address: string) => void;
    zip: string;
    setZip: (zip: string) => void;
    range: number;
    setRange: (range: number) => void;
}
