import { Box, Button, Icon } from '@chakra-ui/react';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import React from 'react';
import { Github as GithubIcon } from './SocialIcon';

const GithubLogin = () => {
  const GithubLogo = () => <GithubIcon style={{ height: 18, width: 18 }} />;

  const signInWithGithub = async (event) => {
    event.preventDefault();
    const supabase: SupabaseClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL as string,
      process.env.NEXT_PUBLIC_SUPABASE_KEY as string,
    );
    await supabase.auth.signIn(
      {
        provider: 'github',
      },
      {
        redirectTo: process.env.NEXT_PUBLIC_GITHUB_LOGIN_REDIRECT,
      },
    );
  };

  return (
    <Box>
      <Button type="submit" onClick={signInWithGithub}>
        <Icon as={GithubLogo} />
        Continue with GitHub
      </Button>
    </Box>
  );
};

export { GithubLogin as default };
