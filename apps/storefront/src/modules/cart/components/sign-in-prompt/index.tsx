import { Button, Heading, Text } from "@modules/common/components/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const SignInPrompt = () => {
  return (
    <div className="bg-white flex items-center justify-between p-4 rounded-xl border border-border">
      <div>
        <Heading level="h2" className="txt-xlarge font-bold text-foreground">
          Već imate račun?
        </Heading>
        <Text className="txt-medium text-muted-foreground mt-1">
          Prijavite se za brži završetak narudžbe.
        </Text>
      </div>
      <div>
        <LocalizedClientLink href="/account">
          <Button variant="secondary" className="h-10 cursor-pointer" data-testid="sign-in-button">
            Prijavi se
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default SignInPrompt
