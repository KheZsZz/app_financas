import { 
    View, 
    Text,
    TouchableOpacity, 
    TouchableOpacityProps 
} from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

import { Styles } from './styles'

import colors from '@/styles/Colors'

type ButtonProps = TouchableOpacityProps & {
    name: string
}

export const Button = ({name,...rest}:ButtonProps)=> {
    return (
        <View style = {Styles.container}>
            <TouchableOpacity {...rest} style={Styles.content}>
                <Text style={Styles.title}>{ name }</Text>
                <MaterialIcons name="arrow-forward" size={16} colors={colors.dark.text} />
            </TouchableOpacity>
        </View>
    );

}