import { createContext, useState } from "react";
import { ContractorContextType } from "./types/ContractorContextType";
import { ReactNode } from "react";

export const ContractorContext = createContext<ContractorContextType>(undefined as any);


interface ContractorProviderProps {
    children: ReactNode;
}

export const ContractorProvider: React.FC<ContractorProviderProps> = ({ children }) => {
    const [id, setId] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [field, setField] = useState<string[]>([]);
    const [weekends, setWeekends] = useState<boolean>(false);
    const [city, setCity] = useState<string>('');
    const [zip, setZip] = useState<string>('');
    const [range, setRange] = useState<number>(0);

    return (
        <ContractorContext.Provider value={{id, firstName, setFirstName, lastName, setLastName,
            fields: field, setField, weekends, setWeekends, city: city, setCity: setCity, zip, setZip, range, setRange
         }}>
            {children}
        </ContractorContext.Provider>
    )
}