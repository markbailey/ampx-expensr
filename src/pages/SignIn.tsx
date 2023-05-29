import { FormEvent, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../hooks';
import { RootState, signIn } from '../store';
import { FormGroup, Input, Label } from '../components/form';
import Button from '../components/Button';
import { mount } from '../utilities/show';
import ErrorAlert from '../components/ErrorAlert';

function SignIn() {
  const dispatch = useAppDispatch();
  const { user, isAuthenticating, error } = useAppSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (email === undefined || password === undefined) return;
    dispatch(signIn({ email, password }));
  };

  useEffect(() => {
    if (!isAuthenticating && user !== null) {
      const redirectUrl = searchParams.get('r');
      navigate(redirectUrl ?? '/');
    }
  }, [user, isAuthenticating, searchParams, navigate]);

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen p-4">
      {error && <ErrorAlert message={error} />}
      <form
        onSubmit={onSubmit}
        className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 p-6 space-y-4 md:space-y-6 sm:p-8"
      >
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Sign in to your account
        </h1>

        <FormGroup>
          <Label htmlFor="#email">Email Address</Label>
          <Input
            ref={emailRef}
            id="email"
            type="email"
            placeholder="Email"
            defaultValue="demo@expensr.co.uk"
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="#password">Email Address</Label>
          <Input
            ref={passwordRef}
            id="password"
            type="password"
            placeholder="Password"
            defaultValue="demo2023"
            required
          />
        </FormGroup>

        <Button type="submit" className="w-full">
          Sign In
        </Button>

        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          {'Don’t have an account yet? '}
          <a
            className="font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer"
            onClick={() => alert('Sorry you cannot sign up yet.')}
          >
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
}

export default SignIn;
