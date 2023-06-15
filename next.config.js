/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
        public_url: "http://localhost:3000",
        public_url_api: "http://localhost:3000/api",
        secret: 'QyNsdWlzYTE5NjE=', //https://www.base64encode.org/
      },
}

module.exports = nextConfig
