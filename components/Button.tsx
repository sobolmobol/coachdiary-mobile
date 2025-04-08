import { Button, ButtonText } from "@/components/ui/button"
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { View } from "react-native";

function CustomButton({ 
  buttonText, 
  isAddFilterIcon, 
  color,
  className,
  textColor = 'background-0',
  ...props } : 
    { 
      buttonText?: string,
      isAddFilterIcon?: boolean,
      color: string,
      className?: string, 
      textColor?: string
    }& React.ComponentProps<typeof Button>
){
  const colorStyle = color == "blue" ? "bg-primary-0" : color == "orange" ? "bg-secondary-0" : ''
  return (
    <Button className={`text-${textColor} rounded-custom ${colorStyle} ${className}`}
            size="sm" 
            action="primary"
            {... props}>
      {buttonText && <ButtonText className="text-xs">{buttonText}</ButtonText>}
      {isAddFilterIcon && <ButtonText><FontAwesome5 name="filter" size={16} /></ButtonText>}
    </Button>
  )
}

export { CustomButton };