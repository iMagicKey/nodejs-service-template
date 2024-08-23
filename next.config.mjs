/**
 * @type {import('next').NextConfig}
 */

import path from 'path'

const nextConfig = {
    pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
    webpack: (config) => {
        config.resolve.alias['@'] = path.resolve('src')
        return config
    },
    swcMinify: true,
}

export default nextConfig
