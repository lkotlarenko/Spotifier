import { getProviders, signIn } from "next-auth/react";

const Login = ({ providers }) => {
  return (
    <div className="flex flex-col items-center bg-black min-h-screen w-full justify-center">
        <img className="w-52 mb-5" src="https://github.com/lkotlarenko/Spotifier/blob/main/public/spotify_logo.png" alt="Spotify Logo" />
        {Object.values(providers).map((provider) => (
            <div key={provider.name}>
                <button
                    className="bg-[#18D860] text-white p-5 rounded-lg"
                    onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                >Login with {provider.name}</button>
            </div>
        ))}
        <h2>Login page :P</h2>
    </div>
  )
};

export default Login;
export async function getServerSideProps() {
    const providers = await getProviders();
    return {
        props: {
            providers,
        },
    };
}
