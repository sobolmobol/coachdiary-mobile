import { Button, ButtonText } from "@/components/ui/button"
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

function BlueButton({ buttonText, isAddFilterIcon, ...props } : 
    { 
      buttonText?: string,
      isAddFilterIcon?: boolean,
    }& React.ComponentProps<typeof Button>
){
  return (
    <Button className="bg-primary-0 text-background-0 rounded-custom shadow-hard-2" 
            size="sm" 
            variant="solid" 
            action="primary"
            {... props}>
      {buttonText && <ButtonText className="text-xs">{buttonText}</ButtonText>}
      {isAddFilterIcon && <ButtonText><FontAwesome5 name="filter" size={16} /></ButtonText>}
    </Button>
  )
}

export { BlueButton };