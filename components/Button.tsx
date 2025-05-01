import { Button, ButtonText } from '@/components/ui/button'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import { View } from 'react-native'

function CustomButton({
  buttonText='',
  isAddFilterIcon,
  color,
  className,
  classNameText,
  isFontSizeChangable=true,
  ...props
}: {
  buttonText?: string
  isAddFilterIcon?: boolean
  color: string
  className?: string
  classNameText?: string
  isFontSizeChangable?: Boolean
} & React.ComponentProps<typeof Button>) {
  const colorStyle = color == 'blue'
    ? 'bg-primary-0'
    : color == 'orange'
      ? 'bg-warning-0/70'
      : color == 'red' ? 'border-2 border-error-0 bg-error-0/85' : color == 'green' ? 'border-2 border-info-0 bg-info-0/85' : ''
  const fontSize = buttonText.length > 17 && isFontSizeChangable ? 'text-3xs' : 'text-xs';
  return (
    <Button
      className={`rounded-custom ${colorStyle} ${className}`}
      action="primary"
      {...props}
    >
      <ButtonText className={`${fontSize} ${classNameText}`}>
        {buttonText}
      </ButtonText>
      {isAddFilterIcon && (
        <ButtonText className={`text-3xs ${classNameText} text-center`}>
          <FontAwesome5 name="filter" size={16}/>
        </ButtonText>
      )}
    </Button>
  )
}

export { CustomButton }
