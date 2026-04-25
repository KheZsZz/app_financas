import React from "react";
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  TouchableOpacityProps,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Ou outra lib de ícones que preferir
import { Styles } from "./styles";

interface ButtonProps extends TouchableOpacityProps {
  name: string;
  icon?: keyof typeof Ionicons.glyphMap;
  onSubmit: () => void;
  isLoading?: boolean;
}

export function Button({
  name,
  icon,
  onSubmit,
  isLoading = false,
  ...rest
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={Styles.container}
      onPress={onSubmit}
      disabled={isLoading}
      activeOpacity={0.7}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator color="#FFF" />
      ) : (
        <>
          <Text style={Styles.title}>{name}</Text>
          {icon && (
            <Ionicons
              name={icon}
              size={20}
              color="#FFF"
              style={{ marginLeft: 8 }}
            />
          )}
        </>
      )}
    </TouchableOpacity>
  );
}
