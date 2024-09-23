export const useX = ({ userInfo, authConfig }: { userInfo: any; authConfig: any }) => {
  const handleBind = () => {
    if (!userInfo.twitter?.is_bind) {
      const path = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${authConfig.twitter_client_id}&redirect_uri=${window.location.href}&scope=tweet.read%20users.read%20follows.read%20like.read&state=state&code_challenge=challenge&code_challenge_method=plain`;
      sessionStorage.setItem('_auth_type', 'twitter');
      window.open(path, '_blank');
    }
  };

  return {
    handleBind
  };
};
