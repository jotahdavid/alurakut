export default async (req, res) => {
  if(req.method === "POST") {
    await fetch("https://api.github.com/rate_limit", { method: "GET" })
    .then(async (response) => {
      if(!response.ok) {
        throw new Error("Não foi possível estabelecer conexão com os servidores, tente novamente!");
      }

      const responseJSON = await response.json();
      if(responseJSON.rate.remaining === 0) {
        throw new Error("Você excedeu os limites de acesso a API do GitHub, tente novamente mais tarde!");
      } else {
        const githubUser = req.body.githubUser;

        const { followingNumbers, followersNumbers } = await fetch(`https://api.github.com/users/${githubUser}`, { method: "GET" } )
        .then(async (response) => {
          const responseJSON = await response.json();

          return {
            followingNumbers: responseJSON.following,
            followersNumbers: responseJSON.followers
          }
        });

        const followingList = await fetch(`https://api.github.com/users/${githubUser}/following`, { method: "GET" } )
        .then(async (response) => {
          if(!response.ok) return;

          const responseJSON = await response.json();

          return responseJSON.map(({ login }) => login);
        });

        const followersList = await fetch(`https://api.github.com/users/${githubUser}/followers`, { method: "GET" } )
        .then(async (response) => {
          if(!response.ok) return;

          const responseJSON = await response.json();

          return responseJSON.map(({ login }) => login);
        });

        res.status(200).json({
          following: {
            total: followingNumbers,
            usernames: followingList,
          },
          followers: {
            total: followersNumbers,
            usernames: followersList
          }
        });
      }
    })

    return;
  }

  res.status(404).json({
    message: "Not found"
  });
}