import { View, Text, FlatList } from 'react-native';

import { BankType } from '@/schemas/bank.schema'
import { useState } from 'react';

export const Bank = () => {

    const [banks, setBanks] = useState<BankType[]>([]);

    return (
        <View>
            <Text>Lista de bancos e valores em conta</Text>

            <FlatList
                data={banks}
                keyExtractor={(bank:BankType) => bank.name_bank}
                renderItem={({item})=>(
                    <View>
                        <Text>{item.name_bank}</Text>
                    </View>
                )}
            />
        </View>
    );
} 