import {View, TouchableOpacity, Text, Image} from 'react-native';
import { Styles } from './styles'
import { typeBankProps } from '@/schemas/bankSchema'

export const listBank = ({iconBank, bankName, overMoney}: typeBankProps) => {
    return(
        <View style={Styles.container}>
                <Image src={iconBank} style={Styles.icon}/>
                <Text>{bankName}</Text>
                <Text>{overMoney}</Text>
                <TouchableOpacity>
                    <Text>Alterar</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text>Excluir</Text>
                </TouchableOpacity>
        </View>
    )
}