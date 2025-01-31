/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    eslint: {
        ignoreDuringBuilds: true    // NOTE: Don't care about esLint errors. I know what I do
    },
    typescript: {
        ignoreBuildErrors: true     // NOTE: Yeah, I skip the validity of type
    }
};

export default nextConfig;
