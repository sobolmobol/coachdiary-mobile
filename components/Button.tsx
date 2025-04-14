import { Button, ButtonText } from "@/components/ui/button"
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { View } from "react-native";

function CustomButton({ 
  buttonText, 
  isAddFilterIcon, 
  color,
  className,
  classNameText,
  ...props } : 
    { 
      buttonText?: string,
      isAddFilterIcon?: boolean,
      color: string,
      className?: string, 
      classNameText?: string
    }& React.ComponentProps<typeof Button>
){
  const colorStyle = color == "blue" ? "bg-primary-0" : color == "orange" ? "bg-secondary-0/80" : ''
  return (
    <Button className={`rounded-custom ${colorStyle} ${className}`}
            action="primary"
            {... props}>
      {buttonText && <ButtonText className={`text-xs ${classNameText}`}>{buttonText}</ButtonText>}
      {isAddFilterIcon && <ButtonText><FontAwesome5 name="filter" size={16} /></ButtonText>}
    </Button>
  )
}

export { CustomButton };