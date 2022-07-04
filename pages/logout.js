import nookies from 'nookies';

export default function LogoutScreen() {
  return <h1>Logout</h1>;
}

export async function getServerSideProps(context) {
  nookies.destroy(context, 'USER_TOKEN', {
    path: '/',
  });

  return {
    redirect: {
      destination: '/login',
      permanent: false,
    },
  };
}
