import { Button } from '@repo/ui/components/button';
import {
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from '@clerk/nextjs';


const RootPage = () => {
  return (
    <main className="flex flex-col justify-center items-center gap-4">
      <h1>Welcome!</h1>
      <SignedOut>
        <div className='flex gap-4'>

        <Button asChild>

        <SignInButton />
        </Button>
        <Button asChild>

        <SignUpButton />
        </Button>
        </div>
      </SignedOut>
    </main>
  );
};

export default RootPage;
