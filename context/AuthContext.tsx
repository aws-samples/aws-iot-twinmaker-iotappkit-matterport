"use client";
import React, { useEffect, useState } from "react";
import { Auth, Hub } from "aws-amplify";
import { Amplify } from "aws-amplify"
import {cognito_config} from '@/aws.config'
import { useRouter } from "next/navigation";
import {ICredentials} from '@aws-amplify/core/'

Amplify.configure({ ...cognito_config, ssr: true })


export interface IAuthContextType {
  user: any;
  credentials: ICredentials
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  signIn: (p: { username: string; password: string }) => Promise<any>;
  signOut: () => Promise<any>;
}

// Create a context object
export const AuthContext = React.createContext<IAuthContextType>({
  user: null,
  credentials: {
    accessKeyId: "",
    sessionToken: "",
    secretAccessKey: "",
    identityId: "",
    authenticated: false
  },
  isAuthenticated: false,
  isAuthenticating: true,
  signIn: async () => {},
  signOut: async () => {},
});

interface IAuthProviderProps {
  children: React.ReactNode;
}

// Create a provider for components to consume and subscribe to changes
export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [user, setUser] = useState(null);
  const [credentials, setCredentials] = useState<ICredentials>({
    accessKeyId: "",
    sessionToken: "",
    secretAccessKey: "",
    identityId: "",
    authenticated: false
  })
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  const router = useRouter()

  const fetchAuthUser = async () => {
    try {
      const fetchedUser = await Auth.currentAuthenticatedUser()
      const creds = await Auth.currentUserCredentials()
      setIsAuthenticating(false)
      if(creds.authenticated){
        setCredentials(creds)
      }
      setUser(fetchedUser)
    } catch (err) {
      setIsAuthenticating(false);
      setUser(null);
      setCredentials({
        accessKeyId: "",
        sessionToken: "",
        secretAccessKey: "",
        identityId: "",
        authenticated: false
      })
    }
  };

  useEffect(() => {
    fetchAuthUser();

    // listening for auth change events
    const authListener = Hub.listen(
      "auth",
      async ({ payload: { event, data } }) => {
        console.log("Auth Status Changed Event: ", event);
        // console.log("Auth Status Changed Data: ", data);
        switch (event) {
          case "signIn":
            await fetchAuthUser();
            break;
          case "signOut":
            setUser(null)
            setCredentials({
              accessKeyId: "",
              sessionToken: "",
              secretAccessKey: "",
              identityId: "",
              authenticated: false
            })
            break;
          default:
            await fetchAuthUser();
        }
      }
    );

    // cleanup
    return () => {
      authListener();
    };
  }, []);


  useEffect(() => {
    
    if(!user && !isAuthenticating){
      router.replace('/auth/signin')
    }
  
  }, [user, router, isAuthenticating])
  

  const signIn = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    await Auth.signIn({ username, password })
  }

  const signOut = async () => {
    Auth.signOut()
    setCredentials({
      accessKeyId: "",
      sessionToken: "",
      secretAccessKey: "",
      identityId: "",
      authenticated: false
    })
    router.push('/auth/signin')
  };

  const value = {
    user,
    credentials,
    isAuthenticated: !!user,
    isAuthenticating,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
